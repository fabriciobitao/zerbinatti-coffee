"use client";

import Link from "next/link";
import { Monogram } from "@/components/ui/Ornament";
import { NewsletterForm } from "@/components/NewsletterForm";
import { clearConsent } from "@/lib/consent";

export default function Footer() {
  return (
    <footer className="bg-ink pt-32 pb-16">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-white.png"
              alt="Zerbinatti Coffee"
              className="h-10"
            />
            <div className="mt-5 flex items-center gap-3 text-olive">
              <Monogram size={36} className="shrink-0" />
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-bone-soft">
                Dal 1897
                <div className="font-display text-sm tracking-normal normal-case text-bone">
                  Famiglia Zerbinatti
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-bone-soft">
              Casa familiar de café, em ofício contínuo desde 1897. Treviso e
              Serra do Cabral em cada pacote.
            </p>
          </div>

          {/* Loja */}
          <div>
            <h3 className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-bone">
              Loja
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/#cafes"
                  className="text-sm text-bone-soft transition-colors hover:text-olive"
                >
                  Pacotes
                </Link>
              </li>
              <li>
                <Link
                  href="/#assinatura"
                  className="text-sm text-bone-soft transition-colors hover:text-olive"
                >
                  Assinatura
                </Link>
              </li>
              <li>
                <Link
                  href="/para-empresas"
                  className="text-sm text-bone-soft transition-colors hover:text-olive"
                >
                  Para empresas
                </Link>
              </li>
            </ul>
          </div>

          {/* Sobre */}
          <div>
            <h3 className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-bone">
              Sobre
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-bone-soft transition-colors hover:text-olive"
                >
                  Nossa história
                </Link>
              </li>
              <li>
                <Link
                  href="/fazenda"
                  className="text-sm text-bone-soft transition-colors hover:text-olive"
                >
                  A fazenda
                </Link>
              </li>
              <li>
                <Link
                  href="/processo"
                  className="text-sm text-bone-soft transition-colors hover:text-olive"
                >
                  Processo
                </Link>
              </li>
              <li>
                <Link
                  href="/revista"
                  className="text-sm text-bone-soft transition-colors hover:text-olive"
                >
                  Revista
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-bone">
              Newsletter
            </h3>
            <p className="mt-5 text-sm text-bone-soft">
              Notas da casa, novas safras, rituais. Uma vez por mês, sem ruído.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 border-t border-line-dark pt-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-bone-soft">
              &copy; 2026 Zerbinatti Coffee · Famiglia Zerbinatti, Brasil
            </p>
            <div className="flex flex-wrap gap-6 text-xs text-bone-soft">
              <Link href="/termos" className="hover:text-olive">
                Termos de uso
              </Link>
              <Link href="/privacidade" className="hover:text-olive">
                Privacidade
              </Link>
              <Link href="/entregas" className="hover:text-olive">
                Política de entregas
              </Link>
              <button
                type="button"
                onClick={() => clearConsent()}
                className="hover:text-olive"
                aria-label="Reabrir preferências de cookies"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
