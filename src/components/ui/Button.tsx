import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "gold" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-coffee-900 text-coffee-50 hover:bg-coffee-700 hover:shadow-lg",
  gold:
    "bg-gold-500 text-coffee-950 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20",
  ghost:
    "bg-transparent text-coffee-900 hover:bg-coffee-100",
  outline:
    "border border-coffee-300 bg-transparent text-coffee-900 hover:border-coffee-500 hover:bg-coffee-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<"a">, "className" | "children" | "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className = "",
    children,
  } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...(rest as ComponentProps<"a">)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
