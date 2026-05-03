"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getConsent, setConsent, CONSENT_EVENT } from "@/lib/consent";

/**
 * Banner LGPD editorial sobrio.
 *
 * Comportamento:
 *  - Aparece em primeira visita (getConsent() === null).
 *  - Some apos escolha; reaparece quando `consent-change` traz null (clearConsent).
 *  - Nao aparece em /studio (Sanity) nem em /api/* (rotas de API).
 *  - z-50 (acima do StickySubscriptionCTA z-40).
 *
 * Modal de personalizacao:
 *  - Foco inicial no botao primario; Esc fecha; focus trap basico.
 *  - 3 toggles: Necessarios (disabled+on), Analytics, Marketing.
 *  - Salvar dispara setConsent (que emite evento `consent-change`).
 */
export default function CookieConsent() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const acceptBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalSaveBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descId = useId();
  const modalTitleId = useId();

  // Rotas que devem ocultar o banner
  const hiddenRoute =
    pathname?.startsWith("/studio") || pathname?.startsWith("/api");

  // Hidrata visibilidade no mount + escuta mudancas (clearConsent re-mostra)
  useEffect(() => {
    if (hiddenRoute) {
      setShow(false);
      return;
    }
    setShow(getConsent() === null);
    const handler = () => setShow(getConsent() === null);
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, [hiddenRoute]);

  // Foco inicial no botao primario quando o banner aparece
  useEffect(() => {
    if (show && !modalOpen) {
      const t = window.setTimeout(() => acceptBtnRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [show, modalOpen]);

  // Modal: ESC fecha + focus trap basico + foco inicial
  useEffect(() => {
    if (!modalOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => modalSaveBtnRef.current?.focus(), 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setModalOpen(false);
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables).filter(
          (el) => !el.hasAttribute("disabled")
        );
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
      lastFocusedRef.current?.focus?.();
    };
  }, [modalOpen]);

  const handleAcceptAll = useCallback(() => {
    setConsent({ analytics: true, marketing: true });
    setShow(false);
    setModalOpen(false);
  }, []);

  const handleNecessaryOnly = useCallback(() => {
    setConsent({ analytics: false, marketing: false });
    setShow(false);
    setModalOpen(false);
  }, []);

  const handleSavePrefs = useCallback(() => {
    setConsent({ analytics, marketing });
    setShow(false);
    setModalOpen(false);
  }, [analytics, marketing]);

  const handleOpenModal = useCallback(() => {
    // Sincroniza estado do modal com prefs atuais (ou false default)
    const cur = getConsent();
    setAnalytics(cur?.analytics ?? false);
    setMarketing(cur?.marketing ?? false);
    setModalOpen(true);
  }, []);

  if (hiddenRoute || !show) return null;

  return (
    <>
      <div
        role="region"
        aria-label="Aviso de cookies"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bone py-6 px-6 md:px-8"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-[60ch]">
            <h2
              id={titleId}
              className="font-mono text-[11px] font-medium uppercase text-olive"
              style={{ letterSpacing: "0.18em" }}
            >
              Cookies
            </h2>
            <p
              id={descId}
              className="mt-2 text-[14px] leading-[1.55] text-ink-soft"
            >
              Usamos cookies para entender o uso do site e melhorar o
              conteúdo. Você pode aceitar todos ou apenas os necessários.
            </p>
            <button
              type="button"
              onClick={handleOpenModal}
              className="mt-3 font-mono text-[11px] uppercase text-ink-mute underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
              style={{ letterSpacing: "0.14em" }}
            >
              Personalizar
            </button>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5">
            <button
              type="button"
              onClick={handleNecessaryOnly}
              className="text-[14px] font-medium text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
            >
              Apenas necessários
            </button>
            <button
              ref={acceptBtnRef}
              type="button"
              onClick={handleAcceptAll}
              className="bg-olive px-7 py-3 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
              style={{ borderRadius: "2px" }}
            >
              Aceitar todos
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center"
        >
          <div
            ref={modalRef}
            className="w-full max-w-[520px] bg-bone p-7 sm:p-9"
            style={{ borderRadius: "2px" }}
          >
            <h3
              id={modalTitleId}
              className="font-display text-[24px] text-ink"
              style={{ fontWeight: 400, lineHeight: 1.2 }}
            >
              Preferências de cookies
            </h3>
            <p className="mt-3 text-[14px] leading-[1.55] text-ink-soft">
              Os cookies necessários mantêm o site funcionando. Os demais ajudam
              a melhorar conteúdo e ofertas — você decide.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <ToggleRow
                label="Necessários"
                description="Sessão, preferências de cookies, segurança. Sempre ativo."
                checked
                disabled
                onChange={() => {}}
              />
              <ToggleRow
                label="Analytics"
                description="Métricas anônimas de navegação para entender o que funciona (Google Analytics)."
                checked={analytics}
                onChange={setAnalytics}
              />
              <ToggleRow
                label="Marketing"
                description="Mensuração de campanhas e remarketing (Meta Pixel)."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[14px] font-medium text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
              >
                Cancelar
              </button>
              <button
                ref={modalSaveBtnRef}
                type="button"
                onClick={handleSavePrefs}
                className="bg-olive px-7 py-3 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
                style={{ borderRadius: "2px" }}
              >
                Salvar preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 border border-line bg-bone-soft p-4">
      <div className="flex-1">
        <label
          htmlFor={id}
          className={`block text-[14px] font-medium ${
            disabled ? "text-ink-mute" : "text-ink"
          }`}
        >
          {label}
        </label>
        <p className="mt-1 text-[12px] leading-[1.5] text-ink-mute">
          {description}
        </p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-olive" : "bg-ink-mute/40"
        } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 transform rounded-full bg-bone transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
