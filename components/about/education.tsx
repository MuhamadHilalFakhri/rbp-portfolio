import { GraduationCap, School } from "lucide-react";
import type { ReactNode } from "react";

type Entry = {
  school: string;
  degree: string;
  period: string;
  icon: "school" | "university";
};

const ENTRIES: Entry[] = [
  {
    school: "SMAN 1 Kawali",
    degree: "IPA",
    period: "2019 – 2022",
    icon: "school",
  },
  {
    school: "Universitas Muhammadiyah Yogyakarta",
    degree: "S1 Teknologi Informasi",
    period: "2022 – 2026",
    icon: "university",
  },
];

const ROW_HEIGHT = 64;

export function Education(): ReactNode {
  return (
    <div className="flex flex-col gap-3" data-scroll-reveal-item>
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-3xl border p-2 sm:rounded-4xl sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="border-foreground/5 bg-background flex items-center gap-3 rounded-2xl border p-2 sm:gap-4 sm:rounded-3xl"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <SchoolLogo entry={entry} />
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[16px] leading-snug font-semibold tracking-tight break-words sm:text-[18px]">
                  {entry.school}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[13px] leading-snug tracking-tight break-words sm:text-[15px]">
                  {entry.degree}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55">{entry.period}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SchoolLogo({ entry }: { entry: Entry }): ReactNode {
  const Icon = entry.icon === "school" ? School : GraduationCap;
  return (
    <span
      className="border-foreground/15 inline-flex h-10 w-10 shrink-0 items-center justify-center border sm:h-12 sm:w-12"
      aria-hidden="true"
      style={{ borderRadius: 14 }}
    >
      <Icon className="text-foreground/60 h-5 w-5 sm:h-6 sm:w-6" />
    </span>
  );
}
