import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ARTICLE_SLUGS, getArticle, getArticles } from "@/lib/tools-data";
import { getArticleBody } from "@/lib/article-content";
import { ChevronLeft, Check, ArrowRight, BookOpen, Globe, Coins, Gift, CalendarClock, Users, TrendingUp } from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Coins, Gift, CalendarClock, Users, TrendingUp,
};

const TRANSLATIONS = {
  en: {
    back: "Back to Articles",
    keyTakeaways: "Key Takeaways",
    ctaTitle: "Need help applying this to your situation?",
    ctaBody: "Our CPA-led team can review your specifics and implement these strategies for you.",
    ctaButton: "Book a Free Consultation",
    related: "Related Articles",
    read: "Read",
  },
  es: {
    back: "Volver a Artículos",
    keyTakeaways: "Conclusiones Clave",
    ctaTitle: "¿Necesitas ayuda aplicando esto a tu situación?",
    ctaBody: "Nuestro equipo liderado por CPAs puede revisar tus detalles e implementar estas estrategias.",
    ctaButton: "Reserva una Consulta Gratuita",
    related: "Artículos Relacionados",
    read: "Leer",
  },
} as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLE_SLUGS.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "es", slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const L = locale as Locale;
  const article = getArticle(slug, L);
  if (!article) return {};
  return createPageMetadata({
    locale: L,
    path: `/tools/articles/${slug}`,
    title: article.title,
    description: article.excerpt,
    ogType: "article",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const L = locale as Locale;
  const t = TRANSLATIONS[L];
  const article = getArticle(slug, L);
  const body = getArticleBody(slug, L);
  if (!article || !body) notFound();

  const Icon = icons[article.icon] ?? BookOpen;
  const related = getArticles(L).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-12 lg:py-16">
        <Container>
          <Link
            href={`/${locale}/tools/articles`}
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            {t.back}
          </Link>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                {article.category}
              </span>
              <span className="text-xs text-muted">{article.readTime}</span>
            </div>
            <Icon className="mb-4 h-10 w-10 text-accent" />
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">{article.excerpt}</p>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-foreground">{body.intro}</p>

            <div className="mt-10 space-y-10">
              {body.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {section.heading}
                  </h2>
                  {section.paragraphs && (
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((p, i) => (
                        <p key={i} className="text-base leading-relaxed text-muted">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-base leading-relaxed text-muted">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.callout && (
                    <div className="mt-5 rounded-xl border-l-4 border-accent bg-accent/5 p-5">
                      <div className="text-sm font-semibold text-accent">{section.callout.title}</div>
                      <p className="mt-1 text-sm text-foreground">{section.callout.body}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Key takeaways */}
            <div className="mt-14 rounded-2xl border border-border/60 bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">{t.keyTakeaways}</h3>
              <ul className="mt-4 space-y-2.5">
                {body.keyTakeaways.map((k, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-14 rounded-2xl bg-primary p-8 text-center text-white">
              <h3 className="text-xl font-semibold">{t.ctaTitle}</h3>
              <p className="mt-2 text-sm text-white/70">{t.ctaBody}</p>
              <Link
                href={`/${locale}/contact`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                {t.ctaButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {t.related}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => {
                const RIcon = icons[r.icon] ?? BookOpen;
                return (
                  <Link key={r.slug} href={`/${locale}/tools/articles/${r.slug}`} className="group">
                    <Card hover className="h-full p-5 transition-all group-hover:border-accent/30">
                      <RIcon className="mb-2 h-6 w-6 text-accent" />
                      <h3 className="text-base font-semibold text-foreground">{r.title}</h3>
                      <p className="mt-1 text-xs text-muted">{r.excerpt}</p>
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:text-accent-dark">
                        {t.read}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
