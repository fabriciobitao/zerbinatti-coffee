'use client';

// Ilha cliente do hero. Trata apenas as interacoes JS:
//   1. Adiciona .in nas .reveal do hero logo apos mount (above-the-fold,
//      mesma logica de initRevealObserver -> setTimeout 80ms no novo-layout).
//   2. Atualiza opacidade do .scroll-indicator conforme o usuario rola
//      (some/encolhe ao sair do hero).
// Animacoes puramente CSS (NAO precisam de JS aqui):
//   - kenburns (.hero-bg) — animation: kenburns 18s ease-out infinite alternate
//   - steam (.hero-steam .plume) — animation: steam ...
//   - pulse (.hero-badge .dot) — animation: pulse 2.5s ...
//   - scrollLine (.scroll-indicator .line) — animation: scrollLine 2.5s ...
//   - reveal (.reveal -> .reveal.in) — transition em opacity + transform

import { useEffect } from 'react';

export function HeroMotion() {
  useEffect(() => {
    // 1) Reveal-on-mount: hero esta sempre visivel, entao ativamos imediatamente.
    const revealTimer = window.setTimeout(() => {
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;
      heroSection.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.classList.add('in');
      });
    }, 80);

    // 2) Scroll indicator fade — encolhe e some conforme rola para fora do hero.
    const indicator = document.getElementById('heroScrollIndicator');
    let rafId: number | null = null;

    const updateIndicator = () => {
      rafId = null;
      if (!indicator) return;
      const scrolled = window.scrollY;
      const fadeRange = 240;
      const opacity = Math.max(0, 1 - scrolled / fadeRange);
      indicator.style.opacity = String(opacity);
      indicator.style.pointerEvents = opacity < 0.05 ? 'none' : '';
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateIndicator);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateIndicator();

    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}

export default HeroMotion;
