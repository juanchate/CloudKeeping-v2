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
type LocaleKey = "en" | "es";

// ---------- Translations ----------

const T = {
  en: {
    heroBadge: "CRA Authorization Guide",
    heroTitlePrefix: "Add ",
    heroTitleSuffix: " as Your CRA Representative",
    heroSubtitle:
      "Authorize us to access your tax information so we can help prepare your returns, communicate with CRA, and resolve issues on your behalf.",
    repIdLabel: "CloudKeeping Rep ID",
    repIdHelper: "You'll need this code when adding us as your representative",
    copy: "Copy",
    copied: "Copied",
    whyTitle: "Why Add Us as Your Representative?",
    whyBullets: [
      "Access your tax information securely to prepare returns",
      "Communicate with CRA on your behalf",
      "Respond to CRA inquiries and resolve issues quickly",
      "Submit documents and make changes to your account",
    ],
    whyFooter:
      "This authorization is secure, can be revoked anytime, and gives you peace of mind.",
    beforeTitle: "Before You Begin",
    beforeBody:
      "Make sure you have access to your CRA account. If you don't have one, register first:",
    registerButton: "Register for CRA My Account",
    individuals: "For Individuals",
    individualsSub: "Personal Tax (My Account)",
    businesses: "For Businesses",
    businessesSub: "Corporate Tax (My Business Account)",
    toggleHelper: "Instructions update based on your selection.",
    multiCorpTitle: "Important: Multiple Corporations",
    multiCorpBody:
      "Each corporation must be added separately. If you are giving access to multiple corporations, please repeat Steps 3–12 for each corporation after completing the first one.",
    goToCRA: "Go to CRA Website",
    noteLabel: "Note:",
    whatNextTitle: "What Happens Next?",
    whatNextItems: (firm: string, name: string) => [
      `${firm} will receive immediate access to your tax account`,
      `You will see ${name} listed in your Authorized Representatives section`,
      "We can now access your tax information and assist you",
      "Please notify us once you have completed this process",
    ],
    option2Title: "Option 2: Confirm a Pending Authorization Request",
    option2Body:
      "If we have already submitted a request on your behalf, you can confirm it instead of adding us manually.",
    option2Steps: (name: string) => [
      "Sign in to your CRA My Account or My Business Account",
      "Go to Profile → Authorized representative(s)",
      'Click "Confirm pending authorizations"',
      `Find ${name} in the list`,
      'Click on our name, review the request, and select "Confirm authorization"',
      'Check the confirmation box and click "Submit"',
    ],
    summaryTitle: "Quick Reference Summary",
    summary: {
      repId: "CloudKeeping Rep ID",
      level: "Authorization Level",
      levelValue: "Level 2 (Recommended)",
      online: "Online Access",
      onlineValue: "Yes",
      expiry: "Expiry",
      expiryValue: "Does not expire",
    },
    helpTitle: "Need Help?",
    helpBody:
      "If you encounter any issues or have questions about this process, please don't hesitate to contact us.",
    whatsapp: "WhatsApp",
    contactUs: "Contact Us",
    steps: (isBusiness: boolean, firm: string, name: string, repId: string, phone: string): Step[] => [
      {
        title: "Visit the CRA Website",
        description:
          "Go to the Canada Revenue Agency's website and click on 'CRA sign in' to proceed to login.",
      },
      {
        title: "Sign In to Your CRA Account",
        description:
          "Enter your login credentials using your bank sign-in, GCKey, or your CRA user ID and password. Complete any security verification if prompted.",
      },
      {
        title: isBusiness ? "Select Your Business Account" : "Access My Account",
        description: isBusiness
          ? "On the Welcome page, select 'Business' to access your My Business Account. If you have multiple businesses, you can select 'Select to access all BNs'."
          : "After signing in, you'll land on the My Account overview. From the left menu, navigate to 'Profile' to manage your account details.",
        note: isBusiness
          ? "If you don't see your corporation listed, click '+ Add account' to add your business. If you are unable to add yourself, you will need to call the CRA Business Enquiries line at 1-800-959-5525 to get approval from CRA."
          : undefined,
      },
      {
        title: isBusiness ? "View Your Business Overview" : "Review Your Account Overview",
        description: isBusiness
          ? "You'll see your Business Overview dashboard. Make sure you see your business name in the header. Navigate to 'Profile' from the left menu."
          : "You'll see your account overview with balances, returns, and benefits. Click on 'Profile' to proceed.",
      },
      {
        title: isBusiness ? "Navigate to Your Business Profile" : "Open Your Profile",
        description: isBusiness
          ? "In the Profile section, you'll see your business information including addresses and phone numbers on file."
          : "In the Profile section, you'll see your personal information, addresses, and representative settings.",
      },
      {
        title: "Find Authorized Representatives",
        description:
          "Scroll down to find the 'Authorized representatives' section on the right side. Click on '+ Add' to start adding a new representative.",
      },
      {
        title: "Start the Authorization Process",
        description:
          "Review the 'Before you begin' information. This authorization allows your representative to deal with CRA on your behalf. Click 'Start' to proceed.",
      },
      {
        title: `Enter ${firm}'s Rep ID`,
        description:
          "In the 'RepID, GroupID or BN' field, enter our Rep ID and click 'Search' to find us.",
      },
      {
        title: `Confirm ${firm}'s Information`,
        description: `Verify you see '${name}' with Rep ID ${repId} and phone number ${phone}. Click 'Next' to continue.`,
      },
      {
        title: "Select Areas for Authorization",
        description: isBusiness
          ? "Select 'All accounts' to include all current and any future accounts (GST/HST, Payroll, Corporate Income Tax, etc.). Click 'Next'."
          : "Select 'All tax years' so we can assist with current and past returns as well as future filings. Click 'Next'.",
      },
      {
        title: "Select Authorization Details",
        description:
          "Select 'Level 2' for Authorization level (allows viewing information AND making changes). Check 'Does not expire' for the expiry date. Click 'Next'.",
        note: `We recommend Level 2 so we can fully assist you with your ${
          isBusiness ? "business" : "personal"
        } tax matters, including filing and responding to CRA inquiries.`,
      },
      {
        title: "Review and Confirm",
        description:
          "Review all the information displayed. Check the box that says 'I confirm that the CRA may deal directly with the above named representative...' and click 'Submit'. You will receive a confirmation that the authorization was successful.",
      },
    ],
  },
  es: {
    heroBadge: "Guía de Autorización CRA",
    heroTitlePrefix: "Agrega a ",
    heroTitleSuffix: " como tu Representante ante la CRA",
    heroSubtitle:
      "Autorízanos a acceder a tu información fiscal para que podamos ayudarte a preparar tus declaraciones, comunicarnos con la CRA y resolver asuntos en tu nombre.",
    repIdLabel: "Rep ID de CloudKeeping",
    repIdHelper: "Necesitarás este código al agregarnos como tu representante",
    copy: "Copiar",
    copied: "Copiado",
    whyTitle: "¿Por Qué Agregarnos como tu Representante?",
    whyBullets: [
      "Accedemos a tu información fiscal de forma segura para preparar declaraciones",
      "Nos comunicamos con la CRA en tu nombre",
      "Respondemos a consultas de la CRA y resolvemos problemas rápidamente",
      "Enviamos documentos y realizamos cambios en tu cuenta",
    ],
    whyFooter:
      "Esta autorización es segura, puede revocarse en cualquier momento y te da tranquilidad.",
    beforeTitle: "Antes de Comenzar",
    beforeBody:
      "Asegúrate de tener acceso a tu cuenta CRA. Si no tienes una, regístrate primero:",
    registerButton: "Registrarse en CRA My Account",
    individuals: "Para Individuos",
    individualsSub: "Impuesto Personal (My Account)",
    businesses: "Para Empresas",
    businessesSub: "Impuesto Corporativo (My Business Account)",
    toggleHelper: "Las instrucciones se actualizan según tu selección.",
    multiCorpTitle: "Importante: Múltiples Corporaciones",
    multiCorpBody:
      "Cada corporación debe agregarse por separado. Si estás dando acceso a varias corporaciones, repite los pasos 3–12 para cada una después de completar la primera.",
    goToCRA: "Ir al Sitio de la CRA",
    noteLabel: "Nota:",
    whatNextTitle: "¿Qué Pasa Después?",
    whatNextItems: (firm: string, name: string) => [
      `${firm} recibirá acceso inmediato a tu cuenta fiscal`,
      `Verás a ${name} listado en tu sección de Representantes Autorizados`,
      "Ya podremos acceder a tu información fiscal y asistirte",
      "Por favor avísanos cuando hayas completado este proceso",
    ],
    option2Title: "Opción 2: Confirmar una Solicitud de Autorización Pendiente",
    option2Body:
      "Si ya enviamos una solicitud en tu nombre, puedes confirmarla en lugar de agregarnos manualmente.",
    option2Steps: (name: string) => [
      "Inicia sesión en tu CRA My Account o My Business Account",
      "Ve a Profile → Authorized representative(s)",
      'Haz clic en "Confirm pending authorizations"',
      `Encuentra a ${name} en la lista`,
      'Haz clic en nuestro nombre, revisa la solicitud y selecciona "Confirm authorization"',
      'Marca la casilla de confirmación y haz clic en "Submit"',
    ],
    summaryTitle: "Resumen de Referencia Rápida",
    summary: {
      repId: "Rep ID de CloudKeeping",
      level: "Nivel de Autorización",
      levelValue: "Nivel 2 (Recomendado)",
      online: "Acceso en Línea",
      onlineValue: "Sí",
      expiry: "Vencimiento",
      expiryValue: "No expira",
    },
    helpTitle: "¿Necesitas Ayuda?",
    helpBody:
      "Si tienes algún problema o pregunta sobre este proceso, no dudes en contactarnos.",
    whatsapp: "WhatsApp",
    contactUs: "Contáctanos",
    steps: (isBusiness: boolean, firm: string, name: string, repId: string, phone: string): Step[] => [
      {
        title: "Visita el Sitio Web de la CRA",
        description:
          "Ve al sitio web de la Canada Revenue Agency y haz clic en 'CRA sign in' para proceder al inicio de sesión.",
      },
      {
        title: "Inicia Sesión en tu Cuenta CRA",
        description:
          "Ingresa tus credenciales usando el inicio de sesión de tu banco, GCKey o tu ID de usuario y contraseña de la CRA. Completa cualquier verificación de seguridad si se solicita.",
      },
      {
        title: isBusiness ? "Selecciona tu Cuenta Empresarial" : "Accede a My Account",
        description: isBusiness
          ? "En la página de bienvenida, selecciona 'Business' para acceder a tu My Business Account. Si tienes varias empresas, puedes seleccionar 'Select to access all BNs'."
          : "Después de iniciar sesión, llegarás a la vista general de My Account. Desde el menú izquierdo, navega a 'Profile' para gestionar los detalles de tu cuenta.",
        note: isBusiness
          ? "Si no ves tu corporación listada, haz clic en '+ Add account' para agregar tu empresa. Si no puedes agregarte, deberás llamar a la línea de Consultas Empresariales de la CRA al 1-800-959-5525 para obtener aprobación."
          : undefined,
      },
      {
        title: isBusiness ? "Revisa la Vista General de tu Empresa" : "Revisa la Vista General de tu Cuenta",
        description: isBusiness
          ? "Verás el panel de Business Overview. Asegúrate de ver el nombre de tu empresa en el encabezado. Navega a 'Profile' desde el menú izquierdo."
          : "Verás tu vista general de cuenta con saldos, declaraciones y beneficios. Haz clic en 'Profile' para continuar.",
      },
      {
        title: isBusiness ? "Navega al Perfil de tu Empresa" : "Abre tu Perfil",
        description: isBusiness
          ? "En la sección Profile verás la información de tu empresa, incluyendo direcciones y teléfonos registrados."
          : "En la sección Profile verás tu información personal, direcciones y configuración de representantes.",
      },
      {
        title: "Encuentra Representantes Autorizados",
        description:
          "Desplázate hacia abajo para encontrar la sección 'Authorized representatives' del lado derecho. Haz clic en '+ Add' para comenzar a agregar un nuevo representante.",
      },
      {
        title: "Inicia el Proceso de Autorización",
        description:
          "Revisa la información de 'Before you begin'. Esta autorización permite a tu representante tratar con la CRA en tu nombre. Haz clic en 'Start' para continuar.",
      },
      {
        title: `Ingresa el Rep ID de ${firm}`,
        description:
          "En el campo 'RepID, GroupID or BN', ingresa nuestro Rep ID y haz clic en 'Search' para encontrarnos.",
      },
      {
        title: `Confirma la Información de ${firm}`,
        description: `Verifica que veas '${name}' con Rep ID ${repId} y teléfono ${phone}. Haz clic en 'Next' para continuar.`,
      },
      {
        title: "Selecciona las Áreas de Autorización",
        description: isBusiness
          ? "Selecciona 'All accounts' para incluir todas las cuentas actuales y futuras (GST/HST, Nómina, Impuesto Corporativo, etc.). Haz clic en 'Next'."
          : "Selecciona 'All tax years' para que podamos asistirte con declaraciones actuales, pasadas y futuras. Haz clic en 'Next'.",
      },
      {
        title: "Selecciona los Detalles de Autorización",
        description:
          "Selecciona 'Level 2' como nivel de Autorización (permite ver información Y realizar cambios). Marca 'Does not expire' en la fecha de vencimiento. Haz clic en 'Next'.",
        note: `Recomendamos el Nivel 2 para poder asistirte completamente con tus asuntos ${
          isBusiness ? "corporativos" : "personales"
        } fiscales, incluyendo presentaciones y respuestas a consultas de la CRA.`,
      },
      {
        title: "Revisa y Confirma",
        description:
          "Revisa toda la información mostrada. Marca la casilla que dice 'I confirm that the CRA may deal directly with the above named representative...' y haz clic en 'Submit'. Recibirás una confirmación de que la autorización fue exitosa.",
      },
    ],
  },
} as const;

