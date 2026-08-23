"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps): ReactNode {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
