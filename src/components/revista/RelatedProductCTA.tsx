import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { products, type Product } from "@/lib/data/products";

const ARTICLE_TO_PRODUCT_SLUG: Record<string, string> = {
  "serra-do-cabral-terroir": "microlote",
  "torra-sob-demanda-por-que-importa": "classico",
  "historia-giuseppe-zerbinatti-1897": "reserva",
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function RelatedProductCTA({ articleSlug }: { articleSlug: string }) {
  const productSlug = ARTICLE_TO_PRODUCT_SLUG[articleSlug];
  if (!productSlug) return null;
  const product: Product | undefined = products.find((p) => p.slug === productSlug);
  if (!product) return null;
  const pix = product.price * 0.9;

  return (
    <aside className="my-12 rounded-2xl border border-coffee-200 bg-gradient-to-br from-coffee-50 to-white p-6 sm:p-8">
      <span className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
        Prove agora
      </span>
      <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <Badge variant={product.tagVariant}>{product.tag}</Badge>
            <Badge variant="score">SCA {product.score}</Badge>
          </div>
          <h3 className="mt-3 font-serif text-2xl font-bold text-coffee-900 sm:text-3xl">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-coffee-700 sm:text-base">
            {product.tagline}. {product.notes.slice(0, 3).join(", ")}.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div>
            <div className="font-serif text-2xl font-bold text-green-800 sm:text-3xl">
              {formatCurrency(pix)}
              <span className="ml-2 text-xs font-medium text-green-700">no PIX</span>
            </div>
            <div className="text-xs text-coffee-600">
              ou {formatCurrency(product.price)} em até 4x
            </div>
          </div>
          <Link
            href={`/cafes/${product.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-coffee-900 px-5 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700"
          >
            Ver detalhes <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
