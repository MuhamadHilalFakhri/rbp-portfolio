import { DialogTitle } from "@/components/ui/dialog";
import type { Project } from "./project-types";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div
      data-lenis-prevent
      className="flex min-h-0 flex-col gap-3.5 overflow-y-auto overscroll-contain p-4 min-[360px]:gap-4 min-[360px]:p-5 sm:p-6"
    >
      <div className="flex items-center gap-2.5">
        <span className="border-foreground/10 bg-background inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
          <project.icon
            className="text-foreground h-4 w-4"
            aria-hidden="true"
          />
        </span>
        <DialogTitle className="text-foreground text-sm font-medium tracking-tight">
          {project.iconLabel}
        </DialogTitle>
        <span className="text-foreground/50 ml-auto text-[12px] tracking-tight">
          {project.meta}
        </span>
      </div>

      <h3 className="text-foreground text-[20px] leading-[1.25] font-medium tracking-tight sm:text-[24px]">
        {project.title}
      </h3>

      <p className="text-foreground/65 text-[14px] leading-relaxed tracking-tight sm:text-[15px]">
        {project.overview}
      </p>

      {project.highlights.length > 0 ? (
        <ul className="mt-1 flex flex-col gap-2.5 pb-1">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="text-foreground/75 flex items-start gap-2.5 text-[13.5px] leading-snug tracking-tight sm:text-[14px]"
            >
              <span
                aria-hidden="true"
                className="bg-foreground/30 mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
              />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
