# Security Plan — Zerbinatti Coffee

**Data:** 2026-05-03
**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4, deploy Vercel, headless Shopify (Storefront API)
**Objetivo:** Postura de segurança "nível bancário" para e-commerce premium. Pagamentos no domínio Shopify (PCI-DSS deles). Nosso domínio processa: assinaturas, B2B (CNPJ + contato), captura de leads, carrinho, chamadas Storefront.

---

## 1. Threat Model

Modelagem STRIDE focada em superfície real e futura. Severidade: Crítico (C) / Alto (A) / Médio (M) / Baixo (B).

| #  | Ameaça                                                                 | Vetor / STRIDE                          | Sev | Mitigação                                                                                                              |
|----|------------------------------------------------------------------------|-----------------------------------------|-----|------------------------------------------------------------------------------------------------------------------------|
| T1 | **Token Shopify Storefront vazado em logs/repo**                       | Info Disclosure                         | A   | Confirmar que token Storefront é público-by-design (escopo read), separar admin token (server-only), rotação trimestral, scan com Gitleaks no CI |
| T2 | **Admin/Webhook secret Shopify exposto client-side**                   | Elevation of Priv                       | C   | Convenção estrita: nada de admin vai para `NEXT_PUBLIC_*`. Variáveis admin só em route handlers (Node runtime)         |
| T3 | **Spam / abuso no `/api/contact`** (newsletter, B2B, quiz)             | DoS, Tampering                          | A   | Rate limiting por IP, honeypot, Turnstile/hCaptcha invisível, validação Zod com tamanhos máximos, dedup por email      |
| T4 | **CSRF em forms autenticados** (futuro: login cliente, área B2B)       | Tampering, Spoofing                     | A   | SameSite=Lax+Strict para cookies de sessão, double-submit token nos endpoints mutáveis, header `Origin`/`Referer` check |
| T5 | **XSS via CMS futuro / descriptions Shopify (`descriptionHtml`)**      | Tampering                               | C   | Sanitizar com `isomorphic-dompurify` antes de renderizar HTML do Shopify; CSP estrita sem `unsafe-inline` em scripts; nunca `dangerouslySetInnerHTML` com input do usuário |
| T6 | **Credential stuffing / brute force em login futuro**                  | Spoofing                                | C   | Delegar auth ao Shopify Customer Account API (eles tratam MFA/lockout); se rolar próprio: rate limit + bcrypt/argon2 + lockout + MFA via TOTP |
| T7 | **Scraping abusivo de catálogo/preços** (concorrência, bots de IA)     | Info Disclosure (competitivo)           | M   | Rate limit agressivo em `/api/*`, `robots.txt` declarando políticas, Vercel Bot Mitigation, fingerprinting leve        |
| T8 | **Supply chain — pacote npm comprometido**                             | Tampering                               | C   | `npm ci` no CI, lockfile commitado, Dependabot+Renovate, `npm audit --audit-level=high` bloqueante, Socket.dev (free tier), pin de major versions |
| T9 | **Webhook Shopify forjado** (fraude de pedido / liberação indevida)    | Spoofing                                | C   | Verificação HMAC-SHA256 obrigatória com `SHOPIFY_WEBHOOK_SECRET`, replay protection (window 5min + cache de IDs), idempotência por `X-Shopify-Webhook-Id` |
| T10| **Clickjacking em fluxos sensíveis** (checkout embed, B2B)             | UI Redress                              | M   | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'`, banners com `pointer-events` e overlays defensivos             |
| T11| **Open redirect em parâmetros `?next=`/`?return_to=`**                 | Spoofing (phishing)                     | A   | Whitelist de paths internos (regex `^/[a-z0-9/-]+$`), nunca redirecionar para URL externa baseada em query             |
| T12| **PII em logs (Vercel/Sentry)**                                        | Info Disclosure, LGPD                   | A   | Logger wrapper que redacta `email`, `cnpj`, `phone`, `endereco`. Sentry com `beforeSend` sanitizando. Retenção ≤ 90 dias |
| T13| **Vazamento de stack trace / mensagens de erro internas**              | Info Disclosure                         | M   | `NODE_ENV=production` + handler genérico em `app/error.tsx` e `app/api/*`. Nunca devolver `err.message` cru ao cliente |
| T14| **DoS por payload grande no `/api/contact`**                           | DoS                                     | M   | Limitar `Content-Length` ≤ 10KB no middleware, Zod com `.max()` em todos os strings                                    |
| T15| **Subresource integrity ausente em scripts de terceiros** (GA, Pixel)  | Tampering                               | M   | Carregar GA/Pixel via `next/script` oficial, evitar CDNs custom, monitorar mudança de hash com Sentry                  |

