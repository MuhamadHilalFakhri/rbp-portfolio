"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  LineChart,
  Sparkles,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ProjectModal } from "@/components/projects/project-modal";
import { FadeIn } from "@/components/ui/motion-primitives";

/**
 * Project imagery below is mockup-only. All visuals are sourced from
 * Dribbble and Unsplash and credit belongs to the original creators.
 * Replace these with your own work before shipping.
 * The first image in `images` is used as the card cover; the rest appear
 * in the modal slider.
 */

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  overview: string;
  highlights: string[];
  images: ProjectImage[];
  imageRatio: number;
};

const PROJECTS: Project[] = [
  {
    id: "internship",
    icon: Sparkles,
    iconLabel: "Internship",
    title:
      "Sistem Informasi SDM (Human Resource Information System)",
    description:
      "Aplikasi web HRIS dengan 4 role pengguna (Super Admin, Admin Staff, Staff, Pelamar) yang mengotomatisasi seluruh proses HR dari rekrutmen, onboarding, pengelolaan surat, hingga offboarding.",
    meta: "Full Stack Developer, 2025 - 2026",
    overview:
      "Sistem HRIS yang dibangun untuk perusahaan LDP yang mengelola proses kepegawaian dari rekrutmen hingga offboarding secara digital. Aplikasi ini dilengkapi fitur lengkap: dashboard statistik real-time, modul rekrutmen dengan kalender visual untuk penjadwalan interview, sistem disposisi surat digital, pengelolaan pengaduan karyawan, dan proses offboarding terstruktur. Dilengkapi notifikasi real-time menggunakan Laravel Reverb (WebSocket) untuk memastikan semua stakeholder mendapat update langsung. Setiap role memiliki akses dan fitur yang disesuaikan dengan kebutuhan operasional mereka.",
    highlights: [
      "4 role pengguna dengan hak akses berbeda: Super Admin (HRD), Admin Staff, Staff (Karyawan), dan Pelamar",
      "Rekrutmen & onboarding digital dengan kalender visual, checklist proses, dan konversi pelamar ke karyawan",
      "Sistem disposisi surat masuk/keluar dengan template surat dan export ke Word",
      "Proses offboarding terstruktur dengan checklist serah terima dan exit interview",
      "Pengelolaan pengaduan karyawan dengan opsi anonim dan tracking penyelesaian",
      "Notifikasi real-time menggunakan Laravel Reverb (WebSocket)",
      "Tech Stack: Laravel 12, React 18, TypeScript, Tailwind CSS, Inertia.js, SQLite",
    ],
    images: [
      {
        src: "/project/Internship/Screenshot 2026-08-24 194725.png",
        alt: "Dashboard Super Admin HRIS",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 194759.png",
        alt: "Modul Rekrutmen",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 194808.png",
        alt: "Kalender Penjadwalan Interview",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 194816.png",
        alt: "Detail Proses Onboarding",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 194825.png",
        alt: "Kelola Divisi dan Lowongan",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 194833.png",
        alt: "Sistem Disposisi Surat",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 194841.png",
        alt: "Template dan Export Surat",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 194850.png",
        alt: "Modul Offboarding",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195114.png",
        alt: "Pengelolaan Pengaduan Karyawan",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195124.png",
        alt: "Dashboard Pelamar",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195227.png",
        alt: "Form Lamaran Kerja",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195237.png",
        alt: "Profil dan CV Pelamar",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195244.png",
        alt: "Status Tracking Lamaran",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195433.png",
        alt: "Kelola Akun Pengguna",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195445.png",
        alt: "Sistem Notifikasi Real-time",
      },
      {
        src: "/project/Internship/Screenshot 2026-08-24 195454.png",
        alt: "Landing Page Lowongan Kerja",
      },
    ],
    imageRatio: 16 / 9,
  },
  {
    id: "atlas",
    icon: Compass,
    iconLabel: "Atlas Studio",
    title: "A two week brand and product sprint for a creative studio.",
    description:
      "End to end identity, marketing site, and a small product surface designed to feel quietly confident across every touchpoint.",
    meta: "Product & Brand Designer, 2025",
    overview:
      "A two week sprint covering both identity and product: logo system, color, typography, and a marketing site paired with a lightweight client dashboard. Every touchpoint was designed to feel quietly confident — muted palettes, strong grids, and photography treated as texture rather than decoration.",
    highlights: [
      "Full identity kit delivered in Figma",
      "Marketing site shipped on Next.js",
      "Dashboard prototype tested with five users",
    ],
    images: [
      {
        src: "https://cdn.dribbble.com/userupload/24599416/file/original-1ae5075dcd129aebb16bdbca24b41ac7.png?resize=1024x768&vertical=center",
        alt: "Atlas Studio brand and product sprint mockup",
      },
      {
        src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop",
        alt: "Graphic design stationery flat lay",
      },
      {
        src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop",
        alt: "Interface design work on a screen",
      },
    ],
    imageRatio: 1024 / 768,
  },
  {
    id: "rhythm",
    icon: LineChart,
    iconLabel: "Rhythm",
    title: "Calm analytics for indie founders.",
    description:
      "A weekly digest that turns raw product data into a simple narrative. Built so you can read it on a Sunday with coffee.",
    meta: "Founder & Designer, 2024",
    overview:
      "Rhythm turns raw product analytics into a calm Sunday-morning read. Instead of endless dashboards, founders get one weekly narrative email backed by a minimal web view. Charts are intentionally sparse, thresholds are written in plain language, and everything degrades gracefully on mobile.",
    highlights: [
      "Weekly narrative digest engine",
      "Zero-config event ingestion",
      "Dark-mode-first reading experience",
    ],
    images: [
      {
        src: "https://cdn.dribbble.com/userupload/47357856/file/75841fa59f32f05ca6c5ddf02d08dfe6.png?resize=1024x768&vertical=center",
        alt: "Rhythm calm analytics mockup",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        alt: "Analytics dashboard on a laptop",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
        alt: "Charts and graphs on a screen",
      },
    ],
    imageRatio: 1024 / 768,
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollToCard = (direction: 1 | -1): void => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const gap = 24;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-4 min-[360px]:px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-4 pt-8 pb-8 text-center sm:gap-5 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14">
            <h2 className="text-foreground font-serif text-[2.2rem] leading-[1.05] font-medium tracking-tight min-[360px]:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              From playful experiments to thoughtful systems, a look at the work
              I&rsquo;m proud to have shipped.
            </p>
          </FadeIn>
        ) : null}

        <FadeIn className="relative">
          <div className="flex items-center justify-between pb-4">
            <span className="text-foreground/50 text-sm font-medium tracking-tight">
              {items.length} projects
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollToCard(-1)}
                disabled={!canPrev}
                aria-label="Previous project"
                className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollToCard(1)}
                disabled={!canNext}
                aria-label="Next project"
                className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 [scrollbar-width:none] min-[360px]:-mx-6 min-[360px]:gap-6 min-[360px]:px-6 sm:-mx-10 sm:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {items.map((project) => (
              <div
                key={project.id}
                data-card
                className="w-full shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <ProjectCard
                  project={project}
                  onSelect={() => setActiveProject(project)}
                />
              </div>
            ))}
          </div>
        </FadeIn>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}): ReactNode {
  const Icon = project.icon;
  const cover = project.images[0];
  return (
    <article
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details for ${project.iconLabel}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className="project-card border-foreground/8 focus-ring bg-background flex h-full cursor-pointer flex-col gap-4 rounded-2xl border p-3 sm:rounded-3xl sm:p-3.5"
    >
      <header className="flex items-center gap-2.5 px-1 pt-2">
        <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
          <Icon className="text-foreground h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="text-foreground text-sm font-medium tracking-tight">
          {project.iconLabel}
        </span>
      </header>

      {cover ? (
        <div
          className="project-card__image ring-foreground/5 bg-foreground/5 relative w-full overflow-hidden rounded-2xl ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2.5 px-1 pb-1">
        <h3 className="text-foreground text-[18px] leading-[1.25] font-medium tracking-tight min-[360px]:text-[20px] sm:text-[22px]">
          {project.title}
        </h3>
        <p className="text-foreground/65 text-[14px] leading-normal tracking-tight sm:text-[15px]">
          {project.description}
        </p>
      </div>

      <p className="text-foreground/50 mt-auto px-1 pb-2 text-[12px] tracking-tight">
        {project.meta}
      </p>
    </article>
  );
}
