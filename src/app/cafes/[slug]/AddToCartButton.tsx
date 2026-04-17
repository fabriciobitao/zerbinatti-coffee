"use client";

import { useCart } from "@/lib/cart-context";

export function AddToCartButton({
  id,
  name,
  price,
  weight,
}: {
  id: string;
  name: string;
  price: number;
  weight: string;
}) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem({ id, name, price, weight })}
      className="flex-1 rounded-full bg-coffee-900 px-5 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700 hover:shadow-lg active:scale-[0.97]"
    >
      Adicionar ao carrinho
    </button>
  );
}
