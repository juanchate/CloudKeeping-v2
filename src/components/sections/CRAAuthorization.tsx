"use client";

import { useState } from "react";
import { CRA_REP } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import {
  Check,
  Copy,
  ExternalLink,
  AlertTriangle,
  ShieldCheck,
  Users,
  Building2,
  Phone,
  MessageSquare,
  CircleHelp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";

type Audience = "individuals" | "businesses";

interface Step {
  title: string;
  description: string;
  note?: string;
  mockup: React.ReactNode;
}

// ---------- Stylized SVG mockups of each CRA step ----------
function MockupFrame({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 border-b border-border/70 bg-surface-alt px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        {label && (
          <span className="ml-3 truncate text-[11px] text-muted">{label}</span>
        )}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function CRAHeaderBar() {
  return (
    <div className="mb-3 flex items-center gap-2 rounded-md bg-[#0c2340] px-3 py-2 text-white">
      <span className="flex h-5 w-8 items-center justify-center bg-[#d80000] text-[10px] font-bold">
        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor"><path d="M10 0l2 5 5-1-3 4 3 4-5-1-2 5-2-5-5 1 3-4-3-4 5 1z" /></svg>
      </span>
      <div className="text-[10px] leading-tight">
        <div className="font-semibold">Government of Canada</div>
        <div className="text-white/70">Canada Revenue Agency</div>
      </div>
    </div>
  );
}

function Step1Mockup() {
  return (
    <MockupFrame label="canada.ca/en/revenue-agency.html">
      <CRAHeaderBar />
      <div className="space-y-2">
        <div className="h-3 w-40 rounded bg-foreground/80" />
        <div className="h-2 w-full rounded bg-border" />
        <div className="h-2 w-3/4 rounded bg-border" />
        <div className="mt-4 flex justify-center">
          <div className="rounded-md bg-[#0c2340] px-5 py-2 text-[11px] font-semibold text-white">
            CRA sign in
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

function Step2Mockup() {
  return (
    <MockupFrame label="cra-login-portal">
      <CRAHeaderBar />
      <div className="rounded-md border border-border/70 p-3">
        <div className="mb-2 text-[11px] font-semibold">Sign in to your CRA account</div>
        <div className="space-y-2">
          <div className="rounded border border-border px-2 py-1.5 text-[10px] text-muted">
            Username / CRA user ID
          </div>
          <div className="rounded border border-border px-2 py-1.5 text-[10px] text-muted">
            Password
          </div>
          <div className="mt-1 rounded bg-[#0c2340] px-3 py-1.5 text-center text-[10px] font-semibold text-white">
            Sign-In
          </div>
          <div className="pt-1 text-[9px] text-muted">
            Sign-in Partner · GCKey · CRA ID
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

function Step3BusinessMockup() {
  return (
    <MockupFrame label="My Business Account — Welcome">
      <CRAHeaderBar />
      <div className="mb-3 text-[11px] font-semibold">Welcome</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded border border-border/70 p-2 text-[10px]">Individual</div>
        <div className="rounded border-2 border-accent bg-accent/5 p-2 text-[10px] font-semibold text-accent">
          Business ✓
        </div>
      </div>
      <div className="mt-3 rounded-md border border-border bg-surface-alt p-2">
        <div className="mb-1 text-[10px] font-semibold">Your businesses</div>
        <div className="flex items-center justify-between rounded bg-white px-2 py-1.5 text-[10px]">
          <span>ABC Corp. Ltd.</span>
          <span className="text-accent">Select →</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function Step3IndividualMockup() {
  return (
    <MockupFrame label="My Account — Overview">
      <CRAHeaderBar />
      <div className="mb-3 text-[11px] font-semibold">Welcome, John Smith</div>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded border border-border/70 p-2 text-center text-[9px]">Overview</div>
        <div className="rounded border border-border/70 p-2 text-center text-[9px]">Accounts</div>
        <div className="rounded border-2 border-accent bg-accent/5 p-2 text-center text-[9px] font-semibold text-accent">
          Profile
        </div>
      </div>
      <div className="mt-3 rounded-md border border-border bg-surface-alt p-2 text-[10px]">
        Balance & Statements · Tax returns · Benefits
      </div>
    </MockupFrame>
  );
}

function ProfileMockup({ isBusiness }: { isBusiness: boolean }) {
  return (
    <MockupFrame label={isBusiness ? "My Business Account — Profile" : "My Account — Profile"}>
      <CRAHeaderBar />
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-2">
          <div className="h-2 w-32 rounded bg-foreground/70" />
          <div className="h-2 w-full rounded bg-border" />
          <div className="h-2 w-5/6 rounded bg-border" />
          <div className="h-2 w-2/3 rounded bg-border" />
        </div>
        <div className="space-y-1.5 rounded-md bg-surface-alt p-2">
          <div className="text-[9px] font-semibold">Authorized representatives</div>
          <div className="h-2 w-full rounded bg-white" />
          <div className="inline-block rounded bg-[#0c2340] px-2 py-1 text-[9px] text-white">+ Add</div>
        </div>
      </div>
    </MockupFrame>
  );
}

function AuthStartMockup() {
  return (
    <MockupFrame label="Authorize a representative">
      <div className="rounded-md border border-border/70 p-3">
        <div className="mb-2 text-[11px] font-semibold">Before you begin</div>
        <div className="space-y-1.5 text-[10px] text-muted">
          <div>• Have the representative&apos;s RepID or GroupID ready.</div>
          <div>• Review authorization levels.</div>
          <div>• You can revoke authorization at any time.</div>
        </div>
        <div className="mt-3 inline-block rounded bg-[#0c2340] px-4 py-1.5 text-[10px] font-semibold text-white">
          Start →
        </div>
      </div>
    </MockupFrame>
  );
}

function EnterRepIdMockup() {
  return (
    <MockupFrame label="Search for a representative">
      <div className="rounded-md border border-border/70 p-3">
        <div className="mb-2 text-[11px] font-semibold">Enter RepID, GroupID or BN</div>
        <div className="flex gap-2">
          <div className="flex-1 rounded border-2 border-accent bg-accent/5 px-2 py-1.5 text-[11px] font-mono font-bold tracking-wider text-accent">
            {CRA_REP.repId}
          </div>
          <div className="rounded bg-[#0c2340] px-3 py-1.5 text-[10px] font-semibold text-white">
            Search
          </div>
        </div>
        <div className="mt-2 text-[9px] text-muted">RepID · GroupID · BN</div>
      </div>
    </MockupFrame>
  );
}

function ConfirmRepMockup() {
  return (
    <MockupFrame label="Confirm representative">
      <div className="rounded-md border-2 border-success/60 bg-success/5 p-3">
        <div className="mb-1 text-[10px] font-semibold text-success">✓ Representative found</div>
        <div className="text-[12px] font-bold text-foreground">{CRA_REP.fullName}</div>
        <div className="mt-1 space-y-0.5 text-[10px] text-muted">
          <div>RepID: <span className="font-mono font-semibold">{CRA_REP.repId}</span></div>
          <div>Phone: {CONTACT.phone}</div>
          <div>Email: {CONTACT.email}</div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <div className="rounded bg-[#0c2340] px-4 py-1.5 text-[10px] font-semibold text-white">Next →</div>
      </div>
    </MockupFrame>
  );
}

function SelectAccountsMockup({ isBusiness }: { isBusiness: boolean }) {
  return (
    <MockupFrame label="Select accounts">
      <div className="rounded-md border border-border/70 p-3">
        <div className="mb-2 text-[11px] font-semibold">
          {isBusiness ? "Select accounts to authorize" : "Areas of authorization"}
        </div>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 rounded bg-accent/5 p-1.5 text-[10px]">
            <span className="flex h-3 w-3 items-center justify-center rounded-sm bg-accent text-white">✓</span>
            <span className="font-semibold text-foreground">
              {isBusiness ? "All accounts (current & future)" : "All tax years"}
            </span>
          </label>
          {isBusiness ? (
            <>
              <div className="pl-5 text-[9px] text-muted">• GST/HST · Payroll · Corporate Income Tax · T2</div>
            </>
          ) : (
            <div className="pl-5 text-[9px] text-muted">• T1 personal tax · Benefits · RRSP/TFSA contributions</div>
          )}
        </div>
      </div>
    </MockupFrame>
  );
}

function AuthLevelMockup() {
  return (
    <MockupFrame label="Authorization level & expiry">
      <div className="space-y-2">
        <div className="rounded border border-border p-2 text-[10px]">
          <span className="font-semibold">Level 1</span> · View only
        </div>
        <div className="rounded border-2 border-accent bg-accent/5 p-2 text-[10px]">
          <span className="font-semibold text-accent">Level 2</span> · View + Update (recommended)
        </div>
        <div className="rounded border border-border p-2 text-[10px]">
          <span className="font-semibold">Level 3</span> · Delegate authority
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px]">
          <span className="flex h-3 w-3 items-center justify-center rounded-sm bg-accent text-white">✓</span>
          <span>Does not expire</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function ReviewSubmitMockup() {
  return (
    <MockupFrame label="Review & submit">
      <div className="space-y-2">
        <div className="rounded border border-border p-2 text-[10px]">
          <div className="font-semibold">{CRA_REP.fullName}</div>
          <div className="text-muted">RepID: {CRA_REP.repId} · Level 2 · Does not expire</div>
        </div>
        <label className="flex items-start gap-2 text-[10px]">
          <span className="mt-0.5 flex h-3 w-3 items-center justify-center rounded-sm bg-accent text-white">✓</span>
          <span className="text-muted">
            I confirm the CRA may deal directly with the above named representative.
          </span>
        </label>
        <div className="flex justify-end">
          <div className="rounded bg-success px-4 py-1.5 text-[10px] font-semibold text-white">Submit</div>
        </div>
      </div>
    </MockupFrame>
  );
}

// ---------- Step definitions ----------

const commonSteps = (isBusiness: boolean): Step[] => [
  {
    title: "Visit the CRA Website",
    description:
      "Go to the Canada Revenue Agency's website and click on 'CRA sign in' to proceed to login.",
    mockup: <Step1Mockup />,
  },
  {
    title: "Sign In to Your CRA Account",
    description:
      "Enter your login credentials using your bank sign-in, GCKey, or your CRA user ID and password. Complete any security verification if prompted.",
    mockup: <Step2Mockup />,
  },
  {
    title: isBusiness ? "Select Your Business Account" : "Access My Account",
    description: isBusiness
      ? "On the Welcome page, select 'Business' to access your My Business Account. If you have multiple businesses, you can select 'Select to access all BNs'."
      : "After signing in, you'll land on the My Account overview. From the left menu, navigate to 'Profile' to manage your account details.",
    note: isBusiness
      ? "If you don't see your corporation listed, click '+ Add account' to add your business. If you are unable to add yourself, you will need to call the CRA Business Enquiries line at 1-800-959-5525 to get approval from CRA."
      : undefined,
    mockup: isBusiness ? <Step3BusinessMockup /> : <Step3IndividualMockup />,
  },
  {
    title: isBusiness ? "View Your Business Overview" : "Review Your Account Overview",
    description: isBusiness
      ? "You'll see your Business Overview dashboard. Make sure you see your business name in the header. Navigate to 'Profile' from the left menu."
      : "You'll see your account overview with balances, returns, and benefits. Click on 'Profile' to proceed.",
    mockup: <ProfileMockup isBusiness={isBusiness} />,
  },
  {
    title: isBusiness ? "Navigate to Your Business Profile" : "Open Your Profile",
    description: isBusiness
      ? "In the Profile section, you'll see your business information including addresses and phone numbers on file."
      : "In the Profile section, you'll see your personal information, addresses, and representative settings.",
    mockup: <ProfileMockup isBusiness={isBusiness} />,
  },
  {
    title: "Find Authorized Representatives",
    description:
      "Scroll down to find the 'Authorized representatives' section on the right side. Click on '+ Add' to start adding a new representative.",
    mockup: <ProfileMockup isBusiness={isBusiness} />,
  },
  {
    title: "Start the Authorization Process",
    description:
      "Review the 'Before you begin' information. This authorization allows your representative to deal with CRA on your behalf. Click 'Start' to proceed.",
    mockup: <AuthStartMockup />,
  },
  {
    title: `Enter ${CRA_REP.firmName}'s Rep ID`,
    description:
      "In the 'RepID, GroupID or BN' field, enter our Rep ID and click 'Search' to find us.",
    mockup: <EnterRepIdMockup />,
  },
  {
    title: `Confirm ${CRA_REP.firmName}'s Information`,
    description: `Verify you see '${CRA_REP.repName}' with Rep ID ${CRA_REP.repId} and phone number ${CONTACT.phone}. Click 'Next' to continue.`,
    mockup: <ConfirmRepMockup />,
  },
  {
    title: "Select Areas for Authorization",
    description: isBusiness
      ? "Select 'All accounts' to include all current and any future accounts (GST/HST, Payroll, Corporate Income Tax, etc.). Click 'Next'."
      : "Select 'All tax years' so we can assist with current and past returns as well as future filings. Click 'Next'.",
    mockup: <SelectAccountsMockup isBusiness={isBusiness} />,
  },
  {
    title: "Select Authorization Details",
    description:
      "Select 'Level 2' for Authorization level (allows viewing information AND making changes). Check 'Does not expire' for the expiry date. Click 'Next'.",
    note: `We recommend Level 2 so we can fully assist you with your ${
      isBusiness ? "business" : "personal"
    } tax matters, including filing and responding to CRA inquiries.`,
    mockup: <AuthLevelMockup />,
  },
  {
    title: "Review and Confirm",
    description:
      "Review all the information displayed. Check the box that says 'I confirm that the CRA may deal directly with the above named representative...' and click 'Submit'. You will receive a confirmation that the authorization was successful.",
    mockup: <ReviewSubmitMockup />,
  },
];

// ---------- Main component ----------

export function CRAAuthorization({ locale }: { locale: string }) {
  const [audience, setAudience] = useState<Audience>("individuals");
  const [copied, setCopied] = useState(false);

  const isBusiness = audience === "businesses";
  const steps = commonSteps(isBusiness);

  const copyRepId = async () => {
    try {
      await navigator.clipboard.writeText(CRA_REP.repId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <ShieldCheck className="h-3.5 w-3.5" /> CRA Authorization Guide
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Add {CRA_REP.repName} as Your CRA Representative
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Authorize us to access your tax information so we can help prepare your returns,
              communicate with CRA, and resolve issues on your behalf.
            </p>
          </div>

          {/* Rep ID card */}
          <div className="mx-auto mt-10 max-w-xl">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-center text-white shadow-[0_10px_40px_rgba(26,46,74,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,146,42,0.18),transparent_60%)]" />
              <div className="relative">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent/80">
                  CloudKeeping Rep ID
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="font-mono text-5xl font-black tracking-widest sm:text-6xl">
                    {CRA_REP.repId}
                  </div>
                  <button
                    onClick={copyRepId}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white/20"
                    aria-label="Copy Rep ID"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-3 text-sm text-white/70">
                  You&apos;ll need this code when adding us as your representative
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why add us */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Why Add Us as Your Representative?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Access your tax information securely to prepare returns",
                "Communicate with CRA on your behalf",
                "Respond to CRA inquiries and resolve issues quickly",
                "Submit documents and make changes to your account",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-white p-4"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              This authorization is secure, can be revoked anytime, and gives you peace of mind.
            </p>
          </div>
        </Container>
      </section>

      {/* Before you begin + Toggle */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">Before You Begin</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Make sure you have access to your CRA account. If you don&apos;t have one, register first:
              </p>
              <a
                href="https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Register for CRA My Account <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Audience Toggle */}
            <div className="mt-10">
              <div className="mx-auto flex max-w-lg rounded-xl border border-border/80 bg-white p-1.5 shadow-sm">
                <button
                  onClick={() => setAudience("individuals")}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all",
                    audience === "individuals"
                      ? "bg-primary text-white shadow"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    For Individuals
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 text-[10px] font-normal tracking-wider uppercase",
                      audience === "individuals" ? "text-white/60" : "text-muted"
                    )}
                  >
                    Personal Tax (My Account)
                  </div>
                </button>
                <button
                  onClick={() => setAudience("businesses")}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all",
                    audience === "businesses"
                      ? "bg-primary text-white shadow"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="h-4 w-4" />
                    For Businesses
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 text-[10px] font-normal tracking-wider uppercase",
                      audience === "businesses" ? "text-white/60" : "text-muted"
                    )}
                  >
                    Corporate Tax (My Business Account)
                  </div>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-muted">
                Instructions update based on your selection.
              </p>
            </div>

            {/* Business-only note */}
            {isBusiness && (
              <div className="mt-8 flex gap-3 rounded-xl border border-accent/30 bg-accent/5 p-5">
                <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Important: Multiple Corporations</div>
                  <p className="mt-1 text-sm text-muted">
                    Each corporation must be added separately. If you are giving access to multiple
                    corporations, please repeat Steps 3–12 for each corporation after completing the first one.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-5xl space-y-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="grid gap-6 rounded-2xl border border-border/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:p-8 lg:grid-cols-2 lg:items-center"
              >
                <div className="order-2 lg:order-1">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{step.description}</p>

                  {idx === 0 && (
                    <a
                      href="https://www.canada.ca/en/revenue-agency.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
                    >
                      Go to CRA Website <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {idx === 7 && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent/10 p-3">
                      <div className="font-mono text-lg font-bold tracking-widest text-accent">
                        {CRA_REP.repId}
                      </div>
                      <button
                        onClick={copyRepId}
                        className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm hover:bg-surface"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  )}

                  {step.note && (
                    <div className="mt-4 rounded-lg border border-border bg-surface-alt p-3 text-xs text-muted">
                      <span className="font-semibold text-foreground">Note: </span>
                      {step.note}
                    </div>
                  )}
                </div>
                <div className="order-1 lg:order-2">{step.mockup}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What happens next */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-success/30 bg-success/5 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">What Happens Next?</h3>
              <ul className="mt-4 space-y-2">
                {[
                  `${CRA_REP.firmName} will receive immediate access to your tax account`,
                  `You will see ${CRA_REP.repName} listed in your Authorized Representatives section`,
                  "We can now access your tax information and assist you",
                  "Please notify us once you have completed this process",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Option 2: Pending authorization */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Option 2: Confirm a Pending Authorization Request
            </h2>
            <p className="mt-2 text-muted">
              If we have already submitted a request on your behalf, you can confirm it instead of
              adding us manually.
            </p>

            <ol className="mt-6 space-y-3">
              {[
                "Sign in to your CRA My Account or My Business Account",
                "Go to Profile → Authorized representative(s)",
                "Click \"Confirm pending authorizations\"",
                `Find ${CRA_REP.repName} in the list`,
                "Click on our name, review the request, and select \"Confirm authorization\"",
                "Check the confirmation box and click \"Submit\"",
              ].map((txt, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-white p-4"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{txt}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Quick Reference */}
      <section className="bg-primary py-16 lg:py-20 text-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              Quick Reference Summary
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "CloudKeeping Rep ID", value: CRA_REP.repId, mono: true },
                { label: "Authorization Level", value: "Level 2 (Recommended)" },
                { label: "Online Access", value: "Yes" },
                { label: "Expiry", value: "Does not expire" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/80">
                    {item.label}
                  </div>
                  <div
                    className={cn(
                      "mt-2 text-white",
                      item.mono ? "font-mono text-xl font-bold tracking-widest" : "text-base font-medium"
                    )}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur sm:p-8">
              <CircleHelp className="mx-auto h-6 w-6 text-accent" />
              <h3 className="mt-3 text-lg font-semibold">Need Help?</h3>
              <p className="mt-1.5 text-sm text-white/70">
                If you encounter any issues or have questions about this process, please don&apos;t
                hesitate to contact us.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
                >
                  <Phone className="h-4 w-4" /> {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageSquare className="h-4 w-4" /> WhatsApp
                </a>
                <LinkButton href={`/${locale}/contact`} variant="primary" size="md">
                  Contact Us
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
