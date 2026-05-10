/**
 * Secao #cafes da home (Server Component).
 *
 * Busca produtos via getHomeProducts() (server-only), localiza o blend
 * "classico-zerbinatti", identifica as variantes 250g e 500g pelo slotKey
 * resolvido em products.ts, e renderiza N° 01 (250g) primeiro, N° 02 (500g)
 * depois — exatamente como o static layout.
 *
 * Markup espelha public/novo-layout/index.html (section.features#cafes +
 * 2x article.feature + .feature-divider entre eles).
 */

import { getHomeProducts } from '@/lib/products';
import { T } from '@/lib/i18n/T';
import { FeatureCard } from './FeatureCard';

const CLASSICO_HANDLE = 'classico-zerbinatti';

// Ordem de exibicao: slot -> posicao no DOM.
const SLOT_ORDER: readonly string[] = ['classico-250g', 'classico-500g'];

function HeritageMark() {
  return (
    <section className="heritage-mark reveal" aria-label="1897">
      <div className="heritage-mark-inner">
        <T k="heritage.year" as="span" className="heritage-mark-year" />
        <span className="heritage-mark-rule" aria-hidden="true" />
        <T k="heritage.tag" as="span" className="heritage-mark-tag" />
      </div>
    </section>
  );
}

function FeatureDivider() {
  return (
    <div className="feature-divider" aria-hidden="true">
      <svg
        className="fleuron"
        viewBox="0 0 160 24"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fdBean" x1="35%" y1="0%" x2="65%" y2="100%">
            <stop offset="0%" stopColor="#F5E6C0" />
            <stop offset="35%" stopColor="#DDC8A0" />
            <stop offset="70%" stopColor="#C9A961" />
            <stop offset="100%" stopColor="#7A5A22" />
          </linearGradient>
          <linearGradient id="fdLeaf" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0" />
            <stop offset="55%" stopColor="#DDC8A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8B6E2E" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="fdLeafR" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0" />
            <stop offset="55%" stopColor="#DDC8A0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8B6E2E" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="fdHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E6C0" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#C9A961" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="80" cy="12" rx="22" ry="11" fill="url(#fdHalo)" />

        <g>
          <g transform="translate(8 12) rotate(-22) scale(0.55)" opacity="0.72">
            <ellipse cx="0" cy="0" rx="2.6" ry="4.2" fill="url(#fdBean)" />
            <path d="M 0 -3.6 C -1 -1.5, -1 1.5, 0 3.6" stroke="#3A1F0E" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(20 12.4) rotate(15) scale(0.7)" opacity="0.85">
            <ellipse cx="0" cy="0" rx="2.6" ry="4.2" fill="url(#fdBean)" />
            <path d="M 0 -3.6 C -1 -1.5, -1 1.5, 0 3.6" stroke="#3A1F0E" strokeWidth="0.55" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(34 11.5) rotate(-12) scale(0.85)">
            <ellipse cx="0" cy="0" rx="2.7" ry="4.3" fill="url(#fdBean)" />
            <path d="M 0 -3.7 C -1.1 -1.5, -1.1 1.5, 0 3.7" stroke="#3A1F0E" strokeWidth="0.55" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(45 13) rotate(18) scale(0.6)" opacity="0.78">
            <ellipse cx="0" cy="0" rx="2.6" ry="4.2" fill="url(#fdBean)" />
            <path d="M 0 -3.6 C -1 -1.5, -1 1.5, 0 3.6" stroke="#3A1F0E" strokeWidth="0.55" fill="none" strokeLinecap="round" />
          </g>

          <g transform="translate(115 13) rotate(-18) scale(0.6)" opacity="0.78">
            <ellipse cx="0" cy="0" rx="2.6" ry="4.2" fill="url(#fdBean)" />
            <path d="M 0 -3.6 C -1 -1.5, -1 1.5, 0 3.6" stroke="#3A1F0E" strokeWidth="0.55" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(126 11.5) rotate(12) scale(0.85)">
            <ellipse cx="0" cy="0" rx="2.7" ry="4.3" fill="url(#fdBean)" />
            <path d="M 0 -3.7 C -1.1 -1.5, -1.1 1.5, 0 3.7" stroke="#3A1F0E" strokeWidth="0.55" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(140 12.4) rotate(-15) scale(0.7)" opacity="0.85">
            <ellipse cx="0" cy="0" rx="2.6" ry="4.2" fill="url(#fdBean)" />
            <path d="M 0 -3.6 C -1 -1.5, -1 1.5, 0 3.6" stroke="#3A1F0E" strokeWidth="0.55" fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(152 12) rotate(22) scale(0.55)" opacity="0.72">
            <ellipse cx="0" cy="0" rx="2.6" ry="4.2" fill="url(#fdBean)" />
            <path d="M 0 -3.6 C -1 -1.5, -1 1.5, 0 3.6" stroke="#3A1F0E" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>
        </g>

        <g>
          <path d="M 56 12 Q 62 5, 70 7 Q 64 12, 56 12 Z" fill="url(#fdLeaf)" opacity="0.85" />
          <path d="M 56 12 Q 62 5, 70 7" stroke="#5A4220" strokeWidth="0.25" fill="none" opacity="0.55" />
          <path d="M 56 12 Q 62 19, 70 17 Q 64 12, 56 12 Z" fill="url(#fdLeaf)" opacity="0.65" />
          <path d="M 56 12 Q 62 19, 70 17" stroke="#5A4220" strokeWidth="0.25" fill="none" opacity="0.45" />

          <path d="M 104 12 Q 98 5, 90 7 Q 96 12, 104 12 Z" fill="url(#fdLeafR)" opacity="0.85" />
          <path d="M 104 12 Q 98 5, 90 7" stroke="#5A4220" strokeWidth="0.25" fill="none" opacity="0.55" />
          <path d="M 104 12 Q 98 19, 90 17 Q 96 12, 104 12 Z" fill="url(#fdLeafR)" opacity="0.65" />
          <path d="M 104 12 Q 98 19, 90 17" stroke="#5A4220" strokeWidth="0.25" fill="none" opacity="0.45" />
        </g>

        <g transform="rotate(-14 80 12)">
          <ellipse cx="80" cy="12" rx="6" ry="9.5" fill="url(#fdBean)" />
          <path
            d="M 80 3 C 76.5 6, 76 10, 80 12 C 84 14, 83.5 18, 80 21"
            stroke="#3A1F0E"
            strokeWidth="0.95"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M 80 3 C 76.5 6, 76 10, 80 12"
            stroke="#FFEBC4"
            strokeWidth="0.25"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
            transform="translate(-0.7 0)"
          />
          <path
            d="M 80 12 C 84 14, 83.5 18, 80 21"
            stroke="#FFEBC4"
            strokeWidth="0.25"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
            transform="translate(0.7 0)"
          />
          <ellipse cx="77.5" cy="8" rx="1.2" ry="2.2" fill="#FFF4DC" opacity="0.55" />
          <ellipse cx="80" cy="2.6" rx="0.8" ry="0.4" fill="#3A1F0E" opacity="0.7" />
          <ellipse cx="80" cy="21.4" rx="0.8" ry="0.4" fill="#3A1F0E" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

export async function Cafes({ id = 'cafes' }: { id?: string } = {}) {
  const products = await getHomeProducts();
  const classico = products.find((p) => p.handle === CLASSICO_HANDLE) ?? null;

  // Sem produto Shopify ainda? Renderiza apenas o cabecalho e segue o jogo —
  // evita 500 na home se a integracao falhar / feed estiver vazio.
  if (!classico || !classico.editorial) {
    return (
      <>
        <HeritageMark />
        <section id={id} aria-hidden="true" />
      </>
    );
  }

  const editorial = classico.editorial;

  // Ordena variantes pelo slotKey conforme SLOT_ORDER (estavel + previsivel).
  const orderedVariants = SLOT_ORDER.map((slot) =>
    classico.variants.find((v) => v.slotKey === slot),
  ).filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <>
      <HeritageMark />

      <div id={id}>
        {orderedVariants.map((variant, idx) => (
          <div key={variant.slotKey}>
            <FeatureCard
              product={classico}
              variant={variant}
              sensory={editorial.sensory}
              flavorChipsKeys={editorial.flavorChipsKeys}
              scaScore={editorial.scaScore}
            />
            {idx < orderedVariants.length - 1 ? <FeatureDivider /> : null}
          </div>
        ))}
      </div>
    </>
  );
}
