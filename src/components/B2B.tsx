export default function B2B() {
  return (
    <section id="contato" className="bg-coffee-100/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: Content */}
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

          {/* Right: Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-10">
            <h3 className="font-serif text-2xl font-bold text-coffee-900">
              Solicitar Amostras
            </h3>
            <p className="mt-2 text-sm text-coffee-500">
              Preencha o formulário e entraremos em contato em até 24h.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-coffee-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-4 py-3 text-sm text-coffee-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-coffee-700">
                  E-mail corporativo
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-4 py-3 text-sm text-coffee-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-coffee-700">
                  Empresa
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-4 py-3 text-sm text-coffee-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-coffee-700">
                  Tipo de negócio
                </label>
                <select className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-4 py-3 text-sm text-coffee-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500">
                  <option value="">Selecione...</option>
                  <option value="torrefacao">Torrefação</option>
                  <option value="cafeteria">Cafeteria</option>
                  <option value="restaurante">Restaurante / Hotel</option>
                  <option value="escritorio">Escritório</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-coffee-700">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-4 py-3 text-sm text-coffee-900 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  placeholder="Conte-nos sobre seu negócio e volume estimado..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-coffee-900 py-3.5 text-sm font-semibold tracking-wide text-coffee-50 transition-all hover:bg-coffee-800 hover:shadow-lg"
              >
                Enviar Solicitação
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
