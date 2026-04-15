"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-950/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wider text-coffee-50 uppercase">
              Zerbinatti
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold-400 uppercase">
              Coffee · Since 1897
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="#origem"
            className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400"
          >
            Nossa História
          </Link>
          <Link
            href="#cafes"
            className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400"
          >
            Cafés
          </Link>
          <Link
            href="#assinatura"
            className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400"
          >
            Assinatura
          </Link>
          <Link
            href="#quiz"
            className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400"
          >
            Descubra Seu Café
          </Link>
          <Link
            href="#contato"
            className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400"
          >
            B2B
          </Link>
        </div>

        {/* CTA + Cart */}
        <div className="hidden items-center gap-4 lg:flex">
          <button className="rounded-full border border-gold-500 px-5 py-2 text-sm font-medium text-gold-400 transition-all hover:bg-gold-500 hover:text-coffee-950">
            Comprar
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-coffee-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
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
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-coffee-800 bg-coffee-950 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#origem"
              className="text-sm tracking-wide text-coffee-300 hover:text-gold-400"
              onClick={() => setMenuOpen(false)}
            >
              Nossa História
            </Link>
            <Link
              href="#cafes"
              className="text-sm tracking-wide text-coffee-300 hover:text-gold-400"
              onClick={() => setMenuOpen(false)}
            >
              Cafés
            </Link>
            <Link
              href="#assinatura"
              className="text-sm tracking-wide text-coffee-300 hover:text-gold-400"
              onClick={() => setMenuOpen(false)}
            >
              Assinatura
            </Link>
            <Link
              href="#quiz"
              className="text-sm tracking-wide text-coffee-300 hover:text-gold-400"
              onClick={() => setMenuOpen(false)}
            >
              Descubra Seu Café
            </Link>
            <Link
              href="#contato"
              className="text-sm tracking-wide text-coffee-300 hover:text-gold-400"
              onClick={() => setMenuOpen(false)}
            >
              B2B
            </Link>
            <button className="mt-2 rounded-full border border-gold-500 px-5 py-2 text-sm font-medium text-gold-400 transition-all hover:bg-gold-500 hover:text-coffee-950">
              Comprar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
