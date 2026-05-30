import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

export function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  className,
}: ButtonProps) {
  const classes = cn(
    "button",
    variant === "ghost" && "button--ghost",
    size === "sm" && "button--sm",
    className,
  );

  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  if (href && !isExternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}
