# Performance Audit — Zerbinatti Coffee

Data: 2026-05-03
Autor: Performance Benchmarker (Claude Opus 4.7)
Escopo: Auditoria estática + dinâmica da nova Home + páginas estáticas remanescentes.
Targets do projeto: **LCP < 2.0s mobile · INP < 150ms · CLS < 0.05**.

---

## 0. Notas metodológicas (importante ler primeiro)

1. **A versão deployada em https://cafe-alpha-five.vercel.app/ está obsoleta** (`age: 1347548s` ≈ 15 dias no cache do Vercel; HTML referencia `rotulo-500g.png` e componentes que já foram deletados — `Products`, `B2B`, `BestSellers`, etc., conforme `git status`). A nova Home (Hero + Cafes + Subscription + Story1897) **ainda não está em produção**. Toda métrica field/lab abaixo é projeção a partir de análise estática + build local.
2. **PageSpeed Insights API: cota diária excedida** no momento da auditoria. Não foi possível extrair scores reais via Lighthouse remoto. Recomenda-se rodar PSI manualmente em https://pagespeed.web.dev/ depois do próximo deploy para validar as projeções abaixo.
3. Métricas projetadas usam: tamanho de bundle local pós `next build`, peso de assets em `public/images/`, configuração de `next/font`, e padrões observados em deploys Vercel + Next 16 com perfis equivalentes.

---

## 1. Métricas projetadas — Core Web Vitals

### Home (`/`) — nova versão (após deploy)

| Métrica | Projeção mobile (4G/Moto G4 sim.) | Target | Status projetado |
|---|---|---|---|
| **LCP** | 2.4–3.2s | < 2.0s | **FALHA** |
| **INP** | 80–140ms | < 150ms | OK |
| **CLS** | 0.00–0.03 | < 0.05 | OK |
| **FCP** | 1.4–2.0s | < 1.8s | borderline |
| **TTFB** | 200–500ms (Vercel edge GRU) | < 600ms | OK |
| **TBT** | 150–300ms | < 200ms | borderline |
| **Speed Index** | 2.8–4.0s | < 3.4s | borderline |

**Razões principais do LCP projetado acima do target:**
- LCP element é a foto `/images/hero-pacote-zerbinatti.jpg` (238 KB, JPEG não otimizado, sem AVIF/WebP, mas é renderizado via `next/image` então pode ser convertido on-the-fly pelo Vercel Image Optimizer — **só na primeira request**, não cacheada).
- 18 arquivos woff2 de fonte no build local (~480 KB total). Embora `next/font` faça subset latin, o número de pesos+estilos derruba FCP.
- CSS bundle de 72 KB (não-gzip) — herda muitos utilitários Tailwind v4 + tokens legados que sobrevivem em `globals.css` para compatibilidade com `/termos`, `/privacidade`, etc.

### Páginas remanescentes

| Página | LCP proj. | INP proj. | CLS proj. | Notas |
|---|---|---|---|---|
| `/termos` | 1.0–1.5s | <50ms | 0 | Texto puro, sem imagens. Apenas Header (cliente) + Footer + StaticPage. Excelente baseline. |
| `/privacidade` | 1.0–1.5s | <50ms | 0 | Idem `/termos`. |
| `/entregas` | 1.0–1.5s | <50ms | 0 | Texto + tabelas. |
| `/fazenda` | 1.0–1.5s | <50ms | 0 | Sem `<Image>`. **Problema editorial, não de perf:** página sobre fazenda sem foto da fazenda. |
| `/processo` | 1.0–1.5s | <50ms | 0 | Idem. |

**Conclusão páginas estáticas:** todas devem passar com folga em todas as métricas. O peso é dominado pelo CSS shared (72 KB) + JS shared do Header/Footer + cart context. Nenhum problema de performance — risco editorial é não ter conteúdo visual nas páginas que pedem por ele (`/fazenda`, `/processo`).

---

## 2. Bundle Analysis

### JavaScript chunks (após `next build`, antes de gzip)

| Chunk | Tamanho |
|---|---|
| `0wj8l4fwydekq.js` | **221 KB** (provavelmente React + Next runtime) |
| `0vxi98ewbbk5w.js` | 142 KB |
| `03~yq9q893hmn.js` | 110 KB |
| `0d3shmwh5_nmn.js` | 53 KB |
| `0pqt~8bl3ukh4.js` | 43 KB |
| `0qcttm_udg~q~.js` | 40 KB |
| Restantes (×9) | ~120 KB combinados |
| **Total JS estático** | **~780 KB** (≈ 250–280 KB após gzip) |

