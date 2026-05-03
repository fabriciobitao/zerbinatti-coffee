# UI Spec — Páginas Internas Zerbinatti Coffee

Data: 2026-05-03
Autor: UI Designer (Claude Opus 4.7)
Escopo: especificação visual completa das 5 páginas internas — `/assinatura` (pillar), `/sobre`, `/cafes/[slug]`, `/para-empresas`, `/quiz`.
Consumidor: Frontend Developer que vai implementar em Next.js 16 + Tailwind v4.
Dependências obrigatórias: `BRAND-DIRECTION-2026-05-03.md`, `UI-SPEC-HOME-2026-05-03.md` (fundações §0 são reutilizadas integralmente — tokens, breakpoints, grid, sistema de botões, focus state), `COPY-PAGES-2026-05-03.md` (toda copy já está pronta — referenciar, não reescrever), `UX-ASSINATURA-2026-05-03.md` (5 decisões críticas vinculantes), `SEO-STRATEGY-2026-05-03.md` (H1/H2 e schemas), `A11Y-AUDIT-2026-05-03.md` (não repetir 6 erros críticos identificados).

---

## 0. Fundações herdadas (NÃO redefinir)

Reutilizar integralmente as seções 0.1 a 0.5 da `UI-SPEC-HOME-2026-05-03.md`:

- **Tokens de cor**: `--bone #F4EFE6`, `--bone-soft #EBE3D5`, `--ink #1B1714`, `--ink-soft #3A322C`, `--ink-mute #736961`, `--olive #4A5237`, `--olive-deep #363D26`, `--line #D9D0BE`, `--line-dark #3A322C`.
- **Tokens tipográficos**: `--font-display: Fraunces`, `--font-sans: Inter`, `--font-mono: JetBrains Mono`. Escala completa (`display`, `h1`, `h2`, `h3`, `lede`, `body`, `body-sm`, `caption`, `eyebrow`, `mono`) conforme tabela §4 da BRAND-DIRECTION.
- **Espaçamento**: base 8px, escala `--space-1` (4px) → `--space-12` (256px).
- **Container**: `max-width: 1280px` (default), `880px` (narrow para texto editorial puro).
- **Breakpoints**: Mobile 320–639 / Tablet 640–1023 / Desktop 1024–1439 / Wide 1440+.
- **Botões**: sistema 0.4 da UI-SPEC-HOME — primário olive, secundário ghost claro/escuro, link textual com underline 1px offset 4px, sempre `border-radius: 2px`, transition 250ms, **sem `translateY`**, sem shadow.
- **Focus state**: `:focus-visible` com outline 2px (olive em fundo claro, bone em fundo escuro), offset 3px.
- **Header**: redesign já especificado em UI-SPEC-HOME §6 — fixed, transparente sobre Hero, vira `bg-ink/95` no scroll. Logo dark/white condicional. **Menu mobile precisa do focus trap + Esc obrigatórios** (CRIT-06 do A11Y-AUDIT, ainda não corrigido).
- **Footer**: já refatorado em UI-SPEC-HOME §5.

### 0.6 Token novo introduzido nesta spec — `--ink-mute-on-dark`

Para resolver CRIT-01 e CRIT-02 do A11Y-AUDIT, criar um único token complementar para meta/captions sobre fundos escuros:

```css
:root {
  --ink-mute-on-dark: #A39C92; /* ratio 5.7:1 sobre --ink, 5.0:1 sobre --ink-soft */
}
```

**Regra de uso**: sempre que houver `text-ink-mute` sobre `bg-ink` ou `bg-ink-soft`, trocar por `text-[var(--ink-mute-on-dark)]`. **Eyebrow sobre fundo escuro nunca é olive** — vira `text-bone-soft` (UI-SPEC-HOME §3.4 já documenta essa exceção; reaplicar consistentemente em todas as páginas internas).

### 0.7 Padrão de Hero compartilhado

Todas as páginas internas começam com Hero — não fullscreen como a Home, mas sim **bloco editorial de altura 60vh (mín 520px, máx 720px)** que respeita o Header fixo (padding-top 120px desktop, 100px mobile). Variantes específicas por página detalhadas abaixo.

### 0.8 Padrão de breadcrumb (todas as páginas exceto `/quiz`)

Logo abaixo do Header, antes do Hero:

- Tipografia: `--font-mono` 11px / `tracking 0.18em` UPPERCASE, cor `--ink-mute` (claro) ou `--ink-mute-on-dark` (escuro).
- Padding: `24px 0`.
- Container: respeita gutter da página.
- Separador: ` · ` (ponto-meio com espaços), nunca `>` ou `/`.
- Último item (página atual): `--olive`, sem link.
- Acessibilidade: `<nav aria-label="breadcrumb">` envolvendo `<ol>` com `<li>` por item, schema `BreadcrumbList` JSON-LD.

Exemplo: `INÍCIO · ASSINATURA` — onde "INÍCIO" é link e "ASSINATURA" é olive estático.

### 0.9 Padrão de section spacing

| Tipo | Padding vertical desktop | Padding vertical mobile |
|---|---|---|
| Hero | `py-32` (128px top compensa header) | `py-20` |
| Seção principal | `py-32` | `py-20` |
| Seção crítica (CTA pesado, ex: configurador na `/assinatura`) | `py-40` (160px) | `py-24` |
| Seção compacta (FAQ, breadcrumb) | `py-20` | `py-16` |

**Regra brand direction**: nunca abaixo de `py-20` mobile / `py-32` desktop entre seções. Densidade vende commodity.

---

## 1. Página `/assinatura` (PILLAR — prioridade absoluta)

### 1.1 Decisão arquitetural geral

Página segue as **5 decisões UX críticas** do `UX-ASSINATURA-2026-05-03.md` §10:

1. Configurador no hero (não rodapé), com 4 controles (frequência, café, moagem condicional, total dinâmico).
2. Mensal default + "Casa escolhe" default de café.
3. Cancelamento como selo no hero + caption do CTA + primeira pergunta FAQ aberta.
4. Sticky CTA mobile com total visível.
5. Quiz plugado em 3 pontos sutis.

**Estrutura final de 10 seções** (ordem do `UX-ASSINATURA` §3):

| # | Seção | Background | Função | py |
|---|---|---|---|---|
| 1 | Hero + configurador embutido | `--ink` | Conversor + H1 SEO | py-40 |
| 2 | Strip de garantias (4 selos) | `--bone` | Trust signal pré-objeção | py-16 |
| 3 | Como funciona (4 passos) | `--bone` | Educação | py-32 |
| 4 | O que entra na caixa (5 itens) | `--bone-soft` | Concretude | py-32 |
| 5 | Frescor — torra → entrega 7 dias | `--ink` | Diferencial | py-32 |
| 6 | História 1897 condensada | `--bone` | E-E-A-T | py-32 |
| 7 | Avaliações de assinantes (6+) | `--bone-soft` | Prova social | py-32 |
| 8 | Configurador — 2ª aparição | `--ink` | Recaptura | py-32 |
| 9 | FAQ (8 perguntas, 1ª aberta) | `--bone` | Derruba objeções + SEO | py-32 |
| 10 | CTA final + reasseguramento | `--ink` | Última oportunidade | py-32 |

**Ritmo cromático**: alterna `ink → bone → bone-soft → ink → bone → bone-soft → ink → bone → ink`. Cria respiração visual; impede que página vire "muro escuro" ou "muro claro".

---

### 1.2 SEÇÃO 1 — Hero com configurador embutido

#### Layout — Desktop (≥1024px)

Split 50/50 (não 60/40 como Home — aqui o configurador precisa de espaço igual ao texto). Background `--ink`.

