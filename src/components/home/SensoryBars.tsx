'use client';

/**
 * Apresentacional: 4 linhas (Docura, Acidez, Corpo, Complex.) com barra
 * preenchida em percent (score / 5 * 100). Replica .feature-sensory + .sensory-row
 * + .bar (com --w CSS var) do public/novo-layout/index.html.
 *
 * Client component apenas para usar useT() — markup e puramente visual.
 */

import type { CSSProperties } from 'react';
import { useT } from '@/lib/i18n/useT';

export type SensoryDimensions = {
  sweetness: number;
  acidity: number;
  body: number;
  complexity: number;
};

type Row = {
  key: keyof SensoryDimensions;
  i18nKey: string;
};

const ROWS: Row[] = [
  { key: 'sweetness', i18nKey: 'sens.docura' },
  { key: 'acidity', i18nKey: 'sens.acidez' },
  { key: 'body', i18nKey: 'sens.corpo' },
  { key: 'complexity', i18nKey: 'sens.complex' },
];

function clampScore(score: number): number {
  if (Number.isNaN(score)) return 0;
  return Math.max(0, Math.min(5, score));
}

export function SensoryBars({ dimensions }: { dimensions: SensoryDimensions }) {
  const t = useT();
  return (
    <div className="feature-sensory">
      {ROWS.map((row) => {
        const score = clampScore(dimensions[row.key]);
        const pct = `${(score / 5) * 100}%`;
        const style = { '--w': pct } as CSSProperties;
        return (
          <div key={row.key} className="sensory-row">
            <span className="name">{t(row.i18nKey)}</span>
            <span className="bar" style={style} />
            <span className="num">{score}/5</span>
          </div>
        );
      })}
    </div>
  );
}
