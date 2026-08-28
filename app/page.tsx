import { AnimatedSection } from "@/components/about/animated-section";
import { Bio } from "@/components/about/bio";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
import { GitHubActivity } from "@/components/github/github-activity";
import { Projects } from "@/components/projects/projects";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: `Welcome to ${siteConfig.name}. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col gap-16 sm:gap-24 lg:gap-28"
    >
      <Hero />
      <AnimatedSection className="mx-auto w-full max-w-160 px-4 [contain-intrinsic-size:auto_36rem] [content-visibility:auto] min-[360px]:px-6 sm:px-10">
        <Bio />
      </AnimatedSection>
      <section
        className="mx-auto w-full max-w-[40rem] px-4 [contain-intrinsic-size:auto_88rem] [content-visibility:auto] min-[360px]:px-6 sm:px-10"
        data-scroll-reveal
        data-scroll-stagger
      >
        <div className="flex flex-col gap-10">
          <Education />
          <Experience />
          <Skills />
          <Stack />
        </div>
      </section>
      <Projects withHeadline viewMoreVisible />
      <GitHubActivity />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
