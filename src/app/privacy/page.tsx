import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SITE_NAME, LEGAL_NAME, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl prose prose-slate">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
            Privacy Policy
          </h1>

          <p className="text-sm text-muted mb-8">
            Last updated: February 2026
          </p>

          <div className="space-y-8 text-muted leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p>
                {LEGAL_NAME} (&ldquo;{SITE_NAME}&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
                protecting the privacy of individuals who visit our website at
                cloudkeeping.info (&ldquo;the Site&rdquo;) and who use our
                services. This Privacy Policy describes how we collect, use,
                disclose, and safeguard your information when you visit our
                website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Information We Collect
              </h2>
              <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                2.1 Information You Provide
              </h3>
              <p>
                When you submit our contact form, we collect the following
                information:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Your name</li>
                <li>Email address</li>
                <li>Phone number (if provided)</li>
                <li>The content of your message</li>
              </ul>
              <p className="mt-3">
                This information is used solely to respond to your inquiry and
                to provide the services you request.
              </p>

              <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                2.2 Information Collected Automatically
              </h3>
              <p>
                When you visit our website, we may automatically collect certain
                information about your device and usage patterns through Google
                Analytics 4, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Browser type and version
                </li>
                <li>Operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or source</li>
                <li>General geographic location (city/region level)</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Improve our website and user experience</li>
                <li>
                  Analyze website traffic and usage patterns to optimize
                  performance
                </li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Cookies and Analytics
              </h2>
              <p>
                We use Google Analytics 4 to understand how visitors interact
                with our website. Google Analytics uses cookies and similar
                technologies to collect and analyze information about website
                usage. This data is aggregated and anonymized.
              </p>
              <p className="mt-3">
                You can opt out of Google Analytics by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-dark underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Data Sharing and Disclosure
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to outside parties except in the following
                circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Service providers:</strong> We use Resend for email
                  delivery of contact form submissions. These providers are
                  bound by their own privacy policies and data processing
                  agreements.
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose your
                  information if required by law, regulation, or legal process.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Data Security
              </h2>
              <p>
                We implement reasonable security measures to protect your
                personal information from unauthorized access, alteration,
                disclosure, or destruction. Our website uses HTTPS encryption for
                all data transmitted between your browser and our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Data Retention
              </h2>
              <p>
                Contact form submissions are retained for as long as necessary to
                fulfill the purpose for which they were collected, typically for
                the duration of our business relationship plus any legally
                required retention period. Analytics data is retained according
                to Google Analytics&apos; default retention settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Your Rights
              </h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of analytics tracking</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the
                information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated &ldquo;Last
                updated&rdquo; date. We encourage you to review this policy
                periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <ul className="list-none mt-3 space-y-1">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-accent hover:text-accent-dark underline"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${CONTACT.phoneRaw}`}
                    className="text-accent hover:text-accent-dark underline"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <strong>Company:</strong> {LEGAL_NAME}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
