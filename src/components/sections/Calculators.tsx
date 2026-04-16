"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type LocaleKey = "en" | "es";

const fmtLocale = (locale: LocaleKey) => (n: number) =>
  n.toLocaleString(locale === "es" ? "es-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
const fmtDecimalLocale = (locale: LocaleKey) => (n: number, decimals = 2) =>
  n.toLocaleString(locale === "es" ? "es-CA" : "en-CA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const CALC_T = {
  en: {
    // Breakeven
    fixedCosts: "Fixed Costs (per period)",
    pricePerUnit: "Price per Unit",
    variableCost: "Variable Cost per Unit",
    contribMargin: "Contribution Margin / Unit",
    contribMarginPct: "Contribution Margin %",
    breakevenUnits: "Break-Even Units",
    breakevenRevenue: "Break-Even Revenue",
    // Loan
    principal: "Principal",
    annualRate: "Annual Interest Rate",
    termYears: "Term (years)",
    paymentsPerYear: "Payments per Year",
    paymentAmount: "Payment Amount",
    totalInterest: "Total Interest",
    totalPaid: "Total Amount Paid",
    totalPayments: "Total Payments",
    freqMonthly: "Monthly (12)",
    freqBiweekly: "Bi-weekly (26)",
    freqWeekly: "Weekly (52)",
    freqSemi: "Semi-monthly (24)",
    schedule: (n: number) => `Amortization Schedule (first ${n} payments)`,
    payment: "Payment",
    interest: "Interest",
    principalCol: "Principal",
    balance: "Balance",
    // RRSP vs TFSA
    contribAmt: "Contribution Amount (pre-tax $)",
    mNow: "Marginal Tax Rate NOW",
    mLater: "Marginal Tax Rate AT WITHDRAWAL",
    yearsToWith: "Years to Withdrawal",
    annualReturn: "Annual Return",
    rrspFV: "RRSP Future Value (gross)",
    rrspAfter: "RRSP After-Tax",
    tfsaContrib: "TFSA Effective Contribution",
    tfsaAfter: "TFSA After-Tax",
    recommendation: "Recommendation",
    tie: "Both produce the same after-tax result.",
    winsBy: (winner: string, amount: string) => (
      <>
        The <strong>{winner}</strong> wins by <strong>{amount}</strong> based on your inputs.
      </>
    ),
    // GST/HST
    amount: "Amount",
    provinceTerritory: "Province / Territory",
    mode: "Mode",
    addTax: "Add tax",
    removeTax: "Remove tax",
    preTax: (p: string) => `Pre-Tax (${p})`,
    taxAt: (r: number) => `${r}% Tax`,
    totalInclTax: "Total (incl. tax)",
    // Retirement
    currentAge: "Current Age",
    retireAge: "Retirement Age",
    currentSavings: "Current Savings",
    monthlyContrib: "Monthly Contribution",
    desiredIncome: "Desired Annual Income",
    yearsRetirement: "Years in Retirement",
    yearsUntil: "Years Until Retirement",
    projSavings: "Projected Savings at Retirement",
    capitalNeeded: "Capital Needed",
    projSurplus: "Projected Surplus",
    projShortfall: "Projected Shortfall",
    shortfallMsg:
      "You may need to increase contributions or retire later to meet your goal.",
    // Ratios
    currentAssets: "Current Assets",
    currentLiab: "Current Liabilities",
    inventory: "Inventory",
    totalLiab: "Total Liabilities",
    equity: "Shareholders' Equity",
    netIncome: "Net Income",
    revenue: "Revenue",
    totalAssets: "Total Assets",
    currentRatio: "Current Ratio",
    quickRatio: "Quick Ratio",
    debtEquity: "Debt / Equity",
    roe: "Return on Equity",
    roa: "Return on Assets",
    netMargin: "Net Profit Margin",
    // Valuation
    annualEarnings: "Annual Earnings (EBITDA)",
    industryMultiple: "Industry Earnings Multiple",
    annualRevenue: "Annual Revenue",
    revenueMultiple: "Revenue Multiple",
    liabilities: "Total Liabilities",
    earningsMethod: "Earnings Method",
    revenueMethod: "Revenue Method",
    assetMethod: "Asset-Based Method",
    blended: "Average (Blended)",
    valuationNote:
      "A proper business valuation considers cash flow quality, customer concentration, growth prospects, and market conditions. Contact us for a detailed assessment.",
    // Compound
    initialPrincipal: "Initial Principal",
    annualReturnRate: "Annual Return Rate",
    years: "Years",
    totalContrib: "Total Contributed",
    interestEarned: "Interest Earned",
    finalBalance: "Final Balance",
    growthMult: "Growth Multiplier",
    year: "Year",
    contributed: "Contributed",
  },
  es: {
    fixedCosts: "Costos Fijos (por período)",
    pricePerUnit: "Precio por Unidad",
    variableCost: "Costo Variable por Unidad",
    contribMargin: "Margen de Contribución / Unidad",
    contribMarginPct: "Margen de Contribución %",
    breakevenUnits: "Unidades en Punto de Equilibrio",
    breakevenRevenue: "Ingresos en Punto de Equilibrio",
    principal: "Capital",
    annualRate: "Tasa de Interés Anual",
    termYears: "Plazo (años)",
    paymentsPerYear: "Pagos por Año",
    paymentAmount: "Monto del Pago",
    totalInterest: "Intereses Totales",
    totalPaid: "Monto Total Pagado",
    totalPayments: "Total de Pagos",
    freqMonthly: "Mensual (12)",
    freqBiweekly: "Quincenal (26)",
    freqWeekly: "Semanal (52)",
    freqSemi: "Semimensual (24)",
    schedule: (n: number) => `Tabla de Amortización (primeros ${n} pagos)`,
    payment: "Pago",
    interest: "Interés",
    principalCol: "Capital",
    balance: "Saldo",
    contribAmt: "Monto del Aporte (antes de impuestos $)",
    mNow: "Tasa Marginal AHORA",
    mLater: "Tasa Marginal AL RETIRO",
    yearsToWith: "Años hasta el Retiro",
    annualReturn: "Retorno Anual",
    rrspFV: "Valor Futuro RRSP (bruto)",
    rrspAfter: "RRSP Después de Impuestos",
    tfsaContrib: "Aporte Efectivo TFSA",
    tfsaAfter: "TFSA Después de Impuestos",
    recommendation: "Recomendación",
    tie: "Ambos producen el mismo resultado después de impuestos.",
    winsBy: (winner: string, amount: string) => (
      <>
        <strong>{winner}</strong> gana por <strong>{amount}</strong> según tus datos.
      </>
    ),
    amount: "Monto",
    provinceTerritory: "Provincia / Territorio",
    mode: "Modo",
    addTax: "Agregar impuesto",
    removeTax: "Quitar impuesto",
    preTax: (p: string) => `Antes de impuestos (${p})`,
    taxAt: (r: number) => `Impuesto ${r}%`,
    totalInclTax: "Total (con impuesto)",
    currentAge: "Edad Actual",
    retireAge: "Edad de Retiro",
    currentSavings: "Ahorros Actuales",
    monthlyContrib: "Aporte Mensual",
    desiredIncome: "Ingreso Anual Deseado",
    yearsRetirement: "Años en Retiro",
    yearsUntil: "Años Hasta el Retiro",
    projSavings: "Ahorros Proyectados al Retiro",
    capitalNeeded: "Capital Necesario",
    projSurplus: "Superávit Proyectado",
    projShortfall: "Déficit Proyectado",
    shortfallMsg:
      "Podrías necesitar aumentar los aportes o retirarte más tarde para alcanzar tu meta.",
    currentAssets: "Activos Corrientes",
    currentLiab: "Pasivos Corrientes",
    inventory: "Inventario",
    totalLiab: "Pasivos Totales",
    equity: "Patrimonio de los Accionistas",
    netIncome: "Utilidad Neta",
    revenue: "Ingresos",
    totalAssets: "Activos Totales",
    currentRatio: "Razón Corriente",
    quickRatio: "Razón Ácida",
    debtEquity: "Deuda / Patrimonio",
    roe: "Retorno sobre Patrimonio",
    roa: "Retorno sobre Activos",
    netMargin: "Margen Neto",
    annualEarnings: "Ganancias Anuales (EBITDA)",
    industryMultiple: "Múltiplo de Ganancias (industria)",
    annualRevenue: "Ingresos Anuales",
    revenueMultiple: "Múltiplo de Ingresos",
    liabilities: "Pasivos Totales",
    earningsMethod: "Método de Ganancias",
    revenueMethod: "Método de Ingresos",
    assetMethod: "Método de Activos",
    blended: "Promedio (Mezclado)",
    valuationNote:
      "Una valoración empresarial adecuada considera la calidad del flujo de caja, concentración de clientes, perspectivas de crecimiento y condiciones del mercado. Contáctanos para una evaluación detallada.",
    initialPrincipal: "Capital Inicial",
    annualReturnRate: "Tasa de Retorno Anual",
    years: "Años",
    totalContrib: "Total Aportado",
    interestEarned: "Intereses Ganados",
    finalBalance: "Balance Final",
    growthMult: "Multiplicador de Crecimiento",
    year: "Año",
    contributed: "Aportado",
  },
} as const;

type LocaleProp = { locale?: LocaleKey };

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
        emphasized ? "bg-accent/10 border border-accent/30" : "bg-surface"
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

export function BreakevenCalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmt = fmtLocale(locale);
  const fmtDecimal = fmtDecimalLocale(locale);
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
        <Field label={t.fixedCosts} value={fixedCosts} onChange={setFixedCosts} prefix="$" />
        <Field label={t.pricePerUnit} value={pricePerUnit} onChange={setPricePerUnit} prefix="$" />
        <Field label={t.variableCost} value={variableCostPerUnit} onChange={setVariableCostPerUnit} prefix="$" />
      </div>
      <div className="space-y-3">
        <ResultRow label={t.contribMargin} value={fmt(contribMargin)} />
        <ResultRow label={t.contribMarginPct} value={`${fmtDecimal(marginPct, 1)}%`} />
        <ResultRow label={t.breakevenUnits} value={breakevenUnits.toLocaleString()} emphasized />
        <ResultRow label={t.breakevenRevenue} value={fmt(breakevenRevenue)} emphasized />
      </div>
    </div>
  );
}

