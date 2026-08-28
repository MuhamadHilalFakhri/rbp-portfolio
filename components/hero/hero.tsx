import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { HeroLanyard } from "./hero-lanyard";

export function Hero(): ReactNode {
  return (
    <section className="relative isolate w-full overflow-visible md:-mt-48 lg:-mt-66">
      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-275 px-4 pt-32 pb-16 min-[360px]:px-6 sm:px-10 sm:pt-48 sm:pb-24 md:pt-56 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8">
          <div className="pointer-events-auto flex min-w-0 flex-col gap-3 sm:gap-4">
            <h1 className="text-foreground text-[clamp(2.15rem,11vw,2.75rem)] leading-[1.05] font-medium tracking-tight md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block">
                <span className="hero-reveal hero-reveal--1 inline-block">
                  Software
                </span>{" "}
                <span className="hero-reveal hero-reveal--2 inline-block">
                  Developer
                </span>{" "}
                <span className="hero-reveal hero-reveal--3 inline-block">
                  &amp;
                </span>
              </span>
              <span className="block">
                <span className="hero-reveal hero-reveal--4 inline-block">
                  AI enthusiast
                </span>
              </span>
            </h1>

            <p className="hero-reveal hero-reveal--5 text-foreground/65 max-w-[34ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px] lg:text-[22px]">
              Software Developer focused on building structured, efficient,
              responsive, and user-centered applications.
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

      <HeroLanyard />
    </section>
  );
}
