import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ARTICLES } from "@/lib/tools-data";
import { ChevronLeft, ArrowRight, BookOpen, Globe, Coins, Gift, CalendarClock, Users, TrendingUp } from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Coins, Gift, CalendarClock, Users, TrendingUp,
};

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return createPageMetadata({
    locale: locale as Locale,
    path: "/tools/articles",
    title: "Tax Guides & Articles",
    description:
      "Browse CloudKeeping's Canadian tax guides and articles covering personal tax, business tax, payroll, and tax planning strategies.",
  });
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const categories = Array.from(new Set(ARTICLES.map((a) => a.category)));

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-12 lg:py-16">
        <Container>
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to Tools
          </Link>
          <div className="mt-4 max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Tax Guides &amp; Articles
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Expert insights and practical guides to help you navigate Canadian tax laws and
              optimize your financial strategy.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => {
              const Icon = icons[article.icon] ?? BookOpen;
              return (
                <Link
                  key={article.slug}
                  href={`/${locale}/tools/articles/${article.slug}`}
                  className="group"
                >
                  <Card hover className="h-full p-6 transition-all group-hover:border-accent/30">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">
                        {article.category}
                      </span>
                      <span className="text-[11px] text-muted">{article.readTime}</span>
                    </div>
                    <Icon className="mb-3 h-8 w-8 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{article.excerpt}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-dark">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
