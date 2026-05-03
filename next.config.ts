import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const isDev = process.env.NODE_ENV !== "production";

/* ----------------------------------------------------------------------- */
/* Content-Security-Policy                                                 */
/*                                                                         */
/* Duas variantes:                                                         */
/*   - Padrão: estrita, aplicada a todas as rotas exceto /studio.          */
/*   - /studio (Sanity): precisa de 'unsafe-eval' e blob: para WASM/eval   */
/*     do editor. Mantém demais headers iguais.                            */
/*                                                                         */
/* Observação: 'unsafe-inline' em script-src é mantido por compatibilidade */
/* com next/script. Migração para nonce fica para Wave 3.                  */
/* ----------------------------------------------------------------------- */

function buildCsp(opts: { studio?: boolean }): string {
  const studio = opts.studio === true;
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      // GA4 + Meta Pixel (carregados via tag manager — espaço reservado para Wave 2.5 analytics)
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.googletagmanager.com",
      "https://*.google-analytics.com",
      "https://connect.facebook.net",
      // Cloudflare Turnstile (CAPTCHA invisível)
      "https://challenges.cloudflare.com",
      // Sentry — carregamento dinâmico de tracing/loader
      "https://*.sentry.io",
      "https://*.ingest.sentry.io",
      // next/script + bundle inline minúsculo do Next
      "'unsafe-inline'",
      // Necessário em dev (HMR) e em /studio (Sanity usa eval)
      isDev || studio ? "'unsafe-eval'" : "",
      // Sanity também usa workers/blob para o editor
      studio ? "blob:" : "",
    ].filter(Boolean),
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      "https://images.unsplash.com",
      "https://cdn.shopify.com",
      "https://cdn.sanity.io",
      "https://www.google-analytics.com",
      "https://www.facebook.com",
    ],
    "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
    "connect-src": [
      "'self'",
      "https://*.myshopify.com",
      // Analytics (reservado — Wave 2.5)
      "https://www.google-analytics.com",
      "https://*.analytics.google.com",
      "https://*.google-analytics.com",
      "https://*.googletagmanager.com",
      "https://www.facebook.com",
      // Resend (envio transacional via SDK no servidor — não atinge browser,
      // mantido por defesa caso integremos webhook fetch no client)
      "https://api.resend.com",
      // Cloudflare Turnstile siteverify + challenge
      "https://challenges.cloudflare.com",
      // Sentry ingest
      "https://*.sentry.io",
      "https://*.ingest.sentry.io",
      // Sanity (apenas relevante em /studio, mas mantemos sempre — seguro)
      "https://*.api.sanity.io",
      "https://*.apicdn.sanity.io",
      "wss://*.api.sanity.io",
      isDev ? "ws://localhost:*" : "",
    ].filter(Boolean),
    "frame-src": [
      "'self'",
      "https://*.myshopify.com",
      // Turnstile precisa renderizar iframe do challenge
      "https://challenges.cloudflare.com",
    ],
    "worker-src": ["'self'", "blob:"],
    "frame-ancestors": ["'none'"],
    "form-action": ["'self'", "https://*.myshopify.com"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "upgrade-insecure-requests": [],
  };

  return Object.entries(directives)
    .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
    .join("; ");
}

const csp = buildCsp({ studio: false });
const cspStudio = buildCsp({ studio: true });

const baseSecurityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      // Mantém payment para fluxos Shopify embutidos via Storefront
      "payment=(self 'https://*.myshopify.com')",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
      "interest-cohort=()",
    ].join(", "),
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
];

const defaultHeaders = [
  { key: "Content-Security-Policy", value: csp },
  ...baseSecurityHeaders,
];

const studioHeaders = [
  { key: "Content-Security-Policy", value: cspStudio },
  ...baseSecurityHeaders,
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      // /studio precisa de CSP relaxada (Sanity usa eval/wasm/blob)
      { source: "/studio", headers: studioHeaders },
      { source: "/studio/:path*", headers: studioHeaders },
      // Demais rotas: CSP estrita
      {
        source: "/((?!studio).*)",
        headers: defaultHeaders,
      },
      // Cache estatico agressivo
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  images: {
    // Servir AVIF primeiro (menor) com fallback WebP. Browsers que nao suportam
    // recebem o JPG/PNG original. Ordem importa: Next testa do primeiro ao ultimo.
    formats: ["image/avif", "image/webp"],
    // imageSizes mais granulares na faixa mobile/tablet onde o LCP dói.
    // Default Next 16 ja inclui [16,32,48,64,96,128,256,384] — adicionamos
    // 200/300 para melhor fit em hero 60vw em telas 360-414px.
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 300, 384],
    // Cache de imagens otimizadas no CDN do Vercel (1 ano para imagens com hash).
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

/* ----------------------------------------------------------------------- */
/* Sentry build wrapper                                                    */
/*                                                                         */
/* Source maps são uploaded apenas se SENTRY_AUTH_TOKEN, SENTRY_ORG e      */
/* SENTRY_PROJECT estiverem presentes (CI prod). Em dev local ou PRs sem  */
/* secrets, o wrapper passa adiante sem upload — não quebra o build.       */
/* ----------------------------------------------------------------------- */

const sentryEnabled = !!(
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT
);

export default sentryEnabled
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG!,
      project: process.env.SENTRY_PROJECT!,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      widenClientFileUpload: true,
      reactComponentAnnotation: { enabled: true },
      tunnelRoute: "/monitoring",
      sourcemaps: { disable: false, deleteSourcemapsAfterUpload: true },
      disableLogger: true,
      automaticVercelMonitors: false,
    })
  : nextConfig;
