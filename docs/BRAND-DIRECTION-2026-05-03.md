# Brand Direction — Zerbinatti Coffee

Data: 2026-05-03
Autor: Brand Guardian (Claude Opus 4.7)
Escopo: Direção refinada para a Home reconstruída do zero, nível Aesop / Blue Bottle / La Marzocco. Substitui o sistema visual cafe/gold/green herdado das ondas anteriores.

---

## 1. Posicionamento em uma frase

> **Zerbinatti vende o tempo: 128 anos de ofício familiar destilados num pacote de café que chega na sua mesa a cada quinze dias.**

A âncora não é "café especial" (commodity discursiva) nem "herança italiana" (cliché). É **continuidade**: a única casa brasileira de café que atravessou quatro gerações sem interrupção e entrega isso como ritual contemporâneo, não museu.

---

## 2. Personalidade da marca

Seis atributos. Cada um carrega uma decisão visual e verbal.

1. **Ancestral** — fala com autoridade de quem não precisa provar idade.
2. **Discreta** — recusa adornos. Confiança sem volume.
3. **Precisa** — números concretos, datas, lotes. Nunca aproximações poéticas.
4. **Calorosa** — sem ser íntima forçada. Mesa, casa, gesto.
5. **Curadora** — escolhe por você e assume a escolha.
6. **Contemporânea** — moderna sem se desculpar pelo peso histórico.

Anti-personalidade: efusiva, jovem, descolada, "apaixonada por café", emojis, exclamações.

---

## 3. Paleta refinada

A paleta atual (coffee 50–950 + gold 300–600 + green 600–800) é genérica de café especial. Toda concorrente usa variação disso. **Proposta: reduzir a 7 cores nomeadas, com identidade proprietária.**

### Decisões críticas

- **Background dominante: bone, não branco puro.** Branco puro é frio e clínico. Bone é papel de carta da década de 30, manuscrito.
- **Preto da marca não é preto.** É um marrom-tinta tão escuro que lê como preto, mas tem temperatura. Diferencia de qualquer marca que use `#000`.
- **Acento único: verde-oliva profundo.** Substitui o gold/dourado. Gold em café é cliché universal (Nespresso, Illy, Lavazza, Three Marias, Octavio). Verde-oliva remete a azeite italiano, livro encadernado, uniforme militar de oficial — sofisticação silenciosa.
- **Dourado some como cor primária.** Sobrevive apenas em foil de embalagem física e no monograma Z em detalhes pontuais (não usar como `text-color` em UI).

### Tokens (hex exato — usar como CSS variables)

| Token | Hex | Uso |
|---|---|---|
| `--bone` | `#F4EFE6` | Background principal de seções claras. Substitui `#FDFBF7`. |
| `--bone-soft` | `#EBE3D5` | Background secundário, cards, hovers em superfícies claras. |
| `--ink` | `#1B1714` | Texto principal e background dark. Substitui `#1A1108` (mais marrom, menos preto). |
| `--ink-soft` | `#3A322C` | Texto secundário em fundo claro, blocos dark hierárquicos. |
| `--ink-mute` | `#736961` | Captions, metadados, marginalia. Substitui `coffee-500`. |
| `--olive` | `#4A5237` | Acento único. Links, CTAs primários, monograma, detalhes editoriais. |
| `--olive-deep` | `#363D26` | Hover/active de CTAs olive. |
| `--line` | `#D9D0BE` | Borders, divisores, hairlines. 1px sempre. |

### Combinações canônicas

- **Seção clara:** `bg-bone` + `text-ink` + acento `text-olive` + divisor `border-line`.
- **Seção dark:** `bg-ink` + `text-bone` + acento `text-olive` (a mesma — funciona em ambos) + divisor `border-ink-soft`.
- **CTA primário:** `bg-olive text-bone` → hover `bg-olive-deep`.
- **CTA secundário:** `border border-ink text-ink` (ghost) → hover `bg-ink text-bone`.

### O que sai

- Toda escala `coffee-50`/`100`/`200`/`300`/`400`/`500`/`600`/`700`/`800`/`900`/`950`. Substituir por 3 tons (`bone`, `ink-mute`, `ink`).
- Toda escala `gold-300`/`400`/`500`/`600`. Substituir por `olive` único.
- Toda escala `green-600`/`700`/`800`. Eliminada — verde-oliva já cobre.

**Resultado:** 7 cores em vez de 18. Cada cor tem função clara. Impossível um designer "errar" qual marrom usar.

---

## 4. Tipografia

### Diagnóstico das fontes atuais

`Playfair Display` + `Inter` (via `src/app/layout.tsx`). Combinação tecnicamente correta mas **datada e ubíqua**: é a stack de literalmente todo template Squarespace/Shopify dos últimos cinco anos. Playfair tem contraste muito alto que beira o "casamento gourmet"; Inter é neutro a ponto de não dizer nada.

### Recomendação

**Manter Playfair como fallback rápido se não houver budget para licença, mas o ideal é migrar para uma das duas combinações abaixo.** Toda a escala abaixo funciona com qualquer das três stacks.

