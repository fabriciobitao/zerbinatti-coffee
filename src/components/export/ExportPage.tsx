/**
 * ExportPage v2 — premium redesign 2026-05-11.
 *
 * Sintetiza UX Architect + UI Designer:
 *  - Hero asimetrico 58/42 (texto esquerda, foto warehouse direita full-bleed)
 *  - ATTO I / II / III / IV como device italiano cross-locale (brand mark, nao traduzido)
 *  - Divisor diamond + coords "17°50'S · 44°00'W" (Serra do Cabral)
 *  - Origin com vertical stack (sacas-arabica-empilhadas) na coluna 7/12
 *  - Logistics como "BILL OF LADING" sobre saca-product-of-brazil a 12%
 *  - Process vertical alternating rows com numerais oversized
 *  - Form em dark inset com double-frame
 *  - Trust como statement assinado (substitui 3 cards genericos)
 *
 * Server component — usa <T> client islands pra i18n. ExportForm e CartDrawer
 * sao os unicos client roots.
 */

import Image from 'next/image';
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

// Divisor reutilizado entre sections — diamond + coords Serra do Cabral.
function Divider() {
  return (
    <div className="export-divider" aria-hidden="true">
      <span className="rule" />
      <span className="diamond" />
      <span>17°50&prime;S · 44°00&prime;W</span>
      <span className="diamond" />
      <span className="rule" />
    </div>
  );
}

// Marker "ATTO N" + eyebrow — abre cada section.
function AttoMarker({ num, eyebrowKey }: { num: string; eyebrowKey: string }) {
  return (
    <div className="export-atto">
      <span className="atto-num">{num}</span>
      <T as="span" k={eyebrowKey} className="eyebrow" />
    </div>
  );
}

