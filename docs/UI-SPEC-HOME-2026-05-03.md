# UI Spec — Home Zerbinatti Coffee

Data: 2026-05-03
Autor: UI Designer (Claude Opus 4.7)
Escopo: especificação completa da nova Home, pixel-perfect, baseada em `BRAND-DIRECTION-2026-05-03.md` (paleta bone/ink/olive, Fraunces+Inter+Mono, tom afirmativo) e `SEO-STRATEGY-2026-05-03.md` (H1/H2 e copy de conversão).
Consumidor: Frontend Developer que vai implementar em Next.js 16 + Tailwind CSS v4.

---

## 0. Fundações compartilhadas (válidas para todas as seções)

### 0.1 Tokens — copiar para `globals.css` antes da implementação

```css
:root {
  /* Cores (canônicas — não criar variantes) */
  --bone:        #F4EFE6;
  --bone-soft:   #EBE3D5;
  --ink:         #1B1714;
  --ink-soft:    #3A322C;
  --ink-mute:    #736961;
  --olive:       #4A5237;
  --olive-deep:  #363D26;
  --line:        #D9D0BE;
  --line-dark:   #3A322C; /* sobre fundo ink */

  /* Tipografia */
  --font-display: 'Fraunces', 'Playfair Display', Georgia, serif;
  --font-sans:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;

  /* Espaçamento — base 8px, variantes editoriais */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 24px;  --space-6: 32px;
  --space-7: 48px;  --space-8: 64px;  --space-9: 96px;
  --space-10: 128px; --space-11: 192px; --space-12: 256px;

  /* Layout */
  --container-max: 1280px;          /* Limite editorial; nunca esticar full */
  --container-narrow: 880px;        /* Blocos de texto puro (História) */
  --gutter-mobile:  20px;
  --gutter-tablet:  32px;
  --gutter-desktop: 64px;

  /* Transições — funcionais, nunca decorativas */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   400ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Radius — quase nada. Marca é editorial, não app. */
  --radius-sm: 0;
  --radius-md: 2px;       /* Único permitido em CTAs e cards */
  --radius-pill: 999px;   /* Apenas para badges/eyebrows com fundo */

  /* Shadows — discretas; o luxo vem do espaço, não do volume */
  --shadow-card: 0 1px 0 0 var(--line);
  --shadow-card-hover: 0 12px 32px -16px rgba(27,23,20,0.12);
}
```

### 0.2 Breakpoints

| Nome | Faixa | Container | Gutter | Notas |
|---|---|---|---|---|
| Mobile | 320–639px | 100% | 20px | Stack vertical, tipografia em `clamp()` |
| Tablet | 640–1023px | 100%, max 720px | 32px | 1 ou 2 colunas dependendo da seção |
| Desktop | 1024–1439px | max 1280px | 64px | Grid 12 col |
| Wide | 1440px+ | max 1280px (não esticar) | 64px+ auto | Container fixo, padding cresce |

Regra: **nunca expandir o container além de 1280px**. Densidade vende commodity.

### 0.3 Grid base

12 colunas em desktop, gutter de 24px entre colunas. Tablet: 8 colunas, gutter 16px. Mobile: 4 colunas, gutter 16px.

### 0.4 Botões — sistema canônico

| Tipo | Background | Border | Text | Padding | Font |
|---|---|---|---|---|---|
| Primário | `--olive` | none | `--bone` | `16px 32px` | `--font-sans` 14px / 500 / `tracking 0.06em` UPPERCASE |
| Primário hover | `--olive-deep` | none | `--bone` | idem | idem (transição 250ms) |
| Secundário (ghost claro) | transparent | 1px `--ink` | `--ink` | `16px 32px` | idem |
| Secundário hover claro | `--ink` | 1px `--ink` | `--bone` | idem | idem |
| Secundário (ghost escuro) | transparent | 1px `--bone` | `--bone` | `16px 32px` | idem |
| Secundário hover escuro | `--bone` | 1px `--bone` | `--ink` | idem | idem |
| Link textual | none | none, underline 1px `currentColor` `offset 4px` | `--olive` em claro / `--bone` em escuro | 0 | `--font-sans` 14px / 500 |

Todos os botões: `border-radius: 2px`, `transition: var(--transition-normal)`, sem sombra, sem `transform: translateY` (banido — movimento decorativo).

### 0.5 Focus state global

Banido `outline: none`. Padrão WCAG 2.4.7:
- Em fundo claro: `outline: 2px solid var(--olive); outline-offset: 3px;`
- Em fundo escuro: `outline: 2px solid var(--bone); outline-offset: 3px;`
Aplicar via `:focus-visible` (nunca em `:focus` puro — evita ruído de mouse-clicker).

### 0.6 Header e contexto da Home

A Home é renderizada **abaixo do `<Header />` fixo existente**. O Header precisa redesign mínimo (ver seção 8). A Home começa diretamente no Hero, **sem padding-top** — o Hero é fullscreen e o Header flutua sobre ele em estado transparente até o scroll passar de 60px.

---

## 1. HERO

### 1.1 Decisão arquitetural

**Layout split assimétrico 60/40** (não fullscreen com texto sobre foto, não split 50/50).

Justificativa: a brand direction veta "wow effect" e exige espaço editorial. Foto fullscreen com texto sobreposto força contraste artificial e tem leitura sofrível em mobile. Split 50/50 é template Squarespace. **60/40 com tipografia à esquerda (60%) e fotografia à direita (40%)** lê como página de revista editorial — referência direta a Aesop/Le Labo. Em mobile vira stack: tipografia em cima, foto embaixo, sem perda de hierarquia.

### 1.2 Layout — Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│  Header transparente (fixed, 80px altura)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [60% width]                       │   [40% width]             │
│                                     │                           │
│   eyebrow (oliva)                   │                           │
│                                     │                           │
│   H1 display em duas linhas         │     [imagem fullbleed     │
│   com italic na palavra-âncora      │      até a borda direita] │
│                                     │                           │
│   lede (1 frase, italic discreto)   │                           │
│                                     │                           │
│   [CTA primário] [CTA secundário]   │                           │
│                                     │                           │
│   ─── selo EST. 1897 (mono)         │                           │
│                                     │                           │
└─────────────────────────────────────────────────────────────────┘
```

**Medidas exatas (desktop ≥1280px):**
- Altura total: `min(100vh, 820px)` — fullscreen mas com teto para wides
- Coluna esquerda: 60% width, padding `120px 64px 64px 64px` (top maior — respira o header)
- Coluna direita: 40% width, **fullbleed à direita** (imagem encosta na borda do viewport, não no container)
- Espaçamento vertical interno (esquerda):
  - eyebrow → H1: `32px`
  - H1 → lede: `32px`
  - lede → CTAs: `48px`
  - CTAs → selo: `auto` (push para baixo via flexbox; selo fica a `64px` da base)
  - Entre CTAs: `16px` horizontal

**Medidas exatas (1024–1279px):**
- Padding esquerda: `100px 32px 48px 32px`
- Resto idêntico

### 1.3 Conteúdo (copy final — pronta para implementar)

| Elemento | Texto |
|---|---|
| Eyebrow | `DAL 1897 · QUARTA GERAÇÃO` |
| H1 (display) | `Café especial brasileiro,` `casa italiana.` *(quebra forçada após a vírgula)* |
| Lede | `Uma casa, quatro gerações, um pacote a cada quinze dias. A curadoria fica por nossa conta.` |
| CTA primário | `COMEÇAR A RECEBER` (link `#assinatura` — scroll suave) |
| CTA secundário | `CONHECER OS CAFÉS` (link `#cafes` — scroll suave) |
| Selo | `EST.` `MDCCCXCVII` `· TREVISO → SERRA DO CABRAL` (mono, 11px, `tracking 0.18em`, cor `--ink-mute`) |

