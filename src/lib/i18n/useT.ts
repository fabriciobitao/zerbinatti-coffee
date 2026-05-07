'use client';

// Hook de traducao. t(key, fallback?) -> string. t.html(key) -> { __html } para dangerouslySetInnerHTML.
import { useContext, useMemo } from 'react';
import { dictionary, DEFAULT_LOCALE } from './dictionary';
import { LocaleContext } from './LocaleProvider';

export type TFunction = ((key: string, fallback?: string) => string) & {
  html: (key: string, fallback?: string) => { __html: string };
};

export function useT(): TFunction {
  const { locale } = useContext(LocaleContext);

  return useMemo<TFunction>(() => {
    const t = (key: string, fallback?: string): string => {
      const localeMap = dictionary[locale] as Record<string, string>;
      const defaultMap = dictionary[DEFAULT_LOCALE] as Record<string, string>;
      return localeMap[key] ?? defaultMap[key] ?? fallback ?? key;
    };
    const html = (key: string, fallback?: string) => ({ __html: t(key, fallback) });
    return Object.assign(t, { html });
  }, [locale]);
}
