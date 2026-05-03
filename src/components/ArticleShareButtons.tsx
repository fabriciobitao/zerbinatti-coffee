"use client";

import { useState } from "react";

type Props = {
  url: string;
  title: string;
};

/**
 * Botoes de compartilhamento editoriais — WhatsApp, Twitter/X, copiar link.
 * Sem libs externas, sem icon packs (SVGs inline).
 */
export default function ArticleShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const wppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — ${url}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — falha de clipboard nao precisa exibir erro
    }
  }

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
        Compartilhar
      </span>
      <a
        href={wppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute hover:text-olive transition-colors"
        aria-label="Compartilhar no WhatsApp"
      >
        Whatsapp
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute hover:text-olive transition-colors"
        aria-label="Compartilhar no Twitter/X"
      >
        Twitter
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute hover:text-olive transition-colors"
        aria-label="Copiar link"
      >
        {copied ? "Copiado" : "Copiar link"}
      </button>
    </div>
  );
}
