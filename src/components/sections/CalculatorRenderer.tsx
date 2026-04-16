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

export function CalculatorRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "breakeven-analysis":
      return <BreakevenCalculator />;
    case "loan-amortization":
      return <LoanAmortizationCalculator />;
    case "rrsp-vs-tfsa":
      return <RRSPvsTFSACalculator />;
    case "gst-hst":
      return <GSTHSTCalculator />;
    case "retirement-planning":
      return <RetirementCalculator />;
    case "financial-ratios":
      return <FinancialRatiosCalculator />;
    case "business-valuation":
      return <BusinessValuationCalculator />;
    case "compound-savings":
      return <CompoundSavingsCalculator />;
    default:
      return <div className="text-muted">Calculator not available.</div>;
  }
}