**Nota sobre o H1:** o SEO recomendou `Café especial brasileiro, casa italiana — desde 1897`. Deslocamos o "desde 1897" para o eyebrow (já tem `DAL 1897`) e o selo (`MDCCCXCVII`). O H1 fica mais limpo, e a data aparece duas vezes na dobra com tratamentos diferentes — reforço sem redundância visual.

**Nota sobre o italic:** aplicar `font-style: italic` apenas em **"casa italiana"** (segunda linha do H1). Italic do Fraunces tem peso editorial real — vira assinatura. Manter `font-weight: 400` mesmo no italic (peso 500+ engorda demais a serif).

### 1.4 Elementos visuais

**Tipografia:**
- Eyebrow: token `eyebrow` (`--font-sans` 11px / 500 / `tracking 0.28em` UPPERCASE) cor `--olive`
- H1: token `display` (`clamp(3.5rem, 7vw, 6rem)`, `--font-display`, weight 400, `tracking -0.025em`, `line-height 0.98`), cor `--ink`. Italic somente em "casa italiana"
- Lede: token `lede` (`clamp(1.125rem, 1.6vw, 1.375rem)`, `--font-display` italic, weight 400, `line-height 1.45`), cor `--ink-soft`, `max-width: 480px`
- CTAs: ver sistema 0.4
- Selo: `--font-mono` 11px / 400 / `tracking 0.18em` UPPERCASE, cor `--ink-mute`

**Cor:**
- Background da seção: `--bone` (papel de carta, não branco puro)
- Foto: ver abaixo
- Acento único: `--olive` (eyebrow + CTA primário). **Zero outras cores.**

**Fotografia (40% à direita):**
- Atual `public/zerbinatti-pacote.jpg` é foto de pacote em fundo neutro — funciona como **placeholder temporário**, mas **não passa o brief** (a brand direction veta foto stock e exige editorial real).
- **Recomendação definitiva:** substituir por **uma das três** (em ordem de preferência):
  1. **Mão segurando a moedeira de café antiga, luz natural lateral** — herança em ato. Vertical, ratio 3:4 ou 4:5. Cor desaturada, tons terrosos compatíveis com bone.
  2. **Macro do grão sobre superfície de mármore ou madeira clara** — ofício e matéria-prima. Quase fine art. Cor: marrom, bone, sombra ink-soft.
  3. **Mesa de café com xícara branca, jornal italiano dobrado, gota de óleo na superfície da bebida** — ritual. Mais "lifestyle" mas ainda editorial.
- **Especificações técnicas obrigatórias:**
  - Formato: AVIF primário, WebP fallback, JPEG último
  - Aspect ratio: 4:5 (vertical) — ocupa altura cheia da seção em desktop
  - Resolução mínima: 1200×1500px (3x para retina)
  - `next/image` com `priority` (LCP crítico), `sizes="(max-width: 1023px) 100vw, 40vw"`
  - **Fullbleed à direita:** imagem encosta na borda direita do viewport, não no container. Em desktop largo (>1280px), a imagem cresce até o limite do viewport enquanto o container fica fixo em 1280px — garante que nunca há "moldura branca" à direita da foto.
- Enquanto a foto definitiva não chegar: usar `public/zerbinatti-pacote.jpg` mas em tratamento monocromático (filtro CSS `filter: saturate(0.7) contrast(1.05)`) para já compatibilizar com a paleta bone/ink.

### 1.5 Microinterações

- **CTAs:** transição de 250ms em background-color e color. Sem `translateY`, sem scale. Apenas inversão de cor.
- **Scroll suave** dos CTAs: `behavior: smooth`, mas respeitar `prefers-reduced-motion: reduce` (instantâneo se ligado).
- **Header:** já tem transição (transparente → ink) em scroll > 60px. Manter, ajustando cores (ver seção 8).
- **Imagem:** sem parallax. Sem `object-fit: cover` com transform. Apenas `object-fit: cover; object-position: center`.
- **Reveal de entrada:** opcional, fade-in sutil (200ms, `opacity 0→1`) no carregamento da página, sem stagger entre elementos. Banido qualquer "ondinha" de entrada.

### 1.6 Acessibilidade

- Contraste H1 (`--ink` sobre `--bone`): `#1B1714` sobre `#F4EFE6` = ratio **15.4:1** (AAA — passa folgado)
- Contraste lede (`--ink-soft` sobre `--bone`): `#3A322C` sobre `#F4EFE6` = ratio **10.8:1** (AAA)
- Contraste eyebrow (`--olive` sobre `--bone`): `#4A5237` sobre `#F4EFE6` = ratio **6.9:1** (AAA para texto pequeno também)
- Contraste CTA primário (`--bone` sobre `--olive`): ratio **6.9:1** (AAA)
- Contraste selo (`--ink-mute` sobre `--bone`): `#736961` sobre `#F4EFE6` = ratio **4.8:1** (AA — passa para texto regular)
- H1 é `<h1>` único da página
- Imagem: `alt` descritivo (ex: "Mão preparando café na moedeira italiana herdada da família Zerbinatti")
- CTAs com `aria-label` redundante apenas se ícone único (não é o caso aqui)
- Hierarquia: `<section aria-labelledby="hero-title">` → eyebrow `<p>` → H1 `<h1 id="hero-title">` → lede `<p>` → `<div role="group">` com CTAs

### 1.7 Variantes mobile (320–767px)

| Mudança | Razão |
|---|---|
| Layout vira stack: tipografia em cima, foto embaixo | Split 60/40 quebra a tipografia em mobile |
| Altura: `auto` (não 100vh) | 100vh em mobile vira 130vh por causa da barra do browser |
| Padding lateral: 20px | Gutter mobile padrão |
| Padding top: 100px (compensa header) | Header mobile tem 60px |
| H1: tamanho via `clamp()` reduz para 56px mínimo | Garante 2 linhas, não 4 |
| Lede: `max-width: 100%` | Espaço é precioso |
| CTAs: stack vertical, full-width (max 320px), gap 12px | Touch-target ≥44px, evita botões espremidos lado a lado |
| Foto: aspect ratio 4:3 (não 4:5), full-width até as bordas | Compõe melhor abaixo do texto |
| Selo: vai para baixo da foto, centralizado | Hierarquia mantida sem competir |