```
┌────────────────────────────────────────────────────────────────┐
│  Header transparente sobre ink (logo branca)                   │
├────────────────────────────────────────────────────────────────┤
│  breadcrumb mono (--ink-mute-on-dark)                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  [coluna esq 50%]                  │  [coluna dir 50%]         │
│                                    │                           │
│  eyebrow olive                     │  ┌─── CONFIGURADOR ────┐  │
│  ASSINATURA · DAL 1897             │  │                     │  │
│                                    │  │  FREQUÊNCIA         │  │
│  H1 (display, italic seletivo)     │  │  [Quinzenal][●Mensal]│ │
│  "Café especial torrado            │  │                     │  │
│   na semana, em casa."             │  │  CAFÉ               │  │
│  (italic em "torrado na semana")   │  │  [● Casa escolhe]   │  │
│                                    │  │  [○ Pacote Família] │  │
│  Lede                              │  │  [○ Pacote Mesa]    │  │
│  "Quinzenal ou mensal. Pause       │  │  [○ Pacote Coador]  │  │
│   quando quiser. Frete grátis.     │  │                     │  │
│   Cancele em 1 clique."            │  │  MOAGEM (condic.)   │  │
│                                    │  │  [○Coador ●V60 ○...]│  │
│  ─── 4 garantias hairline ───      │  │                     │  │
│  • Torra fresca, datada            │  │  ─── timeline ───   │  │
│  • Pause/cancele em 1 clique       │  │  □─────□─────□      │  │
│  • Frete grátis em todo o Brasil   │  │  Hoje  +7d   +37d   │  │
│  • 1º envio com 15% off            │  │                     │  │
│                                    │  │  ─── divisor 1px ─  │  │
│  link sutil (quiz, abaixo)         │  │  Total por envio    │  │
│  "Não sei o que escolher.          │  │  R$ 76,42           │  │
│   Faça o teste em 30s →"           │  │  Equivale a R$X/kg  │  │
│                                    │  │  Economia anual: R$Y│  │
│                                    │  │                     │  │
│                                    │  │  [COMEÇAR A RECEBER]│  │
│                                    │  │  caption legal      │  │
│                                    │  └─────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Medidas exatas (desktop ≥1280px):**
- Background: `--ink`
- Padding: `py-40` (160px) vertical, gutter 64px lateral (já no container 1280px)
- Grid: 2 colunas 50/50, gap 80px
- Coluna esquerda: alinhamento `justify-content: center` vertical, `align-items: start`
- Coluna direita (configurador é card real — única caixa visualmente delimitada da página, justificado por ser o conversor):
  - Background card: `--ink-soft`
  - Borda: 1px `--ink-mute` opacity 0.4
  - Padding interno: 48px
  - Border-radius: 2px
  - Largura: 100% da coluna (não fixa — esticar)

**Espaçamentos verticais coluna esquerda:**
- breadcrumb → eyebrow: 24px
- eyebrow → H1: 32px
- H1 → lede: 32px
- lede → garantias: 48px
- entre items garantia: 16px
- garantias → link quiz: 32px

**Espaçamentos verticais configurador (interno):**
- eyebrow seção (FREQUÊNCIA, CAFÉ, MOAGEM) → controle: 16px
- entre grupos: 32px
- último controle → divisor 1px → linha total: 32px
- linha total label → valor: 8px
- valor → economia: 12px
- economia → CTA: 32px
- CTA → caption: 16px

#### Layout — Tablet (640–1023px)

- Mantém split 50/50 mas reduz gap para 48px
- Padding configurador: 32px interno
- Cards de café e moagem: mantêm stack vertical (sem 3 horizontais — não cabe)

#### Layout — Mobile (320–767px)

Stack vertical seguindo wireframe do `UX-ASSINATURA` §8:

- breadcrumb → eyebrow → H1 → lede → garantias (stack) → link quiz → CONFIGURADOR (full-width com padding lateral 20px externo, 16px interno)
- Toggle frequência: mantém 2 colunas (par natural, cabe)
- Cards café: stack vertical, **altura 56px** cada (touch target ≥44px + ar)
- Cards moagem: stack vertical (não 2x2 — espremido em 375px)
- Timeline: horizontal compactada, 3 dots, rótulos curtos (`+7d`, `+37d`)
- Bloco total: stack vertical (label sobre valor) para legibilidade do número grande
- CTA: full-width do card, **altura 56px** (vs 48px desktop)

#### Tipografia

| Elemento | Token | Cor |
|---|---|---|
| Breadcrumb | mono 11px / `0.18em` UPPERCASE | `--ink-mute-on-dark` |
| Eyebrow hero | eyebrow (sans 11px / 500 / `0.28em` UPPERCASE) | `--olive` |
| H1 | display (`clamp(2.5rem, 5.5vw, 4.5rem)`, weight 400, italic em "torrado na semana") | `--bone` |
| Lede | lede (`clamp(1.125rem, 1.6vw, 1.375rem)` italic) | `--bone-soft` |
| Lista garantias | sans 15px / 1.6 | `--bone-soft` |
| Link quiz | sans 14px / 500 com underline 1px offset 4px | `--bone` (hover `--olive`) |
| Eyebrow seções configurador (FREQUÊNCIA, etc) | mono 11px / 500 / `0.18em` UPPERCASE | `--bone-soft` (NÃO usar `--ink-mute` sobre `--ink-soft` — A11Y CRIT-02) |
| Toggle freq labels | sans 14px / 500 / `0.04em` | inativo: `--bone-soft` / ativo: `--ink` |
| Cards café/moagem labels | sans 13px / 400 (nome) + mono 12px (preço/info) | inativo: `--bone-soft` / ativo: `--ink` |
| Timeline labels | mono 11px / `0.05em` | `--ink-mute-on-dark` |
| Total label | sans 14px / 400 | `--bone-soft` |
| Total valor | display 36px / 400 | `--bone` |
| Sub-total (R$/kg) | mono 12px / 400 | `--ink-mute-on-dark` |
| Linha economia | mono 12px / 400 | `--olive` (sutil — sinaliza "ganho" sem virar verde-sucesso) |
| CTA | sans 14px / 500 / `0.06em` UPPERCASE | `--bone` sobre `--olive` |
| Caption legal | sans 12px / 1.5 | `--ink-mute-on-dark` |

#### Cores específicas

- Background seção: `--ink #1B1714`
- Background configurador: `--ink-soft #3A322C`
- Borda configurador: 1px `--ink-mute #736961` opacity 0.4
- Toggle/cards inativos: bg `transparent`, border 1px `--ink-mute`
- Toggle/cards ativos: bg `--bone`, border `--bone`, text `--ink`
- Toggle/cards hover (mouse): border vira `--bone-soft`, sem outras alterações
- CTA: bg `--olive`, text `--bone`. Hover: bg `--olive-deep`. **Sem shadow, sem translateY.**
- Divisores internos: 1px `--ink-mute` opacity 0.3
- Acento único da seção: `--olive` (eyebrow, ícones de garantia, CTA, linha de economia)

#### Ícones das 4 garantias

SVGs hairline 1px stroke, 18×18px, cor `--olive`. **Não usar lucide-react ou heroicons.** Desenhar 4 ícones próprios (regra global FABIO — "NUNCA recriar ícones manualmente"... aqui é exceção: não vem do Figma, vem da brand direction. Desenhar como assets em `src/assets/icons/`):

1. Torra fresca → chama estilizada minimalista (3 linhas curvas)
2. Pause/cancele → símbolo `||` com 2 retângulos verticais
3. Frete grátis → caixa com seta saindo
4. Desconto 15% → símbolo `%` com peso editorial

#### Microinterações (banidas decorações; só funcionais)

- **Toggle frequência**: clique muda estado em 200ms (background-color + color). **Total/envio recalcula com fade-out 100ms → texto novo → fade-in 150ms**. Sem rolagem de números (kitsch).
- **Cards café/moagem**: clique muda estado em 200ms. Outros cards sem alteração visual além do hover de borda.
- **Moagem condicional**: aparece com fade-in 200ms quando "Pacote Coador" (250g moído) é selecionado; desaparece com fade-out 200ms ao trocar.
- **CTA hover**: bg `--olive` → `--olive-deep`, 250ms.
- **Link quiz hover**: underline cresce 1px → 1.5px, cor `--bone` → `--olive`, 200ms.
- **Timeline**: estática (não anima ao mudar frequência — apenas atualiza rótulos).

#### Sticky CTA mobile (decisão crítica do UX-ASSINATURA §8)

Quando o usuário rolar para baixo do configurador, o CTA "Começar a receber" vira sticky no rodapé:

- Visível apenas em mobile (≤767px).
- Aparece após scroll passar do final do configurador (`IntersectionObserver`).
- Desaparece quando o configurador #8 (2ª aparição) entra no viewport.
- Layout: bg `--ink-soft` opacity 0.95 + `backdrop-filter: blur(12px)`, padding 16px 20px, hairline `--line-dark` no topo.
- Conteúdo: `R$ XX,XX` (display 18px, `--bone`) à esquerda + botão `COMEÇAR A RECEBER` (compacto, padding 12px 20px, full largura à direita).
- Acessibilidade: `<div role="region" aria-label="CTA persistente da assinatura">`. `aria-live="polite"` no valor para refletir mudanças de configuração.

#### Acessibilidade — não repetir os 6 erros críticos

