const combos = [
  {
    name: "Kit Degustação",
    description: "Experimente os 3 cafés da safra. Perfeito para descobrir seu favorito.",
    items: ["Clássico 250g", "Reserva 250g", "Micro-Lote 250g"],
    originalPrice: 209.7,
    price: 169.9,
    tag: "Economize R$ 39,80",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80",
  },
  {
    name: "Combo Clássico 3x",
    description: "Leve 3 pacotes do nosso best seller com desconto especial.",
    items: ["Clássico 250g x3"],
    originalPrice: 149.7,
    price: 119.9,
    tag: "Leve 3 Pague 2",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
  },
  {
    name: "Presente Especial",
    description: "Caixa premium com 2 cafés exclusivos + coador artesanal.",
    items: ["Reserva 250g", "Micro-Lote 250g", "Coador Artesanal"],
    originalPrice: 219.7,
    price: 179.9,
    tag: "Ideal para Presente",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Combos() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Kits e Combos
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-coffee-900 md:text-5xl">
            Mais Café, Mais Desconto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-coffee-600">
            Monte seu kit ou escolha um pronto. Quanto mais café, maior o
            desconto.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-500" />
        </div>

        {/* Combos grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo) => {
            const discount = Math.round(
              ((combo.originalPrice - combo.price) / combo.originalPrice) * 100
            );
            return (
              <div
                key={combo.name}
                className="group overflow-hidden rounded-2xl border-2 border-gold-400/30 bg-white transition-all hover:border-gold-500 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <div
                    className="aspect-[16/9] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${combo.image}')` }}
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-coffee-950">
                    -{discount}%
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-2 inline-block rounded-full bg-gold-400/10 px-3 py-1 text-xs font-semibold text-gold-600">
                    {combo.tag}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-coffee-900">
                    {combo.name}
                  </h3>
                  <p className="mt-2 text-sm text-coffee-500">
                    {combo.description}
                  </p>

                  {/* Items */}
                  <ul className="mt-4 space-y-1">
                    {combo.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-coffee-600"
                      >
                        <span className="text-gold-500">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="mt-5 rounded-lg bg-coffee-50 p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-coffee-400 line-through">
                        {formatCurrency(combo.originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-green-800">
                        {formatCurrency(combo.price * 0.9)}
                      </span>
                      <span className="text-sm font-medium text-green-700">
                        no PIX
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-coffee-400">
                      ou {formatCurrency(combo.price)} no cartão
                    </div>
                  </div>

                  <button className="mt-4 w-full rounded-full bg-gold-500 py-3 text-sm font-bold text-coffee-950 transition-all hover:bg-gold-400 hover:shadow-lg">
                    Comprar Kit
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
