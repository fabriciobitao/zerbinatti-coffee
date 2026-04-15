const products = [
  {
    name: "Clássico Zerbinatti",
    description: "Blend tradicional da família. Notas de chocolate, caramelo e nozes.",
    score: "85",
    roast: "Média",
    weight: "250g",
    price: "R$ 49,90",
    tag: "Mais Vendido",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
  },
  {
    name: "Reserva Especial",
    description: "Single origin, colheita seletiva. Notas de frutas vermelhas e mel.",
    score: "88",
    roast: "Média-Clara",
    weight: "250g",
    price: "R$ 69,90",
    tag: "Edição Limitada",
    image: "https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=600&q=80",
  },
  {
    name: "Micro-Lote Premium",
    description: "Lote exclusivo, 500 pacotes. Notas florais, cítricas e acidez brilhante.",
    score: "90+",
    roast: "Clara",
    weight: "250g",
    price: "R$ 89,90",
    tag: "Raridade",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80",
  },
];

export default function Products() {
  return (
    <section id="cafes" className="bg-coffee-100/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
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
          {products.map((product) => (
            <div
              key={product.name}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl"
            >
              {/* Tag */}
              <div className="absolute left-4 top-4 z-10 rounded-full bg-coffee-900/90 px-3 py-1 text-xs font-medium text-gold-400 backdrop-blur-sm">
                {product.tag}
              </div>

              {/* Image */}
              <div className="overflow-hidden">
                <div
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
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

                {/* Price + CTA */}
                <div className="mt-6 flex items-center justify-between border-t border-coffee-100 pt-4">
                  <div>
                    <span className="text-2xl font-bold text-coffee-900">
                      {product.price}
                    </span>
                    <span className="ml-1 text-sm text-coffee-400">
                      / {product.weight}
                    </span>
                  </div>
                  <button className="rounded-full bg-coffee-900 px-5 py-2.5 text-sm font-medium text-coffee-50 transition-all hover:bg-coffee-800 hover:shadow-lg">
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
