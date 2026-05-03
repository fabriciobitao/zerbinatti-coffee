# SEO Strategy — Zerbinatti Coffee (2026-05-03)

Estratégia baseada em: home minimalista premium em reformulação, produto-âncora = assinatura quinzenal/mensal, herança italiana 1897, deploy atual em Vercel, futuro domínio `zerbinatticoffee.com`.

---

## 1) Keyword Research — Top 15 prioritárias (BR)

Volumes estimados são proxies de mercado BR (Google Keyword Planner / Semrush BR ranges típicos para o nicho café especial). KD = Keyword Difficulty 0–100.

| # | Keyword | Intenção | Vol/mês BR | KD | Página de destino |
|---|---|---|---|---|---|
| 1 | assinatura de café especial | Comercial | 2.400 | 38 | `/assinatura` (pillar) |
| 2 | clube de café | Comercial | 4.800 | 45 | `/assinatura` |
| 3 | café especial online | Comercial | 1.900 | 35 | `/` (Home) |
| 4 | café especial brasileiro | Comercial/Info | 1.300 | 30 | `/` ou `/sobre` |
| 5 | comprar café especial | Transacional | 2.100 | 42 | `/cafes` (catálogo) |
| 6 | café gourmet entrega | Transacional | 880 | 28 | `/entregas` |
| 7 | café para empresas / corporativo | Comercial B2B | 1.600 | 33 | `/para-empresas` |
| 8 | melhor café especial do Brasil | Comercial/Info | 720 | 40 | `/revista/melhor-cafe-especial-brasil` |
| 9 | café single origin | Informacional | 1.100 | 25 | `/revista/o-que-e-single-origin` |
| 10 | torra clara vs média vs escura | Informacional | 2.900 | 22 | `/revista/guia-de-torras` |
| 11 | como preparar café V60 / coado | Informacional | 5.400 | 28 | `/revista/guia-v60` |
| 12 | pontuação SCA café | Informacional | 480 | 18 | `/revista/o-que-e-sca` |
| 13 | café Yellow Bourbon | Informacional/Long-tail | 390 | 15 | `/cafes/yellow-bourbon` (PDP) |
| 14 | assinatura café mensal preço | Comercial (decisão) | 590 | 30 | `/assinatura#planos` |
| 15 | café especial Serra do Cabral / Cerrado Mineiro | Long-tail/Info | 210 | 12 | `/fazenda` |

**Lógica de priorização:** keywords 1–7 alimentam conversão direta (pillar = `/assinatura`). 8–12 são tráfego de topo de funil que constrói autoridade tópica. 13–15 são long-tail de baixa concorrência onde podemos rankear top-3 em 60–90 dias.

---

## 2) Arquitetura de URLs (final, priorizada por valor SEO)

**Tier 1 — Páginas críticas de conversão**
- `/` — Home (marca + assinatura como CTA principal)
- `/assinatura` — pillar page do produto-âncora (NOVA — alta prioridade)
- `/cafes` — catálogo (índice de SKUs)
- `/cafes/[slug]` — PDP por SKU (Yellow Bourbon, etc.) — voltar a existir
- `/para-empresas` — B2B

**Tier 2 — Confiança e marca**
- `/sobre` — história família 1897 (E-E-A-T crítico)
- `/fazenda` — origem, terroir, sustentabilidade
- `/processo` — torra, frescor, controle de qualidade
- `/entregas` — política de envio (também atende keyword "café entrega")

**Tier 3 — Conteúdo (reativação futura)**
- `/revista` — hub editorial
- `/revista/[slug]` — artigos
- `/safra/2026` — diário de safra (já existia)
- `/comparar` — comparador de SKUs (alto intento comercial)

**Tier 4 — Legais/técnicas**
- `/termos`, `/privacidade`, `/contato` (manter index com priority 0.3)

**Decisão crítica:** abandonar a URL atual `/cafe?sku=xxx` (querystring) e voltar para `/cafes/[slug]` — querystrings não capturam autoridade individual por SKU e são frequentemente ignoradas em sitemaps.

---

## 3) On-page por página principal

