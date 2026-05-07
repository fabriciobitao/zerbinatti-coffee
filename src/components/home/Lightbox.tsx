'use client';

// Lightbox — Client Component controlado por <Galeria />.
// Gerencia foco por teclado (←/→/Esc), cliques em overlay/botoes, e bloqueia
// scroll do body enquanto aberto. Estrutura DOM identica a do
// public/novo-layout/index.html (#lightbox + .lb-close/.lb-prev/.lb-next/
// .lb-counter/.lb-figure) para casar com o CSS de novo-layout.css.

import { useEffect } from 'react';

export type LightboxItem = {
  src: string;
  caption: string;
  alt: string;
};

type LightboxProps = {
  items: LightboxItem[];
  index: number; // -1 quando fechado
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const open = index >= 0 && index < items.length;
  const current = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    };

    // Bloqueia scroll de fundo enquanto modal esta ativo
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open || !current) return null;

  // Clique no overlay (fora dos botoes/figura) fecha — usamos role=dialog
  // sobre o container e onClick com checagem de target = currentTarget.
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="lightbox"
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galeria"
      onClick={onOverlayClick}
    >
      <button type="button" className="lb-close" aria-label="Fechar" onClick={onClose}>
        ×
      </button>
      <button type="button" className="lb-prev" aria-label="Anterior" onClick={onPrev}>
        ‹
      </button>
      <button type="button" className="lb-next" aria-label="Próxima" onClick={onNext}>
        ›
      </button>
      <div className="lb-counter">
        <span id="lbCurrent">{index + 1}</span> / <span id="lbTotal">{items.length}</span>
      </div>
      <figure className="lb-figure">
        <img id="lbImg" src={current.src} alt={current.alt} />
        <figcaption id="lbCaption">{current.caption}</figcaption>
      </figure>
    </div>
  );
}

export default Lightbox;
