import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage.toLowerCase().startsWith("es")) return "es";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and assets
  if (
    pathname.includes(".") || // any file with extension (images, fonts, etc.)
    pathname.startsWith("/api")
  ) {
    return;
  }

  // Check if pathname already has a locale prefix
  const hasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );
  if (hasLocale) return;

  // Redirect to locale-prefixed URL
  const locale = getPreferredLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image).*)",
  ],
};
