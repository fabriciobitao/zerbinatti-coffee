# Zerbinatti Coffee — Progresso

**Ultima atualizacao:** 2026-05-09 (parte 4) — Hardening em PROD. Revision Cloud Run `zerbinatti-coffee-00024-tlh` 100% trafego. Turnstile + double opt-in + CSP sem wildcards validados via curl.

## Sessao 2026-05-09 (parte 4) — Merge security -> main + deploy em PROD

- [x] Merge `security` -> `main` (commit merge `3e49737`), 4 commits novos.
- [x] Cloud Build `a35dc062-9121-4cda-a909-9cf366a91b45` SUCCESS em 2m11s. Imagem: `southamerica-east1-docker.pkg.dev/zerbinatti-cafe/cloud-run-source-deploy/zerbinatti-coffee:latest`.
- [x] Cloud Run revision **`zerbinatti-coffee-00024-tlh`** com 100% trafego. Env vars novas: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEWSLETTER_SECRET` (32 chars random), `B2B_NOTIFY_EMAILS`, `NEXT_PUBLIC_SITE_URL`.
- [x] Firebase Hosting redeploy pra invalidar cache CDN (estava servindo CSP antigo).
- [x] Validacao curl em prod:
  - `POST /api/b2b-form` sem turnstileToken -> `{"error":"turnstile_failed","reason":"missing_token"}` ✓
  - `POST /api/newsletter/subscribe` sem turnstileToken -> idem ✓
  - CSP em `zerbinatticoffee.com` sem wildcards `*.googletagmanager.com` / `*.google-analytics.com` ✓
  - `connect-src` com `zerbinatticoffee.myshopify.com` exato (sem `*.myshopify.com`) ✓
  - GET `/`, `/cafes/classico`, `/para-empresas`, `/fazenda`, `/processo`, `/revista`: todos 200 ✓
- [x] Service account ainda eh default Compute (`259156177034-compute@`). Migracao pra SA dedicada pendente — rodar `bash scripts/security-cloudrun-bootstrap.sh` quando quiser (ai movimenta tambem secrets pro Secret Manager).

### Pendencias da sessao
- [ ] Rodar `scripts/security-cloudrun-bootstrap.sh` pra SA dedicada + secrets em Secret Manager (opcional, hardening adicional).
- [ ] Tag Assistant validar GTM em prod com novo CSP (deve continuar funcionando — testes via curl OK).
- [ ] Smoke E2E manual via UI: enviar form B2B real com Turnstile passando + clicar link de confirmacao da newsletter.

---

## Sessao 2026-05-09 (parte 3) — Hardening de seguranca implementado (branch `security`)

## Sessao 2026-05-09 (parte 3) — Hardening de seguranca implementado (branch `security`)

Plano executado: 5 fases em codigo + script bootstrap pra Cloud Run + checklist final. 4 commits na branch `security`, build verde em todos.

### O que foi feito
- [x] **Turnstile (Cloudflare CAPTCHA invisivel)** em `/api/b2b-form` + `/api/newsletter/subscribe` + form B2B HTML legacy. `src/lib/turnstile.ts` + `src/components/security/TurnstileWidget.tsx`. No-op em dev sem secret.
- [x] **Newsletter double opt-in (LGPD)**: status `pending` -> email Resend com link HMAC -> `/api/newsletter/confirm` valida `timingSafeEqual` -> ativa.
- [x] **CSP hardening**: removidos wildcards `*.googletagmanager.com`, `*.google-analytics.com`, `*.myshopify.com`, `*.sentry.io`. Hostnames exatos. `'unsafe-inline'` mantido (GTM init) com comentario explicando.
- [x] **Logs em prod**: `errorId` UUID em vez de stack trace. Retornado no JSON pra correlacao Cloud Logging.
- [x] **`B2B_NOTIFY_EMAILS` env** com fallback hardcoded; documentado em `.env.example`.
- [x] **`public/novo-layout/index.html` deletado** (legacy 3.8k linhas, era acessivel em `/novo-layout/index.html`).
- [x] **`scripts/security-cloudrun-bootstrap.sh`** idempotente: cria SA dedicada `zerbinatti-coffee-runtime@`, sobe 4 secrets pro Secret Manager (shopify-webhook, resend, turnstile, newsletter), atualiza service.
- [x] **`docs/security-checklist.md`** com status implementado vs pendente.
- [x] **`lessons.md`** atualizado com 7 regras de hardening (anti-PII dataLayer, secrets em SM, SA dedicada, Turnstile, double opt-in, errorId, CSP unsafe-inline).

### Cloudflare Turnstile (entregue pelo user)
- Site Key (publica): `0x4AAAAAADMDeKbvCnEk0JVY` — em `.env.local` como `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Secret Key: em `.env.local` como `TURNSTILE_SECRET_KEY` (gitignored)
- Hostnames: `zerbinatticoffee.com`, `zerbinatti.coffee`, `localhost`

### Commits na branch `security`
```
4676e21 chore(security): deleta novo-layout/index.html legacy + lessons hardening
639c75b security(csp): remove wildcards e Sentry generico (apenas hostnames exatos)
105b555 security(turnstile+optin): Cloudflare Turnstile invisivel + double opt-in newsletter
845ae8a docs(security): plano de hardening + atualiza PROGRESS  ← base
```

### Pendente do user pra deploy em prod
- [ ] Setar `NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADMDeKbvCnEk0JVY` e `TURNSTILE_SECRET_KEY=<secret>` no Cloud Run.
- [ ] Rodar `bash scripts/security-cloudrun-bootstrap.sh` pra criar SA dedicada + mover secrets pro Secret Manager (idempotente; header explica vars exportadas necessarias).
- [ ] `B2B_NOTIFY_EMAILS=fabricio.fazer@gmail.com,fabiomenezes@gmail.com` no Cloud Run (opcional, fallback hardcoded mantido).
- [ ] Merge `security` -> `main` apos validar curl/Tag Assistant em staging.

### Riscos aceitos (do plano original)
- **Token Shopify Admin `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`** em git history (commits `5eb9314`/`e1d5fec`). Sem revoke.
- **VERCEL_OIDC_TOKEN** ja expirado em 16/04. Sem acao.

### Backlog (P3 — nao implementado)
- Webhook Shopify replay protection via `X-Shopify-Webhook-Id` dedupe (precisa Upstash).
- HSTS preload submission em `hstspreload.org`.
- postcss XSS transitive (aguardar Next 16.x patch).

---

