import { ContactCard } from "@/components/contact/contact-card";
import { Projects } from "@/components/projects/projects";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Selected work and case studies.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section
        className="mx-auto w-full max-w-275 px-4 pt-32 pb-12 min-[360px]:px-6 sm:px-10 sm:pt-48 sm:pb-16 lg:pt-56 lg:pb-20"
        data-scroll-reveal
        data-scroll-stagger
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <h1
            className="text-foreground font-serif text-[2.35rem] leading-[1.05] font-medium tracking-tight min-[360px]:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem]"
            data-scroll-reveal-item
          >
            My recent work
          </h1>
          <p
            className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.4] tracking-tight sm:text-[21px] lg:text-[22px]"
            data-scroll-reveal-item
          >
            Experiments, collaborations, and projects I&rsquo;m especially proud
            to have shipped.
          </p>
        </div>
      </section>
      <Projects />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
