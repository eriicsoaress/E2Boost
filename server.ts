import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

type LeadRequest = {
  name?: string;
  whatsapp?: string;
  challenge?: string;
  source?: string;
  company?: string;
};

const app = express();
const port = Number(process.env.PORT || 3001);
const appUrl = process.env.APP_URL;
const isProduction = process.env.NODE_ENV === 'production';
const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 6;
const requestLog = new Map<string, { count: number; resetAt: number }>();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json({ limit: '32kb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (appUrl && origin === appUrl) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

const getClientIp = (req: Request) =>
  req.ip || req.headers['x-forwarded-for']?.toString().split(',')[0] || 'unknown';

const enforceRateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const current = requestLog.get(ip);

  if (!current || current.resetAt <= now) {
    requestLog.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return next();
  }

  if (current.count >= maxRequestsPerWindow) {
    return res.status(429).json({
      ok: false,
      message: 'Muitas tentativas em pouco tempo. Tente novamente em instantes.',
    });
  }

  current.count += 1;
  requestLog.set(ip, current);
  return next();
};

const normalizePrivateKey = (key?: string) => key?.replace(/\\n/g, '\n');

const getSheetsClient = () => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error('Google Sheets environment variables are not configured.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return {
    spreadsheetId,
    sheets: google.sheets({ version: 'v4', auth }),
  };
};

const appendLead = async (lead: Required<Omit<LeadRequest, 'company'>>, req: Request) => {
  const { sheets, spreadsheetId } = getSheetsClient();
  const tabName = process.env.GOOGLE_SHEETS_TAB || 'Leads';
  const submittedAt = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  const values = [[
    crypto.randomUUID(),
    submittedAt,
    lead.name,
    lead.whatsapp,
    lead.challenge,
    lead.source,
    getClientIp(req),
    req.headers['user-agent'] || '',
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tabName}!A:H`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });

  return {
    id: values[0][0],
    submittedAt,
  };
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'e2boost-leads-api' });
});

app.post('/api/leads', enforceRateLimit, async (req, res) => {
  try {
    const body = req.body as LeadRequest;

    if (body.company) {
      return res.status(200).json({ ok: true });
    }

    const name = body.name?.trim() || '';
    const whatsapp = body.whatsapp?.trim() || '';
    const challenge = body.challenge?.trim() || 'Nao especificado.';
    const source = body.source?.trim() || 'site-e2boost';
    const numericPhone = whatsapp.replace(/\D/g, '');

    if (name.length < 2) {
      return res.status(400).json({ ok: false, message: 'Informe um nome valido.' });
    }

    if (numericPhone.length < 10 || numericPhone.length > 13) {
      return res.status(400).json({ ok: false, message: 'Informe um WhatsApp valido com DDD.' });
    }

    const savedLead = await appendLead({ name, whatsapp, challenge, source }, req);

    return res.status(201).json({
      ok: true,
      lead: {
        ...savedLead,
        name,
        whatsapp,
        challenge,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Error saving lead:', error);
    return res.status(500).json({
      ok: false,
      message: isProduction
        ? 'Nao foi possivel registrar sua solicitacao agora.'
        : `Nao foi possivel registrar sua solicitacao agora: ${message}`,
    });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`E2Boost API running on port ${port}`);
});
