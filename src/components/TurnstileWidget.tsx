"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

/**
 * TurnstileWidget — wrapper invisível em torno do @marsidev/react-turnstile.
 *
 * Comportamento:
 * - Se NEXT_PUBLIC_TURNSTILE_SITE_KEY ausente, não renderiza nada e o
 *   onToken é chamado imediatamente com null. O server-side verify também
 *   pula validação nesse cenário (dev mode).
 * - Em produção, renderiza widget invisível ("size: invisible") que entrega
 *   o token via callback. Token é refresh-ado automaticamente.
 *
 * Uso típico:
 *
 *   const tokenRef = useRef<string | null>(null);
 *   <TurnstileWidget onToken={(t) => (tokenRef.current = t)} />
 *
 *   // No submit:
 *   body: JSON.stringify({ ...payload, turnstileToken: tokenRef.current })
 */
export interface TurnstileWidgetProps {
  /** Callback invocado quando o token é gerado/atualizado/expirado. */
  onToken: (token: string | null) => void;
  /** Tema visual (não tem efeito no modo invisible, mas mantém consistência). */
  theme?: "light" | "dark" | "auto";
  /** Action opcional para analytics na Cloudflare. */
  action?: string;
}

// useSyncExternalStore com snapshot estático garante hidratação consistente
// e evita "setState in effect" do react-hooks lint.
const subscribeNoop = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

export function TurnstileWidget({
  onToken,
  theme = "auto",
  action,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  const notifiedNullRef = useRef(false);

  // Sem site key: notifica null uma única vez para o caller saber que
  // não precisa esperar token (dev mode).
  useEffect(() => {
    if (!siteKey && mounted && !notifiedNullRef.current) {
      notifiedNullRef.current = true;
      onToken(null);
    }
  }, [siteKey, mounted, onToken]);

  const handleSuccess = useCallback(
    (token: string) => onToken(token),
    [onToken],
  );
  const handleExpire = useCallback(() => onToken(null), [onToken]);
  const handleError = useCallback(() => onToken(null), [onToken]);

  if (!siteKey || !mounted) return null;

  return (
    <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={handleSuccess}
        onExpire={handleExpire}
        onError={handleError}
        options={{
          size: "invisible",
          theme,
          action,
          retry: "auto",
          refreshExpired: "auto",
        }}
      />
    </div>
  );
}