## Sessao 2026-05-09 (parte 2) — Auditoria de seguranca (branch `security`)

Auditoria full-stack rodou em paralelo com 2 agentes (Security Engineer + Explore). Plano de remediacao salvo em `docs/security-plan.md` na branch `security`. **NAO foi implementado nada nesta sessao** — apenas o diagnostico + plano. Continuar em outra sessao.

### Achados criticos (P0) — risco aceito pelo user
- **Token Shopify Admin `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`** vazado em commits `5eb9314`/`e1d5fec` (em git history publico). User decidiu nao revogar nem reescrever historico — repo "publico mas so 2 devs".
- **`VERCEL_OIDC_TOKEN`** em historico (ja expirado em 16/04). Sem acao.

### Achados a implementar (P1) — pendentes pra proxima sessao
1. **Sem rate limit / CAPTCHA em `/api/b2b-form` e `/api/newsletter/subscribe`**. Honeypot atual fura com Puppeteer. Solucao escolhida: **Turnstile (Cloudflare)** invisible. User precisa criar conta Cloudflare + me passar `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` (ja documentados em `.env.example`).
2. **CSP wildcards desnecessarios** em `next.config.ts:11,39-40` (`*.googletagmanager.com`, `*.google-analytics.com`) — substituir por hostnames exatos.
3. **CSP `'unsafe-inline'`** em script-src — manter por enquanto (necessario pelo GTM init); documentar em `lessons.md`.
4. **Newsletter sem double opt-in** — risco LGPD. Implementar fluxo: status `pending` -> email Resend com link HMAC -> `/api/newsletter/confirm?token=...` -> status `active`. `NEWSLETTER_SECRET` ja em `.env.example`.
5. **`/api/debug-shopify`** em prod sem auth — verificar conteudo, deletar ou proteger.

### Achados a implementar (P2)
6. **Hardcoded notify emails** (`fabricio.fazer@gmail.com`, `fabiomenezes@gmail.com`) em `b2b-form/route.ts:7` -> mover pra env var `B2B_NOTIFY_EMAILS`.
7. **Stack traces em logs prod** -> log so `message` + `errorId` UUID.
8. **`public/novo-layout/index.html`** (3.8k linhas legacy v1, sem rota) -> deletar. `para-empresas.html` mantem ate Wave D.
9. **Cloud Run service account** — provavelmente default Compute SA com `roles/editor` global. Criar SA dedicada `zerbinatti-coffee-runtime@` com `roles/datastore.user` + `roles/secretmanager.secretAccessor`. Script `scripts/security-cloudrun-bootstrap.sh` a criar.
10. **Secrets em env var Cloud Run** (`SHOPIFY_WEBHOOK_SECRET`, `RESEND_API_KEY`) -> mover pra Secret Manager.

### Backlog (P3)
- Webhook Shopify replay protection via `X-Shopify-Webhook-Id` dedupe (precisa Upstash, nao escolhido)
- postcss XSS transitive (aguardar Next 16.x patch)
- HSTS preload submission em `hstspreload.org`
- Documentar regra anti-PII no dataLayer em `lessons.md` (auditado: hoje OK)

### Estado da branch `security`
- Branch criada a partir de `main` `35b5e06`. Sem commits novos alem do plano em `docs/security-plan.md`.
- Plano detalhado com 7 fases + sequencia de 10 commits sugerida em `docs/security-plan.md`.
- AI nao executou implementacao — proxima sessao retoma a partir desse plano.

### Acao do user pendente pra proxima sessao
- [ ] Criar conta Cloudflare + Turnstile widget pra `zerbinatticoffee.com`; passar SITE_KEY e SECRET_KEY pra IA
- [ ] Decidir se ainda usa `/api/debug-shopify` ou pode deletar
- [ ] (Opcional) Decidir se quer Sentry (env vars ja preparadas) pra Fase 5.2 logs com errorId

---

## Sessao 2026-05-09 — Revisao SEO completa (branch `seo`)

Branch dedicada `seo` a partir de `main` (commit `aa09952`). 9 commits faseados, build verde em todos.

### Indexacao base (Fase 1)
- [x] `src/app/sitemap.ts` dinamico — 16 rotas com priority/changeFrequency (home 1.0, PDPs 0.9, fazenda/processo 0.8, revista 0.7, legais 0.3)
- [x] `src/app/robots.ts` controlado por `process.env.SEO_INDEX` — flip de 1 env var ativa indexacao em prod
- [x] `public/robots.txt` deletado (substituido pela rota dinamica)
- [x] Layout root: title template `%s | Zerbinatti Coffee`, canonical `/`, robots dinamico, applicationName/authors/creator
- [x] Cada PDP `/cafes/[slug]`: generateMetadata com canonical/openGraph (type=website + product image)/twitter card
- [x] Cada artigo `/revista/[slug]`: openGraph type=article (publishedTime, authors, section)
- [x] Demais rotas (fazenda, revista, para-empresas, processo, termos, privacidade, entregas): metadata canonical+og+twitter dedicado

### Structured data JSON-LD (Fase 2)
- [x] `src/components/seo/JsonLd.tsx` — helper safe-by-default (escape `</script>`)
- [x] `src/lib/seo/schemas.ts` — factories Organization, WebSite, Product (offers BRL + aggregateRating + review[] + additionalProperty origem/safra/SCA), Article, BreadcrumbList, FAQPage
- [x] `src/lib/data/faqs.ts` — 8 perguntas curadas (especial, armazenamento, moagem, assinatura, frete, torra, comparativo Classico/Reserva/Microlote, certificacao SCA)
- [x] Aplicado: Organization+WebSite no layout root; Product+Breadcrumb em 3 PDPs; Article+Breadcrumb em 3 artigos; FAQPage+ItemList na home; BreadcrumbList+FAQPage(4 perguntas) em /processo

