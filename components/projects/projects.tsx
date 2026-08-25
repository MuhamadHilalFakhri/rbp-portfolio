"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  LineChart,
  Sparkles,
} from "lucide-react";
import type {
  ComponentType,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
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
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194725-converted.webp",
        alt: "Dashboard Super Admin HRIS",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194759-converted.webp",
        alt: "Modul Rekrutmen",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194808-converted.webp",
        alt: "Kalender Penjadwalan Interview",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194816-converted.webp",
        alt: "Detail Proses Onboarding",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194825-converted.webp",
        alt: "Kelola Divisi dan Lowongan",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194833-converted.webp",
        alt: "Sistem Disposisi Surat",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194841-converted.webp",
        alt: "Template dan Export Surat",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 194850-converted.webp",
        alt: "Modul Offboarding",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195114-converted.webp",
        alt: "Pengelolaan Pengaduan Karyawan",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195124-converted.webp",
        alt: "Dashboard Pelamar",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195227-converted.webp",
        alt: "Form Lamaran Kerja",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195237-converted.webp",
        alt: "Profil dan CV Pelamar",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195244-converted.webp",
        alt: "Status Tracking Lamaran",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195433-converted.webp",
        alt: "Kelola Akun Pengguna",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195445-converted.webp",
        alt: "Sistem Notifikasi Real-time",
      },
      {
        src: "/project/InternshipWebp/Screenshot 2026-08-24 195454-converted.webp",
        alt: "Landing Page Lowongan Kerja",
      },
    ],
    imageRatio: 16 / 9,
  },
  {
    id: "capstone",
    icon: Compass,
    iconLabel: "Capstone",
    title: "E-Learning SMPN 2 Merapi Barat",
    description:
      "Platform pembelajaran daring berbasis web dengan 3 role pengguna (Admin, Guru, Siswa) yang memfasilitasi pembelajaran interaktif, pengelolaan materi, kuis dengan AI, dan manajemen data master sekolah.",
    meta: "Full Stack Developer, 2025 - 2026",
    overview:
      "Platform e-learning komprehensif untuk SMPN 2 Merapi Barat yang memungkinkan digitalisasi penuh proses pembelajaran. Admin mengelola data master (guru, siswa, kelas, mata pelajaran) dengan fitur import/export Excel untuk efisiensi. Guru dapat mengupload berbagai format materi (PDF, Word, PowerPoint, Video) dan membuat kuis interaktif dengan AI serta pengaturan timer otomatis. Siswa mengakses materi dengan sistem pencarian yang intuitif, mengerjakan kuis dengan timer countdown, dan melihat statistik performa mereka per mata pelajaran. Dashboard setiap role menampilkan informasi relevan dan statistik real-time untuk monitoring progres pembelajaran.",
    highlights: [
      "3 role pengguna: Admin (manajemen data master), Guru (kelola materi & kuis), Siswa (akses pembelajaran)",
      "Manajemen data guru dan siswa dengan import/export Excel untuk efisiensi administrasi",
      "Upload materi pembelajaran multi-format: PDF, Word, PowerPoint, dan Video",
      "Sistem kuis interaktif dengan AI, timer otomatis, dan penjadwalan ketersediaan",
      "Dashboard statistik real-time untuk monitoring aktivitas dan progres pembelajaran",
      "Filter dan pencarian materi untuk navigasi yang mudah",
      "Riwayat nilai dan statistik performa per mata pelajaran untuk siswa",
      "Tech Stack: Laravel 12, React 18, TypeScript, Inertia.js, TailwindCSS, Radix UI, MySQL",
    ],
    images: [
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 195811-converted.webp",
        alt: "Dashboard Admin E-Learning",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 195826-converted.webp",
        alt: "Manajemen Data Guru",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 195835-converted.webp",
        alt: "Import/Export Data Excel",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 195845-converted.webp",
        alt: "Manajemen Data Siswa",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 195856-converted.webp",
        alt: "Manajemen Kelas dan Wali Kelas",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 195905-converted.webp",
        alt: "Manajemen Mata Pelajaran",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 195914-converted.webp",
        alt: "Dashboard Guru",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200251-converted.webp",
        alt: "Upload dan Kelola Materi Pembelajaran",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200302-converted.webp",
        alt: "Form Upload Materi Multi-Format",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200313-converted.webp",
        alt: "Buat Kuis dengan AI Interaktif",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200322-converted.webp",
        alt: "Pengaturan Timer dan Jadwal Kuis",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200336-converted.webp",
        alt: "Statistik Materi dan Kuis Guru",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200439-converted.webp",
        alt: "Dashboard Siswa dan Progres Belajar",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200449-converted.webp",
        alt: "Akses Materi dengan Filter Pencarian",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200459-converted.webp",
        alt: "Interface Kuis dengan Timer",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200508-converted.webp",
        alt: "Hasil dan Riwayat Nilai Siswa",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200519-converted.webp",
        alt: "Statistik Performa Per Mata Pelajaran",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200530-converted.webp",
        alt: "Detail Progres Pembelajaran",
      },
      {
        src: "/project/CapstoneWebp/Screenshot 2026-08-24 200538-converted.webp",
        alt: "Profile dan Pengaturan Akun",
      },
    ],
    imageRatio: 16 / 9,
  },
  {
    id: "skripsi",
    icon: LineChart,
    iconLabel: "Skripsi",
    title: "HRIS - Human Resource Information System Berbasis AI",
    description:
      "Sistem manajemen SDM berbasis web dengan AI-powered CV screening menggunakan Groq LLM. Pengembangan lanjutan dari proyek Internship dengan tech stack modern (Go, Next.js) dan fitur tambahan seperti AI screening, audit log, dan template surat.",
    meta: "Full Stack Developer, 2026",
    overview:
      "Proyek ini merupakan pengembangan lanjutan dari proyek Internship dengan perubahan signifikan pada tech stack dan penambahan fitur berbasis AI. Dibangun dengan Go (Golang) + Gin Framework untuk backend dan Next.js + TypeScript untuk frontend, sistem ini mengelola seluruh siklus kepegawaian dari rekrutmen hingga offboarding. Fitur unggulan adalah AI CV Screening otomatis menggunakan Groq API yang dapat melakukan scoring dan auto-shortlist pelamar berdasarkan kriteria yang ditentukan. Sistem juga dilengkapi dengan Audit Log untuk tracking seluruh aktivitas, template surat dengan preview PDF, pipeline rekrutmen visual (Applied → Screening → Interview → Offering → Hired/Rejected), serta autentikasi ganda melalui email/password dan Google OAuth 2.0. Bug-bug dari proyek sebelumnya telah diperbaiki dan performa ditingkatkan dengan Redis caching.",
    highlights: [
      "AI CV Screening otomatis menggunakan Groq LLM untuk scoring dan auto-shortlist pelamar",
      "Tech Stack Modern: Go + Gin Framework (backend), Next.js + TypeScript (frontend), MySQL, Redis",
      "Pipeline rekrutmen visual: Applied → Screening → Interview → Offering → Hired/Rejected",
      "Audit Log lengkap untuk tracking seluruh aktivitas sistem",
      "Template surat dinamis dengan preview PDF dan export Word/PDF",
      "Dual Authentication: Email/Password + Google OAuth 2.0",
      "Export laporan rekrutmen dalam format Excel & PDF",
      "Pengaduan karyawan dengan 6 kategori: Lingkungan Kerja, Kompensasi, Fasilitas, Relasi Kerja, Kebijakan, Lainnya",
      "Autocomplete data pendidikan dari BAN-PT untuk akurasi data",
      "Dark mode & Light mode support",
      "Deploy: Railway (backend) + Vercel (frontend)",
    ],
    images: [
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193422-converted.webp",
        alt: "Dashboard Super Admin HRIS",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193456-converted.webp",
        alt: "AI CV Screening dengan Groq",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193510-converted.webp",
        alt: "Pipeline Rekrutmen Visual",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193713-converted.webp",
        alt: "Scoring dan Shortlist Pelamar",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193737-converted.webp",
        alt: "Jadwal Interview Online/Offline",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193753-converted.webp",
        alt: "Export Laporan Rekrutmen",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193809-converted.webp",
        alt: "Kelola Template Surat",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193847-converted.webp",
        alt: "Preview PDF Template Surat",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193857-converted.webp",
        alt: "Disposisi Surat Digital",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193921-converted.webp",
        alt: "Kelola Staff dan Divisi",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 193931-converted.webp",
        alt: "Audit Log Tracking Aktivitas",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194256-converted.webp",
        alt: "Dashboard Pelamar",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194311-converted.webp",
        alt: "Profil Pelamar dengan Autocomplete",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194321-converted.webp",
        alt: "Kirim Lamaran dengan Upload CV",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194330-converted.webp",
        alt: "Tracking Status Lamaran",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194451-converted.webp",
        alt: "Dashboard Staff Karyawan",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194500-converted.webp",
        alt: "Pengaduan Karyawan Multi Kategori",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194537-converted.webp",
        alt: "Pengajuan Resign Digital",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194550-converted.webp",
        alt: "Google OAuth 2.0 Login",
      },
      {
        src: "/project/SkripsiWebp/Screenshot 2026-08-24 194601-converted.webp",
        alt: "Dark Mode Interface",
      },
    ],
    imageRatio: 16 / 9,
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
            className="-mx-4 flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 touch-pan-y [scrollbar-width:none] min-[360px]:-mx-6 min-[360px]:gap-6 min-[360px]:px-6 sm:snap-mandatory sm:-mx-10 sm:px-10 sm:touch-auto [&::-webkit-scrollbar]:hidden"
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
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const TAP_THRESHOLD = 8;

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>): void => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handleClick = (event: ReactMouseEvent<HTMLElement>): void => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start) {
      const dx = Math.abs(event.clientX - start.x);
      const dy = Math.abs(event.clientY - start.y);
      if (dx > TAP_THRESHOLD || dy > TAP_THRESHOLD) {
        // Treat as a swipe/scroll gesture, not a tap.
        return;
      }
    }
    onSelect();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details for ${project.iconLabel}`}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
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
