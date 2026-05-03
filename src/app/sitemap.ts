import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getProduct } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const product = getProduct();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/cafe`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/fazenda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/processo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/entregas`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // SKUs como rotas individuais (se a PDP usar query string ?sku=, isso e opcional)
  const skuRoutes: MetadataRoute.Sitemap = product.skus.map((s) => ({
    url: `${base}/cafe?sku=${s.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...skuRoutes];
}
