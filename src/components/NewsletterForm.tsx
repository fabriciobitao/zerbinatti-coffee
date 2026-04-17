"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
    } catch {
      // Fail silent — ainda marca como enviado para não bloquear UX
    }
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <p
        className="mt-4 rounded-lg border border-gold-500/30 bg-gold-500/5 px-4 py-3 text-sm text-gold-300"
        role="status"
      >
        ✓ Inscrição recebida. Nosso primeiro envio chega em breve.
      </p>
    );
  }

  return (
    <>
      <label htmlFor="newsletter-email" className="sr-only">
        E-mail para newsletter
      </label>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="flex-1 rounded-lg border border-coffee-800 bg-coffee-900 px-4 py-2.5 text-sm text-coffee-100 outline-none placeholder:text-coffee-400 focus:border-gold-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-coffee-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
        >
          {loading ? "..." : "Assinar"}
        </button>
      </form>
    </>
  );
}
