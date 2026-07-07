# E2Boost

Site institucional da E2Boost, uma agencia de crescimento digital focada em infraestrutura, criacao de sites, trafego pago e gestao de ativos digitais.

O projeto apresenta uma experiencia one-page com secoes de proposta de valor, solucoes, portfolio, metodo de trabalho, formulario de contato e chamada direta para WhatsApp.

## Visao Geral

A E2Boost comunica uma oferta combinada de tecnologia e aquisicao de clientes:

- Arquitetura e criacao de sites focados em conversao.
- Gestao de trafego pago para Google Ads e Meta Ads.
- Governanca digital, monitoramento, integracoes e estabilidade.
- Diagnostico gratuito via formulario e agendamento de consultoria.
- Acao rapida de contato pelo WhatsApp.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Lucide React
- Express, ja disponivel para futuras rotas backend
- Google Sheets API para registro de leads

## Estrutura

```txt
src/
  App.tsx
  main.tsx
  index.css
  types.ts
  components/
    Navbar.tsx
    Hero.tsx
    Solutions.tsx
    GrowthTheater.tsx
    Portfolio.tsx
    Method.tsx
    ContactForm.tsx
    Footer.tsx
public/
  rocket.svg
```

## Como Rodar Localmente

Instale as dependencias:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Por padrao, o Vite roda na porta `3000`:

```txt
http://localhost:3000
```

Para testar a API de leads localmente, rode em outro terminal:

```bash
npm run dev:api
```

Durante o desenvolvimento, o Vite encaminha chamadas de `/api` para `http://localhost:3001`.

## Scripts

```bash
npm run dev
```

Inicia o servidor local de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao em `dist/` e compila o backend em `server.js`.

```bash
npm run start
```

Executa o servidor Node compilado. Em producao, rode esse comando depois do build.

```bash
npm run preview
```

Visualiza localmente a build de producao.

```bash
npm run lint
```

Executa a verificacao de tipos com TypeScript.

## Formulario de Leads

O formulario de contato e o modal de consultoria enviam os dados para a rota:

```txt
POST /api/leads
```

A API valida os campos, aplica um rate limit simples, usa um campo honeypot anti-spam e registra o lead no Google Sheets.

Colunas gravadas na planilha:

```txt
ID | Data | Nome | WhatsApp | Desafio | Origem | IP | User Agent
```

## Variaveis de Ambiente

O arquivo `.env.example` pode ser usado como referencia para configurar chaves e URLs do ambiente.

Para uma futura integracao com Google Sheets, as variaveis poderiam seguir este formato:

```env
PORT=3001
APP_URL="https://seudominio.com.br"
GOOGLE_SHEETS_ID="id_da_planilha"
GOOGLE_SHEETS_TAB="Leads"
GOOGLE_CLIENT_EMAIL="email_da_service_account"
GOOGLE_PRIVATE_KEY="chave_privada_da_service_account"
```

Nunca exponha credenciais do Google no frontend.

## Deploy na VPS

Fluxo recomendado para uma VPS Contabo:

```bash
npm install
npm run build
pm2 start npm --name e2boost -- run start
pm2 save
```

Use o Nginx como proxy reverso para o servidor Node ou para encaminhar apenas `/api` para a porta `3001`.

## Build e Deploy

Para gerar a build:

```bash
npm run build
```

O resultado fica em:

```txt
dist/
```

Essa pasta pode ser publicada em plataformas como Vercel, Netlify, Cloudflare Pages ou em um servidor proprio. Caso o formulario passe a usar backend proprio, prefira um deploy que suporte rotas de API ou um servidor Node separado.

## Status

Projeto em desenvolvimento, com foco em landing page comercial para captacao de leads da E2Boost.
