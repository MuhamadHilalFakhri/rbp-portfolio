import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { Bio } from "@/components/about/bio";
import { ContactCard } from "@/components/contact/contact-card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section
        className="mx-auto w-full max-w-312 pt-32 sm:pt-48 lg:pt-56"
        data-scroll-reveal
      >
        <PolaroidStrip />
      </section>

      <section
        className="mx-auto w-full max-w-160 px-4 pt-14 pb-12 min-[360px]:px-6 sm:px-10 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24"
        data-scroll-reveal
      >
        <Bio heading="h1" />
      </section>

      <section
        className="mx-auto w-full max-w-[40rem] px-4 pb-16 min-[360px]:px-6 sm:px-10 sm:pb-24 lg:pb-28"
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

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
