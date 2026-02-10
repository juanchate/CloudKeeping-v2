# CloudKeeping — Marketing Website
 
Professional marketing website for CloudKeeping (FHA Cloudkeeping Tax & Business Advisory Ltd.), an accounting, bookkeeping, and tax services firm based in British Columbia, Canada.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **Form Handling**: React Hook Form + Zod validation
- **Email**: Resend SDK
- **Analytics**: Google Analytics 4
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID |
| `SITE_URL` | Production URL (default: https://cloudkeeping.info) |
| `CONTACT_EMAIL` | Email where form submissions are sent |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
  app/              # Next.js App Router pages
    api/contact/    # Contact form API endpoint
    services/       # Services landing + detail pages
    about/          # About page
    faq/            # FAQ page
    contact/        # Contact page
    privacy/        # Privacy Policy
  components/
    layout/         # Header, Footer, MobileNav
    ui/             # Reusable UI components
    sections/       # Page section components
    forms/          # Form components
  lib/              # Constants, content, schemas, utilities
  types/            # TypeScript types
```

## Pages

- `/` — Home (Hero, Services, Value Props, Stats, Process, Testimonials, FAQ Preview, CTA)
- `/services` — Services landing page
- `/services/[slug]` — Service detail pages (bookkeeping, tax, payroll, accounting-consulting)
- `/about` — Company story, values, differentiators
- `/faq` — Frequently asked questions (accordion)
- `/contact` — Contact form + contact info
- `/privacy` — Privacy policy

## Deployment

Optimized for Vercel deployment:

1. Connect the GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

## Content Updates

All content is centralized in `src/lib/content.ts` and `src/lib/constants.ts`. To update:

- **Services, FAQs, Testimonials, Stats**: Edit `src/lib/content.ts`
- **Company info, phone, email, nav**: Edit `src/lib/constants.ts`
- **Page copy**: Edit individual page files in `src/app/`
