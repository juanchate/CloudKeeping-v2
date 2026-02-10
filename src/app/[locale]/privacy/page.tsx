import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LEGAL_NAME, CONTACT, SITE_NAME } from "@/lib/constants";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const title = locale === "es" ? "Pol\u00edtica de Privacidad" : "Privacy Policy";
  const description = locale === "es"
    ? `Pol\u00edtica de privacidad de ${SITE_NAME}. C\u00f3mo recopilamos, usamos y protegemos tu informaci\u00f3n.`
    : `Privacy Policy for ${SITE_NAME}. How we collect, use, and protect your information.`;
  return {
    ...createPageMetadata({
      locale: locale as Locale,
      path: "/privacy",
      title,
      description,
    }),
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-8">
            {locale === "es" ? "Pol\u00edtica de Privacidad" : "Privacy Policy"}
          </h1>
          {locale === "es" && (
            <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-4 text-sm text-muted">
              Esta pol\u00edtica de privacidad se presenta en ingl\u00e9s por razones legales. Si tiene preguntas, cont\u00e1ctenos a <a href={`mailto:${CONTACT.email}`} className="text-accent hover:text-accent-dark underline">{CONTACT.email}</a>.
            </div>
          )}
          <p className="text-sm text-muted mb-8">Last updated: February 2026</p>
          <div className="space-y-8 text-muted leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
              <p>{LEGAL_NAME} (&ldquo;{SITE_NAME}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy of individuals who visit our website at cloudkeeping.cpa (&ldquo;the Site&rdquo;) and who use our services. This Privacy Policy describes how we collect, use, disclose, and safeguard your information.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              <p>When you submit our contact form, we collect your name, email address, phone number (if provided), and the content of your message. We also collect anonymized analytics data via Google Analytics 4.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p>We use the information to respond to your inquiries, improve our website, analyze traffic patterns, and comply with legal obligations.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Cookies and Analytics</h2>
              <p>We use Google Analytics 4 to understand how visitors interact with our website. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark underline">Google Analytics Opt-out Browser Add-on</a>.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Sharing</h2>
              <p>We do not sell or trade your personal information. We use Resend for email delivery and may disclose information if required by law.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Security</h2>
              <p>We implement reasonable security measures including HTTPS encryption for all data transmitted between your browser and our servers.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights</h2>
              <p>You have the right to request access to, correction of, or deletion of your personal information. Contact us at <a href={`mailto:${CONTACT.email}`} className="text-accent hover:text-accent-dark underline">{CONTACT.email}</a>.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact</h2>
              <p>Email: <a href={`mailto:${CONTACT.email}`} className="text-accent hover:text-accent-dark underline">{CONTACT.email}</a> &middot; Phone: <a href={`tel:${CONTACT.phoneRaw}`} className="text-accent hover:text-accent-dark underline">{CONTACT.phone}</a> &middot; {LEGAL_NAME}</p>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
