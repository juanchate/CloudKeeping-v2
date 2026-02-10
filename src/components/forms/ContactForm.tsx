"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { trackFormSubmit } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

type FormDict = Dictionary["form"];
type FormValues = { name: string; email: string; phone?: string; message: string; honeypot?: string };

const inputStyles =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/40 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

interface ContactFormProps { content: FormDict }

export function ContactForm({ content }: ContactFormProps) {
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, content.errors.nameRequired).max(100, content.errors.nameMax),
        email: z.string().min(1, content.errors.emailRequired).email(content.errors.emailInvalid),
        phone: z.string().max(30, content.errors.phoneMax).optional().or(z.literal("")),
        message: z.string().min(10, content.errors.messageMin).max(2000, content.errors.messageMax),
        honeypot: z.string().max(0).optional(),
      }),
    [content.errors]
  );

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || content.errors.generic);
      }
      setSubmitStatus("success");
      trackFormSubmit();
      reset();
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err instanceof Error ? err.message : content.errors.generic);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="rounded-2xl border border-green-200/60 bg-green-50/50 p-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-success" />
        <h3 className="text-xl font-semibold text-foreground mb-2">{content.successTitle}</h3>
        <p className="text-muted text-sm leading-relaxed">{content.successMessage}</p>
        <button onClick={() => setSubmitStatus("idle")} className="mt-6 text-sm font-medium text-accent hover:text-accent-dark transition-colors">{content.sendAnother}</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input id="honeypot" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{content.name} <span className="text-accent">{content.required}</span></label>
        <input id="name" type="text" autoComplete="name" className={cn(inputStyles, errors.name ? "border-error" : "border-border/60")} placeholder={content.namePlaceholder} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
        {errors.name && <p id="name-error" className="mt-1.5 text-xs text-error" role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{content.email} <span className="text-accent">{content.required}</span></label>
        <input id="email" type="email" autoComplete="email" className={cn(inputStyles, errors.email ? "border-error" : "border-border/60")} placeholder={content.emailPlaceholder} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        {errors.email && <p id="email-error" className="mt-1.5 text-xs text-error" role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">{content.phone} <span className="text-muted text-xs font-normal">{content.optional}</span></label>
        <input id="phone" type="tel" autoComplete="tel" className={cn(inputStyles, errors.phone ? "border-error" : "border-border/60")} placeholder={content.phonePlaceholder} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
        {errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-error" role="alert">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{content.message} <span className="text-accent">{content.required}</span></label>
        <textarea id="message" rows={5} className={cn(inputStyles, "resize-y", errors.message ? "border-error" : "border-border/60")} placeholder={content.messagePlaceholder} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
        {errors.message && <p id="message-error" className="mt-1.5 text-xs text-error" role="alert">{errors.message.message}</p>}
      </div>

      {submitStatus === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200/60 bg-red-50/50 p-4" role="alert" aria-live="polite">
          <AlertCircle className="h-5 w-5 shrink-0 text-error mt-0.5" />
          <p className="text-sm text-error">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitStatus === "loading"} trackLabel="Contact Form - Submit">
        {submitStatus === "loading" ? (<><Loader2 className="h-4 w-4 animate-spin" />{content.sending}</>) : content.submit}
      </Button>
    </form>
  );
}
