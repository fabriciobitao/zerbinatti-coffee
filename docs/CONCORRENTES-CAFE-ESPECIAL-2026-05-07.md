# Pesquisa de Concorrentes — Café Especial Brasil

**Projeto:** Zerbinatti (zerbinatticoffee.com)
**Data:** 2026-05-07
**Escopo:** Mapeamento de e-commerces de café especial brasileiros, com foco em produto, pagamento, frete e experiência de site.
**Metodologia:** WebFetch + WebSearch nos sites oficiais. Dados não confirmados marcados como "N/D".

---

## 1. Sumário Executivo

- **O mercado de café especial brasileiro online é dominado por marcas com forte storytelling de produtor/fazenda, mas a maioria peca em UX e checkout.** Orfeu (VTEX) e Moka Clube (Shopify) estão à frente em maturidade de e-commerce; Coffee Lab usa Iluria (legado) e Academia do Café usa Wix — gap claro de qualidade técnica.
- **Faixa de preço por 250g de café especial top-tier varia de R$ 59 a R$ 247.** Lucca posiciona-se em R$ 59–129; UM Coffee Co em R$ 82–247 (incluindo nanolotes); Academia do Café em R$ 69–155; Wolff em R$ 30–40; Orfeu em R$ 42 (clássico) com microlotes premium até centenas de reais. Zerbinatti está em R$ 39,90 (250g moído) — abaixo da média do segmento premium.
- **Pix, parcelamento e múltiplos métodos de pagamento são citados em poucos sites de forma transparente.** Maioria não exibe métodos no site público — só no checkout. Moka Clube oferece "até 5x sem juros" sem citar Pix; Orfeu oferece "3x sem juros". Existe um gap de transparência de pagamento como diferencial.
- **Frete grátis acima de R$ 199 é o padrão de mercado** (Moka Clube, Orfeu plano 1). Alguns oferecem frete grátis apenas via assinatura (Lucca Descobertas/Sublime, Wolff Club, Moka Clube). Daterra **não vende direto ao consumidor no Brasil** — opera via revendedores (gap enorme).
- **Clube de assinatura é hoje quase obrigatório.** Todos os concorrentes top têm: Orfeu (3 planos R$ 175/350/435 + Confraria R$ 124), Lucca (3 planos R$ 69/169/299), Moka (R$ 119–199), UM Coffee (R$ 90 para 2 pacotes), Wolff Club. Zerbinatti já possui — está alinhado. Diferenciação está nos detalhes (customização, presentes, conteúdo).
- **Multi-idioma é raríssimo.** Apenas Daterra (PT/EN/ES/JP) — e nem vende online. Ninguém atende internacional via e-commerce. **Maior gap competitivo identificado:** um e-commerce premium PT/EN/ES com checkout internacional captaria audiência de turistas, comunidade de coffee lovers global e exportação direta.
- **Notação sensorial completa (SCA score + altitude + processo + variedade) é apresentada de forma fragmentada.** Daterra é a melhor em ficha técnica (mas só B2B). Lucca e Orfeu listam notas de prova mas omitem altitude/SCA na ficha do produto. **Oportunidade clara: padronizar uma "ficha de cupping" completa em cada SKU.**

---

## 2. Tabela Comparativa Master

