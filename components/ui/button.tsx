import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  size?: "sm" | "md";
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | React.MouseEventHandler<HTMLAnchorElement>;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  className,
  target,
  rel,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "button",
    variant === "ghost" && "button--ghost",
    size === "sm" && "button--sm",
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  if (href && !isExternal) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} disabled={disabled}>
      {children}
    </button>
  );
}
