"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const chips = containerRef.current?.querySelectorAll("span");
    if (!chips) return;

    chips.forEach((chip, index) => {
      gsap.fromTo(
        chip,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.08,
          scrollTrigger: {
            trigger: chip,
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
