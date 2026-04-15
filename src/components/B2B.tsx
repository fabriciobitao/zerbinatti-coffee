export default function B2B() {
  return (
    <section id="contato" className="bg-coffee-100/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
              Para Empresas
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-coffee-900 md:text-5xl">
              Parceria B2B
            </h2>
            <div className="mt-4 h-px w-16 bg-gold-500" />

            <p className="mt-8 text-lg leading-relaxed text-coffee-600">
              Torrefações, cafeterias, restaurantes e escritórios — levamos
              o café Zerbinatti direto para o seu negócio. Sem intermediários,
              com alocação exclusiva e preços especiais.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Torrefações e Cafeterias",
                  description:
                    "Grãos verdes ou torrados, lotes exclusivos, suporte técnico para sua torra.",
                },
                {
                  title: "Restaurantes e Hotéis",
                  description:
                    "Blend personalizado com a identidade do seu estabelecimento.",
                },
                {
                  title: "Escritórios",
                  description:
                    "Programa corporativo de café especial. Entregas recorrentes para seu time.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-coffee-200 bg-white p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10">
                    <span className="text-lg text-gold-600">✦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-coffee-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
