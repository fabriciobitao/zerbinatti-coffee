// Barril publico do modulo i18n.
export { dictionary, DEFAULT_LOCALE, LOCALES } from './dictionary';
export type { Locale, DictionaryKey } from './dictionary';
export { LocaleProvider, LocaleContext, persistLocalePreference } from './LocaleProvider';
export { useT } from './useT';
export type { TFunction } from './useT';
export { T } from './T';
