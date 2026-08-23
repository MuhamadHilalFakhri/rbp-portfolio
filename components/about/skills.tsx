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
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        What I do
      </h3>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
