import { createClient, type ClientConfig } from "next-sanity";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * Indica se o Sanity esta minimamente configurado.
 * Usado para evitar throws nas queries quando o projeto ainda esta vazio.
 */
export const isSanityConfigured = rawProjectId.length > 0;

// Placeholder valido (formato a-z0-9) para permitir instanciar o client em
// build/CI sem env vars. Queries reais sao gateadas por `isSanityConfigured`.
export const projectId = isSanityConfigured ? rawProjectId : "placeholder";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

const isProd = process.env.NODE_ENV === "production";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: isProd && isSanityConfigured,
  perspective: "published",
};

export const sanityClient = createClient(config);

/**
 * Cliente "preview" — bypassa CDN para drafts.
 * Em uso futuro com Sanity Preview API.
 */
export const sanityPreviewClient = createClient({
  ...config,
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Helper para gerar URLs de imagens do Sanity.
 * Uso: urlForImage(article.coverImage).width(1200).height(630).url()
 */
const builder = createImageUrlBuilder({ projectId, dataset });
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
