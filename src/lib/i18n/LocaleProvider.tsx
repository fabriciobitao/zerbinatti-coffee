'use client';

// Provider de locale client-side. SSR sempre renderiza em pt; hidrata do localStorage no mount.
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
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

// Mapeia navigator.language (ex: "en-US", "es-MX", "pt-BR") pro locale suportado.
// Se browser nao bater com nenhum, retorna null (mantem DEFAULT_LOCALE).
function detectBrowserLocale(): Locale | null {
  if (typeof navigator === 'undefined') return null;
  const candidates = [
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    navigator.language,
  ].filter(Boolean);
  for (const tag of candidates) {
    const prefix = tag.toLowerCase().split('-')[0];
    if (prefix === 'en') return 'en';
    if (prefix === 'es') return 'es';
    if (prefix === 'pt') return 'pt';
  }
  return null;
}

type LocaleProviderProps = {
  children: React.ReactNode;
  // Quando definido, o provider trava o locale inicial nesse valor
  // (sem auto-detect, sem leitura de localStorage). Usado em rotas
  // dedicadas a um idioma (ex: /en) pra garantir que SSR e cliente
  // rendam em ingles independente da preferencia salva do visitante.
  initialLocale?: Locale;
  // Quando false, mudancas via setLocale NAO persistem em localStorage.
  // Default em rotas locale-fixed pra nao sobrescrever a preferencia
  // que o user escolheu na home canonica.
  persistent?: boolean;
};

export function LocaleProvider({
  children,
  initialLocale,
  persistent = true,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);
  const isLocaleFixed = initialLocale !== undefined;
  const pathname = usePathname() ?? '/';

  // Hidrata do localStorage apos mount (evita mismatch SSR/CSR).
  // Se nao houver preferencia salva, detecta via navigator.language
  // (visitante US -> en, MX/ES -> es, demais -> pt). User ainda pode trocar
  // manualmente via lang-switch — escolha persiste em localStorage.
  // Se initialLocale foi passado (rota /en por ex), pula tudo isso.
  useEffect(() => {
    if (isLocaleFixed) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) {
        if (stored !== locale) setLocaleState(stored);
        return;
      }
      const detected = detectBrowserLocale();
      if (detected && detected !== locale) {
        setLocaleState(detected);
      }
    } catch {
      // localStorage indisponivel (SSR, modo privado, etc) — mantem default.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincroniza <html lang> a cada troca.
  // Quando ha provider aninhado (/en route com initialLocale), o provider
  // externo do root layout nao deve atualizar o lang — senao a ordem de
  // useEffect (child-first) faz o externo sobrescrever o interno. Solucao:
  // o externo (sem initialLocale) skipa quando o pathname indica rota
  // locale-fixed conhecida (/en).
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!isLocaleFixed && pathname.startsWith('/en')) return;
    document.documentElement.lang = HTML_LANG_MAP[locale];
  }, [locale, pathname, isLocaleFixed]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      if (!persistent) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Falha silenciosa — UI ja atualizou em memoria.
      }
    },
    [persistent],
  );

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
