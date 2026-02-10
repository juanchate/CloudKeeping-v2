import type { NavItem } from "@/types";

export const SITE_NAME = "CloudKeeping";
export const SITE_URL = process.env.SITE_URL || "https://cloudkeeping.info";
export const LEGAL_NAME = "FHA Cloudkeeping Tax & Business Advisory Ltd.";

export const CONTACT = {
  phone: "+1 (604) 729-3421",
  phoneRaw: "+16047293421",
  email: "info@cloudkeeping.info",
  emailSubject: "Inquiry from CloudKeeping Website",
  hours: "Monday – Friday, 9:00 AM – 5:00 PM PST",
  serviceArea: "British Columbia, Canada",
  timezone: "Pacific Standard Time (PST)",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = {
  // Add social links when available
  // linkedin: "https://linkedin.com/company/cloudkeeping",
} as const;
