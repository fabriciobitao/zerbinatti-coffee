"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CartButton } from "./CartDrawer";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-coffee-950/95 backdrop-blur-md shadow-lg shadow-black/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/">
          <img
            src="/images/logo-white.png"
            alt="Zerbinatti Coffee"
            className="h-8 md:h-10"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {[
            ["#cafes", "Cafés"],
            ["#assinatura", "Assinatura"],
            ["#origem", "Nossa História"],
            ["#quiz", "Descubra Seu Café"],
            ["#contato", "B2B"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center lg:flex">
          <CartButton />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <CartButton />
          <button className="text-coffee-50" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-coffee-800 bg-coffee-950/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-80 px-6 py-6" : "max-h-0 px-6 py-0 border-t-transparent"
        }`}
      >
        <div className="flex flex-col gap-4">
          {[
            ["#cafes", "Cafés"],
            ["#assinatura", "Assinatura"],
            ["#origem", "Nossa História"],
            ["#quiz", "Descubra Seu Café"],
            ["#contato", "B2B"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm tracking-wide text-coffee-300 hover:text-gold-400" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