type Step = {
  title: string;
  description: string;
  note?: string;
};

// ---------- Main component ----------

export function CRAAuthorization({ locale }: { locale: string }) {
  const [audience, setAudience] = useState<Audience>("individuals");
  const [copied, setCopied] = useState(false);

  const L: LocaleKey = locale === "es" ? "es" : "en";
  const t = T[L];
  const isBusiness = audience === "businesses";

  const stepContents = t.steps(isBusiness, CRA_REP.firmName, CRA_REP.repName, CRA_REP.repId, CONTACT.phone);

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
              <ShieldCheck className="h-3.5 w-3.5" /> {t.heroBadge}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t.heroTitlePrefix}{CRA_REP.repName}{t.heroTitleSuffix}
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">{t.heroSubtitle}</p>
          </div>

          {/* Rep ID card */}
          <div className="mx-auto mt-10 max-w-xl">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-center text-white shadow-[0_10px_40px_rgba(26,46,74,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,146,42,0.18),transparent_60%)]" />
              <div className="relative">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent/80">
                  {t.repIdLabel}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="font-mono text-5xl font-black tracking-widest sm:text-6xl">
                    {CRA_REP.repId}
                  </div>
                  <button
                    onClick={copyRepId}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white/20"
                    aria-label={t.copy}
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-3 text-sm text-white/70">{t.repIdHelper}</p>
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
              {t.whyTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.whyBullets.map((item) => (
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
            <p className="mt-6 text-sm text-muted">{t.whyFooter}</p>
          </div>
        </Container>
      </section>

      {/* Before you begin + Toggle */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">{t.beforeTitle}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{t.beforeBody}</p>
              <a
                href="https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t.registerButton} <ExternalLink className="h-3.5 w-3.5" />
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
                    {t.individuals}
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 text-[10px] font-normal tracking-wider uppercase",
                      audience === "individuals" ? "text-white/60" : "text-muted"
                    )}
                  >
                    {t.individualsSub}
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
                    {t.businesses}
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 text-[10px] font-normal tracking-wider uppercase",
                      audience === "businesses" ? "text-white/60" : "text-muted"
                    )}
                  >
                    {t.businessesSub}
                  </div>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-muted">{t.toggleHelper}</p>
            </div>

            {/* Business-only note */}
            {isBusiness && (
              <div className="mt-8 flex gap-3 rounded-xl border border-accent/30 bg-accent/5 p-5">
                <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.multiCorpTitle}</div>
                  <p className="mt-1 text-sm text-muted">{t.multiCorpBody}</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {stepContents.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{step.description}</p>

                    {idx === 0 && (
                      <a
                        href="https://www.canada.ca/en/revenue-agency.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
                      >
                        {t.goToCRA} <ExternalLink className="h-3.5 w-3.5" />
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
                          {copied ? t.copied : t.copy}
                        </button>
                      </div>
                    )}

                    {step.note && (
                      <div className="mt-4 rounded-lg border border-border bg-surface-alt p-3 text-xs text-muted">
                        <span className="font-semibold text-foreground">{t.noteLabel} </span>
                        {step.note}
                      </div>
                    )}
                  </div>
                </div>
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
              <h3 className="text-lg font-semibold text-foreground">{t.whatNextTitle}</h3>
              <ul className="mt-4 space-y-2">
                {t.whatNextItems(CRA_REP.firmName, CRA_REP.repName).map((item) => (
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
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{t.option2Title}</h2>
            <p className="mt-2 text-muted">{t.option2Body}</p>

            <ol className="mt-6 space-y-3">
              {t.option2Steps(CRA_REP.repName).map((txt, i) => (
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
              {t.summaryTitle}
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: t.summary.repId, value: CRA_REP.repId, mono: true },
                { label: t.summary.level, value: t.summary.levelValue },
                { label: t.summary.online, value: t.summary.onlineValue },
                { label: t.summary.expiry, value: t.summary.expiryValue },
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
              <h3 className="mt-3 text-lg font-semibold">{t.helpTitle}</h3>
              <p className="mt-1.5 text-sm text-white/70">{t.helpBody}</p>
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
                  <MessageSquare className="h-4 w-4" /> {t.whatsapp}
                </a>
                <LinkButton href={`/${locale}/contact`} variant="primary" size="md">
                  {t.contactUs}
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
