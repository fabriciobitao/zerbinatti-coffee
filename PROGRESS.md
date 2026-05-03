# Zerbinatti Coffee — Progresso

**Última atualização:** 2026-05-03 (Ondas 1–5 fechadas, Lighthouse pós-otimização validado)

## O que é
E-commerce premium de café especial brasileiro com herança italiana (desde 1897). B2C + B2B + ecossistema editorial.

## Stack
- **Frontend:** Next.js 16 (App Router, Turbopack) + React 19 + TS + Tailwind v4
- **CMS:** Sanity (Studio embutido em `/studio`, schemas: article, page)
- **Pagamentos:** Stripe (DIFERIDO — v1 vende por WhatsApp via `NEXT_PUBLIC_WHATSAPP_NUMBER`)
- **Hosting:** Vercel (auto-deploy a cada push em `main`)
- **Email:** Resend (transacional + newsletter double opt-in HMAC SHA-256)
- **Analytics:** GA4 + Meta Pixel (em curso — gating por consent LGPD)
- **Observability:** Sentry (em curso)
- **Anti-abuse:** Upstash rate limit + Cloudflare Turnstile (em curso)

## Marca
- Paleta: bone `#F4EFE6`, ink `#1B1714`, olive `#4A5237`, line `#D9D0BE` (+ `--ink-mute-on-dark #A39C92` para WCAG)
- Tipografia: Fraunces (display italic), Inter (UI), JetBrains Mono (números/eyebrows)
- Vocabulário banido: paixão, jornada, experiência, premium, especial, mamma mia
- Tom: editorial italiano-brasileiro sóbrio (Aesop / Buly / NYT Magazine)

## Ondas concluídas

### Onda 1 — Auditorias + fixes A11y/Perf
- Auditorias: Brand, SEO, Security, UI Home, UI Internas, Performance, A11y, Copy, UX Assinatura
- WCAG 69% → 86% (Esc/focus trap mobile menu, contraste corrigido, NewsletterForm sem fail silent, skip link, id=main)
- Bundle slim (font weights enxutos, globals.css limpo, 7 imagens mortas removidas)

### Onda 2 — Design das páginas internas
- `docs/UI-SPEC-INTERNAS-2026-05-03.md` (1.280 linhas) — spec completa das 5 páginas

### Onda 3 — Implementação das 5 páginas internas
- `/assinatura` (pillar): 10 seções, 2 configuradores, FAQ 8 perguntas, sticky CTA mobile via IntersectionObserver
- `/sobre`: long-read 4 blocos cronológicos + timeline lateral sticky (desktop) / breadcrumb (mobile)
- `/cafes/[slug]`: 3 PDPs SSG com barras sensoriais 1-5 (não radar), generateMetadata por slug
- `/para-empresas`: 4 modelos visualmente idênticos + form B2B border-bottom-only com CNPJ algorítmico
- `/quiz`: 3 perguntas, slide horizontal 8px, resultado pré-preenche `/assinatura?cafe=...&freq=...`
- Componentes novos: Breadcrumb, SubscriptionConfigurator, StickySubscriptionCTA, EditorialFAQ, SobreTimeline, SensoryBars, B2BForm, QuizFlow

### Onda 4 — Sanity + Revista + Newsletter Resend + /cafes index
- Sanity Studio embutido em `/studio` (schemas: article + page)
- Revista renascida: listagem, [slug] com PortableText editorial, RSS 2.0
- Newsletter Resend com double opt-in (HMAC SHA-256, TTL 24h, timingSafeEqual)
- Email B2B via Resend ao receber form de contato
- `/cafes` índice (estava 404)
- Graceful degradation sem env vars (build CI passa)

### Onda 5 — Security Wave 2 + Analytics + LGPD
- 5a (Security): rate limit Upstash, Turnstile, Sentry com PII filter, Dependabot, CSP refinement
- 5b (Analytics+LGPD): GA4 + Meta Pixel com consent gating, banner LGPD, /privacidade, /termos

### Validação Lighthouse pós-otimização (mediana 3 runs mobile)
| Rota | Perf | A11y | LCP | CLS |
|---|---|---|---|---|
| / | 73 (+7) | 97 (+4) | 3,63s (-1,34s) | 0,000 |
| /assinatura | 69 (+3) | 96 (+8) | 3,76s (-1,20s) | 0,000 |
| /cafes/encerro | 68 (+8) | 98 (+3) | 3,81s (-1,23s) | 0,000 |

- A11y >95 nas 3 rotas (mínimo go-live cruzado)
- Perf >70 só na home; internas a 1-2 pts (ruído de mobile simulada)
- LCP -25% após remover preload genérico do hero JPG
- TBT continua alto (700-900ms) — próximo alvo se Onda 7

### Auditoria final + fixes (commit 0f87bfa)
- 3 audits paralelos: Code Review, A11y, Reality Check
- 6 blockers visuais + 6 HIGH issues fechados em batch
- Removidos placeholders Unsplash (Cafes, Story1897), fallbacks tipográficos
- /entregas, /fazenda, /processo reescritas no padrão editorial + JSON-LD AboutPage
- CartDrawer reescrito (paleta editorial, WhatsApp sem PII, order ID via crypto)
- A11y: peer-focus-visible em radios sr-only, live region só no total, Footer h4→h3
- Robustez: Zod no loadCart, warns de envs críticas em prod
- SEO: sitemap real (sem 404), robots /studio bloqueado, OG auto por rota
- Build verde, 31 rotas, type-check limpo

## Pendente

### Curto prazo (Onda 6 — go-live prep)
- Comprar domínio `zerbinatticoffee.com` (ação do user)
- Configurar DNS na Vercel + verificar SSL
- 301 redirects de cafe-alpha-five.vercel.app → domínio próprio
- Submeter sitemap ao Google Search Console + Bing Webmaster
- Verificar todos os env vars em produção na Vercel
- Smoke test completo das 11+ rotas
- Lighthouse final (LCP, INP, CLS) + Core Web Vitals real

### Médio prazo
- Stripe Subscriptions (quando user decidir ativar)
- Fotos reais (sessão fotográfica) substituir fallbacks editoriais nas PDPs e /sobre
- Popular Sanity com primeiros artigos da Revista
- Conectar audience Resend ao form
- Conta Cloudflare Turnstile + project Sentry + DB Upstash

### Longo prazo
- i18n (PT/EN)
- Reviews reais (Judge.me/Loox/Yotpo)
- Instagram/TikTok/YouTube
- Mais artigos na Revista (meta: 1/mês)

## Domínio
- **Teste:** https://cafe-alpha-five.vercel.app
- **Produção (a comprar):** zerbinatticoffee.com

## Documentos de referência (em `docs/`)
- BRAND-DIRECTION-2026-05-03.md
- SEO-STRATEGY-2026-05-03.md
- SECURITY-PLAN-2026-05-03.md
- UI-SPEC-HOME-2026-05-03.md
- UI-SPEC-INTERNAS-2026-05-03.md
- PERFORMANCE-AUDIT-2026-05-03.md
- A11Y-AUDIT-2026-05-03.md
- COPY-PAGES-2026-05-03.md
- UX-ASSINATURA-2026-05-03.md
