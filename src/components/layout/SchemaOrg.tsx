import { SITE_NAME, LEGAL_NAME, SITE_URL, CONTACT } from "@/lib/constants";

export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    description:
      "Professional accounting, bookkeeping, tax planning, and payroll services for small and medium-sized businesses in British Columbia, Canada.",
    areaServed: {
      "@type": "State",
      name: "British Columbia",
      containedInPlace: { "@type": "Country", name: "Canada" },
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