// ---------- 2. Loan Amortization ----------

export function LoanAmortizationCalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmt = fmtLocale(locale);
  const [principal, setPrincipal] = useState("300000");
  const [rate, setRate] = useState("5.5");
  const [term, setTerm] = useState("25");
  const [freq, setFreq] = useState("12");

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
          <Field label={t.principal} value={principal} onChange={setPrincipal} prefix="$" />
          <Field label={t.annualRate} value={rate} onChange={setRate} suffix="%" />
          <Field label={t.termYears} value={term} onChange={setTerm} />
          <Select
            label={t.paymentsPerYear}
            value={freq}
            onChange={setFreq}
            options={[
              { value: "12", label: t.freqMonthly },
              { value: "26", label: t.freqBiweekly },
              { value: "52", label: t.freqWeekly },
              { value: "24", label: t.freqSemi },
            ]}
          />
        </div>
        <div className="space-y-3">
          <ResultRow label={t.paymentAmount} value={fmt(payment)} emphasized />
          <ResultRow label={t.totalInterest} value={fmt(totalInterest)} />
          <ResultRow label={t.totalPaid} value={fmt(totalPaid)} />
          <ResultRow label={t.totalPayments} value={periods.toLocaleString()} />
        </div>
      </div>

      {schedule.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t.schedule(schedule.length)}</h4>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-2.5 text-left">#</th>
                  <th className="px-4 py-2.5 text-right">{t.payment}</th>
                  <th className="px-4 py-2.5 text-right">{t.interest}</th>
                  <th className="px-4 py-2.5 text-right">{t.principalCol}</th>
                  <th className="px-4 py-2.5 text-right">{t.balance}</th>
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

