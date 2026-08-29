"use client";

import { useEffect, useState, type ReactNode } from "react";

import { BlurReveal } from "@/components/ui/blur-reveal";

import { HeroCtas } from "./hero-ctas";
import { HeroLanyard } from "./hero-lanyard";

function useSplashFinished(): boolean {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncSplashState = (): void => {
      setFinished(
        root.dataset.splash === "done" || root.dataset.splash === "skip"
      );
    };

    syncSplashState();

    const observer = new MutationObserver(syncSplashState);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-splash"],
    });

    // Fail open if the splash controller is ever interrupted. The page content
    // must remain usable even when a cosmetic transition cannot complete.
    const fallbackTimer = window.setTimeout(() => {
      root.dataset.splash = "done";
      setFinished(true);
    }, 4250);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return finished;
}

export function Hero(): ReactNode {
  const splashFinished = useSplashFinished();

  return (
    <section className="relative isolate w-full overflow-visible md:-mt-48 lg:-mt-66">
      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-275 px-4 pt-32 pb-16 min-[360px]:px-6 sm:px-10 sm:pt-48 sm:pb-24 md:pt-56 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8">
          <div className="pointer-events-auto flex min-w-0 flex-col gap-3 sm:gap-4">
            <h1 className="text-foreground text-[clamp(2.15rem,11vw,2.75rem)] leading-[1.05] font-medium tracking-tight md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block">
                <BlurReveal delay={0} enabled={splashFinished}>
                  Software&nbsp;
                </BlurReveal>
                <BlurReveal delay={0.1} enabled={splashFinished}>
                  Developer&nbsp;
                </BlurReveal>
                <BlurReveal delay={0.2} enabled={splashFinished}>
                  &amp;
                </BlurReveal>
              </span>
              <span className="block">
                <BlurReveal delay={0.3} enabled={splashFinished}>
                  AI enthusiast
                </BlurReveal>
              </span>
            </h1>

            <p className="text-foreground/65 max-w-[34ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px] lg:text-[22px]">
              <BlurReveal delay={0.4} enabled={splashFinished}>
                Software Developer focused on building structured, efficient,
                responsive, and user-centered applications.
              </BlurReveal>
            </p>

            <div className="hero-reveal hero-reveal--6">
              <HeroCtas />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="h-[32rem] min-w-0 sm:h-[36rem] md:h-[40rem] lg:h-[44rem]"
          />
        </div>
      </div>

      <HeroLanyard active={splashFinished} />
    </section>
  );
}
