import type { Locale } from "./i18n";

export interface ArticleMeta {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  icon: string;
}

export interface CalculatorMeta {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

type LocalizedArticle = {
  slug: string;
  icon: string;
  en: { title: string; category: string; readTime: string; excerpt: string };
  es: { title: string; category: string; readTime: string; excerpt: string };
};

type LocalizedCalculator = {
  slug: string;
  icon: string;
  en: { title: string; tagline: string; description: string };
  es: { title: string; tagline: string; description: string };
};

const ARTICLES_I18N: LocalizedArticle[] = [
  {
    slug: "new-immigrant-tax-guide",
    icon: "Globe",
    en: {
      title: "New Immigrant Tax Guide",
      category: "Personal Tax",
      readTime: "8 min read",
      excerpt:
        "Complete guide for newcomers filing taxes in Canada — residency, reporting foreign income, and first-year credits.",
    },
    es: {
      title: "Guía de Impuestos para Recién Inmigrados",
      category: "Impuestos Personales",
      readTime: "8 min de lectura",
      excerpt:
        "Guía completa para quienes recién llegan a Canadá — residencia fiscal, reporte de ingresos en el extranjero y créditos del primer año.",
    },
  },
  {
    slug: "dividend-vs-salary",
    icon: "Coins",
    en: {
      title: "Dividend vs. Salary Strategy",
      category: "Business Tax",
      readTime: "6 min read",
      excerpt:
        "Owner-manager compensation optimization: how to decide between paying yourself via salary, dividends, or a mix.",
    },
    es: {
      title: "Dividendos vs. Salario",
      category: "Impuestos Corporativos",
      readTime: "6 min de lectura",
      excerpt:
        "Optimización de la compensación del dueño-gerente: cómo decidir entre pagarte por salario, dividendos o una mezcla.",
    },
  },
  {
    slug: "small-business-tax-credits",
    icon: "Gift",
    en: {
      title: "Small Business Tax Credits",
      category: "Business Tax",
      readTime: "7 min read",
      excerpt:
        "Hidden tax opportunities for Canadian small businesses — credits, deductions, and incentives you may be missing.",
    },
    es: {
      title: "Créditos Fiscales para Pequeñas Empresas",
      category: "Impuestos Corporativos",
      readTime: "7 min de lectura",
      excerpt:
        "Oportunidades fiscales ocultas para pequeñas empresas canadienses — créditos, deducciones e incentivos que podrías estar perdiendo.",
    },
  },
  {
    slug: "year-end-tax-planning",
    icon: "CalendarClock",
    en: {
      title: "Year-End Tax Planning",
      category: "Tax Planning",
      readTime: "10 min read",
      excerpt:
        "Essential strategies to execute before December 31st — RRSPs, capital gains harvesting, and more.",
    },
    es: {
      title: "Planificación Fiscal de Fin de Año",
      category: "Planificación Fiscal",
      readTime: "10 min de lectura",
      excerpt:
        "Estrategias esenciales para ejecutar antes del 31 de diciembre — RRSPs, recolección de ganancias de capital y más.",
    },
  },
  {
    slug: "canadian-payroll-guide",
    icon: "Users",
    en: {
      title: "Canadian Payroll Guide",
      category: "Payroll",
      readTime: "12 min read",
      excerpt:
        "Complete compliance guide for Canadian employers — CPP, EI, income tax, ROEs, and T4s.",
    },
    es: {
      title: "Guía de Nómina Canadiense",
      category: "Nómina",
      readTime: "12 min de lectura",
      excerpt:
        "Guía completa de cumplimiento para empleadores canadienses — CPP, EI, impuesto sobre la renta, ROEs y T4s.",
    },
  },
  {
    slug: "capital-gains-2025",
    icon: "TrendingUp",
    en: {
      title: "Capital Gains Tax 2025",
      category: "Tax Planning",
      readTime: "9 min read",
      excerpt:
        "Latest changes to capital gains taxation in Canada — inclusion rate updates and planning implications.",
    },
    es: {
      title: "Impuesto sobre Ganancias de Capital 2025",
      category: "Planificación Fiscal",
      readTime: "9 min de lectura",
      excerpt:
        "Últimos cambios en la tributación de ganancias de capital en Canadá — actualizaciones de la tasa de inclusión e implicaciones.",
    },
  },
];

const CALCULATORS_I18N: LocalizedCalculator[] = [
  {
    slug: "breakeven-analysis",
    icon: "Target",
    en: {
      title: "Breakeven Analysis",
      tagline: "Calculate how many units to sell to break even",
      description: "Determine the sales volume required to cover your fixed and variable costs.",
    },
    es: {
      title: "Análisis de Punto de Equilibrio",
      tagline: "Calcula cuántas unidades vender para alcanzar el punto de equilibrio",
      description:
        "Determina el volumen de ventas necesario para cubrir tus costos fijos y variables.",
    },
  },
  {
    slug: "loan-amortization",
    icon: "Banknote",
    en: {
      title: "Loan Amortization",
      tagline: "Calculate monthly payments and amortization schedules",
      description: "See your full payment schedule with principal and interest breakdown.",
    },
    es: {
      title: "Amortización de Préstamos",
      tagline: "Calcula pagos mensuales y tablas de amortización",
      description: "Mira tu calendario completo de pagos con desglose de capital e intereses.",
    },
  },
  {
    slug: "rrsp-vs-tfsa",
    icon: "PiggyBank",
    en: {
      title: "RRSP vs TFSA",
      tagline: "Compare retirement savings options",
      description:
        "See which registered account works best based on your tax bracket now vs. retirement.",
    },
    es: {
      title: "RRSP vs TFSA",
      tagline: "Compara opciones de ahorro para el retiro",
      description:
        "Descubre qué cuenta registrada te conviene según tu franja fiscal actual vs. la del retiro.",
    },
  },
  {
    slug: "gst-hst",
    icon: "Percent",
    en: {
      title: "GST/HST Calculator",
      tagline: "Calculate Canadian sales tax amounts",
      description: "Add, remove, or split GST/HST on any amount for any Canadian province.",
    },
    es: {
      title: "Calculadora GST/HST",
      tagline: "Calcula el impuesto canadiense a las ventas",
      description:
        "Agrega, quita o desglosa el GST/HST sobre cualquier monto para cualquier provincia canadiense.",
    },
  },
  {
    slug: "retirement-planning",
    icon: "Sun",
    en: {
      title: "Retirement Planning",
      tagline: "Plan your retirement savings strategy",
      description: "Project how much you'll need and how your savings will grow to retirement.",
    },
    es: {
      title: "Planificación del Retiro",
      tagline: "Planifica tu estrategia de ahorro para el retiro",
      description: "Proyecta cuánto necesitarás y cómo crecerán tus ahorros hasta el retiro.",
    },
  },
  {
    slug: "financial-ratios",
    icon: "BarChart3",
    en: {
      title: "Financial Ratios",
      tagline: "Analyze your business financial health",
      description: "Quickly compute key liquidity, leverage, and profitability ratios.",
    },
    es: {
      title: "Ratios Financieros",
      tagline: "Analiza la salud financiera de tu empresa",
      description:
        "Calcula rápidamente los principales ratios de liquidez, apalancamiento y rentabilidad.",
    },
  },
  {
    slug: "business-valuation",
    icon: "Briefcase",
    en: {
      title: "Business Valuation",
      tagline: "Determine your business value",
      description: "Estimate your company's value using multiple valuation methodologies.",
    },
    es: {
      title: "Valoración Empresarial",
      tagline: "Determina el valor de tu empresa",
      description:
        "Estima el valor de tu empresa usando varias metodologías de valoración.",
    },
  },
  {
    slug: "compound-savings",
    icon: "LineChart",
    en: {
      title: "Compound Savings",
      tagline: "See how your savings grow over time",
      description: "Visualize compound interest across regular contributions.",
    },
    es: {
      title: "Ahorros con Interés Compuesto",
      tagline: "Observa cómo crecen tus ahorros con el tiempo",
      description: "Visualiza el interés compuesto con aportes regulares.",
    },
  },
];

export function getArticles(locale: Locale = "en"): ArticleMeta[] {
  return ARTICLES_I18N.map((a) => ({
    slug: a.slug,
    icon: a.icon,
    ...a[locale],
  }));
}

export function getCalculators(locale: Locale = "en"): CalculatorMeta[] {
  return CALCULATORS_I18N.map((c) => ({
    slug: c.slug,
    icon: c.icon,
    ...c[locale],
  }));
}

export function getArticle(slug: string, locale: Locale = "en"): ArticleMeta | undefined {
  const a = ARTICLES_I18N.find((x) => x.slug === slug);
  if (!a) return undefined;
  return { slug: a.slug, icon: a.icon, ...a[locale] };
}

export function getCalculator(slug: string, locale: Locale = "en"): CalculatorMeta | undefined {
  const c = CALCULATORS_I18N.find((x) => x.slug === slug);
  if (!c) return undefined;
  return { slug: c.slug, icon: c.icon, ...c[locale] };
}

export const ARTICLE_SLUGS = ARTICLES_I18N.map((a) => a.slug);
export const CALCULATOR_SLUGS = CALCULATORS_I18N.map((c) => c.slug);

// Legacy exports (deprecated, use getArticles/getCalculators)
export const ARTICLES: ArticleMeta[] = getArticles("en");
export const CALCULATORS: CalculatorMeta[] = getCalculators("en");