| Marca | SKUs visíveis | Faixa preço (250g) | Tamanhos | Moagens | SCA na ficha | Assinatura (mensal) | B2B | Plataforma | Pix exibido | Parcelamento | Frete grátis | Idiomas |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Coffee Lab** (loja.coffeelab) | ~15 cafés + cápsulas + cursos | R$ 39–134 | 250g, cápsulas | Grão e moído | Não | Não (apenas cursos) | Sim (consultoria) | Iluria (legado) | Não exibe | N/D | N/D | PT |
| **Octavio Café** | ~10 (microlotes 200g + linha 250g/500g) | N/D na home | 200g, 250g, 500g, cápsulas | Grão e moído | Não | N/D | N/D | N/D (loja.octaviocafe) | N/D | N/D | N/D | PT |
| **Suplicy** | N/D (loja inacessível em testes) | N/D | N/D | N/D | N/D | N/D | Sim (cafeterias, app Visa) | N/D | N/D | N/D | N/D | PT |
| **Orfeu** | 67 produtos em 8 categorias | R$ 42,50 (clássico) – centenas (microlotes) | 250g, 1kg, 4kg, kits | Grão, moído, cápsulas, drip, ESE | Não na ficha; menciona "80+ pts" | 3 planos: R$ 175 / 350 / 435 + Confraria R$ 124 | Sim | **VTEX** | N/D | 3x sem juros | Sim, por plano (SP/RJ → Brasil) | PT |
| **Daterra** | ~50+ rótulos (3 linhas: Masterpieces, Collection, Classics) | N/D em BRL (B2B) | Penta Box, Penta Bag, Poly Bag | N/D | **Sim (80–89+)** | Não vende direto | **B2B/exportação only** | Site institucional WordPress | N/A | N/A | N/A | **PT/EN/ES/JP** |
| **Wolff Café** | 4 cafés (W0/W1/W2/WR) + drips + cápsulas | R$ 30–40 | 250g, 500g, 1kg | Grão e moído | N/D | Wolff Club (preços N/D) | N/D | N/D (loja própria, certificado expirado em 1 fetch) | N/D | N/D | Via Club | PT |
| **Lucca Cafés Especiais** | 20 cafés (18 single origin/microlote + 2 blends) | R$ 59–129 | 250g | Grão + moagem por método (V60, Moka, Prensa) | Não na ficha; "80+ SCA" | 3 planos: Essencial R$ 69 / Descobertas R$ 169,90 / Sublime R$ 299,90 | Sim (Lucca Torrefação) | WooCommerce (inferido) | N/D | N/D | Sim (planos Descobertas/Sublime) | PT |
| **UM Coffee Co** | ~15 (Blend, Varietais, Microlotes, Nanolotes) | R$ 82–247 (nanolotes) | 250g | Grão e moído | N/D | 1 ou 2 pacotes/mês (R$ 90 para 2) | N/D | **Shopify** | Não (cartão + Apple/Google Pay) | N/D | N/D | PT |
| **3 Corações Rituais** | 4 SKUs (linha Rituais 85+ SCA) | N/D | N/D | N/D | **Sim (85+)** | Via Mercafé | Sim (TRES Para Empresas) | Mercafé (próprio) | N/D | N/D | N/D | PT |
| **Academia do Café** | ~15 cafés + acessórios premium | R$ 62–155 (cafés); até R$ 3.300 (moedor C40) | 180g, 250g | N/D | Não | N/D | N/D | **Wix** | N/D | N/D | "Varia por região" | PT |
| **Moka Clube** | ~30 (microlotes + 1kg) | R$ 68–129 | 250g, 1kg, 50g (samples) | Grão + 4 moagens | "84+ SCA" | R$ 119–199 (500g/1kg) | N/D | **Shopify** | Não exibido | Até 5x sem juros | Sim, R$ 199+ (S/SE) | PT |
| **Coffee Mais (Coffee++)** | ~10 microlotes + cápsulas | N/D na busca; R$ 39–69 estimado | 250g | Grão e moído | N/D | N/D | N/D | **Shopify** | N/D | N/D | Via Amazon Prime | PT |
| **Zerbinatti (atual)** | 2 SKUs (Clássico moído + grão) | R$ 39,90 (250g) / R$ 69,90 (500g) | 250g, 500g | Grão e moído | **Sim (84,75)** | Sim (R$ 98,82–188,73/mês com 10% off) | Sim (Para Empresas) | **Custom (Next.js/Cloud Run)** | N/D | N/D | Sim, R$ 150+ | PT (com herança italiana visual) |

> **Notas:** "N/D" = não conseguimos confirmar publicamente. Vários sites (Suplicy, Octavio, Wolff parcialmente) bloqueiam crawlers ou usam plataformas com SSR pesado — isso por si só já é sintoma de stack defasada.

---

## 3. Análise por Dimensão

### 3.1 Produtos

**O que vemos no mercado:**

