"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Chapter = {
  year: string;
  place: string;
  quote: string;
  img: { src: string; alt: string };
};

const CHAPTERS: Chapter[] = [
  {
    year: "1897",
    place: "Trentino, Itália",
    quote: "Onde a história começa, antes do oceano.",
    img: { src: "/assets/galeria/3.webp", alt: "Paisagem ao pôr-do-sol — origem italiana" },
  },
  {
    year: "1900s",
    place: "O Atlântico",
    quote: "Uma família atravessa, levando sementes e silêncio.",
    img: { src: "/assets/galeria/peneirar.webp", alt: "Mãos peneirando grãos — travessia" },
  },
  {
    year: "Hoje",
    place: "Alta Mogiana, Brasil",
    quote: "Quatro gerações lendo o solo, o céu, o tempo.",
    img: { src: "/images/farm/drying-yard-tree.webp", alt: "Terreiro de secagem na fazenda" },
  },
  {
    year: "Próximo",
    place: "Espanha",
    quote: "O café volta pra Europa — agora, como nosso.",
    img: { src: "/images/farm/cherries-yellow.webp", alt: "Cerejas amarelas maduras no pé" },
  },
  {
    year: "Adiante",
    place: "Oregon",
    quote: "O sonho do Norte. O café que ainda não plantamos.",
    img: { src: "/images/farm/seedlings-nursery.webp", alt: "Mudas jovens em viveiro" },
  },
];

export default function Linhagem() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let triggerInstance: { kill: () => void } | null = null;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Section is tall enough to give one viewport of scroll per chapter.
      triggerInstance = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${section.offsetHeight - window.innerHeight}`,
        scrub: 0.5,
        onUpdate: (self: { progress: number }) => {
          const idx = Math.min(
            CHAPTERS.length - 1,
            Math.floor(self.progress * CHAPTERS.length)
          );
          setActive(idx);
        },
      });
    })();

    return () => {
      cancelled = true;
      triggerInstance?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cn-linhagem"
      style={{ height: `${CHAPTERS.length * 100}vh` }}
      aria-label="Linhagem Zerbinatti"
    >
      <div className="cn-linhagem-sticky">
        <div className="cn-linhagem-images" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.year + c.place}
              className={`cn-linhagem-frame${i === active ? " is-active" : ""}`}
            >
              <Image
                src={c.img.src}
                alt={c.img.alt}
                fill
                sizes="50vw"
                quality={80}
              />
            </div>
          ))}
        </div>

        <div className="cn-linhagem-texts">
          {CHAPTERS.map((c, i) => (
            <article
              key={c.year + c.place}
              className={`cn-linhagem-text${i === active ? " is-active" : ""}`}
              aria-hidden={i === active ? "false" : "true"}
            >
              <h2 className="cn-linhagem-year">{c.year}</h2>
              <span className="cn-linhagem-place cn-mono">{c.place}</span>
              <p className="cn-linhagem-quote">{c.quote}</p>
            </article>
          ))}
        </div>

        <div className="cn-linhagem-progress cn-mono">
          <span>
            {String(active + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
          </span>
          <span style={{ color: "var(--cn-gold)" }}>LINHAGEM</span>
        </div>
      </div>
    </section>
  );
}
