import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { SchemaOrg } from "@/components/layout/SchemaOrg";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Professional Accounting & Bookkeeping Services`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "CloudKeeping provides professional bookkeeping, tax planning, payroll, and accounting services for small and medium-sized businesses in British Columbia, Canada.",
  keywords: [
    "accounting",
    "bookkeeping",
    "tax planning",
    "payroll",
    "small business",
    "British Columbia",
    "CRA compliance",
    "tax preparation",
    "financial services",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Professional Accounting & Bookkeeping Services`,
    description:
      "Professional bookkeeping, tax planning, payroll, and accounting services for SMBs in British Columbia.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Professional Accounting & Bookkeeping Services`,
    description:
      "Professional bookkeeping, tax planning, payroll, and accounting services for SMBs in British Columbia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <SchemaOrg />
      </head>
      <body
        className={`${geistSans.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
