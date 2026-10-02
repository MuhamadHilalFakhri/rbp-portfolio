"use client";

import { useEffect, useState } from "react";

export function useActiveSection(pathname: string) {
  const [section, setSection] = useState(0);
  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * 0.35, 240);
      const about = document.getElementById("about");
      const projects = document.getElementById("projects");
      setSection(
        projects && projects.getBoundingClientRect().top <= marker
          ? 2
          : about && about.getBoundingClientRect().top <= marker
            ? 1
            : 0
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
  return section;
}
