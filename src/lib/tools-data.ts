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

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "new-immigrant-tax-guide",
    title: "New Immigrant Tax Guide",
    category: "Personal Tax",
    readTime: "8 min read",
    excerpt: "Complete guide for newcomers filing taxes in Canada — residency, reporting foreign income, and first-year credits.",
    icon: "Globe",
  },
  {
    slug: "dividend-vs-salary",
    title: "Dividend vs. Salary Strategy",
    category: "Business Tax",
    readTime: "6 min read",
    excerpt: "Owner-manager compensation optimization: how to decide between paying yourself via salary, dividends, or a mix.",
    icon: "Coins",
  },
  {
    slug: "small-business-tax-credits",
    title: "Small Business Tax Credits",
    category: "Business Tax",
    readTime: "7 min read",
    excerpt: "Hidden tax opportunities for Canadian small businesses — credits, deductions, and incentives you may be missing.",
    icon: "Gift",
  },
  {
    slug: "year-end-tax-planning",
    title: "Year-End Tax Planning",
    category: "Tax Planning",
    readTime: "10 min read",
    excerpt: "Essential strategies to execute before December 31st — RRSPs, capital gains harvesting, and more.",
    icon: "CalendarClock",
  },
  {
    slug: "canadian-payroll-guide",
    title: "Canadian Payroll Guide",
    category: "Payroll",
    readTime: "12 min read",
    excerpt: "Complete compliance guide for Canadian employers — CPP, EI, income tax, ROEs, and T4s.",
    icon: "Users",
  },
  {
    slug: "capital-gains-2025",
    title: "Capital Gains Tax 2025",
    category: "Tax Planning",
    readTime: "9 min read",
    excerpt: "Latest changes to capital gains taxation in Canada — inclusion rate updates and planning implications.",
    icon: "TrendingUp",
  },
];

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "breakeven-analysis",
    title: "Breakeven Analysis",
    tagline: "Calculate how many units to sell to break even",
    description: "Determine the sales volume required to cover your fixed and variable costs.",
    icon: "Target",
  },
  {
    slug: "loan-amortization",
    title: "Loan Amortization",
    tagline: "Calculate monthly payments and amortization schedules",
    description: "See your full payment schedule with principal and interest breakdown.",
    icon: "Banknote",
  },
  {
    slug: "rrsp-vs-tfsa",
    title: "RRSP vs TFSA",
    tagline: "Compare retirement savings options",
    description: "See which registered account works best based on your tax bracket now vs. retirement.",
    icon: "PiggyBank",
  },
  {
    slug: "gst-hst",
    title: "GST/HST Calculator",
    tagline: "Calculate Canadian sales tax amounts",
    description: "Add, remove, or split GST/HST on any amount for any Canadian province.",
    icon: "Percent",
  },
  {
    slug: "retirement-planning",
    title: "Retirement Planning",
    tagline: "Plan your retirement savings strategy",
    description: "Project how much you'll need and how your savings will grow to retirement.",
    icon: "Sun",
  },
  {
    slug: "financial-ratios",
    title: "Financial Ratios",
    tagline: "Analyze your business financial health",
    description: "Quickly compute key liquidity, leverage, and profitability ratios.",
    icon: "BarChart3",
  },
  {
    slug: "business-valuation",
    title: "Business Valuation",
    tagline: "Determine your business value",
    description: "Estimate your company's value using multiple valuation methodologies.",
    icon: "Briefcase",
  },
  {
    slug: "compound-savings",
    title: "Compound Savings",
    tagline: "See how your savings grow over time",
    description: "Visualize compound interest across regular contributions.",
    icon: "LineChart",
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getCalculator(slug: string) {
  return CALCULATORS.find((c) => c.slug === slug);
}