| A11Y issue | Aplicação aqui |
|---|---|
| CRIT-01 (eyebrow olive sobre ink) | **NÃO usar olive em eyebrows internos do configurador**. Eyebrow do hero (`ASSINATURA · DAL 1897`) é olive porque sobre `--ink` ratio é 4.6:1 (passa AA texto pequeno). Eyebrows dentro do configurador (sobre `--ink-soft`) usam `--bone-soft` (7.5:1 AAA). |
| CRIT-02 (sub-preço/caption ilegível) | Usar `--ink-mute-on-dark` (#A39C92) em todo texto meta/caption sobre `--ink` ou `--ink-soft`. |
| CRIT-05 (sem skip link) | Skip link já adicionado no `layout.tsx` — `id="main"` no `<main>` desta página. |
| CRIT-06 (mobile menu sem trap) | Já corrigido no Header. |
| HIGH-02 (radio cards não respondem a Setas) | Cards de café e moagem usam padrão WAI-ARIA radio group — Tab entra no grupo, Setas mudam seleção, Espaço confirma. Implementar com `tabindex` dinâmico. |
| HIGH-03 (NewsletterForm fail silent) | Não há newsletter aqui; FAQ form de Stripe vai ter validação real (HIGH-03 já corrigido em outro lugar). |

Hierarquia semântica:
```html
<section aria-labelledby="hero-assinatura-title">
  <p class="eyebrow">ASSINATURA · DAL 1897</p>
  <h1 id="hero-assinatura-title">Café especial torrado na semana, em casa.</h1>
  <p class="lede">...</p>
  <ul role="list">... 4 garantias ...</ul>
  <a href="/quiz">Não sei o que escolher...</a>
  <form aria-labelledby="config-title">
    <h2 id="config-title" class="sr-only">Configurar assinatura</h2>
    <fieldset>
      <legend>Frequência</legend>
      <!-- 2 radios -->
    </fieldset>
    <fieldset>
      <legend>Café</legend>
      <!-- 4 radios -->
    </fieldset>
    <fieldset id="moagem-group" hidden>
      <legend>Moagem</legend>
      <!-- 4 radios condicionais -->
    </fieldset>
    <div role="region" aria-live="polite" aria-atomic="true">
      <p>Total por envio: <strong>R$ 76,42</strong></p>
    </div>
    <button type="submit" aria-describedby="config-caption">COMEÇAR A RECEBER</button>
    <p id="config-caption">Cobrança via Stripe. Cancele pelo portal sem ligar.</p>
  </form>
</section>
```

---

### 1.3 SEÇÃO 2 — Strip de garantias (4 selos hairline)

Background `--bone`. Padding `py-16` (64px). Container 1280px.

Layout: **4 colunas iguais em desktop**, 2x2 em tablet, stack vertical em mobile.

Cada selo:
- Ícone hairline 24×24px à esquerda, cor `--olive`
- Título mono 11px / 500 / `0.18em` UPPERCASE, cor `--olive`
- Subtítulo sans 13px / 1.4, cor `--ink-soft`

Conteúdo (extrair de COPY-PAGES §1.3 e UX-ASSINATURA §7 Tier 1):

| Ícone | Título | Subtítulo |
|---|---|---|
| pause | `CANCELE EM 1 CLIQUE` | `Pelo portal Stripe — sem ligar, sem perguntas` |
| frete | `FRETE GRÁTIS` | `Em todo o Brasil, sempre` |
| chama | `TORRA FRESCA, DATADA` | `Da torrefação à sua porta em até 7 dias` |
| % | `1º ENVIO COM 15% OFF` | `Aplicado automaticamente no checkout` |

Divisor 1px `--line` à esquerda de cada selo (exceto o primeiro) em desktop. Em mobile, hairline horizontal 1px abaixo de cada item (exceto o último).

---

### 1.4 SEÇÃO 3 — Como funciona (4 passos)

Background `--bone`. Padding `py-32`. Container 1280px.

Estrutura:
- Header centralizado max-width 720px: eyebrow → H2 → lede → hairline 80px (idêntico ao header do "3 SKUs" da Home — UI-SPEC-HOME §2.2)
- Grid 4 colunas iguais, gap 32px (desktop), 24px (tablet), stack mobile
- Cada passo:
  - Numeração `01` em mono 14px / 500, cor `--olive`, com hairline 1px `--line` 40px à direita (linha decorativa que conecta visualmente os 4 passos em desktop — não em mobile)
  - Título h3 sans 16px / 500, cor `--ink`
  - Texto body 15px / 1.6, cor `--ink-soft`

Conteúdo de COPY-PAGES §1.3:

| # | Título | Texto |
|---|---|---|
| 01 | `Você escolhe o ritmo` | `Quinzenal ou mensal. Pacote em grãos ou moído, 250g ou 500g. Defina uma vez — ajuste quando quiser.` |
| 02 | `A casa torra na semana` | `Cada lote sai da torrefação no início da semana do envio. Nada parado em prateleira. Nada esperando.` |
| 03 | `Sai em até 48 horas` | `Embalagem com válvula desgaseificadora, etiqueta com lote e data de torra. Frete grátis para todo o Brasil.` |
| 04 | `Você bebe fresco` | `A xícara que sai em casa é a mesma que sai aqui. É esse o ponto — e o único ponto.` |

---

### 1.5 SEÇÃO 4 — O que entra na caixa (5 itens)

Background `--bone-soft`. Padding `py-32`. Container 1280px.

Layout: split 40/60 desktop — foto editorial à esquerda 40% (pacote desembalado com cartão de torra, postal e etiqueta visíveis sobre mesa), lista à direita 60%.

**Foto:** vertical 4:5, fullbleed à esquerda do viewport (encosta na borda esquerda, não no container). Tratamento: luz natural, paleta consistente com bone. **Fallback até foto real chegar:** bloco `--bone` com monograma Z em `--olive` centralizado.

**Lista (5 itens):**
- Header da seção: eyebrow → H2 → lede (max-width 480px, alinhado à esquerda, **não centralizado** — equilibra a foto à esquerda)
- Cada item: 
  - Hairline 1px `--line` no topo (1º item) e entre items
  - Título sans 16px / 500, cor `--ink`
  - Texto body 15px / 1.6, cor `--ink-soft`
  - Padding vertical 24px

Conteúdo de COPY-PAGES §1.5: `O café da safra` / `Etiqueta do lote` / `Cartão de preparo` / `Notas da safra` / `Embalagem com válvula`.

Mobile: foto em cima (16:9 full-width), lista embaixo, mesma estrutura.

---

### 1.6 SEÇÃO 5 — Frescor (torra → entrega 7 dias)

Background `--ink`. Padding `py-32`.

Layout: bloco editorial centralizado, max-width `--container-narrow` (880px). Esta seção é puramente tipográfica — sem foto, sem ornamento.

Estrutura vertical:
- Eyebrow centralizado: `TORRA → ENTREGA EM ATÉ 7 DIAS` em olive
- H2 centralizado: `Café especial é, *antes de tudo*, café fresco.` (italic em "antes de tudo"), display, cor `--bone`
- Parágrafo único centralizado, max-width 680px, body 17px / 1.7, cor `--bone-soft`
- Hairline 1px 80px `--line-dark`
- Linha mono centralizada: `LOTE NA ETIQUETA · DATA DA TORRA NA ETIQUETA · NADA ESCONDIDO` em `--ink-mute-on-dark`

Espaçamentos: 32px entre cada elemento, 64px entre parágrafo e hairline.

---

### 1.7 SEÇÃO 6 — História 1897 condensada

Background `--bone`. Padding `py-32`.

Layout idêntico ao bloco "História 1897" da Home (UI-SPEC-HOME §4.2): 40/60 split, foto fullbleed à esquerda, texto à direita.

Texto curto (~60 palavras, mais condensado que na `/sobre`):

- Eyebrow: `1897 — TREVISO, ITÁLIA`
- H2: `Quatro gerações, *o mesmo gesto*.` (italic em "o mesmo gesto")
- Parágrafo (~60 palavras): `Giuseppe Zerbinatti torrou seu primeiro lote em 1897, em Treviso. Quatro gerações depois, mudamos de continente, de máquinas e de fazenda — mas o gesto continua o mesmo: torrar pouco, torrar fresco, torrar para alguém que vai beber em casa, não em uma prateleira de supermercado.`
- CTA: `Conheça nossa história →` (link `/sobre`)

---

### 1.8 SEÇÃO 7 — Avaliações de assinantes (6+)

Background `--bone-soft`. Padding `py-32`. Container 1280px.

Estrutura:
- Header centralizado: eyebrow `O QUE DIZEM` (italic em "DIZEM" via marcação especial — UPPERCASE com italic é sutil mas funciona em Fraunces) → H2 → lede (max-width 560px)
- Hairline 80px `--line`
- Grid de reviews: 3 colunas desktop, 2 tablet, 1 mobile. Gap 32px desktop / 24px mobile.
- Mostrar 6 reviews (extrair de `products.ts` — usar Marina Costa, Rodrigo Alves, Pedro Henrique Serra, Camila Okada, Gustavo Nakamura, Beatriz Lemos)
- Botão "Ver mais avaliações" abaixo do grid (centralizado) se houver mais de 6 — opcional, default oculto

Cada card de review:
- Background `--bone`, borda 1px `--line`, padding 32px, border-radius 2px
- Aspas decorativas grandes no topo (Fraunces 64px, weight 400, cor `--olive` opacity 0.3)
- Texto da review: body 15px / 1.6, cor `--ink-soft`, italic
- Divisor 1px `--line` 24px abaixo
- Bloco autor:
  - Nome: sans 14px / 500, cor `--ink`
  - Cidade + método: mono 11px / `0.05em`, cor `--ink-mute` (sobre `--bone` passa AA — 4.8:1)
- Estrelas: 5 ícones SVG 14×14px, cor `--olive` (preenchidas) ou `--line` (vazias)

Schema.org: cada card é `<article>` com microdata `Review` ou parte do `aggregateRating` no JSON-LD da página.

---

### 1.9 SEÇÃO 8 — Configurador (2ª aparição)

**Idêntico à seção 1 em comportamento, com 3 mudanças visuais:**

Background `--ink`. Padding `py-32` (não py-40 — segunda aparição é mais leve).

Layout: split invertido — **configurador à esquerda 50%, texto editorial à direita 50%**. Variação visual evita parecer cópia.

Texto à direita (em vez do mesmo H1 do hero):
- Eyebrow: `JÁ INVESTIGOU? COMECE AGORA`
- H2: `Tudo no lugar. Falta *o primeiro envio*.` (italic em "o primeiro envio")
- Parágrafo curto (~50 palavras): `Você leu o que entra na caixa, viu como funciona o frescor, conheceu nossa história e o que dizem assinantes. O configurador ao lado é o mesmo do topo — escolha frequência e pacote, e o pacote sai na próxima janela de torra.`
- Lista de 3 reasseguramentos com hairlines (não os 4 de cima — versão condensada): `Frete grátis · Cancele em 1 clique · 1º envio com 15% off`

CTA do configurador muda microcopy: `QUERO COMEÇAR — FRETE GRÁTIS` (reforça benefício na 2ª apresentação, conforme UX-ASSINATURA §6).

---

### 1.10 SEÇÃO 9 — FAQ (8 perguntas, 1ª aberta)

Background `--bone`. Padding `py-32`. Container `--container-narrow` (880px).

Estrutura:
- Header alinhado à esquerda (não centralizado — FAQ é editorial, não promocional)
- Eyebrow → H2 (alinhado à esquerda, max-width 100%)
- Hairline 1px `--line` 100% width abaixo do header
- Lista de 8 accordions

Cada accordion:
- Padding vertical 24px
- Hairline 1px `--line` na base de cada item
- Header (botão clicável):
  - Pergunta: sans 17px / 500, cor `--ink`
  - Ícone +/− à direita: SVG 16×16px, cor `--olive`, gira 45° em transição 200ms quando aberto
  - Cursor pointer, hover muda cor da pergunta para `--olive`
- Body (resposta — mostrado apenas quando aberto):
  - Padding-top 16px
  - Texto body 15px / 1.7, cor `--ink-soft`, max-width 680px

**Primeira pergunta aberta por default**: `1. Posso pausar ou cancelar quando quiser?` (decisão crítica UX-ASSINATURA §3, §5 — combate cicatriz de cancelamento difícil do mercado BR).

8 perguntas e respostas: usar copy literal de COPY-PAGES §1.7.

Acessibilidade:
- Cada accordion: `<button aria-expanded={open} aria-controls={`faq-${i}`}>` + `<div id={`faq-${i}`} role="region">`.
- Schema.org: injetar `FAQPageSchema` JSON-LD com todas as 8 Q&A no `<head>` da página.

---

### 1.11 SEÇÃO 10 — CTA final + reasseguramento

Background `--ink`. Padding `py-32`. Container `--container-narrow`.

Layout: bloco editorial centralizado, vertical.

Estrutura:
- Eyebrow centralizado: `O CARTÃO DA CASA` em `--bone-soft` (não olive — já foi usado várias vezes; varia para evitar repetição visual)
- H2 centralizado: `Comece pelo *primeiro envio*.` (italic em "primeiro"), display, cor `--bone`
- Parágrafo centralizado max-width 580px, body 17px / 1.7, cor `--bone-soft`
- Bloco de CTAs centralizado horizontalmente:
  - CTA primário grande: `COMEÇAR A RECEBER` (padding 18px 40px — maior que o padrão para fechar página com peso)
  - Link secundário abaixo: `Tenho dúvidas, prefiro falar com a casa →` (vai para WhatsApp)
- Linha mono centralizada: `PRIMEIRO ENVIO COM 15% · FRETE GRÁTIS · SEM FIDELIDADE` em `--olive`

Espaçamentos: 32px entre eyebrow/H2/parágrafo, 48px entre parágrafo e CTA, 24px entre CTA e link, 48px entre link e linha mono.

---

### 1.12 SEO da página `/assinatura`

Conforme SEO-STRATEGY §3:
- **Title**: `Assinatura de Café Especial — Quinzenal ou Mensal | Zerbinatti`
- **Meta description**: copiar de COPY-PAGES §1.1
- **H1 único**: na seção 1 (hero)
- **H2s ordenados**: Como funciona / Dois ritmos. Três pacotes / Pouca coisa, tudo necessário / Café especial é, antes de tudo, café fresco / Quatro gerações, o mesmo gesto / Mesa de quem já recebe / Tudo no lugar. Falta o primeiro envio / O que perguntam antes de assinar / Comece pelo primeiro envio
- **Schemas obrigatórios**: `subscriptionOfferSchema` (Product + Offer com priceSpecification recorrente), `FAQPageSchema` (8 perguntas), `BreadcrumbList`, `Review` (no card individual ou aggregateRating)

---

## 2. Página `/sobre` (E-E-A-T crítico)

### 2.1 Decisão arquitetural — long-read editorial

Layout estilo "long read" inspirado em Aesop e Officine Universelle Buly (BRAND-DIRECTION §7). Cronologia 1897 → hoje em **4 blocos cronológicos**, com **timeline lateral fixa em desktop** (sticky sidebar à esquerda) que serve como índice navegável e mostra a posição do leitor na história.

**Decisão sobre a timeline:**
- **Desktop (≥1024px)**: timeline lateral fixa à esquerda (sticky, 240px width), com 4 marcos clicáveis. Conteúdo editorial à direita (max-width `--container-narrow` 880px, mas considerando a sidebar, total efetivo do conteúdo é 600-680px — ideal para leitura editorial).
- **Tablet/Mobile**: timeline some, vira breadcrumb mono no topo de cada bloco (`I · A PRIMEIRA TORRA`).

### 2.2 Layout — Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│  Header (transparente sobre bone — logo dark)                   │
├─────────────────────────────────────────────────────────────────┤
│  breadcrumb: INÍCIO · NOSSA HISTÓRIA                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO (full-width, bg bone)                                     │
│  eyebrow                                                        │
│  H1 (display, italic seletivo)                                  │
│  Lede                                                           │
│  Linha mono                                                     │
│                                                                 │
│  ─── (hairline 80px centrado) ───                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [TIMELINE STICKY] [CONTEÚDO EDITORIAL]                         │
│  240px width       max 680px width                              │
│                                                                 │
│  ●  1897           [BLOCO 1]                                    │
│  │  Treviso        eyebrow → H2 → foto sépia → parágrafo        │
│  │                                                              │
│  ○  1923                                                        │
│  │  Travessia      [BLOCO 2]                                    │
│  │                 eyebrow → H2 → foto sépia → parágrafo        │
│  ○  1983                                                        │
│  │  Serra do                                                    │
│  │  Cabral         [BLOCO 3]                                    │
│  │                 eyebrow → H2 → foto sépia → parágrafo        │
│  ○  2026                                                        │
│     Hoje                                                        │
│                    [BLOCO 4]                                    │
│                    eyebrow → H2 → foto contemporânea → parágrafo│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRINCÍPIOS DA CASA (full-width, bg bone-soft)                  │
│  4 blocos curtos, hairlines entre eles                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CTA FINAL (full-width, bg ink)                                 │
│  H2 → parágrafo → CTA primário + link "Conheça a fazenda"       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Hero (full-width)

Background `--bone`. Padding `py-32` desktop / `py-20` mobile. Container 1280px.

Layout: bloco editorial centralizado, max-width 720px.

- Eyebrow centralizado: `1897 — TREVISO, ITÁLIA` em olive
- H1 centralizado: `Quatro gerações, *o mesmo gesto*.` (italic em "gerações"), display
- Lede centralizado max-width 580px, lede italic
- Hairline 1px 80px `--line`
- Linha mono centralizada: `MDCCCXCVII · TREVISO → MMXXVI · SERRA DO CABRAL`

Espaçamentos: 32px entre cada elemento.

### 2.4 Timeline lateral (desktop only)

Posição: sticky `top-32` (compensar header), à esquerda do container, ocupa 240px.

Estrutura visual:
- Linha vertical 1px `--line` 100% altura (desce conectando os 4 marcos)
- 4 marcos verticais com:
  - Bullet 12×12px (preenchido `--olive` se ativo, vazio `--line` se inativo, transição 200ms)
  - Ano: mono 14px / 500 / `0.05em`, cor `--ink` (ativo) ou `--ink-mute` (inativo)
  - Nome: sans 13px / 400, cor `--ink-soft` (ativo) ou `--ink-mute` (inativo)
  - Cada marco é `<a>` que faz scroll suave até o bloco correspondente
- Estado ativo: detectado por `IntersectionObserver` quando o bloco correspondente está no viewport

Os 4 marcos:
1. `1897 · Treviso`
2. `1923 · Travessia`
3. `1983 · Serra do Cabral`
4. `2026 · Hoje`

Acessibilidade: `<nav aria-label="Linha do tempo da história Zerbinatti">` envolvendo `<ol>` com `<li>` por marco. Marcos têm `aria-current="true"` quando ativos.

### 2.5 Os 4 blocos cronológicos

Estrutura comum de cada bloco (extrair copy literal de COPY-PAGES §2.3 a §2.6):

Container: max-width 680px, alinhado à esquerda dentro da coluna de conteúdo.

Espaçamento entre blocos: `py-24` (96px) vertical. Hairline 1px `--line` opcional entre blocos para reforço visual.

Estrutura vertical de cada bloco:
- Eyebrow (`I · A PRIMEIRA TORRA` etc): mono 12px / 500 / `0.18em` UPPERCASE, cor `--olive`
- H2: display `clamp(2rem, 4vw, 3rem)`, weight 400, italic seletivo conforme COPY-PAGES, cor `--ink`
- Foto: 4:5 vertical, full-width do conteúdo (680px). Tratamento sépia/preto-branco para blocos 1-3 (`filter: sepia(0.4) contrast(0.95)` — sutil, não Instagram). Bloco 4 (2026/hoje) é foto contemporânea sem filtro.
- Caption da foto: caption 13px italic, cor `--ink-mute`, padding-top 12px (texto descritivo + ano)
- Parágrafo body 17px / 1.7, cor `--ink-soft`, max-width 100%

Espaçamentos internos: 24px entre eyebrow/H2, 48px entre H2/foto, 12px entre foto/caption, 32px entre caption/parágrafo.

**Recomendação fotográfica (BRAND-DIRECTION veta stock — fallback sépia ok):**
- Bloco 1 (1897): macro do caderno italiano antigo aberto OU foto da moedeira de bronze. Se nada disponível: bloco `--bone-soft` com numeral romano `MDCCCXCVII` em display 96px `--olive`.
- Bloco 2 (1923): porto, navio, mala antiga OU foto de Antonio (se houver retrato). Fallback: bloco com `MCMXXIII`.
- Bloco 3 (1983): paisagem da Serra do Cabral em horário dourado. Fallback: bloco com `MCMLXXXIII`.
- Bloco 4 (2026): foto contemporânea da torrefação — barista atual, mãos no tambor, fotografia editorial real. Fallback: bloco `--bone-soft` com monograma Z `--olive`.

### 2.6 Bloco "Princípios da casa"

Background `--bone-soft`. Padding `py-32`. Container 1280px.

Estrutura:
- Header centralizado: eyebrow `O QUE NÃO MUDA` → H2 `Quatro princípios, *um por geração*` → hairline 80px
- Lista de 4 blocos em **grid 2x2 desktop**, stack vertical mobile
- Cada bloco:
  - Numeração `01 ·` em mono 14px / 500, cor `--olive`
  - Título inline ao lado da numeração (mesma linha): sans 16px / 500, cor `--ink`
  - Texto body 15px / 1.6, cor `--ink-soft`, padding-left 32px (alinhado abaixo do título)
- Hairline 1px `--line` entre blocos: na vertical entre col 1 e col 2, na horizontal entre row 1 e row 2 (cria grid editorial)

Conteúdo de COPY-PAGES §2.7.

### 2.7 CTA final

Background `--ink`. Padding `py-32`. Container `--container-narrow`.

Estrutura centrada:
- Eyebrow: `O CARTÃO DA CASA` em `--bone-soft`
- H2: `Hoje a casa torra *para a sua mesa*` (italic em "torra"), display, cor `--bone`
- Parágrafo curto centralizado max-width 580px, body 17px / 1.7, cor `--bone-soft`
- Bloco CTAs centralizado:
  - CTA primário: `COMEÇAR A RECEBER` (link `/assinatura`)
  - Link secundário: `Conheça a Serra do Cabral →` (link `/fazenda`, **discreto** conforme briefing)

Espaçamentos: 32px entre elementos, 48px entre parágrafo e CTAs, 24px entre CTA e link.

### 2.8 Variantes mobile

| Mudança |
|---|
| Timeline lateral some — vira breadcrumb mono no topo de cada bloco (`I · A PRIMEIRA TORRA`) |
| Foto: aspect 4:5 vertical mantida, mas full-width 100% do viewport (com padding 20px lateral) |
| H2 dos blocos: clamp reduz para 28px mínimo, cabe em 2-3 linhas |
| Parágrafo: font-size 16px (1px abaixo do desktop), line-height 1.7 mantida |
| Princípios: stack 1 coluna, sem hairline horizontal entre blocos (apenas vertical entre items via padding) |

### 2.9 Acessibilidade

- Skip link aplicável; `id="main"` no `<main>`
- Hierarquia: `<h1>` único no hero; cada bloco cronológico é `<section aria-labelledby="bloco-N-title">` com `<h2 id="bloco-N-title">`; princípios é `<section aria-labelledby="principios-title">` com `<h2 id="principios-title">` e os 4 blocos como `<article>` (ou `<dl>` / `<dt>` / `<dd>` se quisermos semântica de lista de definições — preferir `<article>` por consistência)
- Imagens: `alt` específico e honesto ("Detalhe da moedeira de bronze italiana usada por Giuseppe Zerbinatti em 1897, ainda em uso na torrefação"); fallback decorativo: `alt=""` + `role="presentation"`
- Trechos italianos: `<span lang="it">Famiglia Zerbinatti</span>`, `<span lang="la">MDCCCXCVII</span>` (MED-04 do A11Y-AUDIT)
- Contraste AAA em todo body (`--ink-soft` sobre `--bone` = 10.8:1; `--ink-mute` sobre `--bone-soft` = 4.07:1 — **NÃO usar** captions sobre `--bone-soft`; usar `--ink-soft` ou subir para `--ink`)

### 2.10 SEO

- **Title**: `Nossa História — Famiglia Zerbinatti, Quatro Gerações desde 1897`
- **Meta description**: COPY-PAGES §2.1
- **H1**: `Quatro gerações, o mesmo gesto.` (no hero)
- **H2s**: `Treviso, 1897. Giuseppe abre uma casa` / `Em 1923, a casa atravessa o Atlântico` / `Anos 1980. A terceira geração escolhe a fonte` / `2026. A quarta geração torra a próxima safra` / `Quatro princípios, um por geração` / `Hoje a casa torra para a sua mesa`
- **Schema**: `Organization` (já existe), `BreadcrumbList`, opcionalmente `Article` (Person como `author` reforça E-E-A-T)

---

## 3. Página `/cafes/[slug]` (PDP)

### 3.1 Decisão arquitetural

PDP editorial premium, **não template e-commerce**. Inspiração direta: Aesop product page (foto grande à esquerda, texto editorial à direita, sem carrossel de "produtos relacionados" no meio do scroll).

Estrutura de 7 blocos verticais:

| # | Bloco | Background | py |
|---|---|---|---|
| 1 | Hero PDP (foto + ficha + CTAs) | `--bone` | py-32 |
| 2 | Origem e terroir | `--bone-soft` | py-32 |
| 3 | Perfil sensorial (radar/barras) | `--bone` | py-32 |
| 4 | Como preparar (3 cards de receita) | `--bone-soft` | py-32 |
| 5 | Frescor (badge torra fresca) | `--ink` | py-32 |
| 6 | Reviews (3 reviews mock) | `--bone` | py-32 |
| 7 | Cafés relacionados | `--bone-soft` | py-24 |

### 3.2 SEÇÃO 1 — Hero PDP

Background `--bone`. Padding `py-32`. Container 1280px.

Layout split 50/50 desktop:

```
┌────────────────────────────────────────────────────────────────┐
│  breadcrumb: INÍCIO · CAFÉS · CASA 01 — PACOTE FAMÍLIA         │
├────────────────────────────────────────────────────────────────┤
│  [50% width]                       │  [50% width]              │
│                                    │                           │
│  [foto grande do pacote            │  eyebrow                  │
│   vertical 4:5, fullbleed          │  CASA 01 · BOURBON +      │
│   à esquerda]                      │  CATUAÍ                   │
│                                    │                           │
│                                    │  H1 (display)             │
│                                    │  "Pacote Família,         │
│                                    │   Serra do Cabral."       │
│                                    │                           │
│                                    │  Lede (1 frase)           │
│                                    │                           │
│                                    │  ─── ficha mono ─────     │
│                                    │  LOTE 2026/03 · SAFRA     │
│                                    │  2025 · TORRA 10/04       │
│                                    │  SCORE SCA 85             │
│                                    │                           │
│                                    │  ─── selo torra fresca ─  │
│                                    │  ●  Torrado há 23 dias    │
│                                    │     (badge olive prom.)   │
│                                    │                           │
│                                    │  ─── preço ──────         │
│                                    │  R$ 89,90                 │
│                                    │  R$ 179,80/kg             │
│                                    │                           │
│                                    │  [COMPRAR AVULSO]         │
│                                    │  [ASSINAR ESTE CAFÉ →]    │
│                                    │                           │
│                                    │  selo: frete grátis +     │
│                                    │  torra na semana          │
└────────────────────────────────────────────────────────────────┘
```

**Medidas:**
- Coluna esquerda: foto 4:5 vertical, fullbleed à esquerda do viewport
- Coluna direita: padding `0 64px 0 80px`, alinhamento vertical center
- Espaçamentos verticais coluna direita:
  - eyebrow → H1: 24px
  - H1 → lede: 24px
  - lede → ficha mono: 32px
  - ficha → selo torra fresca: 24px
  - selo → preço: 32px
  - preço → CTAs: 32px
  - entre CTAs: 12px
  - CTAs → selo final: 24px

**Tipografia coluna direita:**
- Eyebrow: `CASA {N} · {VARIEDADE}` em mono 12px / 500 / `0.18em` UPPERCASE, cor `--olive`
- H1: display `clamp(2.5rem, 5vw, 4rem)`, italic seletivo conforme COPY-PAGES §3.2, cor `--ink`
- Lede: lede italic, cor `--ink-soft`, max-width 480px
- Ficha mono (multi-linha): `LOTE 2026/03 · SAFRA 2025` na linha 1, `TORRA 10/04 · SCORE SCA 85` na linha 2 — mono 11px / `0.18em` UPPERCASE, cor `--ink-mute`. Hairline 1px `--line` 60px à esquerda da ficha (decoração editorial)
- Selo torra fresca: bullet 8×8px preenchido `--olive` + texto sans 13px / 500 cor `--olive` ("Torrado há X dias")
- Preço: display 36px / 400, cor `--ink`
- Sub-preço: mono 12px / 400, cor `--ink-mute`
- CTA primário: `COMPRAR AVULSO` (vai para WhatsApp ou checkout — decidir conforme implementação atual)
- CTA secundário: `ASSINAR ESTE CAFÉ →` (vai para `/assinatura?cafe={slug}` — café pré-selecionado no configurador)
- Selo final: caption 12px italic, cor `--ink-mute`, "Frete grátis · torrado nesta semana"

### 3.3 SEÇÃO 2 — Origem e terroir

Background `--bone-soft`. Padding `py-32`. Container 1280px.

Layout split 60/40 desktop: texto à esquerda 60%, mapa simbólico à direita 40%.

**Mapa simbólico:**
- **Não usar Google Maps embedded.** Brand direction veta dependência visual genérica.
- Ilustração SVG estilizada da silhueta de Minas Gerais com ponto destacando a Serra do Cabral em `--olive`. Linhas hairline `--ink`, fundo `--bone`. Caption mono abaixo: `9°20'S · 44°10'W · 900-1.100m`.
- Alternativa fallback: bloco `--bone` com numerais de coordenadas em display 64px `--olive` + caption descritivo.

**Texto à esquerda:**
- Eyebrow: `ORIGEM E TERROIR` em olive
- H2: extrair de COPY-PAGES §3.3 com placeholders preenchidos
- Parágrafo body 17px / 1.7, cor `--ink-soft`, max-width 540px
- Linha mono ao final: `FAZENDA SANTA RITA + LOTES PARCEIROS · NORTE DE MINAS GERAIS`

### 3.4 SEÇÃO 3 — Perfil sensorial

Background `--bone`. Padding `py-32`. Container `--container-narrow` (880px).

Layout: bloco editorial centralizado.

Estrutura vertical:
- Eyebrow: `NA XÍCARA` em olive (centralizado)
- H2 centralizado: copy de COPY-PAGES §3.4
- Parágrafo centralizado max-width 640px, body 17px / 1.7, cor `--ink-soft`
- Bloco visual centralizado: **escolher entre radar ou barras horizontais**

**Decisão visual: barras horizontais 1-5 (não radar).**

Justificativa:
- Radar é template SaaS dataviz e não combina com tom editorial Aesop.
- Barras horizontais permitem leitura linear, similar a uma "ficha técnica" (mais alinhado com mono/lote/safra).

**Estrutura das 4 barras:**
- Layout: 2 colunas em desktop (4 barras em grid 2x2), stack mobile
- Cada barra:
  - Label à esquerda: sans 13px / 500 / `0.04em` UPPERCASE, cor `--ink` (`Doçura`, `Acidez`, `Corpo`, `Complexidade`)
  - 5 segmentos quadrados 16×16px à direita, gap 4px:
    - Preenchidos (até o valor): bg `--olive`
    - Vazios: bg transparent, border 1px `--line`
  - Valor numérico à extrema direita: mono 12px / 500, cor `--ink-mute` (`4 / 5`)

Valores extraídos de `products.ts` `sensory`: doçura 4, acidez 2, corpo 4, complexidade 3.

Acessibilidade:
- Cada barra tem `<div role="meter" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" aria-label="Doçura, 4 de 5">`.

### 3.5 SEÇÃO 4 — Como preparar (3 microcards)

Background `--bone-soft`. Padding `py-32`. Container 1280px.

Estrutura:
- Header centralizado: eyebrow → H2 → lede (max-width 560px) → hairline 80px
- Grid de 3 microcards (escolher os 3 métodos mais relevantes do `brewRecipes`: Espresso, Coado, V60 — variar conforme PDP)
- Stack vertical mobile, 2 colunas tablet, 3 colunas desktop. Gap 24px.

Cada microcard:
- Background `--bone`, borda 1px `--line`, padding 24px, border-radius 2px
- Hairline 1px `--olive` 32px no topo (acento de identidade do card)
- Nome do método: sans 16px / 500, cor `--ink` (ex: `V60`)
- Linha de parâmetros mono 12px / `0.05em`, cor `--ink-soft`: `1:16 · MÉDIA-FINA · 93°C · 20G → 320ML · 2:45-3:15`
- Nota da casa: caption 13px italic, cor `--ink-mute`, max 2 linhas (`Bloom de 40g por 30s. Despeje em espiral, pausando aos 100g e 200g.`)

Linha mono final centralizada após o grid: `RECEITAS DA CASA · TESTADAS NO BLEND DA SAFRA ATUAL`.

### 3.6 SEÇÃO 5 — Frescor (badge torra fresca)

Background `--ink`. Padding `py-32`. Container `--container-narrow`.

Estrutura centralizada:
- Eyebrow: `FRESCOR` em `--bone-soft`
- H2: `Torrado em *10 de abril*, embalado no mesmo dia.` (italic na data dinâmica)
- Parágrafo centralizado max-width 640px, body 17px / 1.7, cor `--bone-soft`
- Bloco visual destacado centralizado:
  - Border 1px `--olive`, padding 24px 48px, border-radius 2px
  - Bullet 12×12px preenchido `--olive`
  - Texto display 24px `--bone`: `Torrado há 23 dias` (calculado dinamicamente da `roastDate`)
  - Sub-texto mono 11px / `0.18em` UPPERCASE, cor `--ink-mute-on-dark`: `LOTE 2026/03 · VALIDADE 10/10/2026`

Mobile: badge mantém estrutura, padding reduzido para 20px 32px, font-size do display reduz para 20px.

### 3.7 SEÇÃO 6 — Reviews (3 reviews mock)

Background `--bone`. Padding `py-32`. Container 1280px.

Estrutura idêntica ao bloco de reviews da `/assinatura` §1.8, mas com **apenas 3 reviews** (não 6) e header alinhado à esquerda (não centralizado — PDP é mais íntimo).

Escolher 3 reviews relevantes dos `reviews` em `products.ts` (Marina Costa, Rodrigo Alves, Pedro Henrique Serra são as mais editoriais).

CTA discreto abaixo do grid: `Ver todas as 9 avaliações →` (centralizado, link textual olive).

### 3.8 SEÇÃO 7 — Cafés relacionados

Background `--bone-soft`. Padding `py-24` (mais compacto que outras seções — é fechamento, não destaque).

**Importante**: hoje há **1 produto único com 3 SKUs** (`products.ts`). Não há "outros cafés" no catálogo. Tratamento honesto:

- Eyebrow: `OUTROS PACOTES DA CASA` (não "produtos relacionados")
- H2 alinhado à esquerda (não centralizado): `Mesmo café, *outras formas*.` (italic em "outras formas")
- Grid de 2 cards (os outros 2 SKUs do mesmo café Zerbinatti, excluindo o atual). Padrão visual idêntico aos cards da seção "3 SKUs" da Home (UI-SPEC-HOME §2).
- Em desktop: 2 cards lado a lado ocupando ~70% do container (grid 2 colunas com gap 32px). Em mobile: stack vertical.

Quando houver mais SKUs/produtos no futuro, expandir para 3 cards e usar `algorithm` simples (mesmo blend, mesma origem).

### 3.9 Variantes mobile

| Mudança Hero |
|---|
| Stack vertical: foto 4:5 cima, ficha + CTAs embaixo |
| Foto: full-width até as bordas |
| Ficha textual: padding 20px lateral |
| CTAs: stack vertical full-width (max 320px), gap 12px |
| Selo torra fresca: centralizado abaixo da ficha |

### 3.10 Acessibilidade

- Hierarquia: `<h1>` único no Hero PDP. Cada seção `<section aria-labelledby>` com `<h2>`.
- Foto principal: `alt` específico ("Pacote 500g de Café Zerbinatti em grãos sobre mesa de madeira clara, etiqueta com data de torra visível")
- CTAs com `aria-label` se houver ambiguidade (ex: "Assinar este café — abre página de assinatura com Pacote Família pré-selecionado")
- Reviews: `<article>` com microdata Review
- Schema: `Product` com `Offer` (já existe em `lib/schema.ts`), `BreadcrumbList`, `aggregateRating`. Adicionar `hasMerchantReturnPolicy` e `shippingDetails` (SEO-STRATEGY §4)
- Meter (barras sensoriais): `role="meter"` com aria-valuenow/min/max

### 3.11 SEO

Conforme SEO-STRATEGY §3:
- **Title**: `{nome} — {variedade}, Score SCA {sca} | Zerbinatti` → `Pacote Família — Bourbon + Catuaí, Score SCA 85 | Zerbinatti`
- **H1**: `{Pacote Família}, Serra do Cabral.`
- **OG image dinâmica** via `opengraph-image.tsx` com nome do café + score + foto

---

## 4. Página `/para-empresas` (B2B)

### 4.1 Decisão arquitetural

Página B2B com 6 blocos verticais. Tom afirmativo, mas com mais densidade técnica que o B2C (B2B compra com cabeça, não emoção).

| # | Bloco | Background | py |
|---|---|---|---|
| 1 | Hero (CTA solicitar proposta) | `--ink` | py-32 |
| 2 | Por que empresas escolhem (4 razões) | `--bone` | py-32 |
| 3 | 4 modelos comparativo (Starter/Silver/Gold/Platinum) | `--bone-soft` | py-32 |
| 4 | 2-3 mini-cases | `--bone` | py-32 |
| 5 | FAQ B2B (5 perguntas) | `--bone-soft` | py-32 |
| 6 | Form de contato B2B + CTA WhatsApp | `--ink` | py-32 |

### 4.2 SEÇÃO 1 — Hero

Background `--ink`. Padding `py-32`. Container 1280px.

Layout split 60/40: texto à esquerda 60%, foto à direita 40% (espelhando o Hero da Home — mantém consistência de marca).

Coluna esquerda:
- breadcrumb: `INÍCIO · PARA EMPRESAS`
- Eyebrow: `CAFÉ CORPORATIVO` em olive
- H1: `Café da casa, *na sua empresa*.` (italic em "casa"), display `clamp(2.5rem, 5.5vw, 4.5rem)`, cor `--bone`
- Lede: copy de COPY-PAGES §4.2, cor `--bone-soft`, max-width 520px
- Bloco CTAs:
  - CTA primário: `MONTAR MEU PLANO` (anchor para form #form-b2b OU abre WhatsApp comercial — decidir; recomendação: abre form na própria página para qualificar lead antes de WhatsApp)
  - Link secundário: `Falar com a casa →` (WhatsApp comercial direto)
- Linha mono: `+ DE 80 EMPRESAS ATENDIDAS · SP · RJ · BH · CAMPINAS · REGIÃO` em `--ink-mute-on-dark`

Coluna direita: foto editorial real de máquina profissional em copa de empresa (luz natural, sem stock). Aspect 4:5, fullbleed à direita.

Fallback: bloco `--ink-soft` com monograma Z `--olive`.

### 4.3 SEÇÃO 2 — Por que empresas escolhem (4 razões)

Background `--bone`. Padding `py-32`. Container 1280px.

Estrutura:
- Header alinhado à esquerda (não centralizado — B2B é argumentativo, não promocional)
- Eyebrow `O QUE NOS CONTRATAM POR` → H2 → lede (max-width 720px, alinhada à esquerda)
- Hairline 1px 100% width `--line`
- Lista de 4 razões em **stack vertical** (não grid — cada razão merece destaque editorial individual)

Cada razão:
- Padding vertical 32px
- Hairline 1px `--line` na base
- Layout interno: numeração `01 ·` (mono 14px olive) + título inline (sans 18px / 500 `--ink`) na primeira linha; texto body 16px / 1.7 `--ink-soft` na segunda linha (max-width 720px)

Conteúdo de COPY-PAGES §4.3.

### 4.4 SEÇÃO 3 — 4 modelos comparativo

Background `--bone-soft`. Padding `py-32`. Container 1280px.

Estrutura:
- Header centralizado: eyebrow `QUATRO MODELOS` → H2 `Por porte de equipe, *não por preço*` → lede (max-width 560px) → hairline 80px
- Grid 4 colunas iguais desktop, 2x2 tablet, stack vertical mobile. Gap 24px desktop / 20px mobile.

Cada card de modelo:
- Background `--bone`, borda 1px `--line`, padding 32px, border-radius 2px
- Estrutura vertical:
  - Tag mono no topo: `STARTER` / `SILVER` / `GOLD` / `PLATINUM` em mono 12px / 500 / `0.18em` UPPERCASE, cor `--olive`
  - Faixa de equipe (sub-tag): mono 11px italic, cor `--ink-mute` (`5–15 pessoas · até 60 cafés/dia`)
  - Hairline 1px `--line` 32px width
  - Texto body 14px / 1.6, cor `--ink-soft`, ~3-4 linhas (descrição condensada do modelo)
  - Hairline 1px `--line` 100% width
  - Lista de 3-4 inclusos em mono 11px UPPERCASE com bullet 4×4px olive: `MÁQUINA EM COMODATO` / `MANUTENÇÃO` / `TREINAMENTO` etc.
  - CTA link textual: `Pedir proposta para Starter →` em olive com underline

Conteúdo de COPY-PAGES §4.4.

**Diferenciação visual entre os 4 modelos:**
- Não usar cores diferentes (Bronze/Prata/Ouro/Platina = cliché Nespresso). Os 4 cards são visualmente idênticos.
- A hierarquia de "valor" é comunicada apenas pela ordem (esquerda → direita) e pela faixa de equipe (mono italic sub-tag).

Linha mono final centralizada abaixo do grid: `TODOS OS MODELOS INCLUEM MANUTENÇÃO · TREINAMENTO · COMODATO`.

### 4.5 SEÇÃO 4 — 2-3 mini-cases

Background `--bone`. Padding `py-32`. Container 1280px.

Estrutura:
- Header alinhado à esquerda: eyebrow `CASOS DA CASA` → H2 `Três empresas *que servem o nosso café*` (italic em "que servem o nosso café") → lede (max-width 720px)
- Hairline 1px 100% width `--line`
- Grid de 3 cases em **3 colunas desktop**, stack mobile. Gap 32px.

Cada case:
- **Sem card box** (não usar borda, fundo igual ao da seção). Apenas hairline 1px `--line` à esquerda separando colunas (no desktop).
- Padding interno horizontal 24px (esquerda)
- Estrutura vertical:
  - Tag mono no topo: `CASO 01` em mono 11px / `0.18em` UPPERCASE, cor `--olive`
  - Título sans 16px / 500, cor `--ink` (`Escritório de advocacia, São Paulo`)
  - Sub-info mono 12px italic, cor `--ink-mute` (`28 advogados · plano Silver · cliente desde 2022`)
  - Hairline 1px `--line` 40px
  - Texto body 14px / 1.6, cor `--ink-soft`

Conteúdo de COPY-PAGES §4.5 (3 casos).

### 4.6 SEÇÃO 5 — FAQ B2B (5 perguntas)

Background `--bone-soft`. Padding `py-32`. Container `--container-narrow` (880px).

Estrutura idêntica ao FAQ da `/assinatura` §1.10 — accordions com hairlines, primeira pergunta aberta por default.

Header alinhado à esquerda: eyebrow `PERGUNTAS DE QUEM CONTRATA` → H2 `Antes de assinar *o contrato*` (italic em "Antes").

5 perguntas e respostas: copy literal de COPY-PAGES §4.6.

Schema: `FAQPageSchema` JSON-LD.

### 4.7 SEÇÃO 6 — Form de contato B2B + CTA WhatsApp

Background `--ink`. Padding `py-32`. Container 1280px.

Layout split 50/50 desktop:

**Coluna esquerda (50%):**
- Eyebrow `O CARTÃO DA CASA, PARA EMPRESAS` em `--bone-soft`
- H2: `Comece pela *simulação*` (italic em "simulação"), display, cor `--bone`
- Parágrafo curto: copy de COPY-PAGES §4.7, body 17px / 1.7, cor `--bone-soft`, max-width 480px
- Lista de 3 reasseguramentos com hairlines (idêntica ao padrão da `/assinatura`):
  - `Resposta em até 24h úteis`
  - `Sem ligação automática`
  - `Sem compromisso de fechamento`
- Link secundário abaixo: `Prefere falar agora? Fale direto com a casa →` (WhatsApp comercial)

**Coluna direita (50%):**
- Card formulário (mesmo padrão visual do configurador da `/assinatura`):
  - Background `--ink-soft`
  - Borda 1px `--ink-mute` opacity 0.4
  - Padding 48px (32px tablet, 24px mobile)
  - Border-radius 2px

**Campos do form (vertical stack, gap 20px):**

| # | Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|---|
| 1 | Nome | text | sim | min 2 chars |
| 2 | Empresa | text | sim | min 2 chars |
| 3 | CNPJ | text | sim | máscara `00.000.000/0000-00` + validador algorítmico |
| 4 | Email | email | sim | regex padrão |
| 5 | Telefone | tel | sim | máscara `(00) 00000-0000` |
| 6 | Volume estimado | select | sim | opções: `5-15 pessoas` / `15-40 pessoas` / `40-120 pessoas` / `120+ pessoas` |
| 7 | Mensagem (opcional) | textarea | não | max 500 chars |

**Estilo dos campos:**
- Label acima de cada input: mono 11px / 500 / `0.18em` UPPERCASE, cor `--bone-soft`, padding-bottom 8px
- Input: bg `transparent`, border-bottom 1px `--ink-mute` (não box completo — mais editorial), padding 12px 0, sans 15px, cor `--bone`. Focus: border-bottom muda para `--olive` 1.5px (transição 200ms)
- Select: mesma estética, com seta SVG `--olive` à direita
- Textarea: padding completo 12px, border 1px `--ink-mute`, min-height 96px, focus border `--olive`
- Mensagens de erro: `role="alert"` abaixo do campo, sans 13px, cor `#E8A87C` (olive avermelhado, único caso de cor adicional permitido — texto de erro exige diferenciação semântica para usuários daltônicos)

**Botão submit:**
- Full-width do card
- Estilo: bg `--olive`, text `--bone`, padding 18px, sans 14px / 500 / `0.06em` UPPERCASE
- Texto: `ENVIAR PEDIDO DE PROPOSTA`
- Estado loading: spinner SVG hairline + texto `ENVIANDO...`
- Estado disabled (campos inválidos): opacity 0.5, cursor not-allowed

**Caption legal abaixo do botão:**
- Sans 12px / 1.5, cor `--ink-mute-on-dark`
- Texto: `Seus dados são usados apenas para retorno comercial. Não compartilhamos com terceiros.`

### 4.8 Acessibilidade

- Cada `<label>` associado ao input via `for`/`id`
- Campos obrigatórios com `aria-required="true"` + visual: asterisco olive `*` ao lado do label
- Validação em tempo real com `aria-invalid` e `aria-describedby` apontando para mensagem de erro
- Erro nunca apenas em vermelho — sempre acompanhado de ícone SVG ⚠ + texto descritivo (HIGH-03 do A11Y-AUDIT — não repetir "fail silent")
- Botão submit: `<button type="submit">`, `aria-disabled="true"` se inválido, `aria-busy="true"` durante envio
- Confirmação pós-envio: substitui o form por bloco de sucesso com `<div role="status" aria-live="polite">` mostrando copy de COPY-PAGES §7.5 ("Pedido recebido. A casa retorna em 24h úteis")
- CNPJ e telefone com máscara via `aria-describedby` apontando para texto explicativo do formato esperado

### 4.9 Variantes mobile

| Mudança |
|---|
| Hero: stack vertical (texto cima, foto baixo) |
| Modelos comparativo: stack vertical, cada card full-width |
| Cases: stack vertical, hairline horizontal 1px entre cases (não vertical) |
| Form: card full-width, padding interno 24px, todos os campos full-width |
| Submit: altura 56px (touch target), full-width |

### 4.10 SEO

- **Title**: `Café Especial para Empresas — Aluguel de Máquina + Grão | Zerbinatti`
- **Meta description**: COPY-PAGES §4.1
- **H1**: `Café da casa, na sua empresa.`
- **H2s**: `Quatro razões. Nenhuma promocional` / `Por porte de equipe, não por preço` / `Três empresas que servem o nosso café` / `Antes de assinar o contrato` / `Comece pela simulação`
- **Schema**: `Organization` (já existe), `FAQPageSchema`, `BreadcrumbList`, opcionalmente `Service` para os 4 modelos

---

## 5. Página `/quiz` (3 perguntas)

### 5.1 Decisão arquitetural

**3 telas (1 pergunta por tela)** com transição sutil entre elas (fade + slide horizontal 8px, 250ms). Container central com max-width 720px, alinhado verticalmente no centro do viewport.

Visualmente leve — **sem peso de questionário corporativo**. Sem progress bar agressiva (apenas indicador discreto `01 / 03`). Sem fundo cheio — vazio editorial.

### 5.2 Layout geral — todas as 3 telas + intro + resultado

```
┌─────────────────────────────────────────────────────────────────┐
│  Header (transparente sobre bone)                               │
├─────────────────────────────────────────────────────────────────┤
│  breadcrumb: INÍCIO · TESTE                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [container central max 720px, vertical center]                 │
│                                                                 │
│  Indicador progresso (mono, sutil)                              │
│  01 / 03                                                        │
│                                                                 │
│  Eyebrow                                                        │
│  PERGUNTA OU RESULTADO                                          │
│                                                                 │
│  H2 (display, italic seletivo)                                  │
│  "Como você prepara café em casa?"                              │
│                                                                 │
│  Lede curta                                                     │
│  "Marque o método principal..."                                 │
│                                                                 │
│  ─── grid de opções (cards radio) ───                           │
│                                                                 │
│  ┌────────────────────────────────────────┐                     │
│  │ A · Coador, prensa ou Moka             │                     │
│  │ Método tradicional, moagem média...    │                     │
│  └────────────────────────────────────────┘                     │
│                                                                 │
│  ┌────────────────────────────────────────┐                     │
│  │ B · V60, Chemex ou Aeropress           │                     │
│  │ Métodos de filtro com moagem...        │                     │
│  └────────────────────────────────────────┘                     │
│                                                                 │
│  (4 cards stack vertical)                                       │
│                                                                 │
│  ─── nav inferior ───                                           │
│  ← Voltar          [PRÓXIMA PERGUNTA →]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Background: `--bone` em todas as telas (consistência minimalista).

Padding: `py-24` vertical (mais compacto que outras páginas — quiz é tarefa, não leitura).

### 5.3 Tela intro (entrada do quiz)

Estrutura centralizada:
- breadcrumb
- Eyebrow: `EM 30 SEGUNDOS` em olive
- H1: `Não sabe *qual pacote começar*?` (italic em "Não sabe")
- Lede italic: copy de COPY-PAGES §5.1
- Linha mono: `3 PERGUNTAS · 30 SEGUNDOS · SEM CADASTRO`
- Botão grande: `COMEÇAR O TESTE` (padding 18px 40px)

Espaçamentos: 32px entre cada elemento, 48px entre lede/mono e mono/botão.

### 5.4 Telas 1, 2, 3 (perguntas)

Estrutura comum:

- Indicador progresso: mono 12px / 500 / `0.18em` UPPERCASE, cor `--ink-mute` (`01 / 03`), padding-bottom 24px
- Eyebrow opcional (omitir nas perguntas — indicador já cumpre essa função)
- H2 da pergunta: display `clamp(2rem, 4.5vw, 3rem)`, weight 400, italic seletivo conforme COPY-PAGES, cor `--ink`
- Lede curta italic: lede italic, cor `--ink-soft`, max-width 560px
- Grid de 4 cards radio (stack vertical)
- Nav inferior: link `← Voltar` à esquerda + botão `PRÓXIMA PERGUNTA →` à direita (terceira tela: `VER RECOMENDAÇÃO →`)

**Cards radio (4 opções por pergunta):**
- Layout: full-width (max 560px), padding 24px 32px, border 1px `--line`, border-radius 2px, background `--bone-soft`
- Hover: border vira `--olive`, transição 200ms. Sem outras mudanças.
- Selecionado: border 2px `--olive`, background `--bone`, sutil
- Estrutura interna:
  - Letra `A · ` em mono 14px / 500 / `0.05em`, cor `--olive`, inline com título
  - Título sans 16px / 500, cor `--ink`, mesma linha da letra
  - Texto sub sans 14px / 1.5, cor `--ink-soft`, max 2 linhas
- Gap entre cards: 16px
- Acessibilidade: `<input type="radio">` visualmente escondido + `<label>` com toda a interação. Tab + Espaço selecionam. Setas mudam seleção (padrão WAI-ARIA radio group — não repetir HIGH-02 do A11Y-AUDIT).

**Nav inferior:**
- Padding-top 48px
- Link "Voltar": sans 14px / 500, cor `--ink-mute` com underline 1px offset 4px. Hover: cor `--olive`. Na tela 1, este link some.
- Botão "Próxima": sans 14px / 500 / `0.06em` UPPERCASE, bg `--olive`, text `--bone`, padding 14px 28px. Disabled (sem opção marcada): opacity 0.5, cursor not-allowed.

### 5.5 Tela de resultado

Layout muda — **mais visual que as perguntas, com card destacado para o pacote recomendado**.

Estrutura vertical centralizada:

- Indicador: mono `RESULTADO` (não mais `04 / 03`)
- Eyebrow: `O CARTÃO DA CASA RECOMENDA` em olive
- H2 grande: `Pacote Família, *quinzenal*.` (italic na frequência), display `clamp(2.5rem, 5vw, 4rem)`, cor `--ink`
- Parágrafo body 17px / 1.7, max-width 580px, centralizado, cor `--ink-soft` (copy de COPY-PAGES §5.5 — variante A/B/C conforme respostas)
- Hairline 1px 80px `--line`

**Card do pacote recomendado:**
- Layout horizontal split em desktop: foto à esquerda 40%, ficha à direita 60%
- Background `--bone-soft`, borda 1px `--line`, padding 32px, border-radius 2px, max-width 720px

Estrutura interna do card:
- Foto do pacote (4:5 vertical, ~200px de altura)
- Ficha à direita:
  - Tag mono `CASA 01 · BOURBON + CATUAÍ` em olive
  - Título sans 18px / 500: `Pacote Família — 500g em grãos`
  - Frequência sans 14px / 500, olive: `Quinzenal · R$ 76,42 por envio`
  - Sub-info mono 11px italic, cor `--ink-mute`: `Equivale a R$X/kg · frete grátis · 1º envio com -15%`
  - CTA primário: `ASSINAR ESTE CAFÉ` (full-width do card lado direito) → vai para `/assinatura?cafe=zerbinatti-500g-graos&freq=quinzenal` (configurador pré-preenchido)
  - Link secundário abaixo: `Ver outros pacotes →` (link `/assinatura`)

**Bloco opcional de captura de email (abaixo do card, separado por hairline 1px `--line`):**
- Padding-top 48px
- Sans 13px italic centralizado: `Quer receber receitas e novidades por email? (opcional)`
- Input de email + botão pequeno `INSCREVER` lado a lado, max-width 480px centralizado
- Caption mono 11px UPPERCASE: `1× POR MÊS · CANCELE QUANDO QUISER`

### 5.6 Microinterações

- **Transição entre telas**: fade-out 150ms → fade-in 200ms + slide horizontal 8px (`translateX`) — única exceção ao "sem translateY/X" do brand direction, justificada por necessidade funcional de feedback de progressão. **Respeitar `prefers-reduced-motion: reduce`**: instantâneo se ativo.
- **Card radio hover**: border `--line` → `--olive`, 200ms.
- **Card radio click (selecionado)**: border vira 2px `--olive`, background muda para `--bone`. Transição 200ms.
- **Botão "Próxima" enabled**: aparece com fade-in 200ms quando uma opção é marcada. Cursor pointer.
- **Resultado fade-in**: a tela inteira fade-in 400ms quando carrega.

### 5.7 Variantes mobile

| Mudança |
|---|
| Padding lateral 20px |
| H2 das perguntas: clamp reduz para 28px mínimo, cabe em 2-3 linhas |
| Cards radio: full-width, padding 20px 24px |
| Nav inferior: link Voltar e botão Próxima em colunas (não centralizados); botão direito tem padding 14px 24px |
| Card do resultado: stack vertical (foto 16:9 cima, ficha embaixo) |

### 5.8 Acessibilidade

- Skip link aplicável; `id="main"` no `<main>`
- Hierarquia: `<h1>` único na tela intro (`Não sabe qual pacote começar?`); cada tela de pergunta tem `<h2>` único; tela de resultado tem `<h2>` (não h1 — h1 só na intro)
- Cada pergunta é `<fieldset>` com `<legend>` (a própria pergunta visível como h2 + sr-only legend duplicada se necessário). 4 `<input type="radio">` com `<label>` visível.
- Setas mudam seleção (padrão radio group). Tab move entre fieldsets, não entre opções dentro do mesmo grupo (HIGH-02 do A11Y-AUDIT — implementar corretamente desta vez).
- Indicador de progresso: `<p role="status" aria-live="polite">` se mudar dinamicamente, ou simples `<p>` se estático.
- Botão "Próxima": `<button type="submit">` (cada tela é form independente). `disabled` se nenhuma opção marcada.
- Tela de resultado: `<div role="region" aria-labelledby="resultado-title">` com `<h2 id="resultado-title">`.
- Link de email: opcional e claramente marcado como tal (`aria-required="false"`).
- `prefers-reduced-motion: reduce` desabilita transições de tela (vira instantâneo).

### 5.9 SEO

- **Title**: `Quiz — Qual Pacote de Café Zerbinatti é Para Você?`
- **Meta description**: `Em 30 segundos, descubra qual pacote da Zerbinatti combina com seu ritmo. 3 perguntas, sem cadastro.`
- **H1**: `Não sabe qual pacote começar?` (na tela intro)
- **noindex**: opcional decisão — quiz pode rankear para "qual café especial escolher", mas resultados são dinâmicos. Recomendação: **manter indexado** com canonical para `/quiz` puro (não para variantes de resultado).
- **Schema**: nenhum específico (não cabe Quiz schema padrão); apenas BreadcrumbList.

---

## 6. Resumo executivo — 5 decisões visuais críticas

- **`/assinatura` é a única página com 2 configuradores idênticos em comportamento (hero + 2ª aparição) e Sticky CTA mobile com total dinâmico**: a redundância elimina fricção de retorno em mobile (65-75% do tráfego); a 2ª aparição muda apenas o microcopy do CTA (`QUERO COMEÇAR — FRETE GRÁTIS`) e inverte o split (configurador à esquerda) para evitar parecer cópia. FAQ tem **primeira pergunta aberta por default** (cancelamento) — combate cicatriz nacional de assinaturas difíceis.

- **`/sobre` usa timeline lateral sticky em desktop como dispositivo editorial proprietário** — ninguém no segmento brasileiro de café usa, e o resultado é um long-read tipo Aesop/Buly: 4 blocos cronológicos com fotos sépia (1897/1923/1983) e contemporânea (2026), princípios em grid 2x2, CTA discreto para `/fazenda` no rodapé. Em mobile, timeline vira breadcrumb mono `I · A PRIMEIRA TORRA` no topo de cada bloco.

- **PDP `/cafes/[slug]` usa barras horizontais 1-5 em vez de radar para perfil sensorial** — radar é template SaaS dataviz e quebra o tom editorial. Barras com 5 segmentos quadrados preenchidos em `--olive` (vazios em border `--line`) operam como ficha técnica editorial, alinhada ao mono/lote/safra. Selo "Torrado há X dias" em destaque é badge único da página, com border 1px `--olive` e bullet preenchido — única vez que olive aparece como border de bloco.

- **`/para-empresas` rejeita diferenciação cromática entre os 4 modelos (Starter/Silver/Gold/Platinum)** — usar Bronze/Prata/Ouro/Platina como cores seria cliché Nespresso e violaria "uma cor de acento por tela". Os 4 cards são visualmente idênticos; hierarquia comunicada apenas pela ordem (esquerda → direita) e pela faixa de equipe em mono italic sub-tag. Form B2B usa border-bottom only nos inputs (não box completo) para tom editorial.

- **`/quiz` é a única página onde transição com slide horizontal (8px) é permitida**, justificada como feedback funcional de progressão entre 3 telas — todas as outras páginas seguem o veto da brand direction a `translateX/Y`. Resultado mostra card único do pacote recomendado (não comparativo) com CTA `ASSINAR ESTE CAFÉ` que pré-preenche o configurador da `/assinatura` via querystring (`?cafe=...&freq=...`). Captura de email é opcional, em bloco separado por hairline, com cópia honesta ("opcional") — nenhum dark pattern.

---

**UI Designer:** Claude Opus 4.7
**Data:** 2026-05-03
**Status:** pronto para handoff a Frontend Developer
**Dependências externas:**
1. Sessão fotográfica editorial (já no backlog do PROGRESS) — fotos prioritárias por página: `/sobre` 4 blocos cronológicos (3 sépia + 1 contemporânea), `/cafes/[slug]` foto principal do pacote, `/para-empresas` máquina em copa de empresa real, `/assinatura` foto do pacote desembalado com cartão e postal.
2. Definição operacional sobre garantia de devolução do primeiro envio (Tier 2 trust signal do UX-ASSINATURA §7) — habilita comunicação direta na `/assinatura`.
3. Cópia legal exata da política de cancelamento Stripe para FAQ #1 da `/assinatura`.
4. Captação de 6+ reviews reais para a seção de prova social da `/assinatura` (atualmente: 9 reviews mock em `products.ts` — usar como placeholders honestos enquanto não chegam reais).
5. Decisão sobre se CTA "Comprar avulso" da PDP vai para WhatsApp ou checkout interno (afeta implementação do `/cafes/[slug]`).
6. Ilustração SVG estilizada do mapa de Minas Gerais com Serra do Cabral marcada (para PDP §3 origem e terroir).
