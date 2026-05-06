import { Review } from "@/lib/data/products";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "text-gold-500" : "text-coffee-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.375 2.451a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.375-2.45a1 1 0 00-1.175 0l-3.375 2.45c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function Reviews({
  reviews,
  productName,
}: {
  reviews: Review[];
  productName: string;
}) {
  if (reviews.length === 0) return null;

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="border-t border-coffee-100 py-12">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-coffee-900 sm:text-3xl">
            O que dizem sobre o {productName}
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={Math.round(avg)} />
            <span className="text-sm font-semibold text-coffee-800">
              {avg.toFixed(1)}
            </span>
            <span className="text-sm text-coffee-600">
              ({reviews.length} avaliações verificadas)
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={`${r.author}-${r.date}`}
            className="rounded-xl border border-coffee-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-coffee-100 font-serif text-sm font-bold text-coffee-800"
                aria-hidden="true"
              >
                {getInitials(r.author)}
              </div>
              <div>
                <div className="text-sm font-semibold text-coffee-900">
                  {r.author}
                </div>
                <div className="text-xs text-coffee-600">{r.location}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Stars rating={r.rating} />
              <span className="text-xs text-coffee-500">
                {formatDate(r.date)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-coffee-700">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-coffee-50 px-2.5 py-0.5 text-xs text-coffee-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
              Método: {r.method}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
