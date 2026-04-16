"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { TrendingUp, Calculator as CalcIcon, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "tax" | "compare" | "projections";
type LocaleKey = "en" | "es";

const DASH_T = {
  en: {
    tabs: {
      tax: "Tax Breakdown",
      compare: "Income Compare",
      projections: "Projections",
    },
    taxTitle: "Tax Breakdown",
    taxSubtitle:
      "See exactly how your income is split across federal, provincial, CPP, and EI.",
    income: "Gross Annual Income",
    province: "Province",
    totalTax: "Total Tax",
    grossIncome: "Gross Income",
    totalDeductions: "Total Deductions",
    netTakeHome: "Net Take-Home",
    effectiveRate: "Effective Tax Rate",
    federal: "Federal Tax",
    provincial: "Provincial Tax",
    cpp: "CPP",
    ei: "EI",
    compareTitle: "Salary vs Business Income",
    compareSubtitle:
      "Compare after-tax income when paying yourself as a salary, all dividends, or a 50/50 mix (incorporated owner-managers).",
    grossAmount: "Gross Pre-Tax Amount",
    afterTaxIncome: "After-Tax Income",
    compareNote:
      "Note: simplified calculation. Exact results depend on RRSP room, dividend type, GRIP, and integration effects — book a consultation for advice.",
    salary: "Salary",
    salaryDividend: "Salary + Dividends (50/50)",
    allDividends: "All Dividends",
    rate: "Rate (%)",
    projTitle: "Retirement Projections",
    projSubtitle: "Estimate how much you'll have saved at retirement based on your contributions.",
    currentAge: "Current Age",
    retireAge: "Retire Age",
    currentSavings: "Current Savings",
    annualContrib: "Annual Contribution",
    projBalance: "Projected Retirement Balance",
    atAge: "At age",
    portfolioValue: "Portfolio Value",
    disclaimer:
      "Results are estimates for planning purposes only and not a substitute for professional advice. 2025 Canadian federal & provincial tax rates used.",
  },
  es: {
    tabs: {
      tax: "Impuestos",
      compare: "Comparar Ingresos",
      projections: "Proyecciones",
    },
    taxTitle: "Distribución de Impuestos",
    taxSubtitle:
      "Ve exactamente cómo se distribuye tu ingreso entre federal, provincial, CPP y EI.",
    income: "Ingreso Bruto Anual",
    province: "Provincia",
    totalTax: "Impuesto Total",
    grossIncome: "Ingreso Bruto",
    totalDeductions: "Deducciones Totales",
    netTakeHome: "Ingreso Neto",
    effectiveRate: "Tasa Efectiva de Impuestos",
    federal: "Impuesto Federal",
    provincial: "Impuesto Provincial",
    cpp: "CPP",
    ei: "EI",
    compareTitle: "Salario vs Ingreso Empresarial",
    compareSubtitle:
      "Compara el ingreso después de impuestos al pagarte como salario, todo en dividendos o una mezcla 50/50 (dueños-gerentes incorporados).",
    grossAmount: "Monto Bruto Antes de Impuestos",
    afterTaxIncome: "Ingreso Después de Impuestos",
    compareNote:
      "Nota: cálculo simplificado. Los resultados exactos dependen del espacio RRSP, tipo de dividendo, GRIP y efectos de integración — reserva una consulta para asesoramiento.",
    salary: "Salario",
    salaryDividend: "Salario + Dividendos (50/50)",
    allDividends: "Todo en Dividendos",
    rate: "Tasa (%)",
    projTitle: "Proyecciones de Retiro",
    projSubtitle:
      "Estima cuánto habrás ahorrado al momento del retiro según tus aportes.",
    currentAge: "Edad Actual",
    retireAge: "Edad de Retiro",
    currentSavings: "Ahorros Actuales",
    annualContrib: "Aporte Anual",
    projBalance: "Balance Proyectado al Retiro",
    atAge: "A la edad de",
    portfolioValue: "Valor del Portafolio",
    disclaimer:
      "Los resultados son estimaciones con fines de planificación y no sustituyen el asesoramiento profesional. Se usan tasas federales y provinciales canadienses de 2025.",
  },
} as const;

interface Province {
  code: string;
  name: string;
  brackets: Array<[number, number]>; // [threshold, rate]
}

const FEDERAL_BRACKETS: Array<[number, number]> = [
  [55867, 0.15],
  [111733, 0.205],
  [173205, 0.26],
  [246752, 0.29],
  [Infinity, 0.33],
];