- **Profundidade de catálogo varia muito:** Orfeu lidera com 67 SKUs em 8 categorias (cafés, cápsulas, kits, drip coffee, ESE pods, presentes, microlotes, acessórios). Lucca tem 20 SKUs focados (90% single origin). UM Coffee Co tem ~15 com clara hierarquia: Blend → Varietal → Microlote → Nanolote.
- **Tamanhos:** 250g é padrão universal. 500g aparece em Octavio, Wolff, Zerbinatti. 1kg é diferencial para o cafeísta avançado (Orfeu, Wolff, Moka). Embalagens de 200g (Octavio microlotes) e 180g (Academia do Café) são vistas como nicho premium.
- **Moagens:** Padrão é "grão + moído". Lucca e Moka oferecem moagem **por método de preparo** (V60, Moka, Prensa Francesa, Espresso) — referência de UX. Wolff segue mesmo padrão.
- **Notação sensorial:** **Notas de prova** são quase universais (todos exibem). **Score SCA, altitude, processo, variedade** são fragmentados — Daterra é gold standard mas é B2B; Zerbinatti faz bem com 84,75 declarado. **Esse é o maior gap de conteúdo no segmento B2C.**
- **Categorias além de café:** Acessórios premium (moedores Comandante na Academia do Café, Hario na Orfeu); kits/presentes (Orfeu lidera com gift sets); cápsulas (Orfeu, Wolff, Octavio, 3 Corações via Mercafé/TRES).
- **Microlotes/nanolotes:** Diferencial premium. UM Coffee Co inova com "nanolotes" (R$ 247). Orfeu tem microlote premiado Cup of Excellence 2024 Geisha (320g em garrafa decorativa).
- **B2B:** Todos os players sérios têm canal B2B separado: Lucca Torrefação, TRES Para Empresas, Coffee Lab consultoria, Suplicy via app Visa para cafeterias.

### 3.2 Pagamentos

**Padrões observados:**

- **Métodos publicamente exibidos são rasos.** Maior parte dos sites não comunica métodos antes do checkout. Isso é uma falha de conversão conhecida no e-commerce brasileiro.
- **Pix não é destacado em nenhum site mapeado** — surpreendente, dado que Pix tem ~40% de share em e-commerce BR. Oportunidade clara.
- **Parcelamento:** Orfeu mostra "3x sem juros" na ficha do produto (boa prática). Moka Clube oferece "até 5x sem juros" em produtos selecionados. Coffee Lab cita "depósito em conta" (extremamente datado).
- **Carteiras digitais:** UM Coffee Co (Shopify) aceita Apple Pay e Google Pay — único confirmado.
- **Programas de fidelidade/cashback:** Não identificamos cashback. Descontos progressivos via assinatura (Orfeu: 15/18/20%, Moka: 15% off + frete grátis) substituem o conceito.
- **Cupons na home:** Moka Clube usa "QUEROCAFE" (15% off na primeira compra) — boa prática de captação.

### 3.3 Frete / Entregas

**Padrões:**

- **Correios é o backbone de 100% dos players** (citado explicitamente em Confraria Orfeu, Moka, Suplicy histórico). Jadlog e Loggi não foram identificados como diferenciais públicos.
- **Frete grátis:**
  - Moka Clube: R$ 199+ (Sul/Sudeste).
  - Orfeu: por plano de assinatura (R$ 175 → SP/RJ; R$ 350 → S/SE; R$ 435 → Brasil capitais).
  - Confraria Orfeu: SP/RJ apenas.
  - Lucca: planos Descobertas e Sublime.
  - Wolff: via Club.
  - Zerbinatti: R$ 150+ (mais agressivo que mercado).
- **Prazos:** Daterra cita "até 48h para grandes capitais" (referência histórica de 2017). Moka Clube faz envios mensais sincronizados. Confraria Orfeu envia até dia 24 do mês ou no mês seguinte (calendário fixo — boa para previsibilidade, ruim para urgência).
- **Política de devolução:** Lucca tem página dedicada ("Trocas e devoluções") mas detalhes não públicos. Maioria omite.
- **Embalagem premium:** Daterra Penta Box® (proprietária com nitrogênio) é referência mundial. Orfeu microlote premiado vem em "garrafa decorativa numerada à mão" (storytelling físico). Outros: embalagens com válvula degasificação (padrão de café especial), mas não comunicado de forma diferenciada.
- **Rastreamento:** Nenhum site comunica rastreamento como diferencial — provavelmente integração padrão Correios.

