"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

export function Bio({
  heading = "h2",
  summary,
}: {
  heading?: "h1" | "h2";
  summary?: string;
}): ReactNode {
  const [expanded, setExpanded] = useState(false);
  const Heading = heading;
  const detailId = useId();

  return (
    <div className="border-foreground/5 rounded-3xl border bg-[#fbfbfb] p-5 min-[360px]:p-6 sm:rounded-4xl sm:p-12 dark:bg-[#111111]">
      <Heading className="text-foreground font-serif text-[1.6rem] font-medium tracking-tight min-[360px]:text-[1.75rem] sm:text-[2rem]">
        Hello! I&rsquo;m{" "}
        <span className="border-foreground/30 border-b pb-0.5">
          Muhamad Hilal Fakhri
        </span>
        .
      </Heading>
      {summary && !expanded && (
        <p className="text-foreground/75 mt-6 text-justify text-[16px] leading-[1.7] tracking-tight sm:mt-8 sm:text-[18px]">
          {summary}
        </p>
      )}
      <div
        id={detailId}
        hidden={Boolean(summary) && !expanded}
        className="text-foreground/75 mt-6 space-y-5 text-justify text-[16px] leading-[1.7] tracking-tight sm:mt-8 sm:space-y-6 sm:text-[18px]"
      >
        <p>
          Saya merupakan lulusan Program Studi S1 Teknologi Informasi
          Universitas Muhammadiyah Yogyakarta dengan minat dan pengalaman di
          bidang{" "}
          pengembangan web, baik frontend maupun backend. Selama menempuh pendidikan, saya mempelajari dan mengembangkan
          berbagai aplikasi berbasis web dengan menerapkan kemampuan dalam
          perancangan antarmuka, pengembangan fitur, pengelolaan database,
          hingga integrasi antara frontend dan backend. Saya memiliki kemampuan
          dalam memahami kebutuhan pengguna, merancang struktur sistem, serta
          mengimplementasikan solusi yang{" "}
          terstruktur, efisien, dan mudah dikembangkan.
        </p>
        <p>
          Saya memiliki ketertarikan untuk terus memperdalam kemampuan di bidang{" "}
          web developer, khususnya dalam membangun aplikasi web yang fungsional, responsif,
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

      {(summary || !expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={detailId}
          className={`focus-ring text-foreground/70 hover:text-foreground mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-md py-2 text-sm font-medium tracking-tight transition-colors ${summary ? "" : "sm:hidden"}`}
        >
          {expanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}