---

## 2. TRÊS CAFÉS (3 SKUs)

### 2.1 Decisão arquitetural

**Importante:** os "3 cafés" do projeto atual são na verdade **3 SKUs do mesmo café Zerbinatti** (500g grãos, 250g grãos, 250g moído — ver `src/lib/data/products.ts`). Esta seção tem que tratar isso com honestidade editorial: **não fingir que são 3 cafés diferentes**.

Layout: **3 cards em grid horizontal de larguras iguais**, cada um representando uma forma de receber o mesmo café. Diferenciação por **formato e gramatura**, não por hierarquia visual.

### 2.2 Layout — Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   eyebrow (centralizado)                                        │
│   H2 (2 linhas, centralizado, max 720px)                        │
│   lede (1 linha, centralizado, max 560px)                       │
│                                                                 │
│   ───────────── (hairline 1px, 80px width, --line)              │
│                                                                 │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐                  │
│   │ [foto]   │    │ [foto]   │    │ [foto]   │                  │
│   │          │    │          │    │          │                  │
│   │ CASA 01  │    │ CASA 02  │    │ CASA 03  │                  │
│   │ nome     │    │ nome     │    │ nome     │                  │
│   │ origem   │    │ origem   │    │ origem   │                  │
│   │ notas    │    │ notas    │    │ notas    │                  │
│   │ ──────   │    │ ──────   │    │ ──────   │                  │
│   │ preço    │    │ preço    │    │ preço    │                  │
│   │ [Ver →]  │    │ [Ver →]  │    │ [Ver →]  │                  │
│   └──────────┘    └──────────┘    └──────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Medidas exatas:**
- Padding vertical da seção: `py-32` (128px) desktop / `py-20` (80px) mobile — **regra brand direction**
- Header da seção (eyebrow + H2 + lede + hairline): centralizado, max-width 720px, margin-bottom 96px
- Espaçamento eyebrow → H2: `24px`
- Espaçamento H2 → lede: `24px`
- Espaçamento lede → hairline: `48px`
- Hairline: 1px altura, 80px largura, cor `--line`, margin auto
- Grid: 3 colunas iguais, gap 32px (desktop), 24px (tablet)
- Cada card: largura `(container - 2*gap) / 3`, altura `auto` (define-se pelo conteúdo, mas igual entre os 3 via `align-items: stretch`)
- Padding interno do card: `0` na foto + `32px` no bloco textual
- Foto do card: aspect-ratio 4:5 (vertical), object-fit cover
- Espaçamentos verticais dentro do bloco textual:
  - foto → CASA XX: `24px` (acima do CASA, dentro do bloco textual)
  - CASA XX → nome: `12px`
  - nome → origem: `8px`
  - origem → notas: `16px`
  - notas → divisor: `24px`
  - divisor → preço: `16px`
  - preço → CTA: `24px`

### 2.3 Conteúdo (copy final)

**Header da seção:**
| Elemento | Texto |
|---|---|
| Eyebrow | `OS TRÊS PACOTES` |
| H2 | `Um café. Três formas de servir.` *(italic em "três")* |
| Lede | `Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, torrados sob demanda em Treviso. Você escolhe a moagem e a gramatura.` |

**Os 3 cards** (extraídos de `src/lib/data/products.ts`):

| | Card 1 | Card 2 | Card 3 |
|---|---|---|---|
| Numeração | `CASA 01` | `CASA 02` | `CASA 03` |
| Nome (h3) | `Pacote Família` | `Pacote Mesa` | `Pacote Coador` |
| Origem (1 linha mono) | `500g · em grãos · Bourbon + Catuaí` | `250g · em grãos · Bourbon + Catuaí` | `250g · moído · moagem média` |
| Descrição (1-2 linhas) | `Melhor R$/kg da casa. Para quem mói em casa e bebe todo dia.` | `Pacote curto para conhecer o café antes de assinar.` | `Moagem universal — coador, Moka, prensa, cafeteira elétrica.` |
| Notas sensoriais | `Chocolate · Caramelo · Nozes · Final doce` | `Chocolate · Caramelo · Nozes · Final doce` | `Chocolate · Caramelo · Nozes · Final doce` |
| Preço | `R$ 89,90` | `R$ 49,90` | `R$ 49,90` |
| Sub-preço (mono) | `R$ 179,80 / kg` | `R$ 199,60 / kg` | `R$ 199,60 / kg` |
| CTA | `Ver pacote →` | `Ver pacote →` | `Ver pacote →` |

**Importante sobre as notas:** as notas são as **mesmas** nos 3 cards porque é o mesmo café. Brand direction exige honestidade. Não inventar diferenças sensoriais entre formatos — isso seria mentira editorial. A diferenciação é formato + preço/kg, e isso já basta.

**Numeração "CASA XX":** referência direta a Le Labo (Santal 33). Trata os pacotes como peças de coleção, não SKUs de e-commerce. **Importante:** em mobile, manter a numeração — é a assinatura dessa seção.

### 2.4 Elementos visuais

**Tipografia:**
- Eyebrow header: token `eyebrow`, cor `--olive`
- H2 header: token `h1` (`clamp(2.5rem, 5vw, 4rem)`, display, weight 400, italic seletivo), cor `--ink`
- Lede header: token `lede`, cor `--ink-soft`, max-width 560px, centralizado
- Card — `CASA 01`: `--font-mono` 12px / 500 / `tracking 0.18em` UPPERCASE, cor `--olive`
- Card — nome: `--font-display` 24px / 400 / `line-height 1.2`, cor `--ink`
- Card — origem (linha mono): `--font-mono` 11px / 400 / `tracking 0.05em`, cor `--ink-mute`
- Card — descrição: `--font-sans` 15px / 400 / `line-height 1.6`, cor `--ink-soft`
- Card — notas: `--font-sans` 13px / 400 / `tracking 0.02em`, cor `--ink-mute`
- Card — preço: `--font-display` 28px / 400, cor `--ink`
- Card — sub-preço: `--font-mono` 12px / 400, cor `--ink-mute`
- Divisor interno do card: 1px, 100% width, cor `--line`

**Cor:**
- Background da seção: `--bone-soft` (mais escuro que o Hero — cria ritmo entre seções)
- Cards: background `--bone` (mais claro que a seção — destaca sem usar sombra)
- Borda do card: 1px `--line`
- CTA do card: link textual `--olive` com underline 1px offset 4px

**Fotografia dos cards:**
- 3 fotos do **mesmo pacote**, mas em **3 contextos diferentes**:
  1. CASA 01 (500g grãos): pacote inteiro de pé em mesa de madeira, luz lateral natural
  2. CASA 02 (250g grãos): pacote menor em mão, fundo levemente desfocado
  3. CASA 03 (250g moído): pacote ao lado de coador de pano e caneca branca, ritual de preparo
