import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt gerado nativamente pelo Next.js.
 *
 * - Allow / — site inteiro indexavel
 * - Disallow /api/ — rotas internas (sem valor para SERP)
 * - Disallow /carrinho — pagina transacional, nao deve indexar
 * - Disallow /*?sku=* — querystrings legadas (PDPs migraram para /cafes/[slug])
 *
 * Sitemap aponta para o sitemap.xml gerado por src/app/sitemap.ts.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/carrinho", "/*?sku=*"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
