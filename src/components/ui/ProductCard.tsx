"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/data/products";
import { Badge } from "./Badge";
import { SCABadge } from "./SCABadge";
import { FreshnessSignal } from "./FreshnessSignal";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function pixPrice(value: number) {
  return formatCurrency(value * 0.9);
}

function installments(value: number) {
  const parcelas = value <= 50 ? 2 : value <= 70 ? 3 : 4;
  return { count: parcelas, value: formatCurrency(value / parcelas) };
}

export function ProductCard({
  product,
  delay = 1,
}: {
  product: Product;
  delay?: number;
}) {
  const { addItem } = useCart();
  const inst = installments(product.price);

  return (
    <div
      className={`reveal reveal-delay-${delay} group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(26,17,8,0.25)]`}
    >
      <div className="absolute left-2.5 top-2.5 z-10 sm:left-4 sm:top-4">
        <Badge variant={product.tagVariant}>{product.tag}</Badge>
      </div>
      <div className="absolute right-2.5 top-2.5 z-10 sm:right-4 sm:top-4">
        <Badge variant="discount">-10% PIX</Badge>
      </div>

      <Link
        href={`/cafes/${product.slug}`}
        aria-label={`Ver detalhes do ${product.name}`}
        className="flex items-center justify-center bg-gradient-to-b from-coffee-100 to-coffee-200/50 py-5 transition-transform duration-500 group-hover:scale-[1.02] sm:py-8"
      >
        <div className="relative w-[100px] sm:w-[140px]">
          <div
            className="relative mx-auto h-[130px] w-full overflow-hidden rounded-b-lg rounded-t-sm sm:h-[180px]"
            style={{
              background:
                "linear-gradient(135deg, #D4B896 0%, #C4A67D 25%, #B8956A 50%, #C4A67D 75%, #D4B896 100%)",
              boxShadow:
                "3px 3px 15px rgba(0,0,0,0.2), inset 2px 0 6px rgba(255,255,255,0.1)",
            }}
          >
            <div className="absolute inset-[6%] flex items-center justify-center">
              <img
                src="/images/rotulo-500g.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div
              className="absolute left-0 top-0 bottom-0 w-[6%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.1), transparent)",
              }}
            />
          </div>
          <div
            className="mx-auto mt-1 h-2 w-[85%] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)",
            }}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <SCABadge score={product.score} size="sm" />
          <span className="text-xs text-coffee-600">
            Torra {product.roast}
          </span>
        </div>
        <div className="mb-3">
          <FreshnessSignal roastDate={product.roastDate} variant="compact" />
        </div>

        <h3 className="font-serif text-lg font-bold text-coffee-900 sm:text-xl">
          <Link
            href={`/cafes/${product.slug}`}
            className="hover:text-coffee-700"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-coffee-500">
          {product.origin.variety} · {product.origin.region}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-coffee-600">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="rounded-full bg-coffee-50 px-2 py-0.5 text-xs text-coffee-700"
            >
              {note}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 rounded-lg sm:pt-5">
          <div className="rounded-lg bg-coffee-50 p-3 sm:p-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-green-800 sm:text-2xl">
                {pixPrice(product.price)}
              </span>
              <span className="text-xs font-medium text-green-700 sm:text-sm">no PIX</span>
            </div>
            <div className="mt-1 min-h-[2.5rem] text-xs text-coffee-600 sm:min-h-[2.75rem] sm:text-sm">
              ou {formatCurrency(product.price)} em até{" "}
              <span className="font-semibold text-coffee-700">
                {inst.count}x de {inst.value}
              </span>{" "}
              sem juros
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 sm:mt-4">
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                weight: product.weight,
              })
            }
            className="flex-1 rounded-full bg-coffee-900 py-2.5 text-sm font-semibold text-coffee-50 transition-all duration-200 hover:bg-coffee-700 hover:shadow-lg active:scale-[0.97] sm:py-3"
          >
            Adicionar
          </button>
          <Link
            href={`/cafes/${product.slug}`}
            className="rounded-full border border-coffee-300 px-3 py-2.5 text-sm font-semibold text-coffee-900 transition-all hover:border-coffee-500 hover:bg-coffee-50 sm:px-4 sm:py-3"
          >
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
