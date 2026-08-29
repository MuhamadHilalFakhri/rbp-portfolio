"use client";

import { useEffect, useRef, type ReactNode } from "react";

import DynamicText from "@/components/kokonutui/dynamic-text";

const SPLASH_DURATION_MS = 3600;
const SPLASH_FALLBACK_BUFFER_MS = 250;

export function SplashScreen(): ReactNode {
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const splash = splashRef.current;
    let finished = false;

    const finishSplash = (): void => {
      if (finished) return;

      finished = true;
      root.dataset.splash = "done";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishSplash();
      return;
    }

    const handleAnimationEnd = (event: AnimationEvent): void => {
      if (event.animationName === "splash-screen-exit") {
        finishSplash();
      }
    };

    splash?.addEventListener("animationend", handleAnimationEnd);

    // The CSS animation can start before React hydrates. Base the fallback on
    // navigation time so a late hydration never leaves the hero waiting.
    const remainingDuration = Math.max(
      0,
      SPLASH_DURATION_MS - performance.now()
    );
    const fallbackTimer = window.setTimeout(
      finishSplash,
      remainingDuration + SPLASH_FALLBACK_BUFFER_MS
    );

    return () => {
      splash?.removeEventListener("animationend", handleAnimationEnd);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div ref={splashRef} className="splash-screen" aria-hidden="true">
      <div className="splash-screen__content">
        <div className="splash-screen__loader-stage">
          <div className="splash-screen__loader">
            <span />
            <span />
            <span />
          </div>
          <p>Muhamad Hilal Fakhri</p>
        </div>
        <DynamicText />
      </div>
    </div>
  );
}
