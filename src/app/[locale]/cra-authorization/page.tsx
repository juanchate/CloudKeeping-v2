import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { CRAAuthorization } from "@/components/sections/CRAAuthorization";
import { CRA_REP } from "@/lib/constants";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return createPageMetadata({
    locale: locale as Locale,
    path: "/cra-authorization",
    title: `Add ${CRA_REP.repName} as Your CRA Representative`,
    description:
      "Step-by-step guide to authorize CloudKeeping as your CRA representative. Individual & Business flows — grant access securely and revoke anytime.",
  });
}

export default async function CRAAuthorizationPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <CRAAuthorization locale={locale} />;
}
