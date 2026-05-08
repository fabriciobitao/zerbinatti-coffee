'use client';

// Observer global que ativa as animacoes scroll-driven do novo-layout.
// Espelha initRevealObserver() do public/novo-layout/index.html:
//
//   .reveal              -> adiciona .in    (fade-in + translateY)
//   .feature             -> adiciona .in-view (preenche barras sensoriais)
//   .cupping             -> adiciona .in-view (anima radar SCA)
//   .g-item              -> adiciona .in-view (galeria)
//
// Sem esse observer, todos os elementos com classe .reveal ficam em opacity:0
// permanente — fica tudo invisivel abaixo do hero.

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => {
      el.classList.add('in');
      if (el.classList.contains('feature')) el.classList.add('in-view');
      if (el.classList.contains('cupping')) el.classList.add('in-view');
      if (el.classList.contains('g-item')) el.classList.add('in-view');
    };

    const pending = new Set<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          pending.delete(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );

    const targets = document.querySelectorAll<HTMLElement>(
      '.reveal, .feature, .cupping, .g-item',
    );

    const vh = window.innerHeight;
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        reveal(el);
      } else {
        pending.add(el);
        io.observe(el);
      }
    });

    // Fallback: alguns engines (puppeteer rapido, mobile rage-scroll) nao
    // disparam IO em scroll rapido. Listener puro garante que tudo que
    // entrou no viewport recebe .in mesmo se IO falhou.
    const checkPending = () => {
      if (pending.size === 0) return;
      const h = window.innerHeight;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < h && r.bottom > 0) {
          reveal(el);
          io.unobserve(el);
          pending.delete(el);
        }
      });
      if (pending.size === 0) {
        window.removeEventListener('scroll', checkPending);
      }
    };
    window.addEventListener('scroll', checkPending, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', checkPending);
    };
  }, []);

  return null;
}

export default RevealObserver;