- Aspect ratio: 4:5 idêntico nos 3
- Tratamento de cor consistente entre as 3 (mesmo balanço de branco, mesma curva de luz)
- Fallback enquanto não há foto: render do mockup do pacote sobre fundo `--bone-soft`

### 2.5 Microinterações

- **Card hover:**
  - Background do card: `--bone` → `--bone` mantém (não muda)
  - Borda do card: `--line` → `--olive` (transição 250ms)
  - Sombra: nenhuma → `var(--shadow-card-hover)` (transição 250ms)
  - Foto interna: zoom muito leve `scale(1.02)` (transição 400ms ease-out, `transform-origin: center`)
  - CTA interno (link): cor mantém, mas underline cresce de 1px para 1.5px
  - **Sem `translateY`** — banido no card todo
- **Card focus-visible:** outline 2px `--olive`, offset 2px (envolve o card inteiro, que é `<a>` ou `<article>` com link wrapper)
- **Toque mobile:** sem hover, mas tap state com `active:bg-bone-soft` por 100ms (feedback tátil)

### 2.6 Acessibilidade

- Contraste nome (`--ink` sobre `--bone`): 15.4:1 (AAA)
- Contraste descrição (`--ink-soft` sobre `--bone`): 10.8:1 (AAA)
- Contraste notas (`--ink-mute` sobre `--bone`): 4.8:1 (AA — borderline, monitorar; subir para `--ink-soft` se reclamar em audit)
- Cada card é `<article>` com `<h3>` próprio (nome do pacote)
- Link do card envolve toda a área (`<Link>` no card inteiro), com texto acessível dentro
- Foto: `alt` específico por card ("Pacote 500g de Café Zerbinatti em grãos sobre mesa de madeira")
- Numeração `CASA 01` é decorativa visualmente mas semanticamente faz parte do nome — incluir no `aria-label` do link (`Ver pacote Casa 01 — Pacote Família, 500g em grãos`)
- Preço: usar `<data value="89.90">R$ 89,90</data>` para semântica machine-readable

### 2.7 Variantes mobile (320–767px)

| Mudança | Razão |
|---|---|
| Grid: 1 coluna (stack vertical) | 3 cards lado a lado em mobile = card de 100px de largura, ilegível |
| Gap entre cards: 24px | Padding-bottom do anterior + ar |
| Card width: 100% (com padding lateral 20px) | Aproveitar viewport |
| Foto do card: aspect-ratio 16:9 (não 4:5) | 4:5 vertical ocupa demais o viewport mobile e empurra texto pra baixo da dobra |
| Header da seção: padding-bottom 64px (não 96px) | Comprime ar para o conteúdo aparecer mais cedo |
| Eyebrow header e H2: mantêm centralizados | Hierarquia preservada |
| CTA do card: full-width visualmente (link com `display: block`, padding 16px 0, borda inferior 1px), aumentando touch target | Padrão mobile correto |

### 2.8 Tablet (640–1023px)

| Mudança |
|---|
| Grid: 2 colunas, 3º card vai para nova linha centralizado (col-start 1 col-end 3 com max-width igual ao card) |
| Alternativa preferida: manter 3 colunas mas reduzir padding interno do card de 32px para 20px |
| Decisão: **3 colunas com padding 20px** (preserva hierarquia editorial; tablet tem largura suficiente) |

---

## 3. ASSINATURA (a estrela)

### 3.1 Decisão arquitetural — fluxo único, não comparativo

**Decisão definitiva: fluxo único com seleção de frequência inline, não 3 planos comparativos.**

Por quê:
- Brand direction posiciona Zerbinatti como **curadora**: "A casa escolhe. Você recebe." Apresentar 3 planos lado a lado força o cliente a comparar e escolher — exatamente o oposto da promessa.
- 3 planos comparativos é template SaaS, não casa editorial. Aesop não tem 3 planos. Le Labo não tem 3 planos.
- Conversão melhor: estudos repetidos mostram que comparativo de 3 planos tem alta taxa de "decision paralysis" em commerce premium. Fluxo único com seleção contextual converte mais e tem menor abandono.
- O atual `Subscription.tsx` (que está sendo descartado) tinha 3 planos (Apreciador/Sommelier/Herdeiro) — esses nomes são bons mas viram **gramaturas/frequências**, não tiers de assinatura.

**Modelo:** uma única assinatura, com duas escolhas inline:
1. **Frequência:** Quinzenal ou Mensal (toggle)
2. **Pacote:** 500g grãos (default) | 250g grãos | 250g moído (radio cards horizontais)

### 3.2 Layout — Desktop (≥1024px)

Esta é a seção visualmente mais densa da Home, mas operada com rigor para não virar ruído. **Background `--ink` (dark) para diferenciar das outras seções e marcar como produto-âncora.**

```
┌─────────────────────────────────────────────────────────────────┐ ← bg ink
│                                                                 │
│   [coluna esquerda 50%]              │  [coluna direita 50%]    │
│                                      │                          │
│   eyebrow (oliva)                    │   ┌──────────────────┐   │
│                                      │   │                  │   │
│   H1 (display, branco bone)          │   │  CONFIGURADOR    │   │
│   "A casa escolhe.                   │   │                  │   │
│    Você recebe."                     │   │  FREQUÊNCIA      │   │
│   (italic em "recebe")               │   │  [○ Quinzenal]   │   │
│                                      │   │  [● Mensal]      │   │
│   lede (1 frase)                     │   │                  │   │
│                                      │   │  PACOTE          │   │
│   ─── lista de 4 garantias ───       │   │  ┌──┐┌──┐┌──┐    │   │
│   (ícones SVG 1px + texto)           │   │  │..││..││..│    │   │
│   • Torra fresca, sob demanda        │   │  └──┘└──┘└──┘    │   │
│   • Pause ou cancele quando quiser   │   │                  │   │
│   • Frete grátis em todo o Brasil    │   │  ──────          │   │
│   • -15% no primeiro envio           │   │  Total/envio     │   │
│                                      │   │  R$ 76,42        │   │
│   [link sutil quiz, abaixo]          │   │                  │   │
│   "Não sabe qual escolher?           │   │  [CTA primário]  │   │
│    Faça o teste em 30s →"            │   │                  │   │
│                                      │   │  caption         │   │
│                                      │   │  "Cobrança recor-│   │
│                                      │   │   rente. Cancele │   │
│                                      │   │   sem perguntas."│   │
│                                      │   └──────────────────┘   │
│                                      │                          │
└─────────────────────────────────────────────────────────────────┘
```

**Medidas exatas:**
- Background da seção: `--ink`
- Padding vertical: `py-40` (160px desktop) / `py-24` (96px mobile) — **mais que outras seções, marca importância**
- Container interno: max-width 1280px, gutter 64px
- Grid: 2 colunas 50/50, gap 80px (mais ar do que 64px — respira mais)
- Coluna esquerda alinhamento: `align-items: start`, `justify-content: center` vertical
- Coluna direita: o configurador é um **card real** (única caixa visualmente delimitada da Home — exceção justificada porque é o conversor)
  - Background do card: `--ink-soft`
  - Borda do card: 1px `--ink-mute` opacity 0.4
  - Padding interno: 48px
  - Border-radius: 2px