### 3.4 Experiência / Site

**Stack:**

| Plataforma | Quem usa | Nota técnica |
|---|---|---|
| **VTEX** | Orfeu | Robusto, customizado, mas pesado e complexo |
| **Shopify** | UM Coffee Co, Moka Clube, Coffee Mais | Ágil, moderno, bom para mobile |
| **WooCommerce** | Lucca (inferido) | Flexível mas legado |
| **Wix** | Academia do Café | Limitado, baixa performance |
| **Iluria** | Coffee Lab | Plataforma legada brasileira; fim de linha |
| **Mercafé (custom)** | 3 Corações | Próprio do grupo |
| **Custom/Next.js** | Zerbinatti | **Maior controle, melhor performance possível** |

**Mobile-first:** Não testamos performance, mas Shopify users (UM, Moka) têm vantagem nativa. Sites em VTEX e Wix tendem a ser pesados.

**Multi-idioma:** Apenas Daterra (PT/EN/ES/JP) — e não vende online. **Nenhum concorrente B2C oferece checkout em inglês ou espanhol.** Esse é o gap mais óbvio para Zerbinatti, que já tem identidade italiana.

**Storytelling de marca:**

- **Orfeu:** "café brasileiro mais premiado do mundo", 28x Cup of Excellence — narrativa de prêmios.
- **Daterra:** B Corp, carbon-negative, "fazenda laboratório" — narrativa de sustentabilidade e ciência.
- **Lucca:** "Georgia Franco, mestre de torra há 20+ anos" — narrativa de pessoa.
- **Coffee Lab:** Isabela Raposeiras é a marca — narrativa de personalidade (a mais forte do segmento, mas e-commerce fraco).
- **UM Coffee Co:** narrativa minimalista, foco em nanolotes e curadoria.
- **Moka Clube:** "Não é café gourmet" — narrativa antagonista educativa.
- **Zerbinatti:** "três gerações desde 1897", herança italiana, fazenda Valim — narrativa de tradição familiar (forte e diferenciada).

**Conteúdo educativo:**

- **Coffee Lab** lidera (escola própria de barista, jornadas de torra, cursos R$ 1.859–5.020).
- **Lucca Lab** (cursos SCA).
- **Octavio "Saberes do Café"** (blog).
- **Daterra** "News from the Farm".
- Maioria dos outros tem blog raso ou inexistente.

**Reviews/avaliações:** Não identificamos reviews públicas em nenhum dos sites principais. Gap de prova social.

---

## 4. Top 3 Referências (quem está fazendo melhor e por quê)

### 4.1 Orfeu — Líder em catálogo, autoridade e estrutura de assinatura

**Por quê:**
- 67 SKUs em 8 categorias (maior catálogo do segmento premium nacional).
- Estrutura de **3 planos de assinatura escalonados** (R$ 175/350/435) com benefícios progressivos (descontos crescentes + frete grátis por região).
- **Confraria Orfeu** (R$ 124/mês) é case de subscription premium: microlote exclusivo selecionado por Q-Graders, presente trimestral, acesso a fazenda após 1 ano, canal privado de comunicação.
- Brinde de boas-vindas (par de xícaras oficiais) — gatilho clássico de retenção.
- Plataforma VTEX com 3x sem juros visível na ficha.
- Storytelling sólido (Cup of Excellence, "café mais premiado").

**O que copiar:** Estrutura de tiers de assinatura com progressão de benefícios. Brinde de boas-vindas. Microlote exclusivo de assinante. Calendário de comunicação previsível.

### 4.2 Moka Clube — Referência em e-commerce nativo digital + assinatura mainstream

