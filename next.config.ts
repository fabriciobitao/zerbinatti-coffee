import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://*.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://connect.facebook.net",
    "https://challenges.cloudflare.com",
    "https://*.sentry.io",
    "https://*.ingest.sentry.io",
    isDev ? "'unsafe-eval'" : "",
    "'unsafe-inline'",
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
    "https://i.vimeocdn.com",
    "https://*.vimeocdn.com",
  ],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  "connect-src": [
    "'self'",
    "https://*.myshopify.com",
    "https://www.google-analytics.com",
    "https://*.analytics.google.com",
    "https://*.google-analytics.com",
    "https://*.googletagmanager.com",
    "https://www.facebook.com",
    "https://api.resend.com",
    "https://challenges.cloudflare.com",
    "https://*.sentry.io",
    "https://*.ingest.sentry.io",
    "https://*.api.sanity.io",
    "https://*.apicdn.sanity.io",
    "wss://*.api.sanity.io",
    "https://player.vimeo.com",
    "https://*.vimeocdn.com",
    "https://*.cloudfunctions.net",
    isDev ? "ws://localhost:*" : "",
  ].filter(Boolean),
  "frame-src": [
    "'self'",
    "https://*.myshopify.com",
    "https://challenges.cloudflare.com",
    "https://player.vimeo.com",
  ],
  "media-src": ["'self'", "https://*.vimeocdn.com", "blob:"],
  "worker-src": ["'self'", "blob:"],
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
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
    ],
  },
};

export default nextConfig;
