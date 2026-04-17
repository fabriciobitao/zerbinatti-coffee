"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/config";

type FormState = {
  name: string;
  company: string;
  cnpj: string;
  segment: string;
  volume: string;
  email: string;
  phone: string;
  message: string;
};

const initial: FormState = {
  name: "",
  company: "",
  cnpj: "",
  segment: "cafeteria",
  volume: "10-50kg",
  email: "",
  phone: "",
  message: "",
};

export default function B2BForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `*Novo contato B2B — Zerbinatti Coffee*`,
      ``,
      `*Nome:* ${form.name}`,
      `*Empresa:* ${form.company}`,
      `*CNPJ:* ${form.cnpj || "—"}`,
      `*Segmento:* ${form.segment}`,
      `*Volume estimado:* ${form.volume}/mês`,
      `*E-mail:* ${form.email}`,
      `*Telefone:* ${form.phone}`,
      ``,
      `*Mensagem:*`,
      form.message || "—",
    ].join("\n");

    // Fire-and-forget para o backend
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "b2b",
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          message: form.message,
          metadata: {
            cnpj: form.cnpj || "",
            segment: form.segment,
            volume: form.volume,
          },
        }),
      });
    } catch {
      // Fail silent — WhatsApp abre mesmo assim
    }

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (sent) {
    return (
      <div className="rounded-2xl border border-green-700 bg-green-700/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold text-coffee-900">
          Pedido enviado
        </h3>
        <p className="mt-2 text-coffee-700">
          Abrimos uma conversa no WhatsApp com seu pedido preenchido. Nosso
          comercial responde em até 4 horas úteis.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm(initial);
          }}
          className="mt-4 text-sm text-coffee-600 underline hover:text-coffee-900"
        >
          Enviar outro contato
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-coffee-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Seu nome" required>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </Field>
        <Field label="Empresa" required>
          <input
            required
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </Field>
        <Field label="CNPJ (opcional)">
          <input
            value={form.cnpj}
            onChange={(e) => update("cnpj", e.target.value)}
            placeholder="00.000.000/0000-00"
            className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </Field>
        <Field label="Segmento" required>
          <select
            required
            value={form.segment}
            onChange={(e) => update("segment", e.target.value)}
            className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          >
            <option value="cafeteria">Cafeteria / Coffee shop</option>
            <option value="restaurante">Restaurante / Hotel</option>
            <option value="torrefacao">Torrefação</option>
            <option value="escritorio">Escritório / Coworking</option>
            <option value="varejo">Varejo / Mercado</option>
            <option value="outro">Outro</option>
          </select>
        </Field>
        <Field label="Volume estimado / mês" required>
          <select
            required
            value={form.volume}
            onChange={(e) => update("volume", e.target.value)}
            className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          >
            <option value="ate-10kg">Até 10kg</option>
            <option value="10-50kg">10 a 50kg</option>
            <option value="50-200kg">50 a 200kg</option>
            <option value="200-500kg">200 a 500kg</option>
            <option value="500kg+">Acima de 500kg</option>
          </select>
        </Field>
        <Field label="Telefone / WhatsApp" required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(11) 99999-9999"
            className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </Field>
        <Field label="E-mail corporativo" required fullWidth>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </Field>
        <Field
          label="Conte um pouco sobre o seu projeto (opcional)"
          fullWidth
        >
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Qual o perfil do cliente? Busca blend tradicional, single origin, lote exclusivo?"
            className="w-full resize-y rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-coffee-900 py-3.5 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700 active:scale-[0.97]"
      >
        Enviar pedido — responderemos em até 4h úteis
      </button>
      <p className="mt-3 text-center text-xs text-coffee-600">
        Seu pedido é enviado pelo WhatsApp para agilizar o atendimento.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  fullWidth,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label className={`block ${fullWidth ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-coffee-700">
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </span>
      {children}
    </label>
  );
}
