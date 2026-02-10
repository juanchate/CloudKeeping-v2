"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";
import { LinkButton } from "@/components/ui/LinkButton";
import { Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackPhoneClick } from "@/lib/analytics";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-end px-4">
          <button
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted hover:text-foreground hover:bg-surface"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                pathname === item.href
                  ? "text-primary bg-surface-alt"
                  : "text-muted hover:text-foreground hover:bg-surface"
              )}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
            <LinkButton
              href="/contact"
              variant="primary"
              size="md"
              trackLabel="Mobile Nav - Book a Consultation"
              className="w-full"
            >
              Book a Consultation
            </LinkButton>

            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              onClick={() => trackPhoneClick()}
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
