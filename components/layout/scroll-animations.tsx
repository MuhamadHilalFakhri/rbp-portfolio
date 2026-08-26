"use client";

import { useLayoutEffect, type ReactNode } from "react";

type GsapInstance = (typeof import("gsap"))["gsap"];

let gsapPromise: Promise<GsapInstance> | null = null;

function loadGsap(): Promise<GsapInstance> {
  gsapPromise ??= import("gsap").then((module) => module.gsap);
  return gsapPromise;
}

function getTargets(section: HTMLElement): HTMLElement[] {
  if (!section.hasAttribute("data-scroll-stagger")) return [section];

  const items = Array.from(
    section.querySelectorAll<HTMLElement>("[data-scroll-reveal-item]")
  );
  return items.length > 0 ? items : [section];
}

function showImmediately(targets: HTMLElement[]): void {
  for (const target of targets) {
    target.style.removeProperty("opacity");
    target.style.removeProperty("transform");
    target.style.removeProperty("will-change");
  }
}

export function ScrollAnimations(): ReactNode {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]")
    );
    if (sections.length === 0) return;

    const targetsBySection = new Map<HTMLElement, HTMLElement[]>();
    const activeTweens: Array<{ kill: () => void }> = [];
    let disposed = false;

    for (const section of sections) {
      const targets = getTargets(section);
      targetsBySection.set(section, targets);

      for (const target of targets) {
        target.style.opacity = "0";
        target.style.transform = "translate3d(0, 24px, 0)";
        target.style.willChange = "transform, opacity";
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const section = entry.target as HTMLElement;
          const targets = targetsBySection.get(section) ?? [section];
          observer.unobserve(section);

          void loadGsap()
            .then((gsap) => {
              if (disposed) {
                showImmediately(targets);
                return;
              }

              const tween = gsap.to(targets, {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                stagger: section.hasAttribute("data-scroll-stagger") ? 0.09 : 0,
                ease: "power3.out",
                clearProps: "opacity,transform,visibility,willChange",
                overwrite: "auto",
              });
              activeTweens.push(tween);
            })
            .catch(() => showImmediately(targets));
        }
      },
      {
        rootMargin: "160px 0px",
        threshold: 0.08,
      }
    );

    for (const section of sections) observer.observe(section);

    return () => {
      disposed = true;
      observer.disconnect();
      for (const tween of activeTweens) tween.kill();
      for (const targets of targetsBySection.values()) showImmediately(targets);
    };
  }, []);

  return null;
}
