'use client';

/**
 * ExportHeader — header dedicado da LP de exportacao (v3 design Cloud Design).
 * Substitui o HomeHeader. Slim, sticky com blur, com lang-switch EN/ES/PT que
 * navega entre as 3 rotas canonicas.
 *
 * Logo: usa o wordmark dourado real do Zerbinatti (substitui o monogram + text
 * do mock do design).
 */

import { useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LocaleContext, persistLocalePreference } from '@/lib/i18n/LocaleProvider';
import type { Locale } from '@/lib/i18n/dictionary';

const EXPORT_ROUTES: Record<Locale, string> = {
  pt: '/exportacao',
  en: '/export',
  es: '/es/exportacion',
};

const LANG_LABELS: Record<Locale, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
};

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: 'Origin', href: '#origin' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Portfolio', href: '#coffees' },
  { label: 'Process', href: '#process' },
  { label: 'Terms', href: '#logistics' },
];

export default function ExportHeader() {
  const { locale } = useContext(LocaleContext);
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLangClick = useCallback(
    (code: Locale) => {
      if (locale === code) return;
      persistLocalePreference(code);
      router.push(EXPORT_ROUTES[code]);
    },
    [locale, router],
  );

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="site-header-inner">
        <Link href={EXPORT_ROUTES[locale] || '/export'} className="brand-mark" aria-label="Zerbinatti home">
          <Image
            src="/assets/zerbinatti-wordmark-gold.png"
            alt="Zerbinatti"
            className="wordmark-img"
            width={1205}
            height={295}
            priority
            style={{ height: 30, width: 'auto' }}
          />
          <span className="division">Export Division</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((it) => (
            <a key={it.href} href={it.href}>
              {it.label}
            </a>
          ))}
        </nav>

        <div className="header-right">
          <div className="lang-switch" role="tablist" aria-label="Language">
            {(['en', 'es', 'pt'] as Locale[]).map((code) => (
              <button
                key={code}
                type="button"
                className={locale === code ? 'active' : ''}
                onClick={() => handleLangClick(code)}
                aria-pressed={locale === code}
              >
                {LANG_LABELS[code]}
              </button>
            ))}
          </div>
          <a href="#inquiry" className="x-btn x-btn-gold x-btn-sm">
            Request quote <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
