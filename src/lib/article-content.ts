import type { ArticleMeta } from "./tools-data";

export interface ArticleBody {
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    callout?: { title: string; body: string };
  }>;
  keyTakeaways: string[];
}

export const ARTICLE_BODIES: Record<string, ArticleBody> = {
  "new-immigrant-tax-guide": {
    intro:
      "If you've recently moved to Canada, filing your first tax return can feel overwhelming. This guide explains who qualifies as a resident for tax purposes, what income you need to report, and the credits and deductions newcomers are entitled to.",
    sections: [
      {
        heading: "Residency Status — the Starting Point",
        paragraphs: [
          "Canada taxes you based on residency, not citizenship. Your residency status determines what you have to report and when.",
          "A factual resident is someone with significant residential ties to Canada (home, spouse, dependents). A deemed resident stayed 183+ days in Canada in a year. A non-resident has no such ties and is taxed only on Canadian-source income.",
        ],
      },
      {
        heading: "What Do New Residents Report?",
        bullets: [
          "World-wide income from the date you became a resident of Canada.",
          "Income earned before you became a resident is generally not reported — only the Canadian-source portion.",
          "Assets owned on the date of arrival are 'deemed acquired' at fair market value (important for future capital gains).",
        ],
      },
      {
        heading: "First-Year Credits Available",
        paragraphs: [
          "You may be entitled to the Canada Child Benefit, GST/HST credit, and Climate Action Incentive in your first year — even with partial-year residency.",
          "The basic personal amount, age amount, and spousal credit are typically pro-rated if your stay is less than 90% of the year.",
        ],
        callout: {
          title: "Tip: File even if you owe nothing",
          body: "Filing a return is how CRA calculates your benefits — including the Canada Child Benefit. Missing a year can cost thousands in foregone credits.",
        },
      },
      {
        heading: "Common Mistakes",
        bullets: [
          "Failing to report foreign property > CAD 100,000 on Form T1135.",
          "Not declaring existing investments at FMV on the date of arrival.",
          "Missing the RRSP contribution rules — you need Canadian earned income first.",
        ],
      },
    ],
    keyTakeaways: [
      "Residency, not citizenship, determines your tax obligations in Canada.",
      "Report world-wide income from the date you became a resident.",
      "File a return to trigger benefits like CCB and GST credits.",
      "Disclose foreign property > CAD 100,000 on Form T1135.",
    ],
  },
  "dividend-vs-salary": {
    intro:
      "As an owner-manager of a Canadian corporation, you can pay yourself with salary, dividends, or both. Each option has different tax, cash flow, and retirement implications. Here's how to decide.",
    sections: [
      {
        heading: "Salary: Pros & Cons",
        bullets: [
          "Deductible expense to the corporation — reduces corporate tax.",
          "Counts as earned income, creating RRSP room (18% of earnings up to the annual limit).",
          "Triggers CPP contributions (employer + employee) — a real cost but forced retirement savings.",
          "Requires payroll setup, T4 issuance, and source deductions.",
        ],
      },
      {
        heading: "Dividends: Pros & Cons",
        bullets: [
          "Paid from after-tax corporate income — no corporate deduction.",
          "No CPP contributions, lower personal tax at modest levels.",
          "No RRSP room, no EI eligibility, no child care deduction.",
          "Simpler administration than payroll.",
        ],
      },
      {
        heading: "The Integration Principle",
        paragraphs: [
          "Canada's tax system is designed so that income earned in a corporation and flowed out as dividends produces roughly the same overall tax as a direct salary — this is called integration.",
          "However, integration is imperfect. In practice, the right mix depends on your cash flow needs, RRSP strategy, income splitting opportunities, and provincial rates.",
        ],
        callout: {
          title: "Rule of thumb",
          body: "If you need RRSP room, CPP coverage, or EI access, lean toward salary. If you're already maxed out on RRSPs and want simpler admin, dividends can be attractive.",
        },
      },
      {
        heading: "A Balanced Approach",
        paragraphs: [
          "Many owner-managers pay a base salary equal to the CPP maximum (to maximize RRSP room without overpaying CPP), then top up with dividends as needed.",
          "We run individualized integration calculations each year for our incorporated clients — small differences in provincial rates, dividend types (eligible vs. non-eligible), and GRIP balances can change the optimal mix.",
        ],
      },
    ],
    keyTakeaways: [
      "Salary builds RRSP room and CPP; dividends are simpler with less payroll overhead.",
      "Integration means overall tax is similar — but the mix matters for cash flow and retirement.",
      "Most owner-managers benefit from a blended approach updated annually.",
    ],
  },
  "small-business-tax-credits": {
    intro:
      "Canadian small businesses often overlook valuable tax credits that could reduce their tax bill by thousands. Here are the most commonly missed credits and how to claim them.",
    sections: [
      {
        heading: "The Small Business Deduction (SBD)",
        paragraphs: [
          "The SBD reduces federal corporate tax on the first $500,000 of active business income from 15% to 9%. Provincial rates drop similarly (e.g., BC from 12% to 2%).",
          "The SBD is phased out for corporations with taxable capital employed in Canada between $10M and $50M. Review your associated corporations — the $500,000 limit is shared.",
        ],
      },
      {
        heading: "Scientific Research & Experimental Development (SR&ED)",
        bullets: [
          "Refundable 35% federal credit on qualifying R&D expenditures for CCPCs (up to $3M).",
          "Non-refundable 15% credit on amounts above the cap or for non-CCPCs.",
          "Provincial top-ups can bring total recovery to 50–70% of qualifying costs.",
        ],
      },
      {
        heading: "Apprenticeship Job Creation Tax Credit",
        paragraphs: [
          "Employers in eligible Red Seal trades can claim a non-refundable credit of 10% of salary paid to apprentices (max $2,000 per apprentice per year).",
        ],
      },
      {
        heading: "Investment Tax Credits",
        bullets: [
          "Atlantic Investment Tax Credit — 10% on qualifying property.",
          "Regional ITCs for specific industries.",
          "Clean technology and zero-emission vehicle ITCs (new for 2024+).",
        ],
      },
      {
        heading: "Digital Tax Credits",
        paragraphs: [
          "The Canada Digital Adoption Program offered grants and 0% loans for technology upgrades. While certain streams have ended, provincial equivalents continue.",
        ],
        callout: {
          title: "Don't leave money on the table",
          body: "We review every client's return for missed credits — contact us for a complimentary credit assessment before your next filing.",
        },
      },
    ],
    keyTakeaways: [
      "The SBD is the single most important credit — ensure associated corporations aren't grinding yours.",
      "SR&ED applies to far more businesses than most realize — software dev, process improvements, etc.",
      "Apprenticeship, regional, and clean tech credits add up quickly for eligible businesses.",
    ],
  },
  "year-end-tax-planning": {
    intro:
      "As December 31st approaches, there are several strategies Canadian individuals and business owners can execute before year-end to reduce taxes for the current year. Some have hard deadlines — don't miss them.",
    sections: [
      {
        heading: "Before December 31 (Personal)",
        bullets: [
          "Realize capital losses to offset gains earned earlier in the year.",
          "Make charitable donations — receipt date must be before Dec 31.",
          "Pay deductible expenses (medical, professional dues, investment fees).",
          "Contribute to a TFSA — unused room carries forward but contribution room restarts each Jan 1.",
          "Convert RRSP to RRIF by Dec 31 of the year you turn 71.",
        ],
      },
      {
        heading: "60 Days Into the New Year (Personal)",
        paragraphs: [
          "You have until the first 60 days of the new year (typically March 1) to make RRSP contributions that deduct against the prior tax year.",
          "FHSA contributions follow the calendar year — must be made by Dec 31.",
        ],
      },
      {
        heading: "For Corporations",
        bullets: [
          "Bonus declarations must be accrued within your fiscal year end and paid within 180 days.",
          "Pay dividends before year-end if you want integration for the owner's personal return.",
          "Accelerate purchases to claim CCA (half-year rule) — but only if it makes business sense.",
          "Review shareholder loan balances — amounts owing to the corp for > 2 years become taxable income.",
        ],
      },
      {
        heading: "Common Year-End Moves",
        paragraphs: [
          "Income splitting with family via dividends from a family trust, prescribed rate loans, or TOSI-compliant arrangements.",
          "Charitable giving via corporate-owned life insurance or flow-through shares.",
          "Tax-loss selling — but beware the 30-day superficial loss rule.",
        ],
        callout: {
          title: "Our year-end review process",
          body: "For every incorporated client, we run a year-end tax planning session in October/November to implement these strategies before deadlines pass.",
        },
      },
    ],
    keyTakeaways: [
      "December 31 is a hard deadline for donations, tax-loss selling, and FHSA/TFSA optimization.",
      "RRSP contributions have a March 1 deadline for prior-year deduction.",
      "Corporate year-end planning should start in October for maximum benefit.",
    ],
  },
  "canadian-payroll-guide": {
    intro:
      "Running payroll in Canada means juggling CPP, EI, federal/provincial tax, ROEs, T4s, and workers' compensation. This guide walks through the complete annual compliance cycle.",
    sections: [
      {
        heading: "Registering as an Employer",
        paragraphs: [
          "Before issuing your first paycheque, register for a CRA payroll account (RP suffix on your BN). You'll also need a WorkSafeBC (or provincial equivalent) account.",
          "If you're incorporating, the BN is created with your federal incorporation; the RP subaccount is added separately.",
        ],
      },
      {
        heading: "Source Deductions: What to Withhold",
        bullets: [
          "Federal income tax — use the TD1 form and CRA payroll tables.",
          "Provincial income tax — varies by province.",
          "CPP contributions — 5.95% (2024) on earnings between $3,500 and $68,500, plus 4% CPP2 on amounts between $68,500 and $73,200.",
          "EI premiums — 1.64% (2024) on earnings up to $63,200.",
        ],
      },
      {
        heading: "Remittance Frequency",
        paragraphs: [
          "CRA categorizes employers based on average monthly withholding (AMWA). New employers typically remit monthly — due the 15th of the following month.",
          "Larger employers may be required to remit twice-monthly or weekly. Failure to remit on time triggers 3–10% penalties.",
        ],
      },
      {
        heading: "T4 Slips and Year-End Reporting",
        bullets: [
          "T4 slips must be filed with CRA and distributed to employees by the last day of February.",
          "T4 Summary reconciles all amounts withheld and remitted for the year.",
          "RL-1 slips for Quebec employees.",
        ],
      },
      {
        heading: "Records of Employment (ROE)",
        paragraphs: [
          "Issue an ROE whenever an employee has an interruption of earnings (termination, leave, etc.) within 5 days. Most modern payroll software submits ROEs electronically.",
        ],
        callout: {
          title: "We handle payroll end-to-end",
          body: "Our clients offload payroll completely — we handle registrations, remittances, T4s, ROEs, and WorkSafeBC reporting.",
        },
      },
    ],
    keyTakeaways: [
      "Register for CRA payroll account + WorkSafeBC before first payroll.",
      "Remit CPP, EI, and income tax by the 15th (or earlier for larger employers).",
      "File T4 and RL-1 slips by the last day of February.",
      "Issue ROEs within 5 days of earnings interruption.",
    ],
  },
  "capital-gains-2025": {
    intro:
      "The capital gains inclusion rate changes announced in the 2024 federal budget have significantly affected tax planning for Canadians. Here's what has actually taken effect, what's been deferred, and what it means for your planning.",
    sections: [
      {
        heading: "The Proposed Change",
        paragraphs: [
          "The 2024 Budget proposed increasing the capital gains inclusion rate from 50% to 66.67% on:",
          "— Individuals: gains exceeding $250,000 per year.",
          "— Corporations and most trusts: on every dollar of capital gain.",
        ],
      },
      {
        heading: "Current Status",
        paragraphs: [
          "Following political changes in early 2025, the federal government deferred implementation. As of the current tax year, the inclusion rate for most taxpayers remains at 50%.",
          "Always confirm with your advisor as the rules continue to evolve.",
        ],
        callout: {
          title: "Rules change. Advice should too.",
          body: "We actively monitor CRA and Department of Finance updates. If the inclusion rate changes, we'll reach out to affected clients proactively.",
        },
      },
      {
        heading: "Planning Implications",
        bullets: [
          "Consider 'crystallizing' gains in years with lower inclusion rates — especially if selling a business.",
          "Review the Lifetime Capital Gains Exemption (LCGE) — now $1.25M for qualified small business corporation shares.",
          "Corporations may want to hold less passive investment to minimize the impact.",
        ],
      },
      {
        heading: "The Principal Residence Exemption",
        paragraphs: [
          "The PRE still applies to fully exempt gains on your primary residence. Be careful with properties used partially for rental or business — the exemption is pro-rated.",
          "The new Underused Housing Tax (UHT) continues to apply separately to vacant or underused residential properties.",
        ],
      },
    ],
    keyTakeaways: [
      "The 66.67% inclusion rate proposal has been deferred as of 2025 — 50% remains the norm.",
      "The LCGE for QSBC shares is now $1.25M.",
      "Actively review sale timing and inclusion rate exposure each year.",
    ],
  },
};

export function getArticleBody(slug: string): ArticleBody | undefined {
  return ARTICLE_BODIES[slug];
}

export type { ArticleMeta };
