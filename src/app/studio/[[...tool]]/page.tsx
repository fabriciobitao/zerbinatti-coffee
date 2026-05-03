/**
 * Sanity Studio embutido em /studio.
 *
 * Catch-all route ([[...tool]]) — Sanity controla as sub-rotas internas
 * (estrutura, vision, etc).
 *
 * Renderizado client-side; sem ISR. Acesso restrito por CORS no Sanity.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