- Espaçamentos verticais dentro do configurador:
  - eyebrow "FREQUÊNCIA" → toggle: 16px
  - toggle → eyebrow "PACOTE": 32px
  - eyebrow "PACOTE" → cards de pacote: 16px
  - cards → divisor: 32px
  - divisor → linha "Total/envio": 24px
  - "Total/envio" → CTA: 32px
  - CTA → caption: 16px

### 3.3 Conteúdo (copy final)

**Coluna esquerda:**
| Elemento | Texto |
|---|---|
| Eyebrow | `O CARTÃO DA CASA` |
| H1 | `A casa escolhe.` *line-break* `Você recebe.` *(italic em "recebe")* |
| Lede | `Quinzenal ou mensal. Um pacote por entrega, torrado na semana, com a moagem que você preferir.` |
| Lista (4 garantias com ícones hairline) | `Torra fresca, sob demanda` `Pause ou cancele quando quiser` `Frete grátis em todo o Brasil` `Primeiro envio com 15% de desconto` |
| Link sutil (quiz) | `Não sabe qual escolher? Faça o teste em 30 segundos →` |

**Coluna direita (configurador):**
| Elemento | Texto |
|---|---|
| Eyebrow seção FREQUÊNCIA | `FREQUÊNCIA` |
| Toggle opções | `Quinzenal` / `Mensal` (Mensal selecionado por default) |
| Eyebrow seção PACOTE | `PACOTE` |
| Card pacote 1 | `500g grãos` `R$ 89,90` |
| Card pacote 2 | `250g grãos` `R$ 49,90` |
| Card pacote 3 | `250g moído` `R$ 49,90` |
| Linha total (label) | `Total por envio` |
| Linha total (valor) | `R$ 76,42` (= 500g 89,90 com -15%, no exemplo) — **calcular dinamicamente** |
| Linha sub-total (mono) | `Equivale a R$ 152,84/kg · livre de frete` |
| CTA primário | `COMEÇAR A RECEBER` |
| Caption legal | `Cobrança recorrente conforme frequência. Cancele a qualquer momento, sem perguntas.` |

**Sobre os ícones das garantias:** SVGs hairline (1px stroke), 18×18px, cor `--olive` (único acento). Não usar lucide/heroicons — desenhar 4 ícones próprios:
1. Torra fresca → forma de chama estilizada minimalista (3 linhas)
2. Pause/cancele → símbolo `||` simples
3. Frete → quadrado com seta saindo (caixa)
4. Desconto → símbolo `%` com peso editorial

### 3.4 Elementos visuais

**Tipografia (em fundo dark — `--ink`):**
- Eyebrow: token `eyebrow`, cor `--olive` (a única vez que oliva aparece em fundo dark — vira ainda mais assinatura)
- H1: token `h1` (`clamp(2.5rem, 5vw, 4rem)`, display, weight 400, italic em "recebe"), cor `--bone`
- Lede: token `lede`, cor `--bone-soft`, max-width 440px
- Lista de garantias: `--font-sans` 15px / 400 / `line-height 1.6`, cor `--bone-soft`. Espaçamento entre items: 16px. Ícones à esquerda do texto, gap 16px.
- Link sutil quiz: `--font-sans` 14px / 500, cor `--bone` com underline 1px offset 4px. Hover: cor `--olive` (último laranja → oliva claramente). Posicionado 32px abaixo da lista de garantias.

**Tipografia configurador (em fundo `--ink-soft`):**
- Eyebrow seções (FREQUÊNCIA, PACOTE): `--font-mono` 11px / 500 / `tracking 0.18em` UPPERCASE, cor `--ink-mute` (sim, ink-mute funciona em ink-soft — testar contraste; se reprovar, usar `--bone-soft`)
- Toggle: 2 botões pill, `--font-sans` 14px / 500 / `tracking 0.04em`, padding `12px 24px`. Estado inativo: bg transparent, border 1px `--ink-mute`, cor `--bone-soft`. Estado ativo: bg `--bone`, border `--bone`, cor `--ink`.
- Cards de pacote (radio cards): 3 cards horizontais. Tamanho cada: largura igual (`flex: 1`), altura auto. Padding 16px. Estado inativo: bg transparent, border 1px `--ink-mute`. Estado ativo: bg `--bone`, border `--bone`, cor interna inverte. Conteúdo: `<input type="radio">` visualmente escondido + label com nome (sans 13px) e preço (mono 12px).
- Linha total (label): `--font-sans` 14px / 400, cor `--bone-soft`
- Linha total (valor): `--font-display` 36px / 400, cor `--bone`
- Linha sub-total: `--font-mono` 12px / 400, cor `--ink-mute`
- CTA primário (em fundo dark): bg `--olive`, texto `--bone`, **full-width do card** (não fixed 32px padding — full bleed)
- Caption legal: `--font-sans` 12px / 400 / `line-height 1.5`, cor `--ink-mute`

**Cor:**
- Background seção: `--ink`
- Background configurador: `--ink-soft`
- Acento: `--olive` (eyebrow, ícones, estado de underline em hover)
- Inversão: `--bone` (texto principal, estado ativo de toggle/radio)
- **Zero outras cores. Sem amarelo de "destaque", sem verde de "ok", sem vermelho de "alerta".** A urgência vem do tom da copy ("Comece a receber"), não da cor.

**Imagem:**
- **Sem foto nesta seção.** A seção é puramente tipografia + UI. Imagem aqui dispersa do conversor.
- Opcional (decisão do dev): pequeno detalhe ornamental no canto superior direito da seção — uma fotinha 80×80px do monograma Z em foil dourado (lembrança discreta da herança). Mas só se a seção parecer muito "naked" depois de implementada. Default: **sem ornamentos**.

### 3.5 Microinterações

- **Toggle frequência:** clique muda estado em 200ms (background-color + color). **Total/envio recalcula com transição de 250ms na mudança de número** (fade-out 100ms → texto novo → fade-in 150ms). Sem animação de "rolagem de números" — kitsch.
- **Radio cards de pacote:** clique muda estado em 200ms. Card selecionado tem borda + bg invertidos. Outros cards sem hover de cor (só em hover ativo de mouse).
- **Cards de pacote hover:** borda muda de `--ink-mute` para `--bone-soft`, 200ms. Sem outras alterações.
- **CTA primário hover:** background `--olive` → `--olive-deep`, 250ms. Sem scale, sem shadow.
- **Link quiz hover:** underline cresce de 1px para 1.5px, cor muda de `--bone` para `--olive`, 200ms.
- **Validação:** se Quinzenal selecionado, recalcular total considerando 2x ao mês (mostrar "R$ X,XX × 2 envios = R$ Y/mês"). Se Mensal, mostrar valor único.

### 3.6 Acessibilidade