export function RRSPvsTFSACalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmt = fmtLocale(locale);
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

  const growth = Math.pow(1 + r, y);
  const rrspFuture = c * growth;
  const rrspAfterTax = rrspFuture * (1 - mLater);
  const tfsaAfterTaxContrib = c * (1 - mNow);
  const tfsaFuture = tfsaAfterTaxContrib * growth;

  const better: "RRSP" | "TFSA" | "tie" =
    rrspAfterTax > tfsaFuture ? "RRSP" : tfsaFuture > rrspAfterTax ? "TFSA" : "tie";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4">
        <Field label={t.contribAmt} value={contribution} onChange={setContribution} prefix="$" />
        <Field label={t.mNow} value={marginalNow} onChange={setMarginalNow} suffix="%" />
        <Field label={t.mLater} value={marginalLater} onChange={setMarginalLater} suffix="%" />
        <Field label={t.yearsToWith} value={years} onChange={setYears} />
        <Field label={t.annualReturn} value={rate} onChange={setRate} suffix="%" />
      </div>
      <div className="space-y-3">
        <ResultRow label={t.rrspFV} value={fmt(rrspFuture)} />
        <ResultRow label={t.rrspAfter} value={fmt(rrspAfterTax)} emphasized={better === "RRSP"} />
        <ResultRow label={t.tfsaContrib} value={fmt(tfsaAfterTaxContrib)} />
        <ResultRow label={t.tfsaAfter} value={fmt(tfsaFuture)} emphasized={better === "TFSA"} />
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-foreground">
          <div className="mb-1 text-xs font-semibold uppercase text-accent">{t.recommendation}</div>
          {better === "tie"
            ? t.tie
            : t.winsBy(better, fmt(Math.abs(rrspAfterTax - tfsaFuture)))}
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

