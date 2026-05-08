'use client';

/**
 * MobileDrawer — menu off-canvas (lado esquerdo) para mobile.
 *
 * Estrutura copiada verbatim de public/novo-layout/index.html:
 *   <div class="menu-overlay" id="menuOverlay"></div>
 *   <aside class="menu-drawer" id="menuDrawer" aria-hidden="true">
 *     <button class="close" id="menuClose">...</button>
 *     <nav>...</nav>
 *     <div class="menu-lang">...</div>
 *   </aside>
 *
 * Comportamento:
 * - Fecha em: clique no overlay, ESC, clique em link, botao de fechar.
 * - Focus trap: foco inicial no botao de fechar; tab cicla entre os elementos
 *   focaveis dentro do drawer.
 * - Scroll lock: `body { overflow: hidden }` enquanto aberto.
 * - Tap targets >=44x44 (CSS de novo-layout.css ja garante: .close 44x44, .menu-lang button 44x32).
 */

import { useCallback, useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LocaleContext } from '@/lib/i18n/LocaleProvider';
import { LOCALES, type Locale } from '@/lib/i18n/dictionary';
import { useT } from '@/lib/i18n/useT';

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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: Props) {
  const { locale, setLocale } = useContext(LocaleContext);
  const t = useT();
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Scroll lock + ESC + focus trap
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Foco inicial no botao de fechar
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = drawerRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute('disabled'));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <div
        className={`menu-overlay${open ? ' open' : ''}`}
        id="menuOverlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`menu-drawer${open ? ' open' : ''}`}
        id="menuDrawer"
        aria-hidden={!open}
        aria-label="Menu"
        role="dialog"
        aria-modal={open}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="close"
          aria-label="Fechar menu"
          onClick={onClose}
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
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
        <nav aria-label="Navegação móvel">
          <a href="/#cafes" onClick={handleLinkClick}>
            {t('nav.cafes')}
          </a>
          <a href="/#processo" onClick={handleLinkClick}>
            {t('nav.processo')}
          </a>
          <a href="/#assinatura" onClick={handleLinkClick}>
            {t('nav.assinatura')}
          </a>
          <Link href="/para-empresas" onClick={handleLinkClick}>
            {t('nav.empresas')}
          </Link>
          <a href="/#historia" onClick={handleLinkClick}>
            {t('nav.historia')}
          </a>
        </nav>
        <div className="menu-lang" role="group" aria-label="Idioma">
          {LOCALES.map((code) => {
            const Flag = FLAGS[code];
            return (
              <button
                key={code}
                type="button"
                className={locale === code ? 'active' : ''}
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
      </aside>
    </>
  );
}

export default MobileDrawer;
