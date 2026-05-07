"use client";

/**
 * Componente sem UI que dispara a reidratacao do carrinho na montagem.
 * Inserido em layout.tsx para rodar uma vez por sessao do usuario.
 */

import { useEffect } from "react";
import { useCartStore } from "./store";

export function CartHydrator() {
  useEffect(() => {
    void useCartStore.getState().hydrate();
  }, []);

  return null;
}
