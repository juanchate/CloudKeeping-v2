"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function FlagGB({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className} aria-hidden="true">
      <clipPath id="gb"><path d="M0 0v30h60V0z" /></clipPath>
      <g clipPath="url(#gb)">
        <path fill="#012169" d="M0 0v30h60V0z" />
        <path stroke="#fff" strokeWidth="6" d="m0 0 60 30m0-30L0 30" />
        <path stroke="#C8102E" strokeWidth="4" d="m0 0 60 30m0-30L0 30" clipPath="url(#gb)" />
        <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
        <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" />
      </g>
    </svg>
  );
}

function FlagES({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" className={className} aria-hidden="true">
      <rect width="750" height="500" fill="#c60b1e" />
      <rect width="750" height="250" y="125" fill="#ffc400" />
    </svg>
  );
}

interface LanguageToggleProps {
  locale: Locale;
  className?: string;
}

export function LanguageToggle({ locale, className }: LanguageToggleProps) {
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "es" : "en";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={otherPath}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground hover:bg-surface",
        className
      )}
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      {otherLocale === "es" ? (
        <FlagES className="h-3.5 w-5 rounded-[2px] shrink-0" />
      ) : (
        <FlagGB className="h-3.5 w-5 rounded-[2px] shrink-0" />
      )}
      <span className="text-xs uppercase tracking-wider">{otherLocale === "es" ? "ES" : "EN"}</span>
    </Link>
  );
}
