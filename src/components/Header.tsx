"use client";

import { useState } from "react";
import Link from "next/link";
import { CartButton } from "./CartDrawer";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-950/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        {/* Logo - marca grande e destaque */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-2xl font-bold tracking-wide text-coffee-50 md:text-3xl">
            Zerbinatti
          </span>
          <span className="hidden text-[10px] tracking-[0.25em] text-gold-400 uppercase sm:block">
            Caffè
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="#cafes" className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400">
            Cafés
          </Link>
          <Link href="#assinatura" className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400">
            Assinatura
          </Link>
          <Link href="#origem" className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400">
            Nossa História
          </Link>
          <Link href="#quiz" className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400">
            Descubra Seu Café
          </Link>
          <Link href="#contato" className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400">
            B2B
          </Link>
        </div>

        {/* Cart */}
        <div className="hidden items-center lg:flex">
          <CartButton />
        </div>

        {/* Mobile: cart + menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <CartButton />
          <button
            className="text-coffee-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-coffee-800 bg-coffee-950 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#cafes" className="text-sm tracking-wide text-coffee-300 hover:text-gold-400" onClick={() => setMenuOpen(false)}>
              Cafés
            </Link>
            <Link href="#assinatura" className="text-sm tracking-wide text-coffee-300 hover:text-gold-400" onClick={() => setMenuOpen(false)}>
              Assinatura
            </Link>
            <Link href="#origem" className="text-sm tracking-wide text-coffee-300 hover:text-gold-400" onClick={() => setMenuOpen(false)}>
              Nossa História
            </Link>
            <Link href="#quiz" className="text-sm tracking-wide text-coffee-300 hover:text-gold-400" onClick={() => setMenuOpen(false)}>
              Descubra Seu Café
            </Link>
            <Link href="#contato" className="text-sm tracking-wide text-coffee-300 hover:text-gold-400" onClick={() => setMenuOpen(false)}>
              B2B
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
