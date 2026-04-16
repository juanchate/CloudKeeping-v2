import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ARTICLES, CALCULATORS } from "@/lib/tools-data";
import {
  Calculator,
  BookOpen,
  Briefcase,
  ArrowRight,
  ExternalLink,
  LayoutDashboard,
  Target,
  Banknote,
  PiggyBank,
  Percent,
  Sun,
  BarChart3,
  LineChart,
  TrendingUp,
  Globe,
  Coins,
  Gift,
  CalendarClock,
  Users,
  AlertTriangle,
} from "lucide-react";

const articleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Coins, Gift, CalendarClock, Users, TrendingUp,
};
const calculatorIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, Banknote, PiggyBank, Percent, Sun, BarChart3, Briefcase, LineChart,
};

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return createPageMetadata({
    locale: locale as Locale,
    path: "/tools",
    title: "Financial Tools & Tax Resources",
    description:
      "Free financial calculators, tax guides, and interactive tools for Canadian businesses and individuals — brought to you by CloudKeeping.",
  });
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const overview = [
    {
      title: "Financial Calculators",
      subtitle: "Interactive tools for financial planning",
      items: ["Loan Calculator", "RRSP Calculator", "Tax Calculator", "Breakeven Analysis"],
      icon: Calculator,
      href: `/${locale}/tools#calculators`,
    },
    {
      title: "Tax Guides & Articles",
      subtitle: "Comprehensive tax education resources",
      items: ["Personal Tax", "Business Tax", "Payroll Guide", "Tax Planning"],
      icon: BookOpen,
      href: `/${locale}/tools/articles`,
    },
    {
      title: "Business Tools",
      subtitle: "Essential tools for business owners",
      items: ["Business Valuation", "Financial Ratios", "Investment Analysis", "Retirement Planning"],
      icon: Briefcase,
      href: `/${locale}/tools#calculators`,
    },
  ];

  const dashboardFeatures = [
    "Tax breakdown pie charts (Federal, Provincial, CPP, EI)",
    "Salary vs Business income comparison",
    "Retirement savings projections (RRSP & TFSA)",
  ];

  const dashboardTabs = ["Tax Breakdown", "Income Compare", "Growth Charts", "Projections"];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Free Tools · Canadian Focused
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Financial Tools &amp; Tax Resources
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Access our comprehensive collection of financial calculators, tax guides, and business
              tools to make informed decisions.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {overview.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group">
                <Card hover className="h-full p-7 transition-all group-hover:border-accent/30">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{cat.title}</h3>
                  <p className="mt-1 text-sm text-muted">{cat.subtitle}</p>
                  <ul className="mt-4 space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-dark">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Tax Guides & Articles */}
      <section id="articles" className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Tax Guides &amp; Articles
            </h2>
            <p className="mt-4 text-lg text-muted">
              Expert insights and practical guides to help you navigate Canadian tax laws and
              optimize your financial strategy.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => {
              const Icon = articleIcons[article.icon] ?? BookOpen;
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

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/tools/articles`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              View All Tax Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Financial Dashboard */}
      <section className="bg-primary py-20 lg:py-24 text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                <LayoutDashboard className="h-3.5 w-3.5" /> Interactive Dashboard
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Financial Dashboard
              </h2>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                Visualize your finances with interactive charts. See where your taxes go, compare
                income structures, and project your retirement savings all in one place.
              </p>

              <ul className="mt-6 space-y-2.5">
                {dashboardFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href={`/${locale}/tools/dashboard`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-accent-dark"
                >
                  Open Financial Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="mb-3 flex gap-1.5">
                  {dashboardTabs.map((t, i) => (
                    <div
                      key={t}
                      className={`flex-1 rounded-md px-2 py-1.5 text-center text-[10px] font-medium ${
                        i === 0
                          ? "bg-accent text-white"
                          : "bg-white/5 text-white/60"
                      }`}
                    >
                      {t}
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-white p-5 text-foreground">
                  <div className="mb-3 text-xs font-semibold text-muted">Tax Breakdown</div>
                  <div className="flex items-center gap-5">
                    {/* Fake donut chart */}
                    <div className="relative h-32 w-32 shrink-0">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8e8ed" strokeWidth="3.8" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a2e4a" strokeWidth="3.8" strokeDasharray="40 100" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#C8922A" strokeWidth="3.8" strokeDasharray="25 100" strokeDashoffset="-40" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#16a34a" strokeWidth="3.8" strokeDasharray="18 100" strokeDashoffset="-65" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#dc2626" strokeWidth="3.8" strokeDasharray="17 100" strokeDashoffset="-83" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-[10px] text-muted">Total</div>
                        <div className="text-sm font-bold">$28,450</div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[
                        { label: "Federal", value: "40%", color: "#1a2e4a" },
                        { label: "Provincial", value: "25%", color: "#C8922A" },
                        { label: "CPP", value: "18%", color: "#16a34a" },
                        { label: "EI", value: "17%", color: "#dc2626" },
                      ].map((it) => (
                        <div key={it.label} className="flex items-center gap-2 text-xs">
                          <span className="h-2 w-2 rounded-full" style={{ background: it.color }} />
                          <span className="flex-1">{it.label}</span>
                          <span className="font-semibold">{it.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Calculators */}
      <section id="calculators" className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Interactive Financial Calculators
            </h2>
            <p className="mt-4 text-lg text-muted">
              Use our professional-grade calculators to plan your finances, analyze investments, and
              make informed decisions.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm text-muted">
                <strong className="text-foreground">Important Disclaimer:</strong> The results
                provided by these calculators are estimates only and should not be considered
                professional financial advice. For advice specific to your situation, please{" "}
                <Link href={`/${locale}/contact`} className="font-medium text-accent hover:text-accent-dark">
                  contact our team
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CALCULATORS.map((calc) => {
              const Icon = calculatorIcons[calc.icon] ?? Calculator;
              return (
                <Link
                  key={calc.slug}
                  href={`/${locale}/tools/calculators/${calc.slug}`}
                  className="group"
                >
                  <Card hover className="h-full p-6 transition-all group-hover:border-accent/30">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">{calc.title}</h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{calc.tagline}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:text-accent-dark">
                      Open
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* CRA Payroll Deductions Calculator external */}
          <div className="mt-12 rounded-2xl border border-border/60 bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Official Government Tool
                </div>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  CRA Payroll Deductions Calculator
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Official Government of Canada calculator for CPP, EI, and income tax calculations.
                </p>
              </div>
              <a
                href="https://apps.cra-arc.gc.ca/ebci/rhpd/beta/entry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                Launch CRA Calculator
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
