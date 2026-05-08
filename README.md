# Zerbinatti Coffee

E-commerce premium para cafe especial Zerbinatti (heranca italiana desde 1897). Frontend Next.js 16 (App Router) + Shopify Storefront API, hospedado em Cloud Run (GCP).

## Stack
- Next.js 16 (App Router, Server Components, Server Actions)
- Tailwind CSS v4 + TypeScript
- Shopify Storefront API (loja `zerbinatticoffee.myshopify.com`)
- Zustand (cart store)
- i18n PT/EN/ES via Context

## Desenvolvimento
```bash
npm install
npm run dev
```
Servidor em `http://localhost:3000`. Variaveis em `.env.local` (ver `.env.example`).

## Deploy (Cloud Run, projeto `zerbinatti-cafe`, regiao `southamerica-east1`)
```bash
gcloud builds submit --config=cloudbuild.yaml --region=southamerica-east1 .
gcloud run deploy zerbinatti-coffee \
  --image=southamerica-east1-docker.pkg.dev/zerbinatti-cafe/cloud-run-source-deploy/zerbinatti-coffee:latest \
  --region=southamerica-east1
```
URL de teste: https://zerbinatti-coffee-259156177034.southamerica-east1.run.app

## Estrutura
- `src/app/(home)/` — home composta (Hero, Cafes, Processo, Subscription, Historia, Footer)
- `src/app/cafes/[slug]/` — PDP por slug
- `src/app/para-empresas/` — landing B2B
- `src/lib/cart/` — Server Actions + Zustand store
- `src/lib/shopify.ts` — Storefront API client
- `src/lib/i18n/` — dicionario 186 chaves x 3 locales
- `src/proxy.ts` — middleware (rewrites + redirects)
