# Zerbinatti Coffee — Progresso

**Ultima atualizacao:** 2026-05-08 (fazenda redesenhada, variedade Arara, novos precos, infra GCP completa, form B2B end-to-end, custom domains)

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
