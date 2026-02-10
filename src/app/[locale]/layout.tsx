import type { Metadata } from "next";
import { Lexend_Mega } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { SchemaOrg } from "@/components/layout/SchemaOrg";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const lexendMega = Lexend_Mega({
  variable: "--font-lexend-mega",
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  display: "swap",
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.metadata.description,
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        es: `${SITE_URL}/es`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_CA",
      alternateLocale: otherLocale === "es" ? "es_ES" : "en_CA",
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <SchemaOrg />
      </head>
      <body className={`${lexendMega.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header dict={dict} locale={locale as Locale} />
        <main id="main-content">{children}</main>
        <Footer dict={dict} locale={locale as Locale} />
      </body>
    </html>
  );
}
