export default function Quiz() {
  return (
    <section id="quiz" className="relative overflow-hidden bg-coffee-50 py-24 lg:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=30')",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
          Experiência Personalizada
        </span>
        <h2 className="mt-4 font-serif text-4xl font-bold text-coffee-900 md:text-5xl">
          Descubra Seu Café Ideal
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-coffee-600">
          Responda 5 perguntas rápidas e nosso algoritmo encontra o café
          perfeito para o seu paladar. Resultado compartilhável no Instagram.
        </p>

        {/* Preview of quiz steps */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {["Preparo", "Sabor", "Intensidade", "Momento", "Resultado"].map(
            (step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                      i === 4
                        ? "bg-gold-500 text-coffee-950"
                        : "bg-coffee-200 text-coffee-700"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="mt-2 text-xs text-coffee-500">{step}</span>
                </div>
                {i < 4 && (
                  <div className="mb-5 h-px w-8 bg-coffee-300 sm:w-12" />
                )}
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <button className="mt-12 rounded-full bg-coffee-900 px-10 py-4 text-sm font-semibold tracking-wide text-coffee-50 uppercase transition-all hover:bg-coffee-800 hover:shadow-xl">
          Começar o Quiz — 2 minutos
        </button>

        <p className="mt-4 text-sm text-coffee-400">
          Mais de 2.000 pessoas já descobriram seu café ideal
        </p>
      </div>
    </section>
  );
}