export default function ExportPage() {
  return (
    <main id="main" className="novo-layout">
      <HomeHeader />

      {/* ===== HERO V3 — centered, brand-led (Zerbinatti's own marks) ===== */}
      <section className="export-hero-v2">
        <div className="export-hero-text">
          <div className="export-act-row">
            <span className="diamond-mini" aria-hidden="true" />
            <span>Export Division</span>
            <span className="dot-sep">·</span>
            <span>Est. 1897</span>
            <span className="dot-sep">·</span>
            <span>Serra do Cabral · MG</span>
            <span className="diamond-mini" aria-hidden="true" />
          </div>
          <Image
            src="/assets/zerbinatti-wordmark-gold.png"
            alt="Zerbinatti"
            width={1205}
            height={295}
            priority
            className="export-hero-wordmark"
          />
          <div className="export-hero-tagline">
            <span className="rule" aria-hidden="true" />
            <span>Caffè · Dall&apos;Italia al Brasile dal 1897</span>
            <span className="rule" aria-hidden="true" />
          </div>
          <div className="export-hero-italian">Specialty Coffee for Export</div>
          <T as="h1" k="export.hero.title" html className="export-hero-title-v2" />
          <T as="p" k="export.hero.desc" className="export-hero-desc-v2" />
          <div className="export-hero-stamps" aria-hidden="true">
            <Image
              src="/assets/selo-organico-fazenda.png"
              alt=""
              width={84}
              height={84}
              style={{ height: 84, width: 'auto' }}
            />
            <Image
              src="/assets/selo-scaa.png"
              alt=""
              width={84}
              height={84}
              style={{ height: 84, width: 'auto' }}
            />
            <Image
              src="/assets/selo-cup.png"
              alt=""
              width={84}
              height={84}
              style={{ height: 84, width: 'auto' }}
            />
          </div>
          <div className="export-hero-meta">
            <span>17°50&prime;S 44°00&prime;W</span>
            <span className="sep" aria-hidden="true" />
            <span>640 – 760 m</span>
            <span className="sep" aria-hidden="true" />
            <span>100% Arabica</span>
            <span className="sep" aria-hidden="true" />
            <span>Worldwide shipping</span>
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

      {/* ===== ATTO I — ORIGIN ===== */}
      <section className="export-section export-origin" id="origin">
        <Divider />
        <div className="export-section-inner">
          <div className="export-section-head-v2">
            <AttoMarker num="ATTO I" eyebrowKey="export.origin.eyebrow" />
            <T as="h2" k="export.origin.title" html className="export-display-v2" />
          </div>

          <div className="export-origin-split">
            <div className="export-origin-text">
              <T as="p" k="export.origin.body" />
              <div className="export-meta-vert">
                {ORIGIN_META.map((field) => (
                  <div key={field}>
                    <T as="span" k={`export.origin.meta.${field}`} className="k" />
                    <T as="span" k={`export.origin.meta.${field}.v`} className="v" />
                  </div>
                ))}
              </div>
            </div>
            <div className="export-origin-image">
              <Image
                src="/assets/export/sacas-arabica-empilhadas.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ATTO II — COFFEES ===== */}
      <section className="export-section export-coffees" id="coffees">
        <Divider />
        <div className="export-section-inner">
          <div className="export-section-head-v2">
            <AttoMarker num="ATTO II" eyebrowKey="export.coffees.eyebrow" />
            <T as="h2" k="export.coffees.title" html className="export-display-v2" />
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
                <span className="seal" aria-hidden="true">Z</span>
              </article>
            ))}
          </div>

          <T as="p" k="export.coffees.note" className="export-coffees-note" />
        </div>
      </section>

      {/* ===== ATTO III — PROCESS ===== */}
      <section className="export-section export-process" id="process">
        <Divider />
        <div className="export-section-inner">
          <div className="export-section-head-v2">
            <AttoMarker num="ATTO III" eyebrowKey="export.process.eyebrow" />
            <T as="h2" k="export.process.title" html className="export-display-v2" />
          </div>

          <div className="export-timeline">
            {PROCESS_STEPS.map((s) => (
              <div key={s.key} className="export-timeline-step">
                <div className="step-num" aria-hidden="true">{s.n}</div>
                <div className="step-body">
                  <T as="h3" k={`export.process.${s.key}.title`} />
                  <T as="p" k={`export.process.${s.key}.desc`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ATTO IV — LOGISTICS (Bill of Lading) ===== */}
      <section className="export-section export-logistics" id="logistics">
        <div className="export-logistics-bg" aria-hidden="true" />
        <Divider />
        <div className="export-section-inner">
          <div className="export-section-head-v2">
            <AttoMarker num="ATTO IV" eyebrowKey="export.logistics.eyebrow" />
            <T as="h2" k="export.logistics.title" html className="export-display-v2" />
          </div>

          <blockquote className="export-pullquote">
            <T as="span" k="export.logistics.intro" />
          </blockquote>

          <div className="export-bill">
            <div className="export-bill-header" aria-hidden="true">
              <span className="diamond" />
              <span>Bill of Lading · Termini Commerciali</span>
              <span className="diamond" />
            </div>

            <div className="export-logistics-grid">
              {LOGISTICS_FIELDS.map((f) => (
                <div key={f} className="export-logistics-row">
                  <T as="span" k={`export.logistics.${f}.label`} className="k" />
                  <T as="span" k={`export.logistics.${f}.value`} className="v" />
                </div>
              ))}
            </div>

            <div className="export-bill-stamp" aria-hidden="true">
              Zerbinatti<br />Export<br />MG · Brazil
            </div>
          </div>
        </div>
      </section>

      {/* ===== ATTO V — FORM (Private Consultation) ===== */}
      <section className="export-section export-form-section" id="inquiry">
        <Divider />
        <div className="export-form-shell">
          <div className="script">Consulenza privata</div>
          <T as="h2" k="export.form.title" html className="display-v2" />
          <T as="p" k="export.form.desc" className="lede" />

          <div className="export-form-frame">
            <ExportForm />
          </div>

          <T as="p" k="export.form.note" className="export-form-note" />
        </div>
      </section>

      {/* ===== TRUST — signed statement ===== */}
      <section className="export-trust">
        <div className="export-trust-shell">
          <p className="statement">
            &ldquo;<T as="span" k="export.trust.qgrader" />{' '}
            <em>—</em>{' '}
            <T as="span" k="export.trust.direct" />.&rdquo;
          </p>
          <div className="signature">Famiglia Zerbinatti</div>
          <div className="signed-by">III generazioni · Serra do Cabral · MG</div>

          <div className="export-trust-seals" aria-hidden="true">
            <div className="seal"><span className="dot" /> SCA 85+ Cupping</div>
            <div className="seal"><span className="dot" /> Q-Graders</div>
            <div className="seal"><span className="dot" /> ICO Marks</div>
            <div className="seal"><span className="dot" /> Pre-Shipment Sample</div>
          </div>
        </div>
      </section>

      <HomeFooter />
      <CartDrawer />
    </main>
  );
}
