/**
 * Card editorial de produto (home #cafes).
 * Server Component — renderiza markup estatico replicando .feature do
 * public/novo-layout/index.html. A interacao (Adicionar) e ilha client.
 *
 * O slot determina o copy editorial (numero N° 01/02, tagline, specs, desc, suffix italico)
 * — isso casa com o Shopify variant via o slotKey resolvido em products.ts.
 */

import Image from 'next/image';
import { T } from '@/lib/i18n/T';
import type { HomeProduct, HomeVariantSlot } from '@/lib/products';
// Type-only import — server-only module nao entra no client bundle.
import type { SensoryDimensions } from './SensoryBars';
import { SensoryBars } from './SensoryBars';
import { FlavorChips } from './FlavorChips';
import { AddToCartButton } from './AddToCartButton';

type SlotCopy = {
  numKey: string;
  tagKey: string;
  specsKey: string;
  descKey: string;
  /** Sufixo italico apos o brand-mark (ex.: "Em Grãos"). undefined = sem sufixo. */
  italicSuffix?: string;
  packageAlt: string;
};

const SLOT_COPY: Record<string, SlotCopy> = {
  'classico-250g': {
    numKey: 'feat.classico.num',
    tagKey: 'feat.classico.tag',
    specsKey: 'feat.classico.specs',
    descKey: 'feat.classico.desc',
    italicSuffix: 'Moído',
    packageAlt: 'Clássico Zerbinatti',
  },
  'classico-500g': {
    numKey: 'feat.micro.num',
    tagKey: 'feat.micro.tag',
    specsKey: 'feat.micro.specs',
    descKey: 'feat.micro.desc',
    italicSuffix: 'Em Grãos',
    packageAlt: 'Clássico Zerbinatti — Em Grãos',
  },
};

type Props = {
  product: HomeProduct;
  variant: HomeVariantSlot;
  sensory: SensoryDimensions;
  flavorChipsKeys: string[];
  scaScore: string;
};

export function FeatureCard({
  product,
  variant,
  sensory,
  flavorChipsKeys,
  scaScore,
}: Props) {
  const copy = SLOT_COPY[variant.slotKey];
  if (!copy) return null;

  // Imagem do pacote: prefere featuredImage do Shopify, com fallback editorial.
  const packageSrc =
    product.featuredImage?.url ?? '/assets/pacote-zerbinatti-2026.webp';
  const packageAlt = product.featuredImage?.altText ?? copy.packageAlt;

  // Pesos da variante (extraidos do selectedOption "Tamanho" para o badge .price .small).
  const sizeOption = variant.selectedOptions.find(
    (o) => o.name === 'Tamanho',
  );
  const sizeLabel = sizeOption?.value ?? '';

  return (
    <article className="feature reveal" data-feature={variant.slotKey}>
      <div
        className="feature-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1600&q=85')",
        }}
      />
      <div className="feature-grid">
        <div className="feature-text">
          <T k={copy.numKey} as="div" className="num" />
          <h3 className="title">
            Clássico{' '}
            <Image
              className="brand-mark"
              src="/assets/zerbinatti-wordmark-gold.png"
              alt="Zerbinatti"
              width={180}
              height={32}
              style={{ height: 'auto', width: 'auto', display: 'inline-block' }}
            />
            {copy.italicSuffix ? <> <em>{copy.italicSuffix}</em></> : null}
          </h3>
          <T k={copy.tagKey} as="div" className="tagline" />
          <div
            className="feature-specs"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.28em',
              color: 'var(--gold-soft)',
              textTransform: 'uppercase',
              marginTop: '18px',
              textShadow: '0 1px 4px rgba(0,0,0,.5)',
            }}
          >
            <T k={copy.specsKey} as="span" />
          </div>
          <T k={copy.descKey} as="p" className="desc" />

          <div className="feature-meta">
            <div>
              <T k="meta.origem" as="div" className="k" />
              <div className="v">Valim Farms</div>
            </div>
            <div>
              <T k="meta.var" as="div" className="k" />
              <div className="v">Arara</div>
            </div>
            <div>
              <T k="meta.proc" as="div" className="k" />
              <T k="proc.natural" as="div" className="v" />
            </div>
            <div>
              <T k="meta.torra" as="div" className="k" />
              <T k="torra.media" as="div" className="v" />
            </div>
          </div>

          <FlavorChips keys={flavorChipsKeys} />

          <SensoryBars dimensions={sensory} />

          <div className="feature-buy">
            <div className="price">
              {variant.priceFormatted}
              {sizeLabel ? <span className="small">{sizeLabel}</span> : null}
            </div>
            <AddToCartButton
              variantId={variant.variantId}
              available={variant.availableForSale}
            />
          </div>
        </div>

        <div className="feature-pkg">
          <div className="glow" />
          <Image
            src={packageSrc}
            alt={packageAlt}
            width={600}
            height={800}
            sizes="(max-width: 900px) 80vw, 40vw"
            priority={variant.slotKey === 'classico-250g'}
          />
          <Image
            className="pkg-seal pkg-seal--score"
            src="/assets/selo-sca-84-75.png"
            alt={`Certificação SCA ${scaScore} — Specialty Coffee Association`}
            width={120}
            height={120}
          />
          <Image
            className="pkg-seal pkg-seal--organic"
            src="/assets/selo-organico-fazenda.png"
            alt="Selo Café Orgânico da Fazenda Zerbinatti"
            width={120}
            height={120}
          />
        </div>
      </div>
    </article>
  );
}
