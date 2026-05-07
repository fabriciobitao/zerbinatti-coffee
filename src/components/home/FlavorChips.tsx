'use client';

/**
 * Renderiza .feature-notes com chips (.chip) — um por chave i18n.
 * Markup espelha public/novo-layout/index.html.
 */

import { T } from '@/lib/i18n/T';

export function FlavorChips({ keys }: { keys: string[] }) {
  return (
    <div className="feature-notes">
      {keys.map((key) => (
        <T key={key} k={key} as="span" className="chip" />
      ))}
    </div>
  );
}
