/**
 * ExportPage v3 — design Cloud Design portado 1:1 (2026-05-11).
 * Header proprio (ExportHeader), nao reusa HomeHeader.
 * Logos reais do Zerbinatti (wordmark-gold/cream PNGs).
 */

import Image from 'next/image';
import { T } from '@/lib/i18n/T';
import ExportHeader from './ExportHeader';
import ExportRadar from './ExportRadar';
import ExportForm from './ExportForm';

type StepKey = 'step1' | 'step2' | 'step3' | 'step4' | 'step5';
const PROCESS_STEPS: {
  key: StepKey;
  n: string;
  eyebrow: string;
  sideLabel: string;
  sideValue: string;
}[] = [
  { key: 'step1', n: 'I', eyebrow: 'Step 01 · Field', sideLabel: 'Window', sideValue: 'May – Sep' },
  { key: 'step2', n: 'II', eyebrow: 'Step 02 · Patio', sideLabel: 'Drying', sideValue: '25 days' },
  { key: 'step3', n: 'III', eyebrow: 'Step 03 · Lab', sideLabel: 'Threshold', sideValue: 'SCA 85+' },
  { key: 'step4', n: 'IV', eyebrow: 'Step 04 · Warehouse', sideLabel: 'Standard', sideValue: '60 kg jute' },
  { key: 'step5', n: 'V', eyebrow: 'Step 05 · Port', sideLabel: 'Port', sideValue: 'Santos · BR' },
];

const GALLERY_IMGS = [
  { src: '/assets/galeria/2.webp', alt: 'Ripe yellow cherries on the branch', n: '01', cap: 'Ripe cherries · harvest mark' },
  { src: '/assets/galeria/6.webp', alt: 'Sun-drying patio at Valim Farms', n: '02', cap: 'Patio · natural sun drying' },
  { src: '/assets/galeria/5.webp', alt: 'Coffee seedlings in the nursery', n: '03', cap: 'Nursery · where it begins' },
  { src: '/assets/galeria/3.webp', alt: 'Coffee plantation in bloom at sunset', n: '04', cap: 'Bloom · sunset on the field' },
];

const COFFEES: {
  roman: string;
  tag: string;
  name: string;
  notes: string;
  sca: string;
  variety: string;
  process: string;
  roast: string;
}[] = [
  {
    roman: 'N° I',
    tag: 'Traditional blend',
    name: 'Clássico Zerbinatti',
    notes: 'Milk chocolate · caramel · walnuts · long sweet finish.',
    sca: '85+',
    variety: 'Arara · Catuaí',
    process: 'Natural',
    roast: 'Medium',
  },
  {
    roman: 'N° II',
    tag: 'Single origin',
    name: 'Reserva Especial',
    notes: 'Red berries · wildflower honey · citric acidity.',
    sca: '88+',
    variety: 'Arara',
    process: 'Pulped natural',
    roast: 'Medium-light',
  },
  {
    roman: 'N° III',
    tag: 'Microlot · Rare',
    name: 'Micro-Lote Premium',
    notes: 'Jasmine · bergamot · orange-blossom honey · floral finish.',
    sca: '90+',
    variety: 'Arara',
    process: 'Washed',
    roast: 'Light',
  },
];

const BILL_ROWS: { k: string; v: string }[] = [
  { k: 'Incoterms', v: 'FOB Santos · CIF destination · CFR · negotiable' },
  { k: 'Minimum volume', v: '1 × 20′ container (≈ 320 bags / 19.2 tonnes)' },
  { k: 'Packaging', v: '60 kg jute · hermetic GrainPro liner · vacuum on request' },
  { k: 'Certifications', v: 'Full traceability · SCA sheet · ICO marks · on-request' },
  { k: 'Samples', v: '250 g pre-shipment sample shipped via courier after contract signed' },
  { k: 'Payment', v: 'L/C at sight · T/T · terms negotiable' },
];

