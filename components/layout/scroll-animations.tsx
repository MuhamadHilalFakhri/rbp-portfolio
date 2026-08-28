"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";

type GsapInstance = (typeof import("gsap"))["gsap"];

const REVEAL_DURATION = 1.5;
const REVEAL_STAGGER = 0.24;
const REVEAL_OFFSET = 40;

let gsapPromise: Promise<GsapInstance> | null = null;

function loadGsap(): Promise<GsapInstance> {
  gsapPromise ??= import("gsap").then((module) => module.gsap);
  return gsapPromise;
}

function getTargets(section: HTMLElement): HTMLElement[] {
  if (!section.hasAttribute("data-scroll-stagger")) return [section];

  const items = Array.from(
    section.querySelectorAll<HTMLElement>("[data-scroll-reveal-item]")
  ).sort((first, second) => {
    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();
    return (
      firstRect.top - secondRect.top || firstRect.left - secondRect.left
    );
  });
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
  const pathname = usePathname();

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
        target.style.transform = `translate3d(0, ${REVEAL_OFFSET}px, 0) rotateX(3deg)`;
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
                rotationX: 0,
                duration: REVEAL_DURATION,
                stagger: section.hasAttribute("data-scroll-stagger")
                  ? REVEAL_STAGGER
                  : 0,
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
  }, [pathname]);

  return null;
}
