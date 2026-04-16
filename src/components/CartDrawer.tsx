"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function CartButton() {
  const [open, setOpen] = useState(false);
  const { items, itemCount, total, pixTotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <>
      {/* Cart button */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2 rounded-full bg-coffee-800 px-4 py-2.5 text-sm text-coffee-100 transition-all hover:bg-coffee-700"
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

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-coffee-50 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-coffee-200 px-6 py-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-coffee-900">Seu Carrinho</h3>
                {itemCount > 0 && (
                  <p className="text-xs text-coffee-500">{itemCount} {itemCount === 1 ? "item" : "itens"}</p>
                )}
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 text-coffee-500 hover:bg-coffee-200 hover:text-coffee-900">
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
                <p className="text-center text-sm text-coffee-500">Adicione cafés especiais e receba com frete grátis acima de R$ 99.</p>
                <button onClick={() => setOpen(false)} className="mt-2 rounded-full bg-coffee-900 px-6 py-3 text-sm font-semibold text-coffee-50 hover:bg-coffee-800">
                  Explorar Cafés
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <div key={item.id} className="mb-4 rounded-xl border border-coffee-200 bg-white p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-coffee-100">
                            <img src="/images/rotulo-500g.png" alt={item.name} className="h-10 w-auto object-contain" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-coffee-900">{item.name}</h4>
                            <p className="text-xs text-coffee-400">{item.weight}</p>
                            <p className="mt-1 text-sm font-bold text-coffee-900">{formatCurrency(item.price)}</p>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="rounded-full p-1 text-coffee-400 hover:bg-coffee-100 hover:text-red-600">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-coffee-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-l-full text-coffee-600 hover:bg-coffee-100"
                          >
                            -
                          </button>
                          <span className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-coffee-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-r-full text-coffee-600 hover:bg-coffee-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold text-coffee-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-coffee-200 bg-white px-6 py-5">
                  {total >= 99 && (
                    <div className="mb-3 rounded-lg bg-green-800/10 px-3 py-2 text-center text-xs font-medium text-green-800">
                      Frete grátis aplicado
                    </div>
                  )}
                  <div className="mb-1 flex justify-between text-sm text-coffee-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="mb-4 flex justify-between text-lg font-bold text-coffee-900">
                    <span>
                      No PIX <span className="text-xs font-normal text-green-700">(10% off)</span>
                    </span>
                    <span className="text-green-800">{formatCurrency(pixTotal)}</span>
                  </div>
                  <button className="w-full rounded-full bg-green-800 py-3.5 text-sm font-bold text-white transition-all hover:bg-green-700 hover:shadow-lg">
                    Finalizar Compra — {formatCurrency(pixTotal)}
                  </button>
                  <div className="mt-3 flex items-center justify-between">
                    <button onClick={() => setOpen(false)} className="text-sm text-coffee-500 hover:text-coffee-700">
                      Continuar Comprando
                    </button>
                    <button onClick={clearCart} className="text-xs text-coffee-400 hover:text-red-600">
                      Limpar carrinho
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
