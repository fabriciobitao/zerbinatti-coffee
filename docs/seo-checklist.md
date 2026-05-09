# SEO Checklist — Zerbinatti Coffee

Gate de release pra ativar indexacao em producao. Setar `SEO_INDEX=true` no Cloud Run env vars + redeploy ativa em 1 commit.

## Pre-launch (branch `seo`) — STATUS

### Indexacao base
- [x] `src/app/sitemap.ts` retorna XML valido com 16 rotas (home, 3 PDPs, /fazenda, /processo, /para-empresas, /revista + 3 artigos, /termos, /privacidade, /entregas)
- [x] `src/app/robots.ts` substitui `public/robots.txt` (deletado)
- [x] `robots.ts` Allow `/`, Disallow `/api/*`, `/_next/*` quando `SEO_INDEX=true`
- [x] `metadataBase` aponta pra `https://zerbinatticoffee.com`
- [x] `metadata.robots` controlado por `process.env.SEO_INDEX`
- [x] Cada rota dinamica tem `alternates.canonical`
- [x] Cada rota tem `openGraph` + `twitter` completos
- [x] Title template `%s | Zerbinatti Coffee` no layout root

### Structured data (JSON-LD)
- [x] Organization no layout root
- [x] WebSite no layout root
- [x] Product em `/cafes/[slug]` (3 PDPs) com offers BRL, aggregateRating, review[], additionalProperty
- [x] BreadcrumbList em PDPs e artigos
- [x] Article em `/revista/[slug]` (3 artigos) com publisher Organization
- [x] FAQPage na home (8 perguntas) + /processo (4 perguntas)
- [x] ItemList dos 3 cafes na home
- [ ] Validacao via `https://validator.schema.org/` (rodar com URL prod apos deploy)
- [ ] Validacao via `https://search.google.com/test/rich-results` (idem)

### Content
- [x] H1 unico por pagina com keyword principal
- [x] Home H1 contem "Café especial Zerbinatti, desde 1897"
- [x] `/fazenda` H1 contem "Fazenda Zerbinatti — Serra do Cabral · desde 1897"
- [x] Title templates com `%s | Zerbinatti Coffee`
- [x] Meta descriptions <160 chars em todas rotas
- [x] Internal linking revista -> PDP via RelatedProductCTA (3 artigos -> 3 PDPs)
- [x] Dictionary 10% off consistente em PT/EN/ES
- [x] /processo expandido (~700 palavras, 6 steps com paragrafo longo, 4 FAQs)

### Performance / midia
- [x] Hero `<Image priority>` com webp/avif (44KB / 32KB vs 146KB original)
- [x] Imagens criticas <300KB em webp+avif (rotulo: 415KB -> 46KB / 36KB)
- [x] Galeria com width/height (sem CLS)
- [x] FeatureCard sem `unoptimized` (pacote, selos, wordmark)
- [x] Press Start 2P removida (era importada mas nao usada)
- [x] AVIF habilitado em `next.config.ts` (formats + deviceSizes refinados)
- [x] ISR + revalidateTag substituindo `force-dynamic` (revalidate 3600s na home + PDPs)
- [ ] LCP <2.5s mobile (validar via Lighthouse apos deploy)
- [ ] CLS <0.1 (idem)
- [ ] Performance score >85 (idem)
- [ ] SEO score 100 (idem)

### Acessibilidade
- [x] Alt audit limpo via `scripts/audit-alt.mjs` (sem alts genericos)
- [x] Skip-to-content link em layout.tsx + estilos focus-only
- [x] Landmarks semanticos (`<main id="main">` em todas paginas)
- [ ] Accessibility score >95 (validar via Lighthouse)

### Analytics / tracking
- [x] GTM-PVDQBMTB carregado via `next/script` afterInteractive
- [x] `<noscript>` iframe pos-`<body>`
- [x] `NEXT_PUBLIC_GTM_ID` em `.env.example`
- [ ] `NEXT_PUBLIC_GTM_ID=GTM-PVDQBMTB` em prod (Cloud Run env vars)
- [x] dataLayer.push em add_to_cart, view_item, remove_from_cart, begin_checkout, generate_lead, sign_up
- [x] CSP cobre googletagmanager + google-analytics + connect.facebook.net
- [ ] Tag Assistant Preview verde (validar apos deploy com URL prod)
- [ ] Configurar tags GA4 + Google Ads no container via skill `gtm-control` (precisa Measurement ID + Conversion ID do user)

### Lead magnet
- [x] PDF guia brewing em `/downloads/guia-brewing-zerbinatti.pdf` (162KB, gerado via `scripts/generate-guia-pdf.mjs`)
- [x] HTML fonte em `/downloads/guia-brewing-zerbinatti.html` (re-gerar PDF apos editar)
- [x] Newsletter copy reescrita em PT/EN/ES prometendo o PDF
- [x] NewsletterForm dispara `sign_up` event no GTM
- [ ] `/api/newsletter/subscribe` real (Resend audience + email com link do PDF) — TODO existente no NewsletterForm

## Pos-launch (manual user)

- [ ] `SEO_INDEX=true` em Cloud Run env vars
- [ ] `NEXT_PUBLIC_GTM_ID=GTM-PVDQBMTB` em Cloud Run env vars
- [ ] Deploy revision (`gcloud builds submit` + `gcloud run deploy`)
- [ ] Validar `curl https://zerbinatticoffee.com/robots.txt` -> Allow `/` + Sitemap
- [ ] Validar `curl https://zerbinatticoffee.com/sitemap.xml` -> 16 URLs
- [ ] Google Search Console: adicionar propriedade
- [ ] Submeter sitemap.xml no GSC
- [ ] Bing Webmaster Tools: adicionar e submeter
- [ ] Solicitar indexacao manual das 3 PDPs no GSC
- [ ] Monitorar GSC Coverage report nas primeiras 2 semanas
- [ ] Tag Assistant Preview no GTM (tagassistant.google.com)
- [ ] Quando o user fornecer GA4 Measurement ID e Google Ads Conversion ID, invocar skill `gtm-control` pra configurar as tags do container `GTM-PVDQBMTB`

## Pendencias residuais (nao bloqueiam indexacao)

- `/para-empresas` ainda e HTML estatico em `public/novo-layout/` (Wave D no PROGRESS.md). robots ja foi flipado pra index, follow nesse HTML; canonical e og:* ja estavam la. Quando migrar pra React, adicionar JSON-LD Organization+Service.
- Reviews em `src/lib/data/products.ts` sao estaticas — futuro: Judge.me/Loox/Yotpo
- aggregateRating do PDP usa essas 3 reviews fixas

## Baseline registrado

- Build status: SUCCESS (Next.js 16.2.3, ~2.3s compile)
- Rotas geradas: 22 (home/PDPs/artigos/legais + sitemap.xml + robots.txt)
- Branch `seo` a partir de `main` (commit `aa09952`)
- Snapshot SEO em `docs/seo-snapshots/<timestamp>.json`