**Stack A (ideal — investir):**
- Display/títulos: **GT Sectra** ou **Canela** (Commercial Type / Sharp Type) — serifs com lâmina, peso editorial, italic vivo.
- Corpo: **Söhne** ou **GT America Mono** para metadados — sans humanista, calor sem ruído.

**Stack B (Google Fonts, gratuita, ótima):**
- Display/títulos: **Fraunces** (variable, eixos SOFT/WONK ajustáveis — italic dramático, opsz)
- Corpo: **Inter** (mantém) ou **IBM Plex Sans** (mais textura)
- Mono/metadados: **JetBrains Mono** ou **IBM Plex Mono** para lote, datas, gramatura

**Stack C (mínimo esforço — manter o que tem):**
- Manter Playfair Display + Inter, mas usar **somente os pesos abaixo** e respeitar tracking rigoroso.

### Escala tipográfica completa

Ajustada para a Home minimalista. Mobile-first via `clamp()`.

| Token | Tamanho | Peso | Tracking | Line-height | Uso |
|---|---|---|---|---|---|
| `display` | `clamp(3.5rem, 9vw, 7.5rem)` | 400 (italic) ou 500 (regular) | `-0.025em` | `0.95` | Hero H1. Uma palavra ou frase única. |
| `h1` | `clamp(2.5rem, 5.5vw, 4.5rem)` | 400 | `-0.02em` | `1.05` | Início de seção (Assinatura, História). |
| `h2` | `clamp(1.875rem, 3.2vw, 2.625rem)` | 400 | `-0.015em` | `1.15` | Subsessão. Nome de café no card. |
| `h3` | `1.25rem` (20px) | 500 (sans) | `0` | `1.3` | Títulos de bloco utilitário (planos, FAQ). |
| `lede` | `clamp(1.125rem, 1.8vw, 1.5rem)` | 400 italic (serif) | `-0.005em` | `1.45` | Parágrafo de abertura sob o H1. |
| `body` | `1.0625rem` (17px) | 400 | `0` | `1.7` | Texto corrido. Mais alto que padrão = ar editorial. |
| `body-sm` | `0.9375rem` (15px) | 400 | `0` | `1.6` | Descrições secundárias, cards. |
| `caption` | `0.8125rem` (13px) | 400 | `0.01em` | `1.5` | Legendas de imagem, notas. `text-ink-mute`. |
| `eyebrow` | `0.6875rem` (11px) | 500 | `0.28em` UPPERCASE | `1` | Kicker antes de H1/H2. `text-olive`. |
| `mono` | `0.75rem` (12px) | 400 mono | `0.05em` | `1.4` | Lote, safra, data, peso, gramatura. `text-ink-mute`. |

### Regras

- **Italic é assinatura.** Display em italic ao menos uma vez por página (provavelmente no Hero) — diferencia de marcas que só usam serif reto.
- **Nunca bold em serif.** Peso 700 em Playfair/Fraunces engorda demais. Máximo 500–600. O peso comunica menos do que o tamanho e o ar.
- **Eyebrow sempre carrega o oliva.** É a única vez que o oliva aparece como cor de texto principal. Por isso vira assinatura.
- **Mono para qualquer número.** Lote `2026/03`, safra `2025`, peso `250g`, datas. Cria contraste editorial com o serif.

---

## 5. Tom de voz — três exemplos

### Hero (Home)

> **Eyebrow:** DAL 1897 · QUARTA GERAÇÃO
> **H1:** *Café que atravessa* gerações.
> **Lede:** Uma casa, quatro gerações, um pacote a cada quinze dias. A curadoria fica por nossa conta.

Por quê: não promete "experiência", não fala em "paixão", não convida a "descobrir". Afirma. O italic em "atravessa" ancora a tipografia da marca. "A curadoria fica por nossa conta" desloca o esforço cognitivo do cliente — premium é não ter que escolher.

---

### Descrição de café (card e PDP)

> **CASA 03**
> **Bourbon Amarelo, Fazenda São João.**
> Sétima safra que compramos deste lote. Torra média-clara, corpo de mel, acidez de damasco seco. Resiste a leite, prefere água.
> *Lote 2026/03 · 250g · moído sob pedido*

Por quê: nomeia ("CASA 03"), data a relação ("sétima safra que compramos") — exclusivo da marca. Notas sensoriais existem mas não dominam. Última frase ("prefere água") é íntima sem ser cute. Mono na linha técnica.

---

### CTA de assinatura

> **H2:** A casa escolhe. Você recebe.
> **Body:** Quinzenal ou mensal. Um café por entrega, escolhido pela casa ou fixado por você. Cancele quando quiser, sem perguntas.
> **Botão primário:** Começar a receber
> **Link secundário:** Como a curadoria funciona →

Por quê: "Começar a receber" é melhor que "Assinar agora" — descreve o que acontece, não o ato comercial. "Sem perguntas" remove fricção de cancelamento sem soar promocional. O link secundário transfere autoridade — quem não confia na curadoria pode investigar antes.

