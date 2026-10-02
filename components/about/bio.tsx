"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BioParagraphs } from "./bio-paragraphs";
import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

export function Bio({
  heading = "h2",
  summary,
}: {
  heading?: "h1" | "h2";
  summary?: string;
}): ReactNode {
  const [expanded, setExpanded] = useState(false);
  const Heading = heading;
  const reducedMotion = useReducedMotion();
  const detailId = useId();

  return (
    <div className="border-foreground/5 rounded-3xl border bg-[#fbfbfb] p-5 min-[360px]:p-6 sm:rounded-4xl sm:p-12 dark:bg-[#111111]">
      <Heading className="text-foreground font-serif text-[1.6rem] font-medium tracking-tight min-[360px]:text-[1.75rem] sm:text-[2rem]">
        Hello! I&rsquo;m{" "}
        <span className="border-foreground/30 border-b pb-0.5">
          Muhamad Hilal Fakhri
        </span>
        .
      </Heading>
      <div
        id={detailId}
        className="text-foreground/75 mt-6 text-justify text-[16px] leading-[1.7] tracking-tight sm:mt-8 sm:text-[18px]"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={summary && !expanded ? "summary" : "full"}
            initial={{
              height: reducedMotion ? "auto" : 0,
              opacity: reducedMotion ? 1 : 0,
            }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{
              height: reducedMotion ? "auto" : 0,
              opacity: reducedMotion ? 1 : 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            {summary && !expanded ? <p>{summary}</p> : <BioParagraphs />}
          </motion.div>
        </AnimatePresence>
      </div>

      {(summary || !expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={detailId}
          className={`focus-ring text-foreground/70 hover:text-foreground mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-md py-2 text-sm font-medium tracking-tight transition-colors ${summary ? "" : "sm:hidden"}`}
        >
          {expanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}
