import { getArticles } from "@/lib/sanity/queries";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;
export const dynamic = "force-static";

/**
 * Feed RSS 2.0 da Revista Zerbinatti.
 * Inclui ate 50 artigos publicados, ordenados por data desc.
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getArticles({ limit: 50, offset: 0 });
  const lastBuild = new Date().toUTCString();
  const feedUrl = `${siteConfig.url}/revista/rss.xml`;

  const items = articles
    .map((a) => {
      const link = `${siteConfig.url}/revista/${a.slug}`;
      const pubDate = new Date(a.publishedAt).toUTCString();
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
      <author>contato@zerbinatticoffee.com (${escapeXml(a.author)})</author>
      <category>${escapeXml(a.category)}</category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Revista Zerbinatti</title>
    <link>${siteConfig.url}/revista</link>
    <description>Ensaios da casa Zerbinatti — tecnica, historia, lugares, receitas. Casa italiana desde 1897.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
