import { AnimatedSection } from "@/components/about/animated-section";
import { BioSummary } from "@/components/about/bio-summary";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { TechStackMarquee } from "@/components/contact/tech-stack-marquee";
import { Hero } from "@/components/hero/hero";
import { GitHubActivity } from "@/components/github/github-activity";
import { Projects } from "@/components/projects/projects";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { getStructuredData } from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Web Developer & AI Enthusiast",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage(): ReactNode {
  const structuredData = getStructuredData({ includeProfilePage: true });

  return (
    <>
      <main
        id="main-content"
        className="flex flex-1 flex-col gap-16 sm:gap-24 lg:gap-28"
      >
        <Hero />
        <AnimatedSection
          id="about"
          className="mx-auto w-full max-w-160 px-4 [contain-intrinsic-size:auto_20rem] [content-visibility:auto] min-[360px]:px-6 sm:px-10"
        >
          <BioSummary />
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
        <Projects withHeadline />
        <GitHubActivity />
        <div className="flex w-full flex-col gap-5 sm:gap-6">
          <ContactCard />
          <TechStackMarquee />
        </div>
        <div className="h-12 sm:h-16" />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