### `/` (Home)
- **Title:** `Zerbinatti Coffee — Café Especial Brasileiro por Assinatura | Desde 1897`
- **Meta description:** `Receba café especial brasileiro torrado na semana, direto da Serra do Cabral. Assinatura quinzenal ou mensal, frescor garantido. Tradição italiana desde 1897.`
- **H1:** `Café especial brasileiro, casa italiana — desde 1897`
- **H2s:** `Assinatura de café especial` · `Nossa origem: Serra do Cabral` · `Quatro gerações torrando café` · `Para sua casa ou seu negócio`

### `/assinatura` (pillar — criar)
- **Title:** `Assinatura de Café Especial — Planos Quinzenal e Mensal | Zerbinatti`
- **Meta:** `Assinatura de café especial brasileiro com torra fresca a cada envio. Escolha quinzenal ou mensal, pause quando quiser, frete grátis acima de R$ X.`
- **H1:** `Assinatura de café especial: torra fresca, todo mês na sua casa`
- **H2s:** `Como funciona` · `Planos e preços` · `O que entra na caixa` · `Frescor garantido (torra → entrega em até 7 dias)` · `Perguntas frequentes` (FAQ schema) · `Avaliações de assinantes`

### `/cafes/[slug]` (ex: Yellow Bourbon)
- **Title:** `{Nome do Café} — Single Origin {Fazenda}, Score SCA {X} | Zerbinatti`
- **Meta:** `{Nome} de {Fazenda}, {altitude}m, processo {processo}. Notas de {nota1}, {nota2}, {nota3}. Torra fresca, score SCA {X}. Compre 250g, 500g ou 1kg.`
- **H1:** `{Nome do Café} — {Variedade} {Processo}`
- **H2s:** `Perfil sensorial` · `Origem e terroir` · `Métodos de preparo recomendados` · `Avaliações` · `Frescor da torra`

### `/para-empresas`
- **Title:** `Café Especial para Empresas — Aluguel de Máquina + Grão | Zerbinatti`
- **Meta:** `Café especial corporativo: máquina profissional + grãos torrados na semana. Planos Starter, Silver, Gold e Platinum. Atendemos SP, RJ, BH e região.`
- **H1:** `Café especial para empresas — máquina + grão sem dor de cabeça`
- **H2s:** `Por que empresas escolhem Zerbinatti` · `Calcule seu plano` · `Modelos de máquina` · `Casos de clientes` · `Perguntas frequentes`

### `/sobre`
- **Title:** `Nossa História — Família Zerbinatti, 4 Gerações de Café Desde 1897`
- **Meta:** `De Treviso ao Cerrado Mineiro: a história de quatro gerações da família Zerbinatti torrando café especial brasileiro com método italiano desde 1897.`
- **H1:** `Quatro gerações, um único compromisso com o grão`
- **H2s:** `1897 — A primeira torra em Treviso` · `A travessia ao Brasil` · `A Serra do Cabral e a quarta geração` · `Nossos princípios`

---

## 4) Schema.org Plan

**O que existe hoje em `src/lib/schema.ts`:** `productSchema` (com AggregateOffer + AggregateRating + Review + additionalProperty para origem/altitude/SCA/torra) e `breadcrumbSchema`. Boa fundação. `organizationSchema` está em `src/lib/site.ts` (já injetado no layout).

**O que adicionar:**

1. **`subscriptionOfferSchema`** — para `/assinatura`, usar `Product` + `Offer` com `priceSpecification` do tipo `UnitPriceSpecification` e `referenceQuantity` representando a recorrência (mensal/quinzenal). Crítico para rich results de assinatura.
2. **`FAQPageSchema`** — função genérica para alimentar Q&A das páginas `/assinatura`, `/para-empresas`, e PDPs. Captura PAA e featured snippets.
3. **`articleSchema`** — quando `/revista` voltar: `Article` com `author` (Person com `jobTitle` e `worksFor` ligando a Organization — sinal E-E-A-T forte), `datePublished`, `dateModified`, `image`.
4. **`localBusinessSchema`** (se houver endereço físico/torrefação visitável) — para queries geo de SP/MG.
5. **`websiteSchema` com SearchAction** — sinaliza ao Google a sitelinks searchbox (caso adicione busca interna).
6. **`HowToSchema`** — para guias de preparo (V60, Chemex) na revista — alta probabilidade de rich result.

