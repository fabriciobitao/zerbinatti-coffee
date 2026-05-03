"use client";

import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppUrl } from "@/lib/config";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Mensagem WhatsApp simplificada — só pedido id + total.
 * Reduz vazamento de PII em referer/extensions; operador puxa detalhes em handoff.
 */
function buildWhatsAppLink(orderId: string, total: number) {
  const msg = `Pedido #${orderId} — fui pelo site. Total: ${formatCurrency(total)}.`;
  return buildWhatsAppUrl(msg);
}

function buildOrderId() {
  // 8 chars hex aleatórios — fácil de ditar por telefone
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint8Array(4);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return Math.random().toString(16).slice(2, 10);
}

export function CartButton() {
  const [open, setOpen] = useState(false);
  const { items, itemCount, total, pixTotal, updateQuantity, removeItem, clearCart } = useCart();

  // Order ID estável durante a sessão do drawer aberto
  const orderId = useMemo(buildOrderId, [items.length === 0]);

  // Scroll lock + escape key
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [open]);

  const freteRestante = Math.max(0, 99 - total);
  const fretePct = Math.min(100, (total / 99) * 100);

  return (
    <>
      {/* Cart trigger — paleta editorial */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2 border border-line bg-bone px-4 py-2.5 text-sm text-ink transition-colors hover:bg-bone-soft"
        style={{ borderRadius: "2px" }}
        aria-label="Abrir carrinho"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        {itemCount > 0 ? (
          <>
            <span className="font-medium">{formatCurrency(total)}</span>
            <span
              className="flex h-5 w-5 items-center justify-center bg-olive text-[11px] font-medium text-bone"
              style={{ borderRadius: "2px" }}
            >
              {itemCount}
            </span>
          </>
        ) : (
          <span>Carrinho</span>
        )}
      </button>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? "visible" : "invisible delay-300"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        <div
          className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ink text-bone shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line-dark px-6 py-5">
            <div>
              <h3
                className="font-display italic text-bone"
                style={{ fontWeight: 400, fontSize: "22px", lineHeight: 1.15 }}
              >
                Seu carrinho
              </h3>
              {itemCount > 0 && (
                <p
                  className="mt-1 font-mono text-[11px] uppercase text-[var(--ink-mute-on-dark)]"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {itemCount} {itemCount === 1 ? "item" : "itens"}
                </p>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-bone-soft transition-colors hover:text-bone"
              aria-label="Fechar carrinho"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
              <span
                className="font-display italic text-olive"
                style={{ fontWeight: 400, fontSize: "96px", lineHeight: 1 }}
                aria-hidden="true"
              >
                Z
              </span>
              <div>
                <h4
                  className="font-display italic text-bone"
                  style={{ fontWeight: 400, fontSize: "24px" }}
                >
                  Carrinho vazio.
                </h4>
                <p className="mt-3 text-[14px] leading-[1.6] text-bone-soft">
                  Comece pelos pacotes ou pela assinatura — o atalho mais rápido
                  para uma xícara fresca em casa.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="bg-olive px-8 py-4 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
                style={{ borderRadius: "2px" }}
              >
                Ver os pacotes
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 border border-line-dark bg-ink-soft p-4"
                    style={{ borderRadius: "2px" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-3">
                        <div
                          className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden bg-ink"
                          style={{
                            borderRadius: "2px",
                            boxShadow: `inset 3px 0 0 var(--olive)`,
                          }}
                          aria-hidden="true"
                        >
                          <span
                            className="font-display italic text-olive"
                            style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1 }}
                          >
                            Z
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[14px] font-medium text-bone truncate">
                            {item.name}
                          </h4>
                          <p
                            className="mt-1 font-mono text-[11px] uppercase text-[var(--ink-mute-on-dark)]"
                            style={{ letterSpacing: "0.05em" }}
                          >
                            {item.weight}
                          </p>
                          <p className="mt-2 text-[14px] font-medium text-bone">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-[var(--ink-mute-on-dark)] transition-colors hover:text-bone"
                        aria-label={`Remover ${item.name}`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div
                        className="flex items-center border border-line-dark"
                        style={{ borderRadius: "2px" }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-bone-soft transition-colors hover:bg-ink hover:text-bone"
                          aria-label={`Diminuir quantidade de ${item.name}`}
                        >
                          −
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center text-[14px] font-medium text-bone">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-bone-soft transition-colors hover:bg-ink hover:text-bone"
                          aria-label={`Aumentar quantidade de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[14px] font-medium text-bone">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-line-dark bg-ink-soft px-6 py-5">
                {/* Progress bar de frete grátis (paleta nova) */}
                {total >= 99 ? (
                  <div
                    className="mb-4 border border-olive px-3 py-2 text-center font-mono text-[11px] uppercase text-olive"
                    style={{ letterSpacing: "0.18em", borderRadius: "2px" }}
                  >
                    Frete grátis aplicado
                  </div>
                ) : (
                  <div className="mb-4">
                    <div
                      className="mb-2 flex justify-between font-mono text-[11px] uppercase text-bone-soft"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      <span>
                        Faltam {formatCurrency(freteRestante)} para frete grátis
                      </span>
                      <span>{Math.round(fretePct)}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden bg-line-dark">
                      <div
                        className="h-full bg-olive transition-all duration-500"
                        style={{ width: `${fretePct}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-1 flex justify-between text-[14px] text-bone-soft">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="text-[14px] text-bone-soft">
                    No PIX{" "}
                    <span
                      className="font-mono text-[11px] uppercase text-olive"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      (10% off)
                    </span>
                  </span>
                  <span
                    className="font-display text-bone"
                    style={{ fontWeight: 400, fontSize: "24px", lineHeight: 1 }}
                  >
                    {formatCurrency(pixTotal)}
                  </span>
                </div>

                <a
                  href={buildWhatsAppLink(orderId, pixTotal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center bg-olive py-4 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
                  style={{ borderRadius: "2px" }}
                >
                  Finalizar pelo WhatsApp
                </a>

                <p
                  className="mt-3 text-center font-mono text-[10px] uppercase text-[var(--ink-mute-on-dark)]"
                  style={{ letterSpacing: "0.18em" }}
                >
                  Pedido #{orderId}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-[13px] text-bone-soft underline decoration-1 underline-offset-4 transition-colors hover:text-bone"
                  >
                    Continuar comprando
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-[12px] text-[var(--ink-mute-on-dark)] underline decoration-1 underline-offset-4 transition-colors hover:text-bone"
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
