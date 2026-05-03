"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartButton } from "./CartDrawer";

const NAV_LINKS: [string, string][] = [
  ["/#cafes", "Pacotes"],
  ["/#assinatura", "Assinatura"],
  ["/sobre", "História"],
  ["/para-empresas", "Empresas"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            className={menuBtnColor}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
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
        role="navigation"
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
