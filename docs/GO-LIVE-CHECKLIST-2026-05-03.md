# Go-Live Checklist — Zerbinatti Coffee

**Data:** 2026-05-03
**Domínio alvo:** `zerbinatticoffee.com`
**Plataforma:** Vercel

---

## 1. Pré-deploy (a fazer antes de apontar DNS)

### 1.1 Compra de domínio
- [ ] Comprar `zerbinatticoffee.com` (Registro.br ou Cloudflare Registrar)
- [ ] Habilitar privacidade WHOIS
- [ ] Auto-renew ON
- [ ] Lock de transferência ON
- [ ] Comprar variações defensivas (opcional): `.com.br`, `cafezerbinatti.com`, `zerbinatti.cafe`

### 1.2 DNS na Vercel
- [ ] Adicionar domínio em `Project Settings → Domains`
- [ ] Apontar A record `@` para `76.76.21.21` (Vercel)
- [ ] Apontar CNAME `www` para `cname.vercel-dns.com`
- [ ] Aguardar propagação (até 48h, geralmente <1h)
- [ ] Verificar SSL Let's Encrypt provisioned

### 1.3 Email do domínio
- [ ] Configurar `contato@zerbinatticoffee.com` (Google Workspace ou Zoho)
- [ ] DNS records: MX, SPF, DKIM, DMARC `p=quarantine`
- [ ] Configurar `newsletter@zerbinatticoffee.com` no Resend
- [ ] Verificar domínio no Resend (SPF + DKIM)

### 1.4 Variáveis de ambiente em produção
Adicionar TODAS no Vercel `Project Settings → Environment Variables`:

**WhatsApp (v1 vendas)**
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER`

**Sanity CMS**
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET=production`
- [ ] `NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01`
- [ ] `SANITY_API_READ_TOKEN` (opcional, preview)

**Resend**
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_AUDIENCE_ID`
- [ ] `RESEND_FROM_EMAIL=Zerbinatti <newsletter@zerbinatticoffee.com>`
- [ ] `CONTACT_NOTIFY_EMAIL=contato@zerbinatticoffee.com`
- [ ] `NEWSLETTER_SECRET` (32+ chars — gerar com `openssl rand -hex 32`)

**Site**
- [ ] `NEXT_PUBLIC_SITE_URL=https://zerbinatticoffee.com`

**Upstash (rate limit)**
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`

**Cloudflare Turnstile**
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- [ ] `TURNSTILE_SECRET_KEY`

**Sentry**
- [ ] `NEXT_PUBLIC_SENTRY_DSN`
- [ ] `SENTRY_AUTH_TOKEN`
- [ ] `SENTRY_ORG`
- [ ] `SENTRY_PROJECT`

**Analytics (com consent)**
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] `NEXT_PUBLIC_META_PIXEL_ID`

---

## 2. Contas externas a criar

- [ ] **Sanity** — https://sanity.io/manage → criar projeto, copiar projectId
- [ ] **Resend** — https://resend.com → criar audience "Zerbinatti Newsletter", copiar audience ID
- [ ] **Cloudflare** — conta + Turnstile site (Managed challenge, invisible)
- [ ] **Sentry** — projeto Next.js, copiar DSN + auth token
- [ ] **Upstash** — Redis database (region: us-east-1 ou sa-east-1)
- [ ] **Google Analytics 4** — property + measurement ID
- [ ] **Meta Business Suite** — Pixel ID
- [ ] **Google Search Console** — propriedade `https://zerbinatticoffee.com`
- [ ] **Bing Webmaster Tools** — propriedade idem

---

## 3. Conteúdo a popular antes do anúncio

### Sanity
- [ ] Acessar `/studio` em produção
- [ ] Criar 3-5 artigos da Revista (categoria: técnica, história, receitas, lugares)
- [ ] Cover image, excerpt, body completo, SEO meta

### Imagens reais
- [ ] Sessão fotográfica: produto, fazenda, processo, retrato família
- [ ] Substituir fallbacks editoriais nas PDPs (`src/app/cafes/[slug]/page.tsx`)
- [ ] Substituir fallbacks de `/sobre` (timeline)
- [ ] OG image dinâmica em `src/app/opengraph-image.tsx` (já existe, validar render)

---

## 4. SEO go-live

