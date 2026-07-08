import { LeadSubmission } from '../types';

type LeadPayload = {
  name: string;
  whatsapp: string;
  challenge: string;
  source: string;
  company?: string;
};

type LeadResponse = {
  ok: boolean;
  message?: string;
  lead?: LeadSubmission;
};

export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? ((await response.json()) as LeadResponse)
    : ({ ok: false } as LeadResponse);

  if (!response.ok || !data.ok || !data.lead) {
    throw new Error(
      data.message || 'A API de leads esta indisponivel. Verifique se o servidor esta rodando.'
    );
  }

  return data.lead;
}
