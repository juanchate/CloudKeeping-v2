import { SITE_NAME, LEGAL_NAME, SITE_URL, CONTACT } from "@/lib/constants";

interface SchemaOrgProps {
  locale?: string;
}

export function SchemaOrg({ locale = "en" }: SchemaOrgProps) {
  const description =
    locale === "es"
      ? "Servicios profesionales de contabilidad, teneduría de libros, planificación fiscal y nómina para pequeñas y medianas empresas en Columbia Británica, Canadá."
      : "Professional accounting, bookkeeping, tax planning, and payroll services for small and medium-sized businesses in British Columbia, Canada.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/${locale}`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    description,
    inLanguage: locale,
    areaServed: {
      "@type": "State",
      name: "British Columbia",
      containedInPlace: { "@type": "Country", name: "Canada" },
    },
    address: {
      "@type": "PostalAddress",
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
      "Payroll Processing",
      "Accounting",
      "Business Consulting",
    ],
    priceRange: "$$",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
