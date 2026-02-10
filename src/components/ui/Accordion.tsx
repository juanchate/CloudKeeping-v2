"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/50">
      <button
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-accent"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-medium text-foreground pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted/50 transition-transform duration-300",
            isOpen && "rotate-180 text-accent"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
        role="region"
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-muted leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}
