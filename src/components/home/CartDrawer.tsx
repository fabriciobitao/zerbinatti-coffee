'use client';

/**
 * CartDrawer — drawer off-canvas (lado direito) com linhas Shopify.
 *
 * Estrutura copiada verbatim de public/novo-layout/index.html (`<aside class="cart-drawer">`):
 *   .cart-overlay (overlay escuro, fora do drawer)
 *   .cart-drawer
 *     .cart-head      -> .title + .label (contagem) + icon-btn close
 *     .cart-body      -> .cart-empty (vazio) ou lista de .cart-item
 *     .cart-foot      -> .freight-bar + linhas (subtotal/frete) + .total + btn-gold
 *
 * Linha (.cart-item): copiada verbatim do JS render em novo-layout (linhas 3438-3452):
 *   .img > img · .name · .meta · .qty (− span +) · .price
 *
 * Threshold de frete: 150 (BRL). i18n nao tem chave `freight.threshold`; usamos
 * a constante para casar com o `FREE_SHIPPING_THRESHOLD = 150` da static.
 */

import { useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/cart/store';
import type { Cart, CartLine } from '@/lib/cart/types';
import { useT } from '@/lib/i18n/useT';

const FREE_SHIPPING_THRESHOLD = 150;

function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

function lineSubtotal(line: CartLine): number {
  const unit = parseFloat(line.merchandise.price.amount || '0');
  return unit * line.quantity;
}

function cartSubtotal(cart: Cart | null): number {
  if (!cart) return 0;
  // Preferimos o valor autoritativo do Shopify (cost.subtotalAmount).
  const fromCost = parseFloat(cart.cost.subtotalAmount.amount || '0');
  if (!Number.isNaN(fromCost) && fromCost > 0) return fromCost;
  return cart.lines.reduce((sum, l) => sum + lineSubtotal(l), 0);
}

function variantLabel(line: CartLine): string {
  // 'Default Title' eh o sentinel da Shopify para variants sem opcoes — esconde.
  const title = line.merchandise.title;
  if (!title || title === 'Default Title') {
    const opts = line.merchandise.selectedOptions
      .filter((o) => o.value && o.value !== 'Default Title')
      .map((o) => o.value)
      .join(' · ');
    return opts;
  }
  return title;
}

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const isLoading = useCartStore((s) => s.isLoading);
  const cart = useCartStore((s) => s.cart);
  const closeCart = useCartStore((s) => s.closeCart);
  const updateLine = useCartStore((s) => s.updateLine);
  const removeLine = useCartStore((s) => s.removeLine);
  const t = useT();

  // Scroll lock + ESC
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCart();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeCart]);

  const lines = cart?.lines ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;
  const subtotal = cartSubtotal(cart);
  const hasItems = lines.length > 0;

  const itemWord = totalQuantity === 1 ? t('cart.itemSing') : t('cart.itemPlur');
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPct = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );
  const gotFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const freightLabel = gotFreeShipping
    ? t('freight.got')
    : t('freight.miss').replace('{v}', formatBRL(remaining));

  const checkoutDisabled = !cart || !hasItems || isLoading;

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        id="cartOverlay"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${isOpen ? ' open' : ''}`}
        id="cartDrawer"
        aria-hidden={!isOpen}
        aria-label={t('cart.title')}
        role="dialog"
        aria-modal={isOpen}
      >
        <div className="cart-head">
          <div>
            <div className="title">{t('cart.title')}</div>
            <div className="label" style={{ marginTop: 4 }}>
              {totalQuantity} {itemWord}
            </div>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Fechar carrinho"
            onClick={closeCart}
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-body">
          {!hasItems ? (
            <div className="cart-empty">
              <div>
                <div className="ico" aria-hidden="true">
                  ∅
                </div>
                <div className="label" style={{ color: 'var(--ink-2)' }}>
                  {t('cart.empty')}
                </div>
                <p style={{ marginTop: 14, fontSize: 13 }}>
                  {t('cart.emptyDesc')}
                </p>
              </div>
            </div>
          ) : (
            lines.map((line) => {
              const img = line.merchandise.product.featuredImage;
              const variant = variantLabel(line);
              const lineTotal = lineSubtotal(line);
              return (
                <div className="cart-item" key={line.id}>
                  <div className="img">
                    {img ? (
                      <Image
                        src={img.url}
                        alt={img.altText ?? line.merchandise.product.title}
                        width={80}
                        height={100}
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <div>
                    <div className="name">
                      {line.merchandise.product.title}
                    </div>
                    {variant ? <div className="meta">{variant}</div> : null}
                    <div className="qty" role="group" aria-label="Quantidade">
                      <button
                        type="button"
                        data-q="-"
                        aria-label="Diminuir quantidade"
                        disabled={isLoading}
                        onClick={() =>
                          updateLine(line.id, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span aria-live="polite">{line.quantity}</span>
                      <button
                        type="button"
                        data-q="+"
                        aria-label="Aumentar quantidade"
                        disabled={isLoading}
                        onClick={() =>
                          updateLine(line.id, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.id)}
                      disabled={isLoading}
                      aria-label={`Remover ${line.merchandise.product.title}`}
                      style={{
                        marginTop: 8,
                        background: 'transparent',
                        border: 'none',
                        padding: '8px 0',
                        minHeight: 44,
                        color: 'var(--ink-3)',
                        fontFamily: 'var(--mono)',
                        fontSize: 10,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Remover
                    </button>
                  </div>
                  <div className="price">{formatBRL(lineTotal)}</div>
                </div>
              );
            })
          )}
        </div>

        {hasItems ? (
          <div className="cart-foot">
            <div className="freight-bar">
              <div className="top">
                <span>{freightLabel}</span>
                <span className="v">{Math.round(progressPct)}%</span>
              </div>
              <div className="track">
                <div className="fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="row">
              <span>{t('cart.subtotal')}</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <div className="row">
              <span>{t('cart.shipping')}</span>
              <span>
                {gotFreeShipping ? (
                  <span style={{ color: 'var(--gold)' }}>{t('cart.free')}</span>
                ) : (
                  t('cart.shipping.calc')
                )}
              </span>
            </div>
            <div className="total">
              <span className="l">{t('cart.total')}</span>
              <span className="v">{formatBRL(subtotal)}</span>
            </div>

            <a
              href={cart?.checkoutUrl ?? '#'}
              className="btn btn-gold"
              aria-disabled={checkoutDisabled}
              onClick={(e) => {
                if (checkoutDisabled) e.preventDefault();
              }}
              style={{
                pointerEvents: checkoutDisabled ? 'none' : undefined,
                opacity: checkoutDisabled ? 0.55 : 1,
                minHeight: 44,
              }}
              dangerouslySetInnerHTML={{
                __html: isLoading ? '…' : t('cart.checkout'),
              }}
            />
          </div>
        ) : null}
      </aside>
    </>
  );
}
