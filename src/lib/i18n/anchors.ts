/**
 * IDs de ancora das secoes da home, mapeados por locale.
 *
 * PT (canonico): /#cafes /#processo /#assinatura /#historia
 * EN (canonico): /en#coffees /en#process /en#subscription /en#story
 *
 * Os IDs em ingles ficam coerentes com a URL canonica EN — quando alguem
 * compartilha "https://zerbinatti.coffee/en#subscription" o link tem
 * sentido pra um leitor que nao fala portugues. Preserva tambem os IDs
 * PT pra nao quebrar bookmarks/inbound links antigos.
 */

import type { Locale } from './dictionary';

export type AnchorKey = 'cafes' | 'processo' | 'assinatura' | 'historia';

export const ANCHORS: Record<Locale, Record<AnchorKey, string>> = {
  pt: {
    cafes: 'cafes',
    processo: 'processo',
    assinatura: 'assinatura',
    historia: 'historia',
  },
  en: {
    cafes: 'coffees',
    processo: 'process',
    assinatura: 'subscription',
    historia: 'story',
  },
  // ES nao tem rota dedicada — reusa anchors PT (in-page switch via dictionary).
  es: {
    cafes: 'cafes',
    processo: 'processo',
    assinatura: 'assinatura',
    historia: 'historia',
  },
};

// Helper: dado um pathname, retorna o conjunto de anchors apropriado.
// /en e /export (EN canonico) -> EN. Demais -> PT (DEFAULT_LOCALE).
export function anchorsForPath(pathname: string): Record<AnchorKey, string> {
  if (pathname.startsWith('/en') || pathname === '/export') return ANCHORS.en;
  return ANCHORS.pt;
}