export default function ExportPage() {
  return (
    <div className="export-v3">
      <ExportHeader />

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow" aria-hidden="true">
            <span className="diamond" />
            <span>Export Division</span>
            <span className="dot">·</span>
            <span>Est. 1897</span>
            <span className="dot">·</span>
            <span>Serra do Cabral · MG</span>
            <span className="diamond" />
          </div>
          <div className="hero-script">Caffè</div>
          <T as="h1" k="export.hero.title" html className="hero-title" />
          <T as="p" k="export.hero.desc" className="hero-desc" />
          <div className="hero-cta">
            <a href="#inquiry" className="x-btn x-btn-gold">
              <T as="span" k="export.hero.cta.inquiry" html />
            </a>
            <a href="#origin" className="x-btn x-btn-ghost">
              <T as="span" k="export.hero.cta.origin" />
            </a>
          </div>
          <div className="hero-trust" aria-hidden="true">
            <div>
              <span className="v">85<sup>+</sup></span>
              <span>SCA cupping</span>
            </div>
            <div>
              <span className="v">III</span>
              <span>Generations</span>
            </div>
            <div>
              <span className="v">100%</span>
              <span>Arabica</span>
            </div>
            <div>
              <span className="v">FOB</span>
              <span>Santos · CIF</span>
            </div>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <Image
            src="/assets/export/sacas-arabica-empilhadas.webp"
            alt=""
            fill
            sizes="(max-width: 980px) 100vw, 44vw"
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-photo-caption">
            <div className="name">Valim Farms</div>
            <div className="coords">17°50′S · 44°00′W · 760 m</div>
          </div>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span className="line" />
          <span>Scroll · Atto I</span>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="stats-strip" aria-label="Key figures">
        <div className="stats-strip-inner">
          <div className="item"><div className="num">1897</div><div className="lbl">Founded</div></div>
          <div className="item"><div className="num">760<sup>m</sup></div><div className="lbl">Altitude</div></div>
          <div className="item"><div className="num">85<sup>+</sup></div><div className="lbl">Min. SCA score</div></div>
          <div className="item"><div className="num">III</div><div className="lbl">Generations</div></div>
          <div className="item"><div className="num">6</div><div className="lbl">Continents shipped</div></div>
        </div>
      </section>

      {/* ===== ATTO I — ORIGIN ===== */}
      <section className="x-section origin" id="origin">
        <div className="x-section-inner">
          <div className="x-divider" aria-hidden="true">
            <span className="rule" />
            <span className="diamond" />
            <span>17°50′S · 44°00′W</span>
            <span className="diamond" />
            <span className="rule" />
          </div>

          <div className="x-section-head">
            <div className="left">
              <div className="atto">
                <span className="atto-num">Atto I</span>
                <span className="eyebrow">Origin · Terroir</span>
              </div>
              <T as="h2" k="export.origin.title" html className="x-display" />
            </div>
            <p className="right">
              A single estate. A single family. A single Arabica grown the way <em>nonno</em> taught us — slow, by hand, scored at the cupping table before it leaves the farm.
            </p>
          </div>

          <div className="origin-grid">
            <figure className="origin-photo">
              <Image
                src="/assets/galeria/3.webp"
                alt="Coffee plantation at sunset on Valim Farms"
                fill
                sizes="(max-width: 980px) 100vw, 35vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="marker">Valim Farms · MG</span>
              <span className="stamp">
                <span>III<br /><em>generazioni</em><br />1897</span>
              </span>
            </figure>

            <div className="origin-text">
              <p className="origin-body">
                <span className="lead-letter">V</span>
                <T as="span" k="export.origin.body" />
              </p>
              <div className="origin-meta">
                {(['location', 'altitude', 'variety', 'harvest'] as const).map((field) => (
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

      {/* ===== ATTO II — GALLERIA + LAUDO ===== */}
      <section className="x-section galleria" id="galleria">
        <div className="x-section-inner">
          <div className="x-divider" aria-hidden="true">
            <span className="rule" />
            <span className="diamond" />
            <span>Galleria &amp; Laudo</span>
            <span className="diamond" />
            <span className="rule" />
          </div>

          <div className="x-section-head">
            <div className="left">
              <div className="atto">
                <span className="atto-num">Atto II</span>
                <span className="eyebrow">The Land &amp; The Score</span>
              </div>
              <h2 className="x-display">
                The land, the <em>hands.</em><br />Every lot, <em>a score.</em>
              </h2>
            </div>
            <p className="right">
              Photographs from harvest and the patio · paired with the blind SCA cupping sheet of our flagship lot, scored on protocol by certified Q-graders.
            </p>
          </div>

          <div className="galleria-grid">
            <div className="gal-photos">
              {GALLERY_IMGS.map((g, i) => (
                <figure key={i} className="gal-photo">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 980px) 50vw, 30vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <figcaption>
                    <span className="num">{g.n}</span>
                    <span>{g.cap}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <aside className="laudo" aria-label="Cupping report">
              <div className="laudo-head">
                <div className="l">
                  <span className="sku">TS-00986028 · Lot 2025</span>
                  <span className="name">Zerbinatti · Arara Natural</span>
                </div>
                <div className="score">
                  <div className="score-num">84.75</div>
                  <div className="score-lbl">SCA Total</div>
                </div>
              </div>

              <div className="radar">
                <ExportRadar />
              </div>

              <div className="chips">
                <span className="chip">Clean</span>
                <span className="chip">Sweet</span>
                <span className="chip">Caramel</span>
                <span className="chip">Full body</span>
                <span className="chip">Cocoa nibs</span>
              </div>

              <div className="laudo-meta">
                <div><span className="k">Species</span><span className="v">Arabica</span></div>
                <div><span className="k">Variety</span><span className="v">Arara</span></div>
                <div><span className="k">Process</span><span className="v">Natural</span></div>
                <div><span className="k">Cupping date</span><span className="v">18 Jun 2025</span></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== ATTO III — COFFEES ===== */}
      <section className="x-section coffees" id="coffees">
        <div className="x-section-inner">
          <div className="x-divider" aria-hidden="true">
            <span className="rule" />
            <span className="diamond" />
            <span>Portfolio</span>
            <span className="diamond" />
            <span className="rule" />
          </div>

          <div className="x-section-head">
            <div className="left">
              <div className="atto">
                <span className="atto-num">Atto III</span>
                <span className="eyebrow">Available Portfolio</span>
              </div>
              <T as="h2" k="export.coffees.title" html className="x-display" />
            </div>
            <p className="right">
              Our retail line — a starting point for your cup profile. Final lots, microlots and custom blends are defined together with the farm.
            </p>
          </div>

          <div className="coffees-grid">
            {COFFEES.map((c) => (
              <article key={c.name} className="coffee-card">
                <span className="coffee-tag">{c.tag}</span>
                <h3 className="coffee-name">
                  <span className="roman">{c.roman}</span>
                  {c.name}
                </h3>
                <p className="coffee-notes">{c.notes}</p>
                <div className="coffee-specs">
                  <div><span className="k">SCA</span><span className="v">{c.sca}</span></div>
                  <div><span className="k">Variety</span><span className="v">{c.variety}</span></div>
                  <div><span className="k">Process</span><span className="v">{c.process}</span></div>
                  <div><span className="k">Roast</span><span className="v">{c.roast}</span></div>
                </div>
                <span className="coffee-seal" aria-hidden="true">Z</span>
              </article>
            ))}
          </div>

          <T as="p" k="export.coffees.note" className="coffees-note" />
        </div>
      </section>

      {/* ===== ATTO IV — PROCESS ===== */}
      <section className="x-section process" id="process">
        <div className="x-section-inner">
          <div className="x-divider" aria-hidden="true">
            <span className="rule" />
            <span className="diamond" />
            <span>Tree → Container</span>
            <span className="diamond" />
            <span className="rule" />
          </div>

          <div className="x-section-head">
            <div className="left">
              <div className="atto">
                <span className="atto-num">Atto IV</span>
                <span className="eyebrow">From Tree to Container</span>
              </div>
              <T as="h2" k="export.process.title" html className="x-display" />
            </div>
            <p className="right">
              Each step is signed off by a member of the family — agronomist, processor, Q-grader, exporter. Nothing leaves the farm anonymously.
            </p>
          </div>

          <div className="timeline">
            {PROCESS_STEPS.map((s) => (
              <div key={s.key} className="timeline-step">
                <div className="timeline-num">{s.n}</div>
                <div className="timeline-body">
                  <span className="timeline-eyebrow">{s.eyebrow}</span>
                  <T as="h3" k={`export.process.${s.key}.title`} className="timeline-title" />
                  <T as="p" k={`export.process.${s.key}.desc`} className="timeline-desc" />
                </div>
                <div className="timeline-side">
                  <span>{s.sideLabel}</span>
                  <span className="v">{s.sideValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ATTO V — LOGISTICS ===== */}
      <section className="x-section logistics" id="logistics">
        <div className="logistics-bg" aria-hidden="true" />
        <div className="x-section-inner">
          <div className="x-divider" aria-hidden="true">
            <span className="rule" />
            <span className="diamond" />
            <span>Bill of Lading · Termini Commerciali</span>
            <span className="diamond" />
            <span className="rule" />
          </div>

          <div className="x-section-head">
            <div className="left">
              <div className="atto">
                <span className="atto-num">Atto V</span>
                <span className="eyebrow">Trade Terms</span>
              </div>
              <T as="h2" k="export.logistics.title" html className="x-display" />
            </div>
            <T as="p" k="export.logistics.intro" className="right" />
          </div>

          <div className="bill">
            <div className="bill-header" aria-hidden="true">
              <span className="diamond" />
              <span>Bill of Lading</span>
              <span className="diamond" />
              <span>Zerbinatti · Export Division</span>
              <span className="diamond" />
            </div>

            <div className="bill-grid">
              {BILL_ROWS.map((r) => (
                <div key={r.k} className="bill-row">
                  <span className="k">{r.k}</span>
                  <span className="v">{r.v}</span>
                </div>
              ))}
            </div>

            <div className="bill-footer">
              <div className="signed">
                <span className="name">Famiglia Zerbinatti</span>
                <span className="role">III generazione · Serra do Cabral · MG</span>
              </div>
              <div className="bill-stamp">
                <span className="diamond" />
                Authorised · MG · BR
                <span className="diamond" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INQUIRY FORM ===== */}
      <section className="x-section inquiry" id="inquiry">
        <div className="inquiry-shell">
          <div className="x-divider" aria-hidden="true">
            <span className="rule" />
            <span className="diamond" />
            <span>Consulenza Privata</span>
            <span className="diamond" />
            <span className="rule" />
          </div>
          <div className="atto" style={{ marginBottom: 14, justifyContent: 'center' }}>
            <span className="atto-num">Atto VI</span>
            <span className="eyebrow">Let&apos;s Talk</span>
          </div>
          <T as="h2" k="export.form.title" html className="x-display" />
          <T as="p" k="export.form.desc" className="lede" />

          <div className="form-frame">
            <ExportForm />
          </div>

          <p className="form-note">
            Your message goes straight to the family&rsquo;s commercial desk in Minas Gerais, Brazil.
          </p>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="x-section trust">
        <div className="trust-shell">
          <p className="trust-statement">
            Q-graders SCA at the cupping table — <em>direct from the producer</em>, no middleman in between you and the family that planted this coffee.
          </p>
          <div className="trust-signature">Famiglia Zerbinatti</div>
          <div className="trust-signed">III generazioni · Serra do Cabral · MG · Since 1897</div>

          <div className="trust-seals" aria-hidden="true">
            <span className="seal"><span className="dot" /> SCA 85+ Cupping</span>
            <span className="seal"><span className="dot" /> Q-Graders Certified</span>
            <span className="seal"><span className="dot" /> ICO Marks</span>
            <span className="seal"><span className="dot" /> Pre-Shipment Sample</span>
            <span className="seal"><span className="dot" /> Full Traceability</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="foot-brand">
            <Image
              src="/assets/zerbinatti-wordmark-cream.png"
              alt="Zerbinatti"
              width={1205}
              height={295}
              style={{ height: 38, width: 'auto' }}
            />
            <p>
              Brazilian specialty coffee with Italian heritage. Three generations of dedication, from Valim Farms in Serra do Cabral to your country.
            </p>
          </div>
          <div className="foot-col">
            <h4>Export</h4>
            <ul>
              <li><a href="#origin">Origin</a></li>
              <li><a href="#coffees">Portfolio</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#logistics">Trade terms</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="#inquiry">Request quote</a></li>
              <li><a href="mailto:export@zerbinatti.coffee">export@zerbinatti.coffee</a></li>
              <li><a href="https://zerbinatti.coffee">zerbinatti.coffee</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Languages</h4>
            <ul>
              <li><a href="/export">English</a></li>
              <li><a href="/exportacao">Português</a></li>
              <li><a href="/es/exportacion">Español</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 1897 – 2026 Zerbinatti Caffè · Famiglia · Serra do Cabral · MG · Brazil</div>
          <div>Privacy · Terms · Direct trade</div>
        </div>
      </footer>
    </div>
  );
}