**Melhorias no schema atual:**
- `productSchema` usa `priceValidUntil` dinâmico (31/dez do ano seguinte) — bom, mas adicionar `hasMerchantReturnPolicy` e `shippingDetails` (Google passou a exigir desde 2023 para evitar warnings em Merchant listings).
- Adicionar `gtin` ou `mpn` se houver código de barras dos pacotes (aumenta elegibilidade para Google Shopping orgânico).
- `breadcrumbSchema` está OK — garantir que toda PDP e artigo o injete.

---

## 5) Technical SEO Checklist (Next.js 16)

**Sitemap** (`src/app/sitemap.ts`):
- Hoje gera URLs com querystring `?sku=` — **trocar para `/cafes/[slug]`** quando rotas voltarem.
- Adicionar `/assinatura`, `/sobre`, `/para-empresas`, `/cafes`, `/comparar`, `/safra/2026` e artigos da revista (quando voltarem).
- Quebrar em sitemaps por tipo (`sitemap-products.xml`, `sitemap-articles.xml`) se ultrapassar 50k URLs.

**robots.txt** (`src/app/robots.ts`):
- `Allow: /`
- `Disallow: /api/`, `Disallow: /*?sku=*` (após migrar), `Disallow: /carrinho`
- `Sitemap: https://zerbinatticoffee.com/sitemap.xml`

**Canonical:**
- Layout já define `alternates.canonical: "/"` — cada página deve sobrescrever via `generateMetadata`.
- PDPs com filtros/variantes: canonical para a versão "limpa" (sem querystring de tamanho).

**OG tags dinâmicas:**
- Cada PDP gerar OG image dinâmica via `opengraph-image.tsx` (Next.js 16 nativo) com nome do café + score SCA + foto do pacote.
- Para `/assinatura` e `/para-empresas`: OG dedicada com CTA visual.

**Core Web Vitals — targets:**
- LCP < 2.0s mobile
- INP < 150ms
- CLS < 0.05 (reservar `aspect-ratio` em todas as imagens lazy)

**Imagens:**
- Migrar Unsplash do hero para asset proprietário (sessão fotográfica do PROGRESS já está no backlog).
- Usar `next/image` com `priority` apenas no hero acima da dobra.
- Formatos: AVIF primário, WebP fallback.

**Fonts:**
- `next/font/google` com `display: swap` e variáveis CSS — manter.
- Auditar weights de Playfair Display (reduzir para 400 + 700 apenas).

**Outros:**
- `metadataBase` apontar para domínio final `zerbinatticoffee.com` antes do go-live.
- `hreflang="pt-BR"`.
- 301 de `cafe-alpha-five.vercel.app` para `zerbinatticoffee.com`.
- `trailingSlash: false` consistente.
- Search Console + Bing Webmaster antes do lançamento.

---

## 6) Plano de Conteúdo — 5 tópicos para reativação da `/revista`

1. **"O que é café especial? Guia completo da pontuação SCA"** — `o que é café especial`, `pontuação SCA`. Definição em 40–55 palavras + tabela de faixas. Link para `/assinatura`.
2. **"V60, Chemex, Aeropress ou Prensa? Guia honesto"** — `como fazer café V60`, `diferença V60 chemex`. HowTo schema.
3. **"Yellow Bourbon, Catuaí, Mundo Novo: variedades brasileiras"** — long-tail, conecta a PDPs.
4. **"Quanto tempo dura um café torrado?"** — `validade café torrado`. Justifica modelo de assinatura.
5. **"Da Serra do Cabral à sua xícara: o que faz um terroir"** — `terroir café`. E-E-A-T, conecta `/fazenda` ao produto.

Cadência: 2 artigos no mês 1 (1+4), 1 por mês depois. 1.500–2.500 palavras, FAQ schema, 3+ links internos.

---

## Resumo — 5 decisões críticas

1. **Pillar page `/assinatura` é prioridade #1** — produto-âncora não tem URL dedicada otimizada.
2. **Voltar PDPs para `/cafes/[slug]`** e abandonar `/cafe?sku=`.
3. **4 schemas novos** (Subscription Offer, FAQPage, Article, HowTo) + melhorar Product com `shippingDetails` e `hasMerchantReturnPolicy`.
4. **Migrar para `zerbinatticoffee.com` antes de investir em link building**.
5. **Reativar `/revista` com 5 conteúdos planejados**.
