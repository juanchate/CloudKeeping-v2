import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CALCULATOR_SLUGS, getCalculator, getCalculators } from "@/lib/tools-data";
import { CalculatorRenderer } from "@/components/sections/CalculatorRenderer";
import { ChevronLeft, ArrowRight, AlertTriangle } from "lucide-react";

const TRANSLATIONS = {
  en: {
    metaSuffix: "— Free Canadian Calculator",
    back: "Back to Tools",
    badge: "Calculator",
    disclaimerTitle: "Estimates only.",
    disclaimerBody:
      "These calculations are for illustrative purposes. Contact our CPA-led team for advice tailored to your situation.",
    disclaimerCta: "Book a free consultation →",
    moreTitle: "More Calculators",
    open: "Open",
  },
  es: {
    metaSuffix: "— Calculadora Canadiense Gratuita",
    back: "Volver a Herramientas",
    badge: "Calculadora",
    disclaimerTitle: "Sólo estimaciones.",
    disclaimerBody:
      "Estos cálculos son con fines ilustrativos. Contacta a nuestro equipo liderado por CPAs para asesoramiento específico a tu situación.",
    disclaimerCta: "Reserva una consulta gratuita →",
    moreTitle: "Más Calculadoras",
    open: "Abrir",
  },
} as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return CALCULATOR_SLUGS.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "es", slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const L = locale as Locale;
  const calc = getCalculator(slug, L);
  if (!calc) return {};
  const t = TRANSLATIONS[L];
  return createPageMetadata({
    locale: L,
    path: `/tools/calculators/${slug}`,
    title: `${calc.title} ${t.metaSuffix}`,
    description: calc.description,
  });
}

export default async function CalculatorPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const L = locale as Locale;
  const t = TRANSLATIONS[L];
  const calc = getCalculator(slug, L);
  if (!calc) notFound();

  const related = getCalculators(L).filter((c) => c.slug !== slug).slice(0, 4);

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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              {t.badge}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {calc.title}
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">{calc.description}</p>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-5xl rounded-2xl border border-border/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:p-10">
            <CalculatorRenderer slug={slug} locale={L} />
          </div>

          <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-accent/30 bg-accent/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm text-muted">
                <strong className="text-foreground">{t.disclaimerTitle}</strong> {t.disclaimerBody}{" "}
                <Link href={`/${locale}/contact`} className="font-medium text-accent hover:text-accent-dark">
                  {t.disclaimerCta}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {t.moreTitle}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/${locale}/tools/calculators/${r.slug}`} className="group">
                  <Card hover className="flex h-full flex-col p-5 transition-all group-hover:border-accent/30">
                    <h3 className="text-base font-semibold text-foreground">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted">{r.tagline}</p>
                    <div className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium text-accent group-hover:text-accent-dark">
                      {t.open}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
