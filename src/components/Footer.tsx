import Link from "next/link";
import { Monogram } from "@/components/ui/Ornament";
import { FooterInstagramLink } from "@/components/InstagramButton";

export default function Footer() {
  return (
    <footer className="bg-coffee-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/images/logo-white.png"
              alt="Zerbinatti Coffee"
              className="h-10"
            />
            <div className="mt-5 flex items-center gap-3 text-gold-400">
              <Monogram size={36} className="shrink-0" />
              <div className="text-[10px] tracking-[0.3em] uppercase text-coffee-300">
                Desde 1897
                <div className="font-serif text-sm tracking-normal normal-case text-coffee-200">
                  Famiglia Zerbinatti
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-coffee-300">
              Café especial brasileiro com herança italiana. Três gerações
              de dedicação em cada xícara.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-coffee-200 uppercase">
              Loja
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#cafes" className="text-sm text-coffee-300 hover:text-gold-400">
                  Todos os Cafés
                </Link>
              </li>
              <li>
                <Link href="#assinatura" className="text-sm text-coffee-300 hover:text-gold-400">
                  Assinaturas
                </Link>
              </li>
              <li>
                <Link href="/#kits" className="text-sm text-coffee-300 hover:text-gold-400">
                  Kits e Presentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-coffee-200 uppercase">
              Sobre
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#origem" className="text-sm text-coffee-300 hover:text-gold-400">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/fazenda" className="text-sm text-coffee-300 hover:text-gold-400">
                  A Fazenda
                </Link>
              </li>
              <li>
                <Link href="/processo" className="text-sm text-coffee-300 hover:text-gold-400">
                  Processo
                </Link>
              </li>
              <li>
                <Link href="/para-empresas" className="text-sm text-coffee-300 hover:text-gold-400">
                  B2B / Parcerias
                </Link>
              </li>
              <li>
                <Link href="/revista" className="text-sm text-coffee-300 hover:text-gold-400">
                  Revista Zerbinatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-coffee-200 uppercase">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-coffee-300">
              Receba novidades sobre safras e lançamentos exclusivos.
            </p>
            <label htmlFor="newsletter-email" className="sr-only">
              E-mail para newsletter
            </label>
            <div className="mt-4 flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                placeholder="seu@email.com"
                className="flex-1 rounded-lg border border-coffee-800 bg-coffee-900 px-4 py-2.5 text-sm text-coffee-100 outline-none placeholder:text-coffee-400 focus:border-gold-500"
              />
              <button className="rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-coffee-950 transition-colors hover:bg-gold-400">
                Assinar
              </button>
            </div>

            {/* Social — YouTube/TikTok voltam quando contas existirem (PROGRESS.md). */}
            <div className="mt-6 flex gap-4">
              <FooterInstagramLink />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-coffee-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-coffee-400">
              &copy; 2026 Zerbinatti Coffee. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 items-center text-xs text-coffee-400">
              <Link href="/termos" className="hover:text-gold-400">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="hover:text-gold-400">
                Privacidade
              </Link>
              <Link href="/entregas" className="hover:text-gold-400">
                Política de Entregas
              </Link>
              <span
                className="gruta-badge"
                data-theme="dark"
                aria-label="Made by Gruta — clica pra contato"
                role="button"
                tabIndex={0}
                suppressHydrationWarning
              >
                <canvas className="gruta-mark" width={16} height={16} />
                <span className="gruta-text" suppressHydrationWarning />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
