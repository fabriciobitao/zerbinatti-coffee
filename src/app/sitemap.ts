import type { MetadataRoute } from "next";

const SITE_URL = "https://zerbinatticoffee.com";

/**
 * Sitemap minimo — somente paginas institucionais maduras.
 *
 * Removidas (acessiveis por URL direta mas nao promovidas ao Google):
 *   - /cafes/[slug] (PDPs) — loja em modo "em breve", botoes desativados
 *   - /revista, /revista/[slug] — conteudo editorial pendente de revisao
 *   - /processo — FAQs e copy expandida pendente de revisao
 *
 * Quando o conteudo for aprovado, restaurar adicionando os blocos productRoutes
 * e articleRoutes (ver historico git em src/app/sitemap.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/fazenda`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/para-empresas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/entregas`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
