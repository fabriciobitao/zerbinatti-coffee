/**
 * Sentry — config Node runtime (route handlers, Server Actions, RSC).
 */

import * as Sentry from "@sentry/nextjs";
import { scrubPII } from "./sentry.client.config";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProd = process.env.NODE_ENV === "production";

if (dsn && isProd) {
  Sentry.init({
    dsn,
    tracesSampleRate: isProd ? 0.1 : 1.0,
    debug: false,
    environment:
      process.env.VERCEL_ENV ||
      process.env.NEXT_PUBLIC_VERCEL_ENV ||
      (isProd ? "production" : "development"),
    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      /^NetworkError/i,
      /Failed to fetch/i,
    ],
    beforeSend(event) {
      return scrubPII(event);
    },
    beforeBreadcrumb(crumb) {
      if (!crumb) return null;
      // Reduz ruído de fetch para o próprio Sentry / health checks
      if (
        crumb.category === "fetch" &&
        typeof crumb.data?.url === "string" &&
        /sentry\.io|ingest\.sentry\.io/i.test(crumb.data.url)
      ) {
        return null;
      }
      return crumb;
    },
  });
}
