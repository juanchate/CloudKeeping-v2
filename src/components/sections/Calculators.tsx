"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const fmt = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
const fmtDecimal = (n: number, decimals = 2) =>
  n.toLocaleString("en-CA", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// ---------- Shared form components ----------

export function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  step,
  type = "number",
}: {
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  type?: "number" | "text";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none",
            prefix && "pl-7",
            suffix && "pr-10"
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ResultRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-3 rounded-lg px-4 py-3",
        emphasized
          ? "bg-accent/10 border border-accent/30"
          : "bg-surface"
      )}
    >
      <span className={cn("text-sm", emphasized ? "font-semibold text-foreground" : "text-muted")}>{label}</span>
      <span className={cn("text-base font-bold tabular-nums", emphasized ? "text-accent" : "text-foreground")}>
        {value}
      </span>
    </div>
  );
}

// ---------- 1. Breakeven Analysis ----------

export function BreakevenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("50000");
  const [pricePerUnit, setPricePerUnit] = useState("100");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("40");

  const fc = Number(fixedCosts) || 0;
  const p = Number(pricePerUnit) || 0;
  const v = Number(variableCostPerUnit) || 0;
  const contribMargin = p - v;
  const breakevenUnits = contribMargin > 0 ? Math.ceil(fc / contribMargin) : 0;
  const breakevenRevenue = breakevenUnits * p;
  const marginPct = p > 0 ? (contribMargin / p) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4">
        <Field label="Fixed Costs (per period)" value={fixedCosts} onChange={setFixedCosts} prefix="$" />
        <Field label="Price per Unit" value={pricePerUnit} onChange={setPricePerUnit} prefix="$" />
        <Field label="Variable Cost per Unit" value={variableCostPerUnit} onChange={setVariableCostPerUnit} prefix="$" />
      </div>
      <div className="space-y-3">
        <ResultRow label="Contribution Margin / Unit" value={fmt(contribMargin)} />
        <ResultRow label="Contribution Margin %" value={`${fmtDecimal(marginPct, 1)}%`} />
        <ResultRow label="Break-Even Units" value={breakevenUnits.toLocaleString()} emphasized />
        <ResultRow label="Break-Even Revenue" value={fmt(breakevenRevenue)} emphasized />
      </div>
    </div>
  );
}

// ---------- 2. Loan Amortization ----------