const PROVINCES: Province[] = [
  {
    code: "BC",
    name: "British Columbia",
    brackets: [
      [47937, 0.0506],
      [95875, 0.077],
      [110076, 0.105],
      [133664, 0.1229],
      [181232, 0.147],
      [252752, 0.168],
      [Infinity, 0.205],
    ],
  },
  {
    code: "AB",
    name: "Alberta",
    brackets: [
      [148269, 0.10],
      [177922, 0.12],
      [237230, 0.13],
      [355845, 0.14],
      [Infinity, 0.15],
    ],
  },
  {
    code: "ON",
    name: "Ontario",
    brackets: [
      [51446, 0.0505],
      [102894, 0.0915],
      [150000, 0.1116],
      [220000, 0.1216],
      [Infinity, 0.1316],
    ],
  },
  {
    code: "QC",
    name: "Quebec",
    brackets: [
      [51780, 0.14],
      [103545, 0.19],
      [126000, 0.24],
      [Infinity, 0.2575],
    ],
  },
];

function calcProgressive(income: number, brackets: Array<[number, number]>) {
  let tax = 0;
  let prev = 0;
  for (const [threshold, rate] of brackets) {
    const top = Math.min(income, threshold);
    if (top > prev) {
      tax += (top - prev) * rate;
      prev = top;
    }
    if (income <= threshold) break;
  }
  return tax;
}

// 2025 estimates (simplified)
function cppContribution(income: number) {
  const CPP_YMPE = 68500;
  const CPP_YAMPE = 73200;
  const CPP_BASIC_EXEMPT = 3500;
  const baseContrib = Math.max(0, Math.min(income, CPP_YMPE) - CPP_BASIC_EXEMPT) * 0.0595;
  const additional = Math.max(0, Math.min(income, CPP_YAMPE) - CPP_YMPE) * 0.04;
  return baseContrib + additional;
}
function eiContribution(income: number) {
  const EI_MAX = 65700;
  return Math.min(income, EI_MAX) * 0.0164;
}

