import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/client";

/**
 * Renderizador editorial Portable Text (Sanity).
 *
 * Tom: Aesop Quarterly / NYT Magazine.
 * - H2/H3 em Fraunces italic, peso 400, espacamento generoso
 * - Blockquote como pull quote, hairline lateral oliva
 * - Codigo em mono pequeno
 * - Imagens com aspect-ratio preservado, legenda em mono
 * - Links com underline editorial (link-text)
 * - Body em 17px, line-height 1.7, max-width 720px (controlado pelo container pai)
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-normal italic leading-[1.15] text-ink mt-20 mb-8 tracking-[-0.015em]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-[clamp(1.375rem,2.2vw,1.625rem)] font-normal italic leading-[1.2] text-ink mt-14 mb-6 tracking-[-0.01em]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-[17px] leading-[1.7] text-ink-soft mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-12 border-l border-olive pl-8 font-display text-[clamp(1.25rem,2vw,1.5rem)] italic leading-[1.45] text-ink"
        style={{ fontWeight: 400 }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-ink">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-display italic" style={{ fontWeight: 400 }}>
        {children}
      </em>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[14px] bg-bone-soft px-1.5 py-0.5 text-ink">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-olive underline underline-offset-[4px] decoration-1 hover:decoration-2 transition-all"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc pl-6 marker:text-olive [&>li]:font-sans [&>li]:text-[17px] [&>li]:leading-[1.7] [&>li]:text-ink-soft [&>li]:mb-3">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal pl-6 marker:text-olive marker:font-mono marker:text-[14px] [&>li]:font-sans [&>li]:text-[17px] [&>li]:leading-[1.7] [&>li]:text-ink-soft [&>li]:mb-3">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const url = urlForImage(value).width(1440).fit("max").url();
      const alt: string = value.alt ?? "";
      const caption: string | undefined = value.caption;
      return (
        <figure className="my-12 -mx-4 sm:mx-0">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-bone-soft">
            <Image
              src={url}
              alt={alt}
              fill
              sizes="(max-width: 720px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 font-mono text-[12px] uppercase tracking-[0.05em] text-ink-mute">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="my-8 overflow-x-auto bg-ink p-6 text-bone">
        <code className="font-mono text-[13px] leading-[1.6]">
          {value?.code ?? ""}
        </code>
      </pre>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: unknown }) {
  if (!value) return null;
  return (
    <PortableText
      // PortableText eslint-friendly cast — qualquer estrutura PT serve
      value={value as never}
      components={components}
    />
  );
}
