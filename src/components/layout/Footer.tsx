"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_NAME, LEGAL_NAME, CONTACT, NAV_ITEMS } from "@/lib/constants";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-white"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  width="32"
                  height="32"
                  rx="8"
                  fill="rgba(255,255,255,0.2)"
                />
                <path
                  d="M10 16C10 12.6863 12.6863 10 16 10C17.5913 10 19.0174 10.6321 20.0711 11.6569"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M22 16C22 19.3137 19.3137 22 16 22C14.4087 22 12.9826 21.3679 11.9289 20.3431"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="2" fill="white" />
              </svg>
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Professional accounting, bookkeeping, and tax services for small
              and medium-sized businesses across British Columbia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/bookkeeping"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Bookkeeping
                </Link>
              </li>
              <li>
                <Link
                  href="/services/tax"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Tax Management & Planning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/payroll"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Payroll
                </Link>
              </li>
              <li>
                <Link
                  href="/services/accounting-consulting"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Accounting & Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  onClick={() => trackPhoneClick()}
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  onClick={() => trackEmailClick()}
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-white/70">
                <Clock className="h-4 w-4 shrink-0" />
                {CONTACT.hours}
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 shrink-0" />
                {CONTACT.serviceArea}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {currentYear} {LEGAL_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/50 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
