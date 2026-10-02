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
  return (
    <div
      className="mb-5 flex flex-wrap gap-2"
      role="group"
      aria-label="Filter kategori proyek"
    >
      {PROJECT_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={filter === value}
          onClick={() => onChange(filter)}
          className={`focus-ring cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${filter === value ? "border-foreground bg-foreground text-background" : "border-foreground/15 bg-background text-foreground/65 hover:border-foreground/35 hover:text-foreground"}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
