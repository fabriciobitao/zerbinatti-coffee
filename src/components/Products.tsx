"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Kicker, AsymmetricDivider } from "@/components/ui/Editorial";

export default function Products() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="cafes"
      className="relative overflow-hidden bg-coffee-100/50 py-20 sm:py-28 lg:py-36"
    >
      {/* Backdrop tipográfico */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          className="select-none font-serif italic text-coffee-200/35 sm:text-coffee-200/50"
          style={{
            fontSize: "clamp(15rem, 44vw, 28rem)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          III
        </span>
      </div>

      <div ref={sectionRef} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-16">
          <div className="max-w-xl">
            <Kicker>Cafés da casa</Kicker>
            <h2 className="mt-6 font-serif font-bold leading-[0.95] tracking-[-0.02em] text-coffee-900 text-[clamp(2.75rem,8vw,4.5rem)]">
              Três cafés
              <br />
              <span className="italic text-gold-600">da safra 2026.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <AsymmetricDivider className="mb-5" />
            <p className="text-base leading-relaxed text-coffee-600 sm:text-lg">
              Um blend tradicional, um single origin sazonal e um microlote raro.
              Torrados sob demanda, enviados com data de torra.
            </p>
          </div>
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
