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

function FeatureDivider() {
  return (
    <div className="feature-divider" aria-hidden="true">
      <svg
        className="fleuron"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 4 L20 36" opacity=".55" />
        <path d="M4 20 L36 20" opacity=".55" />
        <path d="M20 12 C 24 14, 26 16, 20 20 C 14 16, 16 14, 20 12 Z" fill="currentColor" opacity=".85" />
        <path d="M20 28 C 24 26, 26 24, 20 20 C 14 24, 16 26, 20 28 Z" fill="currentColor" opacity=".85" />
        <path d="M12 20 C 14 16, 16 14, 20 20 C 16 24, 14 26, 12 20 Z" fill="currentColor" opacity=".85" />
        <path d="M28 20 C 26 16, 24 14, 20 20 C 24 24, 26 26, 28 20 Z" fill="currentColor" opacity=".85" />
        <circle cx="20" cy="20" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}

export async function Cafes() {
  const products = await getHomeProducts();
  const classico = products.find((p) => p.handle === CLASSICO_HANDLE) ?? null;

  // Sem produto Shopify ainda? Renderiza apenas o cabecalho e segue o jogo —
  // evita 500 na home se a integracao falhar / feed estiver vazio.
  if (!classico || !classico.editorial) {
    return (
      <section className="features" id="cafes">
        <div className="section-intro reveal">
          <T k="cafes.eyebrow" as="span" className="eyebrow" />
          <T k="cafes.title" html as="h2" className="display" />
          <svg className="ornament" viewBox="0 0 120 24" fill="none">
            <line x1="0" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth=".5" />
            <circle cx="60" cy="12" r="3" fill="currentColor" />
            <line x1="72" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth=".5" />
          </svg>
          <T k="cafes.desc" as="p" className="body-lg" />
        </div>
      </section>
    );
  }

  const editorial = classico.editorial;

  // Ordena variantes pelo slotKey conforme SLOT_ORDER (estavel + previsivel).
  const orderedVariants = SLOT_ORDER.map((slot) =>
    classico.variants.find((v) => v.slotKey === slot),
  ).filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <>
      <section className="features" id="cafes">
        <div className="section-intro reveal">
          <T k="cafes.eyebrow" as="span" className="eyebrow" />
          <T k="cafes.title" html as="h2" className="display" />
          <svg className="ornament" viewBox="0 0 120 24" fill="none">
            <line x1="0" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth=".5" />
            <circle cx="60" cy="12" r="3" fill="currentColor" />
            <line x1="72" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth=".5" />
          </svg>
          <T k="cafes.desc" as="p" className="body-lg" />
        </div>
      </section>

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
    </>
  );
}
