"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartButton } from "./CartDrawer";

const NAV_LINKS: [string, string][] = [
  ["/cafes", "Pacotes"],
  ["/#assinatura", "Assinatura"],
  ["/revista", "Revista"],
  ["/sobre", "História"],
  ["/para-empresas", "Empresas"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu — Esc fecha, foco no primeiro link ao abrir,
  // retorna foco ao botão hamburguer ao fechar, e trap de Tab dentro do menu.
  useEffect(() => {
    if (!menuOpen) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const container = mobileNavRef.current;
    const focusables = container
      ? Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
      : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // Foco no primeiro link
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !container?.contains(active)) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Quando fechar, retorna foco ao botão hamburguer
  const prevMenuOpen = useRef(menuOpen);
  useEffect(() => {
    if (prevMenuOpen.current && !menuOpen) {
      menuButtonRef.current?.focus();
    }
    prevMenuOpen.current = menuOpen;
  }, [menuOpen]);

  // No Hero (bone) com header transparente, queremos texto escuro.
  // Em outras páginas (que tipicamente já têm fundo escuro) ou após scroll,
  // o header fica ink e texto claro.
  const headerOnLight = isHome && !scrolled;

  const headerBg = scrolled
    ? "bg-ink/95 backdrop-blur-md py-2"
    : isHome
      ? "bg-transparent py-4"
      : "bg-ink/95 backdrop-blur-md py-2";

  const navTextColor = headerOnLight
    ? "text-ink-soft hover:text-olive"
    : "text-bone-soft hover:text-olive";

  const menuBtnColor = headerOnLight ? "text-ink" : "text-bone";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-5 lg:px-16">
        <Link href="/" aria-label="Zerbinatti Coffee, ir para a home">
          {headerOnLight ? (
            // Wordmark inline em ink — usado apenas no Hero antes do scroll
            <span
              className="font-display text-[22px] tracking-[-0.01em] text-ink md:text-[26px]"
              style={{ fontWeight: 500 }}
            >
              Zerbinatti
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/logo-white.png"
              alt="Zerbinatti Coffee"
              className="h-8 md:h-9"
            />
          )}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-[0.04em] transition-colors ${navTextColor}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center lg:flex">
          <CartButton />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <CartButton />
          <button
            ref={menuButtonRef}
            className={menuBtnColor}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        ref={mobileNavRef}
        role="navigation"
        aria-label="Menu mobile"
        aria-hidden={!menuOpen}
        className={`overflow-hidden border-t border-line-dark bg-ink/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-96 px-5 py-6"
            : "max-h-0 px-5 py-0 border-t-transparent"
        }`}
      >
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium tracking-[0.04em] text-bone-soft hover:text-olive"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
