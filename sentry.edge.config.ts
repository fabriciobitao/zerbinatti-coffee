/**
 * Sentry — config Edge runtime (middleware, edge route handlers).
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
    beforeSend(event) {
      return scrubPII(event);
    },
  });
}
