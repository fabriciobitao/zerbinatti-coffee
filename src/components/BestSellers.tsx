const bestSellers = [
  {
    name: "Clássico Zerbinatti",
    weight: "250g",
    price: 49.9,
    reviews: 127,
    stars: 4.8,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
  },
  {
    name: "Kit Degustação",
    weight: "3x 250g",
    price: 169.9,
    reviews: 89,
    stars: 4.9,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&q=80",
  },
  {
    name: "Reserva Especial",
    weight: "250g",
    price: 69.9,
    reviews: 64,
    stars: 4.7,
    image: "https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=400&q=80",
  },
  {
    name: "Combo Clássico 3x",
    weight: "3x 250g",
    price: 119.9,
    reviews: 53,
    stars: 4.9,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
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
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
              Destaque
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-coffee-900">
              Mais Vendidos
            </h2>
          </div>
          <a
            href="#cafes"
            className="text-sm font-medium text-gold-600 hover:text-gold-500"
          >
            Ver todos →
          </a>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {bestSellers.map((product) => (
            <div
              key={product.name}
              className="group min-w-[220px] shrink-0 cursor-pointer rounded-xl border border-coffee-100 bg-white p-4 transition-all hover:border-gold-400 hover:shadow-lg md:min-w-0"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-lg">
                <div
                  className="aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
              </div>

              {/* Info */}
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-coffee-900">
                  {product.name}
                </h3>
                <p className="text-xs text-coffee-400">{product.weight}</p>
                <Stars rating={product.stars} />
                <div className="mt-2 flex items-baseline gap-1">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
