# Ideias de Expansão — Tech, Vendas, Escola (Zerbinatti)

Data: 2026-04-17
Base: Plano Onda 5-6-7 + insights dos 3 agentes

---

## EIXO 1 — Tecnologia/Desenvolvimento

Ideias que exploram IA moderna e engenharia para criar diferenciação real.

### Alta prioridade (moat técnico)

1. **IA Recomendadora com embeddings sensoriais** — não o quiz estático atual. Cada café vira vetor (acidez, doçura, corpo, origem, processo). Cada cliente vira vetor (histórico + preferências). Recomendação por similaridade. Aprende a cada compra. Roda em Vercel edge.

2. **Chatbot "Mestre de Torra"** — RAG sobre arquivo histórico da casa + fichas técnicas + receitas. Cliente pergunta "qual café combina com bolo de laranja?" ou "como faço Aeropress com Casa 03?". Claude Haiku via API, custo baixo, experiência única no BR.

3. **App PWA com offline-first** — receitas e brew guides funcionam sem internet (cozinha tem sinal ruim). Notificações "seu café vai acabar em 3 dias baseado no seu ritmo". Instalável no celular sem app store.

4. **Digital Product Passport por lote** — cada sacola com QR/NFC leva a página verificável: fazenda, data de torra, mestre responsável, resultado de cupping, rastreio. Padrão que vira obrigatório na UE em 2027 — Zerbinatti chega antes.

5. **Integração com balança smart (Acaia, Fellow)** — WebBluetooth API guia extração em tempo real no navegador. Cliente vê barra de progresso enquanto pesa água. Zero marca no BR faz.

### Média prioridade

6. **OCR do arquivo histórico** — digitalizar cadernos de torra dos 1940s com Vision AI, criar busca full-text "receita de café do avô". Conteúdo SEO infinito + autoridade.

7. **AR na embalagem (WebXR)** — cliente aponta câmera do celular para sacola, vê vídeo do produtor sobreposto. Sem app. Funciona no Safari iOS 17+.

8. **Predict-and-ship ML** — algoritmo prevê quando assinante vai precisar de café próximo (baseado em consumo + clima + feriados) e dispara entrega antes de acabar. Netflix-style para café.

9. **API pública Zerbinatti** — cafeterias parceiras exibem origem/rastreio dos cafés Zerbinatti no próprio menu digital. Vira standard da indústria.

10. **"Now Listening" dinâmico** — playlist Spotify curada por café da temporada (inspiração Onyx). Embed na PDP. Toca na cafeteria parceira via integração Spotify for Business.

### Stack sugerido

- Manter Next.js 16 + Tailwind v4.
- Adicionar: Claude API (Haiku para chat, Sonnet para recomendação), Vercel AI SDK, Upstash Vector (embeddings), Resend (email), Shopify Storefront (quando pluggar), Sentry (observabilidade), PostHog (analytics comportamental além do GA4).

---

## EIXO 2 — Vendas (mecânicas comerciais)

### Alta prioridade (receita rápida)

1. **Kit degustação "3 Cafés da Casa"** — 3 sachês de 60g curados, R$59 com frete incluso. Gateway para assinatura. Menor atrito de compra do site. CTA primário no quiz.

2. **Gift subscription (presente pré-pago)** — 3, 6 ou 12 meses pré-pagos, caixa-presente numerada, card manuscrito. Ticket médio 3-5x maior. Sazonalidade: Dia dos Pais, Natal, Dia das Mães.

3. **Programa "Indica um Amigo"** — você recebe 1 saco grátis quando seu indicado fizer a 2ª compra. Amigo ganha 20% off na 1ª. Loop viral clássico, ainda funciona.

4. **Natal B2B corporativo** — kit presente corporativo com ficha de cada café + mini-cronologia Zerbinatti + cartão personalizável. Vendido a RHs de empresas premium. Tíquete alto (R$150-300/cesta), volume previsível.

5. **Bundle método completo** — café + V60/Aeropress + moedor Hario + filtros. Entrada única para novato técnico. Curadoria de marcas premium (comissão de revenda).

### Média prioridade

6. **Café Office (comodato)** — plano mensal para escritórios: equipamento em comodato + grãos mensais + treinamento de barista interno. Trava cliente B2B por 24 meses.

7. **"Servimos Zerbinatti" (programa cafeterias)** — selo físico + listagem no mapa do site + kit de marketing para cafeteria parceira. Demanda vai pro site. Win-win.

8. **Pré-venda de safra** — abrir reserva 90 dias antes da chegada do microlote. Cliente paga antecipado, recebe quando pronto. Financia fluxo, cria antecipação.

