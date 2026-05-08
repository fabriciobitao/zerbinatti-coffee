"use server";

/**
 * Server Actions para o carrinho Shopify.
 * Wrappers em torno de `shopifyFetch` que mapeiam o response GraphQL
 * (com edges/nodes) para o tipo plano `Cart` definido em ./types.
 *
 * Roda no Node runtime (default do App Router). Nunca usar 'edge' aqui:
 * dependencias dependem de SHOPIFY_STOREFRONT_PRIVATE_TOKEN.
 */

import {
  shopifyFetch,
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINES,
  REMOVE_FROM_CART,
  GET_CART,
} from "../shopify";
import type { Cart, CartLine } from "./types";

// ---------- Tipos crus do GraphQL ----------

type RawMoney = { amount: string; currencyCode: string };

type RawCartLineNode = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    sku: string | null;
    price: RawMoney;
    product: {
      title: string;
      handle: string;
      featuredImage: { url: string; altText: string | null } | null;
    };
    selectedOptions: Array<{ name: string; value: string }>;
  };
};

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { edges: Array<{ node: RawCartLineNode }> };
  cost: {
    subtotalAmount: RawMoney;
    totalAmount: RawMoney;
    totalTaxAmount: RawMoney | null;
  };
};

type UserError = { field: string[] | null; message: string };

type CartCreateResponse = {
  cartCreate: { cart: RawCart | null; userErrors: UserError[] };
};
type CartLinesAddResponse = {
  cartLinesAdd: { cart: RawCart | null; userErrors: UserError[] };
};
type CartLinesUpdateResponse = {
  cartLinesUpdate: { cart: RawCart | null; userErrors: UserError[] };
};
type CartLinesRemoveResponse = {
  cartLinesRemove: { cart: RawCart | null; userErrors: UserError[] };
};
type CartGetResponse = { cart: RawCart | null };

// ---------- Helpers ----------

function flattenCart(raw: RawCart): Cart {
  const lines: CartLine[] = raw.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    merchandise: {
      variantId: node.merchandise.id,
      title: node.merchandise.title,
      sku: node.merchandise.sku,
      price: node.merchandise.price,
      product: node.merchandise.product,
      selectedOptions: node.merchandise.selectedOptions,
    },
  }));

  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    lines,
    cost: raw.cost,
  };
}

function assertNoUserErrors(errors: UserError[], context: string): void {
  if (errors && errors.length > 0) {
    const message = errors.map((e) => e.message).join("; ");
    throw new Error(`${context}: ${message}`);
  }
}

function assertCart(cart: RawCart | null, context: string): RawCart {
  if (!cart) {
    throw new Error(`${context}: Shopify retornou cart vazio`);
  }
  return cart;
}

// ---------- Actions ----------

export async function createCartAction(
  lines: Array<{ variantId: string; quantity: number }> = [],
): Promise<Cart> {
  const data = await shopifyFetch<CartCreateResponse>({
    query: CREATE_CART,
    variables: {
      input: {
        lines: lines.map((l) => ({
          merchandiseId: l.variantId,
          quantity: l.quantity,
        })),
      },
    },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartCreate.userErrors, "createCartAction");
  return flattenCart(assertCart(data.cartCreate.cart, "createCartAction"));
}

export async function addToCartAction(
  cartId: string | null,
  variantId: string,
  quantity: number,
): Promise<Cart> {
  if (!cartId) {
    return createCartAction([{ variantId, quantity }]);
  }

  const data = await shopifyFetch<CartLinesAddResponse>({
    query: ADD_TO_CART,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartLinesAdd.userErrors, "addToCartAction");
  return flattenCart(assertCart(data.cartLinesAdd.cart, "addToCartAction"));
}

export async function updateLineAction(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  // qty 0 -> remove (Shopify aceita 0 em cartLinesUpdate, mas removeLine e
  // mais explicito e garante o mesmo resultado).
  if (quantity <= 0) {
    return removeLineAction(cartId, lineId);
  }

  const data = await shopifyFetch<CartLinesUpdateResponse>({
    query: UPDATE_CART_LINES,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartLinesUpdate.userErrors, "updateLineAction");
  return flattenCart(assertCart(data.cartLinesUpdate.cart, "updateLineAction"));
}

export async function removeLineAction(
  cartId: string,
  lineId: string,
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesRemoveResponse>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds: [lineId] },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartLinesRemove.userErrors, "removeLineAction");
  return flattenCart(assertCart(data.cartLinesRemove.cart, "removeLineAction"));
}

export async function getCartAction(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<CartGetResponse>({
    query: GET_CART,
    variables: { cartId },
    cache: "no-store",
  });

  // Shopify retorna `cart: null` quando o cart expirou ou nunca existiu.
  if (!data.cart) return null;
  return flattenCart(data.cart);
}
