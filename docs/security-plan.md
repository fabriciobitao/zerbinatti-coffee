# Plano: Security Hardening — Zerbinatti Coffee

## Context

Auditoria de segurança do site (Next.js 16 + Cloud Run + Firebase Hosting + Shopify Storefront API) rodou em paralelo via 2 agentes (Security Engineer + Explore). Resultado: 1 P0 fora-de-escopo (token Admin Shopify vazado em git público — user decidiu aceitar o risco, repo é privado-de-fato com 2 devs), 8 itens P1/P2 dentro do escopo, e 5 itens P3.

**Decisões do user antes deste plano:**
- **Token shpat_55b2…** vazado em commits `5eb9314`/`e1d5fec` → aceito como risco residual (repo "público mas só 2 devs"). Sem revoke nem rewrite de histórico. Documentar.
- **Anti-spam:** Turnstile Cloudflare (user vai criar conta + me passar keys).
- **Git rewrite:** não.
- **Branch:** `security` (já criada a partir de main `35b5e06`).
- **Deploy:** AI não dispara em produção (regra do projeto). Implementação na branch + push; user roda `gcloud builds submit` quando aprovar.

**Outcome esperado:** branch `security` com hardening defensivo aplicado, build verde, validado em curl/test local; deploy fica pra você quando aprovar via merge na main.

---

## Achados consolidados

### Aceitos como risco residual (fora deste plano, decisão explícita)
- **R0a** — Token Shopify Admin `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` em git history. Decisão: aceito.
- **R0b** — `VERCEL_OIDC_TOKEN` em git history (já expirado). Decisão: aceito.

