import type { MetadataRoute } from "next";

const SITE_URL = "https://zerbinatticoffee.com";

export default function robots(): MetadataRoute.Robots {
  const indexEnabled = process.env.SEO_INDEX === "true";

  if (!indexEnabled) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
