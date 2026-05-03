/**
 * Sentry — entrada do navegador.
 *
 * Next.js 16 carrega `instrumentation-client.ts` automaticamente no bundle
 * do cliente. Este arquivo importa a config compartilhada (que define
 * Sentry.init) e re-exporta o hook de transição de rota do App Router.
 */

import * as Sentry from "@sentry/nextjs";

import "./sentry.client.config";

// Hook necessário para instrumentar transições do App Router em Next 15+.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
