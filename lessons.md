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

## Dev / Build

- **React/Babel inline JSX so carregam em `localhost` ou `?dev=1`.** Em producao causa CSP error e quebra a pagina. Wrapping com `if` no `<script>` antes de injetar.

- **Next.js 16: `middleware.ts` ja foi deprecated**, agora chama `proxy.ts`. Renomear quando possivel pra remover warning de build.

## Documentacao

- **Comunicacao em portugues; codigo em ingles.** Se o projeto ja usa portugues no codigo, continuar — mas sempre **sem acentos** em identificadores (`Configuracao`, nao `Configuração`).

- **`PROGRESS.md` na raiz fica atualizado.** Sempre ler no inicio da sessao e atualizar ao final. Data dentro do arquivo, nao no nome.

- **`lessons.md` (este arquivo)** atualiza toda vez que o user corrige um erro. Lista simples, sem enrolacao, com a regra explicita pra nao repetir.