**Vocabulário canônico:** casa, mesa, lote, safra, ofício, geração, lavoura, torra, terreiro, gole, xícara, gesto.

**Vocabulário banido:** experiência, jornada, descobrir, explorar, universo, paixão, apaixonado, mamma mia, premium, exclusivo (mostrar, não dizer), incrível, único, surpreendente, especial (palavra-zumbi do segmento).

---

## 6. Princípios visuais

Cinco regras. Cada uma é veto, não sugestão.

1. **Espaço em branco é luxo.** Padding vertical entre seções nunca abaixo de `py-32` (mobile `py-20`). Densidade vende commodity.
2. **Fotografia editorial sempre, nunca stock.** Imagens só de três tipos: (a) fazenda real, luz natural, sem filtro; (b) mesa/ritual com objetos da família; (c) macro do grão e da torra. **Zero foto Unsplash.** Substituir todas durante a reconstrução.
3. **Uma cor de acento por tela.** Olive é o único acento. Se a tela está pedindo uma segunda cor, a hierarquia está errada — refazer com tipografia.
4. **Hairlines de 1px, nunca 2.** Borders `border-line` 1px. Divisores são linhas, não barras. A marca opera por sutileza — uma borda grossa quebra o registro.
5. **Movimento mínimo, propositado.** Reveals sutis no scroll (já existem em globals.css), zero parallax exagerado, zero "wow effect". Botões com transição de 200–300ms, nunca bounce. **Eliminar:** `bean-rotate`, `float-subtle`, `bokeh-pulse`, `steam-wisp`. Atmosfera vem da fotografia, não da animação.

---

## 7. Referências visuais

Cinco marcas que servem de norte estético. Estudar tipografia, hierarquia, uso de espaço, tom de voz — não copiar.

1. **Aesop** — [aesop.com](https://www.aesop.com) — autoridade silenciosa, serif sem peso desnecessário, descrições de produto que parecem ensaio. Bone background é deles.
2. **La Marzocco** — [lamarzocco.com](https://lamarzocco.com) — herança industrial italiana sem cair em "vintage". Como tratar 100+ anos de história em UI moderna.
3. **Blue Bottle Coffee** — [bluebottlecoffee.com](https://bluebottlecoffee.com) — rigor editorial em e-commerce de café, fotografia limpa, hierarquia tipográfica impecável. Cuidado com excesso de azul-acento (não copiar paleta).
4. **Le Labo** — [lelabofragrances.com](https://www.lelabofragrances.com) — numeração de coleção (Santal 33, Rose 31) inspira "CASA 03". Tipografia all-caps com espaçamento dramático. Uso de mono para metadados.
5. **Officine Universelle Buly** — [buly1803.com](https://www.buly1803.com) — herança documentada (1803) tratada como ativo contemporâneo. Bone + tinta. Como uma data antiga vira luxo sem ser kitsch.

Bônus de pesquisa:
- **Hario** ([hario.com](https://www.hario.com)) — minimalismo japonês aplicado a café, para referência de espaço.
- **Sightglass** ([sightglasscoffee.com](https://sightglasscoffee.com)) — tipografia editorial em café especial americano.

---

## Resumo executivo

Esta direção propõe uma ruptura disciplinada: sair da paleta café/dourado/verde típica do segmento e adotar um sistema de **bone + ink + olive** (sete cores, não dezoito), tipografia serif italic como assinatura, espaço como luxo, e tom de voz que afirma em vez de seduzir. A âncora estratégica é o tempo (128 anos de continuidade familiar), e cada decisão visual e verbal serve essa âncora. O resultado deve parecer Aesop encontrando La Marzocco no Brasil — não Lavazza com coat de paint.

---

## 5 decisões — bullets finais

- **Paleta:** dezoito tons herdados → sete cores nomeadas (`bone`, `bone-soft`, `ink`, `ink-soft`, `ink-mute`, `olive`, `olive-deep`, `line`). Olive substitui gold como acento único — gold é cliché universal de café.
- **Tipografia:** manter Playfair+Inter como mínimo viável, mas idealmente migrar para Fraunces (Google) ou GT Sectra/Söhne (paga). Italic do display vira assinatura. Mono entra para qualquer número (lote, safra, peso) — contraste editorial.
- **Tom de voz:** afirmação > sedução. "Café que atravessa gerações" em vez de "Descubra nosso universo". Vocabulário restrito (casa, mesa, lote, ofício, geração); banido: paixão, jornada, experiência, especial, premium.
- **Princípios visuais:** espaço como luxo (`py-32` mínimo entre seções), fotografia editorial real (zero Unsplash), uma cor de acento por tela, hairlines de 1px, movimento mínimo (eliminar bean-rotate, steam, bokeh).
- **Referências:** Aesop (autoridade silenciosa), La Marzocco (herança italiana moderna), Blue Bottle (rigor editorial em café), Le Labo (numeração de coleção tipo "CASA 03"), Officine Universelle Buly (data antiga tratada como luxo contemporâneo).
