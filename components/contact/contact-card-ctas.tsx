"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactButton } from "./contact-button";

export function ContactCardCtas(): ReactNode {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <ContactButton />

      <div>
        <Link
          href="/projects"
          className="focus-ring group border-foreground/5 bg-background text-foreground inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium shadow-md/2 transition-colors sm:py-2.5"
        >
          See projects
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
