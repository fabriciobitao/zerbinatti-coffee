import { Product, SkuVariant } from "@/lib/data/products";
import { siteConfig } from "@/lib/site";

/**
 * Schema.org Product com 3 ofertas (uma por SKU).
 * O preco "de" usado para aggregateOffer eh o menor preco entre os SKUs.
 *
 * Inclui hasMerchantReturnPolicy (CDC BR — 7 dias) e shippingDetails
 * (exigidos pelo Google desde 2023 para Merchant listings sem warnings).
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

/**
 * MerchantReturnPolicy — CDC brasileiro garante 7 dias para arrependimento
 * em compras a distancia. Aplicavel a todas as ofertas.
 */
function brMerchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "BR",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 7,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };
}

/**
 * OfferShippingDetails — Brasil, prazo medio 3-7 dias uteis.
 */
function brShippingDetails() {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "0",
      currency: "BRL",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "BR",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 2,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 3,
        maxValue: 7,
        unitCode: "DAY",
      },
    },
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
    url: `${siteConfig.url}/cafes/${product.slug}`,
    priceValidUntil: new Date(
      new Date().getFullYear() + 1,
      11,
      31
    ).toISOString().split("T")[0],
    hasMerchantReturnPolicy: brMerchantReturnPolicy(),
    shippingDetails: brShippingDetails(),
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

// ---------------------------------------------------------------------------
// Subscription Offer Schema
// ---------------------------------------------------------------------------

export type SubscriptionPlan = {
  id: string;
  name: string; // ex: "Plano Quinzenal"
  description: string;
  price: number; // preco por entrega (BRL)
  recurrence: "weekly" | "biweekly" | "monthly";
  url?: string; // se nao fornecido, usa /assinatura
  imageUrl?: string;
};

/**
 * Product + Offer com priceSpecification = UnitPriceSpecification
 * e referenceQuantity refletindo a recorrencia (P2W = quinzenal, P1M = mensal).
 *
 * Critico para rich results de assinatura — Google distingue preco unitario
 * de preco recorrente via referenceQuantity + billingDuration.
 */
export function subscriptionOfferSchema(plan: SubscriptionPlan) {
  const billingDuration =
    plan.recurrence === "weekly"
      ? "P1W"
      : plan.recurrence === "biweekly"
        ? "P2W"
        : "P1M";

  const referenceUnit =
    plan.recurrence === "weekly"
      ? { value: 1, unitCode: "WEE" }
      : plan.recurrence === "biweekly"
        ? { value: 2, unitCode: "WEE" }
        : { value: 1, unitCode: "MON" };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plan.name,
    description: plan.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    sku: plan.id,
    category: "Assinatura de café especial",
    ...(plan.imageUrl && { image: plan.imageUrl }),
    offers: {
      "@type": "Offer",
      url: plan.url || `${siteConfig.url}/assinatura`,
      priceCurrency: "BRL",
      price: plan.price.toFixed(2),
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price.toFixed(2),
        priceCurrency: "BRL",
        billingDuration,
        billingIncrement: 1,
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: referenceUnit.value,
          unitCode: referenceUnit.unitCode,
        },
      },
      hasMerchantReturnPolicy: brMerchantReturnPolicy(),
      shippingDetails: brShippingDetails(),
    },
  };
}

// ---------------------------------------------------------------------------
// FAQPage Schema
// ---------------------------------------------------------------------------

export type FaqItem = { question: string; answer: string };

/**
 * FAQPage generica — alimenta PAA e featured snippets.
 * Usar em /assinatura, /para-empresas e PDPs com secao de FAQ.
 */
export function faqPageSchema(items: FaqItem[]) {
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

// ---------------------------------------------------------------------------
// Article Schema
// ---------------------------------------------------------------------------

export type ArticleInput = {
  title: string;
  description: string;
  slug: string;
  image: string; // URL absoluta ou relativa
  datePublished: string; // ISO
  dateModified?: string; // ISO
  author: {
    name: string;
    jobTitle?: string;
    url?: string;
  };
  section?: string; // ex: "Guia de torras"
  keywords?: string[];
  wordCount?: number;
};

/**
 * Article schema com author Person ligado a Organization (E-E-A-T forte).
 * Usar quando /revista voltar.
 */
export function articleSchema(article: ArticleInput) {
  const url = `${siteConfig.url}/revista/${article.slug}`;
  const imageUrl = article.image.startsWith("http")
    ? article.image
    : `${siteConfig.url}${article.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [imageUrl],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.jobTitle && { jobTitle: article.author.jobTitle }),
      ...(article.author.url && { url: article.author.url }),
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    ...(article.section && { articleSection: article.section }),
    ...(article.keywords && article.keywords.length > 0 && {
      keywords: article.keywords.join(", "),
    }),
    ...(article.wordCount && { wordCount: article.wordCount }),
    inLanguage: "pt-BR",
  };
}

// ---------------------------------------------------------------------------
// HowTo Schema
// ---------------------------------------------------------------------------

export type HowToStep = {
  name: string;
  text: string;
  image?: string;
  url?: string;
};

export type HowToInput = {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration ex: PT3M
  estimatedCost?: { value: number; currency: string };
  supplies?: string[]; // ex: cafe, agua
  tools?: string[]; // ex: V60, balanca
  steps: HowToStep[];
  yield?: string; // ex: "320ml"
};

/**
 * HowTo schema — receitas de preparo (V60, Chemex, Aeropress).
 * Alta probabilidade de virar rich result com steps no SERP.
 */
export function howToSchema(input: HowToInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.image && { image: input.image }),
    ...(input.totalTime && { totalTime: input.totalTime }),
    ...(input.estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        value: input.estimatedCost.value.toFixed(2),
        currency: input.estimatedCost.currency,
      },
    }),
    ...(input.yield && { yield: input.yield }),
    ...(input.supplies && {
      supply: input.supplies.map((s) => ({
        "@type": "HowToSupply",
        name: s,
      })),
    }),
    ...(input.tools && {
      tool: input.tools.map((t) => ({
        "@type": "HowToTool",
        name: t,
      })),
    }),
    step: input.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
  };
}

// ---------------------------------------------------------------------------
// WebSite Schema (com SearchAction)
// ---------------------------------------------------------------------------

/**
 * WebSite com potentialAction = SearchAction para sinalizar sitelinks
 * searchbox ao Google. Inserir no layout raiz junto ao Organization.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
