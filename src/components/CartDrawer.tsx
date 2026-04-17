"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppUrl } from "@/lib/config";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Cor de acento por SKU para diferenciar visualmente no carrinho
function getAccentColor(id: string): string {
  if (id.startsWith("classico")) return "#6D4C41"; // coffee-600 (marrom classico)
  if (id.startsWith("reserva")) return "#D4A017"; // gold-500 (dourado)
  if (id.startsWith("microlote")) return "#2E5A3A"; // green-800 (verde micro-lote)
  if (id.startsWith("kit")) return "#B8860B"; // gold-600 (combos)
  return "#8D6E63"; // coffee-500 fallback
}

function buildWhatsAppLink(items: { name: string; quantity: number; price: number; weight: string }[], total: number, pixTotal: number) {
  const lines = items.map(
    (i) => `• ${i.quantity}x ${i.name} (${i.weight}) — ${formatCurrency(i.price * i.quantity)}`
  );
  const msg = `Olá! Gostaria de finalizar meu pedido:\n\n${lines.join("\n")}\n\nSubtotal: ${formatCurrency(total)}\nNo PIX (10% off): ${formatCurrency(pixTotal)}\n\nAguardo instruções para pagamento!`;
  return buildWhatsAppUrl(msg);
}

export function CartButton() {
  const [open, setOpen] = useState(false);
  const { items, itemCount, total, pixTotal, updateQuantity, removeItem, clearCart } = useCart();

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

  return (
    <>
      {/* Cart button */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2 rounded-full bg-coffee-800 px-4 py-2.5 text-sm text-coffee-100 transition-all duration-200 hover:bg-coffee-700 active:scale-[0.97]"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        {itemCount > 0 ? (
          <>
            <span className="font-semibold">{formatCurrency(total)}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-coffee-950">
              {itemCount}
            </span>
          </>
        ) : (
          <span>Carrinho</span>
        )}
      </button>

      {/* Drawer - always rendered, animated via CSS */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? "visible" : "invisible delay-300"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-coffee-50 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-coffee-200 px-6 py-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-coffee-900">Seu carrinho</h3>
              {itemCount > 0 && (
                <p className="text-xs text-coffee-500">{itemCount} {itemCount === 1 ? "item" : "itens"}</p>
              )}
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-2 text-coffee-500 transition-colors hover:bg-coffee-200 hover:text-coffee-900">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-coffee-200">
                <svg className="h-10 w-10 text-coffee-400" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-coffee-700">Seu carrinho está vazio</p>
              <p className="text-center text-sm text-coffee-500">Frete grátis acima de R$ 99</p>
              <button onClick={() => setOpen(false)} className="mt-2 rounded-full bg-coffee-900 px-6 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-800 active:scale-[0.97]">
                Explorar cafés
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.map((item) => (
                  <div key={item.id} className="mb-4 rounded-xl border border-coffee-200 bg-white p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div
                          className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-coffee-100"
                          style={{ boxShadow: `inset 4px 0 0 ${getAccentColor(item.id)}` }}
                        >
                          <img src="/images/rotulo-500g.png" alt={item.name} className="h-10 w-auto object-contain" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-coffee-900">{item.name}</h4>
                          <p className="text-xs text-coffee-500">{item.weight}</p>
                          <p className="mt-1 text-sm font-bold text-coffee-900">{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="rounded-full p-1 text-coffee-400 transition-colors hover:bg-red-50 hover:text-red-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-coffee-200">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-l-full text-coffee-600 transition-colors hover:bg-coffee-100">−</button>
                        <span className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-coffee-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-r-full text-coffee-600 transition-colors hover:bg-coffee-100">+</button>
                      </div>
                      <span className="text-sm font-bold text-coffee-900">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-coffee-200 bg-white px-6 py-5">
                {total >= 99 && (
                  <div className="mb-3 rounded-lg bg-green-800/10 px-3 py-2 text-center text-xs font-medium text-green-800">
                    Frete grátis aplicado
                  </div>
                )}
                {total < 99 && (
                  <div className="mb-3">
                    <div className="mb-1 flex justify-between text-xs text-coffee-600">
                      <span>Faltam {formatCurrency(99 - total)} para frete grátis</span>
                      <span>{Math.round((total / 99) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-coffee-200">
                      <div
                        className="h-full rounded-full bg-gold-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (total / 99) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="mb-1 flex justify-between text-sm text-coffee-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="mb-4 flex justify-between text-lg font-bold text-coffee-900">
                  <span>No PIX <span className="text-xs font-normal text-green-700">(10% off)</span></span>
                  <span className="text-green-800">{formatCurrency(pixTotal)}</span>
                </div>
                <a
                  href={buildWhatsAppLink(items, total, pixTotal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-green-800 py-3.5 text-sm font-bold text-white transition-all hover:bg-green-700 hover:shadow-lg active:scale-[0.97]"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.504 3.935 1.395 5.608L.057 23.534a.5.5 0 00.61.61l5.926-1.338A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.84 0-3.58-.5-5.07-1.37l-.364-.217-3.772.852.852-3.772-.217-.364A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Finalizar via WhatsApp — {formatCurrency(pixTotal)}
                </a>
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={() => setOpen(false)} className="text-sm text-coffee-500 hover:text-coffee-700">Continuar comprando</button>
                  <button onClick={clearCart} className="text-xs text-coffee-400 hover:text-red-600">Limpar</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
