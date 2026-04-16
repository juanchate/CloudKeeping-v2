import type { ArticleMeta } from "./tools-data";
import type { Locale } from "./i18n";

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

const ARTICLE_BODIES_I18N: Record<string, { en: ArticleBody; es: ArticleBody }> = {
  "new-immigrant-tax-guide": {
    en: {
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
    es: {
      intro:
        "Si te mudaste a Canadá recientemente, preparar tu primera declaración de impuestos puede ser abrumador. Esta guía explica quién califica como residente a efectos fiscales, qué ingresos debes reportar y los créditos y deducciones a los que tienen derecho los recién llegados.",
      sections: [
        {
          heading: "Estado de Residencia — el Punto de Partida",
          paragraphs: [
            "Canadá te grava según tu residencia, no tu ciudadanía. Tu estado de residencia determina qué debes reportar y cuándo.",
            "Un residente de hecho tiene lazos residenciales significativos con Canadá (hogar, cónyuge, dependientes). Un residente presunto permaneció 183+ días en Canadá en un año. Un no residente no tiene tales lazos y sólo tributa sobre ingresos de fuente canadiense.",
          ],
        },
        {
          heading: "¿Qué Reportan los Nuevos Residentes?",
          bullets: [
            "Ingresos mundiales desde la fecha en que te convertiste en residente de Canadá.",
            "Los ingresos obtenidos antes de ser residente generalmente no se reportan — sólo la porción de fuente canadiense.",
            "Los activos que posees al llegar se consideran 'adquiridos' a valor justo de mercado (importante para futuras ganancias de capital).",
          ],
        },
        {
          heading: "Créditos Disponibles en el Primer Año",
          paragraphs: [
            "Puedes tener derecho al Canada Child Benefit, al crédito GST/HST y al Climate Action Incentive en tu primer año — incluso con residencia parcial.",
            "El monto personal básico, el monto por edad y el crédito por cónyuge generalmente se prorratean si tu estadía es menor al 90% del año.",
          ],
          callout: {
            title: "Consejo: Declara aunque no debas nada",
            body: "Presentar una declaración es la forma en que la CRA calcula tus beneficios — incluido el Canada Child Benefit. Perder un año puede costar miles en créditos no reclamados.",
          },
        },
        {
          heading: "Errores Comunes",
          bullets: [
            "No reportar propiedades extranjeras > CAD 100,000 en el Formulario T1135.",
            "No declarar inversiones existentes a valor de mercado en la fecha de llegada.",
            "Desconocer las reglas de aporte al RRSP — primero necesitas ingresos ganados en Canadá.",
          ],
        },
      ],
      keyTakeaways: [
        "La residencia, no la ciudadanía, determina tus obligaciones fiscales en Canadá.",
        "Reporta tus ingresos mundiales desde la fecha en que te convertiste en residente.",
        "Presenta una declaración para activar beneficios como CCB y créditos GST.",
        "Declara propiedades extranjeras > CAD 100,000 en el Formulario T1135.",
      ],
    },
  },
  "dividend-vs-salary": {
    en: {
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
    es: {
      intro:
        "Como dueño-gerente de una corporación canadiense, puedes pagarte con salario, dividendos o una combinación. Cada opción tiene implicaciones fiscales, de flujo de caja y de retiro distintas. Así es cómo decidir.",
      sections: [
        {
          heading: "Salario: Ventajas y Desventajas",
          bullets: [
            "Gasto deducible para la corporación — reduce el impuesto corporativo.",
            "Cuenta como ingreso ganado, genera espacio de aporte al RRSP (18% hasta el límite anual).",
            "Genera aportes al CPP (empleador + empleado) — un costo real pero también ahorro forzoso para el retiro.",
            "Requiere configuración de nómina, emisión de T4 y retenciones en la fuente.",
          ],
        },
        {
          heading: "Dividendos: Ventajas y Desventajas",
          bullets: [
            "Se pagan del ingreso corporativo después de impuestos — sin deducción corporativa.",
            "Sin aportes al CPP, menor impuesto personal a niveles moderados.",
            "Sin espacio RRSP, sin elegibilidad al EI, sin deducción por cuidado de hijos.",
            "Administración más simple que la nómina.",
          ],
        },
        {
          heading: "El Principio de Integración",
          paragraphs: [
            "El sistema fiscal canadiense está diseñado para que el ingreso ganado en la corporación y distribuido como dividendos genere aproximadamente el mismo impuesto total que un salario directo — esto se llama integración.",
            "Sin embargo, la integración es imperfecta. En la práctica, la mezcla correcta depende de tus necesidades de flujo, estrategia RRSP, oportunidades de división de ingresos y tasas provinciales.",
          ],
          callout: {
            title: "Regla general",
            body: "Si necesitas espacio RRSP, cobertura CPP o acceso a EI, inclínate por el salario. Si ya maximizaste tus RRSPs y querés administración simple, los dividendos pueden ser atractivos.",
          },
        },
        {
          heading: "Un Enfoque Equilibrado",
          paragraphs: [
            "Muchos dueños-gerentes pagan un salario base igual al máximo del CPP (para maximizar espacio RRSP sin sobrepagar CPP) y luego complementan con dividendos según sea necesario.",
            "Para nuestros clientes incorporados hacemos cálculos de integración individualizados cada año — pequeñas diferencias en tasas provinciales, tipos de dividendo (elegibles vs. no elegibles) y saldos GRIP pueden cambiar la mezcla óptima.",
          ],
        },
      ],
      keyTakeaways: [
        "El salario genera espacio RRSP y CPP; los dividendos son más simples con menos carga administrativa.",
        "La integración hace que el impuesto total sea similar — pero la mezcla importa para flujo de caja y retiro.",
        "La mayoría de los dueños-gerentes se benefician de un enfoque combinado actualizado anualmente.",
      ],
    },
  },
  "small-business-tax-credits": {
    en: {
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
    es: {
      intro:
        "Las pequeñas empresas canadienses suelen pasar por alto valiosos créditos fiscales que podrían reducir su factura impositiva en miles. Aquí están los créditos más comúnmente omitidos y cómo reclamarlos.",
      sections: [
        {
          heading: "La Deducción para Pequeñas Empresas (SBD)",
          paragraphs: [
            "La SBD reduce el impuesto corporativo federal sobre los primeros $500,000 de ingreso empresarial activo del 15% al 9%. Las tasas provinciales bajan de forma similar (ej. BC del 12% al 2%).",
            "La SBD se elimina gradualmente para corporaciones con capital imponible empleado en Canadá entre $10M y $50M. Revisa tus corporaciones asociadas — el límite de $500,000 es compartido.",
          ],
        },
        {
          heading: "Investigación y Desarrollo Experimental (SR&ED)",
          bullets: [
            "Crédito federal reembolsable del 35% sobre gastos de I+D calificados para CCPCs (hasta $3M).",
            "Crédito no reembolsable del 15% sobre montos superiores al tope o para no-CCPCs.",
            "Los complementos provinciales pueden llevar la recuperación total al 50–70% de los costos elegibles.",
          ],
        },
        {
          heading: "Crédito por Creación de Empleo de Aprendices",
          paragraphs: [
            "Los empleadores en oficios Red Seal elegibles pueden reclamar un crédito no reembolsable del 10% del salario pagado a aprendices (máximo $2,000 por aprendiz por año).",
          ],
        },
        {
          heading: "Créditos Fiscales por Inversión",
          bullets: [
            "Crédito por Inversión Atlántico — 10% sobre propiedad calificada.",
            "ITCs regionales para industrias específicas.",
            "ITCs para tecnología limpia y vehículos de cero emisiones (nuevos desde 2024).",
          ],
        },
        {
          heading: "Créditos Fiscales Digitales",
          paragraphs: [
            "El Canada Digital Adoption Program ofreció subvenciones y préstamos al 0% para modernización tecnológica. Aunque ciertas corrientes han terminado, los equivalentes provinciales continúan.",
          ],
          callout: {
            title: "No dejes dinero sobre la mesa",
            body: "Revisamos la declaración de cada cliente para detectar créditos no aplicados — contáctanos para una evaluación gratuita antes de tu próxima presentación.",
          },
        },
      ],
      keyTakeaways: [
        "La SBD es el crédito individual más importante — asegúrate de que tus corporaciones asociadas no lo estén erosionando.",
        "SR&ED aplica a muchas más empresas de lo que se cree — desarrollo de software, mejora de procesos, etc.",
        "Los créditos por aprendizaje, regionales y de tecnología limpia suman rápidamente para empresas elegibles.",
      ],
    },
  },
  "year-end-tax-planning": {
    en: {
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
    es: {
      intro:
        "A medida que se acerca el 31 de diciembre, hay varias estrategias que los individuos y dueños de empresa canadienses pueden ejecutar antes del cierre de año para reducir impuestos. Algunas tienen plazos estrictos — no te los pierdas.",
      sections: [
        {
          heading: "Antes del 31 de Diciembre (Personal)",
          bullets: [
            "Realizar pérdidas de capital para compensar ganancias obtenidas durante el año.",
            "Hacer donaciones caritativas — el recibo debe tener fecha anterior al 31 de diciembre.",
            "Pagar gastos deducibles (médicos, cuotas profesionales, honorarios de inversión).",
            "Aportar a una TFSA — el espacio no usado se traslada, pero el nuevo espacio se reinicia cada 1 de enero.",
            "Convertir RRSP a RRIF antes del 31 de diciembre del año en que cumples 71.",
          ],
        },
        {
          heading: "Primeros 60 Días del Año Nuevo (Personal)",
          paragraphs: [
            "Tienes hasta los primeros 60 días del nuevo año (típicamente 1 de marzo) para hacer aportes RRSP que se deducen contra el año fiscal anterior.",
            "Los aportes FHSA siguen el año calendario — deben hacerse antes del 31 de diciembre.",
          ],
        },
        {
          heading: "Para Corporaciones",
          bullets: [
            "Las declaraciones de bonos deben acumularse dentro del cierre fiscal y pagarse dentro de 180 días.",
            "Paga dividendos antes de fin de año si quieres integración con la declaración personal del dueño.",
            "Acelera compras para reclamar CCA (regla del medio año) — sólo si tiene sentido comercial.",
            "Revisa saldos de préstamos de accionistas — montos pendientes por > 2 años se vuelven ingreso imponible.",
          ],
        },
        {
          heading: "Movimientos Comunes de Fin de Año",
          paragraphs: [
            "División de ingresos con familiares vía dividendos de un fideicomiso familiar, préstamos a tasa prescrita o esquemas compatibles con TOSI.",
            "Donaciones caritativas vía seguros de vida corporativos o acciones 'flow-through'.",
            "Venta con pérdida fiscal — pero cuidado con la regla de pérdida superficial de 30 días.",
          ],
          callout: {
            title: "Nuestro proceso de revisión de fin de año",
            body: "Para cada cliente incorporado hacemos una sesión de planificación fiscal de fin de año en octubre/noviembre para implementar estas estrategias antes de los plazos.",
          },
        },
      ],
      keyTakeaways: [
        "El 31 de diciembre es un plazo estricto para donaciones, venta con pérdida fiscal y optimización FHSA/TFSA.",
        "Los aportes RRSP tienen plazo hasta el 1 de marzo para deducción del año anterior.",
        "La planificación corporativa de fin de año debe comenzar en octubre para máximo beneficio.",
      ],
    },
  },
  "canadian-payroll-guide": {
    en: {
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
    es: {
      intro:
        "Gestionar la nómina en Canadá significa coordinar CPP, EI, impuesto federal/provincial, ROEs, T4s y compensación laboral. Esta guía recorre el ciclo completo de cumplimiento anual.",
      sections: [
        {
          heading: "Registro como Empleador",
          paragraphs: [
            "Antes de emitir tu primer cheque de pago, registra una cuenta de nómina CRA (sufijo RP en tu BN). También necesitarás una cuenta de WorkSafeBC (o equivalente provincial).",
            "Si te estás incorporando, el BN se crea con tu incorporación federal; la subcuenta RP se agrega por separado.",
          ],
        },
        {
          heading: "Retenciones en la Fuente: Qué Retener",
          bullets: [
            "Impuesto federal sobre la renta — usa el formulario TD1 y las tablas de nómina de la CRA.",
            "Impuesto provincial sobre la renta — varía por provincia.",
            "Aportes al CPP — 5.95% (2024) sobre ingresos entre $3,500 y $68,500, más 4% CPP2 sobre montos entre $68,500 y $73,200.",
            "Primas de EI — 1.64% (2024) sobre ingresos hasta $63,200.",
          ],
        },
        {
          heading: "Frecuencia de Remisión",
          paragraphs: [
            "La CRA clasifica a los empleadores según la retención mensual promedio (AMWA). Los empleadores nuevos típicamente remiten mensualmente — vence el 15 del mes siguiente.",
            "Los empleadores más grandes pueden tener que remitir dos veces al mes o semanalmente. No remitir a tiempo genera penalidades del 3–10%.",
          ],
        },
        {
          heading: "Formularios T4 y Reporte de Fin de Año",
          bullets: [
            "Los T4 deben presentarse ante la CRA y distribuirse a los empleados antes del último día de febrero.",
            "El T4 Summary reconcilia todos los montos retenidos y remitidos del año.",
            "Formularios RL-1 para empleados en Quebec.",
          ],
        },
        {
          heading: "Registros de Empleo (ROE)",
          paragraphs: [
            "Emite un ROE siempre que un empleado tenga una interrupción de ingresos (despido, licencia, etc.) dentro de 5 días. La mayoría del software moderno de nómina envía ROEs electrónicamente.",
          ],
          callout: {
            title: "Manejamos la nómina de punta a punta",
            body: "Nuestros clientes delegan la nómina por completo — nosotros manejamos registros, remisiones, T4s, ROEs y reportes a WorkSafeBC.",
          },
        },
      ],
      keyTakeaways: [
        "Registra cuenta de nómina CRA + WorkSafeBC antes de la primera nómina.",
        "Remite CPP, EI e impuesto sobre la renta antes del día 15 (o antes para empleadores grandes).",
        "Presenta los T4 y RL-1 antes del último día de febrero.",
        "Emite ROEs dentro de 5 días tras una interrupción de ingresos.",
      ],
    },
  },
  "capital-gains-2025": {
    en: {
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
    es: {
      intro:
        "Los cambios en la tasa de inclusión de ganancias de capital anunciados en el presupuesto federal 2024 han impactado significativamente la planificación fiscal de los canadienses. Aquí está lo que realmente entró en vigor, lo que se postergó y lo que significa para tu planificación.",
      sections: [
        {
          heading: "El Cambio Propuesto",
          paragraphs: [
            "El Presupuesto 2024 propuso aumentar la tasa de inclusión de ganancias de capital del 50% al 66.67% sobre:",
            "— Individuos: ganancias que excedan $250,000 por año.",
            "— Corporaciones y la mayoría de los fideicomisos: sobre cada dólar de ganancia de capital.",
          ],
        },
        {
          heading: "Estado Actual",
          paragraphs: [
            "Tras cambios políticos a principios de 2025, el gobierno federal postergó la implementación. Al año fiscal actual, la tasa de inclusión para la mayoría de los contribuyentes se mantiene en 50%.",
            "Confirma siempre con tu asesor ya que las reglas continúan evolucionando.",
          ],
          callout: {
            title: "Las reglas cambian. El asesoramiento también.",
            body: "Monitoreamos activamente las actualizaciones de la CRA y el Ministerio de Finanzas. Si la tasa de inclusión cambia, contactaremos proactivamente a los clientes afectados.",
          },
        },
        {
          heading: "Implicaciones para la Planificación",
          bullets: [
            "Considera 'cristalizar' ganancias en años con tasas de inclusión más bajas — especialmente si vendes una empresa.",
            "Revisa la Exención Vitalicia de Ganancias de Capital (LCGE) — ahora $1.25M para acciones de corporaciones de pequeña empresa calificadas.",
            "Las corporaciones podrían querer mantener menos inversiones pasivas para minimizar el impacto.",
          ],
        },
        {
          heading: "La Exención por Residencia Principal",
          paragraphs: [
            "La PRE aún aplica para eximir completamente las ganancias de tu residencia principal. Cuidado con propiedades parcialmente usadas para alquiler o negocio — la exención se prorratea.",
            "El nuevo Underused Housing Tax (UHT) continúa aplicándose por separado a propiedades residenciales vacantes o subutilizadas.",
          ],
        },
      ],
      keyTakeaways: [
        "La propuesta del 66.67% se postergó desde 2025 — el 50% sigue siendo la norma.",
        "El LCGE para acciones QSBC es ahora $1.25M.",
        "Revisa activamente el momento de la venta y la exposición a la tasa de inclusión cada año.",
      ],
    },
  },
};

export function getArticleBody(slug: string, locale: Locale = "en"): ArticleBody | undefined {
  return ARTICLE_BODIES_I18N[slug]?.[locale];
}

export type { ArticleMeta };
