# UX Deep-Dive — Página `/assinatura` Zerbinatti Coffee

**Data:** 2026-05-03
**Autor:** UX Researcher (Claude Opus 4.7)
**Escopo:** especificação de pesquisa, jornada e estrutura UX da página dedicada `/assinatura` (pillar SEO #1 e produto-âncora). Consumido por UI Designer (handoff visual) e Frontend Developer (implementação).
**Dependências:** `BRAND-DIRECTION-2026-05-03.md`, `SEO-STRATEGY-2026-05-03.md`, `UI-SPEC-HOME-2026-05-03.md` (seção 3 — configurador da Home), `src/components/home/Subscription.tsx`.

---

## 1. Jornada do usuário — três personas

### Persona A — "O Assinante Novo" (Marina, 34, SP)
Designer de produto, mora sozinha, bebe 1–2 cafés por dia em V60. Já comprou café especial avulso em torrefadoras de SP, nunca assinou. **Entrou na página vinda de Google** ("assinatura de café especial") ou Instagram ads.

| Passo | O que faz | Emoção esperada | Fricção previsível |
|---|---|---|---|
| 1. Chegada | Lê hero, tenta entender em 4s o que é diferente da concorrência | Curiosidade morna, ceticismo de "mais uma assinatura" | Se hero falar genérico ("café fresco na sua casa"), bounce em 8s |
| 2. Scroll inicial | Procura prova rápida de qualidade (origem, score, fotos) | Interesse aumenta se ver fazenda + dados precisos | Falta de fotos reais derruba percepção de premium |
| 3. Configurador | Mexe nos toggles para ver preço final mudar | Sensação de controle — clique vira jogo | Se preço pular sem explicação ou se "frete grátis" não aparecer cedo, abandona |
| 4. Objeções | Procura FAQ — "e se eu não gostar?", "como cancelo?", "quanto café é isso?" | Alívio se encontrar respostas claras; desconfiança se tudo for "fale conosco" | Perguntas frequentes escondidas em accordion fechado por default = atrito |
| 5. CTA | Clica "Começar a receber" → checkout | Compromisso ainda morno; se checkout pedir cadastro longo, desiste | Cadastro pré-pagamento, captcha, campos de telefone obrigatório com máscara estranha |
| 6. Pós-clique | Recebe email de confirmação | Validação | Email genérico ou só "obrigada pela compra" sem reforço da curadoria |

**Gatilhos de conversão:** prova de frescor (data de torra real, não "torra fresca" abstrato), foto editorial da fazenda, garantia de cancelamento sem ligação, primeiro envio com desconto explícito.

---

### Persona B — "O Indeciso" (Rafael, 41, BH)
Engenheiro, gosta de café mas não sabe distinguir variedades. Assinou clube uma vez (Coffee&Joy ou Moka), cancelou em 3 meses porque "veio café demais e não consegui acompanhar". **Entrou via comparação direta** — está aberto, mas com cicatriz.

| Passo | O que faz | Emoção esperada | Fricção previsível |
|---|---|---|---|
| 1. Chegada | Lê hero, vai direto para "como funciona" e "preço por kg" | Cético, calculista | Se preço final só aparecer depois de scroll longo, irrita |
| 2. Comparação | Abre outras abas (Octavio, Coffee&Joy, Moka) | Cansaço de tab-hopping | Se nossa página não tiver "vs. concorrência" implícito (preço/kg, frequência flexível), perde |
| 3. Quiz/ajuda | Procura recomendação assistida — "qual escolher?" | Alívio se encontrar quiz curto; bloqueio se for "fale com sommelier" | Quiz de 10 perguntas mata; 4 perguntas converte |
| 4. Configurador | Testa frequência mensal (medo do "café demais" de novo) | Ansiedade reduz se vir botão "pause" e "trocar pacote entre ciclos" | Se opção quinzenal estiver default, reforça medo |
| 5. FAQ | Lê tudo: "posso pular um envio?", "vence em quanto tempo?" | Confiança volta se respostas forem específicas | Se FAQ for genérica ("nossa equipe ajuda você"), desiste |
| 6. CTA | Hesita; pode salvar para depois | Hesitação | Sem captura de email para retargeting, perdido |

**Gatilhos de conversão:** mensal default (não quinzenal), "pause/troque/cancele em 1 clique" mostrado **na própria página**, quiz com link sutil (não popup), captura de email com isca ("guia de preparo grátis").

---

### Persona C — "O Retornando" (Camila, 38, RJ)
Já é cliente Zerbinatti — comprou 2 pacotes avulsos via WhatsApp. Recebeu email convidando a assinar com -15%. **Entra autenticada (ou semi-autenticada) com expectativa alta**.

| Passo | O que faz | Emoção esperada | Fricção previsível |
|---|---|---|---|
| 1. Chegada | Procura imediatamente o configurador; pula hero | Eficiência | Se a página obrigar scroll narrativo antes do configurador, irrita ("já conheço vocês") |
| 2. Configurador | Já sabe qual pacote quer; configura em 15s | Confiança total | Se "é a primeira vez? ganhe -15%" não estiver visível e ela não vir o desconto, perde |
| 3. Checkout | Espera reaproveitamento de dados (endereço, cartão) | Se rapidíssimo, encantada | Se tiver que digitar tudo de novo, frustração |
| 4. Confirmação | Quer email com data exata da próxima torra | Antecipação | Genérico decepciona |

**Gatilhos de conversão:** atalho visível "já conheço, ir para o configurador" no topo (anchor link), oferta de retorno explícita, integração com sistema de cliente (mesmo que mínima).

---

## 2. Análise concorrencial Brasil

Pesquisa comparativa em maio/2026 — Octavio Café, Coffee&Joy, Coffee Mais, Moka Clube, Black Tucano e referências adjacentes (Wee, NB e Coffeesso aparecem pouco indexados; tratados como nichos). Foco no **mecanismo de assinatura e na página de venda**.

### Octavio Café (octaviocafe.com.br)
**Faz bem:**
- Marca consolidada (1816, 5 unidades físicas em SP), o que naturalmente transfere autoridade.
- Catálogo organizado por **14 perfis de café** — vira sistema editorial, não SKU genérico.
- Forte presença em loja física + digital.

**Faz mal:**
- Página de assinatura praticamente inexistente como pillar. Café é vendido majoritariamente avulso e via cápsula.
- Não comunica recorrência como produto-âncora — perde o cliente que quer "resolver o problema do café da semana".
- UX da loja online datada, foco em SKU e não em jornada de assinatura.

**Lição para Zerbinatti:** ter loja física consolidada é luxo que não temos — temos que **substituir esse ativo por uma página de assinatura tão bem desenhada que vire a "loja virtual" da casa**.

### Coffee&Joy (coffeeandjoy.com.br)
**Faz bem:**
- 3 planos claramente nomeados (Iniciante 250g R$47,80 / Ritual 500g R$95,60 / Explorador 1kg R$191,20).
- Preço transparente já na página, sem precisar "configurar para descobrir".
- Curadoria assumida ("nós escolhemos") — promete novidade.

**Faz mal:**
- Modelo "novo café todo mês" gera o problema do **Persona B (Rafael)**: clientes que não querem variedade abandonam em 2–3 meses.
- Sem opção de "café fixo" — é tudo curadoria forçada.
- Comunicação muito "joy" e infantil, fere mercado premium.

**Lição:** nosso diferencial — **café fixo escolhido pelo assinante** com troca opcional entre ciclos — é exatamente o oposto do Coffee&Joy. Comunicar isso como vantagem.

### Coffee Mais (coffeemais.com — Clube Coffee++)
**Faz bem:**
- Preço de assinatura claramente comparado com avulso (40% off no anual, 15% no mensal + frete fixo R$7,99).
- Dois planos claros: anual com mais desconto vs. mensal com flexibilidade.
- Página de FAQ extensa.

**Faz mal:**
- **Reclame Aqui registra dificuldade de cancelamento** (email só para cobrança, SAC inacessível, WhatsApp não resolve). Isso é veneno reputacional.
- Plano anual com desconto pesado camufla **lock-in** — usuário se sente preso.
- Frete não é grátis — fricção a cada envio.

**Lição:** Zerbinatti deve **fazer o oposto explicitamente**: cancelamento 1-clique no portal Stripe + frete sempre grátis + sem plano anual com lock-in. Comunicar isso como **selo na página**, não como letrinha em FAQ.

### Moka Clube (mokaclube.com.br)
**Faz bem:**
- Modelo "revista de café" — caixa com 2 SKUs diferentes a cada mês, narrativa clara.
- UX visual mais cuidada que a média, com fotografia decente.
- Boa comunicação do "ritual de descoberta".

**Faz mal:**
- Caro relativo ao volume (500g por R$~89 com 2 cafés diferentes = pequena quantidade de cada).
- Sem opção de café único repetido — não atende quem quer "abastecer a rotina".
- Frequência única (mensal) — sem flexibilidade.

**Lição:** brasileiro tem **dois perfis distintos**: o "explorador" (Moka serve) e o "rotineiro" (Coffee Mais serve mal, Moka não serve). **Zerbinatti deve mirar o rotineiro premium** — quer o mesmo café que confia, sem virar refém de assinatura difícil de cancelar.

### Black Tucano, Arbor, Um Coffee Co.
**Padrão comum:**
- Cobram compromisso mínimo de 3 meses (Black Tucano), o que é fricção alta para BR pós-cicatriz Coffee Mais/iFood.
- Maioria não comunica data de torra real — "fresco" é abstrato.
- Páginas com 3 planos comparativos (template SaaS), conforme já alertado na brand direction.

### Síntese — onde Zerbinatti ganha posicionamento na página
1. **Café fixo escolhido pelo assinante** (vs. curadoria forçada do Coffee&Joy/Moka) — o assinante é a curadoria.
2. **Pause/cancele em 1 clique no Stripe Customer Portal** (vs. SAC inacessível Coffee Mais) — vira selo de página.
3. **Frete sempre grátis** (vs. R$7,99 fixo Coffee Mais) — remove um ponto de cálculo mental.
4. **Sem mínimo de meses** (vs. 3 meses Black Tucano) — confiança devolvida.
5. **Data de torra explícita** ("seu café foi torrado em DD/MM, chega em até 7 dias") — vs. "torra fresca" abstrato.
6. **Herança 1897 + curadoria editorial** — diferencial de marca que nenhum concorrente tem.

---

## 3. Estrutura recomendada da página `/assinatura`

A página é **pillar SEO** (alvo: "assinatura de café especial", "clube de café") e **funil de conversão** ao mesmo tempo. As duas funções pedem ordens diferentes — Google quer conteúdo amplo, conversor quer CTA precoce. A solução é **arquitetura de dois andares**: configurador acima da dobra (conversor) + conteúdo editorial abaixo (SEO + objeções).

### Ordem das seções (top → bottom)

| # | Seção | Função | Justificativa UX |
|---|---|---|---|
| 1 | **Hero com configurador embutido** | Conversor imediato + H1 SEO | Persona C (retornando) e Persona A decidida convertem em <30s sem scrollar. H1 captura a keyword. Ver §4. |
| 2 | **Strip de garantias (3–4 selos hairline)** | Trust signal pré-objeção | Imediatamente abaixo do configurador para responder a "isso é seguro?" antes que a dúvida apareça (cancele 1 clique, frete grátis, sem fidelidade, torra fresca datada). |
| 3 | **"Como funciona" — 4 passos visuais** | Educação + transparência | Persona B (cético) precisa entender o mecanismo antes de confiar. 4 passos: escolha → torra na semana → entrega em até 7 dias → recebe novo ciclo. Mantém H2 SEO ("Como funciona a assinatura"). |
| 4 | **"O que entra na caixa"** | Concretude — o produto é palpável | Foto editorial real do pacote + cartão da torra + postal. Combate abstração de "vou receber café". |
| 5 | **Frescor — a promessa central** | Diferencial competitivo | Bloco editorial: "Torra → entrega em até 7 dias". Comparativo honesto com mercado (supermercado: 6+ meses). H2 SEO captura "café torrado fresco". |
| 6 | **História 1897 condensada** | E-E-A-T + diferencial de marca | 60 palavras + foto + link `/sobre`. Reforça autoridade que nenhum concorrente direto tem. |
| 7 | **Avaliações de assinantes** | Prova social | 3–6 reviews reais com nome, cidade, método de preparo, foto se disponível. Schema `Review` para rich result. |
| 8 | **Configurador — segunda aparição** | Recaptura quem rolou | Já leu tudo, agora reapresenta o conversor sem precisar voltar. CTA primário com microcopy diferente do hero ("Quero começar — frete grátis"). |
| 9 | **FAQ com 8–10 perguntas** | Derruba objeções residuais + SEO (FAQPageSchema) | Seção crítica para Persona B. Accordion **com primeira pergunta aberta por default** (cancelamento). Ver §5. |
| 10 | **CTA final + reasseguramento** | Última oportunidade | Bloco final dark com H2 ("Receba seu primeiro pacote em até 7 dias") + CTA + microcopy de garantia. |

**Por que dobrar o configurador (1 e 8):** decisão de comércio premium. Quem decide rápido (Persona C) converte no #1; quem precisa de educação completa (Personas A e B) converte no #8 sem ter que rolar de volta para o topo. **Não é redundância — é eliminação de fricção de retorno.**

**O que NÃO entra na página:**
- Comparativo de 3 planos (decisão da brand direction — fluxo único).
- Carrossel de SKUs (eles têm `/cafes` para isso; aqui distrai).
- Vídeo institucional autoplay (banido pela brand direction; movimento decorativo).
- Popup de email forçado (frustra Persona C, único ganho seria Persona B — atender com link sutil para quiz).

---

## 4. Configurador — análise e wireframe

### Decisão central: o configurador da `/assinatura` deve ser **a evolução do configurador da Home, não uma cópia**.

A versão da Home (`Subscription.tsx`, ver UI-SPEC §3) é **um teaser conversor inline**: 2 escolhas (frequência + pacote), total dinâmico, CTA WhatsApp. Funciona porque a Home é narrativa e o configurador é um destino dentro dela.

A página `/assinatura` é o destino. Aqui o configurador deve:
1. **Permanecer simples** (não virar wizard de 5 passos — paralisia).
2. **Adicionar 2 controles novos** que a Home suprime: **escolha do café** (3 SKUs disponíveis, com "casa escolhe" como default amigável) e **moagem** (grãos / coador / espresso / italiana — só aparece se SKU "moído" for escolhido, com micro-explicação).
3. **Mostrar ciclo visualmente** — uma timeline horizontal "1º envio em 7 dias → 2º envio em 30 dias → ...".
4. **Calcular economia** ("Você economiza R$ 26,98/ano vs. avulso") em tempo real, sub-CTA.
5. **Ter modo wizard opcional para Persona B** via link sutil "não sei o que escolher → faça o quiz em 30s" (anchor para seção quiz ou modal embutido).

### Wireframe textual — desktop (≥1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│  HERO (split 50/50, bg --ink)                                        │
│                                                                      │
│  [coluna esq 50%]                       │ [coluna dir 50%]           │
│                                         │                            │
│  eyebrow: ASSINATURA · DAL 1897         │  ┌──────────────────────┐  │
│                                         │  │ CONFIGURADOR (card)  │  │
│  H1: "Receba café especial torrado      │  │                      │  │
│       na semana, em casa."              │  │ FREQUÊNCIA           │  │
│  (italic em "torrado na semana")        │  │ [Quinzenal] [●Mensal]│  │
│                                         │  │                      │  │
│  Lede: "Quinzenal ou mensal. Pause      │  │ CAFÉ                 │  │
│   quando quiser. Frete grátis. Cancele  │  │ [●Casa escolhe ↘]    │  │
│   em 1 clique."                         │  │ [○ Pacote Família]   │  │
│                                         │  │ [○ Pacote Mesa]      │  │
│  ─── 4 garantias hairline + ícone ───   │  │ [○ Pacote Coador]    │  │
│  • Torra fresca, datada                 │  │                      │  │
│  • Pause/cancele em 1 clique            │  │ MOAGEM (se moído)    │  │
│  • Frete grátis em todo o Brasil        │  │ [○Coador ●V60 ○...]  │  │
│  • Primeiro envio com 15% off           │  │                      │  │
│                                         │  │ ─── timeline ───     │  │
│  link: "Não sei o que escolher.         │  │ □─────□─────□        │  │
│         Faça o teste em 30s →"          │  │ Hoje  +7d   +37d     │  │
│                                         │  │                      │  │
│                                         │  │ Total/envio          │  │
│                                         │  │ R$ 76,42  (1º com -15%)│
│                                         │  │ Equivale a R$X/kg    │  │
│                                         │  │ Economia anual: R$Y  │  │
│                                         │  │                      │  │
│                                         │  │ [COMEÇAR A RECEBER]  │  │
│                                         │  │                      │  │
│                                         │  │ caption: "Cobrança   │  │
│                                         │  │  via Stripe. Cancele │  │
│                                         │  │  pelo portal sem     │  │
│                                         │  │  ligar."             │  │
│                                         │  └──────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Decisões de configurador

| Controle | Decisão | Justificativa |
|---|---|---|
| Frequência | Toggle 2 estados, **Mensal default** | Persona B (cicatriz "café demais") — quinzenal default reforça medo. Mensal converte mais e dá margem para o cliente subir depois. |
| Café | 4 opções: "Casa escolhe" (default) + 3 SKUs nominais | "Casa escolhe" abraça a brand direction ("a curadoria fica por nossa conta") e funciona como **atalho cognitivo** — quem não quer escolher não precisa. Os 3 SKUs estão lá para quem quer controle (Persona C). |
| Moagem | Aparece condicionalmente se SKU "moído" — 4 opções (Coador/V60, Espresso, Prensa francesa, Italiana/Moka) | Reduz cognição inicial. Quem escolhe grãos não precisa pensar em moagem. Quem escolhe moído precisa, e mostrar isso só ali evita 4 opções desnecessárias para 2/3 dos usuários. |
| Timeline visual | 3 marcadores: hoje / 7 dias (1ª torra) / +30 ou +15 dias (próximo ciclo) | Combate abstração temporal. Persona B vê concretamente "em 7 dias chega o primeiro" e "em 30 dias o segundo" — calcula consumo mental. |
| Linha de economia | "Economia anual: R$X" calculada vs. preço avulso × frequência | Objeção #4 ("preço acumulado") respondida proativamente. Mono, discreto, abaixo do total. |
| CTA primário | `COMEÇAR A RECEBER` (mantém da Home — afirmação, não venda) | Brand direction — "começar a receber" descreve o que acontece, não o ato comercial. |
| Caption legal | "Cobrança via Stripe. Cancele pelo portal sem ligar." | Stripe é trust signal automático no BR. "Sem ligar" combate a maior objeção de assinatura no país. |

### Mantém igual à Home?
**Não.** O configurador da Home permanece simplificado (2 controles, propósito de teaser). O configurador da `/assinatura` é a versão completa (4 controles condicionais + timeline + economia). **Ambos compartilham o mesmo estado visual e o mesmo CTA** — o usuário que já mexeu na Home reconhece a interface e ela apenas "cresce" na página dedicada. Consistência sem clonagem.

### Wizard step-by-step — análise
Considerei wizard (1 escolha por tela, com "próximo"). **Rejeitado** pelos motivos:
- Wizards aumentam tempo de decisão, fragmentam contexto e diluem o CTA.
- A escolha aqui não é complexa o suficiente (4 controles) para justificar fragmentação.
- O configurador inline com tudo visível **mostra o preço final em tempo real** — é o gatilho de conversão mais forte.
- Wizards funcionam quando há cálculo opaco para o usuário (seguro, frete internacional). Aqui não há.

**Quem precisa de wizard recebe via quiz** (link sutil que abre `/quiz` em modal ou nova tela). Quiz já existe e é o funil-irmão.

---

## 5. Top 8 objeções do brasileiro com assinatura — e onde a página responde

| # | Objeção | Onde responde | Como responde |
|---|---|---|---|
| 1 | **"Vou ficar preso, vai ser difícil cancelar"** (cicatriz iFood, Coffee Mais, Leiturinha) | Strip de garantias (#2) + caption do CTA + FAQ #1 (aberto por default) | Selo "Cancele em 1 clique pelo portal Stripe — sem ligar, sem email para retenção, sem perguntas". FAQ aberta mostra screenshot do botão Stripe. |
| 2 | **"Vai vir café demais, não vou conseguir tomar"** | Configurador (default Mensal) + FAQ #3 + "Como funciona" (#3) | Mensal default + texto "1 pacote por entrega — 250g dura ~3 semanas para quem bebe 1 café/dia". Botão "Pause envio" mostrado na FAQ. |
| 3 | **"Não sei se vou gostar do café"** | "O que entra na caixa" (#4) + Avaliações (#7) + Configurador (opção "Casa escolhe" + opção SKU específico) | Reviews reais com método de preparo. Opção de fixar 1 SKU avulso já testado. Notas sensoriais visíveis. |
| 4 | **"Sai mais caro que comprar avulso"** | Configurador (linha "Economia anual") + FAQ #5 + Frescor (#5) | Cálculo explícito: "R$X/ano vs. R$Y avulso = economia de R$Z". Mais frete grátis. |
| 5 | **"E se eu viajar / mudar / pausar?"** | Configurador (caption) + Strip de garantias (#2) + FAQ #2 e #6 | "Pause quantas vezes quiser, sem custo. Volte quando precisar". Mostra captura de tela do portal. |
| 6 | **"Café vai chegar velho como no supermercado"** | Frescor (#5) + Strip de garantias (#2) | "Torra → entrega em até 7 dias úteis. Cada pacote tem a data da torra estampada". Comparativo honesto: supermercado 4–6 meses. |
| 7 | **"Vão me cobrar coisas escondidas / cobrança chata"** | Caption do CTA + FAQ #4 + #7 | "Cobrança via Stripe (mesma plataforma da Apple, Spotify). Recibo automático por email. Sem taxa de adesão". Stripe = trust automático. |
| 8 | **"Não vou conseguir trocar o café se enjoar"** | Configurador (opção "Casa escolhe" + SKU) + FAQ #8 | "Troque o café entre ciclos pelo portal. Quer Bourbon esse mês e Catuaí o próximo? 2 cliques". |

**Princípio de UX aplicado:** cada objeção tem **redundância de resposta** — aparece em pelo menos 2 lugares na página. Isso cobre quem rola rápido (vê garantia) e quem investiga (vê FAQ).

**FAQ — primeira pergunta aberta por default:** "Como cancelo a assinatura?" Esta é a pergunta mais procurada do segmento (validado por Reclame Aqui). Abrir por default é honestidade militante e converte mais que esconder.

---

## 6. Microcopy crítica

### Headlines / H1
- **H1 (hero):** `Café especial torrado na semana, em casa.` (italic em "torrado na semana"). Captura keyword + entrega promessa em 7 palavras.
- **Alternativa A/B testar:** `Sua próxima xícara, torrada esta semana.` (mais íntimo, menos SEO)

### Subheadlines / lede
- `Quinzenal ou mensal. Pause quando quiser. Frete grátis. Cancele em 1 clique.` — 4 garantias em 1 frase.

### Eyebrow
- `ASSINATURA · DAL 1897` — herança + categoria de produto.

### Botões / CTAs
| Contexto | Texto | Por quê |
|---|---|---|
| CTA configurador hero | `COMEÇAR A RECEBER` | Descreve o ato, não vende ("Assinar agora" é template SaaS) |
| CTA configurador final (#8) | `QUERO COMEÇAR — FRETE GRÁTIS` | Reforça benefício na segunda apresentação |
| Link quiz | `Não sei o que escolher. Faça o teste em 30s →` | Honestidade ("não sei" valida o sentimento) + tempo curto + seta editorial |
| Link FAQ aberta | `Como cancelo? — clique para abrir` | Convida transparência |
| Link "como funciona" (se houver scroll) | `Como funciona a curadoria →` | Transfere autoridade ao usuário cético |

### Labels do configurador
| Label | Texto | Notas |
|---|---|---|
| Frequência — opção 1 | `Quinzenal` | sem "a cada 15 dias" — mais limpo |
| Frequência — opção 2 | `Mensal` | sem "a cada 30 dias" |
| Café — opção default | `Deixe a casa escolher` | imperativo amigável, alinhado a "A casa escolhe. Você recebe." |
| Café — opções nominais | `Pacote Família — 500g grãos` etc. | nome + formato em 1 linha |
| Moagem — label do grupo | `Moagem` | não "Tipo de moagem" — redundante |
| Moagem — opções | `Coador (V60, melita)` `Espresso` `Prensa francesa` `Moka italiana` | método entre parênteses — ajuda quem não conhece o nome técnico |
| Linha total | `Total por envio` | não "Subtotal" (frio) |
| Linha sub-total | `Equivale a R$X/kg · livre de frete` | mono, desambigua o cálculo |
| Linha economia | `Economia anual vs. avulso: R$X` | mono, discreta, em verde-oliva |
| Caption legal | `Cobrança via Stripe. Cancele pelo portal sem ligar.` | menciona Stripe (trust) + nega o trauma "ligar para cancelar" |

### Mensagens de transição
| Momento | Texto | Tom |
|---|---|---|
| Recálculo de preço (aria-live) | `Total atualizado: R$X,XX por envio` | informativo |
| Hover de "Pause" no FAQ | `Pode pausar pelo portal Stripe. Sem perguntas.` | afirmativo |
| Erro de validação (CEP fora de área se aplicável) | `Ainda não entregamos no seu CEP. Avisaremos quando chegar lá. Quer cadastrar email?` | honestidade + saída |
| Confirmação pós-checkout | `Sua primeira torra começa amanhã. Você recebe em até 7 dias úteis.` | concreto, datado |

### Vocabulário banido nesta página
- "assinar agora" → usar "começar a receber"
- "experiência exclusiva" → usar "sua xícara, na sua casa"
- "torra fresca" sozinho (abstrato) → usar com data "torrado em DD/MM"
- "qualidade garantida" → usar "se não amar, devolvemos sem perguntar" (concreto)
- "premium" → mostrar com herança e fotografia, nunca dizer
- "cancele a qualquer momento" sozinho → usar "cancele em 1 clique pelo portal Stripe, sem ligar"

---

## 7. Trust signals essenciais

Em ordem de impacto na conversão (validado por análise de objeções):

### Tier 1 — visíveis acima da dobra (configurador / hero)
1. **"Pause ou cancele em 1 clique pelo portal — sem ligar"** com ícone de pausa. Combate a objeção #1 (cicatriz nacional).
2. **"Frete grátis em todo o Brasil"** com ícone de caixa. Remove cálculo mental.
3. **"Torra fresca, datada"** com ícone de chama. Concretiza a promessa central.
4. **"Primeiro envio com -15%"** com ícone de %. Empurra a decisão.
5. **Selo Stripe** discreto na caption do CTA — "Cobrança via Stripe (PCI DSS Level 1)".

### Tier 2 — visíveis no scroll
6. **Avaliações reais** (nome + cidade + método + nota + foto se possível) — mínimo 6 reviews na seção dedicada. Schema.org `Review` para rich result.
7. **"4 gerações · desde 1897"** no bloco história — autoridade que ninguém tem.
8. **"Cafés torrados em Treviso, da Serra do Cabral"** — geografia específica = legitimidade.
9. **Selo "Sem fidelidade · sem multa · sem mínimo"** abaixo do FAQ.
10. **"Devolvemos seu primeiro envio se não amar"** — garantia de risco zero (avaliar viabilidade operacional antes; se sim, é converter-killer).

### Tier 3 — discretos no rodapé da página
11. Logos de método de pagamento (PIX, Visa, Master, Amex, Apple Pay) — comuns no BR mas obrigatórios para confiança.
12. "Site protegido por SSL" — discreto, mas espera-se.
13. Link visível para `/termos`, `/privacidade`, `/entregas`.

### O que NÃO usar como trust signal
- Selos genéricos tipo "100% satisfação" — vazios, todo mundo usa.
- "+10.000 clientes felizes" sem comprovação — perigoso (exagero perceptível derruba toda a página).
- "Como visto na Veja/Forbes" se não for verdade.
- Selos de "ouro/prata/diamante" inventados pela própria empresa.

---

## 8. Mobile-first considerations (375px)

A página `/assinatura` será acessada **majoritariamente em mobile** (estimado 65–75% do tráfego, padrão de e-commerce BR). O configurador é o componente mais crítico em mobile.

### Configurador em 375px

```
┌─────────────────────────────┐
│ eyebrow                     │
│                             │
│ H1 (clamp reduz para        │
│  36-44px, 2-3 linhas)       │
│                             │
│ Lede (max 100% width)       │
│                             │
│ ─── 4 garantias stack ───   │
│                             │
│ link quiz                   │
├─────────────────────────────┤
│ ┌─ CONFIGURADOR ──────────┐ │
│ │ FREQUÊNCIA              │ │
│ │ [Quinzenal] [● Mensal]  │ │
│ │  (toggle 2 colunas       │ │
│ │   permanece — é só par) │ │
│ │                         │ │
│ │ CAFÉ                    │ │
│ │ [● Deixe a casa esc.]   │ │
│ │ [○ Pacote Família]      │ │
│ │ [○ Pacote Mesa]         │ │
│ │ [○ Pacote Coador]       │ │
│ │  (stack vertical, full  │ │
│ │   width, 64px altura)   │ │
│ │                         │ │
│ │ MOAGEM (condicional)    │ │
│ │ ... 4 opções stack      │ │
│ │                         │ │
│ │ ─── timeline ───        │ │
│ │  □─□─□  (3 dots, 280px) │ │
│ │                         │ │
│ │ Total por envio         │ │
│ │ R$ 76,42                │ │
│ │ Equivale a R$X/kg       │ │
│ │                         │ │
│ │ [COMEÇAR A RECEBER]     │ │
│ │  (full-width, 56px alt) │ │
│ │                         │ │
│ │ caption legal           │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Adaptações críticas
| Elemento | Desktop | Mobile (375px) |
|---|---|---|
| Layout | Split 50/50 (texto + configurador) | Stack vertical (texto em cima, configurador embaixo) |
| Configurador padding | 48px | 20px externo, 16px interno |
| Toggle frequência | 2 lado a lado (~50% cada) | Mantém 2 lado a lado — par natural |
| Cards de café | 4 stack vertical | 4 stack vertical, altura 56px cada (touch target ≥44px + ar) |
| Cards de moagem | 4 grid 2x2 | 4 stack vertical (2x2 fica espremido em 375px) |
| Timeline ciclo | Horizontal completa | Horizontal compactada — 3 dots, sem rótulos longos (apenas "+7d", "+37d") |
| Bloco total | Linha horizontal com label e valor | Stack vertical para legibilidade do número grande |
| CTA | Full-width do card | Full-width, altura 56px (vs 48px desktop) |
| Caption legal | 12px | 12px (mantém legível) |

### Sticky CTA mobile (decisão crítica)
Quando o usuário rolar para baixo do configurador, o **CTA "Começar a receber" deve virar sticky no rodapé** com fundo `--ink-soft` semi-transparente, **mostrando o total atual**. Razão: em mobile o configurador some do viewport rapidamente, e fazer o usuário rolar de volta para converter é fricção fatal.

```
┌─────────────────────────────┐
│  ... conteúdo normal ...    │
│  ... FAQ aberta ...         │
│                             │
├─────────────────────────────┤ ← borda hairline --line
│ R$ 76,42  [COMEÇAR A RECEBER] │ ← sticky bottom
└─────────────────────────────┘
```

Sticky aparece **somente em mobile**, **somente após scroll passar do configurador**, **desaparece quando o configurador #8 (segunda aparição) entra no viewport**. Implementação: IntersectionObserver.

### Outras notas mobile
- **Hero altura:** `auto`, **não 100vh** (já documentado na UI-SPEC).
- **Imagens:** AVIF + WebP fallback, `next/image` com `priority` apenas no LCP.
- **Hover states:** banidos em mobile (não tem). Substituir por `active:` states com feedback de 100ms.
- **FAQ accordion:** primeira pergunta aberta por default; demais clicáveis. Ícone +/− visível.
- **Anchor links:** botão "Ir direto para o configurador" no topo (visível para Persona C) com `scroll-margin-top: 80px` para compensar header fixo.

---

## 9. Quiz como funil alternativo — onde plugar sem distrair

O quiz já existe na codebase (`/quiz`) e é o funil-irmão para Persona B (indeciso). A questão UX é **onde aparecer na `/assinatura` sem competir com o configurador (CTA principal)**.

### Decisão: 3 pontos de entrada, em ordem de proeminência decrescente

#### Ponto 1 — Link sutil abaixo das garantias do hero (proeminente, mas tipográfico)
```
• Torra fresca, datada
• Pause/cancele em 1 clique
• Frete grátis em todo o Brasil
• Primeiro envio com 15% off

Não sei o que escolher. Faça o teste em 30s →
```
- **Tipografia:** sans 14px, weight 500, cor `--bone` (em dark) com underline 1px offset 4px.
- **Hover:** cor `--olive`, underline cresce para 1.5px.
- **Por quê aqui:** Persona B chega no hero, vê configurador, sente "muitas opções" e procura ajuda — o link está exatamente no campo visual periférico nesse momento.

#### Ponto 2 — Bloco editorial intermediário entre "O que entra na caixa" (#4) e "Frescor" (#5)
Bloco horizontal pequeno (~120px de altura), bg `--bone-soft`, com texto + CTA:
```
┌────────────────────────────────────────────────────┐
│  Em dúvida?                       [Fazer o teste]  │
│  4 perguntas. 30 segundos.                         │
│  Recomendamos o pacote certo para você.            │
└────────────────────────────────────────────────────┘
```
- **Por quê aqui:** quem rolou até essa altura ainda não converteu — provavelmente está investigando. Oferta assistida no momento certo.
- **CTA secundário** (ghost border `--ink`), não primário — não compete com configurador.

#### Ponto 3 — Pergunta da FAQ "Não sei qual pacote escolher"
A última pergunta do FAQ é exatamente essa, e a resposta é uma frase + link para o quiz:
```
Q: Não sei qual pacote escolher. O que vocês recomendam?
A: Para quem bebe 1 café por dia, o Pacote Família (500g) dura ~3 semanas
   e tem o melhor preço por kg. Se quiser uma recomendação personalizada
   em 30 segundos, faça o teste →
```

### O que NÃO fazer
- **Sem popup de quiz** após X segundos — é o padrão Coffee&Joy/Moka e queima a marca premium.
- **Sem CTA quiz no configurador** — competição direta com "Começar a receber".
- **Sem banner de quiz no topo da página** — ruído.
- **Sem quiz como passo obrigatório** antes do checkout — atrito letal.

### Métrica para validar
A/B testar: variante com quiz vs. sem quiz nas 3 posições. Hipótese: quiz aumenta conversão de Persona B em ~15%, sem afetar Personas A e C. Medir: CR geral, CR por entrada (configurador direto vs. configurador via quiz), tempo médio até checkout, taxa de bounce.

---

## 10. Resumo executivo — top 5 decisões UX que mais impactam conversão (250 palavras)

A página `/assinatura` da Zerbinatti é **pillar SEO e produto-âncora ao mesmo tempo**, e essa dupla função força arquitetura disciplinada — conversor visível imediatamente, conteúdo editorial profundo abaixo. Cinco decisões carregam o maior peso de conversão:

**1. Configurador no hero, não no rodapé.** Persona C (cliente retornando) e Persona A decidida convertem em <30s sem precisar rolar a página. Configurador inline com 4 controles (frequência, café, moagem condicional, total dinâmico) e timeline visual do ciclo. **Repetir o configurador uma segunda vez** após o conteúdo educacional para recapturar quem rolou para investigar.

**2. Mensal como default, "Casa escolhe" como default de café.** Persona B (cicatriz "café demais") sente segurança imediata; default "Casa escolhe" elimina paralisia da Persona A e abraça a brand direction ("a curadoria fica por nossa conta").

**3. Cancelamento como selo, não como letrinha.** "Pause ou cancele em 1 clique pelo portal Stripe — sem ligar" aparece como selo no hero, na caption do CTA, e como **primeira pergunta aberta por default** no FAQ. Combate diretamente a maior cicatriz do mercado BR (Reclame Aqui — Coffee Mais, iFood, Leiturinha).

**4. Sticky CTA mobile com total visível.** Em mobile (65-75% do tráfego), o configurador some do viewport rapidamente. Sticky bottom com preço + botão converte sem fricção de retorno.

**5. Quiz plugado em 3 pontos sutis (link tipográfico + bloco intermediário + última pergunta da FAQ), nunca em popup.** Atende Persona B sem queimar a marca premium nem competir com o conversor principal.

---

**UX Researcher:** Claude Opus 4.7
**Status:** pronto para handoff a UI Designer (wireframe → comp visual) e Frontend Developer (implementação).
**Dependências externas:** definição operacional sobre garantia de devolução do primeiro envio (Tier 2, item #10), cópia legal exata da política de cancelamento Stripe, captação de 6+ reviews reais para a seção de prova social, decisão sobre integração de quiz como modal embutido vs. página separada.
