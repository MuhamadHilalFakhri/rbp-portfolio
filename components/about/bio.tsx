"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export function Bio({ heading = "h2" }: { heading?: "h1" | "h2" }): ReactNode {
  const [expanded, setExpanded] = useState(false);
  const Heading = heading;

  return (
    <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 rounded-3xl border p-5 min-[360px]:p-6 sm:rounded-4xl sm:p-12">
      <Heading className="text-foreground font-serif text-[1.6rem] font-medium tracking-tight min-[360px]:text-[1.75rem] sm:text-[2rem]">
        Hello! I&rsquo;m{" "}
        <span className="border-foreground/30 border-b pb-0.5">
          Muhamad Hilal Fakhri
        </span>
        .
      </Heading>
      <div className="text-foreground/75 mt-6 space-y-5 text-[16px] leading-[1.7] tracking-tight sm:mt-8 sm:space-y-6 sm:text-[18px]">
        <p>
          Saya merupakan lulusan Program Studi S1 Teknologi Informasi
          Universitas Muhammadiyah Yogyakarta dengan minat dan pengalaman di
          bidang{" "}
          <strong className="text-foreground font-semibold">
            pengembangan web, baik frontend maupun backend
          </strong>
          . Selama menempuh pendidikan, saya mempelajari dan mengembangkan
          berbagai aplikasi berbasis web dengan menerapkan kemampuan dalam
          perancangan antarmuka, pengembangan fitur, pengelolaan database,
          hingga integrasi antara frontend dan backend. Saya memiliki kemampuan
          dalam memahami kebutuhan pengguna, merancang struktur sistem, serta
          mengimplementasikan solusi yang{" "}
          <strong className="text-foreground font-semibold">
            terstruktur, efisien, dan mudah dikembangkan
          </strong>
          .
        </p>
        <p>
          Saya memiliki ketertarikan untuk terus memperdalam kemampuan di bidang{" "}
          <strong className="text-foreground font-semibold">
            software development
          </strong>
          , khususnya dalam membangun aplikasi web yang fungsional, responsif,
          dan dapat memberikan pengalaman pengguna yang baik. Saya juga terbiasa
          mempelajari teknologi dan tools baru secara mandiri untuk meningkatkan
          kemampuan teknis serta mengikuti perkembangan di bidang teknologi
          informasi.
        </p>
        <div className={expanded ? "block" : "hidden sm:block"}>
          <p>
            Dalam bekerja, saya mampu bekerja secara mandiri maupun dalam tim,
            memiliki kemampuan komunikasi yang baik, serta terbiasa
            menyelesaikan tugas secara terstruktur dan bertanggung jawab. Saya
            juga memiliki kemauan belajar yang tinggi, mampu beradaptasi dengan
            lingkungan dan teknologi baru, serta berkomitmen untuk terus
            mengembangkan kompetensi teknis dan profesional guna menghasilkan
            solusi digital yang berkualitas dan memberikan nilai tambah bagi
            pengguna maupun perusahaan.
          </p>
        </div>
      </div>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          className="focus-ring text-foreground/70 hover:text-foreground mt-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium tracking-tight transition-colors sm:hidden"
        >
          Baca selengkapnya
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