**Top 3 ameaças prioritárias hoje:** T2 (segredos), T3 (abuso de form) e T9 (webhooks Shopify quando forem ligados).

---

## 2. Headers de Segurança — `next.config.ts`

Estado atual: `next.config.ts` está **vazio**. Zero headers de segurança configurados — esta é a maior lacuna imediata.

Snippet pronto para colar em `/Users/fabricio/dev/cafe/next.config.ts`:

```ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// CSP — ajustar domains conforme integrações
const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    // GA4 + Meta Pixel
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://connect.facebook.net",
    // Necessário para next/script com strategy beforeInteractive
    isDev ? "'unsafe-eval'" : "",
    // Em produção, preferir nonces; ver nota abaixo
    "'unsafe-inline'",
  ].filter(Boolean),
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://images.unsplash.com",
    "https://cdn.shopify.com",
    "https://www.google-analytics.com",
    "https://www.facebook.com",
  ],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  "connect-src": [
    "'self'",
    "https://*.myshopify.com",
    "https://www.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.facebook.com",
    "https://api.resend.com",
    isDev ? "ws://localhost:*" : "",
  ].filter(Boolean),
  "frame-src": ["'self'", "https://*.myshopify.com"],
  "frame-ancestors": ["'none'"],
  "form-action": ["'self'", "https://*.myshopify.com"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "upgrade-insecure-requests": [],
};

const csp = Object.entries(cspDirectives)
  .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(self 'https://*.myshopify.com'), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Cache estático agressivo
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
```

**Notas:**
- `'unsafe-inline'` em script-src é tecnicamente fraco. Caminho ideal: gerar nonce em middleware Edge e injetar via `next/script`. Ficar nesta versão V1 e migrar para nonce-based em V2.
- Validar CSP em modo `Content-Security-Policy-Report-Only` por 1 semana antes de enforce — Sentry/Report URI para coletar violações.
- Testar em https://securityheaders.com (alvo: A+) e https://csp-evaluator.withgoogle.com.

---

## 3. Gestão de Segredos

### Convenção de envs

