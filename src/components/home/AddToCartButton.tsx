/**
 * Card de produto (home #cafes) — botao "Adicionar" desativado temporariamente.
 * Renderiza um badge nao-interativo "Em breve" no lugar do CTA de carrinho
 * enquanto a loja ainda nao esta liberada para vendas.
 */

type Props = {
  variantId: string;
  available: boolean;
  label?: string;
};

export function AddToCartButton({ variantId, available }: Props) {
  return (
    <span
      className="btn btn-gold"
      aria-disabled="true"
      data-coming-soon="true"
      data-variant-id={variantId}
      data-available={available ? 'true' : 'false'}
    >
      Em breve
    </span>
  );
}
