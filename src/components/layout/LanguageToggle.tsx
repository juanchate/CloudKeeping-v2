"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  locale: Locale;
  className?: string;
}

export function LanguageToggle({ locale, className }: LanguageToggleProps) {
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "es" : "en";

  // Replace current locale prefix with the other
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
      {otherLocale === "es" ? "🇪🇸" : "🇬🇧"}
      <span className="text-xs uppercase tracking-wider">{otherLocale === "es" ? "ES" : "EN"}</span>
    </Link>
  );
}
