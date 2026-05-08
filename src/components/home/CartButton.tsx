'use client';

/**
 * CartButton — icone de carrinho do header com badge de quantidade.
 *
 * Estrutura copiada verbatim de public/novo-layout/index.html:
 *   <button class="icon-btn" aria-label="Carrinho" id="cartBtn">
 *     <svg ...>...</svg>
 *     <span class="cart-count">0</span>
 *   </button>
 *
 * Subscreve apenas `cart.totalQuantity` para evitar re-renders desnecessarios.
 * Click chama `openCart()` direto via `getState()` (nao precisa subscrever a action).
 */

import { useCartStore } from '@/lib/cart/store';

export function CartButton() {
  const totalQuantity = useCartStore((s) => s.cart?.totalQuantity ?? 0);
  const hasItems = totalQuantity > 0;

  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={`Carrinho${hasItems ? ` (${totalQuantity})` : ''}`}
      onClick={() => useCartStore.getState().openCart()}
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path d="M5 7h14l-1.5 11H6.5L5 7z" />
        <path d="M9 7V5a3 3 0 016 0v2" />
      </svg>
      <span
        className="cart-count"
        style={{ display: hasItems ? 'grid' : 'none' }}
        aria-hidden={!hasItems}
      >
        {totalQuantity}
      </span>
    </button>
  );
}

export default CartButton;
