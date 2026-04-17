import Link from "next/link";
import { buildWhatsAppUrl, CONTACT_EMAIL } from "@/lib/config";
import { Ornament } from "@/components/ui/Ornament";

export default function B2B() {
  const whatsAppUrl = buildWhatsAppUrl(
    "Olá! Tenho interesse em parceria B2B com a Zerbinatti Coffee."
  );
  return (
    <section id="contato" className="bg-coffee-100/50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
              Para Empresas
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
              Parceria B2B
            </h2>
            <Ornament className="mt-4" />

            <p className="mt-6 text-base leading-relaxed text-coffee-700 sm:mt-8 sm:text-lg">
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
                  className="flex gap-3 rounded-xl border border-coffee-200 bg-white p-4 sm:gap-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10">
                    <span className="text-lg text-gold-600">✦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-coffee-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/para-empresas"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coffee-900 px-8 py-4 text-sm font-semibold text-coffee-50 transition-all duration-200 hover:bg-coffee-700 hover:shadow-lg active:scale-[0.97]"
              >
                Ver programa completo
              </Link>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-coffee-300 px-8 py-4 text-sm font-medium text-coffee-800 transition-all duration-200 hover:border-coffee-500 hover:bg-white active:scale-[0.97]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WhatsApp direto
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center rounded-full px-3 py-4 text-sm font-medium text-coffee-700 underline underline-offset-4 hover:text-coffee-900"
              >
                E-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