**Por quê:**
- Stack **Shopify** moderno, mobile-first, performático.
- Cupom de captação "QUEROCAFE" 15% off na home (boa prática de conversão).
- **15% off + frete grátis** no clube (proposta de valor clara).
- Customização de moagem por método de preparo (V60, Moka, Prensa, Espresso).
- Comunicação clara de pontuação (84+ SCA) e flexibilidade (cancelar quando quiser).
- "Não é café gourmet" — narrativa educativa antagonista que diferencia.
- Frete grátis R$ 199+ S/SE — limiar agressivo.

**O que copiar:** UX de seleção de moagem por método. Cupom de primeira compra. Frete grátis com limiar realista. Mensagem antagonista que educa o consumidor.

### 4.3 Daterra — Referência em ficha técnica, sustentabilidade e internacionalização

**Por quê:**
- **Ficha técnica completa por SKU:** SCA score (80–89+), processo, screen, melhor uso (espresso/drip), notas sensoriais detalhadas. **Maior rigor do mercado.**
- Embalagem proprietária (Penta Box®) com nitrogênio — diferenciação física.
- 3 linhas claramente segmentadas (Masterpieces 88+, Collection 86–89, Classics 80–86) — hierarquia de produto exemplar.
- B Corp, carbon-negative, Rainforest Alliance — narrativa ESG forte.
- Site em **4 idiomas (PT/EN/ES/JP)**.

**O que copiar:** Padrão de ficha técnica (SCA + processo + screen + altitude + best use). Hierarquia de linhas por pontuação. Multi-idioma (mesmo sem vender direto, comunica para audiência global). Storytelling de sustentabilidade.

**O que evitar:** Não ter e-commerce direto. Daterra deixa milhões na mesa por operar só B2B. Zerbinatti não deve repetir esse erro.

---

## 5. Gaps de Mercado (oportunidades de diferenciação)

1. **E-commerce multi-idioma com checkout internacional (PT/EN/ES).**
   - Zero concorrentes sérios atendem o turista internacional ou o brasileiro no exterior.
   - Café especial brasileiro é exportado mundialmente em B2B mas o B2C internacional via DTC é vazio.
   - **Ação:** Zerbinatti com Shopify Markets ou solução custom + Stripe pode capturar essa demanda.

2. **Ficha técnica completa e padronizada por SKU.**
   - Ninguém faz isso bem no B2C: SCA score + altitude + processo + variedade + produtor + safra + screen + descritor sensorial visual (gráfico radar) + recomendações de preparo.
   - Daterra faz mas não vende direto. Zerbinatti já comunica 84,75 — pode ser o primeiro a padronizar isso em todos os SKUs.

3. **Pix em destaque + Pix parcelado.**
   - Nenhum concorrente comunica Pix como diferencial. Pix parcelado (Pagaleve, Parcelex) ainda é raro. Mostrar "5% off no Pix" na home é gatilho conhecido de conversão.

4. **Reviews e prova social verificada.**
   - Nenhum site mapeado mostra reviews destacados. Coffee é altamente comparado por sabor — reviews com tags de descritor (chocolate/floral/frutado) seriam diferencial UX.

5. **Transparência de cadeia (rastreabilidade do grão).**
   - Daterra fala em "fully traceable" mas é abstrato. Zerbinatti com fazenda Valim única tem oportunidade de hyper-transparência: foto do produtor, vídeo da safra, lote específico, data de colheita por SKU.

6. **Conteúdo educativo embedded no produto.**
   - Coffee Lab e Lucca têm escolas separadas (cursos pagos). Ninguém embute mini-conteúdo educativo na ficha do produto (vídeo de 60s de preparo recomendado, guia de moagem por método).

7. **Frete grátis nacional acessível.**
   - Moka R$ 199+ só S/SE. Orfeu R$ 435+ para Brasil inteiro. Limiar nacional acessível (R$ 200–250) é vazio.

8. **Programa B2B self-service para escritórios e cafeterias pequenas.**
   - B2B atual é majoritariamente comercial-driven (e-mail, telefone). Self-service para escritórios pequenos comprarem 2–5kg/mês recorrente é gap claro.