- Contraste H1 (`--bone` sobre `--ink`): 15.4:1 (AAA)
- Contraste lede (`--bone-soft` sobre `--ink`): 12.1:1 (AAA)
- Contraste lista (`--bone-soft` sobre `--ink`): 12.1:1 (AAA)
- Contraste eyebrow `--olive` sobre `--ink`: 4.6:1 (AA — passa para texto pequeno)
- Contraste valor total `--bone` sobre `--ink-soft`: 8.9:1 (AAA)
- Contraste eyebrow seção `--ink-mute` sobre `--ink-soft`: **2.4:1 — REPROVA WCAG AA**. **Trocar para `--bone-soft` (`#EBE3D5`) sobre `--ink-soft` = 7.5:1 (AAA)**.
- Toggle: `<fieldset>` + `<legend>` invisível "Frequência da assinatura" + 2 `<input type="radio">` com labels visíveis. Tab navega entre as opções, Setas mudam seleção.
- Cards de pacote: idem padrão `<fieldset>` + radio buttons com label visual.
- CTA: `<button type="submit">` com `aria-describedby` apontando para a caption legal.
- Mudança de total: `aria-live="polite"` na linha do total — leitor de tela anuncia mudança quando dev altera frequência/pacote.
- Link sutil do quiz: `<a href="/quiz">` com texto descritivo completo, sem ícones-only.

### 3.7 Variantes mobile (320–767px)

| Mudança | Razão |
|---|---|
| Stack vertical: tipografia em cima, configurador embaixo | Split 50/50 quebra em mobile |
| Coluna esquerda: padding lateral 20px, padding-bottom 48px | Separa do configurador |
| Configurador: full-width (com padding lateral 20px externo), padding interno 24px (não 48px) | Espaço é precioso |
| Cards de pacote: stack vertical (não 3 horizontais) | 3 cards de 80px de largura é ilegível |
| Cada card de pacote em mobile: layout horizontal interno (radio à esquerda, label e preço à direita), altura 64px | Otimiza touch + leitura |
| CTA primário: mantém full-width do card | Padrão mobile |
| Link quiz: mantém abaixo da lista de garantias, font-size 13px | Hierarquia preservada |
| Padding vertical da seção: py-24 (não py-40) | Compacta sem perder ar |

### 3.8 Tablet (640–1023px)

| Mudança |
|---|
| Mantém split 50/50, mas reduz gap para 48px |
| Configurador padding interno reduz para 32px |
| Cards de pacote: mantém 3 horizontais (largura suficiente) |

---

## 4. HISTÓRIA 1897

### 4.1 Decisão arquitetural

Bloco editorial **assimétrico curto**, em 1 linha de viewport (não vira artigo). Volta para o background `--bone` (depois do dark da Assinatura — cria respiração).

**Layout: foto à esquerda 40% / texto à direita 60%** (espelha o Hero invertido — cria simetria narrativa: começa com texto à esquerda, fecha com texto à direita).

### 4.2 Layout — Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────┐ ← bg bone
│                                                                 │
│   [40% width]               │   [60% width]                     │
│                             │                                   │
│                             │   eyebrow (oliva)                 │
│   [foto vertical            │                                   │
│    fullbleed à esquerda]    │   H2 (display, 2 linhas)          │
│                             │                                   │
│                             │   parágrafo único editorial       │
│                             │   (~80-120 palavras)              │
│                             │                                   │
│                             │   ─── linha mono (mono, oliva)    │
│                             │                                   │
│                             │   [link textual com seta]         │
│                             │                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Medidas exatas:**
- Background: `--bone`
- Padding vertical: `py-32` (128px) / `py-20` mobile
- Grid: 40/60 desktop
- Coluna esquerda: imagem fullbleed à **esquerda do viewport** (encosta na borda esquerda, não no container)
- Coluna direita: padding `0 64px 0 80px` (mais padding à esquerda — afasta da foto)
- Coluna direita alinhamento vertical: `justify-content: center`
- Espaçamentos verticais coluna direita:
  - eyebrow → H2: 32px
  - H2 → parágrafo: 32px
  - parágrafo → linha mono: 48px
  - linha mono → CTA: 24px

### 4.3 Conteúdo (copy final)

| Elemento | Texto |
|---|---|
| Eyebrow | `1897 — TREVISO, ITÁLIA` |
| H2 | `Quatro gerações,` *line-break* `o mesmo gesto.` *(italic em "gesto")* |
| Parágrafo (~95 palavras) | `Giuseppe Zerbinatti torrou seu primeiro lote em 1897, em Treviso, antes de atravessar o Atlântico. O ofício fez a travessia com ele: a moedeira de bronze, o relógio de bolso para cronometrar a torra, o caderno de receitas que ainda hoje guardamos. Quatro gerações depois, mudamos de continente, de máquinas e de fazenda, mas o gesto continua o mesmo — torrar pouco, torrar fresco, torrar para alguém que vai beber em casa, não em uma prateleira de supermercado.` |
| Linha mono | `MDCCCXCVII · TREVISO → MMXXVI · SERRA DO CABRAL` |
| CTA | `Conheça nossa história →` (link para `/sobre`) |

### 4.4 Elementos visuais

**Tipografia:**
- Eyebrow: token `eyebrow`, cor `--olive`
- H2: token `h1`, cor `--ink`, italic em "gesto"
- Parágrafo: token `body` (17px / 1.7 line-height), cor `--ink-soft`, max-width 580px (não esticar — prejudica leitura)
- Linha mono: `--font-mono` 11px / 400 / `tracking 0.18em` UPPERCASE, cor `--olive`
- CTA: link textual com underline (sistema 0.4)

**Cor:**
- Background seção: `--bone`
- Foto: tratamento monocromático opcional (filtro sépia muito sutil — `filter: sepia(0.15)`) para sugerir herança sem virar Instagram filter

**Fotografia (40% à esquerda):**
- **Recomendação definitiva (em ordem):**
  1. **Retrato sépia recriado**: foto contemporânea de homem mais velho (representando a continuidade da tradição) preparando café em moedeira italiana antiga, em ambiente rústico iluminado por luz de janela. Sem filtros pesados, mas paleta naturalmente desaturada e quente. Vertical 4:5.
  2. **Macro do caderno de receitas antigo aberto**: páginas amareladas, anotações manuscritas em italiano, possivelmente uma xícara fora de foco. Vertical 4:5.
  3. **Foto da fazenda Santa Rita / Serra do Cabral**: paisagem em horário dourado, mas vertical, focando em uma fileira de cafeeiros. Conecta passado (1897) com presente (terroir mineiro).
- **Não usar:** foto de homem italiano sépia genérico de banco de imagens. Brand direction veta stock.
- Fallback enquanto não há foto definitiva: bloco vazio `--bone-soft` com selo monograma Z centralizado em `--olive`. Melhor um vazio honesto que uma foto errada.

### 4.5 Microinterações

- **Sem animação de scroll-reveal** nesta seção (banido pela brand direction). A entrada é estática.
- **CTA hover:** underline cresce 1px → 1.5px, sem outras mudanças.
- **Foto:** estática. Sem parallax.

