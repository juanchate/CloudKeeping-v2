"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SITE_NAME, LEGAL_NAME, CONTACT, NAV_HREFS } from "@/lib/constants";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const navKeys = ["home", "services", "about", "faq", "contact"] as const;

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const navItems = navKeys.map((k) => ({
    label: dict.nav[k],
    href: `/${locale}${NAV_HREFS[k === "contact" ? "contact" : k]}`,
  }));

  return (
    <footer className="relative bg-primary text-white" role="contentinfo">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xl font-semibold text-white">
              <Image
                src="/images/ck_logo.png"
                alt="CloudKeeping logo"
                width={30}
                height={30}
                className="h-[30px] w-[30px] object-contain brightness-0 invert"
              />
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">{dict.footer.description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent/70">{dict.footer.navTitle}</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 transition-colors hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent/70">{dict.footer.servicesTitle}</h3>
            <ul className="space-y-3">
              {dict.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/services/${s.slug}`} className="text-sm text-white/50 transition-colors hover:text-white">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent/70">{dict.footer.contactTitle}</h3>
            <ul className="space-y-3">
              <li>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white" onClick={() => trackPhoneClick()}>
                  <Phone className="h-4 w-4 shrink-0" />{CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`} className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white" onClick={() => trackEmailClick()}>
                  <Mail className="h-4 w-4 shrink-0" />{CONTACT.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-white/50">
                <Clock className="h-4 w-4 shrink-0" />{CONTACT.hours}
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 shrink-0" />{CONTACT.serviceArea}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-6 sm:flex-row">
          <p className="text-xs text-white/30">&copy; {currentYear} {LEGAL_NAME}. {dict.footer.rights}</p>
          <Link href={`/${locale}/privacy`} className="text-xs text-white/30 transition-colors hover:text-white/60">{dict.footer.privacy}</Link>
        </div>
      </Container>
    </footer>
  );
}
