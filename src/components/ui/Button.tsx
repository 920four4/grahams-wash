import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-dark active:bg-brand-dark",
  secondary: "bg-brand-soft text-brand hover:bg-[#d6e9ff]",
  ghost: "bg-transparent text-navy hover:bg-black/5",
  dark: "bg-navy text-white hover:bg-[#152744]",
  outline: "border border-border bg-white text-navy hover:border-brand/40 hover:bg-brand-soft/50",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm rounded-xl gap-1.5",
  md: "h-12 px-5 text-[15px] rounded-2xl gap-2",
  lg: "h-14 px-6 text-base rounded-2xl gap-2.5",
};

type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "children" | "className"> & {
    href?: undefined;
  };

type ButtonAsLink = Common & {
  href: string;
  external?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "pressable inline-flex items-center justify-center font-semibold tracking-tight transition-colors disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("sms:")) {
      return (
        <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {icon}
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {icon}
      {children}
    </button>
  );
}
