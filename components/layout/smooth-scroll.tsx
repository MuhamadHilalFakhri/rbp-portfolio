"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";
import { registerLenis } from "@/lib/smooth-scroll";

const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    registerLenis(lenis);

    let rafId = 0;
    let disposed = false;

    function raf(time: number): void {
      if (disposed) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      disposed = true;
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
