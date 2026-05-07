# Decisão final de e-commerce: Shopify Basic (headless via Next.js)

Data: 2026-05-07
Status: **Aprovada — seguir com implementação**

## TL;DR

- Plataforma: **Shopify Basic** (US$29/mês anual ou US$39/mês mensal)
- Modelo: **headless** — Next.js atual continua sendo o front; Shopify só backend de catálogo, pedidos e checkout
- Cobre BR + internacional sem precisar trocar de plataforma no futuro
- Substitui decisão anterior (Yampi) registrada em 2026-05-07 manhã — multi-idioma do site exigia plataforma global desde o dia 1

## Por que Shopify (e não Yampi, Snipcart ou outras)

O site é **multi-idioma desde a Onda 5 (PT/EN/ES)**. Isso significa que internacionalização não é "talvez no futuro" — é parte do produto. Plataformas BR-only (Yampi, Loja Integrada, Nuvemshop) forçariam migração em 12-18 meses. Snipcart tem boa UX headless mas falha em PIX/boleto/parcelamento BR. Shopify é a única que cobre os dois mundos sem replatform.

| Critério | Yampi | Snipcart | **Shopify Basic** |
|---|---|---|---|
| PIX, boleto, parcelamento BR | ✅ nativo | ❌ workaround | ✅ via Pagar.me |
| Multi-moeda automática | ❌ | ⚠️ limitado | ✅ |
| Multi-idioma por mercado | ❌ | ⚠️ manual | ✅ Shopify Markets |
| Vender pros EUA | ❌ | ⚠️ | ✅ |
| Headless (manter Next.js) | ❌ | ✅ | ✅ Storefront API |
| Path de upgrade sem trocar plataforma | ❌ | ❌ | ✅ Basic→Grow→Advanced→Plus |

## Trade-off aceito

**Custo maior que Yampi** (~R$10-14k/ano a mais), em troca de:
1. Resolver internacionalização sem replatform
2. Backoffice e ecossistema de apps mais maduros
3. Storefront API estável pra arquitetura headless
4. Checkout otimizado mundial (taxas de conversão superiores)

**Penalidade de 2% sobre vendas** (Shopify Basic cobra fee extra por usar gateway externo no BR — Shopify Payments não opera no BR). Cai pra 1% no Grow e 0,5% no Advanced. Em volumes ≥R$50k/mês, vale subir pra Grow.

## Arquitetura final

```
zerbinatti.com.br (Next.js 16 na Vercel — vitrine editorial atual)
    ↓ Storefront API GraphQL
Shopify Basic
    ├─ Catálogo (3 SKUs + assinatura via Shopify Subscriptions)
    ├─ Pedidos, clientes, estoque, fulfillment
    ├─ Mercados configurados:
    │   ├─ BR (BRL, PT)
    │   ├─ US (USD, EN)
    │   └─ LATAM (USD, ES)
    └─ Checkout hospedado em checkout.zerbinatti.com.br

Gateways:
    ├─ Pagar.me (BR — PIX 0,99% / cartão 3,19% + parcelamento / boleto)
    └─ Stripe (internacional — cartões USD/EUR)

Operação:
    ├─ Bling Cobre (R$33/mês — NF-e BR)
    ├─ Melhor Envio (BR — sem mensalidade)
    ├─ DHL Express / Correios Internacional (EUA/LATAM)
    └─ Klaviyo (email marketing PT/EN/ES — começa grátis)
```

## O layout do site se mantém 100%

Headless = Shopify é backend invisível. Toda a Onda 7 (tipografia editorial, HeraldicIcons, motion system, drop cap, pull quote, grão 3D, FlavorNav, duotone) **fica intacta**. O que muda é só a fonte de dados: `src/data/products.ts` (estático) → Shopify Storefront API (dinâmico).

A única página que **não é** Next.js é o checkout (passo final de pagamento + endereço). Shopify hospeda isso em `checkout.zerbinatti.com.br` com customização visual (logo, cores, fontes, monograma Z).

## Custo estimado ano 1 (100 pedidos/mês BR + alguns internacionais)

