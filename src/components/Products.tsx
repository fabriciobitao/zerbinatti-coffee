"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Ornament } from "@/components/ui/Ornament";

export default function Products() {
  const sectionRef = useScrollReveal();

  return (
    <section id="cafes" className="bg-coffee-100/50 py-16 sm:py-24 lg:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Nossos Cafés
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
            Edições da Safra 2026
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-coffee-600">
            Cada lote é único, como a safra que o produziu. Quando acaba,
            acaba.
          </p>
          <Ornament className="mt-6" />
        </div>

        <div className="grid gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
