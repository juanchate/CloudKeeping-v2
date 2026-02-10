import type {
  Service,
  FAQ,
  Testimonial,
  Stat,
  ProcessStep,
  ValueProp,
} from "@/types";

// ─── Services ────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    slug: "bookkeeping",
    title: "Bookkeeping",
    shortDescription:
      "Accurate, up-to-date financial records so you always know where your business stands.",
    description:
      "We maintain your books with precision and consistency, giving you a clear picture of your business finances at all times. From transaction categorization to bank reconciliations, we handle the details so you can focus on running your business.",
    icon: "BookOpen",
    included: [
      "Monthly transaction categorization and recording",
      "Bank and credit card reconciliations",
      "Accounts payable and receivable tracking",
      "Monthly financial statement preparation",
      "Year-end adjustments and closing entries",
      "Cloud-based accounting software setup and management",
    ],
    whoItsFor:
      "Small and medium-sized businesses looking for reliable, consistent bookkeeping without the overhead of an in-house team.",
    outcomes: [
      {
        title: "Financial Clarity",
        description:
          "Always know your cash position, receivables, and payables with accurate, timely records.",
      },
      {
        title: "Tax Readiness",
        description:
          "Clean books year-round mean smoother, faster tax filings with no last-minute scrambles.",
      },
      {
        title: "Time Savings",
        description:
          "Reclaim hours each week by offloading bookkeeping to a dedicated professional team.",
      },
    ],
  },
  {
    slug: "tax",
    title: "Tax Management & Planning",
    shortDescription:
      "Proactive tax strategy to minimize your burden and keep you fully compliant.",
    description:
      "We go beyond simple tax filing. Our team develops proactive tax strategies tailored to your business structure and goals, ensuring you take advantage of every legitimate deduction and credit while staying fully compliant with CRA requirements.",
    icon: "Calculator",
    included: [
      "Corporate (T2) and personal (T1) tax return preparation",
      "GST/PST return filing and compliance",
      "Tax planning and optimization strategies",
      "CRA correspondence and audit support",
      "Installment payment calculations and reminders",
      "Year-round tax advisory and compliance monitoring",
    ],
    whoItsFor:
      "Incorporated professionals, contractors, and business owners who want to minimize their tax burden while maintaining full CRA compliance.",
    outcomes: [
      {
        title: "Reduced Tax Burden",
        description:
          "Strategic planning that identifies legitimate deductions and credits specific to your situation.",
      },
      {
        title: "Full Compliance",
        description:
          "Never worry about missed deadlines, incorrect filings, or CRA penalties again.",
      },
      {
        title: "Peace of Mind",
        description:
          "Confidence that your tax affairs are managed by experienced professionals who stay current with tax law.",
      },
    ],
  },
  {
    slug: "payroll",
    title: "Payroll",
    shortDescription:
      "Reliable payroll processing that ensures your team is paid accurately and on time.",
    description:
      "We handle every aspect of payroll processing, from calculating wages and deductions to filing remittances with the CRA. Our service ensures your employees are paid correctly and on time, every time, while keeping you compliant with all employment regulations.",
    icon: "Users",
    included: [
      "Regular payroll processing (weekly, bi-weekly, or monthly)",
      "Source deduction calculations (CPP, EI, income tax)",
      "T4 and T4A preparation and filing",
      "Record of Employment (ROE) issuance",
      "CRA payroll remittance filing",
      "Workers\u2019 compensation reporting",
    ],
    whoItsFor:
      "Businesses with employees who need dependable, accurate payroll processing without the complexity of managing it in-house.",
    outcomes: [
      {
        title: "Accuracy Guaranteed",
        description:
          "Precise calculations every pay period, eliminating costly errors and employee concerns.",
      },
      {
        title: "Regulatory Compliance",
        description:
          "All remittances filed on time with correct amounts, avoiding penalties and interest charges.",
      },
      {
        title: "Reduced Admin",
        description:
          "Free your team from time-consuming payroll tasks and let them focus on higher-value work.",
      },
    ],
  },
  {
    slug: "accounting-consulting",
    title: "Accounting & Consulting",
    shortDescription:
      "Strategic financial guidance to help you make informed decisions and grow confidently.",
    description:
      "Beyond the numbers, we provide the strategic financial insight your business needs to grow. From cash flow analysis to budgeting and forecasting, our consulting services help you understand your financial position and make data-driven decisions with confidence.",
    icon: "TrendingUp",
    included: [
      "Financial statement analysis and reporting",
      "Cash flow management and forecasting",
      "Budgeting and financial planning",
      "Business structure advisory (incorporation, partnerships)",
      "Key performance indicator (KPI) development",
      "Ongoing strategic financial consultation",
    ],
    whoItsFor:
      "Growing businesses and startup founders who need more than bookkeeping — they need a financial partner to guide strategic decisions.",
    outcomes: [
      {
        title: "Informed Decisions",
        description:
          "Clear financial insights and reporting that drive smarter business decisions.",
      },
      {
        title: "Growth Planning",
        description:
          "Budgets, forecasts, and KPIs that help you plan for sustainable, profitable growth.",
      },
      {
        title: "Expert Guidance",
        description:
          "A dedicated financial advisor who understands your business and proactively identifies opportunities.",
      },
    ],
  },
];

