'use client';

/**
 * ExportGalleryLab — compactacao da Galeria + CuppingReport da home
 * em uma unica section para a LP de exportacao.
 *
 * Vibe: editorial — galeria de 4 fotos da Valim Farms (subset das 7 da home)
 * colada lado a lado com card compacto de cupping (badge + mini radar +
 * 3 descritores chip). Header unico "the land, the hands · every lot, a score."
 * unifica os dois conteudos como se fossem um so.
 *
 * Reusa /assets/galeria/*.webp existentes (sem rebuild de assets).
 * Lightbox da home reaproveitado para fullscreen das fotos.
 */

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useT } from '@/lib/i18n';
import { Lightbox, type LightboxItem } from '../home/Lightbox';

const GALLERY_IMGS = [
  { src: '/assets/galeria/2.webp', capKey: 'gal.cap.2', alt: 'Cerejas amarelas maduras no pé', w: 1396, h: 1866 },
  { src: '/assets/galeria/3.webp', capKey: 'gal.cap.3', alt: 'Cafezal florido ao pôr-do-sol', w: 1042, h: 1804 },
  { src: '/assets/galeria/6.webp', capKey: 'gal.cap.6', alt: 'Terreiro de secagem natural', w: 1042, h: 1680 },
  { src: '/assets/galeria/5.webp', capKey: 'gal.cap.5', alt: 'Mudas em viveiro', w: 1042, h: 1761 },
];

// Mesmos dados do CuppingReport mas pre-computados — total 84.75
const RADAR_DATA = [
  { label: 'Fragrância', value: 8.25 },
  { label: 'Sabor', value: 8.0 },
  { label: 'Retrogosto', value: 8.75 },
  { label: 'Acidez', value: 8.0 },
  { label: 'Corpo', value: 8.75 },
  { label: 'Equilíbrio', value: 8.25 },
  { label: 'Geral', value: 8.5 },
  { label: 'Uniformid.', value: 8.0 },
  { label: 'Limpidez', value: 8.0 },
  { label: 'Doçura', value: 10.0 },
];

const CX = 180;
const CY = 180;
const R = 130;
const MAX = 10;
const angleAt = (i: number, n: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
const fmt = (n: number) => Number(n.toFixed(3));

export default function ExportGalleryLab() {
  const t = useT();
  const [index, setIndex] = useState<number>(-1);

  const lightboxItems: LightboxItem[] = GALLERY_IMGS.map((it) => ({
    src: it.src,
    alt: it.alt,
    caption: t(it.capKey),
  }));

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(-1), []);
  const prev = useCallback(
    () => setIndex((i) => (i <= 0 ? GALLERY_IMGS.length - 1 : i - 1)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i < 0 ? 0 : (i + 1) % GALLERY_IMGS.length)),
    [],
  );

  const N = RADAR_DATA.length;
  const points = RADAR_DATA.map((d, i) => {
    const a = angleAt(i, N);
    const r = R * (d.value / MAX);
    return { x: fmt(CX + r * Math.cos(a)), y: fmt(CY + r * Math.sin(a)) };
  });
  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const axes = RADAR_DATA.map((_, i) => {
    const a = angleAt(i, N);
    return { x: fmt(CX + R * Math.cos(a)), y: fmt(CY + R * Math.sin(a)) };
  });

  return (
    <>
      <div className="export-gallerylab">
        <div className="export-gallerylab-grid">
          {/* Esquerda: 2x2 mini-galeria */}
          <div className="export-gl-photos">
            {GALLERY_IMGS.map((it, i) => (
              <figure
                key={it.src}
                className="export-gl-figure"
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
                <Image
                  src={it.src}
                  alt={it.alt}
                  width={it.w}
                  height={it.h}
                  sizes="(max-width: 1024px) 50vw, 24vw"
                />
                <figcaption>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{t(it.capKey)}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Direita: cupping card compacto */}
          <aside className="export-gl-cupping">
            <div className="export-gl-cup-header">
              <span className="eyebrow">{t('cup.eyebrow')}</span>
              <div className="export-gl-cup-id">
                <div className="sku">TS-00986028</div>
                <div className="name">Zerbinatti · Arara Natural</div>
              </div>
            </div>

            <div className="export-gl-radar-wrap">
              <div className="export-gl-score">
                <div className="num">84.75</div>
                <div className="lbl">{t('cup.total')}</div>
              </div>
              <svg viewBox="0 0 360 360" aria-label="Radar sensorial">
                <defs>
                  <radialGradient id="exportRadarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="exportRadarFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--gold-soft)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.30" />
                  </linearGradient>
                </defs>
                <circle cx={CX} cy={CY} r={R} fill="url(#exportRadarGlow)" />
                {[0.4, 0.6, 0.8, 1].map((p) => (
                  <circle key={p} cx={CX} cy={CY} r={R * p} className={`radar-ring${p === 1 ? ' outer' : ''}`} />
                ))}
                {axes.map((a, i) => (
                  <line key={i} x1={CX} y1={CY} x2={a.x} y2={a.y} className="radar-axis" />
                ))}
                <polygon points={polyPoints} fill="url(#exportRadarFill)" stroke="var(--gold)" strokeWidth="1.4" />
                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={3} className="radar-dot" />
                ))}
              </svg>
            </div>

            <div className="export-gl-cup-chips">
              <span className="chip">{t('cup.note.limpo')}</span>
              <span className="chip">{t('cup.note.doce')}</span>
              <span className="chip">{t('note.caramelo')}</span>
              <span className="chip">{t('cup.note.bomCorpo')}</span>
              <span className="chip">{t('cup.note.nibsCacau')}</span>
            </div>

            <div className="export-gl-cup-meta">
              <div><span className="k">{t('cup.species')}</span><span className="v">Arábica</span></div>
              <div><span className="k">{t('meta.var')}</span><span className="v">Arara</span></div>
              <div><span className="k">{t('meta.proc')}</span><span className="v">{t('proc.natural')}</span></div>
              <div><span className="k">{t('cup.analysis')}</span><span className="v">{t('cup.analysisDate')}</span></div>
            </div>
          </aside>
        </div>
      </div>

      <Lightbox items={lightboxItems} index={index} onClose={close} onPrev={prev} onNext={next} />
    </>
  );
}
