"use client";

import { useCallback, useRef, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/config";
import { TurnstileWidget } from "./TurnstileWidget";
import { track } from "@/lib/analytics/track";

type Volume =
  | ""
  | "5-15 pessoas"
  | "15-40 pessoas"
  | "40-120 pessoas"
  | "120+ pessoas";

type FieldErrors = Partial<{
  nome: string;
  empresa: string;
  cnpj: string;
  email: string;
  telefone: string;
  volume: string;
}>;

function maskCNPJ(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function maskPhone(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function isValidCNPJ(cnpj: string) {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  const calc = (base: string, weights: number[]) => {
    const sum = base
      .split("")
      .reduce((acc, n, i) => acc + Number(n) * weights[i], 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calc(digits.slice(0, 12), w1);
  const d2 = calc(digits.slice(0, 12) + d1, w2);
  return digits === digits.slice(0, 12) + String(d1) + String(d2);
}

export default function B2BForm() {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [volume, setVolume] = useState<Volume>("");
  const [mensagem, setMensagem] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const turnstileTokenRef = useRef<string | null>(null);
  const honeypotRef = useRef("");
  const handleToken = useCallback((t: string | null) => {
    turnstileTokenRef.current = t;
  }, []);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (nome.trim().length < 2) e.nome = "Informe seu nome completo.";
    if (empresa.trim().length < 2) e.empresa = "Informe o nome da empresa.";
    if (!isValidCNPJ(cnpj)) e.cnpj = "CNPJ inválido. Confira os números.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Esse e-mail parece incompleto.";
    if (telefone.replace(/\D/g, "").length < 10)
      e.telefone = "Telefone com DDD, por favor.";
    if (!volume) e.volume = "Selecione a faixa de equipe.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setBusy(true);

    // Registra lead server-side (Resend + rate limit + Turnstile).
    // Falhar aqui não bloqueia o WhatsApp — degrada gracioso.
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "b2b",
          name: nome,
          company: empresa,
          cnpj: cnpj.replace(/\D/g, ""),
          email,
          phone: telefone,
          message: mensagem
            ? `${mensagem}\n\nVolume: ${volume}`
            : `Volume: ${volume}`,
          _hp: honeypotRef.current,
          turnstileToken: turnstileTokenRef.current ?? undefined,
        }),
      });
    } catch {
      // silencioso — segue pro WhatsApp
    }

    // Tracking sem PII — apenas categoria/volume
    track("b2b_form_submit", { volume });
    track("whatsapp_click", { source: "b2b_form" });

    const msg = `Olá! Pedido de proposta B2B Zerbinatti:\n\n• Nome: ${nome}\n• Empresa: ${empresa}\n• CNPJ: ${cnpj}\n• E-mail: ${email}\n• Telefone: ${telefone}\n• Volume estimado: ${volume}${
      mensagem ? `\n• Mensagem: ${mensagem}` : ""
    }`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setBusy(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[2px] border border-ink-mute/40 bg-ink-soft p-8 sm:p-12"
      >
        <p
          className="font-mono text-[11px] font-medium uppercase text-olive"
          style={{ letterSpacing: "0.18em" }}
        >
          PEDIDO RECEBIDO
        </p>
        <h3
          className="mt-6 font-display text-[28px] text-bone"
          style={{ fontWeight: 400, lineHeight: 1.15 }}
        >
          A casa retorna em{" "}
          <em
            className="font-display italic"
            style={{ fontWeight: 400 }}
          >
            24h úteis
          </em>
          .
        </h3>
        <p className="mt-6 text-[15px] leading-[1.6] text-bone-soft">
          Um responsável comercial vai analisar o porte e o consumo informados,
          montar a proposta e enviar por e-mail. Sem ligação automática, sem
          pressão.
        </p>
        <p
          className="mt-6 font-mono text-[11px] uppercase text-[var(--ink-mute-on-dark)]"
          style={{ letterSpacing: "0.18em" }}
        >
          RETORNO ATÉ 24H ÚTEIS · SEM AUTOMAÇÃO COMERCIAL
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full bg-transparent border-b border-ink-mute py-3 text-[15px] text-bone placeholder:text-[var(--ink-mute-on-dark)] focus:border-olive focus:outline-none transition-colors";
  const labelClass =
    "block font-mono text-[11px] font-medium uppercase text-bone-soft pb-2";
  const errClass =
    "mt-2 text-[13px] text-[#E8A87C] flex items-center gap-2";
  const errIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  );

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-busy={busy}
      className="rounded-[2px] border border-ink-mute/40 bg-ink-soft p-6 sm:p-8 lg:p-12"
    >
      <TurnstileWidget onToken={handleToken} action="b2b" />
      {/* Honeypot anti-bot — invisível para humanos */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        onChange={(e) => (honeypotRef.current = e.target.value)}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <div className="space-y-6">
        <div>
          <label htmlFor="b2b-nome" className={labelClass}>
            Nome <span className="text-olive">*</span>
          </label>
          <input
            id="b2b-nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "err-nome" : undefined}
            className={fieldClass}
          />
          {errors.nome && (
            <p id="err-nome" role="alert" className={errClass}>
              {errIcon} {errors.nome}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="b2b-empresa" className={labelClass}>
            Empresa <span className="text-olive">*</span>
          </label>
          <input
            id="b2b-empresa"
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.empresa}
            aria-describedby={errors.empresa ? "err-empresa" : undefined}
            className={fieldClass}
          />
          {errors.empresa && (
            <p id="err-empresa" role="alert" className={errClass}>
              {errIcon} {errors.empresa}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="b2b-cnpj" className={labelClass}>
            CNPJ <span className="text-olive">*</span>
          </label>
          <input
            id="b2b-cnpj"
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(maskCNPJ(e.target.value))}
            aria-required="true"
            aria-invalid={!!errors.cnpj}
            aria-describedby="b2b-cnpj-help err-cnpj"
            placeholder="00.000.000/0000-00"
            className={fieldClass}
          />
          <p id="b2b-cnpj-help" className="sr-only">
            Formato esperado: 00.000.000/0000-00
          </p>
          {errors.cnpj && (
            <p id="err-cnpj" role="alert" className={errClass}>
              {errIcon} {errors.cnpj}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="b2b-email" className={labelClass}>
              E-mail <span className="text-olive">*</span>
            </label>
            <input
              id="b2b-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              className={fieldClass}
            />
            {errors.email && (
              <p id="err-email" role="alert" className={errClass}>
                {errIcon} {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="b2b-tel" className={labelClass}>
              Telefone <span className="text-olive">*</span>
            </label>
            <input
              id="b2b-tel"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(maskPhone(e.target.value))}
              aria-required="true"
              aria-invalid={!!errors.telefone}
              aria-describedby="b2b-tel-help err-tel"
              placeholder="(00) 00000-0000"
              className={fieldClass}
            />
            <p id="b2b-tel-help" className="sr-only">
              Formato esperado: (00) 00000-0000
            </p>
            {errors.telefone && (
              <p id="err-tel" role="alert" className={errClass}>
                {errIcon} {errors.telefone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="b2b-vol" className={labelClass}>
            Volume estimado <span className="text-olive">*</span>
          </label>
          <select
            id="b2b-vol"
            value={volume}
            onChange={(e) => setVolume(e.target.value as Volume)}
            aria-required="true"
            aria-invalid={!!errors.volume}
            aria-describedby={errors.volume ? "err-vol" : undefined}
            className={`${fieldClass} appearance-none cursor-pointer`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A5237' stroke-width='1.5'><path d='M6 9l6 6 6-6'/></svg>\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 4px center",
            }}
          >
            <option value="" className="bg-ink">
              Selecione a faixa de equipe
            </option>
            <option value="5-15 pessoas" className="bg-ink">
              5–15 pessoas
            </option>
            <option value="15-40 pessoas" className="bg-ink">
              15–40 pessoas
            </option>
            <option value="40-120 pessoas" className="bg-ink">
              40–120 pessoas
            </option>
            <option value="120+ pessoas" className="bg-ink">
              120+ pessoas
            </option>
          </select>
          {errors.volume && (
            <p id="err-vol" role="alert" className={errClass}>
              {errIcon} {errors.volume}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="b2b-msg" className={labelClass}>
            Mensagem (opcional)
          </label>
          <textarea
            id="b2b-msg"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value.slice(0, 500))}
            maxLength={500}
            className="w-full bg-transparent border border-ink-mute p-3 text-[15px] text-bone placeholder:text-[var(--ink-mute-on-dark)] focus:border-olive focus:outline-none transition-colors min-h-[96px]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="mt-8 w-full bg-olive px-8 py-4 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ borderRadius: "2px" }}
      >
        {busy ? "Enviando..." : "Enviar pedido de proposta"}
      </button>

      <p className="mt-4 text-[12px] leading-[1.5] text-[var(--ink-mute-on-dark)]">
        Seus dados são usados apenas para retorno comercial. Não compartilhamos
        com terceiros.
      </p>
    </form>
  );
}