const fmtLocale = (locale: LocaleKey) => (n: number) =>
  n.toLocaleString(locale === "es" ? "es-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });

function DonutChart({
  segments,
  centerLabel,
  centerValue,
  fmt,
}: {
  segments: Array<{ label: string; value: number; color: string }>;
  centerLabel: string;
  centerValue: string;
  fmt: (n: number) => string;
}) {
  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
      <div className="relative h-52 w-52 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8e8ed" strokeWidth="3.8" />
          {segments.map((s) => {
            const pct = (s.value / total) * 100;
            const dash = `${pct} ${100 - pct}`;
            const circle = (
              <circle
                key={s.label}
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke={s.color}
                strokeWidth="3.8"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
              />
            );
            offset += pct;
            return circle;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xs text-muted">{centerLabel}</div>
          <div className="text-xl font-bold text-foreground">{centerValue}</div>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {segments.map((s) => {
          const pct = ((s.value / total) * 100).toFixed(1);
          return (
            <div key={s.label} className="flex items-center gap-3 text-sm">
              <span className="h-3 w-3 rounded" style={{ background: s.color }} />
              <span className="flex-1 text-foreground">{s.label}</span>
              <span className="font-semibold text-foreground">{fmt(s.value)}</span>
              <span className="w-12 text-right text-xs text-muted">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BarCompare({
  bars,
  max,
  fmt,
}: {
  bars: Array<{ label: string; value: number; color: string }>;
  max: number;
  fmt: (n: number) => string;
}) {
  return (
    <div className="space-y-4">
      {bars.map((b) => (
        <div key={b.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-foreground">{b.label}</span>
            <span className="font-semibold text-foreground">{fmt(b.value)}</span>
          </div>
          <div className="h-8 w-full overflow-hidden rounded-md bg-surface-alt">
            <div
              className="h-full rounded-md transition-all duration-500"
              style={{ width: `${(b.value / max) * 100}%`, background: b.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChart({
  series,
  years,
  fmt,
}: {
  series: Array<{ label: string; values: number[]; color: string }>;
  years: number[];
  fmt: (n: number) => string;
}) {
  const max = Math.max(...series.flatMap((s) => s.values), 1);
  const w = 600;
  const h = 260;
  const pad = 40;
  const xStep = (w - pad * 2) / (years.length - 1);
  const yScale = (v: number) => h - pad - (v / max) * (h - pad * 2);

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="min-w-[500px] w-full">
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={pad}
            x2={w - pad}
            y1={yScale(max * t)}
            y2={yScale(max * t)}
            stroke="#e8e8ed"
            strokeDasharray="2,4"
          />
        ))}
        {[0, 0.5, 1].map((t) => (
          <text
            key={t}
            x={8}
            y={yScale(max * t) + 4}
            className="fill-muted"
            fontSize="10"
          >
            {fmt(max * t)}
          </text>
        ))}
        {years.map((y, i) =>
          i % Math.ceil(years.length / 6) === 0 ? (
            <text key={y} x={pad + i * xStep} y={h - 10} className="fill-muted" fontSize="10" textAnchor="middle">
              {y}
            </text>
          ) : null
        )}

        {series.map((s) => {
          const d = s.values
            .map((v, i) => `${i === 0 ? "M" : "L"} ${pad + i * xStep} ${yScale(v)}`)
            .join(" ");
          return (
            <g key={s.label}>
              <path d={d} stroke={s.color} strokeWidth="2.5" fill="none" />
              {s.values.map((v, i) => (
                <circle
                  key={i}
                  cx={pad + i * xStep}
                  cy={yScale(v)}
                  r="3"
                  fill={s.color}
                />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs">
        {series.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded" style={{ background: s.color }} />
            <span className="text-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinancialDashboard({ locale = "en" }: { locale?: string } = {}) {
  const L: LocaleKey = locale === "es" ? "es" : "en";
  const t = DASH_T[L];
  const fmt = fmtLocale(L);
  const [tab, setTab] = useState<Tab>("tax");

  // Tax Breakdown
  const [income, setIncome] = useState(85000);
  const [provinceCode, setProvinceCode] = useState("BC");
  const province = PROVINCES.find((p) => p.code === provinceCode) ?? PROVINCES[0];

  const taxSegments = useMemo(() => {
    const federal = calcProgressive(income, FEDERAL_BRACKETS);
    const provincial = calcProgressive(income, province.brackets);
    const cpp = cppContribution(income);
    const ei = eiContribution(income);
    return [
      { label: t.federal, value: federal, color: "#1a2e4a" },
      { label: t.provincial, value: provincial, color: "#C8922A" },
      { label: t.cpp, value: cpp, color: "#16a34a" },
      { label: t.ei, value: ei, color: "#dc2626" },
    ];
  }, [income, province, t]);

  const totalTax = taxSegments.reduce((a, b) => a + b.value, 0);
  const netIncome = income - totalTax;

  // Income comparison
  const [compareIncome, setCompareIncome] = useState(120000);
  const salaryTax = useMemo(() => {
    const fed = calcProgressive(compareIncome, FEDERAL_BRACKETS);
    const prov = calcProgressive(compareIncome, province.brackets);
    return fed + prov + cppContribution(compareIncome) + eiContribution(compareIncome);
  }, [compareIncome, province]);
  // Simplified corp + dividend: assume 12% corp tax on SBD portion (BC), then eligible dividend
  const corpTax = compareIncome * 0.11;
  const afterCorp = compareIncome - corpTax;
  const dividendGrossUp = afterCorp * 1.15;
  const personalDivTax = calcProgressive(dividendGrossUp, FEDERAL_BRACKETS) * 0.5 + calcProgressive(dividendGrossUp, province.brackets) * 0.5;
  const totalDividendTax = corpTax + Math.max(0, personalDivTax - afterCorp * 0.15);

  const compareBars = [
    { label: t.salary, value: compareIncome - salaryTax, color: "#1a2e4a" },
    { label: t.salaryDividend, value: compareIncome - (salaryTax * 0.5 + totalDividendTax * 0.5), color: "#C8922A" },
    { label: t.allDividends, value: compareIncome - totalDividendTax, color: "#16a34a" },
  ];

  // Retirement projection (simplified)
  const [currentAge, setCurrentAge] = useState(35);
  const [retireAge, setRetireAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(25000);
  const [annualContrib, setAnnualContrib] = useState(12000);
  const [projRate, setProjRate] = useState(6);

  const projection = useMemo(() => {
    const yearsToRetire = Math.max(0, retireAge - currentAge);
    const values: number[] = [];
    const yearLabels: number[] = [];
    let val = currentSavings;
    for (let y = 0; y <= yearsToRetire; y++) {
      values.push(Math.round(val));
      yearLabels.push(currentAge + y);
      val = val * (1 + projRate / 100) + annualContrib;
    }
    return { values, years: yearLabels };
  }, [currentAge, retireAge, currentSavings, annualContrib, projRate]);

  const tabs = [
    { id: "tax" as Tab, label: t.tabs.tax, icon: CalcIcon },
    { id: "compare" as Tab, label: t.tabs.compare, icon: TrendingUp },
    { id: "projections" as Tab, label: t.tabs.projections, icon: PiggyBank },
  ];

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-border/60 bg-white p-2">
            <div className="grid gap-1 sm:grid-cols-3">
              {tabs.map((tabItem) => (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    tab === tabItem.id
                      ? "bg-primary text-white shadow"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  )}
                >
                  <tabItem.icon className="h-4 w-4" />
                  {tabItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border/60 bg-white p-6 sm:p-8">
            {tab === "tax" && (
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t.taxTitle}</h3>
                <p className="mt-1 text-sm text-muted">{t.taxSubtitle}</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <NumberField label={t.income} value={income} onChange={setIncome} prefix="$" />
                  <SelectField
                    label={t.province}
                    value={provinceCode}
                    onChange={setProvinceCode}
                    options={PROVINCES.map((p) => ({ value: p.code, label: p.name }))}
                  />
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div className="rounded-xl bg-surface p-6">
                    <DonutChart
                      segments={taxSegments}
                      centerLabel={t.totalTax}
                      centerValue={fmt(totalTax)}
                      fmt={fmt}
                    />
                  </div>
                  <div className="space-y-3">
                    <MetricCard label={t.grossIncome} value={fmt(income)} />
                    <MetricCard label={t.totalDeductions} value={fmt(totalTax)} color="text-error" />
                    <MetricCard label={t.netTakeHome} value={fmt(netIncome)} color="text-success" highlight />
                    <MetricCard label={t.effectiveRate} value={`${((totalTax / income) * 100).toFixed(1)}%`} />
                  </div>
                </div>
              </div>
            )}

            {tab === "compare" && (
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t.compareTitle}</h3>
                <p className="mt-1 text-sm text-muted">{t.compareSubtitle}</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <NumberField label={t.grossAmount} value={compareIncome} onChange={setCompareIncome} prefix="$" />
                  <SelectField
                    label={t.province}
                    value={provinceCode}
                    onChange={setProvinceCode}
                    options={PROVINCES.map((p) => ({ value: p.code, label: p.name }))}
                  />
                </div>

                <div className="mt-8 rounded-xl bg-surface p-6">
                  <div className="mb-4 text-sm font-semibold text-foreground">{t.afterTaxIncome}</div>
                  <BarCompare bars={compareBars} max={compareIncome} fmt={fmt} />
                  <p className="mt-4 text-xs text-muted">{t.compareNote}</p>
                </div>
              </div>
            )}

            {tab === "projections" && (
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t.projTitle}</h3>
                <p className="mt-1 text-sm text-muted">{t.projSubtitle}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <NumberField label={t.currentAge} value={currentAge} onChange={setCurrentAge} />
                  <NumberField label={t.retireAge} value={retireAge} onChange={setRetireAge} />
                  <NumberField label={t.currentSavings} value={currentSavings} onChange={setCurrentSavings} prefix="$" />
                  <NumberField label={t.annualContrib} value={annualContrib} onChange={setAnnualContrib} prefix="$" />
                  <NumberField label={t.rate} value={projRate} onChange={setProjRate} />
                </div>

                <div className="mt-8 rounded-xl bg-surface p-6">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {t.projBalance}
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        {fmt(projection.values[projection.values.length - 1] ?? 0)}
                      </div>
                    </div>
                    <div className="text-sm text-muted">{t.atAge} {retireAge}</div>
                  </div>
                  <LineChart
                    series={[
                      { label: t.portfolioValue, values: projection.values, color: "#C8922A" },
                    ]}
                    years={projection.years}
                    fmt={fmt}
                  />
                </div>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted">{t.disclaimer}</p>
        </div>
      </Container>
    </section>
  );
}

// ---------- Shared form fields ----------

function NumberField({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
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
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className={cn(
            "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none",
            prefix && "pl-7"
          )}
        />
      </div>
    </label>
  );
}

function SelectField({
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
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground transition-colors focus:border-accent focus:outline-none"
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

function MetricCard({
  label,
  value,
  color = "text-foreground",
  highlight = false,
}: {
  label: string;
  value: string;
  color?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight ? "border-accent/30 bg-accent/5" : "border-border/60 bg-surface"
      )}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-muted">{label}</div>
      <div className={cn("mt-1 text-2xl font-bold", color)}>{value}</div>
    </div>
  );
}
