import { sanityClient, isSanityConfigured } from "./client";

export type SanityImage = {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type ArticleListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImage;
  category: "tecnica" | "historia" | "receitas" | "lugares";
  author: string;
  publishedAt: string;
  readingTime: number;
};

export type Article = ArticleListItem & {
  body: unknown[]; // Portable Text
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

const LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  author,
  publishedAt,
  readingTime
`;

const ARTICLE_FIELDS = `
  ${LIST_FIELDS},
  body,
  seo
`;

const REVALIDATE = 60;

/**
 * Lista de artigos publicados, ordenados por data desc.
 * Suporta paginacao simples (offset + limit).
 *
 * Retorna array vazio quando Sanity nao esta configurado — evita 500
 * em ambiente local sem projectId.
 */
export async function getArticles(opts?: {
  limit?: number;
  offset?: number;
  category?: string;
}): Promise<ArticleListItem[]> {
  if (!isSanityConfigured) return [];

  const { limit = 12, offset = 0, category } = opts ?? {};
  const filter = category
    ? `*[_type == "article" && defined(slug.current) && category == $category]`
    : `*[_type == "article" && defined(slug.current)]`;

  const query = `${filter} | order(publishedAt desc) [${offset}...${offset + limit}] {
    ${LIST_FIELDS}
  }`;

  try {
    return await sanityClient.fetch(
      query,
      category ? { category } : {},
      { next: { revalidate: REVALIDATE, tags: ["articles"] } },
    );
  } catch {
    return [];
  }
}

export async function getArticleCount(): Promise<number> {
  if (!isSanityConfigured) return 0;
  try {
    return await sanityClient.fetch(
      `count(*[_type == "article" && defined(slug.current)])`,
      {},
      { next: { revalidate: REVALIDATE, tags: ["articles"] } },
    );
  } catch {
    return 0;
  }
}

/**
 * Artigo individual por slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch(
      `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_FIELDS} }`,
      { slug },
      { next: { revalidate: REVALIDATE, tags: [`article:${slug}`] } },
    );
  } catch {
    return null;
  }
}

/**
 * Slugs para generateStaticParams (SSG das paginas de artigo).
 * Usado pela rota /revista/[slug] em build time + ISR.
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  try {
    const slugs: { slug: string }[] = await sanityClient.fetch(
      `*[_type == "article" && defined(slug.current)]{ "slug": slug.current }`,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    return slugs.map((s) => s.slug);
  } catch {
    return [];
  }
}

/**
 * Artigos relacionados (mesma categoria, exclui o atual).
 */
export async function getRelatedArticles(
  category: string,
  excludeSlug: string,
  limit = 3,
): Promise<ArticleListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "article" && category == $category && slug.current != $excludeSlug] | order(publishedAt desc) [0...$limit] {
        ${LIST_FIELDS}
      }`,
      { category, excludeSlug, limit },
      { next: { revalidate: REVALIDATE, tags: ["articles"] } },
    );
  } catch {
    return [];
  }
}
