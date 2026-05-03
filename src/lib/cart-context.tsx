"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { z } from "zod";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
}

// Schema mínimo de validação — protege contra localStorage corrompido/manipulado.
// Tudo que não bater é descartado silenciosamente para não quebrar a UI.
const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  weight: z.string().min(1),
});
const CartArraySchema = z.array(CartItemSchema);

interface Toast {
  id: number;
  message: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  pixTotal: number;
  toasts: Toast[];
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "zerbinatti-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    const result = CartArraySchema.safeParse(parsed);
    if (!result.success) {
      // Cart corrompido/incompatível — descarta e segue. Não quebra a UI.
      console.warn("[cart] localStorage payload inválido — descartado", result.error.issues);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      return [];
    }
    return result.data;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    showToast(`${newItem.name} adicionado ao carrinho`);
  }, [showToast]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const pixTotal = useMemo(() => total * 0.9, [total]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, itemCount, total, pixTotal, toasts }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, total, pixTotal, toasts]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// Toast display component
export function CartToasts() {
  const { toasts } = useCart();

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-enter mb-2 flex items-center gap-3 bg-ink px-5 py-3 shadow-xl"
          style={{ borderRadius: "2px" }}
          role="status"
        >
          <svg className="h-5 w-5 text-olive" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-sm font-medium text-bone">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
