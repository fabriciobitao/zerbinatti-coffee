/**
 * Shopify Storefront API client
 *
 * Configure these env vars in .env.local:
 * NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 * SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "Shopify API error");
  }

  return json.data as T;
}

// --- Product Queries ---

export const GET_ALL_PRODUCTS = `
  query GetAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          tags
          metafields(identifiers: [
            { namespace: "custom", key: "sca_score" },
            { namespace: "custom", key: "roast_level" },
            { namespace: "custom", key: "flavor_notes" },
            { namespace: "custom", key: "origin_region" }
          ]) {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
          }
        }
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
      metafields(identifiers: [
        { namespace: "custom", key: "sca_score" },
        { namespace: "custom", key: "roast_level" },
        { namespace: "custom", key: "flavor_notes" },
        { namespace: "custom", key: "origin_region" },
        { namespace: "custom", key: "altitude" },
        { namespace: "custom", key: "process" }
      ]) {
        key
        value
      }
    }
  }
`;

// --- Cart Queries ---

export const CREATE_CART = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
