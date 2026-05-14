"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FRAMES = [
  { src: "/assets/galeria/3.webp", alt: "Pôr-do-sol sobre o cafezal" },
  { src: "/assets/galeria/peneirar.webp", alt: "Mão peneirando grãos de café" },
  { src: "/images/farm/drying-yard-tree.webp", alt: "Terreiro de secagem ao ar livre" },
  { src: "/images/farm/cherries-yellow.webp", alt: "Cerejas amarelas de café no pé" },
  { src: "/images/farm/seedlings-nursery.webp", alt: "Mudas jovens no viveiro" },
];

const CYCLE_MS = 8000;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % FRAMES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="cn-hero" aria-label="Apresentação Zerbinatti">
      <div className="cn-hero-stage" aria-hidden="true">
        {FRAMES.map((f, i) => (
          <div
            key={f.src}
            className={`cn-hero-frame${i === active ? " is-active" : ""}`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={85}
            />
          </div>
        ))}
        <div className="cn-hero-vignette" />
      </div>

      <div className="cn-hero-content">
        <div className="cn-hero-wordmark cn-mono">ZERBINATTI · DAL 1897</div>

        <div className="cn-hero-title-wrap">
          <h1 className="cn-hero-title">Dall&apos;Italia al Brasile</h1>
          <p className="cn-hero-sub">
            Quatro gerações. Três continentes. Uma origem.
          </p>
        </div>

        <div className="cn-hero-scroll" aria-hidden="true">
          <span className="cn-line" />
          <span className="cn-mono">scroll</span>
        </div>
      </div>
    </section>
  );
}
