"use client";

import { RotateCcw } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { CHIPS } from "./stack-data";
import { ChipPill } from "./stack-chip";
import { useStackPhysics } from "./use-stack-physics";
import { StackDetails } from "./stack-details";

export function Stack(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [resetKey, setResetKey] = useState(0);

  useStackPhysics(containerRef, measureRef, chipRefs, resetKey);

  return (
    <div className="flex flex-col gap-3" data-scroll-reveal-item>
      <div className="flex items-center gap-3">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Stack
        </h3>
      </div>

      <div className="border-foreground/5 relative h-80 overflow-hidden rounded-3xl border bg-[#fafafa] sm:h-72 sm:rounded-4xl dark:bg-[#161616]">
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          aria-label="Reset stack"
          className="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
        >
          <RotateCcw
            className="h-4 w-4"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        </button>

        <div
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute top-0 left-0 flex flex-wrap gap-2"
        >
          {CHIPS.map((chip) => (
            <ChipPill key={`m-${chip.label}`} chip={chip} />
          ))}
        </div>

        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab select-none"
          style={{ touchAction: "pan-y" }}
        >
          {CHIPS.map((chip, i) => (
            <div
              key={`${resetKey}-${chip.label}`}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              data-stack-chip
              className="pointer-events-none absolute top-0 left-0 will-change-transform"
              style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
            >
              <ChipPill chip={chip} />
            </div>
          ))}
        </div>
      </div>
      <StackDetails />
    </div>
  );
}
