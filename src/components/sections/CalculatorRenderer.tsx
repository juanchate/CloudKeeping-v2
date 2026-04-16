"use client";

import {
  BreakevenCalculator,
  LoanAmortizationCalculator,
  RRSPvsTFSACalculator,
  GSTHSTCalculator,
  RetirementCalculator,
  FinancialRatiosCalculator,
  BusinessValuationCalculator,
  CompoundSavingsCalculator,
} from "./Calculators";

type LocaleKey = "en" | "es";

export function CalculatorRenderer({ slug, locale = "en" }: { slug: string; locale?: LocaleKey }) {
  switch (slug) {
    case "breakeven-analysis":
      return <BreakevenCalculator locale={locale} />;
    case "loan-amortization":
      return <LoanAmortizationCalculator locale={locale} />;
    case "rrsp-vs-tfsa":
      return <RRSPvsTFSACalculator locale={locale} />;
    case "gst-hst":
      return <GSTHSTCalculator locale={locale} />;
    case "retirement-planning":
      return <RetirementCalculator locale={locale} />;
    case "financial-ratios":
      return <FinancialRatiosCalculator locale={locale} />;
    case "business-valuation":
      return <BusinessValuationCalculator locale={locale} />;
    case "compound-savings":
      return <CompoundSavingsCalculator locale={locale} />;
    default:
      return <div className="text-muted">Calculator not available.</div>;
  }
}
