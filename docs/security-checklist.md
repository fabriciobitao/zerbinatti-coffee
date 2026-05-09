# Security Checklist — Zerbinatti Coffee

Status atual da branch `security`. Marca o que ja foi implementado em codigo (`[x]`)
e o que depende de acao do user em prod (`[ ]`).

Ultima atualizacao: 2026-05-09 (branch `security`).

## Implementado em codigo (branch `security`)

### Anti-spam / anti-bot
- [x] `src/lib/turnstile.ts` — verifier server-side (POST siteverify, retorna `{ ok, reason }`).
- [x] `src/components/security/TurnstileWidget.tsx` — widget invisible via `next/script`.
- [x] `/api/b2b-form` — verify token + falha 403 com `error: turnstile_failed`.
- [x] `/api/newsletter/subscribe` — verify token + falha 403.
- [x] `public/novo-layout/para-empresas.html` — script Turnstile + execute() invisible no submit.
- [x] No-op em dev quando `TURNSTILE_SECRET_KEY` ausente (pra eu testar local sem keys reais).

### Newsletter — double opt-in (LGPD)
- [x] Subscribe: status `pending`, `confirmToken` HMAC, dispara email Resend.
- [x] `/api/newsletter/confirm` — valida `timingSafeEqual` + ativa status.
- [x] Email PT/EN/ES (template inline).
- [x] Redirects pra `/?subscribed=ok|already|invalid`.
- [x] NewsletterForm exibe `footer.pendingConfirm` ("Confirme no seu email pra ativar").

### CSP hardening
- [x] `script-src` sem wildcards (`*.googletagmanager.com` -> `www.googletagmanager.com`, idem GA, Sentry).
- [x] `connect-src` sem `*.myshopify.com` (so `zerbinatticoffee.myshopify.com`); idem GA/GTM/Sentry.
- [x] `'unsafe-inline'` mantido + comentario explicando (GTM init); migracao pra nonce em backlog.

### Logs / observabilidade
- [x] B2B + Newsletter: log so `{ errorId, message }`, nunca stack trace.
- [x] `errorId` UUID retorna no JSON da resposta pra correlacao Cloud Logging.

### Cleanup
- [x] `B2B_NOTIFY_EMAILS` env var (split por virgula); fallback hardcoded mantido.
- [x] `public/novo-layout/index.html` deletado (legacy v1 nao servido por rota).
- [x] `lessons.md` atualizado com 7 regras de hardening.

## Aguardando acao do user

### Cloudflare Turnstile (entregue pelo user — pendentes em prod)
- [x] User criou widget Cloudflare Turnstile. Site key + Secret key recebidas.
- [ ] User precisa setar `NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` no Cloud Run env (ou via Secret Manager — preferivel, ver bootstrap).

### Cloud Run hardening (Fase 6 — `scripts/security-cloudrun-bootstrap.sh`)
- [ ] Rodar `bash scripts/security-cloudrun-bootstrap.sh` com vars exportadas (script idempotente, header explica).
- [ ] Confirmar SA dedicada: `gcloud run services describe zerbinatti-coffee --region=southamerica-east1 --format='get(spec.template.spec.serviceAccountName)'` deve retornar `zerbinatti-coffee-runtime@...` (nao default Compute).
- [ ] Confirmar secrets via Secret Manager: `... --format='get(spec.template.spec.containers[0].env)'` nao deve listar valores em texto claro.

### Backlog (P3 — nao implementado nesta sessao)
- [ ] Webhook Shopify replay protection via `X-Shopify-Webhook-Id` dedupe (precisa Upstash Redis).
- [ ] HSTS preload submission em `hstspreload.org` (boa pratica).
- [ ] postcss XSS transitive (aguardar Next 16.x patch).

## Commits da branch `security`

```
4676e21 chore(security): deleta novo-layout/index.html legacy + lessons hardening
639c75b security(csp): remove wildcards e Sentry generico (apenas hostnames exatos)
105b555 security(turnstile+optin): Cloudflare Turnstile invisivel + double opt-in newsletter
845ae8a docs(security): plano de hardening + atualiza PROGRESS  ← base
```

## Validacao local

```bash
# Build verde
npm run build

# Smoke test (next start em outro terminal)
# Sem token Turnstile -> 403 (com keys reais setadas em .env.local)
curl -X POST http://localhost:3000/api/b2b-form \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Teste","empresa":"X","email":"a@b.com","whatsapp":"11999998888","segmento":"cafeteria"}'
# Esperado: {"error":"turnstile_failed",...}

# Sem secret no env -> no-op (passa)
unset TURNSTILE_SECRET_KEY
# mesmo curl -> chega na validacao normal
```

## Validacao em prod (apos merge + deploy)

```bash
# Header sem wildcards
curl -sI https://zerbinatticoffee.com/ | grep -i content-security-policy

# Form B2B em /para-empresas: submeter via UI; checar Cloud Logging pra ver
# turnstile passing + Firestore doc novo + email Resend chega.

# Newsletter: footer da home; submeter; ver `?subscribed=ok` na URL apos
# clicar no link do email recebido.
```
