import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
};

/**
 * Breadcrumb editorial: mono 11px UPPERCASE, separador " · ", ultimo item olive.
 * Padrao 0.8 da UI-SPEC-INTERNAS. Inclui JSON-LD BreadcrumbList automatico.
 */
export default function Breadcrumb({ items, variant = "light" }: Props) {
  const baseColor =
    variant === "dark"
      ? "text-[var(--ink-mute-on-dark)]"
      : "text-ink-mute";
  const linkHover =
    variant === "dark" ? "hover:text-bone" : "hover:text-ink";

  const schema = breadcrumbSchema(
    items.map((it) => ({
      name: it.label,
      url: it.href
        ? `${siteConfig.url}${it.href}`
        : `${siteConfig.url}`,
    }))
  );

  return (
    <>
      <nav
        aria-label="breadcrumb"
        className={`container-editorial py-6 ${baseColor}`}
      >
        <ol
          className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase"
          style={{ letterSpacing: "0.18em" }}
        >
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
                {last || !item.href ? (
                  <span
                    className={last ? "text-olive" : ""}
                    aria-current={last ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`transition-colors ${linkHover}`}
                  >
                    {item.label}
                  </Link>
                )}
                {!last && <span aria-hidden="true">·</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
