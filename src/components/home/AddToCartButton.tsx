'use client';

/**
 * Botao Adicionar do card de produto (home #cafes).
 * Wired ao Zustand cart store: addItem(variantId, 1) abre o drawer otimistico.
 *
 * - Disabled quando !available ou enquanto isLoading.
 * - Default label: t('btn.add') (contem <span class="arrow">→</span>, renderizado como HTML).
 * - Loading state mostra spinner inline preservando layout do botao .btn-gold.
 */

import { useT } from '@/lib/i18n/useT';
import { useCartStore } from '@/lib/cart/store';

type Props = {
  variantId: string;
  available: boolean;
  /** Override do label padrao (chave i18n com possivel HTML em btn.add). */
  label?: string;
};

export function AddToCartButton({ variantId, available, label }: Props) {
  const t = useT();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const disabled = !available || isLoading;
  const labelHtml = label ? { __html: label } : t.html('btn.add');

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
