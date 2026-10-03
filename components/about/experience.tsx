"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import {
  CERTIFICATE,
  EXPERIENCE,
  ORGANIZATION,
  TABS,
  SMOOTH_EASE,
  type Section,
} from "./experience-data";
import { ExperienceEntry } from "./experience-entry";

export function Experience(): ReactNode {
  const [activeSection, setActiveSection] = useState<Section>("experience");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const reducedMotion = Boolean(useReducedMotion());

  const entries =
    activeSection === "experience"
      ? EXPERIENCE
      : activeSection === "organization"
        ? ORGANIZATION
        : CERTIFICATE;

  const changeSection = (nextSection: Section): void => {
    if (nextSection === activeSection) return;

    const currentIndex = TABS.findIndex((tab) => tab.id === activeSection);
    const nextIndex = TABS.findIndex((tab) => tab.id === nextSection);

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setExpandedIndex(null);
    setActiveSection(nextSection);
  };

  return (
    <div className="flex flex-col gap-3" data-scroll-reveal-item>
      <div
        className="border-foreground/10 grid grid-cols-3 border-b"
        role="tablist"
        aria-label="Experience categories"
      >
        {TABS.map((tab) => {
          const isActive = activeSection === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              role="tab"
              id={`experience-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls="experience-tab-panel"
              onClick={() => changeSection(tab.id)}
              whileHover={reducedMotion ? {} : { y: -1 }}
              whileTap={reducedMotion ? {} : { scale: 0.97 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
              className={`focus-ring relative min-w-0 cursor-pointer px-1 py-2 text-[11px] font-medium tracking-tight transition-colors min-[360px]:px-1.5 min-[360px]:text-[12px] sm:px-3 sm:text-[14px] ${
                isActive
                  ? "text-foreground"
                  : "text-foreground/50 hover:text-foreground/75"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive ? (
                <motion.span
                  layoutId="experience-active-tab"
                  className="bg-foreground absolute right-1 bottom-[-1px] left-1 h-0.5 rounded-full"
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                  aria-hidden="true"
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        layout
        data-card-outline
        transition={
          reducedMotion
            ? { duration: 0 }
            : { layout: { duration: 0.42, ease: SMOOTH_EASE } }
        }
        className="border-foreground/5 relative overflow-hidden rounded-3xl border bg-[#fafafa] p-2 sm:rounded-4xl sm:p-4 dark:bg-[#161616]"
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.ul
            key={activeSection}
            id="experience-tab-panel"
            role="tabpanel"
            aria-labelledby={`experience-tab-${activeSection}`}
            custom={direction}
            initial={{
              opacity: 0,
              x: reducedMotion ? 0 : direction * 22,
              filter: reducedMotion ? "none" : "blur(3px)",
            }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              x: reducedMotion ? 0 : direction * -16,
              filter: reducedMotion ? "none" : "blur(2px)",
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.32,
              ease: SMOOTH_EASE,
            }}
            className="flex flex-col gap-2"
          >
            {entries.map((entry, index) => (
              <ExperienceEntry
                key={`${entry.company}-${entry.period}`}
                entry={entry}
                index={index}
                section={activeSection}
                expanded={expandedIndex === index}
                reducedMotion={reducedMotion}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              />
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