export function GSTHSTCalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmt = fmtLocale(locale);
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
        <Field label={t.amount} value={amount} onChange={setAmount} prefix="$" />
        <Select
          label={t.provinceTerritory}
          value={province}
          onChange={setProvince}
          options={Object.keys(GST_RATES).map((k) => ({ value: k, label: `${k} — ${GST_RATES[k]}%` }))}
        />
        <div>
          <span className="mb-1.5 block text-xs font-medium text-muted">{t.mode}</span>
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-white p-1">
            {[
              { id: "add", label: t.addTax },
              { id: "remove", label: t.removeTax },
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
        <ResultRow label={t.preTax(province)} value={fmt(base)} />
        <ResultRow label={t.taxAt(GST_RATES[province])} value={fmt(tax)} emphasized />
        <ResultRow label={t.totalInclTax} value={fmt(total)} />
      </div>
    </div>
  );
}

// ---------- 5. Retirement Planning ----------

export function RetirementCalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmt = fmtLocale(locale);
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
        <Field label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
        <Field label={t.retireAge} value={retireAge} onChange={setRetireAge} />
        <Field label={t.currentSavings} value={currentSavings} onChange={setCurrentSavings} prefix="$" />
        <Field label={t.monthlyContrib} value={monthlyContrib} onChange={setMonthlyContrib} prefix="$" />
        <Field label={t.annualReturn} value={rate} onChange={setRate} suffix="%" />
        <Field label={t.desiredIncome} value={desiredIncome} onChange={setDesiredIncome} prefix="$" />
        <Field label={t.yearsRetirement} value={yearsInRetirement} onChange={setYearsInRetirement} />
      </div>
      <div className="space-y-3">
        <ResultRow label={t.yearsUntil} value={`${yearsToRetire}`} />
        <ResultRow label={t.projSavings} value={fmt(fv)} emphasized />
        <ResultRow label={t.capitalNeeded} value={fmt(needed)} />
        <ResultRow
          label={surplus >= 0 ? t.projSurplus : t.projShortfall}
          value={fmt(Math.abs(surplus))}
          emphasized
        />
        {surplus < 0 && (
          <p className="rounded-lg bg-error/10 p-3 text-xs text-error">{t.shortfallMsg}</p>
        )}
      </div>
    </div>
  );
}

// ---------- 6. Financial Ratios ----------

