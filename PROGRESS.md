# Zerbinatti Coffee — Progresso

**Ultima atualizacao:** 2026-04-16 (Ondas 2+3 UX/CX)

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

## Pendente
- [ ] Criar Shopify dev store e conectar
- [ ] Integrar Sanity CMS
- [ ] Checkout real (Shopify)
- [ ] Sistema de assinatura real (Shopify Subscriptions) + area do cliente
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
