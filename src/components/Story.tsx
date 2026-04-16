export default function Story() {
  return (
    <section id="origem" className="relative overflow-hidden bg-coffee-50 py-16 sm:py-24 lg:py-32">
      {/* Decorative */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-300/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-green-700/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Nossa História
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
            Tradição e Paixão pelo Café
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-500" />
        </div>

        {/* Timeline */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524350876685-274059332603?w=800&q=80')",
                }}
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-coffee-900 p-4 shadow-2xl sm:-bottom-6 sm:-right-6 sm:p-6 lg:-right-10">
              <img src="/images/selo-100.png" alt="Zerbinatti 100" className="h-16" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-2xl font-bold text-coffee-800 sm:text-3xl">
              Da Itália ao Coração do Brasil
            </h3>
            <p className="mt-6 text-base leading-relaxed text-coffee-600 sm:text-lg">
              A família Zerbinatti trouxe da Itália não apenas uma tradição
              agrícola, mas uma filosofia: o café perfeito nasce da terra, do
              tempo e do cuidado de quem planta.
            </p>
            <p className="mt-4 text-base leading-relaxed text-coffee-600 sm:text-lg">
              Cada grão Zerbinatti é cultivado com dedicação artesanal.
              Colheita seletiva, secagem natural ao sol, torra precisa — cada
              etapa é um ritual de qualidade.
            </p>
            <p className="mt-4 text-base leading-relaxed text-coffee-600 sm:text-lg">
              Nosso café não é produzido em massa. É uma edição limitada da
              natureza, com terroir único e notas que contam a história de cada
              safra.
            </p>

            {/* Notas de paladar */}
            <div className="mt-8">
              <img
                src="/images/notas-paladar.png"
                alt="Notas de paladar - Xícara limpa, corpo encorpado, acidez equilibrada"
                className="w-full max-w-sm rounded-lg"
              />
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-coffee-200 pt-6 sm:mt-10 sm:gap-6 sm:pt-8">
              <div>
                <div className="font-serif text-2xl font-bold text-coffee-800 sm:text-3xl">
                  100%
                </div>
                <div className="mt-1 text-sm text-coffee-500">Arábica</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-coffee-800 sm:text-3xl">
                  85+
                </div>
                <div className="mt-1 text-sm text-coffee-500">Pontos SCA</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-coffee-800 sm:text-3xl">
                  SCAA
                </div>
                <div className="mt-1 text-sm text-coffee-500">Certificado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
