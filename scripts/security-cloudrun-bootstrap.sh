#!/usr/bin/env bash
# Idempotent bootstrap pra Cloud Run hardening (Fase 6 do plano de seguranca).
# Cria SA dedicada + move secrets pra Secret Manager + atualiza service.
#
# Pre-requisitos:
#   - gcloud autenticado como owner (`fabriciofazer@gmail.com` ou
#     `fabiomenezes@gmail.com`)
#   - APIs habilitadas: secretmanager.googleapis.com, run.googleapis.com,
#     iam.googleapis.com
#
# Uso:
#   export SHOPIFY_WEBHOOK_SECRET=...     # do .env.local
#   export RESEND_API_KEY=re_...
#   export TURNSTILE_SECRET_KEY=0x4...    # secret server (privada)
#   export NEWSLETTER_SECRET=...          # 32+ chars random
#   bash scripts/security-cloudrun-bootstrap.sh

set -euo pipefail

PROJECT_ID="${PROJECT_ID:-zerbinatti-cafe}"
REGION="${REGION:-southamerica-east1}"
SERVICE="${SERVICE:-zerbinatti-coffee}"
SA_NAME="zerbinatti-coffee-runtime"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

green() { printf "\033[32m%s\033[0m\n" "$*"; }
yellow() { printf "\033[33m%s\033[0m\n" "$*"; }
red() { printf "\033[31m%s\033[0m\n" "$*" >&2; }

require_var() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    red "ERRO: variavel de ambiente $name nao setada. Veja header do script."
    exit 1
  fi
}

green "▶ Validando vars obrigatorias"
require_var SHOPIFY_WEBHOOK_SECRET
require_var RESEND_API_KEY
require_var TURNSTILE_SECRET_KEY
require_var NEWSLETTER_SECRET

green "▶ Habilitando APIs (idempotente)"
gcloud services enable \
  secretmanager.googleapis.com \
  run.googleapis.com \
  iam.googleapis.com \
  --project="$PROJECT_ID"

green "▶ Garantindo SA dedicada $SA_EMAIL"
if ! gcloud iam service-accounts describe "$SA_EMAIL" --project="$PROJECT_ID" >/dev/null 2>&1; then
  gcloud iam service-accounts create "$SA_NAME" \
    --project="$PROJECT_ID" \
    --display-name="Zerbinatti Coffee Runtime"
  yellow "  (criada)"
else
  yellow "  (ja existe)"
fi

green "▶ Concedendo roles minimas a $SA_EMAIL"
for role in roles/datastore.user roles/secretmanager.secretAccessor; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SA_EMAIL" \
    --role="$role" \
    --condition=None \
    --quiet >/dev/null
done
yellow "  (datastore.user + secretmanager.secretAccessor concedidas)"

create_or_update_secret() {
  local name="$1"
  local value="$2"
  if gcloud secrets describe "$name" --project="$PROJECT_ID" >/dev/null 2>&1; then
    printf "%s" "$value" | gcloud secrets versions add "$name" --project="$PROJECT_ID" --data-file=- >/dev/null
    yellow "  ($name: nova versao)"
  else
    printf "%s" "$value" | gcloud secrets create "$name" --project="$PROJECT_ID" --replication-policy=automatic --data-file=- >/dev/null
    yellow "  ($name: criado)"
  fi
}

green "▶ Subindo secrets pro Secret Manager"
create_or_update_secret shopify-webhook-secret "$SHOPIFY_WEBHOOK_SECRET"
create_or_update_secret resend-api-key "$RESEND_API_KEY"
create_or_update_secret turnstile-secret-key "$TURNSTILE_SECRET_KEY"
create_or_update_secret newsletter-secret "$NEWSLETTER_SECRET"

green "▶ Atualizando Cloud Run service: SA + secrets + remove env vars sensiveis"
gcloud run services update "$SERVICE" \
  --project="$PROJECT_ID" \
  --region="$REGION" \
  --service-account="$SA_EMAIL" \
  --update-secrets="SHOPIFY_WEBHOOK_SECRET=shopify-webhook-secret:latest,RESEND_API_KEY=resend-api-key:latest,TURNSTILE_SECRET_KEY=turnstile-secret-key:latest,NEWSLETTER_SECRET=newsletter-secret:latest" \
  --remove-env-vars="SHOPIFY_WEBHOOK_SECRET,RESEND_API_KEY,TURNSTILE_SECRET_KEY,NEWSLETTER_SECRET" \
  --quiet

green "▶ Validando estado final"
gcloud run services describe "$SERVICE" \
  --project="$PROJECT_ID" \
  --region="$REGION" \
  --format='value(spec.template.spec.serviceAccountName)'

green "✓ Done. SA dedicada + secrets em Secret Manager + service atualizado."
yellow "  Lembre de rodar 'curl -I https://zerbinatticoffee.com/' pra confirmar headers"
yellow "  e disparar um webhook Shopify pra confirmar HMAC com SHOPIFY_WEBHOOK_SECRET ativo."
