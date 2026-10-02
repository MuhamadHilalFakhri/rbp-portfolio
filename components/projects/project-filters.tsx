"use client";

import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import type { Project } from "./project-types";

export const PROJECT_FILTERS = [
  "Semua",
  "Web App",
  "AI",
  "Automation",
] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

const AI_PROJECTS = new Set([
  "rencana",
  "sawala",
  "skripsi",
  "capstone",
  "automation-trading",
]);

export function matchesProjectFilter(project: Project, filter: ProjectFilter) {
  if (filter === "Web App") return project.id !== "automation-trading";
  if (filter === "AI") return AI_PROJECTS.has(project.id);
  if (filter === "Automation") return project.id === "automation-trading";
  return true;
}

export function ProjectFilters({
  value,
  onChange,
}: {
  value: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <LayoutGroup>
      <div
        className="mb-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter kategori proyek"
      >
        {PROJECT_FILTERS.map((filter) => (
          <motion.button
            key={filter}
            type="button"
            aria-pressed={filter === value}
            onClick={() => onChange(filter)}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            className={`focus-ring relative isolate cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${filter === value ? "text-background border-transparent" : "border-foreground/15 bg-background text-foreground/65 hover:border-foreground/35 hover:text-foreground"}`}
          >
            {filter === value && (
              <motion.span
                layoutId="project-filter-active"
                className="bg-foreground absolute -inset-px -z-10 rounded-full"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 35 }
                }
                aria-hidden="true"
              />
            )}
            <span className="relative">{filter}</span>
          </motion.button>
        ))}
      </div>
    </LayoutGroup>
  );
}
