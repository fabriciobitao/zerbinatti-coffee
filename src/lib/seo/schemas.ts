/**
 * Factory de schemas JSON-LD reutilizaveis.
 * Cada funcao retorna um objeto pronto pra passar pro <JsonLd data={...} />.
 */

import type { Product, Review } from "@/lib/data/products";
import type { Article } from "@/lib/data/articles";

const SITE_URL = "https://zerbinatticoffee.com";
const ORG_NAME = "Zerbinatti Coffee";
const LOGO_URL = `${SITE_URL}/assets/logo-white.png`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: ORG_NAME,
    legalName: "Zerbinatti Coffee",
    url: SITE_URL,
    logo: LOGO_URL,
    foundingDate: "1897",
    founder: {
      "@type": "Person",
      name: "Giuseppe Zerbinatti",
    },
    description:
      "Café especial brasileiro com herança italiana desde 1897. Três gerações cultivando 100% Arábica na Serra do Cabral, MG.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "MG",
      addressCountry: "BR",
      addressLocality: "Serra do Cabral",
    },
    sameAs: [
      "https://www.instagram.com/zerbinatticoffee",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contato@zerbinatti.coffee",
        contactType: "customer service",
        availableLanguage: ["Portuguese"],
        areaServed: "BR",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: ORG_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

function aggregateRating(reviews: Review[]) {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  const value = total / reviews.length;
  return {
    "@type": "AggregateRating",
    ratingValue: value.toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}

function reviewSchema(r: Review) {
  return {
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    datePublished: r.date,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.text,
  };
}

export function productSchema(product: Product) {
  const url = `${SITE_URL}/cafes/${product.slug}`;
  const image = `${SITE_URL}/assets/pacote-graos-2026.webp`;
  const pixPrice = (product.price * 0.9).toFixed(2);
  const rating = aggregateRating(product.reviews);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.longDescription,
    image,
    sku: product.id,
    brand: { "@type": "Brand", name: ORG_NAME },
    category: "Café especial",
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "BRL",
      price: pixPrice,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}#organization` },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Score SCA", value: product.score },
      { "@type": "PropertyValue", name: "Torra", value: product.roast },
      { "@type": "PropertyValue", name: "Peso", value: product.weight },
      { "@type": "PropertyValue", name: "Variedade", value: product.origin.variety },
      { "@type": "PropertyValue", name: "Processo", value: product.origin.process },
      { "@type": "PropertyValue", name: "Altitude", value: product.origin.altitude },
      { "@type": "PropertyValue", name: "Região", value: product.origin.region },
      { "@type": "PropertyValue", name: "Safra", value: product.harvest },
    ],
    ...(rating ? { aggregateRating: rating } : {}),
    review: product.reviews.map(reviewSchema),
  };
}

export function articleSchema(article: Article) {
  const url = `${SITE_URL}/revista/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    image: `${SITE_URL}/assets/og-share.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@id": `${SITE_URL}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category,
    inLanguage: "pt-BR",
    wordCount: article.body.join(" ").split(/\s+/).length,
  };
}

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
