'use client';

/**
 * HomeHeader — header fixo da home (route group `(home)`).
 *
 * Estrutura copiada verbatim de public/novo-layout/index.html (`<header class="header">`):
 * - Logo: `.header-logo` com `.monogram` (Z) + `.stack` (.word + .sub)
 * - Nav desktop: `.header-nav` com 5 links (Cafes, Processo, Assinatura, Empresas, Historia)
 * - Acoes: `.header-actions` -> `.lang-switch` + `.icon-btn`s (search, cart, menu)
 *
 * Diferencas controladas vs static:
 * - Links ancora para secoes da home (#cafes, #processo, #assinatura, #historia)
 *   exceto "Para Empresas" que aponta pra rota real /para-empresas.
 * - Lang buttons trocam locale via LocaleProvider (useContext).
 * - Cart button le `totalQuantity` do Zustand store e abre o drawer.
 * - Menu hamburguer abre MobileDrawer (estado local).
 * - Wordmark dourado adicional no logo (mantem monograma + stack original).
 *
 * Scroll shadow: aplica `.scrolled` no `<header>` quando window.scrollY > 8.
 */

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LocaleContext } from '@/lib/i18n/LocaleProvider';
import { LOCALES, type Locale } from '@/lib/i18n/dictionary';
import { useT } from '@/lib/i18n/useT';
import { MobileDrawer } from './MobileDrawer';
import { CartButton } from './CartButton';

const LANG_LABELS: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

function FlagPT() {
  return (
    <svg width={22} height={16} viewBox="0 0 22 16" aria-hidden="true">
      <rect width={22} height={16} fill="#009739" />
      <polygon points="11,2 20,8 11,14 2,8" fill="#FEDD00" />
      <circle cx={11} cy={8} r={3.4} fill="#012169" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg width={22} height={16} viewBox="0 0 22 16" aria-hidden="true">
      <rect width={22} height={16} fill="#B22234" />
      <path
        d="M0 2h22M0 4.5h22M0 7h22M0 9.5h22M0 12h22M0 14.5h22"
        stroke="#fff"
        strokeWidth={1.2}
      />
      <rect width={9} height={7} fill="#3C3B6E" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg width={22} height={16} viewBox="0 0 22 16" aria-hidden="true">
      <rect width={22} height={16} fill="#AA151B" />
      <rect y={4} width={22} height={8} fill="#F1BF00" />
    </svg>
  );
}

const FLAGS: Record<Locale, () => React.JSX.Element> = {
  pt: FlagPT,
  en: FlagEN,
  es: FlagES,
};

export default function HomeHeader() {
  const { locale, setLocale } = useContext(LocaleContext);
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll shadow: classe .scrolled quando scrollY > 8
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <Link href="/" className="header-logo" aria-label="Zerbinatti — início">
          <span className="monogram" aria-hidden="true">
            Z
          </span>
          <span className="stack">
            {/* Wordmark dourado como imagem (over a `.word` textual). Mantemos
                o `.sub` para preservar a hierarquia visual da static. */}
            <Image
              src="/assets/zerbinatti-wordmark-gold.png"
              alt="Zerbinatti"
              width={196}
              height={28}
              priority
              className="word"
              style={{ height: 'auto', width: 'auto', maxHeight: 28 }}
            />
            <span className="sub">Caffè · Desde 1897</span>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Navegação principal">
          <a href="#cafes">{t('nav.cafes')}</a>
          <a href="#processo">{t('nav.processo')}</a>
          <a href="#assinatura">{t('nav.assinatura')}</a>
          <Link href="/para-empresas">{t('nav.empresas')}</Link>
          <a href="#historia">{t('nav.historia')}</a>
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label="Idioma">
            {LOCALES.map((code) => {
              const Flag = FLAGS[code];
              return (
                <button
                  key={code}
                  type="button"
                  className={`lang-btn${locale === code ? ' active' : ''}`}
                  data-lang={code}
                  aria-label={LANG_LABELS[code]}
                  aria-pressed={locale === code}
                  title={LANG_LABELS[code]}
                  onClick={() => setLocale(code)}
                >
                  <Flag />
                </button>
              );
            })}
          </div>

          <CartButton />

          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="menuDrawer"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
