import { SITE_NAME, LEGAL_NAME, SITE_URL, CONTACT } from "@/lib/constants";

interface SchemaOrgProps {
  locale?: string;
}

export function SchemaOrg({ locale = "en" }: SchemaOrgProps) {
  const description =
    locale === "es"
      ? "Firma liderada por un CPA que ofrece servicios profesionales de contabilidad, teneduría de libros, planificación fiscal y nómina para pequeñas y medianas empresas en Vancouver, Surrey, White Rock y toda British Columbia, Canadá."
      : "CPA-led firm providing professional accounting, bookkeeping, tax planning, and payroll services for small and medium-sized businesses in Vancouver, Surrey, White Rock, and across British Columbia, Canada.";

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/${locale}`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    description,
    inLanguage: locale,
    areaServed: [
      { "@type": "City", name: "Vancouver", containedInPlace: { "@type": "State", name: "British Columbia" } },
      { "@type": "City", name: "Surrey", containedInPlace: { "@type": "State", name: "British Columbia" } },
      { "@type": "City", name: "White Rock", containedInPlace: { "@type": "State", name: "British Columbia" } },
      { "@type": "City", name: "Burnaby", containedInPlace: { "@type": "State", name: "British Columbia" } },
      { "@type": "City", name: "Richmond", containedInPlace: { "@type": "State", name: "British Columbia" } },
      { "@type": "City", name: "Coquitlam", containedInPlace: { "@type": "State", name: "British Columbia" } },
      { "@type": "State", name: "British Columbia", containedInPlace: { "@type": "Country", name: "Canada" } },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vancouver",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
    serviceType: [
      "Bookkeeping",
      "Tax Preparation",
      "Tax Planning",
      "Personal Tax Returns",
      "Corporate Tax Returns",
      "Payroll Processing",
      "Accounting",
      "Business Consulting",
      "GST/HST Filing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "es" ? "Servicios Contables" : "Accounting Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bookkeeping", url: `${SITE_URL}/${locale}/services/bookkeeping` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Planning & Preparation", url: `${SITE_URL}/${locale}/services/tax` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personal Tax Filing", url: `${SITE_URL}/${locale}/services/personal-tax` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Payroll Services", url: `${SITE_URL}/${locale}/services/payroll` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Accounting & Financial Consulting", url: `${SITE_URL}/${locale}/services/accounting-consulting` } },
      ],
    },
    priceRange: "$$",
    knowsAbout: [
      "Canadian Tax Law",
      "CRA Compliance",
      "T1 Personal Tax Returns",
      "T2 Corporate Tax Returns",
      "GST/HST",
      "PST",
      "CPP",
      "EI",
      "QuickBooks Online",
      "Xero",
      "Sage",
      "WorkSafeBC",
    ],
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "es"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
