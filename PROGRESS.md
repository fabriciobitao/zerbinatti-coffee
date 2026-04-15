# Zerbinatti Coffee — Progresso

**Última atualização:** 2026-04-15

## O que é
E-commerce premium para café especial Zerbinatti (herança italiana desde 1897). Opção C: marca completa com B2C + B2B + ecossistema de conteúdo.

## Stack
- **Frontend:** Next.js 16 (App Router) + Tailwind CSS + TypeScript
- **E-commerce:** Shopify Headless (Storefront API) — dev store a criar
- **CMS:** Sanity (a integrar)
- **Pagamentos:** Shopify Payments BR (PIX, boleto, cartão) + Internacional
- **Hosting:** Vercel
- **Email:** Resend (transacional) + Klaviyo (marketing)
- **Analytics:** GA4 + Meta Pixel + Vercel Analytics

## O que foi feito
- [x] Projeto Next.js criado e buildando sem erros
- [x] Homepage premium com 7 seções: Header, Hero, Story, Products, Quiz CTA, Subscription, B2B, Footer
- [x] Identidade visual: paleta coffee/gold/green, Playfair Display + Inter
- [x] Shopify client preparado (lib/shopify.ts + types)
- [x] Repo GitHub: fabriciobitao/zerbinatti-coffee
- [x] Commit inicial

## Pendente
- [ ] Login no Vercel e deploy
- [ ] Criar Shopify dev store e conectar
- [ ] Integrar Sanity CMS
- [ ] Implementar quiz interativo funcional
- [ ] Páginas de produto individuais
- [ ] Carrinho e checkout
- [ ] Sistema de assinatura
- [ ] i18n (PT/EN)
- [ ] Blog
- [ ] Fotos reais da fazenda (substituir placeholders)
- [ ] Instagram, TikTok, YouTube (criar contas)
- [ ] Klaviyo + Resend
- [ ] GA4 + Meta Pixel
- [ ] SEO otimizado

## Decisões de arquitetura
- Shopify Headless por: pagamentos BR nativos, Instagram Shopping, assinaturas maduras
- Sanity CMS por: real-time previews, GROQ, free tier generoso, ideal para conteúdo rico de café
- Vercel por: CDN em SP, zero-config Next.js, preview deploys

## Domínio
- **Teste:** zerbinatti-coffee.vercel.app (a confirmar após deploy)
- **Produção (futuro):** zerbinatticoffee.com (propriedade do cliente)