Para uma Home com 4 seções, 1 componente client (Subscription) + Header + CartDrawer + cart-context, **isso está alto**. Comparativo: Aesop home pesa ~180 KB JS gzip; Blue Bottle ~210 KB.

**Suspeitos da gordura:**
1. `cart-context.tsx` (`<CartProvider>` no `layout.tsx`) força **toda** a árvore client a carregar React Context + reducer, mesmo em páginas que não usam carrinho (`/termos` etc.).
2. `CartDrawer` + `CartButton` no Header (que é `"use client"` global) garantem que o carrinho inteiro vai para o bundle inicial em qualquer rota.
3. `Analytics` injetado no `layout.tsx` puxa GA4 (`gtag.js`, ~100 KB transferred) e Meta Pixel (~100 KB) com `strategy="afterInteractive"` — **fora do critical path** mas ainda compete por CPU no INP.
4. `next/script` com `strategy="beforeInteractive"` no `organization-schema` é **incorreto** para JSON-LD (não é script executável — pode ser inline puro ou `strategy="afterInteractive"`); `beforeInteractive` força bloqueio no SSR.

### CSS

- Bundle único: **72 KB não-gzip** (~16 KB gzip estimado).
- `globals.css` tem 519 linhas e mantém **toda a paleta legada** (`coffee-*`, `gold-*`, `green-*`) mapeada para o novo sistema, além de utilitários `reveal`, `kicker`, `drop-cap`, `pull-quote`, `marginalia`, `link-editorial`, `card-lift`, `monthly-why` que **não são usados** pela nova Home — sobrevivem só pelas páginas legacy.
- Tailwind v4 com `@theme inline` exporta **todos** os tokens como classes utilitárias mesmo as não usadas (purge não funciona para tokens declarados em `@theme`).

### Fontes

