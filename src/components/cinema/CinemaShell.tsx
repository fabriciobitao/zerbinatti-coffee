"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * CinemaShell — wraps the cinema route with Lenis smooth scroll + GSAP
 * ScrollTrigger setup. Respects prefers-reduced-motion (no Lenis, no scrub).
 * All animation lifecycle is owned here; child sections opt-in via data attrs
 * or by registering their own ScrollTriggers (they get refresh on resize).
 */
export default function CinemaShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: { raf: (t: number) => void; destroy: () => void; on?: (ev: string, cb: () => void) => void } | null = null;
    let rafId = 0;
    let cleanupGsap: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      if (!prefersReduced) {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        }) as unknown as typeof lenis;

        // Drive Lenis via GSAP ticker for sync with ScrollTrigger
        const tickerCb = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger after Lenis init
        ScrollTrigger.refresh();

        cleanupGsap = () => {
          gsap.ticker.remove(tickerCb);
        };
      }

      // ----- Generic fade-in observer (.cn-fade-in -> .is-visible) -----
      const fadeEls = rootRef.current?.querySelectorAll<HTMLElement>(".cn-fade-in") ?? [];
      const triggers: Array<{ kill: () => void }> = [];
      fadeEls.forEach((el) => {
        const t = ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          onEnter: () => el.classList.add("is-visible"),
          onLeaveBack: () => el.classList.remove("is-visible"),
        });
        triggers.push(t);
      });

      // ----- Notas list / chips staggered reveal -----
      const notaItems = rootRef.current?.querySelectorAll<HTMLElement>(".cn-notas-list li") ?? [];
      notaItems.forEach((el, i) => {
        const t = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            setTimeout(() => el.classList.add("is-revealed"), i * 100);
          },
        });
        triggers.push(t);
      });
      const chipEls = rootRef.current?.querySelectorAll<HTMLElement>(".cn-notas-chip") ?? [];
      chipEls.forEach((el, i) => {
        const t = ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            setTimeout(() => el.classList.add("is-revealed"), i * 100);
          },
        });
        triggers.push(t);
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      cleanupGsap = (() => {
        const prev = cleanupGsap;
        return () => {
          prev?.();
          triggers.forEach((t) => t.kill());
          window.removeEventListener("resize", onResize);
        };
      })();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cleanupGsap?.();
      lenis?.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className="cinema-root">
      <a href="#cinema-main" className="cn-skip">
        Pular para o conteúdo
      </a>
      <main id="cinema-main">{children}</main>
    </div>
  );
}
