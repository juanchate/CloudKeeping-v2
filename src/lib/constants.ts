export const SITE_NAME = "CloudKeeping";
export const SITE_URL = process.env.SITE_URL || "https://cloudkeeping.cpa";
export const LEGAL_NAME = "FHA Cloudkeeping Tax & Business Advisory Ltd.";

export const CONTACT = {
  phone: "+1 (604) 729-3421",
  phoneRaw: "+16047293421",
  email: "info@cloudkeeping.cpa",
  emailSubject: "Inquiry from CloudKeeping Website",
  whatsappUrl:
    "https://api.whatsapp.com/send/?phone=%2B16047293421&text&type=phone_number&app_absent=0",
  hours: "Monday – Friday, 9:00 AM – 4:00 PM PST",
  serviceArea: "British Columbia, Canada",
  timezone: "Pacific Standard Time (PST)",
} as const;

export const NAV_HREFS = {
  home: "/",
  services: "/services",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
} as const;
