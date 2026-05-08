"use client";

/**
 * PDP Add-to-Cart button.
 * Wired to the new Zustand cart store + Shopify Server Actions.
 *
 * Receives a Shopify variantId (gid://shopify/ProductVariant/...) from the
 * server component (page.tsx) and calls `addItem(variantId, 1)` on click.
 * The store optimistically opens the drawer for instant feedback.
 *
 * If `variantId` is null (slug nao mapeado para produto Shopify) ou
 * `availableForSale` for false, o botao renderiza disabled como "Em breve".
 */

import { useCartStore } from "@/lib/cart/store";

export function AddToCartButton({
  variantId,
  availableForSale,
}: {
  variantId: string | null;
  availableForSale: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const disabled = !variantId || !availableForSale || isLoading;

  const label = !variantId || !availableForSale
    ? "Em breve"
    : isLoading
      ? "Adicionando..."
      : "Adicionar ao carrinho";

  return (
    <button
      type="button"
      data-variant-id={variantId ?? ""}
      data-available={availableForSale ? "true" : "false"}
      onClick={() => {
        if (!variantId || !availableForSale) return;
        void addItem(variantId, 1);
      }}
      disabled={disabled}
      className="flex-1 rounded-full bg-coffee-900 px-5 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700 hover:shadow-lg active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-coffee-900 disabled:hover:shadow-none disabled:active:scale-100"
    >
      {label}
    </button>
  );
}
