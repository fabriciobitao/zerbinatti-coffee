"use client";

import { useCart } from "@/lib/cart-context";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const products = [
  {
    id: "classico-500g",
    name: "Clássico Zerbinatti",
    description: "Blend tradicional da família. Notas de chocolate, caramelo e nozes.",
    score: "85",
    roast: "Média",
    weight: "500g",
    price: 69.9,
    tag: "Mais Vendido",
  },
  {
    id: "reserva-500g",
    name: "Reserva Especial",
    description: "Single origin, colheita seletiva. Notas de frutas vermelhas e mel.",
    score: "88",
    roast: "Média-Clara",
    weight: "500g",
    price: 89.9,
    tag: "Edição Limitada",
  },
  {
    id: "microlote-500g",
    name: "Micro-Lote Premium",
    description: "Lote exclusivo, 500 pacotes. Notas florais, cítricas e acidez brilhante.",
    score: "90+",
    roast: "Clara",
    weight: "500g",
    price: 119.9,
    tag: "Raridade",
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function pixPrice(value: number) {
  return formatCurrency(value * 0.9);
}

function installments(value: number) {
  const parcelas = value <= 50 ? 2 : value <= 70 ? 3 : 4;
  return { count: parcelas, value: formatCurrency(value / parcelas) };
}

export default function Products() {
  const { addItem } = useCart();
  const sectionRef = useScrollReveal();

  return (
    <section id="cafes" className="bg-coffee-100/50 py-24 lg:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="reveal mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Nossos Cafés
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-coffee-900 md:text-5xl">
            Edições da Safra 2026
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-coffee-600">
            Cada lote é único, como a safra que o produziu. Quando acaba, acaba.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-500" />
        </div>

        {/* Product grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const inst = installments(product.price);
            return (
              <div
                key={product.name}
                className={`reveal reveal-delay-${products.indexOf(product) + 1} group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(26,17,8,0.25)]`}
              >
                {/* Tag */}
                <div className="absolute left-4 top-4 z-10 rounded-full bg-coffee-900/90 px-3 py-1 text-xs font-medium text-gold-400 backdrop-blur-sm">
                  {product.tag}
                </div>

                {/* Discount badge */}
                <div className="absolute right-4 top-4 z-10 rounded-full bg-green-800 px-2.5 py-1 text-xs font-bold text-white">
                  -10% PIX
                </div>

                {/* Product bag mockup */}
                <div className="flex items-center justify-center bg-gradient-to-b from-coffee-100 to-coffee-200/50 py-8 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="relative w-[140px]">
                    <div
                      className="relative mx-auto h-[180px] w-full overflow-hidden rounded-b-lg rounded-t-sm"
                      style={{
                        background: "linear-gradient(135deg, #D4B896 0%, #C4A67D 25%, #B8956A 50%, #C4A67D 75%, #D4B896 100%)",
                        boxShadow: "3px 3px 15px rgba(0,0,0,0.2), inset 2px 0 6px rgba(255,255,255,0.1)",
                      }}
                    >
                      <div className="absolute inset-[6%] flex items-center justify-center">
                        <img src="/images/rotulo-500g.png" alt={product.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-[6%]" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.1), transparent)" }} />
                    </div>
                    <div className="mx-auto mt-1 h-2 w-[85%] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)" }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Score badge */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-green-800/10 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      SCA {product.score}
                    </span>
                    <span className="text-xs text-coffee-400">
                      Torra {product.roast}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-coffee-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-coffee-500">
                    {product.description}
                  </p>

                  {/* Pricing */}
                  <div className="mt-5 rounded-lg bg-coffee-50 p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-green-800">
                        {pixPrice(product.price)}
                      </span>
                      <span className="text-sm font-medium text-green-700">no PIX</span>
                    </div>
                    <div className="mt-1 text-sm text-coffee-400">
                      ou {formatCurrency(product.price)} em até{" "}
                      <span className="font-semibold text-coffee-700">
                        {inst.count}x de {inst.value}
                      </span>{" "}
                      sem juros
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, weight: product.weight })}
                    className="mt-4 w-full rounded-full bg-coffee-900 py-3 text-sm font-semibold text-coffee-50 transition-all duration-200 hover:bg-coffee-800 hover:shadow-lg active:scale-[0.97] group-hover:bg-gold-600 group-hover:text-coffee-950"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
