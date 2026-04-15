"use client";

import { useState } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Placeholder items for demo
const demoItems: CartItem[] = [];

export function CartButton() {
  const [open, setOpen] = useState(false);
  const [items] = useState<CartItem[]>(demoItems);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Cart button */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2 rounded-full border border-coffee-700 px-4 py-2 text-sm text-coffee-200 transition-all hover:border-gold-500 hover:text-gold-400"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span>Carrinho</span>
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-coffee-950">
            {itemCount}
          </span>
        )}
      </button>

      {/* Drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-coffee-50 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-coffee-200 px-6 py-4">
              <h3 className="font-serif text-xl font-bold text-coffee-900">
                Seu Carrinho
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-coffee-500 hover:text-coffee-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex h-full flex-col">
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
                  <svg
                    className="h-16 w-16 text-coffee-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium text-coffee-700">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-sm text-coffee-500">
                    Explore nossos cafés e encontre o seu favorito.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-4 rounded-full bg-coffee-900 px-6 py-3 text-sm font-semibold text-coffee-50 hover:bg-coffee-800"
                  >
                    Explorar Cafés
                  </button>
                </div>
              ) : (
                <>
                  {/* Items */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-4 border-b border-coffee-200 py-4"
                      >
                        <div
                          className="h-20 w-20 shrink-0 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-coffee-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-coffee-500">
                            Qtd: {item.quantity}
                          </p>
                          <p className="mt-1 font-bold text-coffee-900">
                            {(item.price * item.quantity).toLocaleString(
                              "pt-BR",
                              { style: "currency", currency: "BRL" }
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-coffee-200 px-6 py-4">
                    <div className="mb-2 flex justify-between text-sm text-coffee-500">
                      <span>Subtotal</span>
                      <span>
                        {total.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                    <div className="mb-4 flex justify-between font-semibold text-coffee-900">
                      <span>
                        No PIX{" "}
                        <span className="text-xs font-normal text-green-700">
                          (10% off)
                        </span>
                      </span>
                      <span className="text-green-800">
                        {(total * 0.9).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                    <button className="w-full rounded-full bg-green-800 py-3.5 text-sm font-bold text-white transition-all hover:bg-green-700">
                      Finalizar Compra
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-2 w-full py-2 text-sm text-coffee-500 hover:text-coffee-700"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
