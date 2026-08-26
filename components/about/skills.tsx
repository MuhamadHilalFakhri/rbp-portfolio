import type { ReactNode } from "react";

const SKILLS = [
  "Frontend Development",
  "Backend Development",
  "PHP & Laravel",
  "REST API Development",
  "SQL & Database Management",
  "System Analysis & Design",
  "Git & Version Control",
];

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3" data-scroll-reveal-item>
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        What I do
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-3xl border p-2 sm:rounded-4xl sm:p-4">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="border-foreground/8 bg-background text-foreground/85 max-w-full rounded-full border px-3 py-2 text-center text-[13px] tracking-tight break-words min-[360px]:text-[14px] sm:px-4 sm:text-[15px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