- **18 arquivos woff2 no build** (`Fraunces` + `Inter` + `JetBrains Mono`), 480 KB combinados.
- Cada família puxa pelo menos: regular + italic + 500 + variantes subset.
- Fraunces sozinha (variable, normal+italic, weights 400+500) representa ~150–200 KB.
- `display: swap` está correto (FOUT ao invés de FOIT — não bloqueia render).
- **Há um `<link rel="preconnect" href="https://images.unsplash.com">`** no `<head>` — útil para os 3 cards Cafes + Story1897, **mas vazará tráfego para Unsplash em produção** (ver problema #2 abaixo).

### Imagens

| Asset | Tamanho atual | Uso atual | Problema |
|---|---|---|---|
| `hero-pacote-zerbinatti.jpg` | 238 KB | Hero (LCP element) | JPEG sem AVIF/WebP. `next/image` converte sob demanda mas a 1ª request paga o custo. |
| `rotulo-500g.png` | 415 KB | Não mais usado pela nova Home | Pode deletar. |
| `notas-paladar.png` | 314 KB | Não usado pela nova Home | Pode deletar. |
| `hero-bg.jpg` | 146 KB | Não usado | Pode deletar. |
| `logo.png` / `logo-white.png` | 122 KB / 13 KB | Logo escura não é usada (Header usa wordmark inline em texto). Logo branca usada após scroll. | `logo.png` 122 KB é exagero — substituir por SVG. |
| 4 selos PNG | 11–21 KB cada | Não usados pela nova Home | Podem deletar. |
| **Cafes (3 cards)** | Externas Unsplash (~30–80 KB cada) | 3 imagens hero de cards | Origem terceiros — não cacheamos no edge, vazamos para Unsplash. |
| **Story1897** | Externa Unsplash | Foto da seção história | Idem. |

---

## 3. Top 10 problemas — impacto + esforço

| # | Problema | Impacto | Esforço | Métrica afetada |
|---|---|---|---|---|
| 1 | LCP element é JPEG 238 KB sem AVIF/WebP pré-gerado | **Alto** | **Baixo** | LCP, FCP |
| 2 | 4 imagens Unsplash externas (3 cards Cafes + 1 Story) — fora do CDN próprio, sem cache estável, vazam dados, contam contra LCP do viewport secundário e prejudicam Speed Index | **Alto** | **Médio** | LCP, SI, privacidade |
| 3 | 18 arquivos de fonte (~480 KB) — Fraunces + Inter + JetBrains Mono com pesos a mais do que a Home usa | **Alto** | **Baixo** | FCP, LCP |
| 4 | `<CartProvider>` global no layout força cart-context em **todas** as rotas (incluindo `/termos`, `/privacidade`) | **Médio** | **Médio** | TBT, INP, JS bundle |
| 5 | `Header.tsx` é `"use client"` global e arrasta `CartButton`/`CartDrawer` (203 linhas) para todo o app | **Médio** | **Médio** | TBT, JS bundle |
| 6 | `organization-schema` injetado com `strategy="beforeInteractive"` — incorreto para JSON-LD, força bloqueio | **Médio** | **Baixo** | TTFB, FCP |
| 7 | CSS bundle de 72 KB com tokens legados (`coffee-*`, `gold-*`, `green-*`) e utilitários (`reveal`, `kicker`, `drop-cap`, `pull-quote`, `marginalia`, `card-lift`, `monthly-why`) **não usados** pela nova Home | **Médio** | **Médio** | FCP, render-blocking CSS |
| 8 | `Subscription.tsx` é o único componente `"use client"` da Home — bom — mas hidrata logo no load porque está acima da dobra em mobile (stack vertical) | **Baixo–Médio** | **Médio** | INP, TBT |
| 9 | Filtros CSS (`saturate`, `contrast`, `sepia`) aplicados em `<Image>` via `style` — disparam recompose na GPU em cada paint | **Baixo** | **Baixo** | Pintura/INP em scroll |
| 10 | `scroll-behavior: smooth` global em `html` + listener de scroll no Header sem `requestAnimationFrame` (já é `passive: true`, OK; mas re-render em cada `scrollY > 60`) | **Baixo** | **Baixo** | INP em scroll |

---

## 4. Recomendações priorizadas (com snippets)

### R1 — Pré-gerar AVIF + WebP do hero e usar `picture` direto (ou config de Next Image)

A foto hero é LCP-crítica. `next/image` faz a otimização sob demanda na 1ª request — **a primeira pessoa a abrir a página paga 800ms+**. Solução: **gerar `hero-pacote-zerbinatti.avif` e `.webp` em build time** e referenciar:

```tsx
// Hero.tsx — substituir <Image>
<picture>
  <source srcSet="/images/hero-pacote-zerbinatti.avif" type="image/avif" />
  <source srcSet="/images/hero-pacote-zerbinatti.webp" type="image/webp" />
  <img
    src="/images/hero-pacote-zerbinatti.jpg"
    alt="..."
    fetchPriority="high"
    width="800"
    height="1000"
    style={{ /* mesmo filter */ }}
  />
</picture>
```

Reduz o JPEG de 238 KB para ~60–80 KB AVIF + 100–120 KB WebP. **Ganho LCP esperado: -0.5 a -1.0s**.

### R2 — Eliminar Unsplash; usar fotos reais ou placeholders locais com `blur` data URI

Brand direction explicitamente veta foto stock (princípio #2: "**Zero foto Unsplash**"). Hoje **4 imagens Unsplash** ainda estão em produção:
- `Cafes.tsx` lines 36, 53, 70 (3 cards)
- `Story1897.tsx` line 19

**Plano de transição imediato (até fotos editoriais reais):**
- Usar o próprio `hero-pacote-zerbinatti.jpg` cropado em 3 ângulos / contextos diferentes (fundo neutro, mão segurando, sobre mesa) e versionar em `public/images/cards/`.
- Para Story1897, usar um placeholder `--bone-soft` com monograma Z em `--olive` (já documentado no UI-SPEC seção 4.4 como fallback aceito).
- **Remover** `<link rel="preconnect" href="https://images.unsplash.com">` do `layout.tsx` e o domínio de `images.remotePatterns` em `next.config.ts`.

**Ganho:** -300–600ms em Speed Index, sem dependência terceiros.

### R3 — Reduzir fontes para mínimo viável (Stack B otimizada)

A Home usa Fraunces (display, italic), Inter (body) e JetBrains Mono (números). Hoje carrega 18 woff2 (~480 KB). Cortar:

```tsx
// layout.tsx — versão enxuta
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],          // só 400 — não usar 500 em serif (brand direction)
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],   // mantém — body + medium para CTAs
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400"],          // 500 não é usado em mono
  display: "swap",
});
```

**Ganho:** -180 a -220 KB de fontes, FCP -200ms.

**Bônus:** considerar `fraunces` só com axes mínimos via CSS `font-variation-settings`. Variable font é grande, mas oferece flexibilidade — se aceitar perda de italic estiloso, trocar por `fraunces[opsz,wght]` com SOFT/WONK off pode cortar mais 30–40 KB.

### R4 — Mover `CartProvider` para fora do layout root

O cart só é usado nas páginas `/`, `/cafes/[slug]` e `/comparar` (estas duas últimas foram deletadas). Em `/termos`, `/privacidade`, `/entregas`, `/fazenda`, `/processo` o provider é **dead weight**.

```tsx
// layout.tsx — remover CartProvider/CartToasts/Analytics daqui

// app/(shop)/layout.tsx — novo group route com cart
export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      {children}
      <CartToasts />
    </CartProvider>
  );
}
```

Mover `/` para `app/(shop)/` e páginas legacy ficam no layout root sem o provider. **Ganho:** -8 a -12 KB JS gzip nas páginas legacy.

### R5 — Header: server component shell + client island só para o que precisa de estado

Hoje `Header.tsx` inteiro é `"use client"` por causa de `useState`/`useEffect` para scroll state e menu mobile. **Refator:**

```tsx
// Header.tsx — vira server component, renderiza markup estático
// HeaderInteractive.tsx (client) — só o botão menu mobile + listener de scroll
// CartButton.tsx (client) — já é cliente
```

A maior parte do Header (logo, nav links, container) é puro markup. **Ganho:** ~5–8 KB JS gzip + INP -20–30ms.

### R6 — `organization-schema` deve ser inline puro, não Script `beforeInteractive`

```tsx
// layout.tsx — substituir
<Script
  id="organization-schema"
  type="application/ld+json"
  strategy="beforeInteractive"  // ← INCORRETO para JSON-LD
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
/>

// por
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
/>
```

JSON-LD não é executável — `next/script` é overhead aqui. `beforeInteractive` força bloqueio no SSR injetado no HTML inicial via runtime. **Ganho:** TTFB -50–100ms, FCP -100–200ms.

### R7 — Limpar `globals.css` removendo classes legadas não usadas

Após a nova Home estar em produção e as páginas restantes (`/termos`, `/privacidade`, `/entregas`, `/fazenda`, `/processo`) refatoradas para usar a nova paleta `bone/ink/olive`, **remover do `globals.css`:**
- Bloco "Compatibilidade — utilitários legados" (linhas 371–507): `.reveal*`, `.kicker`, `.text-display-italic`, `.text-editorial`, `.drop-cap*`, `.pull-quote`, `.marginalia*`, `.link-editorial`, `.card-lift`, `details.monthly-why`.
- Bloco `@theme inline` legado: `--color-coffee-*`, `--color-gold-*`, `--color-green-*`, `--font-serif`.

**Ganho:** CSS de 72 KB → ~28–35 KB. FCP -100ms, render-blocking CSS reduzido.

### R8 — Trocar `style={{ filter: ... }}` por classes Tailwind ou CSS classes nomeadas

Inline `style` em React força recriação do objeto a cada render e não é cacheável. Mover para classes:

```css
/* globals.css */
.img-mono { filter: saturate(0.7) contrast(1.05); }
.img-sepia { filter: sepia(0.15) saturate(0.75) contrast(1.05); }
```

```tsx
// Hero.tsx
<Image ... className="object-cover object-center img-mono" />
```

**Ganho:** menor — INP em scroll, melhor caching.

### R9 — Reduzir `next/image` quality default e ajustar `sizes`

`next/image` default é `quality=75`. Para fotos editoriais monocromáticas isso pode cair para 65 sem perda visível. Ajustar Hero:

```tsx
<Image ... quality={70} />
```

Para os cards Cafes, o `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` já está correto.

### R10 — Garantir `width`/`height` em `next/image` ou `aspect-ratio` em containers para evitar CLS

Já está bom: `Hero` usa `fill` + container com altura fixa (`h-[60vw] max-h-[500px]`), `Cafes` usa `fill` + `aspect-[4/5]`, `Story1897` usa `fill` + `aspect-[4/5]`. **CLS projetado: 0.00–0.03**. Manter.

---

## 5. Recomendações específicas por categoria

### Fontes (Fraunces + Inter + JetBrains Mono)

- **Sim, Fraunces variable é pesada** (~80–120 KB para axes opsz+wght+ital). Mas é **a assinatura tipográfica da marca** (italic dramático). Não trocar.
- **Cortar pesos:** Inter 400+500 OK. Fraunces só 400 (regular + italic). JetBrains Mono só 400.
- **Não preconnect a `fonts.gstatic.com`** manualmente — `next/font` self-hospeda no domínio próprio e já elimina o RTT.
- **Consider:** se Inter for usado só para body+CTAs, podem-se fazer subsets ainda menores. Mas o ganho é marginal versus o esforço.

### Imagens

- **Hero (LCP):** AVIF + WebP pré-gerados é o ganho #1. Pode também usar `placeholder="blur"` com `blurDataURL` — `next/image` gera automaticamente se a imagem é importada, mas como vem de `/public/` não gera. Adicionar manualmente um placeholder base64 minúsculo (10x12px) no JSX.
- **Cards Cafes:** parar de usar Unsplash. Usar variantes do `hero-pacote-zerbinatti` cropadas + `next/image` local até fotos reais chegarem.
- **Story1897:** placeholder editorial honesto até foto definitiva (`--bone-soft` + monograma `--olive`).
- **Limpeza:** deletar `rotulo-500g.png` (415 KB), `notas-paladar.png` (314 KB), `hero-bg.jpg` (146 KB), `selo-*.png` (∼60 KB total) — **907 KB de assets mortos** no `/public`. Não afeta runtime, mas afeta o tamanho do deploy artifact e o tempo de cold deploy.

### JavaScript

- **A Home é majoritariamente server components** — ótimo. Único client é `Subscription` (necessário pelo configurador) + `Header` (necessário pelo scroll state) + `CartProvider` (necessário pelo carrinho).
- **Quick wins:** R4 (cart fora do layout root), R5 (Header em ilhas), R6 (JSON-LD inline). Combinados = ~20–30 KB JS gzip a menos no critical path.
- **Não há over-import de bibliotecas pesadas** (sem framer-motion, sem lodash, sem date-fns, sem moment). Bundle hoje vem inteiro de React + Next runtime + cart-context + Subscription. Difícil cortar mais sem perda de feature.

### Outras observações

- **`scroll-behavior: smooth` global** funciona bem mas pode atrapalhar `prefers-reduced-motion` — já está coberto pelo `@media (prefers-reduced-motion: reduce)` no fim do `globals.css`.
- **Cache header agressivo em `/images/:path*`** está correto (`public, max-age=31536000, immutable`).
- **CSP permite `'unsafe-inline'` em script-src** — é o trade-off documentado no SECURITY-PLAN. Sem impacto em performance, mas vale revisitar com nonces no futuro.

---

## 6. Checklist de validação pós-fix

Após implementar R1–R7, rodar:

- [ ] `npm run build` e confirmar que JS shared cai abaixo de 200 KB gzip
- [ ] `npm run build` e confirmar que CSS único cai abaixo de 35 KB
- [ ] PSI mobile em https://pagespeed.web.dev/ na URL deployada — meta: **Performance ≥ 92, LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 150ms**
- [ ] WebPageTest em condições "Moto G4 4G — São Paulo" — confirmar Speed Index ≤ 3.0s
- [ ] Lighthouse local com throttling "Slow 4G" — Performance ≥ 90
- [ ] Verificar no devtools "Coverage" que CSS unused é < 30%
- [ ] Verificar Network tab que apenas fontes usadas pela página atual carregam (não puxar variantes Italic se a página não usa italic)

---

## 7. Resumo executivo — Top 5 ações de maior ROI

1. **Pré-gerar AVIF/WebP do hero + eliminar 4 imagens Unsplash** (R1+R2). Ganho LCP -0.7s a -1.2s. Esforço baixo. **De longe o maior retorno.**
2. **Cortar pesos de fonte (Fraunces só 400, Inter 400+500, JetBrains 400)** (R3). Ganho FCP -200ms, payload -200 KB. Esforço: 5 minutos no `layout.tsx`.
3. **Mover `CartProvider` para route group `(shop)`** (R4). Ganho: 8–12 KB JS gzip nas 5 páginas legacy. Esforço médio.
4. **Remover `next/script beforeInteractive` do JSON-LD + transformar em `<script>` inline puro** (R6). Ganho: TTFB -50ms, elimina overhead errado. Esforço: 1 minuto.
5. **Refatorar `globals.css` removendo tokens e utilitários legados (`coffee-*`, `gold-*`, `reveal`, `kicker`, etc.)** (R7). Ganho CSS 72 KB → 30 KB, FCP -100ms. Esforço médio (depende de migrar páginas legacy primeiro).

Combinadas, essas 5 ações devem trazer a Home **de LCP projetado 2.4–3.2s para 1.4–1.9s** e bater o target de < 2.0s mobile com folga.

---

**Performance Benchmarker:** Claude Opus 4.7
**Status do site:** **PROJEÇÃO FALHA o LCP target sem os fixes; PASSA com R1+R2+R3 implementados**
**Confiança da projeção:** Média (PSI bloqueado por quota — recomenda-se rodar manualmente após próximo deploy para validar)
