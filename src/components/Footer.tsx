import Link from "next/link";
import { Monogram } from "@/components/ui/Ornament";
import { NewsletterForm } from "@/components/NewsletterForm";

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
                Dal 1897
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
                <Link href="#quiz" className="text-sm text-coffee-300 hover:text-gold-400">
                  Quiz do Café
                </Link>
              </li>
              <li>
                <Link href="/comparar" className="text-sm text-coffee-300 hover:text-gold-400">
                  Comparar os 3 cafés
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
                <Link href="/safra/2026" className="text-sm text-coffee-300 hover:text-gold-400">
                  Diário da Safra 2026
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
            <NewsletterForm />

            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-coffee-500 transition-colors hover:text-gold-400"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-coffee-500 transition-colors hover:text-gold-400"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-coffee-500 transition-colors hover:text-gold-400"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-coffee-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-coffee-400">
              &copy; 2026 Zerbinatti Coffee. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-xs text-coffee-400">
              <Link href="/termos" className="hover:text-gold-400">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="hover:text-gold-400">
                Privacidade
              </Link>
              <Link href="/entregas" className="hover:text-gold-400">
                Política de Entregas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