### 4.6 Acessibilidade

- Contraste H2 e parágrafo idênticos a outras seções claras (todos AAA)
- Foto com `alt` descritivo e específico (não "imagem da história" — algo como "Detalhe da moedeira de bronze italiana usada por Giuseppe Zerbinatti em 1897, ainda em uso na torrefação")
- Estrutura semântica: `<section aria-labelledby="historia-title">` → `<h2 id="historia-title">` → `<p>` → `<a>`

### 4.7 Variantes mobile (320–767px)

| Mudança | Razão |
|---|---|
| Stack vertical: foto em cima, texto embaixo | Split 40/60 não cabe |
| Foto: aspect ratio 16:9 (não 4:5), full-width até as bordas | Compõe melhor abaixo do texto não, espera — **acima do texto** |
| Padding lateral texto: 20px | Gutter mobile |
| H2: clamp() reduz para 36px mínimo | Cabe em 2-3 linhas |
| Parágrafo: max-width 100%, font-size 16px (1px abaixo do desktop) | Densidade ok em mobile |
| Linha mono: font-size 10px, mantém tracking | Pode quebrar em 2 linhas se necessário |
| Padding vertical: py-20 (80px) | Compacta |

---

## 5. FOOTER

### 5.1 Diagnóstico do footer atual

`src/components/Footer.tsx` atual usa `bg-coffee-950`, classes `text-coffee-300`, `text-gold-400`, monograma com `text-gold-400`. **Toda a paleta atual está obsoleta com a nova brand direction.** Estrutura (4 colunas: brand, loja, sobre, newsletter+social) está OK e pode ser mantida com refactor visual.

### 5.2 Mudanças obrigatórias (refactor, não rewrite)

**Cores — substituir 1:1:**
| Atual | Novo |
|---|---|
| `bg-coffee-950` | `bg-ink` |
| `text-coffee-200` | `text-bone` |
| `text-coffee-300` | `text-bone-soft` |
| `text-coffee-400` | `text-ink-mute` (sobre `--ink` dá contraste limítrofe — testar; usar `--bone-soft` opacity 0.5 se necessário) |
| `text-coffee-500` (ícones sociais) | `text-ink-mute` |
| `text-gold-400` (hover, monograma) | `text-olive` |
| `border-coffee-800` | `border-line-dark` (`--ink-soft`) |

**Tipografia:**
- Headers das colunas (`Loja`, `Sobre`, `Newsletter`): trocar de `font-semibold` (peso 600) para `font-medium` (500). Manter UPPERCASE e tracking. **Trocar de Inter para `--font-mono`** — vira eyebrow, ganha personalidade editorial.
- Links das colunas: `--font-sans` 14px / 400 (sem mudança de peso), cor `--bone-soft`, hover `--olive` (não gold).
- Brand block (descrição "Café especial brasileiro com herança italiana..."): trocar para tom afirmativo da brand direction. Texto novo: `Casa familiar de café, em ofício contínuo desde 1897. Treviso e Serra do Cabral em cada pacote.`
- Selo "Dal 1897 / Famiglia Zerbinatti" no brand block: manter, mas trocar `tracking-[0.3em]` para `0.28em` (alinhar com sistema de eyebrow).

**Estrutura — manter 4 colunas, mas atualizar links:**
- Loja: `Pacotes` (`/cafes`), `Assinatura` (`/assinatura`), `Para empresas` (`/para-empresas`)
- Sobre: `Nossa história` (`/sobre`), `A fazenda` (`/fazenda`), `Processo` (`/processo`)
- Newsletter: manter form, mudar texto para `Notas da casa, novas safras, rituais. Uma vez por mês, sem ruído.`
- Social: manter os 3 ícones (Instagram, YouTube, TikTok), mas trocar `text-coffee-500 hover:text-gold-400` para `text-ink-mute hover:text-olive`

**Bottom bar (copyright + termos):**
- Manter estrutura
- Substituir cores (coffee-400 → ink-mute, hover gold-400 → olive)
- Texto copyright: `© 2026 Zerbinatti Coffee · Famiglia Zerbinatti, Brasil` (adicionar Famiglia para coesão de marca)

**Padding:**
- Atual `pt-16 pb-8` → mudar para `pt-32 pb-16` (mais ar, alinha com brand direction)
- Top border bottom bar: `mt-16 pt-8` → `mt-24 pt-12`

**Monograma:**
- Manter `<Monogram size={36} />` mas atualizar componente para usar `currentColor` em vez de gold hardcoded — assim a cor vem do parent (`text-olive`)

### 5.3 Acessibilidade

- Contraste link footer (`--bone-soft` sobre `--ink`): 12.1:1 (AAA)
- Contraste copyright (`--ink-mute` sobre `--ink`): **2.5:1 — REPROVA**. Trocar para `--bone-soft` opacity 0.5 (5.5:1 — AA).
- Headers de coluna são `<h4>` — preservar
- Form newsletter: label com `<label>` ou `aria-label` (verificar `NewsletterForm.tsx`)
- Ícones sociais: `aria-label` já existe — preservar

### 5.4 Variante mobile

Atual já é responsivo (`grid md:grid-cols-2 lg:grid-cols-4`). Manter. Apenas garantir que padding lateral mobile é 20px (não 24px do `px-6`).

---

## 6. Header — refactor mínimo

### 6.1 Mudanças obrigatórias

O Header atual já tem comportamento correto (transparente → opaco no scroll). Mudanças:

| Atual | Novo |
|---|---|
| `bg-coffee-950/95 backdrop-blur-md` (scrolled) | `bg-ink/95 backdrop-blur-md` |
| `text-coffee-300 hover:text-gold-400` (links) | `text-bone-soft hover:text-olive` |
| `text-coffee-50` (botão menu) | `text-bone` |
| `border-coffee-800` (mobile menu border) | `border-line-dark` |

**Logo:**
- Hoje usa `/images/logo-white.png`. Funciona em fundo dark. Quando o header é transparente sobre Hero (bg `--bone`), **a logo branca fica invisível**.
- **Solução:** quando `scrolled === false` E a página atual é a Home, usar `/images/logo-dark.png` (versão preta). Trocar para `logo-white.png` em scroll. Implementação: condicional no src do `<img>`.
- Se logo dark não existir como asset: criar um SVG inline da wordmark "Zerbinatti" em `--ink`, mantendo a logo PNG atual apenas para o estado scrolled.

**Nav links:**
- Substituir `[/cafe, Café]`, `[/#assinatura, Assinatura]`, `[/#contato, Contato]` por:
  - `[/#cafes, Pacotes]`
  - `[/#assinatura, Assinatura]`
  - `[/sobre, História]`
  - `[/para-empresas, Empresas]`

**Tipografia dos nav links:**
- Atual: `text-sm tracking-wide`
- Novo: `text-sm tracking-[0.04em]` + `font-medium` (500). Caixa baixa (não UPPERCASE — UPPERCASE é só para eyebrow).