// ─── FAQs ────────────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work primarily with small and medium-sized businesses, incorporated professionals, and contractors across British Columbia. Our clients span a range of industries including professional services, construction, technology, retail, and healthcare. If you're unsure whether we're the right fit, we encourage you to book a consultation — there's no obligation.",
    category: "General",
  },
  {
    question: "How do I get started with CloudKeeping?",
    answer:
      "Getting started is straightforward. Book a free consultation through our contact form or give us a call. During the consultation, we'll review your current financial situation, understand your needs, and recommend the services that make sense for your business. From there, we handle the onboarding process and get you set up quickly.",
    category: "General",
  },
  {
    question: "What accounting software do you use?",
    answer:
      "We work with industry-leading cloud-based accounting platforms including QuickBooks Online, Xero, and Sage. If you already use a specific platform, we're happy to work within your existing setup. If you're starting fresh, we'll recommend the best option based on your business needs and budget.",
    category: "General",
  },
  {
    question: "How often will I receive financial reports?",
    answer:
      "We provide monthly financial statements as part of our standard bookkeeping service, including a profit and loss statement, balance sheet, and cash flow summary. For consulting clients, we can provide more frequent reporting and custom dashboards tailored to the KPIs that matter most to your business.",
    category: "Services",
  },
  {
    question: "Can you help with CRA audits or disputes?",
    answer:
      "Absolutely. If you receive a notice from the CRA, we can review the correspondence, prepare the necessary documentation, and represent your interests. Our proactive approach to compliance means our clients are well-positioned in the event of a review or audit.",
    category: "Services",
  },
  {
    question: "What are your fees?",
    answer:
      "Our fees depend on the scope and complexity of the services you need. We offer transparent, fixed-fee pricing for most of our core services so you always know what to expect. During your initial consultation, we'll provide a clear quote based on your specific requirements — no hidden charges.",
    category: "Pricing",
  },
  {
    question: "Do you offer virtual or remote services?",
    answer:
      "Yes. All of our services are available remotely. We use secure cloud-based tools for document sharing, communication, and collaboration, which means you get the same level of service whether you're across the street or across the province. We're available by phone, email, and video call.",
    category: "General",
  },
  {
    question: "What's the difference between bookkeeping and accounting?",
    answer:
      "Bookkeeping focuses on the day-to-day recording of financial transactions — categorizing expenses, reconciling bank statements, and maintaining accurate records. Accounting goes further, involving analysis, reporting, tax planning, and strategic financial advice. Most businesses benefit from both, and we offer integrated services that cover the full spectrum.",
    category: "Services",
  },
  {
    question: "How do you ensure the security of my financial data?",
    answer:
      "Data security is a top priority. We use encrypted, cloud-based platforms with bank-level security, multi-factor authentication, and role-based access controls. We follow industry best practices for data handling and never share your information with unauthorized third parties.",
    category: "General",
  },
  {
    question: "Can I switch to CloudKeeping from another accountant or bookkeeper?",
    answer:
      "Absolutely, and we make the transition as smooth as possible. We'll coordinate with your previous provider to obtain your financial records, review your current books for accuracy, and handle the entire migration process. Most transitions are completed within one to two weeks.",
    category: "General",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    quote:
      "CloudKeeping transformed how we manage our finances. Their attention to detail and proactive approach saved us thousands in taxes we didn't even know we were overpaying. I finally feel confident in our numbers.",
    name: "Sarah M.",
    title: "Owner",
    company: "Westside Design Studio",
  },
  {
    quote:
      "Switching to CloudKeeping was one of the best decisions we made for our business. They made the transition seamless and now our books are always up to date. Their team is responsive, professional, and genuinely cares about our success.",
    name: "David K.",
    title: "Managing Director",
    company: "Pacific Coast Contracting",
  },
  {
    quote:
      "As a contractor, I needed someone who understood the tax complexities of my situation. CloudKeeping not only keeps me compliant but actively finds ways to optimize my tax position. Highly recommended.",
    name: "Priya L.",
    title: "Independent Consultant",
    company: "PL Consulting",
  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { value: "10+", label: "Years of Experience" },
  { value: "200+", label: "Clients Served" },
  { value: "98%", label: "Client Retention Rate" },
  { value: "24hr", label: "Average Response Time" },
];

