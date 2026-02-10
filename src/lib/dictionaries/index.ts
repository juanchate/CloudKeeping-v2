import type { Locale } from "@/lib/i18n";
import en from "./en";
import es from "./es";

const dictionaries = { en, es } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = typeof en;
