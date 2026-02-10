"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/analytics";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  trackLabel?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark active:bg-accent-dark/90 shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
  secondary:
    "bg-primary text-white hover:bg-primary-light active:bg-primary-dark shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
  ghost: "text-foreground hover:bg-surface-alt active:bg-border",
  outline:
    "border border-border text-foreground hover:border-accent hover:text-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  trackLabel,
  external = false,
  className,
  onClick,
  children,
  ...props
}: LinkButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (trackLabel) {
      trackCTAClick(trackLabel);
    }
    onClick?.(e);
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