// ─── Process Steps ───────────────────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Book a Consultation",
    description:
      "Reach out through our contact form or give us a call. We'll schedule a free, no-obligation consultation to understand your needs.",
  },
  {
    step: 2,
    title: "We Review Your Needs",
    description:
      "We assess your current financial setup, identify gaps, and recommend the right combination of services for your business.",
  },
  {
    step: 3,
    title: "Get Ongoing Support",
    description:
      "Once onboarded, we manage your finances with consistent communication, timely reporting, and proactive guidance.",
  },
];

// ─── Value Propositions ──────────────────────────────────────────────────────

export const valueProps: ValueProp[] = [
  {
    title: "Compliance-Focused",
    description:
      "We stay current with CRA regulations and filing requirements so you never have to worry about penalties or missed deadlines.",
    icon: "ShieldCheck",
  },
  {
    title: "Proactive Support",
    description:
      "We don't just react to problems — we anticipate them. From tax planning to cash flow forecasting, we keep you one step ahead.",
    icon: "Lightbulb",
  },
  {
    title: "Clear Communication",
    description:
      "No jargon, no surprises. We explain your financial position in plain language and are always available when you have questions.",
    icon: "MessageSquare",
  },
  {
    title: "Technology-Driven",
    description:
      "We leverage modern cloud-based tools to deliver faster, more accurate results with secure, real-time access to your data.",
    icon: "Cloud",
  },
];

// ─── About Page Content ─────────────────────────────────────────────────────

export const aboutContent = {
  story:
    "CloudKeeping was founded with a clear mission: to provide small and medium-sized businesses with the same caliber of financial services that large corporations take for granted. We believe that every business, regardless of size, deserves accurate books, proactive tax planning, and a trusted financial partner.",
  storyExtended:
    "Based in British Columbia, our team brings over a decade of experience in accounting, tax planning, and business advisory. We've built our practice on the principles of accuracy, transparency, and client-first service — and we measure our success by the success of the businesses we support.",
  values: [
    {
      title: "Accuracy",
      description:
        "Your financial records must be precise. We apply rigorous quality checks to every entry, reconciliation, and filing.",
    },
    {
      title: "Compliance",
      description:
        "We stay current with tax law and regulatory changes, ensuring your business is always in good standing with the CRA.",
    },
    {
      title: "Proactive Support",
      description:
        "We look ahead to identify opportunities and risks, not just report on what's already happened.",
    },
    {
      title: "Responsiveness",
      description:
        "When you have a question, you get a timely answer. We pride ourselves on being accessible and communicative.",
    },
  ],
  differentiators: [
    {
      title: "Structured Process",
      description:
        "A clear, repeatable workflow for onboarding, monthly deliverables, and year-end — so nothing falls through the cracks.",
    },
    {
      title: "Modern Tools",
      description:
        "Cloud-based platforms with real-time access, automated backups, and bank-level security for your financial data.",
    },
    {
      title: "Consistent Communication",
      description:
        "Regular check-ins, monthly reporting, and a direct line to your dedicated financial professional.",
    },
  ],
};
