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

## Scripts

```bash
npm run dev
```

Inicia o servidor local de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao em `dist/`.

```bash
npm run preview
```

Visualiza localmente a build de producao.

```bash
npm run lint
```

Executa a verificacao de tipos com TypeScript.

## Formulario de Leads

Atualmente, o formulario de contato e o modal de consultoria simulam o envio e salvam os dados no `localStorage` do navegador com a chave `e2boost_leads`.

Para producao, o caminho recomendado e criar uma API backend, por exemplo `POST /api/leads`, e enviar os dados para:

- Google Sheets
- CRM
- webhook de automacao
- banco de dados

Como o projeto ja usa TypeScript e possui `express` instalado, a integracao mais natural seria criar uma pequena API em Node/Express e proteger as credenciais em variaveis de ambiente.

## Variaveis de Ambiente

O arquivo `.env.example` pode ser usado como referencia para configurar chaves e URLs do ambiente.

Para uma futura integracao com Google Sheets, as variaveis poderiam seguir este formato:

```env
GOOGLE_SHEETS_ID="id_da_planilha"
GOOGLE_CLIENT_EMAIL="email_da_service_account"
GOOGLE_PRIVATE_KEY="chave_privada_da_service_account"
APP_URL="http://localhost:3000"
```

Nunca exponha credenciais do Google no frontend.

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
