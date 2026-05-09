"use client";

// Cloudflare Turnstile invisible widget.
// Carrega script via next/script, renderiza widget invisible apos onLoad,
// e expoe token via callback `onToken`.

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
      "timeout-callback"?: () => void;
      execution?: "render" | "execute";
      appearance?: "always" | "execute" | "interaction-only";
      size?: "normal" | "compact" | "invisible";
      retry?: "auto" | "never";
      "refresh-expired"?: "auto" | "manual" | "never";
    },
  ) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type Props = {
  siteKey?: string;
  onToken: (token: string) => void;
  onError?: () => void;
};

export default function TurnstileWidget({ siteKey, onToken, onError }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const onTokenRef = useRef(onToken);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onTokenRef.current = onToken;
    onErrorRef.current = onError;
  }, [onToken, onError]);

  const key = siteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!scriptReady || !key || !containerRef.current) return;
    const ts = window.turnstile;
    if (!ts) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = ts.render(containerRef.current, {
      sitekey: key,
      size: "invisible",
      appearance: "interaction-only",
      retry: "auto",
      "refresh-expired": "auto",
      callback: (token: string) => {
        onTokenRef.current(token);
      },
      "error-callback": () => {
        onErrorRef.current?.();
      },
      "expired-callback": () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    });

    return () => {
      const id = widgetIdRef.current;
      if (id && window.turnstile) {
        try {
          window.turnstile.remove(id);
        } catch {
          // ignore
        }
      }
      widgetIdRef.current = null;
    };
  }, [scriptReady, key]);

  if (!key) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onLoad={() => setScriptReady(true)}
      />
      <div ref={containerRef} aria-hidden="true" />
    </>
  );
}

// Helper hook: aguarda token assincrono (usado em forms onSubmit).
export function useTurnstileToken() {
  const [token, setToken] = useState<string | null>(null);
  return { token, setToken };
}
