/**
 * /en/for-business — pagina canonica B2B em ingles.
 *
 * Migrada do legacy public/novo-layout/para-empresas.html (HTML estatico
 * de 941 linhas com JS inline). Conteudo 100% em ingles porque os
 * materiais B2B serao mantidos apenas em ingles daqui pra frente.
 *
 * - Server Component (sem fetch externo).
 * - Header/Footer reusados da home (locale-aware via usePathname).
 * - Form em B2BFormEN (client island com Turnstile + POST /api/b2b-form).
 * - LocaleProvider externo (root layout) usa pathname.startsWith('/en')
 *   pra skipar lang sync — o /en/layout.tsx ja envolve com inner provider
 *   forcado em "en", garantindo SSR ingles.
 */

import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';
import CartDrawer from '@/components/home/CartDrawer';
import B2BFormEN from '@/components/b2b/B2BFormEN';

export const revalidate = 3600;

const SEGMENTS = [
  {
    num: 'N° 01',
    title: 'Cafés',
    titleEm: '& coffee shops',
    desc: 'Beans roasted on demand, exclusive single-origin lots, calibration support and cupping profile changes tailored to your barista persona.',
    bullets: ['Roasted beans in 1kg or 500g', 'Co-branded label available', 'Monthly lot rotation'],
  },
  {
    num: 'N° 02',
    title: 'Restaurants',
    titleEm: '& hotels',
    desc: 'Custom blend designed for your customer profile and kitchen. Recurring deliveries with sensory consulting and pairing notes.',
    bullets: ['Exclusive blend from 10kg/month', 'Brigade training', 'Custom packaging'],
  },
  {
    num: 'N° 03',
    title: 'Partner',
    titleEm: 'roasteries',
    desc: 'Green coffee sales in traceable lots, direct from Valim Farms. Full transparency on origin, processing and pricing.',
    bullets: ['Green by traced lot', 'Contracts up to 24 months', 'Farm visit available'],
  },
  {
    num: 'N° 04',
    title: 'Offices',
    titleEm: '& coworking spaces',
    desc: 'Corporate program. Your team drinks specialty coffee and you stop being held hostage by overpriced capsules.',
    bullets: ['Bi-weekly or monthly delivery', 'Optional equipment kit', 'Invoiced under company VAT'],
  },
];

const PILLARS = [
  {
    num: 'I.',
    title: 'Family-owned farm',
    desc: 'Producers since 1897. You buy from the owner — not from a middleman. Fair pricing, guaranteed allocation.',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    num: 'II.',
    title: 'Q-Graders at the table',
    desc: 'Every harvest goes through SCA cupping. Only lots scoring 85+ leave the farm. Full technical sheet with every delivery.',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <circle cx={12} cy={12} r={9} />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
  },
  {
    num: 'III.',
    title: 'Annual contracts',
    desc: 'Locked pricing, guaranteed allocation, predictability for you to operate — no commodity market swings disrupting your cashflow.',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
        <rect x={3} y={5} width={18} height={14} rx={2} />
        <path d="M3 10h18M8 15h2M14 15h4" />
      </svg>
    ),
  },
];

export default function ForBusinessPage() {
  return (
    <main id="main" className="novo-layout">
      <HomeHeader />

      {/* HERO */}
      <section className="b2b-hero">
        <div className="b2b-hero-bg" aria-hidden="true" />
        <div className="b2b-hero-glow" aria-hidden="true" />
        <div className="b2b-hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            <span className="label" style={{ fontSize: 10 }}>Zerbinatti · B2B</span>
          </div>
          <h1 className="b2b-hero-title">
            Specialty coffee from the <em>producer</em><br />direct to your <em>business</em>.
          </h1>
          <p className="b2b-hero-desc">
            Three generations of family coffee growing in Serra do Cabral, Minas Gerais — Brazil. We supply cafés, restaurants, hotels, roasteries and offices that won&rsquo;t compromise on traceability and quality.
          </p>
          <div className="b2b-stats-row">
            <div><div className="v">1897</div><div className="l">Since</div></div>
            <div><div className="v">85+</div><div className="l">SCA Cupping</div></div>
            <div><div className="v">III</div><div className="l">Generations</div></div>
            <div><div className="v">24m</div><div className="l">Contract</div></div>
          </div>
          <div className="b2b-cta">
            <a href="#inquiry" className="btn btn-gold">
              Talk to sales <span className="arrow">→</span>
            </a>
            <a href="#segments" className="btn btn-ghost">
              See segments
            </a>
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="b2b-section b2b-segments" id="segments">
        <div className="b2b-section-inner">
          <div className="b2b-section-head">
            <div>
              <span className="eyebrow">Segments we serve</span>
              <h2 className="display" style={{ marginTop: 14 }}>
                Each business,<br />a <em>tailored</em><br />program.
              </h2>
            </div>
            <div>
              <p>
                Four partnership models, all with traced origin, recurring delivery and direct support from the farm. You buy from the owner — never from a middleman.
              </p>
              <div className="meta">
                <div><span className="k">Origin</span><span className="v">Serra do Cabral · MG</span></div>
                <div><span className="k">Shipping</span><span className="v">Worldwide</span></div>
                <div><span className="k">Minimum</span><span className="v">10kg/month</span></div>
              </div>
            </div>
          </div>

          <div className="b2b-segments-grid">
            {SEGMENTS.map((s) => (
              <div key={s.num} className="b2b-seg-card">
                <div className="num">{s.num}</div>
                <h3>
                  {s.title} <em>{s.titleEm}</em>
                </h3>
                <p className="desc">{s.desc}</p>
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="b2b-section b2b-pillars" id="pillars">
        <div className="b2b-section-inner">
          <div className="b2b-section-head">
            <div>
              <span className="eyebrow">Why Zerbinatti</span>
              <h2 className="display" style={{ marginTop: 14 }}>
                Producer, roaster<br />and <em>partner</em> at<br />the same table.
              </h2>
            </div>
            <div>
              <p>
                No middlemen. No surprises. Each lot leaves the farm with a name, a technical sheet and a cupping score — and arrives at your counter the following week.
              </p>
            </div>
          </div>

          <div className="b2b-pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.num} className="b2b-pillar">
                <div className="icon">{p.icon}</div>
                <div className="num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="b2b-section b2b-form-section" id="inquiry">
        <div className="b2b-form-shell">
          <span className="eyebrow">Request a quote</span>
          <h2 className="display" style={{ marginTop: 14 }}>
            Tell us about<br />your <em>project</em>.
          </h2>
          <p>
            Fill in the form and we&rsquo;ll reply with pricing, logistics and a{' '}
            <strong>free sample for cupping</strong>.
          </p>
          <B2BFormEN />
          <p className="b2b-form-note">
            Reply within one business day — straight from the farm&rsquo;s commercial team.
          </p>
        </div>
      </section>

      <HomeFooter />
      <CartDrawer />
    </main>
  );
}