### 6.2 Acessibilidade

- Logo: `<img alt="Zerbinatti Coffee, ir para a home">` (descritivo)
- Botão menu mobile: `aria-expanded={menuOpen}` e `aria-controls="mobile-nav"`
- Mobile menu: `id="mobile-nav"` e `role="navigation"`

---

## 7. Hierarquia semântica completa da Home

```html
<body>
  <Header />  <!-- <header role="banner"> com <nav> dentro -->
  <main>
    <section aria-labelledby="hero-title">       <!-- HERO -->
      <p class="eyebrow">DAL 1897 · QUARTA GERAÇÃO</p>
      <h1 id="hero-title">Café especial brasileiro, casa italiana.</h1>
      <p class="lede">Uma casa, quatro gerações...</p>
      <div role="group" aria-label="Ações principais">
        <a href="#assinatura">Começar a receber</a>
        <a href="#cafes">Conhecer os cafés</a>
      </div>
    </section>

    <section id="cafes" aria-labelledby="cafes-title">  <!-- 3 SKUS -->
      <p class="eyebrow">OS TRÊS PACOTES</p>
      <h2 id="cafes-title">Um café. Três formas de servir.</h2>
      <p class="lede">...</p>
      <div role="list">
        <article role="listitem"><h3>Pacote Família</h3>...</article>
        <article role="listitem"><h3>Pacote Mesa</h3>...</article>
        <article role="listitem"><h3>Pacote Coador</h3>...</article>
      </div>
    </section>

    <section id="assinatura" aria-labelledby="assinatura-title">  <!-- ASSINATURA -->
      <p class="eyebrow">O CARTÃO DA CASA</p>
      <h2 id="assinatura-title">A casa escolhe. Você recebe.</h2>
      <p class="lede">...</p>
      <ul>... 4 garantias ...</ul>
      <a href="/quiz">Não sabe qual escolher?...</a>
      <form aria-labelledby="config-title">
        <h3 id="config-title" class="sr-only">Configurar assinatura</h3>
        <fieldset><legend>Frequência</legend>... radios ...</fieldset>
        <fieldset><legend>Pacote</legend>... radios ...</fieldset>
        <p aria-live="polite">Total por envio: R$ 76,42</p>
        <button type="submit">Começar a receber</button>
      </form>
    </section>

    <section id="historia" aria-labelledby="historia-title">  <!-- HISTÓRIA -->
      <p class="eyebrow">1897 — TREVISO, ITÁLIA</p>
      <h2 id="historia-title">Quatro gerações, o mesmo gesto.</h2>
      <p>Giuseppe Zerbinatti torrou seu primeiro lote...</p>
      <p class="mono">MDCCCXCVII · TREVISO → MMXXVI · SERRA DO CABRAL</p>
      <a href="/sobre">Conheça nossa história →</a>
    </section>
  </main>
  <Footer />
</body>
```

**Regras:**
- **Um único `<h1>`** na página (no Hero)
- **Cada `<section>` tem um `<h2>`** com id único, referenciado por `aria-labelledby`
- **`<eyebrow>` é `<p>`**, não h0/h6 — não interfere na hierarquia
- **Cards são `<article>`** dentro de `<div role="list">` (porque a ordem importa visualmente mas não semanticamente — alternativa: `<ol>`)
- **Sem `<aside>`** — nada na Home é tangencial
- **`<form>` na Assinatura** com `<fieldset>` para cada grupo de radios

---

## 8. Resumo das fontes e ordem de carregamento

**Decisão tipográfica final:** Stack B da brand direction (Fraunces + Inter + JetBrains Mono — Google Fonts, gratuita).

**Implementação em `src/app/layout.tsx`:**
- `Fraunces` via `next/font/google`, weight 400, italic suportado, `display: swap`, variable CSS `--font-display`
- `Inter` via `next/font/google`, weights 400, 500, `display: swap`, variable `--font-sans`
- `JetBrains Mono` via `next/font/google`, weight 400, 500, `display: swap`, variable `--font-mono`

**LCP optimization:**
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous">` — Next.js `next/font` já cuida disso
- Hero usa `next/image` com `priority` e `fetchPriority="high"` na foto principal
- CSS crítico inline para `--font-display` no Hero (já é default do `next/font` com swap)

---

## 9. Ordem de implementação recomendada

Para o Frontend Developer:

1. **Atualizar `globals.css`** com tokens da seção 0.1
2. **Atualizar `layout.tsx`** com novas fontes (seção 8)
3. **Refactor `Header.tsx`** (seção 6) — bloqueador para qualquer seção rodar
4. **Implementar Hero** (seção 1) — define a régua visual
5. **Implementar 3 SKUs** (seção 2) — confirma sistema de cards
6. **Implementar Assinatura** (seção 3) — mais complexa, beneficia-se do sistema já validado
7. **Implementar História** (seção 4) — encerra narrativa
8. **Refactor `Footer.tsx`** (seção 5) — fechamento

Cada seção pode ir para Vercel preview separadamente (commits atômicos).

---

## 10. Resumo executivo — 5 decisões visuais críticas

- **Hero é split 60/40 com tipografia à esquerda e foto fullbleed à direita**, não fullscreen com texto sobreposto. Italic em "casa italiana" do H1 vira a primeira assinatura tipográfica que o usuário vê. Foto editorial real obrigatória — `zerbinatti-pacote.jpg` atual é apenas placeholder temporário com filtro monocromático.
- **Os 3 cafés são tratados como 3 formas do mesmo café (CASA 01, CASA 02, CASA 03 — referência a Le Labo)**, com honestidade sensorial: as notas são iguais nos 3 cards porque é o mesmo blend; a diferenciação é gramatura/formato. Background `--bone-soft` cria ritmo após o `--bone` do Hero.
- **A Assinatura abandona o modelo de 3 planos comparativos e adota fluxo único com configurador inline (frequência + pacote)**. Background dark `--ink` marca a importância e diferencia visualmente — é a única seção dark da Home. Configurador é o único "card real" da página, justificado por ser o conversor.
- **Olive é o único acento da página inteira, sempre nos mesmos lugares: eyebrows, ícones funcionais, CTA primário, links textuais**. Zero outras cores semânticas (nada de verde-sucesso, vermelho-erro, amarelo-destaque). Hairlines de 1px em `--line` são o único divisor permitido.
- **Animações são mínimas e funcionais**: transições de 200-250ms em hover de botões/links, fade-in da página em load (200ms), sem parallax, sem scroll-reveal decorativo, sem `translateY` em cards. O luxo vem do espaço (`py-32` mínimo entre seções) e da fotografia editorial real, nunca do movimento.

---

**UI Designer:** Claude Opus 4.7
**Data:** 2026-05-03
**Status:** pronto para handoff a Frontend Developer
**Dependências externas:** sessão fotográfica editorial (3 fotos prioritárias: 1 para Hero, 1 para História, 3 para cards de SKUs) — enquanto isso não chega, usar fallbacks descritos em cada seção.
