"use client";

type GAEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent({ action, category, label, value }: GAEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackFormSubmit() {
  sendEvent({
    action: "form_submit",
    category: "Contact",
    label: "Contact Form Submission",
  });
}

export function trackCTAClick(label: string) {
  sendEvent({
    action: "cta_click",
    category: "CTA",
    label,
  });
}

export function trackPhoneClick() {
  sendEvent({
    action: "tel_click",
    category: "Contact",
    label: "Phone Number Click",
  });
}

export function trackEmailClick() {
  sendEvent({
    action: "mailto_click",
    category: "Contact",
    label: "Email Link Click",
  });
}
