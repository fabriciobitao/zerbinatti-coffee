import { Product } from "@/lib/data/products";
import { Article } from "@/lib/data/articles";
import { siteConfig } from "@/lib/site";

export function productSchema(product: Product) {
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) /
        product.reviews.length
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    brand: { "@type": "Brand", name: siteConfig.name },
    sku: product.id,
    category: "Café especial",
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/cafes/${product.slug}`,
      priceValidUntil: new Date(
        new Date().getFullYear() + 1,
        11,
        31
      ).toISOString().split("T")[0],
    },
    ...(avgRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount: product.reviews.length,
      },
      review: product.reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        datePublished: r.date,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
        },
        reviewBody: r.text,
      })),
    }),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Origem", value: product.origin.farm },
      { "@type": "PropertyValue", name: "Altitude", value: product.origin.altitude },
      { "@type": "PropertyValue", name: "Variedade", value: product.origin.variety },
      { "@type": "PropertyValue", name: "Processo", value: product.origin.process },
      { "@type": "PropertyValue", name: "Score SCA", value: product.score },
      { "@type": "PropertyValue", name: "Torra", value: product.roast },
    ],
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/revista/${article.slug}`,
    },
    articleSection: article.category,
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