- [ ] Submeter sitemap em Search Console: `https://zerbinatticoffee.com/sitemap.xml`
- [ ] Submeter sitemap em Bing Webmaster
- [ ] Validar `robots.txt` permissivo (já configurado em `src/app/robots.ts`)
- [ ] Validar JSON-LD em Schema Validator: https://validator.schema.org
  - [ ] Home → WebSite + Organization
  - [ ] /assinatura → SubscriptionOffer + FAQPage + Breadcrumb
  - [ ] /cafes/[slug] → Product + Breadcrumb
  - [ ] /sobre → AboutPage + Breadcrumb
  - [ ] /revista/[slug] → Article + Breadcrumb
- [ ] Validar Rich Results em Google: https://search.google.com/test/rich-results
- [ ] Configurar 301 redirect de `cafe-alpha-five.vercel.app` → `zerbinatticoffee.com` (Vercel domain redirect)

---

## 5. Smoke test em produção (todas as rotas)

Testar manualmente cada uma:
- [ ] `/` — Home (Hero, Cafés, Subscription, Story, Footer)
- [ ] `/assinatura` — pillar (configurador funciona, sticky CTA mobile)
- [ ] `/sobre` — timeline lateral sticky desktop
- [ ] `/cafes` — índice
- [ ] `/cafes/zerbinatti-500g-graos` — PDP
- [ ] `/cafes/zerbinatti-250g-graos` — PDP
- [ ] `/cafes/zerbinatti-250g-moido` — PDP
- [ ] `/para-empresas` — form B2B
- [ ] `/quiz` — fluxo completo + pré-preenche /assinatura
- [ ] `/revista` — listagem
- [ ] `/revista/[slug]` — artigo (precisa Sanity populado)
- [ ] `/revista/rss.xml` — feed válido
- [ ] `/privacidade` — política LGPD
- [ ] `/termos` — termos de uso
- [ ] `/studio` — Sanity Studio carrega

### Funcionalidades críticas
- [ ] Botões "Assinar" abrem WhatsApp com mensagem pré-preenchida
- [ ] Botões "Comprar" abrem WhatsApp idem
- [ ] Configurador da assinatura: trocar frequência/café atualiza total + WhatsApp
- [ ] Quiz completo → resultado pré-preenche /assinatura via querystring
- [ ] Newsletter: submit envia email de confirmação
- [ ] Newsletter: clicar no link de confirmação ativa cadastro
- [ ] Newsletter: link de unsubscribe remove
- [ ] Form B2B: submit envia email para `CONTACT_NOTIFY_EMAIL`
- [ ] Cookie banner aparece em primeira visita
- [ ] GA4 e Pixel só carregam DEPOIS de aceitar consent
- [ ] Menu mobile: Esc fecha + focus trap funciona

---

## 6. Performance final (Core Web Vitals)

- [ ] Lighthouse Mobile + Desktop em produção
- [ ] LCP < 2.0s (target da spec)
- [ ] INP < 150ms
- [ ] CLS < 0.05
- [ ] Vercel Speed Insights habilitado
- [ ] Real User Monitoring via Sentry/Vercel pelo menos 7 dias

---

## 7. Segurança final

- [ ] Mozilla Observatory: target A+ — https://observatory.mozilla.org
- [ ] securityheaders.com: target A — https://securityheaders.com
- [ ] CSP sem `unsafe-inline` exceto onde justificado
- [ ] HSTS preload submetido (apenas após confirmar domínio estável): https://hstspreload.org
- [ ] Permissions-Policy configurada
- [ ] Rate limit testado (429 em loop)
- [ ] Turnstile bloqueia bot (testar com curl sem token)

---

## 8. LGPD

- [ ] /privacidade publicada e linkada no footer
- [ ] /termos publicada e linkada no footer
- [ ] Cookie banner visível e funcional (consent granular)
- [ ] Audit trail de consent (timestamp em localStorage + cookie)
- [ ] Email DPO ativo (`dpo@zerbinatticoffee.com` ou similar)
- [ ] Política inclui base legal por finalidade (consentimento, legítimo interesse, contrato)

---

## 9. Anúncio

- [ ] Primeiro post Instagram com link
- [ ] Email para lista atual (se houver)
- [ ] WhatsApp Business com link no perfil
- [ ] Google Business Profile (se loja física)
- [ ] Pix de teste para verificar fluxo completo (quando Stripe entrar)

---

## 10. Pós-launch (primeira semana)

- [ ] Monitorar Sentry diariamente
- [ ] Conferir Search Console (cobertura, erros)
- [ ] Conferir GA4 (tráfego, conversões WhatsApp click)
- [ ] Conferir taxa de abertura de email Resend
- [ ] Conferir bounce rate Vercel Analytics
- [ ] Iterar copy se taxa de WhatsApp click < 2%