| Variável                              | Local           | Client-side? | Notas                                                |
|---------------------------------------|-----------------|--------------|------------------------------------------------------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`    | Vercel + .env   | SIM          | Domínio público                                      |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`| Vercel + .env   | SIM*         | *Storefront token é projetado para ser público (escopo read). Ainda assim, prefira proxy server-side em V2 |
| `SHOPIFY_ADMIN_API_TOKEN`             | Vercel only     | NÃO          | Server-only, escopo mínimo                           |
| `SHOPIFY_WEBHOOK_SECRET`              | Vercel only     | NÃO          | HMAC verification                                    |
| `RESEND_API_KEY`                      | Vercel only     | NÃO          | Server-only                                          |
| `CONTACT_INBOX` / `CONTACT_FROM`      | Vercel only     | NÃO          | Server-only                                          |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN`   | Vercel only     | NÃO          | Rate limiting                                        |
| `TURNSTILE_SECRET_KEY`                | Vercel only     | NÃO          | Verificação server-side                              |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`      | Vercel + .env   | SIM          | Public site key                                      |
| `SENTRY_DSN`                          | Vercel only     | NÃO          | Server                                               |
| `NEXT_PUBLIC_SENTRY_DSN`              | Vercel + .env   | SIM          | Browser SDK                                          |
| `SENTRY_AUTH_TOKEN`                   | Vercel only     | NÃO          | Source maps upload                                   |
| `NEXT_PUBLIC_GA_ID` / `_PIXEL_ID`     | Vercel + .env   | SIM          | IDs públicos                                         |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`         | Vercel + .env   | SIM          | Já existe                                            |

### Regras invioláveis
1. Prefixo `NEXT_PUBLIC_` é **embarcado no bundle JS** — qualquer coisa marcada assim DEVE ser considerada pública para sempre. Auditar antes de adicionar.
2. `.env.local` no `.gitignore` (já está). `.env.example` mantém nomes sem valores.
3. Vercel: usar **Environments separados** (Production / Preview / Development). Tokens de produção nunca em Preview.
4. Rotação trimestral de todos os tokens server-side. Documentar processo em `docs/RUNBOOK-ROTACAO-SEGREDOS.md`.
5. Gitleaks no pre-commit (`husky`) + GitHub Action obrigatória.
6. Vercel oferece **Sensitive Environment Variables** — usar para tudo server-only (não exibe valor no dashboard após salvar).

### `.env.example` atualizado (sugestão)
Adicionar, sem valores:
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=
SHOPIFY_ADMIN_API_TOKEN=
SHOPIFY_WEBHOOK_SECRET=
RESEND_API_KEY=
CONTACT_INBOX=
CONTACT_FROM=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

---

## 4. Validação de Entrada — Zod

**Biblioteca:** `zod` (zero deps, tree-shakable, type-safe). Alternativas (`yup`, `valibot`) inferiores no ecossistema atual.

### Padrão geral
- Schema definido em `src/lib/schemas/*.ts`, compartilhado entre client (form) e server (route handler).
- `safeParse()` no servidor — nunca confiar no client.
- Tamanhos máximos em **todos** os strings (DoS prevention).
- Trimming + normalização (lowercase email, strip CNPJ).

### Schemas necessários (esqueleto)

```ts
// src/lib/schemas/contact.ts
import { z } from "zod";

const emailSchema = z.string().trim().toLowerCase().email().max(254);
const phoneSchema = z.string().trim().regex(/^[\d\s()+-]{8,20}$/);
const nameSchema = z.string().trim().min(2).max(80);

export const newsletterSchema = z.object({
  type: z.literal("newsletter"),
  email: emailSchema,
  // honeypot — deve estar vazio
  _hp: z.string().max(0).optional(),
});

export const b2bSchema = z.object({
  type: z.literal("b2b"),
  name: nameSchema,
  company: z.string().trim().min(2).max(120),
  cnpj: z.string().trim().regex(/^\d{14}$/), // já normalizado
  email: emailSchema,
  phone: phoneSchema,
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true), // LGPD
  _hp: z.string().max(0).optional(),
});

export const subscriptionSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  cep: z.string().regex(/^\d{8}$/),
  endereco: z.string().trim().max(200),
  numero: z.string().trim().max(10),
  complemento: z.string().trim().max(60).optional(),
  cidade: z.string().trim().max(80),
  uf: z.string().length(2),
  consent: z.literal(true),
});

export const contactPayloadSchema = z.discriminatedUnion("type", [
  newsletterSchema,
  b2bSchema,
  z.object({
    type: z.literal("quiz"),
    email: emailSchema,
    metadata: z.record(z.string().max(40), z.string().max(200)).optional(),
  }),
]);
```

### Hardening do `/api/contact` atual
Estado atual do route handler tem zero validação além de `email || phone`. Refatorar para:
1. `safeParse` com `contactPayloadSchema`
2. Honeypot `_hp` rejeita se preenchido
3. Rate limit por IP (ver §6)
4. Verificação Turnstile/hCaptcha
5. Logger sem PII (ver T12)
6. Idempotência por hash `(email + type + 1h window)` em Redis para evitar spam

---

## 5. Webhooks Shopify

Quando o webhook Shopify for ligado (futuro: `orders/create`, `customers/create`, `app/uninstalled`):

### Verificação HMAC obrigatória

```ts
// src/app/api/webhooks/shopify/route.ts (esqueleto)
import crypto from "node:crypto";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // crypto + raw body
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET!;
  const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
  const topic = req.headers.get("x-shopify-topic");
  const webhookId = req.headers.get("x-shopify-webhook-id");
  const triggeredAt = req.headers.get("x-shopify-triggered-at");

  if (!hmacHeader || !topic || !webhookId || !triggeredAt) {
    return new Response("missing headers", { status: 401 });
  }

  // Replay protection — janela de 5 minutos
  const triggered = Date.parse(triggeredAt);
  if (Number.isNaN(triggered) || Math.abs(Date.now() - triggered) > 5 * 60_000) {
    return new Response("stale webhook", { status: 401 });
  }

  // Raw body (não JSON.parse antes de verificar HMAC)
  const rawBody = await req.text();

  const computed = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  // timingSafeEqual previne timing attacks
  const valid =
    computed.length === hmacHeader.length &&
    crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hmacHeader));

  if (!valid) return new Response("invalid hmac", { status: 401 });

  // Idempotência — Redis SET NX com TTL 24h
  const seen = await redis.set(`whk:${webhookId}`, "1", { nx: true, ex: 86400 });
  if (seen === null) return new Response("duplicate", { status: 200 });

  // Processar
  const payload = JSON.parse(rawBody);
  await handleWebhook(topic, payload);

  return new Response("ok", { status: 200 });
}
```

**Pontos críticos:**
- `runtime = "nodejs"` (crypto não disponível em Edge runtime)
- Sempre processar em ≤ 5s (Shopify timeout). Para tarefas longas, enfileirar (Upstash QStash, Inngest)
- Logar HMAC inválidos como evento de segurança no Sentry (possível ataque)

---

## 6. Rate Limiting

**Recomendação:** Upstash Redis + `@upstash/ratelimit` rodando em **Vercel Edge Middleware** (latência sub-10ms global).

Alternativa pobre: in-memory por instância serverless (não funciona porque cada lambda é isolada).

### Limites sugeridos por endpoint

| Endpoint                    | Janela    | Limite                | Estratégia              |
|-----------------------------|-----------|-----------------------|-------------------------|
| `/api/contact` (newsletter) | 1 hora    | 3 / IP, 1 / email     | Sliding window          |
| `/api/contact` (b2b)        | 1 hora    | 5 / IP                | Sliding window          |
| `/api/contact` (quiz)       | 1 hora    | 10 / IP               | Sliding window          |
| `/api/webhooks/shopify`     | -         | sem limite (HMAC já protege) | Apenas log de anomalias |
| `/api/cart/*` (futuro)      | 1 minuto  | 60 / IP               | Token bucket            |
| `/api/auth/*` (futuro)      | 15 min    | 5 / IP, 5 / email     | Strict — bloqueio extra |
| Catálogo público (`GET /`)  | 1 minuto  | 120 / IP              | Bot mitigation Vercel   |

### Esqueleto Edge Middleware

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
  prefix: "rl:contact",
});

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/contact")) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);
    if (!success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
        },
      });
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/api/:path*"] };
```

Camada extra: **Vercel WAF / Bot Mitigation** (plano Pro) para ataques L7 e DDoS.

---

## 7. Dependency Hygiene

Estado atual: `package.json` com 4 deps prod, sem CI, sem Dependabot. Surface mínima — bom momento para estabelecer disciplina.

### Política de lockfile
- `package-lock.json` **commitado** (já está)
- CI usa `npm ci` (não `npm install`) — falha se lockfile diverge
- Bloquear PRs que alteram lockfile sem alterar `package.json`

### GitHub Actions — gate de segurança em PRs
```yaml
# .github/workflows/security.yml
name: Security
on: [pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm audit --audit-level=high
      - uses: gitleaks/gitleaks-action@v2
        env: { GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} }
      - uses: aquasecurity/trivy-action@master
        with: { scan-type: fs, severity: 'CRITICAL,HIGH', exit-code: '1' }
```

### Dependabot
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule: { interval: weekly }
    open-pull-requests-limit: 10
    groups:
      next-ecosystem:
        patterns: ["next", "eslint-config-next", "@next/*"]
      react-ecosystem:
        patterns: ["react", "react-dom", "@types/react*"]
    ignore:
      # Pinning major versions de framework — upgrade manual
      - dependency-name: "next"
        update-types: ["version-update:semver-major"]
  - package-ecosystem: github-actions
    directory: "/"
    schedule: { interval: weekly }
```

### Renovate (alternativa mais granular)
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended", ":semanticCommits", "schedule:weekends"],
  "vulnerabilityAlerts": { "enabled": true, "labels": ["security"] },
  "lockFileMaintenance": { "enabled": true, "schedule": ["before 5am on monday"] },
  "packageRules": [
    { "matchUpdateTypes": ["patch"], "automerge": true },
    { "matchDepTypes": ["devDependencies"], "matchUpdateTypes": ["minor", "patch"], "automerge": true },
    { "matchPackageNames": ["next", "react", "react-dom"], "automerge": false }
  ]
}
```

**Recomendação:** começar com Dependabot (nativo GitHub, zero setup). Migrar para Renovate só se precisar de auto-merge sofisticado.

### Outros
- **Socket.dev** (free tier) integrado ao GitHub para alertar instalação de pacote suspeito
- `npm pkg get scripts` — auditar ausência de `postinstall` malicioso
- Pin de major versions críticas em `overrides` se necessário

---

## 8. LGPD

### Bases legais
- **Consentimento** — newsletter, marketing, cookies não-essenciais
- **Execução de contrato** — assinatura, pedidos
- **Legítimo interesse** — segurança, anti-fraude
- **Obrigação legal** — fiscal/tributário (notas, retenção 5 anos)

### Banner de cookies
- Implementar banner com **categorias** (essencial, analytics, marketing) — biblioteca `vanilla-cookieconsent` ou `react-cookie-consent`
- GA4 e Meta Pixel **só carregam após consentimento explícito** (Consent Mode v2 do Google)
- Persistir preferência em cookie próprio + permitir revogação a qualquer momento via link no rodapé

### Política de Privacidade — conteúdo obrigatório
Atualizar `/src/app/privacidade/page.tsx` com:
1. Identificação do controlador (razão social, CNPJ, endereço, encarregado/DPO)
2. Dados coletados (categorias e finalidades)
3. Bases legais por finalidade
4. Compartilhamento (Shopify, Vercel, Resend, Google, Meta — operadores)
5. Transferência internacional (todos esses são US/EU — citar mecanismo)
6. Retenção por categoria
7. Direitos do titular (acesso, correção, exclusão, portabilidade, revogação)
8. Canal para exercer direitos: email DPO + formulário
9. Cookies — tabela detalhada
10. Histórico de versões

### Direitos do titular — endpoint
Criar `/api/lgpd/request` com tipos: `access`, `delete`, `export`, `rectify`. Em V1, encaminhar por email para DPO; em V2, automatizar export Shopify Customer API.

### Retenção
| Dado                          | Retenção   | Justificativa            |
|-------------------------------|------------|--------------------------|
| Lead newsletter               | Até revogar| Consentimento            |
| Pedido (cliente final)        | 5 anos     | Obrigação fiscal         |
| Logs de aplicação             | 90 dias    | Operacional              |
| Logs de segurança             | 1 ano      | Resposta a incidente     |
| Carrinho abandonado           | 30 dias    | Legítimo interesse       |

### Outras práticas
- Nunca logar senha, CPF, CNPJ completo, número de cartão
- Mascarar PII em logs e Sentry (`fabio@…@orchestra.lat` → `f***@orchestra.lat`)
- Comunicação ANPD em 2 dias úteis se incidente com risco a titulares

---

## 9. Checklist de Deploy Pré-Produção

Rodar antes de **cada** deploy de produção. Automatizar via GitHub Action `pre-deploy.yml`.

### Build & Code
- [ ] `npm ci` limpo, sem warnings
- [ ] `npm run lint` zero erros
- [ ] `npm audit --audit-level=high` zero vulnerabilidades
- [ ] `tsc --noEmit` zero erros
- [ ] Build `next build` sem warnings de bundle suspeito (>500kb chunks)
- [ ] Sem `console.log` em código de produção (lint rule)
- [ ] Sem `TODO/FIXME/XXX` em paths críticos (`/api/`, `lib/auth/`)

### Segredos & Config
- [ ] Gitleaks scan limpo
- [ ] Nenhuma env nova `NEXT_PUBLIC_*` sensível adicionada
- [ ] `.env.example` atualizado com novas vars
- [ ] Vercel envs de produção batem com `.env.example`
- [ ] Sentry source maps uploadados

### Headers & CSP
- [ ] `securityheaders.com` retorna A+ no domínio prod
- [ ] CSP reportando zero violações nas últimas 24h
- [ ] HSTS preload ativo

### Funcional
- [ ] Smoke test e2e (Playwright) passou em preview
- [ ] Webhooks Shopify validados em ambiente de staging
- [ ] Rate limit testado (200 req em 1min retorna 429)
- [ ] LGPD banner aparece em sessão limpa

### Pós-deploy (≤ 30 min)
- [ ] Sentry: zero erros novos críticos
- [ ] Vercel Analytics: latência p95 ≤ baseline
- [ ] GA4 / Meta Pixel disparando eventos esperados
- [ ] CSP report endpoint sem spike

---

## 10. Monitoramento

### Sentry (recomendado — free tier 5k events/mês)
- Frontend SDK (`@sentry/nextjs`) com `tracesSampleRate: 0.1`
- Backend SDK no mesmo pacote — captura route handlers
- `beforeSend` redacta PII (email, CNPJ, telefone, endereço)
- Source maps uploadados no build
- Releases atreladas a commit SHA

Alternativas: **Highlight.io** (open source, session replay), **Axiom** (logs estruturados), **Datadog** (caro).

### Alertas críticos a configurar
| Alerta                                      | Trigger                              | Canal           | Severidade |
|---------------------------------------------|--------------------------------------|-----------------|------------|
| Spike de erro 5xx                           | >10/min por 3min                     | Pager/Slack     | P0         |
| Webhook Shopify HMAC inválido               | >1 evento                            | Slack security  | P1         |
| Rate limit 429 em IP único                  | >100/h                               | Slack security  | P2         |
| Build falhou em main                        | imediato                             | Slack dev       | P1         |
| Vulnerabilidade Critical em deps            | imediato (Dependabot)                | Slack security  | P1         |
| CSP report violação nova                    | >50/h                                | Slack security  | P2         |
| Latência p95 > 2s                           | 5min                                 | Slack ops       | P2         |
| Vercel domain SSL expira                    | 30 dias antes                        | Email           | P1         |
| Token Shopify retornando 401                | >5 em 5min                           | Pager           | P0         |
| Resend bounce rate > 5%                     | diário                               | Email           | P2         |

### Logs estruturados
- Logger wrapper (`pino` ou `next-logger`) com níveis (`debug`, `info`, `warn`, `error`, `security`)
- Nível `security` → enviado também ao Sentry como `tag: "security"`
- Correlation ID por request (header `x-request-id`)

### Status page (V2)
- BetterStack ou Statuspage para incidentes voltados ao cliente
- Health check endpoint `/api/health` (verifica Shopify reachability, Redis, Resend)

---

## Resumo — 5 Prioridades

1. **Implementar `next.config.ts` com headers de segurança HOJE** (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy). Estado atual é "zero proteção" — meta `securityheaders.com` A+ em primeira sprint.

2. **Hardening do `/api/contact` antes de qualquer campanha de captura**: validação Zod com discriminated union, honeypot, rate limit Upstash, Turnstile invisível, logger sem PII. Atual está aberto a abuso trivial.

3. **Convenção de segredos blindada antes de ligar Shopify Admin/Webhooks**: nada de admin token em `NEXT_PUBLIC_*`, Gitleaks no CI obrigatório, Vercel Sensitive Env Vars, runbook de rotação trimestral.

4. **CI de segurança como gate de PR**: Dependabot semanal + GitHub Action com `npm audit` + Gitleaks + Trivy bloqueante. Surface de deps mínima hoje (4 prod) — momento perfeito para estabelecer disciplina antes de crescer.

5. **LGPD pronta antes do go-live comercial**: banner de consentimento com Consent Mode v2 (GA/Pixel só após opt-in), política de privacidade reescrita com 10 itens obrigatórios, endpoint para direitos do titular, retenção documentada. Sem isso, qualquer captura de lead é violação.

**Sequência sugerida de implementação:** 1 → 3 → 4 → 2 → 5 → webhooks/HMAC quando ligar Shopify → Sentry e alertas → deploy checklist automatizado.
