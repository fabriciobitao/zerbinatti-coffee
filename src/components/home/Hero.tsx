// Hero — Server Component. Reproduz verbatim o <section class="hero"> de
// public/novo-layout/index.html, usando classes do novo-layout.css.
// Strings via <T />; HTML inline (titulo, badge CTA) via prop `html`.
// O unico ilha cliente e <HeroMotion /> que ativa .reveal -> .in no mount
// e atualiza a opacidade do scroll-indicator durante o scroll.

import { T } from '@/lib/i18n';
import { ANCHORS, type AnchorKey } from '@/lib/i18n/anchors';
import { HeroMotion } from './HeroMotion';
import { HeroInstagramButton } from '@/components/InstagramButton';

type HeroAnchors = Record<AnchorKey, string>;

export default function Hero({ anchors = ANCHORS.pt }: { anchors?: HeroAnchors } = {}) {
  return (
    <section className="hero" id="hero">
      <div
        className="hero-bg"
        id="heroBg"
        style={{ backgroundImage: "url('/assets/hero-bg.webp')" }}
      />
      <div className="hero-amber-glow" />
      <div className="hero-steam" style={{ left: '18%', bottom: '6%' }}>
        <span className="plume" />
        <span className="plume" />
        <span className="plume" />
      </div>

      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-badge reveal">
            <span className="dot" />
            <T
              k="hero.badge"
              as="span"
              className="label"
            />
          </div>
          <T k="hero.title" html as="h1" className="hero-title reveal" />
          <T k="hero.desc" as="p" className="hero-desc reveal" />

          <div className="hero-stats reveal">
            <div>
              <div className="v">
                <span style={{ fontSize: '.55em', fontWeight: 300, letterSpacing: '.01em' }}>
                  640&ndash;
                </span>
                760
                <span style={{ fontSize: '.55em', fontWeight: 300 }}>m</span>
              </div>
              <T k="hero.stats.alt" as="div" className="l" />
            </div>
            <div>
              <div className="v">
                88
                <span style={{ fontSize: '.55em', fontWeight: 300 }}>/100</span>
              </div>
              <div className="l">SCA</div>
            </div>
            <div>
              <div className="v">III</div>
              <T k="hero.stats.gen" as="div" className="l" />
            </div>
          </div>

          <div className="hero-cta reveal">
            <a href={`#${anchors.cafes}`} className="btn btn-gold">
              <T k="hero.cta.shop" html as="span" />
            </a>
            <a href={`#${anchors.assinatura}`} className="btn btn-ghost">
              <T k="hero.cta.sub" as="span" />
            </a>
          </div>

          <div className="hero-seals reveal">
            <img
              src="/assets/selo-scaa.png"
              alt="SCAA Specialty Coffee Association of America"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/assets/selo-100.png"
              alt="Selo 100 anos Zerbinatti — desde 1897"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/assets/selo-cup.png"
              alt="Cup of Excellence — café especial premiado"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/assets/selo-brasil.png"
              alt="Café 100% Brasileiro"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/assets/selo-organic.png"
              alt="Café Orgânico Certificado"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Mobile-only: Instagram migrou do header pro hero. Em desktop o
              header ja exibe o IG; este link fica oculto via CSS. */}
          <HeroInstagramButton />
        </div>
      </div>

      <div className="hero-side-meta">
        <div>
          <span className="key">Lat</span> 18&deg;S
        </div>
        <div>
          <span className="key">Lot</span> 042 / 2025
        </div>
        <div>
          <span className="key">Roast</span> <T k="hero.roast" as="span" />
        </div>
      </div>

      <div className="scroll-indicator" id="heroScrollIndicator">
        <T k="hero.scroll" as="span" />
        <div className="line" />
      </div>

      <HeroMotion />
    </section>
  );
}
