import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/**
 * Sanity Studio embutido em /studio.
 * Acesso via http://localhost:3000/studio em dev e /studio em producao.
 *
 * Em producao, restringir acesso por CORS no projeto Sanity (dashboard).
 */
export default defineConfig({
  name: "zerbinatti-cms",
  title: "Zerbinatti — Conteudo",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
