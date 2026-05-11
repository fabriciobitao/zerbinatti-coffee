/**
 * ExportPage — server component compartilhado pelas 3 rotas
 * (/exportacao, /export, /es/exportacion). Todo texto vem do dictionary
 * via <T>, locale e definido pelo LocaleProvider de cada layout.
 *
 * Sections:
 *   1. Hero — badge, titulo, desc, stats, CTAs
 *   2. Origin — terroir Serra do Cabral + meta (altitude/variedade/colheita)
 *   3. Coffees — vitrine de 3 cafes (referencia sensorial) + disclaimer
 *   4. Process — timeline horizontal de 5 etapas
 *   5. Logistics — tabela de termos comerciais (Incoterms, volume, etc)
 *   6. Form — ExportForm (client island)
 *   7. Trust — 3 cards de garantias
 */

import { T } from '@/lib/i18n/T';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';
import CartDrawer from '@/components/home/CartDrawer';
import ExportForm from './ExportForm';
import ClientTag from './ClientTag';

type StepKey = 'step1' | 'step2' | 'step3' | 'step4' | 'step5';
const PROCESS_STEPS: { key: StepKey; n: string }[] = [
  { key: 'step1', n: 'I' },
  { key: 'step2', n: 'II' },
  { key: 'step3', n: 'III' },
  { key: 'step4', n: 'IV' },
  { key: 'step5', n: 'V' },
];

const ORIGIN_META = ['location', 'altitude', 'variety', 'harvest'] as const;

const LOGISTICS_FIELDS = [
  'terms',
  'minimum',
  'packaging',
  'certifications',
  'samples',
  'payment',
] as const;

// Coffees vitrine — nomes proprios (sem traducao), demais campos i18n.
// Apenas 3 cafes mais emblematicos da linha pra evitar overload visual.
const FEATURED_COFFEES: {
  name: string;
  score: string;
  variety: string;
  processKey: string;
  roastKey: string;
  notesKeys: string[];
  tag: { pt: string; en: string; es: string };
}[] = [
  {
    name: 'Clássico Zerbinatti',
    score: 'SCA 85+',
    variety: 'Arara · Catuaí',
    processKey: 'proc.natural',
    roastKey: 'torra.media',
    notesKeys: ['note.chocoLeite', 'note.caramelo', 'note.nozes'],
    tag: { pt: 'Blend tradicional', en: 'Traditional blend', es: 'Blend tradicional' },
  },
  {
    name: 'Reserva Especial',
    score: 'SCA 88+',
    variety: 'Arara',
    processKey: 'proc.pulped',
    roastKey: 'torra.mediaClara',
    notesKeys: ['note.fruVerm', 'note.melSilv', 'note.acidCit'],
    tag: { pt: 'Single origin', en: 'Single origin', es: 'Single origin' },
  },
  {
    name: 'Micro-Lote Premium',
    score: 'SCA 90+',
    variety: 'Arara',
    processKey: 'proc.washed',
    roastKey: 'torra.clara',
    notesKeys: ['note.jasmim', 'note.bergamota', 'note.melLaranja'],
    tag: { pt: 'Microlote', en: 'Microlot', es: 'Microlote' },
  },
];

