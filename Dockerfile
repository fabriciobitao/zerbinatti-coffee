# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
ARG NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
ARG NEXT_PUBLIC_GTM_ID
ARG SEO_INDEX
ENV NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=$NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
ENV NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=$NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV SEO_INDEX=$SEO_INDEX
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ARG NEXT_PUBLIC_GTM_ID
ARG SEO_INDEX
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV SEO_INDEX=$SEO_INDEX
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