### Content / H1 / RelatedProductCTA (Fase 3)
- [x] hero.title PT/EN/ES: adicionado "Café especial Zerbinatti" no `<span class="since">` sem alterar visual
- [x] /fazenda H1: "Fazenda Zerbinatti" + subtitle "Café especial Serra do Cabral · desde 1897" (CSS .farm-hero-subtitle)
- [x] /processo: virou pagina indexavel real (removido redirect /processo->/#processo); cada step ganhou paragrafo expandido (~80 palavras); 4 FAQs sobre processo + FAQPage schema; total ~700 palavras
- [x] `src/components/revista/RelatedProductCTA.tsx`: card com badge/preco PIX/CTA "Ver detalhes" — terroir->microlote, torra->classico, historia->reserva
- [x] Fix dictionary: `sub.priceMonthOff` EN/ES "15% off" -> "10% off" (consistencia PT)

### Performance / midia (Fase 4)
- [x] `scripts/optimize-images.mjs` (sharp) — converte JPG/PNG -> webp+avif, recomprime webp grandes em q78. Auto-deleta variants maiores que original
- [x] Imagens: hero-bg 146KB->44KB webp/32KB avif (-78%); rotulo-500g 415KB->46KB/36KB (-91%); wordmarks 76-122KB->22-56KB; og-share 83KB->33KB/24KB
- [x] Hero LCP: backgroundImage CSS -> `<Image priority fill sizes="100vw">`; selos com width/height + alt descritivo + lazy
- [x] `next.config.ts`: images.formats avif+webp, deviceSizes 360/414/640/.../1920, imageSizes 16-384
- [x] FeatureCard: removido `unoptimized` em wordmark/pacote/selos; alt descritivo (Certificacao SCA, Selo Cafe Organico); priority no pacote do Classico (above-the-fold)
- [x] Galeria: width/height em todas 7 imagens (previne CLS)
- [x] Press Start 2P removida (importada mas nunca usada via `--pixel` em CSS)
- [x] **ISR ativado**: home `/` e PDPs `/cafes/[slug]` agora SSG com revalidate 3600s (substituindo `force-dynamic`); shopifyFetch nas leituras com cache=force-cache + tags ja existentes; webhook /api/revalidate continua disparando revalidateTag em product update
- [x] Trade-off: stale ate webhook chegar (~segundos). Bot do Google nao paga SSR a cada crawl.

### Acessibilidade (Fase 5)
- [x] Skip-to-content link em layout.tsx (focus-only) + estilos em globals.css
- [x] `<main id="main">` em todas paginas (home, fazenda, PDPs, revista, /processo via StaticPage, /para-empresas, /termos, /privacidade, /entregas)
- [x] `scripts/audit-alt.mjs` — detecta alts vazios/genericos. Todos os 30+ `<img>`/`<Image>` passaram

### Analytics / GTM (Fase 5.5)
- [x] `src/components/analytics/GtmScripts.tsx` — `<Script next/script afterInteractive>` no `<head>` + `<noscript>` iframe pos-`<body>`; controlado por `NEXT_PUBLIC_GTM_ID`
- [x] `.env.example`: `NEXT_PUBLIC_GTM_ID=GTM-PVDQBMTB` documentado
- [x] `src/lib/analytics/dataLayer.ts` — pushEvent, pushEcommerce (limpa ecommerce object antes pra evitar leak), pushLead. Tipos GA4Item compativeis com GA4 Enhanced Ecommerce
- [x] `src/components/analytics/ViewItemTracker.tsx` — client island dispara view_item no mount da PDP
- [x] Eventos plugados:
  - view_item: mount /cafes/[slug] (preco PIX -10%)
  - add_to_cart: Zustand store addItem apos mutation Shopify
  - remove_from_cart: Zustand store removeLine
  - begin_checkout: CartDrawer onClick do botao "Finalizar"
  - generate_lead: B2BForm submit (method=whatsapp + segment + volume)
  - sign_up: NewsletterForm submit (method=newsletter)
- [x] CSP em next.config.ts ja cobre googletagmanager + google-analytics + connect.facebook.net

### Lead magnet (Fase 6)
- [x] `public/downloads/guia-brewing-zerbinatti.pdf` (162KB) — gerado via `scripts/generate-guia-pdf.mjs` (puppeteer-core + Chrome local) a partir de `guia-brewing-zerbinatti.html`
- [x] HTML do guia: layout A4 Cormorant+Inter+gold, fundamentos (frescor/moagem/agua), tabela de moagem por metodo, 4 receitas passo-a-passo, top 5 erros, recomendacao por SKU
- [x] Newsletter copy PT/EN/ES reescrita prometendo o PDF como lead magnet
- [x] NewsletterForm dispara `sign_up` event

### Validacao (Fase 7)
- [x] `scripts/seo-snapshot.mjs` — puppeteer-core captura title/description/canonical/og:*/twitter:*/JSON-LD/H1/robots de cada rota; salva em `docs/seo-snapshots/<timestamp>.json`
- [x] `public/novo-layout/para-empresas.html`: robots `noindex,nofollow` -> `index,follow` (HTML estatico via proxy.ts rewrite; quando migrar pra React em Wave D, adicionar JSON-LD)
- [x] `docs/seo-checklist.md`: gate de release com lista do que foi feito + pendencias pos-deploy

### Como ATIVAR a indexacao em prod
1. Setar `SEO_INDEX=true` no Cloud Run env vars
2. Setar `NEXT_PUBLIC_GTM_ID=GTM-PVDQBMTB` no Cloud Run env vars
3. Merge `seo` -> `main` (apos review do user)
4. Disparar build + deploy (`gcloud builds submit --config=cloudbuild.yaml` + `gcloud run deploy`)
5. Validar:
   - `curl https://zerbinatticoffee.com/robots.txt` -> Allow `/` + Sitemap + Host
   - `curl https://zerbinatticoffee.com/sitemap.xml` -> 16 URLs XML
   - Lighthouse mobile: Performance >85, SEO 100, Accessibility >95
   - https://search.google.com/test/rich-results em PDP/artigo/home
6. Google Search Console: adicionar propriedade + submeter sitemap; idem Bing
7. Quando user tiver GA4 Measurement ID e Google Ads Conversion ID, usar skill `gtm-control` pra configurar tags do container `GTM-PVDQBMTB` via API

---

## Sessao 2026-05-08 (parte 4) — Checkout custom + branding + cache fix + Em Breve mode

### Custom checkout URL (`checkout.zerbinatticoffee.com`)
- [x] Conectado domain no Shopify Admin (DNS Cloudflare-only CNAME -> `shops.myshopify.com`)
- [x] Setado como **primary domain** na loja → `cartCreate` agora retorna `https://checkout.zerbinatticoffee.com/checkouts/cn/...`
- [x] Cliente nunca mais ve `myshopify.com` — fluxo aparenta ser tudo zerbinatticoffee.com
- [x] Redirect via `theme.liquid` — quando alguem entra na raiz `checkout.zerbinatticoffee.com/`, JS+meta refresh manda pra `https://zerbinatticoffee.com` (esconde vitrine padrao Shopify)

### Checkout branding (Zerbinatti gold + dark)
- [x] Logo: banner gerado em `public/assets/zerbinatti-checkout-banner-dark.png` (2400x240, `logo-white.png` cream centralizado em fundo `#1F1611`) — Logo position "Full width" no Checkout Editor cobre o header inteiro com o banner escuro
- [x] Cores aplicadas no Shopify Checkout Editor: Accent/Buttons `#C9A961`, Order Summary bg `#F4ECD8`, Main bg `#FFFFFF`
- [x] Fonts: Cormorant (headings) + Inter (body), via Google Fonts no editor
- [x] Resultado: botao "Pay now" dourado, painel cream sutil, link Privacy policy gold

### Webhook de revalidacao Shopify -> Next.js
- [x] Rota `src/app/api/revalidate/route.ts` (HMAC sha256, env `SHOPIFY_WEBHOOK_SECRET`)
- [x] Webhook configurado no Shopify Admin: Event `Product update` -> `https://zerbinatticoffee.com/api/revalidate` -> 200 quando HMAC valido, chama `revalidateTag` + `revalidatePath`
- [x] Secret salvo como env var no Cloud Run via `--update-env-vars`

### Cache fix (problema dos precos nao refletindo na home)
- [x] **Root cause**: `priceOverrideBRL` HARDCODED em `src/lib/editorial/classico.ts` (49,90 / 79,90) sobrescrevia silenciosamente o preco da Storefront API. NAO era cache.
- [x] Lessons learned: gastei 1h investigando ISR/CDN/webhook antes de descobrir o override. Lesson registrada em `lessons.md`: **grep por hardcodes do valor antigo no codigo ANTES de assumir cache issue**.
- [x] Removido `priceOverrideBRL` (commit `03eb7f1`); home agora puxa preco do Shopify ao vivo
- [x] Cache strategy: `cache: 'no-store'` no `shopifyFetch` + `dynamic: 'force-dynamic'` na home/PDP. Trade-off: 1 chamada Storefront API por render. Free tier aguenta.
- [x] Quando virar gargalo, otimizar pra ISR + `'use cache'` + cacheTag (Next.js 16 nova API)

### "Em breve" mode (commit `ac37356`)
- [x] **Estado atual**: loja em modo coming-soon visualmente, mas **infra de venda 100% funcional** (cart Shopify, checkout custom, webhook ativo)
- [x] AddToCartButton (home + PDP): badge "Em breve" nao-interativo no lugar do botao
- [x] Subscription: CTA principal substituido por **selo dourado pulsante** "● EM BREVE" (mono caps, border gold, animacao 2s)
- [x] SubscriptionPlanCard: cards sem link, sem preco, sem clique — so info (titulo, freq, descricao, badge)

### 🔓 Como REATIVAR a venda (quando estoque + tudo pronto)
1. `git revert ac37356 --no-edit && git push origin main`
2. Disparar build + deploy (gcloud builds submit + gcloud run deploy + firebase deploy --only hosting)
3. Validar via `node scripts/flow-checkout.mjs https://zerbinatticoffee.com/`

### Planilhas de custos (em `docs/`)
- [x] `custos-plataforma-2026-05-08.xlsx` — 5 abas: Shopify (Basic/Grow/Advanced/Plus), Pagamento BR, Infra GCP+Firebase, Cenario Total com break-even Basic vs Grow vs Advanced, Sources
- [x] `frete-estimativas-2026-05-08.xlsx` — 35 destinos a partir de 37570-000, PAC/Jadlog/Sedex pra 250g e 500g, sugestao de zonas flat rate por regiao
- [x] Ambos no Drive: pasta "Zerbinatti Coffee" (xlsx originais) + Google Sheet v2 com Grow no root do meu Drive (link: `1syS-Tl-Kb0jsA5jI4Zr_oOBI2kcwBdukoBfclWjHeIg`)

### Pendencias (ordem de impacto)
- [ ] **PIX + Boleto** no Shopify (hoje so Cartao + PayPal — critico no BR)
- [ ] **Frete real** via Melhor Envio + Gadol app (precisa CCS — $20/mes ou plano anual)
- [ ] Subir versao do Online Store sales channel pra esconder vitrine padrao Shopify de vez (alternativa ao redirect via theme)
- [ ] Wave D: migrar `/para-empresas` HTML estatico pra React
- [ ] Trocar `robots: noindex` por `index, follow` quando lancar oficial
- [ ] Otimizar cache: voltar pra ISR + webhook quando descobrir a sintaxe certa do Next.js 16 (`'use cache'` + `cacheTag` + `revalidateTag(tag, profile)`)

---

## Sessao 2026-05-08 (parte 3) — Bloco Assinatura + reorder home + imagem fazenda + deploy

### Override editorial dos precos do Classico (home puxa Shopify ao vivo)
- [x] Descoberto: home `Cafes.tsx` puxa preco direto do Shopify Storefront API. Editar `products.ts` ou CSV nao afeta a home enquanto Shopify nao for reimportado.
- [x] Solucao: `EditorialVariantSlot.priceOverrideBRL` em `src/lib/editorial/classico.ts` (49,90 / 79,90), aplicado em `mapVariant` (`src/lib/products.ts`).
- [x] Override e local — sera removido quando user reimportar SKUs no Shopify admin.

### Reorder das secoes da home
- [x] Inicialmente movido Subscription pra antes de Processo
- [x] Voltado: Subscription **logo apos** Processo (4 rituais)
- [x] Ordem final: `cafes → processo → assinatura → video → galeria → laudo → historia`

### Bloco #assinatura redesenhado (Subscription.tsx + novo-layout.css)
- [x] Precos recalculados sobre os novos do Classico (10% off):
  - Plan 1 Quotidiano: 107,73 → **134,73** (3× moído 250g)
  - Plan 2 Doppio Rituale: 98,82 → **116,82** (1× 250g + 1× 500g)
  - Plan 3 Maestro: 188,73 → **215,73** (3× grãos 500g)
- [x] Atualizado nas 3 locales (PT/EN/ES) em `dictionary.ts`
- [x] Headline "Assinatura Mensal" virou **mega titulo** Cormorant italic com gradient dourado (clamp 56-132px desktop / 54-84px mobile), drop-shadow sutil
- [x] Eyebrow novo "— Clube Zerbinatti" mono caps com letterspacing
- [x] Tagline "Café fresco, todo mês, na sua porta" demovida pra italica menor
- [x] Lista de perks acima do CTA: 10% off · pause/cancele · torra do mes
- [x] Cards: shimmer sweep dourado no hover, lift sutil, shadow + border-glow
- [x] Card featured: gradient bg + drop-shadow dourado, preco italico dourado
- [x] Numerais romanos maiores (56px) com text-shadow dourado
- [x] Badge "Mais escolhido" movido do Plan II para o **Plan I (Quotidiano)** — chave i18n nova `sub.featured.badge` (PT/EN/ES) substitui a antiga `sub.plan2.badge`

### Imagem trocada em /fazenda (bloco Heranca 1897)
- [x] `galeria/4.webp` (pacotes Zerbinatti) → `galeria/peneirar.webp` (mao peneirando graos ao sol)
- [x] Convertido via sharp: 1179×990, webp q82, 59KB
- [x] CSS `farm-heritage-image` em `fazenda.css` aponta pra nova imagem

### Deploy de producao (revision 00011)
- [x] **Bloqueio resolvido:** gcloud CLI quebrado por Python 3.9 incompativel (erro proto `_MessageClass | _MessageClass`). Instalado Python 3.12.13 via `uv` em `~/.local/bin/python3.12` e exportado `CLOUDSDK_PYTHON` apontando pra ele.
- [x] **Bloqueio resolvido:** TypeScript falhou no build (Next.js 16 mudou assinatura de `revalidateTag` — agora exige `(tag, profile)`). Webhook `/api/revalidate` ajustado pra passar `"default"` profile (commit `ede88d1`).
- [x] Auth: logado como `fabricio.fazer@gmail.com` (owner do projeto `zerbinatti-cafe`).
- [x] Cloud Build `c7ae16ec-d2a8-4499-9b19-c23a67a2d996` SUCCESS em 2m11s
- [x] Cloud Run revision **`zerbinatti-coffee-00011-hxf`** em southamerica-east1 com 100% do trafego
- [x] Validado em prod (`https://zerbinatti-cafe.web.app`):
  - Precos Classico: 49,90 / 79,90 ✅
  - Precos Assinatura: 134,73 / 116,82 / 215,73 ✅
  - Altitude /fazenda: 640-760m ✅
  - Imagem peneirar.webp 200 OK ✅
  - Zero rastros dos precos antigos ✅

### Acao do user pendente
- [ ] Reimportar `docs/shopify-import-products.csv` no Shopify admin (ou editar SKUs ZRB-CLA-250-M / ZRB-CLA-500-G manualmente) pra refletir os novos precos no Storefront API. Quando feito, remover `priceOverrideBRL` em `editorial/classico.ts`.

---

## Sessao 2026-05-08 (parte 2) — Redesign /fazenda + Arara + novos precos

### /fazenda redesenhada no estilo da home
- [x] Nova `/fazenda` em dark + dourado + serif Cormorant + mono JetBrains (mesma identidade da home)
- [x] Arquivos novos:
  - `src/app/fazenda/layout.tsx` — importa `(home)/novo-layout.css` + `fazenda.css`
  - `src/app/fazenda/fazenda.css` — estilos das secoes especificas (~380 linhas, todas escopadas em `.novo-layout`)
- [x] Pagina rebuilt com `HomeHeader` + `HomeFooter` + `CartDrawer` + `RevealObserver`
- [x] Secoes:
  1. Hero compacto (78vh) com bg `assets/galeria/3.webp`, eyebrow "Origem · Serra do Cabral", titulo "A *Fazenda*", desc, e meta-grid 4 colunas (640-760m / 88 SCA / III geracoes / 1897)
  2. "Heranca 1897" estilo `.story` com imagem `galeria/4.webp` + carimbo "Famiglia Zerbinatti" + 3 paragrafos
  3. "Numeros da fazenda" — grid 4 cells com numeros serif italico dourados
  4. "Variedades, Processo & Terroir" — 3 cards bg-1 com listas premium (bullet dourado)
  5. "Visitas" CTA — moldura dourada com `btn-gold` + `btn-ghost`
- [x] Anchors do `HomeHeader`, `MobileDrawer`, `HomeFooter` atualizados de `#cafes` → `/#cafes` (etc) para funcionarem cross-page

### Variedade trocada para Arara (so Arara em producao atualmente)
- [x] `/fazenda` card "Variedade" — Arara 100% da producao + nota sobre futuras variedades
- [x] `src/lib/data/products.ts`:
  - Classico (linha 74): variety → `"Arara"`
  - Reserva (linhas 116, 128): longDescription "Yellow Bourbon" → "Arara"; variety → "Arara"
  - Micro-Lote (linhas 175, 187, 198): "Geisha" → "Arara" em longDescription, variety, harvest "lote Arara 01"
  - Reviews 207 e 223: textos com "Geisha" → "Arara"
- [x] `src/lib/editorial/classico.ts` linha 77: variety → "Arara"
- [x] `src/lib/i18n/dictionary.ts` (PT/EN/ES): `proc.cultivo.desc` reescrito para Arara como variedade unica + descricao do hibrido (Obata x Catuai Amarelo)
- [x] `docs/shopify-import-products.csv`: altitude 900-1.100m → 640-760m, variedade → Arara, tags atualizadas, SEO description
- [x] `scripts/test-products.mjs`: altitude + variety
- [x] Verificado via grep: zero ocorrencias antigas (Catuai/Mundo Novo/Yellow Bourbon/Geisha) em copy comercial

### "Secagem em terreiro suspenso" → "Secagem ao sol em terreiro"
- [x] `/fazenda` (lista processo + paragrafo de heranca)
- [x] `dictionary.ts` PT (`proc.secagem.desc`)
- [x] EN: "raised beds" → "patio"
- [x] ES: "patios elevados" → "patio"
- [x] `/processo` etapa 2 da timeline
- [x] `public/novo-layout/index.html` (2 ocorrencias)

### Novos precos do Classico
- [x] 250g moido: R$ 39,90 → **R$ 49,90**
- [x] 500g em graos: R$ 69,90 → **R$ 79,90**
- [x] Atualizado em:
  - `src/lib/data/products.ts` (SKU Classico, alimenta PDP `/cafes/classico`)
  - `public/novo-layout/index.html` (6 ocorrencias: cards, shop cards, catalogo JS interno)
  - `docs/shopify-import-products.csv` (variantes ZRB-CLA-250-M e ZRB-CLA-500-G)
- [x] Validado: PDP `/cafes/classico` mostra "R$ 79,90" via curl
- [ ] **Acao do user:** reimportar CSV no Shopify ou editar SKUs manualmente pra refletir na home (que puxa preco do Shopify via `home/Cafes.tsx`)

### Componentes legados nao tocados (intencional)
- `src/components/Subscription.tsx`, `BestSellers.tsx`, `Quiz.tsx`, `Combos.tsx` — nao importados em nenhuma rota; mantidos pra evitar inconsistencia em calculos derivados (ex: savings/discount). Podem ser deletados em sessao futura.

---

## Sessao 2026-05-08 — Migracao Vercel -> GCP, custom domains, form B2B

### Copy/conteudo
- [x] Altitude unificada para **640–760m** em todo o site (commit `8379452`):
  - `src/app/fazenda/page.tsx`, `src/components/Hero.tsx` (2x), `src/lib/editorial/classico.ts`
  - `src/lib/data/products.ts` (3 SKUs + longDescription do Reserva)
  - `src/lib/data/articles.ts` (excerpt e body do artigo "Serra do Cabral")
- [x] CTAs de compra desabilitados pra mostrar "Em breve" (commit `281e546`)

### Acessos GCP
- **Owners do projeto:** `fabiomenezes@gmail.com` e `fabricio.fazer@gmail.com`. `fabio.menezes@orchestra.lat` nao tem permissao no GCP do Zerbinatti.

### Regra fixa
🛑 **AI nao faz deploy automatico no Zerbinatti.** Push pra `main` ok; build/deploy e o user que dispara explicitamente. Memoria em `feedback_zerbinatti_no_auto_deploy.md`.

### Infra GCP final
- **Projeto correto:** `zerbinatti-cafe` (#259156177034). Duplicata `zerbinatti-cafe-ece93` (criada em paralelo pelo Fabricio) marcada para delete (some em 30 dias).
- **Cloud Run** `zerbinatti-coffee` na regiao `southamerica-east1` (revision 00008-7ww). Build via `cloudbuild.yaml` -> Artifact Registry. Scale to zero, 1Gi/1vCPU, 0-10 instancias.
- **Firebase Hosting** site `zerbinatti-cafe` na frente do Cloud Run (rewrite). CDN global + SSL automatico. Default URL: `zerbinatti-cafe.web.app`.
- **Custom domains** (ambos via Firebase Hosting):
  - `zerbinatti.coffee` — registrado no Cloudflare (DNS do Cloudflare gerencia)
  - `zerbinatticoffee.com` — registrar GoDaddy, NS Hostinger; DNS editado no Hostinger
  - Ambos: A `199.36.158.100`, TXT `hosting-site=zerbinatti-cafe`, TXT `_acme-challenge` para Let's Encrypt; **DNS only** no Cloudflare (proxy laranja quebra SSL handshake)
- **Firestore** Native em `southamerica-east1`, free tier. Coleção `b2b_submissions` recebe leads do form. Cliente com `preferRest: true` (gRPC nao funciona em Cloud Run).
- **Resend** envia emails transacionais. Domain `zerbinatti.coffee` verificado. API key em env var `RESEND_API_KEY` no Cloud Run. Free tier 3k emails/mes.
- **Cloudflare Email Routing** ativo no `zerbinatti.coffee`: catch-all `*@zerbinatti.coffee` -> `fabiomenezes@gmail.com`. Destinos verificados: fabiomenezes@gmail.com, fabricio.fazer@gmail.com.
- **Billing** trocado para conta dedicada "Zerbinatti Cafe" (`01D110-E60327-151D9A`).

### Form B2B (/para-empresas) end-to-end
- POST `/api/b2b-form` (Next.js route): valida, anti-honeypot, sanitiza, escape HTML
- Campos: nome, empresa, CNPJ (com mascara + valida digito verificador, opcional em EN/ES), email, whatsapp (mascara 10/11 digitos), segmento, volume (opcional), mensagem (opcional)
- Mascaras + validacao no front (inline error messages em vermelho); validacao redundante no back (rejeita CNPJ invalido se enviado, aceita vazio)
- Grava no Firestore + dispara email pros 2 destinos via Resend; Reply-To = email do cliente
- Smoke test E2E: `curl POST /api/b2b-form` retorna `{ok:true, id:...}`, email chega em ambas inboxes

### Open Graph / Twitter Cards
- `src/app/layout.tsx`: metadataBase + openGraph.images + twitter card pra todas rotas React. site_name "Zerbinatti" (sem "Coffee"), descricao em portugues.
- `public/novo-layout/para-empresas.html`: og:* + twitter:* meta tags; descricao B2B-especifica
- Imagem `/assets/og-share.jpg`: marca Zerbinatti com selos (673x706, AS-IS sem padding bands)
- URLs absolutas apontam pra `zerbinatticoffee.com` (canonical)

### Mobile readability
- Bump em `body`, eyebrows, labels, hero desc, inputs (16px = sem zoom-in iOS) em `novo-layout.css` + `para-empresas.html` (≤640px)

### Pendente
- [ ] `zerbinatticoffee.com`: editar DNS no Hostinger (registros A/TXT do Firebase) — user vai tentar acesso ao Hostinger
- [ ] Bloqueador Shopify continua: loja em "Opening soon", pagamento e frete nao configurados
- [ ] Wave D: migrar HTML estatico de `/para-empresas` pra React (`src/app/para-empresas/page.tsx`)
- [ ] Site tem `robots: noindex, nofollow` — trocar pra `index, follow` quando lancar oficial

---

## Sessao 2026-05-07 (anterior) — Migracao Shopify Headless

### Detalhes Shopify Headless (sessao 2026-05-07)

### Decisao revertida
A recomendacao Yampi (mais abaixo neste arquivo, sessao anterior) foi **abandonada**. O user optou por **Shopify Headless** porque (i) ja atende as premissas do projeto, (ii) so falta adaptar o template novo-layout existente, (iii) Claude Code consegue implementar sozinho.

### Stack final em uso
- **Front:** Next.js 16 App Router (Server + Client Components, Zustand cart, i18n via Context)
- **Backend e-commerce:** Shopify Storefront API (loja `zerbinatticoffee.myshopify.com`, public token em `.env.local`)
- **Pagamento:** Shopify Payments (a configurar — ver Bloqueadores)
- **CMS produto:** Shopify admin (descricao, fotos, variantes refletem em real-time no front)
- **Hosting:** Cloud Run (projeto GCP `zerbinatti-cafe`, regiao `southamerica-east1`)

### O que esta funcionando (validado E2E via puppeteer)
- [x] Home composta dinamicamente em `src/app/(home)/page.tsx` — espelha 100% do `public/novo-layout/index.html`
- [x] Wave A: i18n dictionary 186 keys x 3 locales (PT/EN/ES), Storefront API client, Zustand cart store + Server Actions, CSS extraido para `src/app/(home)/novo-layout.css`
- [x] Wave B: 23 componentes home (Header, Hero, Cafes, Processo, Video, Galeria, Cupping, Subscription, Historia, Footer, CartDrawer, FeatureCard, SensoryBars, FlavorChips, etc) + PDP `/cafes/[slug]` migrado para Zustand
- [x] Wave C: home composta + middleware podado (so `/para-empresas` rewrite) + redirects 308 de URLs legacy (`/cafes`, `/processo`, `/assinatura`, `/historia` -> `/#anchor`)
- [x] Produtos importados via CSV: Classico Zerbinatti com 2 variantes (250g moido R$98, 500g graos R$188) — variantes mapeadas por slotKey em `src/lib/products.ts`
- [x] Cart end-to-end testado: clicar Add -> drawer abre -> Shopify cria cart -> retorna `checkoutUrl` valido
- [x] **Layout pixel-perfect com referencia original** — adicionadas fontes Cormorant Garamond, Allura, JetBrains Mono, Press Start 2P via `next/font/google` (antes so Playfair+Inter, fazia titulos quebrarem largo)
- [x] **RevealObserver** (`src/components/home/RevealObserver.tsx`) — replica `initRevealObserver()` do static; sem ele todas as secoes ficavam `opacity:0`. Tem fallback de scroll listener para casos de fast-scroll onde IO falha
- [x] Scripts de QA puppeteer: `scripts/snap.mjs` (fullpage com slow scroll), `scripts/snap-hero.mjs` (viewport hero), `scripts/flow-checkout.mjs` (E2E add-to-cart -> checkoutUrl -> Shopify)

### Bloqueador unico para fechar pedido real
🔴 **Loja Shopify ainda em modo "Opening soon" (password protection ativa).** Validado via `scripts/flow-checkout.mjs`: cart criado com sucesso, mas `checkoutUrl` redireciona para `/password`. Para destravar (apenas o dono pode no Shopify Admin):
1. **Abrir loja:** `Settings -> Online Store -> Preferences` -> desmarcar "Restrict access to visitors with password"
2. **Pagamento:** `Settings -> Payments` -> ativar provider (Mercado Pago / PagSeguro / Stripe), ou Bogus Gateway pra testar sem cobrar
3. **Frete:** `Settings -> Shipping and delivery` -> criar zona Brasil com pelo menos 1 rate

### Pendente nesta migracao
- [ ] Wave D — migrar `public/novo-layout/para-empresas.html` -> `src/app/para-empresas/page.tsx`, deletar `public/novo-layout/`, decidir fate do legacy `src/lib/data/products.ts`
- [ ] Wave E (deferred) — ISR + webhook revalidation em `/api/revalidate`
- [ ] Configurar Shopify Markets (BR, US, LATAM) — admin
- [ ] Address image aspect-ratio warning em `HomeHeader.tsx:102` (`/assets/zerbinatti-wordmark-gold.png`)
- [ ] Renomear `middleware.ts` -> `proxy.ts` (Next.js 16 deprecation warning)

---

## Sessao anterior 2026-05-07 — Polimento landing /novo-layout/ + QA mobile

(Conteudo abaixo eh historico anterior a decisao Shopify Headless)



## O que e
E-commerce premium para cafe especial Zerbinatti (heranca italiana desde 1897). Opcao C: marca completa com B2C + B2B + ecossistema de conteudo.

## Stack
- **Frontend:** Next.js 16 (App Router) + Tailwind CSS + TypeScript
- **E-commerce:** Shopify Headless (Storefront API) — dev store a criar
- **CMS:** Sanity (a integrar)
- **Pagamentos:** Shopify Payments BR (PIX, boleto, cartao) + Internacional
- **Hosting:** Cloud Run (GCP)
- **Email:** Resend (transacional) + Klaviyo (marketing)
- **Analytics:** GA4 + Meta Pixel

## O que foi feito
- [x] **Sessao 2026-05-07 — Polimento landing /novo-layout/ + QA mobile**
  - Catalogo final: N01 Classico 250g moido R$39,90 + N02 Classico em Graos 500g R$69,90 (Geisha removido)
  - Selos: SCA 84.75 (gerado em PIL), Cafe Organico da Fazenda orbital, Organic Coffee no hero (1024x1024)
  - Assinatura reformulada em 3 planos: Quotidiano (3x moido), Doppio Rituale (1+1 mescla, "Mais escolhido"), Maestro (3x graos)
  - Shop centralizado e movido para DEPOIS da assinatura
  - Galeria: Carmo do Paranaiba -> Valim Farms; descricao com nome correto
  - Separador ornamental com fleuron dourado entre os dois cafes (gradiente suave + glow)
  - Hero stats com destaque na altitude maxima 760m (640 menor, mesma cor) e 88/100 SCA mesma cor
  - Copy: padronizacao Valim Farms (com s) em PT/EN/ES (23 ocorrencias)
  - Copy: terceira geracao agora e Wilson Valim Zerbinatti (PT/EN/ES)
  - **QA mobile completo** (auditoria com Evidence Collector em 360/390/414):
    - Body overflow-x:hidden + max-width 100vw (sem scroll horizontal)
    - icon-btn 44x44 WCAG, add-btn min-height 44px
    - Mobile menu drawer real (alert "em breve" -> drawer com nav, ESC, overlay, scroll lock)
    - Header lang-switch oculto em <=640, padding header reduzido
    - href="#" do "Comecar assinatura" agora aponta para #planos com scroll suave
    - Footer: links reais para /termos /privacidade /entregas /fazenda; remove links sem pagina (Kits, Acessorios) e icones sociais sem conta
    - Hero CTA acima da fold em 360x640 (padding reduzido, breakpoint extra <=380px)
    - React/Babel/tweaks JSX so carregam em localhost ou ?dev=1 (sem CSP errors em prod)
- [x] Projeto Next.js criado e buildando sem erros
- [x] Homepage premium com 8 secoes: Header, Hero, TrustBar, Products, BestSellers, Subscription, Story, Quiz, B2B, Footer
- [x] Identidade visual: paleta coffee/gold/green, Playfair Display + Inter
- [x] Shopify client preparado (lib/shopify.ts + types)
- [x] Repo GitHub: fabriciobitao/zerbinatti-coffee
- [x] Deploy Cloud Run: https://zerbinatti-coffee-259156177034.southamerica-east1.run.app (build via `gcloud builds submit --config=cloudbuild.yaml`)
- [x] Carrinho funcional com drawer (adicionar, remover, alterar quantidade)
- [x] Quiz interativo com 4 perguntas + recomendacao de cafe
- [x] Logo real da marca no header e hero
- [x] Botoes "Adicionar ao Carrinho" com hover corrigido
- [x] Transicoes entre secoes com degrade (SectionFade)
- [x] Responsividade mobile em todos os componentes
- [x] Planos de assinatura renomeados: Apreciador, Sommelier, Herdeiro
- [x] Descricoes dos planos personalizadas para identidade Zerbinatti
- [x] Botoes dos planos alinhados na mesma linha (flex + mt-auto)
- [x] Descricoes dos produtos com embalagem 500g
- [x] **Ondas 2+3 UX/CX**: sistema de design + conteudo editorial + B2B dedicado
  - Design system unificado: `Button`, `Badge`, `ProductCard`, `Ornament`, `Monogram`, `HeritageSeal`, `FAQ`, `Reviews`, `SensoryProfile` (radar SVG)
  - Dataset central de produtos em `src/lib/data/products.ts` (origem, sensorial, reviews, metodos, notas)
  - 3 PDPs em `/cafes/[slug]` com ficha de origem, perfil sensorial (radar 1-5), reviews verificadas e relacionados
  - 9 reviews realistas (3 por SKU) com nome, local, metodo, nota, data
  - Subscription FAQ expandida (6 perguntas) com accordion dark
  - Quiz: email capture + upsell assinatura com -15% + link para PDP no resultado
  - `/para-empresas` dedicado: hero, segmentos, prova social, formulario B2B estruturado (CNPJ, volume, segmento)
  - Revista em `/revista` com 3 ensaios editoriais (Terroir, Preparo, Historia) e PDPs proprias
  - Sistema heraldico: monograma Z no Hero/Footer/B2B, Ornament italiano substituindo divisores `h-px`
  - Header reorganizado: Cafes, Assinatura, Quiz, Revista, B2B
  - Quiz movido para apos Hero (jornada de descoberta antes dos cafes)
- [x] **Onda 1 UX/CX**: destrava bloqueadores de conversao
  - WhatsApp via env var (NEXT_PUBLIC_WHATSAPP_NUMBER) — nao mais numero fake hardcoded
  - Botoes de assinatura funcionais (abrem WhatsApp com plano pre-preenchido)
  - Apreciador reprecificado com 15% off (R$59,41) + "Economize R$125,88/ano"
  - Secao "Como funciona" da assinatura (4 passos)
  - Combos renderizado na home + botao "Comprar Kit" funcional
  - Quiz: corrigido "4 perguntas" (era "5") e removida promessa de share Instagram
  - Paginas legais: /termos, /privacidade, /entregas, /fazenda, /processo (LGPD compliance)
  - Footer: dead links substituidos por paginas reais; label do newsletter; contraste
  - CartDrawer: barra lateral colorida por SKU + progress bar de frete gratis
  - Focus-visible global (acessibilidade WCAG / Lei Brasileira de Inclusao)
  - Contrastes corrigidos em Products, Footer, CartDrawer (coffee-400 -> 500/600)

## Decisao de stack e-commerce (2026-05-07)
**Recomendacao do especialista:** abandonar caminho Shopify Headless (memorizado anteriormente) e adotar:
- **Yampi Avancado** (R$99/mes) com checkout transparente BR + Yampi Clube nativo para assinatura
- **Pagar.me (Stone)** como adquirente: PIX 0,99%, cartao 3,19% + 2,49%/parcela, boleto R$3,49
- **Melhor Envio** (Jadlog .Package + PAC fallback) — sem mensalidade, cotacao no checkout
- **Bling Cobre** (R$33/mes) para ERP + emissao NF-e
- **Klaviyo** (Free ate 250 contatos)
- Front Next.js atual mantido como vitrine institucional; CTAs apontam para subdominio loja.zerbinatti.com.br
- **Custo ano 1 estimado: ~R$8k** (vs ~R$16k Shopify Basic + Recharge)
- Roadmap 4 semanas: PJ digital + A1 (sem 1) -> setup Yampi+Pagar.me+ME (sem 2) -> Yampi Clube assinatura (sem 3) -> Bling NF-e end-to-end (sem 4)
- Atencao fiscal: SP/MG tem ST sobre cafe torrado, validar com contador antes de precificar
- Alternativa B: Shopify Basic + Subscriptions se planeja cross-border em 12-18 meses

## Pendente
- [ ] **Decidir e iniciar stack e-commerce (recomendacao acima)**
  - [ ] Abrir conta PJ digital (Cora ou Inter)
  - [ ] Certificado digital A1 e-CNPJ (~R$200, Certisign)
  - [ ] Criar trial Yampi e configurar 2 SKUs
  - [ ] Subdominio loja.zerbinatti.com.br via DNS
  - [ ] Pagar.me sandbox -> producao
  - [ ] Melhor Envio integracao + saldo pre-pago
  - [ ] Bling integrado a Yampi para NF-e
  - [ ] Yampi Clube assinatura (3 planos)
  - [ ] Klaviyo regua de email
- [ ] Integrar Sanity CMS (revisar necessidade pos-Yampi)
- [ ] i18n (PT/EN)
- [ ] Fotos reais da fazenda (substituir placeholders Unsplash e mockup CSS do pacote)
- [ ] Integracao email do Quiz com Klaviyo/Resend (hoje grava em localStorage)
- [ ] Form B2B integrar com CRM (hoje abre WhatsApp)
- [ ] Instagram, TikTok, YouTube (criar contas)
- [ ] GA4 + Meta Pixel
- [ ] SEO otimizado + sitemap.xml
- [ ] Reviews reais migrar para Judge.me/Loox/Yotpo (hoje dataset estatico)
- [ ] Mais artigos na Revista (meta: 1/mes)

## Decisoes de arquitetura
- Shopify Headless por: pagamentos BR nativos, Instagram Shopping, assinaturas maduras
- Sanity CMS por: real-time previews, GROQ, free tier generoso, ideal para conteudo rico de cafe
- Cloud Run por: regiao `southamerica-east1` (SP), scale-to-zero, suporte nativo a SSR/Server Actions/middleware do Next.js, sem lock-in de plataforma

## Dominio
- **Teste:** https://zerbinatti-coffee-259156177034.southamerica-east1.run.app
- **Producao (futuro):** zerbinatticoffee.com (propriedade do cliente)
