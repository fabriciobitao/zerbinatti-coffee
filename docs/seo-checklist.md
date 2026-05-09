# SEO Checklist — Zerbinatti Coffee

Gate de release pra ativar indexacao em producao. So flipa `SEO_INDEX=true` no Cloud Run quando 100% verde.

## Pre-launch (branch `seo`)

### Indexacao base
- [ ] `src/app/sitemap.ts` retorna XML valido com todas rotas (home, 3 PDPs, /fazenda, /para-empresas, /revista, 3 artigos, legais)
- [ ] `src/app/robots.ts` substitui `public/robots.txt` (deletado)
- [ ] `robots.ts` Allow `/`, Disallow `/api/*`, `/_next/*`
- [ ] `metadataBase` aponta pra `https://zerbinatticoffee.com`
- [ ] `metadata.robots` controlado por `process.env.SEO_INDEX`
- [ ] Cada rota dinamica tem `alternates.canonical`
- [ ] Cada rota tem `openGraph` + `twitter` completos

### Structured data (JSON-LD)
- [ ] Organization no layout root
- [ ] WebSite no layout root
- [ ] Product em `/cafes/[slug]` (3 PDPs)
- [ ] BreadcrumbList em PDPs e artigos
- [ ] Article em `/revista/[slug]` (3 artigos)
- [ ] FAQPage na home (ou `/processo`)
- [ ] Validacao via `https://validator.schema.org/`
- [ ] Validacao via `https://search.google.com/test/rich-results`

### Content
- [ ] H1 unico por pagina com keyword principal
- [ ] Home H1 contem "cafe especial" + brand
- [ ] `/fazenda` H1 contem "Serra do Cabral" + "1897"
- [ ] Title templates com `%s | Zerbinatti Coffee`
- [ ] Meta descriptions <160 chars em todas rotas
- [ ] Internal linking revista -> PDP via RelatedProductCTA
- [ ] Dictionary 10% off consistente em PT/EN/ES

### Performance / midia
- [ ] Hero `<Image priority>` com webp
- [ ] Imagens criticas <300KB em webp+avif
- [ ] Galeria com width/height (sem CLS)
- [ ] FeatureCard sem `unoptimized`
- [ ] Press Start 2P removida
- [ ] AVIF habilitado em `next.config.ts`
- [ ] ISR + revalidateTag substituindo `force-dynamic`
- [ ] LCP <2.5s mobile (Lighthouse)
- [ ] CLS <0.1 (Lighthouse)
- [ ] Performance score >85 (Lighthouse)
- [ ] SEO score 100 (Lighthouse)

### Acessibilidade
- [ ] Alt audit limpo (sem alts genericos)
- [ ] Skip-to-content link
- [ ] Landmarks semanticos (header/nav/main/footer)
- [ ] Accessibility score >95 (Lighthouse)

### Analytics / tracking
- [ ] GTM-PVDQBMTB carregado via `next/script`
- [ ] `<noscript>` iframe pos-`<body>`
- [ ] `NEXT_PUBLIC_GTM_ID` env var em prod
- [ ] dataLayer.push em add_to_cart, view_item, begin_checkout, b2b_form_submit
- [ ] CSP cobre googletagmanager + google-analytics
- [ ] Tag Assistant Preview verde

### Lead magnet
- [ ] PDF guia brewing em `/downloads/`
- [ ] Newsletter copy reescrita
- [ ] `/api/newsletter` grava + envia PDF via Resend

## Pos-launch (manual user)

- [ ] `SEO_INDEX=true` em Cloud Run env vars
- [ ] Deploy revision (`gcloud builds submit` + `gcloud run deploy`)
- [ ] Validar `curl https://zerbinatticoffee.com/robots.txt` -> Allow `/`
- [ ] Validar `curl https://zerbinatticoffee.com/sitemap.xml`
- [ ] Google Search Console: adicionar propriedade
- [ ] Submeter sitemap.xml no GSC
- [ ] Bing Webmaster Tools: adicionar e submeter
- [ ] Solicitar indexacao manual das 3 PDPs no GSC
- [ ] Monitorar GSC Coverage report nas primeiras 2 semanas

## Baseline (registrado pre-implementacao)

- Build status: SUCCESS (Next.js 16.2.3, 2.3s compile, 706ms static gen)
- Rotas geradas: 18 (4 SSG `/revista/*`, 7 estaticas, 2 dinamicas, 5 API/icons)
- Workspace clean, branch `seo` criada a partir de `main` (commit `aa09952`)
