"use client";

import { useCart } from "@/lib/cart-context";

const bestSellers = [
  {
    id: "classico-500g",
    name: "Clássico Zerbinatti",
    weight: "500g",
    price: 69.9,
    reviews: 127,
    stars: 4.8,
  },
  {
    id: "reserva-500g",
    name: "Reserva Especial",
    weight: "500g",
    price: 89.9,
    reviews: 64,
    stars: 4.7,
  },
  {
    id: "microlote-500g",
    name: "Micro-Lote Premium",
    weight: "500g",
    price: 119.9,
    reviews: 42,
    stars: 4.9,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= Math.floor(rating) ? "text-gold-500" : "text-coffee-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-coffee-500">({rating})</span>
    </div>
  );
}

export default function BestSellers() {
  const { addItem } = useCart();

  return (
    <section className="bg-coffee-200 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Destaque
          </span>
          <h2 className="mt-2 font-serif text-2xl font-bold text-coffee-900 sm:text-3xl">
            Mais Vendidos
          </h2>
        </div>

        {/* Grid centralizado */}
        <div className="flex justify-center gap-3 overflow-x-auto pb-4 sm:gap-5 md:overflow-visible md:pb-0">
          {bestSellers.map((product) => (
            <div
              key={product.name}
              className="group w-[170px] shrink-0 cursor-pointer rounded-xl border border-coffee-100 bg-white p-3 transition-all hover:border-gold-400 hover:shadow-lg sm:w-[220px] sm:p-4"
            >
              {/* Product bag image */}
              <div className="flex items-center justify-center rounded-lg bg-gradient-to-b from-coffee-50 to-coffee-100/50 py-4">
                <img
                  src="/images/rotulo-500g.png"
                  alt={product.name}
                  className="h-[120px] w-auto object-contain sm:h-[160px]"
                />
              </div>

              {/* Info */}
              <div className="mt-3 text-center">
                <h3 className="text-sm font-semibold text-coffee-900">
                  {product.name}
                </h3>
                <p className="text-xs text-coffee-400">{product.weight}</p>
                <div className="mt-1 flex justify-center">
                  <Stars rating={product.stars} />
                </div>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-lg font-bold text-green-800">
                    {(product.price * 0.9).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <span className="text-xs text-green-700">PIX</span>
                </div>
                <p className="text-xs text-coffee-400">
                  {product.reviews} avaliações
                </p>
                <button
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, weight: product.weight })}
                  className="mt-3 w-full rounded-full bg-coffee-900 py-2 text-xs font-semibold text-coffee-50 transition-all hover:bg-coffee-800 active:scale-95"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