export function FinancialRatiosCalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmtDecimal = fmtDecimalLocale(locale);
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
        <Field label={t.currentAssets} value={currentAssets} onChange={setCurrentAssets} prefix="$" />
        <Field label={t.currentLiab} value={currentLiab} onChange={setCurrentLiab} prefix="$" />
        <Field label={t.inventory} value={inventory} onChange={setInventory} prefix="$" />
        <Field label={t.totalLiab} value={totalLiab} onChange={setTotalLiab} prefix="$" />
        <Field label={t.equity} value={equity} onChange={setEquity} prefix="$" />
        <Field label={t.netIncome} value={netIncome} onChange={setNetIncome} prefix="$" />
        <Field label={t.revenue} value={revenue} onChange={setRevenue} prefix="$" />
        <Field label={t.totalAssets} value={totalAssets} onChange={setTotalAssets} prefix="$" />
      </div>
      <div className="space-y-3">
        <ResultRow label={t.currentRatio} value={fmtDecimal(current)} emphasized={current >= 1.5} />
        <ResultRow label={t.quickRatio} value={fmtDecimal(quick)} emphasized={quick >= 1} />
        <ResultRow label={t.debtEquity} value={fmtDecimal(debtEquity)} />
        <ResultRow label={t.roe} value={`${fmtDecimal(roe, 1)}%`} emphasized={roe >= 15} />
        <ResultRow label={t.roa} value={`${fmtDecimal(roa, 1)}%`} />
        <ResultRow label={t.netMargin} value={`${fmtDecimal(netMargin, 1)}%`} />
      </div>
    </div>
  );
}

// ---------- 7. Business Valuation ----------

export function BusinessValuationCalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmt = fmtLocale(locale);
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
        <Field label={t.annualEarnings} value={annualEarnings} onChange={setAnnualEarnings} prefix="$" />
        <Field label={t.industryMultiple} value={industryMultiple} onChange={setIndustryMultiple} suffix="x" />
        <Field label={t.annualRevenue} value={revenue} onChange={setRevenue} prefix="$" />
        <Field label={t.revenueMultiple} value={revenueMultiple} onChange={setRevenueMultiple} suffix="x" />
        <Field label={t.totalAssets} value={assets} onChange={setAssets} prefix="$" />
        <Field label={t.liabilities} value={liabilities} onChange={setLiabilities} prefix="$" />
      </div>
      <div className="space-y-3">
        <ResultRow label={t.earningsMethod} value={fmt(earningsValuation)} />
        <ResultRow label={t.revenueMethod} value={fmt(revenueValuation)} />
        <ResultRow label={t.assetMethod} value={fmt(assetValuation)} />
        <ResultRow label={t.blended} value={fmt(average)} emphasized />
        <p className="text-xs text-muted">{t.valuationNote}</p>
      </div>
    </div>
  );
}

// ---------- 8. Compound Savings ----------

export function CompoundSavingsCalculator({ locale = "en" }: LocaleProp) {
  const t = CALC_T[locale];
  const fmt = fmtLocale(locale);
  const fmtDecimal = fmtDecimalLocale(locale);
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
          <Field label={t.initialPrincipal} value={principal} onChange={setPrincipal} prefix="$" />
          <Field label={t.monthlyContrib} value={monthly} onChange={setMonthly} prefix="$" />
          <Field label={t.annualReturnRate} value={rate} onChange={setRate} suffix="%" />
          <Field label={t.years} value={years} onChange={setYears} />
        </div>
        <div className="space-y-3">
          <ResultRow label={t.totalContrib} value={fmt(totalContributed)} />
          <ResultRow label={t.interestEarned} value={fmt(interestEarned)} />
          <ResultRow label={t.finalBalance} value={fmt(fv)} emphasized />
          <ResultRow
            label={t.growthMult}
            value={`${fmtDecimal(fv / Math.max(totalContributed, 1), 2)}x`}
          />
        </div>
      </div>

      {yearly.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-2.5 text-left">{t.year}</th>
                <th className="px-4 py-2.5 text-right">{t.contributed}</th>
                <th className="px-4 py-2.5 text-right">{t.interest}</th>
                <th className="px-4 py-2.5 text-right">{t.balance}</th>
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
