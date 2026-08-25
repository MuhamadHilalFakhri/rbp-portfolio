"use client";

import { useRef, type ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { FadeIn } from "@/components/ui/motion-primitives";
import { HeroLanyard } from "./hero-lanyard";

export function Hero(): ReactNode {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="relative isolate w-full overflow-visible">
      <div className="relative z-20 mx-auto w-full max-w-275 px-4 pt-32 pb-16 min-[360px]:px-6 sm:px-10 sm:pt-48 sm:pb-24 md:pt-56 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8">
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
            <h1 className="text-foreground text-[clamp(2.15rem,11vw,2.75rem)] leading-[1.05] font-medium tracking-tight md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block">
                <BlurReveal delay={0}>Software</BlurReveal>{" "}
                <BlurReveal delay={0.1}>Developer</BlurReveal>{" "}
                <BlurReveal delay={0.2}>&amp;</BlurReveal>
              </span>
              <span className="block">
                <BlurReveal delay={0.3}>AI</BlurReveal>{" "}
                <BlurReveal delay={0.4}>enthusiast</BlurReveal>
              </span>
            </h1>

            <p className="text-foreground/65 max-w-[34ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px] lg:text-[22px]">
              <BlurReveal delay={0.5} className="block">
                Software Developer focused on building structured, efficient,
                responsive, and user-centered applications.
              </BlurReveal>
            </p>

            <FadeIn delay={0.6}>
              <HeroCtas />
            </FadeIn>
          </div>

          <div
            aria-hidden="true"
            className="h-[32rem] min-w-0 sm:h-[36rem] md:h-[40rem] lg:h-[44rem]"
          />
        </div>
      </div>

      <HeroLanyard eventSource={heroRef} />
    </section>
  );
}
