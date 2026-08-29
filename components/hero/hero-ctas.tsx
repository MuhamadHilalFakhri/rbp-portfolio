"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { ContactButton } from "@/components/contact/contact-button";

export function HeroCtas(): ReactNode {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <ContactButton />

      <div>
        <a
          href="/CV%20-%20Muhamad%20Hilal%20Fakhri.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring group border-foreground/5 bg-background text-foreground hover:bg-foreground/4 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium shadow-2xl transition-colors sm:py-2.5"
        >
          View CV
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}
