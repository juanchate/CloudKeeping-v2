import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { FinancialDashboard } from "@/components/sections/FinancialDashboard";
import { ChevronLeft } from "lucide-react";

const TRANSLATIONS = {
  en: {
    metaTitle: "Financial Dashboard",
    metaDesc:
      "Interactive Canadian tax & financial dashboard. Tax breakdowns, salary vs dividend comparisons, growth projections, and retirement planning.",
    back: "Back to Tools",
    title: "Financial Dashboard",
    subtitle:
      "Visualize your finances with interactive charts. See where your taxes go, compare income structures, and project your retirement savings all in one place.",
  },
  es: {
    metaTitle: "Panel Financiero",
    metaDesc:
      "Panel financiero y fiscal canadiense interactivo. Distribución de impuestos, comparación salario vs dividendos, proyecciones de crecimiento y planificación del retiro.",
    back: "Volver a Herramientas",
    title: "Panel Financiero",
    subtitle:
      "Visualiza tus finanzas con gráficos interactivos. Ve a dónde van tus impuestos, compara estructuras de ingreso y proyecta tus ahorros para el retiro, todo en un solo lugar.",
  },
} as const;

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = TRANSLATIONS[locale as Locale];
  return createPageMetadata({
    locale: locale as Locale,
    path: "/tools/dashboard",
    title: t.metaTitle,
    description: t.metaDesc,
  });
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const L = locale as Locale;
  const t = TRANSLATIONS[L];

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-12 lg:py-16">
        <Container>
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            {t.back}
          </Link>
          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">{t.subtitle}</p>
          </div>
        </Container>
      </section>

      <FinancialDashboard locale={L} />
    </>
  );
}
