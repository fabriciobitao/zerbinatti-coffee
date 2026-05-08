/**
 * Shopify Storefront API client.
 *
 * Env vars (.env.local):
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN     — ex: zerbinatticoffee.myshopify.com
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN — public token (client + server)
 *   SHOPIFY_STOREFRONT_PRIVATE_TOKEN     — private token (server only, rate limit maior)
 */

const API_VERSION = "2024-10";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";

function getToken(): string {
  return process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";
}

const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

export function isShopifyConfigured(): boolean {
  return Boolean(domain && getToken());
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store",
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error(
      "Shopify nao configurado. Defina NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN e NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN em .env.local",
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": getToken(),
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "Shopify GraphQL error");
  }

  return json.data as T;
}

// ---------- Queries ----------

export const GET_ALL_PRODUCTS = /* GraphQL */ `
  query GetAllProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          tags
          productType
          vendor
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                }
              }
            }
          }
          options {
            id
            name
            values
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      tags
      productType
      vendor
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        id
        name
        values
      }
    }
  }
`;

// ---------- Cart ----------

export const CREATE_CART = /* GraphQL */ `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment()}
`;

export const ADD_TO_CART = /* GraphQL */ `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment()}
`;

export const UPDATE_CART_LINES = /* GraphQL */ `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment()}
`;

export const REMOVE_FROM_CART = /* GraphQL */ `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment()}
`;

export const GET_CART = /* GraphQL */ `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
  ${cartFragment()}
`;

function cartFragment() {
  return /* GraphQL */ `
    fragment CartFields on Cart {
      id
      checkoutUrl
      totalQuantity
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                sku
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                  featuredImage {
                    url
                    altText
                  }
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
    }
  `;
}
