import { AnimatedSection } from "@/components/about/animated-section";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
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
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <Hero />
      <AnimatedSection className="mx-auto w-full max-w-160 px-6 sm:px-10">
        <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
          <h2 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
            Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Muhamad Hilal Fakhri</span>.
          </h2>
          <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
            <p>
              Saya merupakan lulusan Program Studi S1 Teknologi Informasi Universitas Muhammadiyah Yogyakarta dengan minat dan pengalaman di bidang <strong className="font-semibold text-foreground">pengembangan web, baik frontend maupun backend</strong>. Selama menempuh pendidikan, saya mempelajari dan mengembangkan berbagai aplikasi berbasis web dengan menerapkan kemampuan dalam perancangan antarmuka, pengembangan fitur, pengelolaan database, hingga integrasi antara frontend dan backend. Saya memiliki kemampuan dalam memahami kebutuhan pengguna, merancang struktur sistem, serta mengimplementasikan solusi yang <strong className="font-semibold text-foreground">terstruktur, efisien, dan mudah dikembangkan</strong>.
            </p>
            <p>
              Saya memiliki ketertarikan untuk terus memperdalam kemampuan di bidang <strong className="font-semibold text-foreground">software development</strong>, khususnya dalam membangun aplikasi web yang fungsional, responsif, dan dapat memberikan pengalaman pengguna yang baik. Saya juga terbiasa mempelajari teknologi dan tools baru secara mandiri untuk meningkatkan kemampuan teknis serta mengikuti perkembangan di bidang teknologi informasi.
            </p>
            <p>
              Dalam bekerja, saya mampu bekerja secara mandiri maupun dalam tim, memiliki kemampuan komunikasi yang baik, serta terbiasa menyelesaikan tugas secara terstruktur dan bertanggung jawab. Saya juga memiliki kemauan belajar yang tinggi, mampu beradaptasi dengan lingkungan dan teknologi baru, serta berkomitmen untuk terus mengembangkan kompetensi teknis dan profesional guna menghasilkan solusi digital yang berkualitas dan memberikan nilai tambah bagi pengguna maupun perusahaan.
            </p>
          </div>
        </div>
      </AnimatedSection>
      <section className="mx-auto w-full max-w-[40rem] px-6 sm:px-10">
        <div className="flex flex-col gap-10">
          <Education />
          <Experience />
          <Skills />
          <Stack />
        </div>
      </section>
      <Projects withHeadline viewMoreVisible />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
