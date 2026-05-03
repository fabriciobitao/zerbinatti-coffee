import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getProduct } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const product = getProduct();

  const tier1: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/assinatura`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/cafes`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/para-empresas`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
  ];

  const pdpRoutes: MetadataRoute.Sitemap = product.skus.map((sku) => ({
    url: `${base}/cafes/${sku.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  const tier2: MetadataRoute.Sitemap = [
    { url: `${base}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entregas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/fazenda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/processo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const tier3: MetadataRoute.Sitemap = [
    { url: `${base}/revista`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const tier4: MetadataRoute.Sitemap = [
    { url: `${base}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...tier1, ...pdpRoutes, ...tier2, ...tier3, ...tier4];
}
