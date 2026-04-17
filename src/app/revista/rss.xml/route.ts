import { articles } from "@/lib/data/articles";
import { siteConfig } from "@/lib/site";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = [...articles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .map(
      (a) => `
    <item>
      <title>${escape(a.title)}</title>
      <link>${siteConfig.url}/revista/${a.slug}</link>
      <guid>${siteConfig.url}/revista/${a.slug}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <author>${escape(a.author)}</author>
      <category>${escape(a.category)}</category>
      <description>${escape(a.excerpt)}</description>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Revista Zerbinatti</title>
    <link>${siteConfig.url}/revista</link>
    <atom:link href="${siteConfig.url}/revista/rss.xml" rel="self" type="application/rss+xml" />
    <description>Ensaios sobre café, terroir e ofício pela família Zerbinatti desde 1897.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
