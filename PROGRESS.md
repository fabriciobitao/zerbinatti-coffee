# Zerbinatti Coffee — Progresso

**Ultima atualizacao:** 2026-04-16

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

## Pendente
- [ ] Criar Shopify dev store e conectar
- [ ] Integrar Sanity CMS
- [ ] Paginas de produto individuais
- [ ] Checkout real (Shopify)
- [ ] Sistema de assinatura (Shopify)
- [ ] i18n (PT/EN)
- [ ] Blog
- [ ] Fotos reais da fazenda (substituir placeholders Unsplash)
- [ ] Instagram, TikTok, YouTube (criar contas)
- [ ] Klaviyo + Resend
- [ ] GA4 + Meta Pixel
- [ ] SEO otimizado

## Decisoes de arquitetura
- Shopify Headless por: pagamentos BR nativos, Instagram Shopping, assinaturas maduras
- Sanity CMS por: real-time previews, GROQ, free tier generoso, ideal para conteudo rico de cafe
- Vercel por: CDN em SP, zero-config Next.js, preview deploys, deploy automatico via GitHub

## Dominio
- **Teste:** https://cafe-alpha-five.vercel.app
- **Producao (futuro):** zerbinatticoffee.com (propriedade do cliente)
