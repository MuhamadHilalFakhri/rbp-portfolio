"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export function Bio({ heading = "h2" }: { heading?: "h1" | "h2" }): ReactNode {
  const [expanded, setExpanded] = useState(false);
  const Heading = heading;

  return (
    <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
      <Heading className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
        Hello! I&rsquo;m{" "}
        <span className="border-b border-foreground/30 pb-0.5">
          Muhamad Hilal Fakhri
        </span>
        .
      </Heading>
      <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
        <p>
          Saya merupakan lulusan Program Studi S1 Teknologi Informasi
          Universitas Muhammadiyah Yogyakarta dengan minat dan pengalaman di
          bidang{" "}
          <strong className="font-semibold text-foreground">
            pengembangan web, baik frontend maupun backend
          </strong>
          . Selama menempuh pendidikan, saya mempelajari dan mengembangkan
          berbagai aplikasi berbasis web dengan menerapkan kemampuan dalam
          perancangan antarmuka, pengembangan fitur, pengelolaan database,
          hingga integrasi antara frontend dan backend. Saya memiliki kemampuan
          dalam memahami kebutuhan pengguna, merancang struktur sistem, serta
          mengimplementasikan solusi yang{" "}
          <strong className="font-semibold text-foreground">
            terstruktur, efisien, dan mudah dikembangkan
          </strong>
          .
        </p>
        <p>
          Saya memiliki ketertarikan untuk terus memperdalam kemampuan di
          bidang{" "}
          <strong className="font-semibold text-foreground">
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
