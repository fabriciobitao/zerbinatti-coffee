/**
 * PDP CTA — desativado temporariamente.
 * Renderiza um badge nao-interativo "Em breve" no lugar do botao de carrinho
 * enquanto a loja ainda nao esta liberada para vendas.
 */

export function AddToCartButton({
  variantId,
  availableForSale,
}: {
  variantId: string | null;
  availableForSale: boolean;
}) {
  return (
    <span
      aria-disabled="true"
      data-coming-soon="true"
      data-variant-id={variantId ?? ""}
      data-available={availableForSale ? "true" : "false"}
      className="flex-1 inline-flex items-center justify-center rounded-full bg-coffee-900 px-5 py-3 text-sm font-semibold text-coffee-50 opacity-60 cursor-not-allowed"
    >
      Em breve
    </span>
  );
}
