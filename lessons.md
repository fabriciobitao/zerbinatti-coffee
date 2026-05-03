# Lições — Zerbinatti Coffee

Sessão 2026-05-03 (rebuild premium completo).

## Stack / build

- **Fraunces variable font no satori/ImageResponse quebra build** — usar `loadFraunces()` apuntando para jsdelivr causa `TypeError: Cannot read properties of undefined (reading '256')` porque satori precisa de TTF estáticos, não axes variáveis. Solução: cair para serif fallback do sistema no `opengraph-image.tsx`, ou hospedar TTF estático e referenciar.
- **Sanity exige `unsafe-eval` em CSP** — Studio embutido em `/studio` não funciona com CSP estrita. Solução: matcher condicional para `/studio` com CSP relaxada, ou aceitar `unsafe-eval` global. Optei pelo matcher.
- **Build em CI sem env vars** — apps que usam Sanity/Resend precisam de graceful degradation (instanciar cliente com `"placeholder"` projectId, gatear queries por `isSanityConfigured()`, `isResendConfigured()`). Sem isso, build falha em qualquer máquina sem `.env.local`.

## Arquitetura

- **Configurador da assinatura** começou dentro de `Subscription.tsx` (home). Quando precisei reusar em `/assinatura` (hero + 2ª aparição), tive que extrair pra `SubscriptionConfigurator.tsx` standalone. Lição: client components com lógica de estado que aparecem em mais de 1 lugar nascem standalone, não dentro de seções.
- **Quiz pré-preenche /assinatura via querystring** (`?cafe=...&freq=...`) — padrão simples e SSR-friendly. Configurador lê via `URLSearchParams` no mount.

## A11y / WCAG

- **`text-ink-mute (#736961)` sobre `bg-ink (#1B1714)` falha contraste** (ratio 2.0:1). Solução: token novo `--ink-mute-on-dark: #A39C92` (ratio 5.7:1). Sempre verificar contraste de meta/captions sobre fundos escuros — nunca repetir `text-ink-mute` em fundo dark.
- **NewsletterForm com fail silent** — marcava email como enviado mesmo se API falhasse. Sempre adicionar `error` state separado de `sent` state em forms.
- **Mobile menu sem Esc + focus trap** — todo menu modal precisa de `useEffect` com `keydown` listener pra Esc + focus trap + retornar foco ao trigger ao fechar.
- **Skip link + `id="main"`** — todo layout precisa, não só pra screen readers, mas pra navegação por teclado em listas longas.

## Workflow com agentes

- **Agentes em paralelo só funcionam em arquivos disjuntos.** Backend Architect (Sanity+Resend) e Security Engineer (rate limit+CSP) brigam por `package.json` e `next.config.ts`. Sequencial obrigatório.
- **Agent travado** — Security Engineer travou na 1ª invocação ao tentar fazer 9 tarefas grandes em uma transação. Solução: dividir escopo em 5a (security pura) + 5b (analytics+LGPD), instruir "trabalhe em batches pequenos, checkpoint a cada 3-4 arquivos".
- **UI Designer entregando spec densa (1.280 linhas) > Frontend Developer implementando** — fluxo dois-passos funcionou bem. Spec serve de contrato.

## Vocabulário / tom

- **Vocabulário banido** (Brand Guardian): paixão, jornada, experiência, premium, especial, mamma mia. Usar nomes próprios e ações concretas: "torra fresca", "casa italiana", "Serra do Cabral", "blend desde 1897".
- **Italic seletivo, mono pra info concreta** — Fraunces italic em destaques editoriais; JetBrains Mono em números, eyebrows, datas, coordenadas. Inter pra corpo. Não misturar.

## Decisões de produto

- **WhatsApp como canal de venda v1** — Brasil converte muito por WhatsApp em produto premium (Octavio, NB Coffee fazem assim). Stripe entra depois quando houver fluxo. Todos os botões "Comprar"/"Assinar" abrem WhatsApp via `NEXT_PUBLIC_WHATSAPP_NUMBER` com mensagem pré-preenchida — não é fallback, é a estratégia.
- **Produtos hardcoded em `src/lib/data/products.ts`** — 3 SKUs não mudam. Sanity é só pra conteúdo (Revista, páginas estáticas).
- **Barras horizontais 1-5 > radar SVG** pra perfil sensorial — radar é template SaaS e quebra tom editorial.
- **4 modelos B2B visualmente idênticos** — diferenciação cromática Bronze/Prata/Ouro/Platina é cliché Nespresso. Hierarquia comunicada por ordem e faixa de equipe em mono italic.

## Git / deploy

- **Commit + push após cada agent entrega** — não acumular. Vercel deploya automático. User vê resultado imediato.
- **Subagentes são caros** — usar pra trabalho real, não pra leituras simples (Read direto resolve).
