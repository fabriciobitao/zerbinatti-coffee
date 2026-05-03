"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      if (!res.ok) {
        throw new Error(`status ${res.status}`);
      }
      setSent(true);
    } catch {
      setError(
        "Não conseguimos registrar sua inscrição agora. Tente novamente em instantes ou escreva para contato@zerbinatti.coffee."
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <p
        className="mt-4 border border-olive/30 bg-olive/5 px-4 py-3 text-sm text-bone"
        role="status"
      >
        Inscrição recebida. Nosso primeiro envio chega em breve.
      </p>
    );
  }

  const errorId = "newsletter-error";

  return (
    <>
      <label htmlFor="newsletter-email" className="sr-only">
        E-mail para newsletter
      </label>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2" noValidate>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="seu@email.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`flex-1 border bg-ink-soft px-4 py-2.5 text-sm text-bone outline-none placeholder:text-bone-soft focus:border-olive ${
            error ? "border-red-400" : "border-line-dark"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-olive px-4 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep disabled:opacity-60"
        >
          {loading ? "..." : "Assinar"}
        </button>
      </form>
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="assertive"
          className="mt-3 border border-red-400/40 bg-red-400/5 px-4 py-3 text-sm text-bone"
        >
          {error}
        </p>
      )}
    </>
  );
}
