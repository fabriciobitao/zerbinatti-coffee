"use client";

/**
 * Zustand store do carrinho Shopify.
 * - Persiste apenas o cart id em localStorage (key: zrb-cart-id).
 * - Reidrata na montagem via CartHydrator -> hydrate().
 * - Mutations chamam Server Actions (./actions) e abrem o drawer
 *   otimisticamente em addItem para feedback imediato.
 */

import { create } from "zustand";
import type { Cart } from "./types";
import {
  addToCartAction,
  getCartAction,
  removeLineAction,
  updateLineAction,
} from "./actions";
import { pushEcommerce } from "@/lib/analytics/dataLayer";

const CART_ID_KEY = "zrb-cart-id";

function readPersistedCartId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CART_ID_KEY);
  } catch {
    return null;
  }
}

function persistCartId(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id) {
      window.localStorage.setItem(CART_ID_KEY, id);
    } else {
      window.localStorage.removeItem(CART_ID_KEY);
    }
  } catch {
    /* ignore quota / privacy mode errors */
  }
}

type CartStore = {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;

  openCart(): void;
  closeCart(): void;
  setCart(cart: Cart | null): void;

  addItem(variantId: string, quantity?: number): Promise<void>;
  updateLine(lineId: string, quantity: number): Promise<void>;
  removeLine(lineId: string): Promise<void>;
  hydrate(): Promise<void>;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  isOpen: false,
  isLoading: false,
  error: null,
  hasHydrated: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  setCart: (cart) => {
    persistCartId(cart?.id ?? null);
    set({ cart });
  },

  addItem: async (variantId, quantity = 1) => {
    // Otimista: abre o drawer antes da mutation resolver
    set({ isOpen: true, isLoading: true, error: null });
    const currentId = get().cart?.id ?? null;

    try {
      const next = await addToCartAction(currentId, variantId, quantity);
      persistCartId(next.id);
      set({ cart: next, isLoading: false });

      const line = next.lines.find((l) => l.merchandise.variantId === variantId);
      if (line) {
        const price = parseFloat(line.merchandise.price.amount);
        pushEcommerce("add_to_cart", {
          currency: line.merchandise.price.currencyCode,
          value: price * quantity,
          items: [
            {
              item_id: variantId,
              item_name: line.merchandise.product.title,
              item_brand: "Zerbinatti",
              item_variant: line.merchandise.title,
              price,
              quantity,
            },
          ],
        });
      }
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "Erro ao adicionar item",
      });
    }
  },

  updateLine: async (lineId, quantity) => {
    const cartId = get().cart?.id;
    if (!cartId) return;

    set({ isLoading: true, error: null });
    try {
      const next = await updateLineAction(cartId, lineId, quantity);
      persistCartId(next.id);
      set({ cart: next, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "Erro ao atualizar item",
      });
    }
  },

  removeLine: async (lineId) => {
    const cartId = get().cart?.id;
    if (!cartId) return;

    const removedLine = get().cart?.lines.find((l) => l.id === lineId);

    set({ isLoading: true, error: null });
    try {
      const next = await removeLineAction(cartId, lineId);
      persistCartId(next.id);
      set({ cart: next, isLoading: false });

      if (removedLine) {
        const price = parseFloat(removedLine.merchandise.price.amount);
        pushEcommerce("remove_from_cart", {
          currency: removedLine.merchandise.price.currencyCode,
          value: price * removedLine.quantity,
          items: [
            {
              item_id: removedLine.merchandise.variantId,
              item_name: removedLine.merchandise.product.title,
              item_brand: "Zerbinatti",
              item_variant: removedLine.merchandise.title,
              price,
              quantity: removedLine.quantity,
            },
          ],
        });
      }
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "Erro ao remover item",
      });
    }
  },

  hydrate: async () => {
    if (get().hasHydrated) return;
    const persistedId = readPersistedCartId();

    if (!persistedId) {
      set({ hasHydrated: true });
      return;
    }

    try {
      const cart = await getCartAction(persistedId);
      if (!cart) {
        // Cart expirado no Shopify -> limpa o id local
        persistCartId(null);
        set({ cart: null, hasHydrated: true });
        return;
      }
      set({ cart, hasHydrated: true });
    } catch (err) {
      set({
        hasHydrated: true,
        error:
          err instanceof Error ? err.message : "Erro ao reidratar carrinho",
      });
    }
  },
}));