export function LoanAmortizationCalculator() {
  const [principal, setPrincipal] = useState("300000");
  const [rate, setRate] = useState("5.5");
  const [term, setTerm] = useState("25");
  const [freq, setFreq] = useState("12"); // payments per year

  const p = Number(principal) || 0;
  const r = (Number(rate) || 0) / 100;
  const n = Number(term) || 0;
  const f = Number(freq) || 12;

  const periods = n * f;
  const ratePerPeriod = r / f;
  const payment =
    ratePerPeriod === 0
      ? p / periods
      : (p * ratePerPeriod) / (1 - Math.pow(1 + ratePerPeriod, -periods));
  const totalPaid = payment * periods;
  const totalInterest = totalPaid - p;

  // Generate schedule for first 12 periods
  const schedule = useMemo(() => {
    const rows: Array<{
      period: number;
      payment: number;
      interest: number;
      principal: number;
      balance: number;
    }> = [];
    let balance = p;
    for (let i = 1; i <= Math.min(periods, 60); i++) {
      const interest = balance * ratePerPeriod;
      const principalPaid = payment - interest;
      balance -= principalPaid;
      rows.push({
        period: i,
        payment,
        interest,
        principal: principalPaid,
        balance: Math.max(0, balance),
      });
    }
    return rows;
  }, [p, ratePerPeriod, payment, periods]);

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <Field label="Principal" value={principal} onChange={setPrincipal} prefix="$" />
          <Field label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" />
          <Field label="Term (years)" value={term} onChange={setTerm} />
          <Select
            label="Payments per Year"
            value={freq}
            onChange={setFreq}
            options={[
              { value: "12", label: "Monthly (12)" },
              { value: "26", label: "Bi-weekly (26)" },
              { value: "52", label: "Weekly (52)" },
              { value: "24", label: "Semi-monthly (24)" },
            ]}
          />
        </div>
        <div className="space-y-3">
          <ResultRow label="Payment Amount" value={fmt(payment)} emphasized />
          <ResultRow label="Total Interest" value={fmt(totalInterest)} />
          <ResultRow label="Total Amount Paid" value={fmt(totalPaid)} />
          <ResultRow label="Total Payments" value={periods.toLocaleString()} />
        </div>
      </div>

      {schedule.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 text-sm font-semibold text-foreground">Amortization Schedule (first {schedule.length} payments)</h4>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-2.5 text-left">#</th>
                  <th className="px-4 py-2.5 text-right">Payment</th>
                  <th className="px-4 py-2.5 text-right">Interest</th>
                  <th className="px-4 py-2.5 text-right">Principal</th>
                  <th className="px-4 py-2.5 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schedule.map((row) => (
                  <tr key={row.period} className="hover:bg-surface">
                    <td className="px-4 py-2 text-foreground">{row.period}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-foreground">{fmt(row.payment)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-error">{fmt(row.interest)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-success">{fmt(row.principal)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-foreground">{fmt(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- 3. RRSP vs TFSA ----------

export function RRSPvsTFSACalculator() {
  const [contribution, setContribution] = useState("6000");
  const [marginalNow, setMarginalNow] = useState("35");
  const [marginalLater, setMarginalLater] = useState("25");
  const [years, setYears] = useState("25");
  const [rate, setRate] = useState("7");

  const c = Number(contribution) || 0;
  const mNow = (Number(marginalNow) || 0) / 100;
  const mLater = (Number(marginalLater) || 0) / 100;
  const y = Number(years) || 0;
  const r = (Number(rate) || 0) / 100;

  // TFSA: contribution with after-tax dollars, grows tax-free, withdrawn tax-free
  // Assume same after-tax cost; so TFSA contribution = c * (1 - mNow) if RRSP contribution is c
  // Actually, standard comparison: same upfront dollar amount invested
  const growth = Math.pow(1 + r, y);
  const rrspFuture = c * growth;
  const rrspAfterTax = rrspFuture * (1 - mLater);
  const tfsaAfterTaxContrib = c * (1 - mNow);
  const tfsaFuture = tfsaAfterTaxContrib * growth;

  const better = rrspAfterTax > tfsaFuture ? "RRSP" : tfsaFuture > rrspAfterTax ? "TFSA" : "Tie";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4">
        <Field label="Contribution Amount (pre-tax $)" value={contribution} onChange={setContribution} prefix="$" />
        <Field label="Marginal Tax Rate NOW" value={marginalNow} onChange={setMarginalNow} suffix="%" />
        <Field label="Marginal Tax Rate AT WITHDRAWAL" value={marginalLater} onChange={setMarginalLater} suffix="%" />
        <Field label="Years to Withdrawal" value={years} onChange={setYears} />
        <Field label="Annual Return" value={rate} onChange={setRate} suffix="%" />
      </div>
      <div className="space-y-3">
        <ResultRow label="RRSP Future Value (gross)" value={fmt(rrspFuture)} />
        <ResultRow label="RRSP After-Tax" value={fmt(rrspAfterTax)} emphasized={better === "RRSP"} />
        <ResultRow label="TFSA Effective Contribution" value={fmt(tfsaAfterTaxContrib)} />
        <ResultRow label="TFSA After-Tax" value={fmt(tfsaFuture)} emphasized={better === "TFSA"} />
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-foreground">
          <div className="mb-1 text-xs font-semibold uppercase text-accent">Recommendation</div>
          {better === "Tie" ? (
            <span>Both produce the same after-tax result.</span>
          ) : (
            <span>
              The <strong>{better}</strong> wins by{" "}
              <strong>
                {fmt(Math.abs(rrspAfterTax - tfsaFuture))}
              </strong>{" "}
              based on your inputs.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- 4. GST / HST ----------

const GST_RATES: Record<string, number> = {
  AB: 5, BC: 5, MB: 5, NB: 15, NL: 15, NS: 15, NT: 5, NU: 5,
  ON: 13, PE: 15, QC: 5, SK: 5, YT: 5,
};

export function GSTHSTCalculator() {
  const [amount, setAmount] = useState("1000");
  const [province, setProvince] = useState("BC");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const amt = Number(amount) || 0;
  const rate = GST_RATES[province] / 100;

  let base = amt;
  let tax = 0;
  let total = 0;

  if (mode === "add") {
    base = amt;
    tax = amt * rate;
    total = amt + tax;
  } else {
    total = amt;
    base = amt / (1 + rate);
    tax = amt - base;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4">
        <Field label="Amount" value={amount} onChange={setAmount} prefix="$" />
        <Select
          label="Province / Territory"
          value={province}
          onChange={setProvince}
          options={Object.keys(GST_RATES).map((k) => ({ value: k, label: `${k} — ${GST_RATES[k]}%` }))}
        />
        <div>
          <span className="mb-1.5 block text-xs font-medium text-muted">Mode</span>
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-white p-1">
            {[
              { id: "add", label: "Add tax" },
              { id: "remove", label: "Remove tax" },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => setMode(o.id as "add" | "remove")}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  mode === o.id
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-surface hover:text-foreground"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <ResultRow label={`Pre-Tax (${province})`} value={fmt(base)} />
        <ResultRow label={`${GST_RATES[province]}% Tax`} value={fmt(tax)} emphasized />
        <ResultRow label="Total (incl. tax)" value={fmt(total)} />
      </div>
    </div>
  );
}

// ---------- 5. Retirement Planning ----------

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("35");
  const [retireAge, setRetireAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("25000");
  const [monthlyContrib, setMonthlyContrib] = useState("800");
  const [rate, setRate] = useState("6");
  const [desiredIncome, setDesiredIncome] = useState("50000");
  const [yearsInRetirement, setYearsInRetirement] = useState("25");

  const ca = Number(currentAge) || 0;
  const ra = Number(retireAge) || 0;
  const yearsToRetire = Math.max(0, ra - ca);
  const r = (Number(rate) || 0) / 100;
  const fv =
    (Number(currentSavings) || 0) * Math.pow(1 + r, yearsToRetire) +
    (Number(monthlyContrib) || 0) * 12 *
      (Math.pow(1 + r, yearsToRetire) - 1) / (r || 1);

  const needed = (Number(desiredIncome) || 0) *
    (1 - Math.pow(1 + r * 0.5, -(Number(yearsInRetirement) || 0))) /
    (r * 0.5 || 1);

  const surplus = fv - needed;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Current Age" value={currentAge} onChange={setCurrentAge} />
        <Field label="Retirement Age" value={retireAge} onChange={setRetireAge} />
        <Field label="Current Savings" value={currentSavings} onChange={setCurrentSavings} prefix="$" />
        <Field label="Monthly Contribution" value={monthlyContrib} onChange={setMonthlyContrib} prefix="$" />
        <Field label="Annual Return" value={rate} onChange={setRate} suffix="%" />
        <Field label="Desired Annual Income" value={desiredIncome} onChange={setDesiredIncome} prefix="$" />
        <Field label="Years in Retirement" value={yearsInRetirement} onChange={setYearsInRetirement} />
      </div>
      <div className="space-y-3">
        <ResultRow label="Years Until Retirement" value={`${yearsToRetire}`} />
        <ResultRow label="Projected Savings at Retirement" value={fmt(fv)} emphasized />
        <ResultRow label="Capital Needed" value={fmt(needed)} />
        <ResultRow
          label={surplus >= 0 ? "Projected Surplus" : "Projected Shortfall"}
          value={fmt(Math.abs(surplus))}
          emphasized
        />
        {surplus < 0 && (
          <p className="rounded-lg bg-error/10 p-3 text-xs text-error">
            You may need to increase contributions or retire later to meet your goal.
          </p>
        )}
      </div>
    </div>
  );
}

// ---------- 6. Financial Ratios ----------

export function FinancialRatiosCalculator() {
  const [currentAssets, setCurrentAssets] = useState("250000");
  const [currentLiab, setCurrentLiab] = useState("120000");
  const [inventory, setInventory] = useState("50000");
  const [totalLiab, setTotalLiab] = useState("350000");
  const [equity, setEquity] = useState("400000");
  const [netIncome, setNetIncome] = useState("85000");
  const [revenue, setRevenue] = useState("1200000");
  const [totalAssets, setTotalAssets] = useState("750000");

  const ca = Number(currentAssets) || 0;
  const cl = Number(currentLiab) || 0;
  const inv = Number(inventory) || 0;
  const tl = Number(totalLiab) || 0;
  const eq = Number(equity) || 0;
  const ni = Number(netIncome) || 0;
  const rev = Number(revenue) || 0;
  const ta = Number(totalAssets) || 0;

  const current = cl > 0 ? ca / cl : 0;
  const quick = cl > 0 ? (ca - inv) / cl : 0;
  const debtEquity = eq > 0 ? tl / eq : 0;
  const roe = eq > 0 ? (ni / eq) * 100 : 0;
  const roa = ta > 0 ? (ni / ta) * 100 : 0;
  const netMargin = rev > 0 ? (ni / rev) * 100 : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Current Assets" value={currentAssets} onChange={setCurrentAssets} prefix="$" />
        <Field label="Current Liabilities" value={currentLiab} onChange={setCurrentLiab} prefix="$" />
        <Field label="Inventory" value={inventory} onChange={setInventory} prefix="$" />
        <Field label="Total Liabilities" value={totalLiab} onChange={setTotalLiab} prefix="$" />
        <Field label="Shareholders' Equity" value={equity} onChange={setEquity} prefix="$" />
        <Field label="Net Income" value={netIncome} onChange={setNetIncome} prefix="$" />
        <Field label="Revenue" value={revenue} onChange={setRevenue} prefix="$" />
        <Field label="Total Assets" value={totalAssets} onChange={setTotalAssets} prefix="$" />
      </div>
      <div className="space-y-3">
        <ResultRow label="Current Ratio" value={fmtDecimal(current)} emphasized={current >= 1.5} />
        <ResultRow label="Quick Ratio" value={fmtDecimal(quick)} emphasized={quick >= 1} />
        <ResultRow label="Debt / Equity" value={fmtDecimal(debtEquity)} />
        <ResultRow label="Return on Equity" value={`${fmtDecimal(roe, 1)}%`} emphasized={roe >= 15} />
        <ResultRow label="Return on Assets" value={`${fmtDecimal(roa, 1)}%`} />
        <ResultRow label="Net Profit Margin" value={`${fmtDecimal(netMargin, 1)}%`} />
      </div>
    </div>
  );
}

// ---------- 7. Business Valuation ----------

export function BusinessValuationCalculator() {
  const [annualEarnings, setAnnualEarnings] = useState("200000");
  const [industryMultiple, setIndustryMultiple] = useState("4");
  const [revenue, setRevenue] = useState("1500000");
  const [revenueMultiple, setRevenueMultiple] = useState("1.2");
  const [assets, setAssets] = useState("500000");
  const [liabilities, setLiabilities] = useState("150000");

  const earnings = Number(annualEarnings) || 0;
  const eMult = Number(industryMultiple) || 0;
  const rev = Number(revenue) || 0;
  const rMult = Number(revenueMultiple) || 0;
  const a = Number(assets) || 0;
  const l = Number(liabilities) || 0;

  const earningsValuation = earnings * eMult;
  const revenueValuation = rev * rMult;
  const assetValuation = a - l;
  const average = (earningsValuation + revenueValuation + assetValuation) / 3;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Annual Earnings (EBITDA)" value={annualEarnings} onChange={setAnnualEarnings} prefix="$" />
        <Field label="Industry Earnings Multiple" value={industryMultiple} onChange={setIndustryMultiple} suffix="x" />
        <Field label="Annual Revenue" value={revenue} onChange={setRevenue} prefix="$" />
        <Field label="Revenue Multiple" value={revenueMultiple} onChange={setRevenueMultiple} suffix="x" />
        <Field label="Total Assets" value={assets} onChange={setAssets} prefix="$" />
        <Field label="Total Liabilities" value={liabilities} onChange={setLiabilities} prefix="$" />
      </div>
      <div className="space-y-3">
        <ResultRow label="Earnings Method" value={fmt(earningsValuation)} />
        <ResultRow label="Revenue Method" value={fmt(revenueValuation)} />
        <ResultRow label="Asset-Based Method" value={fmt(assetValuation)} />
        <ResultRow label="Average (Blended)" value={fmt(average)} emphasized />
        <p className="text-xs text-muted">
          A proper business valuation considers cash flow quality, customer concentration, growth
          prospects, and market conditions. Contact us for a detailed assessment.
        </p>
      </div>
    </div>
  );
}

// ---------- 8. Compound Savings ----------

export function CompoundSavingsCalculator() {
  const [principal, setPrincipal] = useState("5000");
  const [monthly, setMonthly] = useState("400");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("20");

  const p = Number(principal) || 0;
  const m = Number(monthly) || 0;
  const r = (Number(rate) || 0) / 100;
  const y = Number(years) || 0;

  const fv = p * Math.pow(1 + r, y) + m * 12 * (Math.pow(1 + r, y) - 1) / (r || 1);
  const totalContributed = p + m * 12 * y;
  const interestEarned = fv - totalContributed;

  // Year-by-year projection
  const yearly = useMemo(() => {
    const rows: Array<{ year: number; balance: number; contributed: number; interest: number }> = [];
    let balance = p;
    let contributed = p;
    for (let i = 1; i <= y; i++) {
      balance = balance * (1 + r) + m * 12;
      contributed += m * 12;
      rows.push({
        year: i,
        balance,
        contributed,
        interest: balance - contributed,
      });
    }
    return rows;
  }, [p, m, r, y]);

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <Field label="Initial Principal" value={principal} onChange={setPrincipal} prefix="$" />
          <Field label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" />
          <Field label="Annual Return Rate" value={rate} onChange={setRate} suffix="%" />
          <Field label="Years" value={years} onChange={setYears} />
        </div>
        <div className="space-y-3">
          <ResultRow label="Total Contributed" value={fmt(totalContributed)} />
          <ResultRow label="Interest Earned" value={fmt(interestEarned)} />
          <ResultRow label="Final Balance" value={fmt(fv)} emphasized />
          <ResultRow
            label="Growth Multiplier"
            value={`${fmtDecimal(fv / Math.max(totalContributed, 1), 2)}x`}
          />
        </div>
      </div>

      {yearly.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-2.5 text-left">Year</th>
                <th className="px-4 py-2.5 text-right">Contributed</th>
                <th className="px-4 py-2.5 text-right">Interest</th>
                <th className="px-4 py-2.5 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {yearly
                .filter((_, i) => i % Math.max(1, Math.floor(yearly.length / 20)) === 0 || yearly.length <= 25)
                .map((row) => (
                  <tr key={row.year} className="hover:bg-surface">
                    <td className="px-4 py-2 text-foreground">{row.year}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-muted">{fmt(row.contributed)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-success">{fmt(row.interest)}</td>
                    <td className="px-4 py-2 text-right tabular-nums font-semibold text-foreground">{fmt(row.balance)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