| Item | Valor |
|---|---|
| Shopify Basic (anual, 25% off) | ~R$1.850/ano |
| Bling Cobre (NF-e) | ~R$400/ano |
| Domínio + emails | ~R$300/ano |
| Klaviyo (até 250 contatos) | grátis |
| **Fixo anual** | **~R$2.550** |
| Gateways (variável, ~5-8% do faturamento) | conforme volume |
| Total estimado ano 1 | **~R$18-22k** |

vs Yampi (~R$8k ano 1) — diferença de ~R$10-14k justificada pelo cross-border.

## Path de upgrade dentro do Shopify (sem trocar plataforma)

```
Basic ($29/mês, 2% fee)
  ↓ quando faturar >R$50k/mês
Grow ($79/mês, 1% fee)
  ↓ quando ativar EUA de verdade (Markets Pro / Global-e)
Advanced ($299/mês, 0,5% fee)
  ↓ quando passar de R$2M/ano
Plus ($2.300/mês, 0,15% fee)
```

Migração entre planos: **2 cliques no admin**. Sem perda de dados, sem downtime, sem refatoração.

## Roadmap de implementação (4 semanas)

### Semana 1 — Setup Shopify
1. Ativar trial Basic (US$1/mês x 3 meses)
2. Configurar loja: nome, domínio, idiomas, moedas
3. Cadastrar 3 SKUs (Geração III, IV, e o terceiro) com fotos, descrições, variantes (250g/500g/1kg, moído/em grãos)
4. Configurar Shopify Markets: BR (BRL/PT), US (USD/EN), LATAM (USD/ES)
5. Conectar Pagar.me + Stripe como gateways
6. Configurar checkout customizado (logo, cores, monograma)

### Semana 2 — Integração headless
1. Criar Storefront API access token
2. Instalar `@shopify/storefront-api-client` no Next.js
3. Substituir `src/data/products.ts` por queries GraphQL ao Shopify
4. Atualizar ProductCard, PDP, FlavorNav, Comparar pra consumir dados Shopify
5. Implementar carrinho persistente via Shopify Cart API
6. Botão "Comprar" → redireciona pro checkout Shopify customizado

### Semana 3 — Operação BR
1. Conectar Bling Cobre via app Shopify (NF-e automática)
2. Conectar Melhor Envio (etiquetas BR)
3. Configurar emails transacionais em PT/EN/ES (Shopify nativo + Klaviyo)
4. Testar fluxo completo: pedido → pagamento → NF-e → envio → entrega
5. Configurar Shopify Subscriptions pra assinatura de clube

### Semana 4 — Operação internacional + soft launch
1. Conectar DHL Express ou Correios Internacional
2. Configurar duties/taxas estimadas no checkout (Markets básico)
3. Testar pedido teste US e LATAM
4. Configurar GA4 + Meta Pixel via Shopify
5. Lançamento soft pra lista de email atual
6. Monitorar primeiros pedidos reais

## O que não vai funcionar imediatamente (e tudo bem)

- **Markets Pro / Global-e (merchant of record nos EUA):** só no plano Advanced. No Basic, você é o vendedor de registro internacional — pode operar mas tem mais responsabilidade fiscal lá fora. Aceitar até crescer.
- **Relatórios profissionais:** Basic tem o essencial. Pra coorte, LTV avançado, custom reports — Grow+. Resolver com Looker Studio se precisar antes.
- **Mais de 2 staff accounts:** Basic limita a 2. Você é solo, ok por agora.

## Decisões pendentes (não bloqueiam o início)

- Adquirente final BR: Pagar.me vs PagBrasil vs Stone — comparar taxas após volume real
- App de assinatura: Shopify Subscriptions (nativo grátis) vs Recharge (US$99/mês acima de 100 pedidos) — começar com nativo
- ERP: Bling Cobre vs Tiny — Bling tem melhor app Shopify, decisão é Bling
- DHL vs FedEx vs Correios Internacional — comparar quando ativar EUA de verdade

## Próximo comando ao retomar (em outra máquina)

```bash
cd ~/dev/cafe
git pull
# Ler este doc + PROGRESS.md
# Iniciar Semana 1 do roadmap: ativar trial Shopify Basic
```