9. **Embalagem premium contável como ativo de marca.**
   - Daterra Penta Box é case mundial. Orfeu garrafa decorativa Cup of Excellence é unboxing-worthy. Maioria usa embalagem genérica com válvula. Embalagem como mídia (QR code para vídeo, número de lote, "hand-signed") é sub-explorada.

10. **Loyalty / cashback verdadeiro.**
    - Apenas descontos via assinatura. Programa de pontos com resgate em café, acessórios ou experiências (visita a fazenda) é vazio.

---

## 6. Recomendações Estratégicas para o Zerbinatti

### 6.1 O que copiar (best practices comprovadas)

- **Tiers de assinatura escalonados (modelo Orfeu):** 3 planos com progressão de benefícios + plano premium estilo Confraria com microlote exclusivo. Atual Zerbinatti R$ 98–188 com 10% off pode evoluir para 3 níveis (R$ 89 / R$ 169 / R$ 299) com benefícios crescentes.
- **Cupom de primeira compra (modelo Moka):** Código exibido na home (ex: "PRIMEIRO15") com 15% off — gatilho universal de captação.
- **Customização de moagem por método (modelo Moka/Lucca):** Selector "Como você prepara?" → V60, Hario, Prensa Francesa, Moka Italiana, Espresso, French Press. Melhora UX e reforça seriedade técnica.
- **Brinde de boas-vindas (modelo Confraria Orfeu):** Xícara/copo Zerbinatti com primeira compra acima de X reais ou para novos assinantes.
- **Ficha técnica completa (modelo Daterra):** Padronizar em todos os SKUs: SCA score, altitude (m), processo, variedade, produtor, safra, screen, descritor sensorial (com gráfico radar), recomendação de preparo.
- **3x sem juros visível na ficha (modelo Orfeu):** Já é padrão Shopify/VTEX, basta ativar e exibir.

### 6.2 O que evitar (anti-patterns observados)

- **Plataforma legada (Iluria, Wix):** Coffee Lab (Iluria) e Academia do Café (Wix) têm marca forte mas e-commerce fraco. **Zerbinatti em Next.js/Cloud Run custom precisa decidir:** continuar custom (controle total, dívida técnica futura) ou migrar para Shopify Markets (multi-idioma + checkout robusto + apps prontos). Recomendação: Shopify Markets headless com frontend Next.js — melhor dos dois mundos, alinhado à decisão já registrada em memória do projeto.
- **Não vender direto (modelo Daterra):** Catastrófico para receita B2C. Não repetir.
- **Storytelling raso/genérico:** Octavio e Wolff têm produto bom mas comunicação genérica. Zerbinatti tem narrativa "1897 / 3 gerações / Itália / Valim" — explorar mais (fotos antigas, árvore familiar visual, vídeo do produtor atual).
- **Omitir métodos de pagamento:** Suplicy, Octavio, Wolff escondem. Comunicar Pix, cartão, boleto, parcelamento na home e ficha do produto.
- **Frete só via assinatura (modelo Confraria SP/RJ):** Frustra cliente avulso. Manter regra de R$ 150+ Zerbinatti, mas considerar limiar regional (R$ 120 SP/RJ, R$ 150 S/SE, R$ 200 Brasil).

### 6.3 Onde inovar (apostas diferenciadoras)

- **Multi-idioma e checkout internacional (PT/EN/ES) desde o dia 1.** Aproveitar identidade italiana (mercados Itália/Europa) + audiência hispana de coffee lovers + brasileiros no exterior. Stripe + Shopify Markets viabiliza. **Maior diferencial estrutural possível.**
- **Hyper-transparência de cadeia.** Cada saco de café com QR code linkando para: foto do lote, data de colheita, vídeo de 30s do produtor, certificado de cupping. Storytelling físico contínuo.
- **Pix em destaque com 5% off.** Banner home + selo na ficha. Combinar com Pix parcelado (Pagaleve) para tickets altos (microlotes).
- **"Coffee Atlas Zerbinatti":** mini-mapa interativo da fazenda Valim com lotes do ano + safra atual. Conteúdo evergreen + diferenciação visual.
- **Embalagem como mídia:** lote numerado à mão, data de torra, nome do torrador da semana. Unboxing instagramável.
- **Programa "Café no escritório" (B2B self-service):** plano para empresas (5kg/10kg/20kg mensal) com checkout self-service, NF-e automática e dashboard de consumo. Gap claro no mercado.
- **Reviews com tags de descritor sensorial:** cliente avalia "chocolatado/floral/frutado" + score, e site filtra produtos por perfil. UX inédita no segmento.
- **Conteúdo embedded:** vídeo de 60s de preparo recomendado por método dentro da ficha do produto (sem mandar para blog separado).