9. **Cashback Zerbinatti** — 10% do valor da compra volta como crédito. Aumenta LTV sem queimar margem com desconto direto.

10. **Gift card heráldico** — embalagem numerada com monograma Z, ativação instantânea via email. Presente "sem medo de errar o gosto". Alto volume em datas comemorativas.

### Anti-movimento (NÃO fazer)

- **Black Friday com desconto** — entra em contradição com posicionamento premium. Alternativa: "Na Black Friday, a casa mantém o preço justo. Nosso café não é commodity." Comunicar é marketing gratuito.
- **Marketplace (Mercado Livre, Amazon)** — mata margem, destrói brand equity, commoditiza. Lote 7 faz, não deveria fazer.

---

## EIXO 3 — Escola (Academia Zerbinatti)

Escola é o jogo longo — transforma cliente em evangelista e justifica preço premium através de autoridade. Academia do Café (BH) já provou que o modelo funciona no Brasil.

### Alta prioridade (autoridade + SEO)

1. **Curso "Cafeologia Zerbinatti" (grátis, 10 aulas, 5 min cada)** — série em vídeo curto, na voz da família, gratuita após email. Leva do zero ("o que é SCA?") ao médio ("harmonização com comida"). Gera emails qualificados + autoridade.

2. **Newsletter educativa semanal** — 6 semanas de onboarding automatizado após cadastro: 1 email por tema (origem, torra, moagem, extração, harmonização, degustação). Conversão pós-onboarding 3-5x maior.

3. **Podcast "A Mesa dos Zerbinatti"** — 20-30 min, quinzenal, entrevistas com produtores parceiros, baristas brasileiros, chefs, sommeliers. Distribuição: Spotify, Apple Podcasts, YouTube. SEO + autoridade + backlinks.

4. **Biblioteca histórica aberta** — arquivo digital dos cadernos 1897-presente, navegável, buscável. Conteúdo único no mundo. Jornalistas de gastronomia citam, imprensa cobre, backlinks de qualidade.

### Média prioridade

5. **Masterclass paga com mestre de torra (1x/mês, Zoom)** — R$150-250, 15 vagas, 2h. Receita direta + comunidade + prova social.

6. **Workshop presencial na torrefação (São Paulo)** — tour + cupping + almoço italiano da família. R$300-500. Turismo de marca. Experiência WOW que gera conteúdo UGC.

7. **Universidade Zerbinatti (B2B)** — treinamento pago (ou incluso em plano enterprise) para baristas de cafeterias/hotéis parceiros. Certificado "Barista Zerbinatti". Vira critério de contratação no setor.

8. **Ebook/livro da história** — "Zerbinatti: 128 anos de café no Brasil". Publicado em parceria com editora reconhecida. SEO imbatível + autoridade + presente premium para assinantes top.

9. **Programa "Adote um produtor"** — assinante escolhe fazenda parceira, recebe só de lá por 6 meses, tem call anual com o produtor. Conexão emocional profunda.

10. **Série de mini-documentários** — "O Dia da Colheita", "A Torra de Inverno", "A Primeira Safra do Neto". 4-6 min cada, formato cinematográfico. YouTube + site. Vai viralizar se bem feito — só existe um café com 128 anos de história filmável.

---

## Síntese: as 5 apostas com maior ROI

Se tiver que escolher 5 de todos os eixos combinados:

1. **Kit degustação R$59** (Vendas) — gateway de conversão, menor atrito, começa a movimentar caixa rápido.
2. **IA Recomendadora com embeddings** (Tech) — diferencial técnico que Onyx e La Cabra não têm. Base pra tudo depois.
3. **Newsletter educativa 6 semanas** (Escola) — automação que aumenta LTV sem esforço recorrente.
4. **Gift subscription pré-pago** (Vendas) — ticket 3-5x maior, entrega em datas sazonais.
5. **Podcast "A Mesa dos Zerbinatti"** (Escola) — autoridade + SEO + conteúdo reaproveitável em todo canal.

Essas 5 juntas constroem: funil curto (kit) + engine de retenção (IA + newsletter) + expansão de ticket (gift) + autoridade longa (podcast).

## Próxima conversa

Para avançar, preciso escolher entre:

- **Foco defensivo:** Onda 5 (fundamentos) + Kit + Newsletter. Executar em 4 semanas.
- **Foco ofensivo:** Onda 5 em paralelo com Chatbot Mestre + Podcast setup. 6-8 semanas, mais ambicioso.
- **Foco B2B:** Onda 5 + Café Office + Universidade Zerbinatti. 8 semanas, mais receita previsível.
