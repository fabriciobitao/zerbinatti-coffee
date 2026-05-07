'use client';

// Provider de locale client-side. SSR sempre renderiza em pt; hidrata do localStorage no mount.
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './dictionary';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

const STORAGE_KEY = 'zerbinatti.locale';
const HTML_LANG_MAP: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as string[]).includes(value);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hidrata do localStorage apos mount (evita mismatch SSR/CSR).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored) && stored !== locale) {
        setLocaleState(stored);
      }
    } catch {
      // localStorage indisponivel (SSR, modo privado, etc) — mantem default.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincroniza <html lang> a cada troca.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = HTML_LANG_MAP[locale];
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Falha silenciosa — UI ja atualizou em memoria.
    }
  }, []);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
