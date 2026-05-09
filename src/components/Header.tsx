"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CartButton } from "./CartDrawer";
import { HeaderInstagramButton } from "./InstagramButton";

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
        <Link
          href="/"
          aria-label="Zerbinatti — início"
          className="inline-flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="grid place-items-center font-serif italic font-semibold shrink-0"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "2px solid #F5DC8C",
              color: "#FCE9A8",
              fontSize: 18,
              background:
                "radial-gradient(circle at 50% 45%, rgba(252,233,168,.22), rgba(240,215,123,.06) 65%, transparent 80%)",
              boxShadow:
                "0 0 0 1px rgba(252,233,168,.45) inset, 0 0 18px rgba(240,215,123,.55), 0 0 36px rgba(240,215,123,.25)",
              textShadow: "0 0 10px rgba(252,233,168,.7)",
            }}
          >
            Z
          </span>
          <span className="inline-flex flex-col leading-none min-w-0">
            <img
              src="/assets/zerbinatti-wordmark-gold.png"
              alt="Zerbinatti"
              style={{
                height: "auto",
                width: "auto",
                maxHeight: 28,
                filter:
                  "brightness(1.25) saturate(1.3) drop-shadow(0 0 10px rgba(240,215,123,.45)) drop-shadow(0 1px 3px rgba(0,0,0,.55))",
              }}
            />
            <span
              className="font-mono uppercase whitespace-nowrap"
              style={{
                fontSize: 9,
                letterSpacing: "0.32em",
                color: "#FCE9A8",
                fontWeight: 600,
                marginTop: 5,
                textShadow:
                  "0 1px 2px rgba(0,0,0,.65), 0 0 10px rgba(240,215,123,.4)",
              }}
            >
              Caffè · Desde 1897
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {[
            ["/#cafes", "Cafés"],
            ["/#assinatura", "Assinatura"],
            ["/revista", "Revista"],
            ["/para-empresas", "B2B"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm tracking-wide text-coffee-300 transition-colors hover:text-gold-400">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <HeaderInstagramButton />
          <CartButton />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <HeaderInstagramButton />
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
            ["/#cafes", "Cafés"],
            ["/#assinatura", "Assinatura"],
            ["/revista", "Revista"],
            ["/para-empresas", "B2B"],
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
