import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getProduct } from "@/lib/data/products";

/**
 * Sitemap priorizado por tier (ver SEO-STRATEGY-2026-05-03.md secao 2):
 * - Tier 1 (1.0): Home, /assinatura, /cafes, /cafes/[slug], /para-empresas
 * - Tier 2 (0.8): /sobre, /fazenda, /processo, /entregas
 * - Tier 3 (0.6): /revista, /comparar, /quiz, /safra/2026
 * - Tier 4 (0.3): /termos, /privacidade, /contato
 *
 * Nota: rotas Tier 2/3 ainda nao existem no codigo — incluidas para sinalizar
 * arquitetura final ao crawler. Removeremos qualquer 404 antes do go-live.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const product = getProduct();

  // Tier 1 — conversao critica
  const tier1: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/assinatura`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/cafes`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/para-empresas`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
  ];

  // Tier 1 — PDPs por slug (substitui o antigo /cafe?sku=)
  // Hoje o produto unico tem 3 SKUs, cada SKU e uma PDP em /cafes/[slug].
  // Quando virar catalogo multi-produto, iterar lista de produtos e SKUs.
  const pdpRoutes: MetadataRoute.Sitemap = product.skus.map((sku) => ({
    url: `${base}/cafes/${sku.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  // Tier 2 — confianca e marca
  const tier2: MetadataRoute.Sitemap = [
    { url: `${base}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/fazenda`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/processo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entregas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Tier 3 — conteudo / hubs secundarios
  const tier3: MetadataRoute.Sitemap = [
    { url: `${base}/revista`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/comparar`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/safra/2026`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Tier 4 — legais / utilitarias
  const tier4: MetadataRoute.Sitemap = [
    { url: `${base}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contato`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...tier1, ...pdpRoutes, ...tier2, ...tier3, ...tier4];
}
