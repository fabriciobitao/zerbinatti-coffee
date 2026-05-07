# Zerbinatti Coffee — Progresso

**Ultima atualizacao:** 2026-05-07 (branch `site-shopify` — fluxo E2E validado; bloqueador unico no Shopify Admin)

## Sessao 2026-05-07 — Migracao para Shopify Headless (branch `site-shopify`)

### Decisao revertida
A recomendacao Yampi (mais abaixo neste arquivo, sessao anterior) foi **abandonada**. O user optou por **Shopify Headless** porque (i) ja atende as premissas do projeto, (ii) so falta adaptar o template novo-layout existente, (iii) Claude Code consegue implementar sozinho.

### Stack final em uso
- **Front:** Next.js 16 App Router (Server + Client Components, Zustand cart, i18n via Context)
- **Backend e-commerce:** Shopify Storefront API (loja `zerbinatticoffee.myshopify.com`, public token em `.env.local`)
- **Pagamento:** Shopify Payments (a configurar — ver Bloqueadores)
- **CMS produto:** Shopify admin (descricao, fotos, variantes refletem em real-time no front)
- **Hosting:** Vercel atual (`cafe-alpha-five.vercel.app`)

### O que esta funcionando (validado E2E via puppeteer)
- [x] Home composta dinamicamente em `src/app/(home)/page.tsx` — espelha 100% do `public/novo-layout/index.html`
- [x] Wave A: i18n dictionary 186 keys x 3 locales (PT/EN/ES), Storefront API client, Zustand cart store + Server Actions, CSS extraido para `src/app/(home)/novo-layout.css`
- [x] Wave B: 23 componentes home (Header, Hero, Cafes, Processo, Video, Galeria, Cupping, Subscription, Historia, Footer, CartDrawer, FeatureCard, SensoryBars, FlavorChips, etc) + PDP `/cafes/[slug]` migrado para Zustand
- [x] Wave C: home composta + middleware podado (so `/para-empresas` rewrite) + redirects 308 de URLs legacy (`/cafes`, `/processo`, `/assinatura`, `/historia` -> `/#anchor`)
- [x] Produtos importados via CSV: Classico Zerbinatti com 2 variantes (250g moido R$98, 500g graos R$188) — variantes mapeadas por slotKey em `src/lib/products.ts`
- [x] Cart end-to-end testado: clicar Add -> drawer abre -> Shopify cria cart -> retorna `checkoutUrl` valido
- [x] **Layout pixel-perfect com Vercel original** — adicionadas fontes Cormorant Garamond, Allura, JetBrains Mono, Press Start 2P via `next/font/google` (antes so Playfair+Inter, fazia titulos quebrarem largo)
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
- **Hosting:** Vercel
- **Email:** Resend (transacional) + Klaviyo (marketing)
- **Analytics:** GA4 + Meta Pixel + Vercel Analytics

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
- [x] Deploy Vercel: https://cafe-alpha-five.vercel.app (deploy automatico a cada push)
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
- Vercel por: CDN em SP, zero-config Next.js, preview deploys, deploy automatico via GitHub

## Dominio
- **Teste:** https://cafe-alpha-five.vercel.app
- **Producao (futuro):** zerbinatticoffee.com (propriedade do cliente)
