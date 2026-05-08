/**
 * Server-only orchestrator: fetches Shopify products and merges them with
 * the editorial enrichment (sensory, flavors, origin, etc).
 *
 * Consumed by Server Components / Route Handlers — never by client code.
 * The "server-only" import will throw at build time if a client bundle
 * tries to import this module, protecting the private Shopify token.
 */

import "server-only";

import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  isShopifyConfigured,
  shopifyFetch,
} from "./shopify";
import {
  editorialByHandle,
  type EditorialProduct,
} from "./editorial/classico";

// ---------- Public types ----------

export type HomeImage = { url: string; altText: string | null };

export type HomeVariantSlot = {
  /** Stable UI slot id (from editorial) or fallback `${handle}-${index}`. */
  slotKey: string;
  /** Shopify GID, e.g. 'gid://shopify/ProductVariant/44078248099928'. */
  variantId: string;
  /** Shopify variant title, e.g. '250g / Moído'. */
  title: string;
  selectedOptions: Array<{ name: string; value: string }>;
  /** Pre-formatted BRL string, e.g. 'R$ 39,90'. */
  priceFormatted: string;
  priceAmount: number;
  currencyCode: string;
  availableForSale: boolean;
  image: HomeImage | null;
};

export type HomeProduct = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  featuredImage: HomeImage | null;
  images: HomeImage[];
  variants: HomeVariantSlot[];
  /** Editorial enrichment (sensory, flavors, origin). May be null if no entry. */
  editorial: EditorialProduct | null;
};

// ---------- Shopify response types ----------

type Money = { amount: string; currencyCode: string };

type ShopifyImage = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

type ShopifyVariant = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: Array<{ name: string; value: string }>;
  image?: ShopifyImage | null;
};

type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml: string;
  tags?: string[];
  productType?: string;
  vendor?: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice?: Money;
  };
  featuredImage?: ShopifyImage | null;
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ id?: string; name: string; values: string[] }>;
};

type GetAllProductsResponse = {
  products: { edges: Array<{ node: ShopifyProduct }> };
};

type GetProductByHandleResponse = {
  product: ShopifyProduct | null;
};

// ---------- Helpers ----------

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatPrice(amount: string | number, currencyCode: string): string {
  const num = typeof amount === "string" ? Number(amount) : amount;
  if (currencyCode === "BRL") {
    return brlFormatter.format(num);
  }
  // Fallback for any non-BRL currency Shopify might return.
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currencyCode,
  }).format(num);
}

/**
 * Resolve a Shopify variant to a UI slot using the editorial mapping.
 * If no editorial slot matches, falls back to `${handle}-${index}`.
 */
function resolveSlotKey(
  handle: string,
  index: number,
  selectedOptions: Array<{ name: string; value: string }>,
  editorial: EditorialProduct | null,
): string {
  if (editorial) {
    const match = editorial.variantSlots.find((slot) =>
      selectedOptions.some(
        (opt) =>
          opt.name === slot.matchOption.name &&
          opt.value === slot.matchOption.value,
      ),
    );
    if (match) return match.slotKey;
  }
  return `${handle}-${index}`;
}

function mapVariant(
  handle: string,
  index: number,
  variant: ShopifyVariant,
  editorial: EditorialProduct | null,
): HomeVariantSlot {
  const slotKey = resolveSlotKey(
    handle,
    index,
    variant.selectedOptions,
    editorial,
  );

  const editorialSlot = editorial?.variantSlots.find(
    (s) => s.slotKey === slotKey,
  );
  const shopifyAmount = Number(variant.price.amount);
  // Editorial price override wins until Shopify is reimported with new SKU prices.
  const amount =
    editorialSlot?.priceOverrideBRL && variant.price.currencyCode === "BRL"
      ? editorialSlot.priceOverrideBRL
      : shopifyAmount;

  return {
    slotKey,
    variantId: variant.id,
    title: variant.title,
    selectedOptions: variant.selectedOptions,
    priceFormatted: formatPrice(amount, variant.price.currencyCode),
    priceAmount: amount,
    currencyCode: variant.price.currencyCode,
    availableForSale: variant.availableForSale,
    image: variant.image
      ? { url: variant.image.url, altText: variant.image.altText ?? null }
      : null,
  };
}

function mapProduct(node: ShopifyProduct): HomeProduct {
  const editorial = editorialByHandle[node.handle] ?? null;

  const images: HomeImage[] = node.images.edges.map(({ node: img }) => ({
    url: img.url,
    altText: img.altText ?? null,
  }));

  const variants: HomeVariantSlot[] = node.variants.edges.map(
    ({ node: v }, i) => mapVariant(node.handle, i, v, editorial),
  );

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    descriptionHtml: node.descriptionHtml,
    featuredImage: node.featuredImage
      ? {
          url: node.featuredImage.url,
          altText: node.featuredImage.altText ?? null,
        }
      : null,
    images,
    variants,
    editorial,
  };
}

// ---------- Public API ----------

/**
 * Fetch all products to render the home/catalog.
 * Tagged with 'shopify-products' so we can later trigger
 * `revalidateTag('shopify-products')` from a webhook.
 */
export async function getHomeProducts(): Promise<HomeProduct[]> {
  if (!isShopifyConfigured()) return [];
  const data = await shopifyFetch<GetAllProductsResponse>({
    query: GET_ALL_PRODUCTS,
    variables: { first: 20 },
    tags: ["shopify-products"],
  });

  return data.products.edges.map(({ node }) => mapProduct(node));
}

/**
 * Fetch a single product by handle for the PDP.
 * Returns null if the handle does not exist in the store.
 */
export async function getProductByHandle(
  handle: string,
): Promise<HomeProduct | null> {
  if (!isShopifyConfigured()) return null;
  const data = await shopifyFetch<GetProductByHandleResponse>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: ["shopify-products", `shopify-product:${handle}`],
  });

  if (!data.product) return null;
  return mapProduct(data.product);
}
