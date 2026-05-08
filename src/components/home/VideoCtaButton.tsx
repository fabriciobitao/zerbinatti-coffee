'use client';

import { useT } from '@/lib/i18n/useT';
import { useCartStore } from '@/lib/cart/store';

type Props = {
  variantId: string;
  available: boolean;
};

export function VideoCtaButton({ variantId, available }: Props) {
  const t = useT();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const disabled = !available || isLoading;
  const labelHtml = t.html('video.cta');

  return (
    <button
      type="button"
      className="btn btn-gold"
      data-variant-id={variantId}
      data-add="true"
      aria-busy={isLoading || undefined}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        void addItem(variantId, 1);
      }}
    >
      {isLoading ? (
        <span className="add-spinner" aria-hidden="true" />
      ) : (
        <span dangerouslySetInnerHTML={labelHtml} />
      )}
    </button>
  );
}
