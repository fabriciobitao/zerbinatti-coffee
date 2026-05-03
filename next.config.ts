import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// CSP — ajustar domains conforme integracoes
const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    // GA4 + Meta Pixel
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://connect.facebook.net",
    // Necessario para next/script com strategy beforeInteractive
    isDev ? "'unsafe-eval'" : "",
    // Em producao, preferir nonces; ver nota abaixo
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
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