export default function ExportPage() {
  return (
    <main id="main" className="novo-layout">
      <HomeHeader />

      {/* HERO */}
      <section className="export-hero">
        <div className="export-hero-bg" aria-hidden="true" />
        <div className="export-hero-glow" aria-hidden="true" />
        <div className="export-hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            <T as="span" k="export.hero.badge" className="label" />
          </div>
          <T as="h1" k="export.hero.title" html className="export-hero-title" />
          <T as="p" k="export.hero.desc" className="export-hero-desc" />
          <div className="export-stats-row">
            <div>
              <div className="v">1897</div>
              <T as="div" k="export.stats.since" className="l" />
            </div>
            <div>
              <div className="v">85+</div>
              <T as="div" k="export.stats.score" className="l" />
            </div>
            <div>
              <div className="v">III</div>
              <T as="div" k="export.stats.generations" className="l" />
            </div>
            <div>
              <div className="v">∞</div>
              <T as="div" k="export.stats.shipping" className="l" />
            </div>
          </div>
          <div className="export-cta">
            <a href="#inquiry" className="btn btn-gold">
              <T as="span" k="export.hero.cta.inquiry" html />
            </a>
            <a href="#origin" className="btn btn-ghost">
              <T as="span" k="export.hero.cta.origin" />
            </a>
          </div>
        </div>
      </section>

      {/* ORIGIN */}
      <section className="export-section export-origin" id="origin">
        <div className="export-section-inner">
          <div className="export-section-head">
            <div>
              <T as="span" k="export.origin.eyebrow" className="eyebrow" />
              <T as="h2" k="export.origin.title" html className="display" />
            </div>
            <div>
              <T as="p" k="export.origin.body" />
              <div className="export-meta-grid">
                {ORIGIN_META.map((field) => (
                  <div key={field}>
                    <T as="span" k={`export.origin.meta.${field}`} className="k" />
                    <T as="span" k={`export.origin.meta.${field}.v`} className="v" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COFFEES */}
      <section className="export-section export-coffees" id="coffees">
        <div className="export-section-inner">
          <div className="export-section-head">
            <div>
              <T as="span" k="export.coffees.eyebrow" className="eyebrow" />
              <T as="h2" k="export.coffees.title" html className="display" />
            </div>
            <div>
              <T as="p" k="export.coffees.note" />
            </div>
          </div>

          <div className="export-coffees-grid">
            {FEATURED_COFFEES.map((c) => (
              <article key={c.name} className="export-coffee-card">
                <ClientTag tag={c.tag} />
                <h3>{c.name}</h3>
                <p className="desc">
                  {c.notesKeys.map((nk, i) => (
                    <span key={nk}>
                      <T as="span" k={nk} />
                      {i < c.notesKeys.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </p>
                <div className="specs">
                  <div>
                    <span className="k">SCA</span>
                    <span className="v">{c.score}</span>
                  </div>
                  <div>
                    <T as="span" k="meta.var" className="k" />
                    <span className="v">{c.variety}</span>
                  </div>
                  <div>
                    <T as="span" k="meta.proc" className="k" />
                    <T as="span" k={c.processKey} className="v" />
                  </div>
                  <div>
                    <T as="span" k="meta.torra" className="k" />
                    <T as="span" k={c.roastKey} className="v" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="export-section export-process" id="process">
        <div className="export-section-inner">
          <div className="export-section-head">
            <div>
              <T as="span" k="export.process.eyebrow" className="eyebrow" />
              <T as="h2" k="export.process.title" html className="display" />
            </div>
            <div />
          </div>

          <div className="export-timeline">
            {PROCESS_STEPS.map((s) => (
              <div key={s.key} className="export-timeline-step">
                <div className="step-num">{s.n}</div>
                <T as="h3" k={`export.process.${s.key}.title`} />
                <T as="p" k={`export.process.${s.key}.desc`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGISTICS */}
      <section className="export-section export-logistics" id="logistics">
        <div className="export-section-inner">
          <div className="export-section-head">
            <div>
              <T as="span" k="export.logistics.eyebrow" className="eyebrow" />
              <T as="h2" k="export.logistics.title" html className="display" />
            </div>
            <div>
              <T as="p" k="export.logistics.intro" />
            </div>
          </div>

          <div className="export-logistics-grid">
            {LOGISTICS_FIELDS.map((f) => (
              <div key={f} className="export-logistics-row">
                <T as="span" k={`export.logistics.${f}.label`} className="k" />
                <T as="span" k={`export.logistics.${f}.value`} className="v" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="export-section export-form-section" id="inquiry">
        <div className="export-form-shell">
          <T as="span" k="export.form.eyebrow" className="eyebrow" />
          <T as="h2" k="export.form.title" html className="display" />
          <T as="p" k="export.form.desc" />
          <ExportForm />
          <T as="p" k="export.form.note" className="export-form-note" />
        </div>
      </section>

      {/* TRUST */}
      <section className="export-section export-trust">
        <div className="export-section-inner">
          <div className="export-trust-grid">
            <div className="export-trust-card">
              <div className="icon" aria-hidden="true">
                <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <circle cx={12} cy={12} r={9} />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              </div>
              <T as="h3" k="export.trust.qgrader" />
              <T as="p" k="export.trust.qgrader.desc" />
            </div>
            <div className="export-trust-card">
              <div className="icon" aria-hidden="true">
                <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
                </svg>
              </div>
              <T as="h3" k="export.trust.direct" />
              <T as="p" k="export.trust.direct.desc" />
            </div>
            <div className="export-trust-card">
              <div className="icon" aria-hidden="true">
                <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <rect x={3} y={7} width={18} height={13} rx={2} />
                  <path d="M3 11h18M8 16h2M14 16h4M9 7V4h6v3" />
                </svg>
              </div>
              <T as="h3" k="export.trust.samples" />
              <T as="p" k="export.trust.samples.desc" />
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
      <CartDrawer />
    </main>
  );
}
