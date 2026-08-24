import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";

const PORTRAIT_SRC = "/josh.webp";
const PORTRAIT_HOVER_SRC = "/josh_wave.webp";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-4 pt-32 pb-16 min-[360px]:px-6 sm:px-10 sm:pt-48 sm:pb-24 md:pt-56 md:pb-32">
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

          <ScaleUnblur className="flex justify-center md:justify-end">
            <div className="border-foreground/8 bg-background relative aspect-square w-full max-w-105 overflow-hidden rounded-3xl border p-1.5 shadow-sm sm:rounded-4xl">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <PortraitMorph
                  srcA={PORTRAIT_SRC}
                  srcB={PORTRAIT_HOVER_SRC}
                  alt="Josh portrait"
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
