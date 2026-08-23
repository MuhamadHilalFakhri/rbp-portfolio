"use client";

import { GraduationCap, School } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = containerRef.current?.querySelectorAll("li");
    if (!items) return;

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col gap-3" ref={containerRef}>
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <SchoolLogo entry={entry} />
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  {entry.school}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
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
      className="border-foreground/15 inline-flex h-12 w-12 shrink-0 items-center justify-center border"
      aria-hidden="true"
      style={{ borderRadius: 14 }}
    >
      <Icon className="h-6 w-6 text-foreground/60" />
    </span>
  );
}
