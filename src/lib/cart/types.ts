/**
 * Tipos do carrinho Shopify (apos achatar edges/nodes do GraphQL).
 * Sao os shapes consumidos por store/actions/UI a partir do Step 3.
 */

export type Money = {
  amount: string;
  currencyCode: string;
};

export type CartLine = {
  /** Line id no formato gid://shopify/CartLine/... */
  id: string;
  quantity: number;
  merchandise: {
    /** Variant id no formato gid://shopify/ProductVariant/... */
    variantId: string;
    /** Titulo da variant (ex: '250g / Moido') */
    title: string;
    sku: string | null;
    price: Money;
    product: {
      title: string;
      handle: string;
      featuredImage: { url: string; altText: string | null } | null;
    };
    selectedOptions: Array<{ name: string; value: string }>;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
};
