import { Product, SkuVariant } from "@/lib/data/products";
import { siteConfig } from "@/lib/site";

/**
 * Schema.org Product com 3 ofertas (uma por SKU).
 * O preco "de" usado para aggregateOffer eh o menor preco entre os SKUs.
 */
export function productSchema(product: Product) {
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) /
        product.reviews.length
      : undefined;

  const offers = product.skus.map((sku) => skuOffer(product, sku));
  const lowPrice = Math.min(...product.skus.map((s) => s.price)).toFixed(2);
  const highPrice = Math.max(...product.skus.map((s) => s.price)).toFixed(2);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    brand: { "@type": "Brand", name: siteConfig.name },
    sku: product.id,
    category: "Café especial",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      lowPrice,
      highPrice,
      offerCount: product.skus.length,
      offers,
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

function skuOffer(product: Product, sku: SkuVariant) {
  return {
    "@type": "Offer",
    sku: sku.id,
    name: `${product.name} — ${sku.label}`,
    priceCurrency: "BRL",
    price: sku.price.toFixed(2),
    availability: "https://schema.org/InStock",
    url: `${siteConfig.url}/cafe?sku=${sku.id}`,
    priceValidUntil: new Date(
      new Date().getFullYear() + 1,
      11,
      31
    ).toISOString().split("T")[0],
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