### P1 — Implementar agora
1. **Turnstile em `/api/b2b-form` e `/api/newsletter/subscribe`** — sem proteção real contra spam (honeypot fura com Puppeteer básico). Cada POST escreve Firestore + envia email Resend (custo $$ e reputation domain).
2. **`replyTo` no B2B controlado pelo atacante** — resolvido via Turnstile (#1).
3. **CSP wildcards desnecessários** em `next.config.ts:11,39-40` — `https://*.googletagmanager.com` e `https://*.google-analytics.com` abrem subdomínios arbitrários sem ganho.
4. **CSP `'unsafe-inline'` em script-src** — necessário hoje pelo GTM init inline. Mitigação: nonce-based onde possível, hash-based onde rota é estática.
5. **Newsletter sem double opt-in** — Firestore guarda emails sem confirmação. Risco LGPD se virar mailing list real.
6. **`/api/debug-shopify`** — rota de debug em prod sem auth. Verificar conteúdo e remover ou proteger.

### P2 — Implementar agora
7. **Hardcoded notify emails** em `src/app/api/b2b-form/route.ts:7` (`fabricio.fazer@gmail.com`, `fabiomenezes@gmail.com`) → mover pra env var `B2B_NOTIFY_EMAILS`.
8. **Stack traces em logs prod** (`b2b-form/route.ts:152`) — log só `message` + `errorId` UUID.
9. **`public/novo-layout/index.html`** (3.8k linhas) servido em prod sem necessidade (HTML legacy v1, não tem rota apontando). Deletar.
10. **Service account Cloud Run** — provavelmente default Compute SA (`roles/editor` global). Validar e criar SA dedicada com `roles/datastore.user` + `roles/secretmanager.secretAccessor`.
11. **Secrets em env var Cloud Run** (`SHOPIFY_WEBHOOK_SECRET`, `RESEND_API_KEY`) → mover pra Secret Manager + referência via `--update-secrets`.

### P3 — Backlog (registrar mas não implementar agora)
- **Webhook replay protection** via dedupe `X-Shopify-Webhook-Id` (precisa Upstash, user optou por só Turnstile).
- **postcss XSS** transitive (Next 16.x patch quando disponível).
- **HSTS preload** submission (`hstspreload.org`) — boa prática.
- **Documentar regra anti-PII no dataLayer** em `lessons.md` (auditado: hoje OK, mas registrar).
- **CORS rules** — OK por padrão Next; documentar.

---

## Plano de execução (faseado, branch `security`)

### Fase 0 — Setup
- Branch `security` já criada e pushed (commit base `35b5e06`).
- Confirmar build verde antes de mexer (`npm run build`).
- Pendência do user: criar conta Cloudflare Turnstile + gerar widget pra `zerbinatticoffee.com` + me passar `SITE_KEY` (público) e `SECRET_KEY` (privado). Posso fazer todo o resto em paralelo.

### Fase 1 — `/api/debug-shopify` (P1)
**1.1.** Ler `src/app/api/debug-shopify/route.ts` e ver o que retorna.
**1.2.** Decidir:
  - Se retorna info útil só pra dev: deletar (ou proteger com header secret `X-Debug-Token` que match env var server-side).
  - Se nunca foi chamado em prod: deletar e ponto.
**1.3.** Commit dedicado.

### Fase 2 — Turnstile em B2B + Newsletter (P1)
**2.1. Server-side validator** — criar `src/lib/turnstile.ts`:
  - `verifyTurnstile(token: string, ip: string): Promise<boolean>` — POST pra `https://challenges.cloudflare.com/turnstile/v0/siteverify` com `secret`, `response`, `remoteip`. Retorna true só se `success: true`.
  - Reusa CSP existente: `connect-src` já lista `https://challenges.cloudflare.com` (next.config.ts:43).
  - Se `TURNSTILE_SECRET_KEY` não setado, função retorna true (no-op em dev).

**2.2. Client widget** — criar `src/components/security/TurnstileWidget.tsx`:
  - `'use client'`, carrega script Cloudflare Turnstile via `next/script`, expõe callback `onToken(token: string)`.
  - Aceita prop `siteKey` (default = `process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY`).
  - Modo invisible (não-interativo).
  - `frame-src` em CSP já permite `https://challenges.cloudflare.com`.

**2.3. B2B form integration:**
  - `src/components/B2BForm.tsx` — adicionar `<TurnstileWidget />` + state `turnstileToken`. Bloquear submit sem token.
  - `src/app/api/b2b-form/route.ts` — extrair `body.turnstileToken`, chamar `verifyTurnstile()` no início. Falha → `403 turnstile_failed`.
  - Manter honeypot atual como camada extra.

**2.4. Newsletter integration:**
  - `src/components/home/NewsletterForm.tsx` — adicionar widget invisible.
  - `src/app/api/newsletter/subscribe/route.ts` — verify token antes de gravar Firestore.

**2.5. CSP:**
  - Já cobre challenges.cloudflare.com (script-src + connect-src + frame-src).
  - Não precisa mexer.

### Fase 3 — Newsletter double opt-in (P1, LGPD)
**3.1. Generate token HMAC** — em `/api/newsletter/subscribe/route.ts` após verify Turnstile:
  - Gravar Firestore com `status: "pending"`, `confirmToken: hmac(email, NEWSLETTER_SECRET)` (já no .env.example).
  - Disparar email via Resend com link `https://zerbinatticoffee.com/api/newsletter/confirm?token=…&email=…`.

**3.2. Endpoint confirmação** — criar `src/app/api/newsletter/confirm/route.ts` (GET):
  - Valida token contra HMAC do email.
  - Se válido, atualiza Firestore `status: "active"`. Redireciona pra `/?subscribed=1` (toast UI).
  - Se inválido, retorna 400.

**3.3. UX no NewsletterForm:**
  - Após submit OK, mostrar mensagem "Confirma no email pra ativar" em vez de "Inscrito ✓".

### Fase 4 — CSP hardening (P1)
**4.1. Remover wildcards desnecessários:**
  - `script-src`: trocar `https://*.googletagmanager.com` → `https://www.googletagmanager.com`. Idem `*.google-analytics.com` → `https://www.google-analytics.com` (manter `region1.google-analytics.com` se necessário).
  - `connect-src`: idem.
  - Validar via Tag Assistant que GTM continua funcionando após mudança.

**4.2. Nonce-based CSP (escopo limitado, pragmático):**
  - **Decisão:** **NÃO migrar pra nonce agora.** Custo alto (middleware + propagação a `next/script` + cache invalidation em SSG/ISR), benefício marginal pro stack atual (sem sinks de XSS hoje, todos `dangerouslySetInnerHTML` usam fontes controladas).
  - **Mitigação leve:** adicionar comentário em `next.config.ts` documentando que `'unsafe-inline'` é necessário pelo GTM init (`<Script id="gtm-init">`); registrar em `lessons.md` que qualquer `dangerouslySetInnerHTML` novo deve seguir o padrão escape-de-`</` ou apenas constantes/i18n.
  - **Backlog futuro:** quando implementar Sentry ou outro inline crítico, considerar nonce em rotas dinâmicas (home está em ISR, então nonce dispara cache miss por usuário — anti-padrão).

### Fase 5 — Cleanup P2 (mesma sessão, baixo custo)
**5.1. Hardcoded notify emails:**
  - `src/app/api/b2b-form/route.ts:7` → ler de `process.env.B2B_NOTIFY_EMAILS` (split por `,`). Fallback pra emails atuais se env vazia (compat).
  - Documentar em `.env.example`.

**5.2. Stack traces em logs:**
  - `src/app/api/b2b-form/route.ts:152-156` e `src/app/api/newsletter/subscribe/route.ts:71-74` — log só `err.message` + `errorId` (UUID gerado por request).
  - Retornar `errorId` no JSON da resposta 500 pra correlacionar com Cloud Logging.

**5.3. Deletar legacy HTML não-usado:**
  - `public/novo-layout/index.html` — não é servido em rota nenhuma (proxy.ts só rewrite `/para-empresas`). Deletar.
  - `public/novo-layout/para-empresas.html` — **manter** até Wave D migrar a rota. Documentar dependência em `lessons.md`.

**5.4. Documentar lessons:**
  - `lessons.md`: nunca push email/CPF/CNPJ no `dataLayer`; CSP `'unsafe-inline'` é por causa do GTM init; secrets sempre via Secret Manager; Cloud Run SA dedicada não default Compute.

### Fase 6 — Cloud Run hardening (P2, requer gcloud do user)
**6.1. Inspecionar SA atual:**
  - `gcloud run services describe zerbinatti-coffee --region=southamerica-east1 --format='get(spec.template.spec.serviceAccountName)'`.
  - Se vazio ou termina em `-compute@developer.gserviceaccount.com`: é a default. Próximo passo aplica.

**6.2. Criar SA dedicada:**
  - `gcloud iam service-accounts create zerbinatti-coffee-runtime --project=zerbinatti-cafe --display-name="Zerbinatti Coffee Runtime"`.
  - Roles necessárias: `roles/datastore.user` (Firestore), `roles/secretmanager.secretAccessor` (Secret Manager).

**6.3. Mover secrets pra Secret Manager:**
  - `gcloud secrets create shopify-webhook-secret --data-file=- < <(echo -n "$SECRET")` (pega de `.env.local` local).
  - Idem `resend-api-key`.
  - `gcloud run services update zerbinatti-coffee --region=southamerica-east1 --service-account=zerbinatti-coffee-runtime@... --update-secrets=SHOPIFY_WEBHOOK_SECRET=shopify-webhook-secret:latest,RESEND_API_KEY=resend-api-key:latest --remove-env-vars=SHOPIFY_WEBHOOK_SECRET,RESEND_API_KEY`.

**6.4. Validar:**
  - `curl -X POST https://zerbinatticoffee.com/api/revalidate -H "X-Shopify-Hmac-Sha256: ..."` retorna 401 (HMAC inválido sem segredo correto). Outro teste: webhook real do Shopify Admin produto → vê log Cloud Run.
  - Form B2B continua enviando email Resend (envia OK = SA novas roles funcionando).

**Important:** AI não roda esses comandos. Eu deixo o script `scripts/security-cloudrun-bootstrap.sh` pronto e você executa quando quiser. Cada step é checado/idempotente.

### Fase 7 — Validação final (e2e em local + prod-like)

**7.1. Build local:**
  - `npm run build` verde sem warnings novos.

**7.2. Smoke test local:**
  - Rodar `next start` com `.env.local` setado (Turnstile keys e secrets).
  - `curl POST /api/b2b-form` sem turnstileToken → 403.
  - `curl POST /api/b2b-form` com token Turnstile dummy/test (modo "always pass" das test keys do Turnstile) → 200.
  - `curl POST /api/newsletter/subscribe` sem turnstileToken → 403.
  - `curl POST /api/newsletter/subscribe` com token + email → 200, status `pending` em Firestore.
  - `curl GET /api/newsletter/confirm?token=...` → 200, status `active`.
  - `curl GET /api/debug-shopify` → 404 ou 401 (esperado pós-Fase 1).

**7.3. CSP audit:**
  - Headers em prod: `curl -I https://zerbinatticoffee.com/` → `Content-Security-Policy` sem wildcards `*.googletagmanager.com`/`*.google-analytics.com`.
  - GTM container `GTM-PVDQBMTB` continua disparando (Tag Assistant verifica).

**7.4. Documentar checklist:**
  - Atualizar `docs/seo-checklist.md` com seção "Security gate" (turnstile env vars, SA dedicada, secrets em SM).

---

## Arquivos-chave a criar

- `src/lib/turnstile.ts`
- `src/components/security/TurnstileWidget.tsx`
- `src/app/api/newsletter/confirm/route.ts`
- `scripts/security-cloudrun-bootstrap.sh`
- `docs/security-checklist.md` (resumo de aceito-vs-implementado)

## Arquivos-chave a modificar

- `src/app/api/b2b-form/route.ts` (Turnstile verify + B2B_NOTIFY_EMAILS env + log cleanup)
- `src/app/api/newsletter/subscribe/route.ts` (Turnstile verify + status pending + dispara email confirm)
- `src/app/api/debug-shopify/route.ts` (deletar ou proteger)
- `src/components/B2BForm.tsx` (widget Turnstile + token no body POST)
- `src/components/home/NewsletterForm.tsx` (widget Turnstile + UX confirma email)
- `next.config.ts` (CSP: remover wildcards `*.googletagmanager.com`/`*.google-analytics.com`)
- `.env.example` (documentar `B2B_NOTIFY_EMAILS`)
- `lessons.md` (regras anti-PII dataLayer, secrets em SM, SA dedicada)

## Arquivos-chave a deletar

- `public/novo-layout/index.html` (legacy v1 não-servido)

## Reuso de utilidades existentes

- `b2b-form/route.ts` `sanitize()`, `escapeHtml()`, validação CNPJ — reusar igual em `newsletter/confirm`.
- Firestore singleton (`getFirestore()` lazy + `preferRest: true`) — copiar pattern em `newsletter/confirm`.
- Resend singleton (`getResend()`) — copiar pattern em `newsletter/subscribe` pra dispatch do email confirm.
- `NEWSLETTER_SECRET` env var já documentada em `.env.example`.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` já documentados em `.env.example`.
- CSP em `next.config.ts` já permite challenges.cloudflare.com em script-src + connect-src + frame-src.

## Verification (como testar)

1. **Build**: `npm run build` — verde, sem warnings novos.
2. **Turnstile dev keys** (Cloudflare provê test keys que sempre passam ou sempre falham):
   - Site key `1x00000000000000000000AA` (always pass) + Secret `1x0000000000000000000000000000000AA`.
   - Setar em `.env.local` pra rodar local. Em prod, user usa keys reais.
3. **Smoke E2E:** sequência de curl da Fase 7.2 acima.
4. **CSP**: `curl -I` em prod e diff com versão atual.
5. **GTM**: Tag Assistant continua verde após CSP wildcards removidos.
6. **Cloud Run SA**: `gcloud run services describe ... --format='get(spec.template.spec.serviceAccountName)'` retorna `zerbinatti-coffee-runtime@...` (não default).
7. **Secrets**: `gcloud run services describe ... --format='get(spec.template.spec.containers[0].env)'` não lista `SHOPIFY_WEBHOOK_SECRET` em texto claro (tá em `valueFrom.secretKeyRef`).
8. **Webhook Shopify**: forçar webhook de Product update no Shopify Admin → Cloud Run logs mostram `revalidateTag('shopify-products')` sem erro de IAM.

## Sequência de commits sugerida (na branch `security`)

1. `security: deleta /api/debug-shopify (rota debug nao usada em prod)` — ou protege se for útil
2. `security(turnstile): server-side verifier + client widget invisible`
3. `security(b2b): Turnstile no /api/b2b-form + B2B_NOTIFY_EMAILS env`
4. `security(newsletter): Turnstile + double opt-in (status pending + email confirm)`
5. `security(csp): remove wildcards *.googletagmanager.com / *.google-analytics.com`
6. `security(logs): error message + errorId em vez de stack trace`
7. `chore: deleta public/novo-layout/index.html (legacy nao usado)`
8. `docs(lessons): anti-PII dataLayer, secrets via SM, Cloud Run SA dedicada`
9. `chore: scripts/security-cloudrun-bootstrap.sh (idempotent IAM/secrets setup)`
10. `docs: security-checklist.md`

Cada commit testado isoladamente. Push na branch `security`. Merge pra `main` apenas após aprovação visual + build CI verde + você setar Turnstile keys reais em Cloud Run e rodar `bootstrap.sh`.

---

## Pendências do user (precisa pra eu prosseguir)

| Item | Quem faz | Quando bloqueia |
|---|---|---|
| Criar conta Cloudflare + Turnstile widget pra `zerbinatticoffee.com` | User | Fase 2 (inicio) — sem keys, nao testo localmente |
| Decidir se Cloud Run SA é default Compute (gcloud run describe) | AI roda comando read-only / User aprova mudancas | Fase 6 |
| Setar `B2B_NOTIFY_EMAILS`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` em Cloud Run env | User (gcloud) ou AI mostra comando exato | Pre-merge na main |

Posso começar TUDO sem essas keys (uso test keys do Turnstile localmente). Pendência só trava deploy pra prod.