### 6.4 Priorização sugerida (ordem de impacto × esforço)

| Prioridade | Iniciativa | Impacto | Esforço |
|---|---|---|---|
| 1 | Ficha técnica completa padronizada (SCA, altitude, processo, variedade, descritor radar) | Alto | Baixo |
| 2 | Pix em destaque na home + ficha + cupom primeira compra | Alto | Baixo |
| 3 | 3 tiers de assinatura com progressão de benefícios + brinde boas-vindas | Alto | Médio |
| 4 | Selector de moagem por método de preparo | Médio | Baixo |
| 5 | Multi-idioma PT/EN/ES (Shopify Markets headless) | Alto | Alto |
| 6 | QR code de rastreabilidade + storytelling visual da fazenda Valim | Alto | Médio |
| 7 | B2B self-service para escritórios | Alto | Alto |
| 8 | Reviews com tags de descritor sensorial | Médio | Médio |
| 9 | Programa de loyalty/pontos | Médio | Alto |

---

## 7. Fontes

- [Coffee Lab — site principal](https://coffeelab.com.br) e [loja](https://loja.coffeelab.com.br)
- [Octavio Café](https://octaviocafe.com.br) e [produtos](https://octaviocafe.com.br/produtos)
- [Suplicy Cafés](https://www.suplicycafes.com.br) e [loja online](https://www.suplicycafes.com.br/loja-online)
- [Café Orfeu](https://www.cafeorfeu.com.br), [cafés](https://www.cafeorfeu.com.br/cafes), [Clube de Assinaturas](https://www.cafeorfeu.com.br/clube-de-assinaturas), [Confraria Orfeu](https://www.cafeorfeu.com.br/confraria-orfeu), [Microlote Premiado CUP 2024](https://www.cafeorfeu.com.br/microlote-premiado/p)
- [Daterra Coffee](https://daterracoffee.com.br), [Collection](https://daterracoffee.com.br/collection-daterra/), [Classics](https://daterracoffee.com.br/daterra-classics/), [Where to Find](https://daterracoffee.com.br/where-to-find/)
- [Wolff Café](http://www.wolffcafe.com.br/) e [Café W0](https://www.wolffcafe.com.br/cafe-w0/p)
- [Lucca Cafés Especiais](https://www.luccacafesespeciais.com.br), [cafés](https://www.luccacafesespeciais.com.br/cafes), [clube](https://www.luccacafesespeciais.com.br/clube)
- [UM Coffee Co](https://www.umcoffeeco.com)
- [3 Corações Cafés Especiais](https://www.3coracoes.com.br/marca/cafes-especiais/) e [Mercafé](https://www.mercafe.com.br/)
- [Academia do Café](https://www.academiadocafe.com.br) e [loja](https://www.academiadocafe.com.br/loja)
- [Moka Clube](https://www.mokaclube.com.br) e [assinatura](https://www.mokaclube.com.br/products/assinatura-de-cafe)
- [Coffee Mais (Coffee++)](https://coffeemais.com)
- [Zerbinatti — site atual](https://zerbinatti-coffee-259156177034.southamerica-east1.run.app/)
- [Tudo Sobre Café — 12 melhores clubes 2026](https://tudosobrecafe.com/clubes-de-assinatura)
- [BSCA — Cup of Excellence 2025](https://www.bsca.com.br/brasil-melhores-cafes-especiais-2025/)
- [Visa — App Suplicy](https://www.visa.com.br/sobre-a-visa/noticias-visa/nova-sala-de-imprensa/suplicy-cafes-especiais-lanca-solucao-de-pedido-e-pagamento-por-aplicativo.html)

