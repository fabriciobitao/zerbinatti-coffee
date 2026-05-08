'use client';

// Galeria — Client Component (gerencia state do lightbox).
//
// Reproduz verbatim a <section class="galeria" id="galeria"> de
// public/novo-layout/index.html: header em duas colunas (eyebrow+titulo a
// esquerda, descricao+meta da safra a direita), grid masonry de 7 frames
// com classes .g-item / .g-tall / .g-wide e inline-styles para grid-column
// e grid-row, e foot com linha+contagem de frames+linha. Caption: numero
// dourado em italico + chave gal.cap.N (1..7). Click no figure abre
// <Lightbox /> com prev/next/Esc; o lightbox renderiza em portal logico
// via overflow do body (z-index 9999 no CSS). Nao traduzimos os alts das
// imagens — sao descritivos puros e nao estao no dicionario.

import { useCallback, useState } from 'react';
import { useT } from '@/lib/i18n';
import { Lightbox, type LightboxItem } from './Lightbox';

type Item = {
  n: number;
  src: string;
  alt: string;
  capKey: string;
  // classes/styles extras para casar com o grid masonry do CSS
  extraClass?: string;
  style?: React.CSSProperties;
};

const ITEMS: Item[] = [
  {
    n: 1,
    src: '/assets/galeria/1.webp',
    alt: 'Composição da marca Zerbinatti com selos de qualidade',
    capKey: 'gal.cap.1',
    extraClass: 'g-tall',
  },
  {
    n: 2,
    src: '/assets/galeria/2.webp',
    alt: 'Cerejas amarelas maduras no pé de café',
    capKey: 'gal.cap.2',
    extraClass: 'g-wide',
  },
  {
    n: 3,
    src: '/assets/galeria/3.webp',
    alt: 'Cafezal florido ao pôr-do-sol na Valim Farms',
    capKey: 'gal.cap.3',
    style: { gridColumn: 'span 4', gridRow: 'span 2' },
  },
  {
    n: 4,
    src: '/assets/galeria/4.webp',
    alt: 'Pacotes Zerbinatti 250g enfileirados',
    capKey: 'gal.cap.4',
    style: { gridColumn: 'span 4', gridRow: 'span 2' },
  },
  {
    n: 5,
    src: '/assets/galeria/5.webp',
    alt: 'Mudas de café em viveiro com sombreamento',
    capKey: 'gal.cap.5',
    style: { gridColumn: 'span 4', gridRow: 'span 2' },
  },
  {
    n: 6,
    src: '/assets/galeria/6.webp',
    alt: 'Terreiro de secagem natural com árvore icônica',
    capKey: 'gal.cap.6',
    extraClass: 'g-wide',
  },
  {
    n: 7,
    src: '/assets/galeria/7.webp',
    alt: 'Plantio jovem de café em terra vermelha',
    capKey: 'gal.cap.7',
    style: { gridColumn: 'span 4', gridRow: 'span 3' },
  },
];

export default function Galeria() {
  const t = useT();
  const [index, setIndex] = useState<number>(-1);

  const lightboxItems: LightboxItem[] = ITEMS.map((it) => ({
    src: it.src,
    alt: it.alt,
    caption: t(it.capKey),
  }));

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(-1), []);
  const prev = useCallback(
    () => setIndex((i) => (i <= 0 ? ITEMS.length - 1 : i - 1)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i < 0 ? 0 : (i + 1) % ITEMS.length)),
    [],
  );

  const formatNum = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <section className="galeria" id="galeria">
        <div className="galeria-inner">
          <div className="galeria-head reveal">
            <div className="galeria-head-left">
              <span className="eyebrow" dangerouslySetInnerHTML={t.html('gal.eyebrow')} />
              <h2 className="display" dangerouslySetInnerHTML={t.html('gal.title')} />
            </div>
            <div className="galeria-head-right">
              <p>{t('gal.desc')}</p>
              <div className="galeria-meta">
                <div>
                  <span className="k">{t('gal.safra')}</span>
                  <span className="v">2025 / 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="galeria-grid">
            {ITEMS.map((it, i) => {
              const cls = ['g-item', 'reveal', it.extraClass].filter(Boolean).join(' ');
              return (
                <figure
                  key={it.n}
                  className={cls}
                  data-src={it.src}
                  style={it.style}
                  onClick={() => open(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      open(i);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={t(it.capKey)}
                >
                  <img src={it.src} alt={it.alt} loading="lazy" />
                  <figcaption>
                    <span className="num">{formatNum(it.n)}</span>{' '}
                    <span>{t(it.capKey)}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="galeria-foot reveal">
            <span className="line" />
            <span className="t">{t('gal.foot')}</span>
            <span className="line" />
          </div>
        </div>
      </section>

      <Lightbox
        items={lightboxItems}
        index={index}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}
