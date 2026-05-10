# Licoes — Zerbinatti Coffee

Registro de erros corrigidos pelo user. Ler no inicio de cada sessao junto com `PROGRESS.md`. Objetivo: nunca repetir o mesmo erro.

---

## Operacao / Deploy

- **AI NAO faz deploy automatico neste projeto.** Push pra `main` ok. `gcloud builds submit` / `firebase deploy` / `gcloud run deploy` so quando o user pedir explicitamente. Owners do GCP sao `fabiomenezes@gmail.com` e `fabricio.fazer@gmail.com`; minha conta `fabio.menezes@orchestra.lat` nao tem permissao no projeto `zerbinatti-cafe`.

- **Nunca matar `node.exe` global no Windows.** `taskkill //IM node.exe` encerra o proprio Claude Code junto. Sempre matar por PID especifico (`Get-Process node | Where-Object { ... } | Stop-Process -Id`).

- **Nunca redimensionar/maximizar/mover janela do browser ao tirar screenshot.** Capturar a tela primaria como esta. Se a janela alvo nao estiver visivel, pedir pro user trazer pra frente — nunca usar `MAXIMIZE`/`SetForegroundWindow` em outras janelas (quebra layout snap/split do Windows e tira o Claude de view).

## Infra GCP / Firebase

- **Custom domain via Firebase Hosting exige DNS-only no Cloudflare.** Proxy laranja quebra o SSL handshake do Let's Encrypt — sempre cinza (DNS only) pros A `199.36.158.100` e TXTs.

- **Firestore em Cloud Run precisa de `preferRest: true`.** gRPC do Firestore nao funciona no ambiente do Cloud Run; sem `preferRest` o request trava ate timeout.

- **Projeto GCP correto e `zerbinatti-cafe` (sem sufixo).** A duplicata `zerbinatti-cafe-ece93` foi criada por engano em paralelo — nunca usar. Marcada pra delete (some em 30 dias).

## Conteudo / Copy

- **Altitude da Fazenda Zerbinatti: 640–760m.** Nao inventar/usar valores antigos como "1100m" ou "800m". Conferir em todo lugar (Hero, Fazenda, products, articles).

- **Nome da fazenda: "Valim Farms" (com `s`).** PT/EN/ES — manter consistente em todo conteudo.

- **Terceira geracao: "Wilson Valim Zerbinatti".** Nao confundir nem abreviar.

- **Marca no `og:site_name`: "Zerbinatti" (sem "Coffee").** Descricoes em portugues como default.

- **Acentos em portugues sao obrigatorios em UI/labels.** `serviço`, `negócio`, `próximo`, `começar`, `disponível`, etc. So omitir acento em **identificador de codigo** (variavel, classe, funcao).

## Mobile / UX

- **Inputs em mobile precisam ter font-size >= 16px** pra evitar zoom-in automatico no iOS. Vale pra `input`, `select`, `textarea` em <=640px.

- **Targets touch >= 44x44px.** WCAG / Lei Brasileira de Inclusao. Vale pra `icon-btn`, `add-btn`, links de navegacao.

- **Body precisa `overflow-x: hidden` + `max-width: 100vw`** pra evitar scroll horizontal acidental em mobile (sobretudo com elementos posicionados absolutamente).

- **Toggle de idioma em mobile mostra a bandeira do "outro" idioma**, nao a do idioma atual. Bandeira fixa "EN" sempre visivel quando o user ja esta em EN nao da affordance de volta — vira beco sem saida. Regra: se locale=en mostrar PT (volta), se pt/es mostrar EN (vai). Mesma logica pra qualquer toggle binario de idioma compacto.

## Dev / Build

- **React/Babel inline JSX so carregam em `localhost` ou `?dev=1`.** Em producao causa CSP error e quebra a pagina. Wrapping com `if` no `<script>` antes de injetar.

- **Next.js 16: `middleware.ts` ja foi deprecated**, agora chama `proxy.ts`. Renomear quando possivel pra remover warning de build.

## Debugging

- **Antes de culpar cache, verificar overrides hardcoded.** Em 2026-05-08 perdemos 1h investigando ISR/CDN/webhook de revalidacao porque a home nao refletia preco editado no Shopify. Causa real: `priceOverrideBRL` em `src/lib/editorial/classico.ts` sobrescrevia silenciosamente o preco da Storefront API. Sintoma: tudo cacheado/invalidado certo, API retorna preco novo, mas o renderer pega override. Regra: quando dado nao reflete origem, **grep por hardcodes do valor antigo no codigo ANTES de deploy/rebuild**.

## Documentacao

- **Comunicacao em portugues; codigo em ingles.** Se o projeto ja usa portugues no codigo, continuar — mas sempre **sem acentos** em identificadores (`Configuracao`, nao `Configuração`).

- **`PROGRESS.md` na raiz fica atualizado.** Sempre ler no inicio da sessao e atualizar ao final. Data dentro do arquivo, nao no nome.

- **`lessons.md` (este arquivo)** atualiza toda vez que o user corrige um erro. Lista simples, sem enrolacao, com a regra explicita pra nao repetir.

## Seguranca

- **Nunca push de PII no `dataLayer`/GA4.** Email, CPF, CNPJ, telefone, nome completo nao podem ir nem em parametros customizados nem em `user_properties` (LGPD + termos GA4). Auditado em `src/lib/analytics/dataLayer.ts` — manter assim. `pushLead` aceita so flags categoricas (segment, volume, form_name, method).

- **CSP `'unsafe-inline'` em script-src e necessario hoje** pelo bootstrap inline do GTM (`<Script id="gtm-init">`). Migracao pra nonce em backlog — custo alto (middleware + `next/script` propagation + cache invalidation em SSG/ISR) vs ganho marginal. Qualquer `dangerouslySetInnerHTML` novo: usar so constantes/i18n ou JSON.stringify com escape de `</`.

- **Secrets nunca em env var Cloud Run em texto claro.** Sempre via Secret Manager + `--update-secrets=NAME=secret-id:latest`. Vale pra `SHOPIFY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEWSLETTER_SECRET`.

- **Cloud Run nao roda com SA default Compute (`roles/editor`).** Sempre criar SA dedicada (`zerbinatti-coffee-runtime@`) com so as roles necessarias: `roles/datastore.user` (Firestore) + `roles/secretmanager.secretAccessor`.

- **Forms publicos protegidos por Turnstile invisible.** Honeypot fura com Puppeteer basico — nao confiar so nele. Site key publica em `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, secret em `TURNSTILE_SECRET_KEY` server-only. Verifier em `src/lib/turnstile.ts` (no-op se secret ausente, pra dev).

- **Newsletter exige double opt-in (LGPD).** Status `pending` no Firestore -> email Resend com link HMAC -> `/api/newsletter/confirm?email=&token=` valida `timingSafeEqual` -> ativa. `NEWSLETTER_SECRET` 32+ chars.

- **Logs de erro em prod: so `message` + `errorId` UUID.** Nunca stack trace completo (vaza paths internos, nomes de funcoes). `errorId` retorna no JSON pra correlacionar com Cloud Logging.

- **`public/novo-layout/index.html` foi deletado** (legacy v1 nao servido por rota mas acessivel em `/novo-layout/index.html` — superficie de ataque desnecessaria). `para-empresas.html` mantem ate Wave D migrar pra React.
