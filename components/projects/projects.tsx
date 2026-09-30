"use client";

import { Github } from "lucide-react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  DocumentFile,
  MoneyTransfer,
  OnlineCourse,
  School,
  UserRole,
  Users,
  VideoCamera,
} from "meya-icons/react/outline";
import type {
  ComponentType,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectModal = lazy(() =>
  import("@/components/projects/project-modal").then((module) => ({
    default: module.ProjectModal,
  }))
);

/**
 * Project media is delivered from Cloudinary. The first image is used as the
 * card cover; video plays in the project detail dialog.
 */

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectVideo = {
  src: string;
  poster: ProjectImage;
};

export type ProjectTech = {
  label: string;
  slug: string;
  invertInDark?: boolean;
};

export type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  githubUrl?: string;
  websiteUrl?: string;
  githubPrivate?: boolean;
  overview: string;
  highlights: string[];
  images: ProjectImage[];
  video?: ProjectVideo;
  imageRatio: number;
  techStack: ProjectTech[];
};

const PROJECTS: Project[] = [
  {
    id: "rencana",
    icon: DocumentFile,
    iconLabel: "Rencana.",
    title: "Rencana.",
    description:
      "SaaS berbasis AI untuk mengubah ide produk menjadi PRD terstruktur, menyempurnakan dokumen, dan menyiapkannya untuk coding agent.",
    meta: "Date Project : 2026",
    techStack: [
      { label: "Next.js 16", slug: "nextdotjs", invertInDark: true },
      { label: "React 19", slug: "react" },
      { label: "TypeScript", slug: "typescript" },
      { label: "Tailwind CSS 4", slug: "tailwindcss" },
    ],
    overview:
      "Rencana adalah SaaS yang membantu product builder mengubah ide menjadi PRD.md yang terstruktur. Wizard mengumpulkan konteks dan kebutuhan; AI dapat menyarankan tech stack atau menggunakan pilihan manual, lalu menyusun PRD menjadi delapan bagian. Dokumen dapat ditinjau dan direvisi melalui ruang kerja, tersimpan per versi, lalu diekspor sebagai Markdown atau prompt pembuka untuk coding agent.",
    highlights: [
      "Wizard untuk merangkum masalah, pengguna, kebutuhan, batasan, dan pilihan teknis produk",
      "Generator PRD dengan delapan bagian: overview, requirements, core features, user flow, architecture, sequence diagram, database schema, dan tech stack",
      "Rekomendasi tech stack berbasis AI atau pengaturan teknologi secara manual",
      "Pratinjau terstruktur untuk dokumen dan bagian teknis sebelum dibawa ke tahap implementasi",
      "Ruang kerja untuk meninjau serta merevisi PRD; setiap revisi yang tersimpan menjadi versi baru",
      "Ekspor PRD.md dan prompt pembuka untuk digunakan bersama coding agent",
      "Bahasa Indonesia dan English untuk konteks dan dokumen",
      "Tech Stack: Next.js 16.3, React 19, TypeScript 5, Tailwind CSS 4, Supabase Auth, PostgreSQL dengan RLS, OpenAI-compatible API, Vercel Queues, dan Vercel",
    ],
    images: [],
    video: {
      src: "https://res.cloudinary.com/jaiq0dj6/video/upload/v1790716058/rencana-landscape.mp4",
      poster: {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790758477/rencana-homepage-thumbnail.png",
        alt: "Preview landing page Rencana.",
      },
    },
    imageRatio: 1887 / 907,
  },
  {
    id: "sawala",
    icon: OnlineCourse,
    iconLabel: "Sawala",
    title: "Sawala",
    description:
      "LMS interaktif untuk belajar Bahasa Sunda dan Aksara Sunda, lengkap dengan ruang belajar per modul, latihan, kuis, progres, dan tutor AI opsional.",
    meta: "Date Project : 2026",
    githubUrl: "https://github.com/MuhamadHilalFakhri/LMS-Sunda.git",
    techStack: [
      { label: "Laravel 13", slug: "laravel" },
      { label: "PHP 8.3", slug: "php" },
      { label: "React 19", slug: "react" },
      { label: "TypeScript", slug: "typescript" },
      { label: "Tailwind CSS 4", slug: "tailwindcss" },
    ],
    overview:
      "Sawala adalah LMS web untuk belajar Bahasa Sunda dan Aksara Sunda. Kurikulum disusun sebagai kelas, modul, lalu materi; pelajar belajar di ruang khusus tiap modul, mengerjakan latihan dan kuis, serta memantau progres yang tersimpan. Admin mengelola konten dan aktivitas belajar. Tutor AI menyediakan tanya jawab, latihan percakapan, terjemahan, serta umpan balik tulisan saat penyedia AI dikonfigurasi.",
    highlights: [
      "Kelas Bahasa Sunda dan Aksara Sunda dengan alur belajar terstruktur dari kelas ke modul dan materi",
      "Materi teks, kosakata, dialog, konteks pemakaian, ragam tutur, transliterasi, audio, dan tautan video",
      "Galeri 72 karakter Unicode Aksara Sunda dengan pencarian, filter kelompok, dan fitur salin karakter",
      "Latihan pilihan ganda, isian, mencocokkan, menyusun urutan, menulis aksara, dan menyimak audio",
      "Kuis evaluasi dengan durasi, nilai kelulusan, dan batas percobaan yang dapat diatur admin; hasil dan penjelasan tersimpan",
      "Target harian, streak, progres materi, riwayat latihan, ulasan jawaban, serta pengulangan terjadwal",
      "Tutor AI opsional untuk tanya jawab berbasis materi, percakapan teks, terjemahan Indonesia–Sunda, dan umpan balik tulisan",
      "Panel admin untuk mengelola kelas, modul, materi, latihan, kuis, audio, akun, dan progres pelajar",
      "Tech Stack: Laravel 13, PHP 8.3+, Inertia 3, React 19, TypeScript 5, Vite 8, Tailwind CSS 4, MySQL 8+",
    ],
    images: [
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714086/sawal-00-landing-page.jpg", alt: "Landing page Sawala" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714133/sawal-01-login.jpg", alt: "Halaman masuk" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714129/sawal-02-daftar.jpg", alt: "Halaman pendaftaran" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714138/sawal-03-ringkasan-admin.jpg", alt: "Ringkasan admin" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714146/sawal-04-kelas-pelajaran-admin.jpg", alt: "Kelas dan pelajaran" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714150/sawal-05-kosakata-konteks-admin.jpg", alt: "Kosakata dan konteks" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714142/sawal-06-kumpulan-aksara-admin.jpg", alt: "Kumpulan aksara Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714154/sawal-07-latihan-soal-admin.jpg", alt: "Latihan dan soal" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714159/sawal-08-audio-media-admin.jpg", alt: "Audio dan media" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714164/sawal-09-pelajar-progres-admin.jpg", alt: "Pelajar dan progres" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714161/sawal-10-laporan-analitik-admin.jpg", alt: "Laporan dan analitik" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714167/sawal-11-pengaturan-tutor-ai-admin.jpg", alt: "Pengaturan Tutor AI" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714171/sawal-12-umpan-balik-admin.jpg", alt: "Umpan balik" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714175/sawal-13-profil-admin.jpg", alt: "Profil admin" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714184/sawal-14-keamanan-akun-admin.jpg", alt: "Keamanan akun admin" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714180/sawal-15-beranda-pengguna.jpg", alt: "Beranda pengguna" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714197/sawal-16-bahasa-sunda-pengguna.jpg", alt: "Kelas Bahasa Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714188/sawal-17-aksara-sunda-pengguna.jpg", alt: "Kelas Aksara Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714191/sawal-18-ruang-belajar-bahasa-sunda-pengguna.jpg", alt: "Ruang belajar Bahasa Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714195/sawal-19-ruang-belajar-aksara-sunda-pengguna.jpg", alt: "Ruang belajar Aksara Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714203/sawal-20-kumpulan-aksara-pengguna.jpg", alt: "Kumpulan Aksara Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714199/sawal-21-latihan-aksara-pengguna.jpg", alt: "Daftar latihan Aksara Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714207/sawal-22-kuis-pengguna.jpg", alt: "Kuis dan evaluasi" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714210/sawal-23-tutor-ai-pengguna.jpg", alt: "Tutor AI" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714215/sawal-24-progres-belajar-pengguna.jpg", alt: "Progres belajar" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714213/sawal-25-ulasan-jawaban-pengguna.jpg", alt: "Ulasan jawaban" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714222/sawal-26-ulangan-terjadwal-pengguna.jpg", alt: "Ulangan terjadwal" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714218/sawal-27-materi-tersimpan-pengguna.jpg", alt: "Materi tersimpan" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714220/sawal-28-umpan-balik-pengguna.jpg", alt: "Form umpan balik" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714224/sawal-29-profil-pengguna.jpg", alt: "Profil pengguna" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714229/sawal-30-keamanan-akun-pengguna.jpg", alt: "Keamanan akun pengguna" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714236/sawal-31-pengerjaan-latihan-pengguna.jpg", alt: "Pengerjaan latihan Aksara Sunda" },
      { src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714232/sawal-32-kuis-dikerjakan-pengguna.jpg", alt: "Pengerjaan kuis" },
    ],
    video: {
      src: "https://res.cloudinary.com/jaiq0dj6/video/upload/v1790759264/sawala-brand-intro.mp4",
      poster: {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714086/sawal-00-landing-page.jpg",
        alt: "Landing page Sawala",
      },
    },
    imageRatio: 16 / 10,
  },
  {
    id: "streamfilm",
    icon: VideoCamera,
    iconLabel: "StreamFilm",
    title: "StreamFilm - Katalog Film, Serial & Anime",
    description:
      "Platform katalog film, serial, dan anime untuk menemukan tontonan, melihat detail lengkap, menonton trailer, dan menyimpan watchlist secara lokal.",
    meta: "Date Project : 2026",
    websiteUrl: "https://www.streamfilm.web.id/",
    techStack: [
      { label: "Next.js", slug: "nextdotjs", invertInDark: true },
      { label: "TypeScript", slug: "typescript" },
      { label: "Tailwind CSS", slug: "tailwindcss" },
    ],
    overview:
      "StreamFilm adalah aplikasi katalog hiburan berbasis Next.js App Router. Katalog film dan serial menggunakan TMDB API untuk metadata, poster, rating, trailer, pemeran, season, dan episode. Aplikasi juga menyediakan kategori Anime tersendiri dengan pencarian dan filter berdasarkan judul, genre, format, status tayang, musim, dan tahun. Pengguna dapat menjelajahi judul populer, membuka halaman detail, dan menyimpan pilihan ke watchlist lokal di perangkat.",
    highlights: [
      "Katalog film, serial, dan anime melalui kategori yang terpisah",
      "Katalog film dan serial dengan data populer, trending, rating tertinggi, dan rilisan terbaru dari TMDB",
      "Kategori anime dengan filter judul, genre, format, status tayang, musim, dan tahun, serta urutan terpopuler",
      "Pencarian dan filter film atau serial berdasarkan genre, tahun rilis, popularitas, atau rating",
      "Halaman detail dengan sinopsis, rating, trailer, pemeran, season, dan episode untuk serial",
      "Watchlist lokal yang tersimpan di perangkat tanpa memerlukan akun",
      "Hero section dan media row responsif untuk pengalaman browsing yang sinematik",
      "Tech Stack: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui, TMDB API",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790715271/streamfilm-2026-09-30-033341.jpg",
        alt: "Landing page StreamFilm",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790715275/streamfilm-2026-09-30-033352.jpg",
        alt: "Beranda StreamFilm",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790715280/streamfilm-2026-09-30-033402.jpg",
        alt: "Katalog film StreamFilm",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790715285/streamfilm-2026-09-30-033411.jpg",
        alt: "Katalog serial StreamFilm",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790715290/streamfilm-2026-09-30-033424.jpg",
        alt: "Katalog anime StreamFilm",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790715293/streamfilm-2026-09-30-033602.jpg",
        alt: "Watchlist StreamFilm",
      },
    ],
    video: {
      src: "https://res.cloudinary.com/jaiq0dj6/video/upload/v1790759298/StreamFilm-16x9.mp4",
      poster: {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790715271/streamfilm-2026-09-30-033341.jpg",
        alt: "Landing page StreamFilm",
      },
    },
    imageRatio: 16 / 9,
  },
  {
    id: "automation-trading",
    icon: MoneyTransfer,
    iconLabel: "Trading Bot",
    title: "Automation Trading Suite - AI Bot MT5 & Web Journal",
    description:
      "Ekosistem trading otomatis terintegrasi yang menggabungkan AI Bot untuk MetaTrader 5 (analisis strategi SMC/ICT dengan LLM, risk guard, dan eksekusi otomatis) dengan Web Trading Journal berbasis Next.js untuk monitoring performa, kalender PnL, dan analitik secara real-time.",
    meta: "Date Project : 2026",
    githubUrl: "https://github.com/MuhamadHilalFakhri/AutomationTrading.git",
    techStack: [
      { label: "Python", slug: "python" },
      { label: "Next.js", slug: "nextdotjs", invertInDark: true },
      { label: "React", slug: "react" },
      { label: "TypeScript", slug: "typescript" },
      { label: "Tailwind CSS", slug: "tailwindcss" },
    ],
    overview:
      "Automation Trading Suite adalah sistem trading otomatis pribadi yang mengintegrasikan bot trading AI berbasis Python untuk MetaTrader 5 dengan aplikasi web jurnal trading modern berbasis Next.js. Bot AI memindai pergerakan market di berbagai timeframe, menganalisis struktur market menggunakan model AI (LLM OpenAI-compatible) dengan kerangka strategi SMC (Smart Money Concepts), ICT, dan Supply & Demand, memvalidasi parameter risiko melalui Risk Guard (RR minimum, spread filter, daily-loss halt), serta mengeksekusi order secara presisi di MT5 dengan trailing stop dan partial TP. Semua aktivitas trading, posisi terbuka, sinyal AI, dan performa PnL disinkronkan secara otomatis dan dapat dipantau langsung melalui web dashboard jurnal serta remote control melalui Telegram Bot.",
    highlights: [
      "Bot Trading AI MetaTrader 5 dengan scan paralel multi-pair & multi-timeframe (M5, M15, H1, H4)",
      "Integrasi AI LLM dengan strategi SMC (Order Block, FVG, Liquidity Sweep), ICT, dan Supply & Demand",
      "Risk Guard otomatis: validasi Risk:Reward (RR), spread filter, daily-loss limit, dan dynamic lot sizing",
      "Manajemen posisi otomatis: Break-Even (BE), Trailing Stop dinamis, dan Partial Take Profit (TP)",
      "Web Trading Journal modern dengan Next.js 16, React 19, Tailwind CSS, SQLite, dan Drizzle ORM",
      "Interactive Market Charts bertenaga TradingView & Lightweight Charts untuk visualisasi level entry/exit",
      "Analitik performa komprehensif: Kalender PnL harian, Win Rate, Profit Factor, dan breakdown per pair & strategi",
      "Live stream terminal aktivitas bot (scan, keputusan AI, eksekusi order, risk block) secara real-time",
      "Remote control & notifikasi real-time via Telegram Bot untuk pantau PnL dan ubah pair dari HP",
      "Desktop GUI control panel mandiri berbasis Python & PyInstaller untuk konfigurasi parameter tanpa coding",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712942/screenshot-2026-09-05-230752-converted.webp",
        alt: "Landing Page Automation Trading Suite",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712949/screenshot-2026-09-05-230811-converted.webp",
        alt: "Dashboard Performa Trading & Ringkasan PnL",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712945/screenshot-2026-09-05-230821-converted.webp",
        alt: "Market Chart TradingView & Analisis Pair",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712954/screenshot-2026-09-05-230841-converted.webp",
        alt: "Chart Eksekusi Entry MT5 Real-time",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712965/screenshot-2026-09-05-230847-converted.webp",
        alt: "Terminal Live Stream Aktivitas Bot Trading",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712961/screenshot-2026-09-05-230855-converted.webp",
        alt: "Riwayat Transaksi & Posisi Terbuka",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712956/screenshot-2026-09-05-230931-converted.webp",
        alt: "Kalender Rekap PnL Harian",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712969/screenshot-2026-09-05-231014-converted.webp",
        alt: "Analitik Performa Win Rate & Profit Factor",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712973/screenshot-2026-09-05-231023-converted.webp",
        alt: "Log Sinyal AI & Jejak Keputusan",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712985/screenshot-2026-09-05-231031-converted.webp",
        alt: "Pengaturan & Status Sinkronisasi MT5",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712981/x.png",
        alt: "Control Panel Desktop Terminal MT5",
      },
    ],
    video: {
      src: "https://res.cloudinary.com/jaiq0dj6/video/upload/v1790759237/automation-trading-horizontal.mp4",
      poster: {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712942/screenshot-2026-09-05-230752-converted.webp",
        alt: "Landing Page Automation Trading Suite",
      },
    },
    imageRatio: 16 / 9,
  },
  {
    id: "skripsi",
    icon: Users,
    iconLabel: "Skripsi",
    title: "HRIS - Human Resource Information System Berbasis AI",
    description:
      "Sistem manajemen SDM berbasis web dengan AI-powered CV screening menggunakan Groq LLM. Pengembangan lanjutan dari proyek Internship dengan tech stack modern (Go, Next.js) dan fitur tambahan seperti AI screening, audit log, surat-menyurat digital, disposisi surat, serta template surat.",
    meta: "Date Project : 2026",
    githubPrivate: true,
    techStack: [
      { label: "Go", slug: "go" },
      { label: "Next.js", slug: "nextdotjs", invertInDark: true },
      { label: "TypeScript", slug: "typescript" },
    ],
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
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713242/screenshot-2026-08-24-193422-converted.webp",
        alt: "Dashboard Super Admin HRIS",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713246/screenshot-2026-08-24-193456-converted.webp",
        alt: "AI CV Screening dengan Groq",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713272/screenshot-2026-08-24-193510-converted.webp",
        alt: "Pipeline Rekrutmen Visual",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713258/screenshot-2026-08-24-193713-converted.webp",
        alt: "Scoring dan Shortlist Pelamar",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713268/screenshot-2026-08-24-193737-converted.webp",
        alt: "Jadwal Interview Online/Offline",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713263/screenshot-2026-08-24-193753-converted.webp",
        alt: "Export Laporan Rekrutmen",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713278/screenshot-2026-08-24-193809-converted.webp",
        alt: "Kelola Template Surat",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713283/screenshot-2026-08-24-193847-converted.webp",
        alt: "Preview PDF Template Surat",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713274/screenshot-2026-08-24-193857-converted.webp",
        alt: "Disposisi Surat Digital",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713287/screenshot-2026-08-24-193921-converted.webp",
        alt: "Kelola Staff dan Divisi",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713292/screenshot-2026-08-24-193931-converted.webp",
        alt: "Audit Log Tracking Aktivitas",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713300/screenshot-2026-08-24-194256-converted.webp",
        alt: "Dashboard Pelamar",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713296/screenshot-2026-08-24-194311-converted.webp",
        alt: "Profil Pelamar dengan Autocomplete",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713304/screenshot-2026-08-24-194321-converted.webp",
        alt: "Kirim Lamaran dengan Upload CV",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713310/screenshot-2026-08-24-194330-converted.webp",
        alt: "Tracking Status Lamaran",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713308/screenshot-2026-08-24-194451-converted.webp",
        alt: "Dashboard Staff Karyawan",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713316/screenshot-2026-08-24-194500-converted.webp",
        alt: "Pengaduan Karyawan Multi Kategori",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713313/screenshot-2026-08-24-194537-converted.webp",
        alt: "Pengajuan Resign Digital",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713325/screenshot-2026-08-24-194550-converted.webp",
        alt: "Google OAuth 2.0 Login",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713321/screenshot-2026-08-24-194601-converted.webp",
        alt: "Dark Mode Interface",
      },
    ],
    imageRatio: 16 / 9,
  },
  {
    id: "capstone",
    icon: School,
    iconLabel: "Capstone",
    title: "E-Learning SMPN 2 Merapi Barat",
    description:
      "Platform pembelajaran daring berbasis web dengan 3 role pengguna (Admin, Guru, Siswa) yang memfasilitasi pembelajaran interaktif, pengelolaan materi, kuis dengan AI, dan manajemen data master sekolah.",
    meta: "Date Project : 2025 - 2026",
    githubPrivate: true,
    techStack: [
      { label: "Laravel", slug: "laravel" },
      { label: "React", slug: "react" },
      { label: "TypeScript", slug: "typescript" },
      { label: "Tailwind CSS", slug: "tailwindcss" },
    ],
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
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712982/screenshot-2026-08-24-195811-converted.webp",
        alt: "Dashboard Admin E-Learning",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712978/screenshot-2026-08-24-195826-converted.webp",
        alt: "Manajemen Data Guru",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712988/screenshot-2026-08-24-195835-converted.webp",
        alt: "Import/Export Data Excel",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712992/screenshot-2026-08-24-195845-converted.webp",
        alt: "Manajemen Data Siswa",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712996/screenshot-2026-08-24-195856-converted.webp",
        alt: "Manajemen Kelas dan Wali Kelas",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713009/screenshot-2026-08-24-195905-converted.webp",
        alt: "Manajemen Mata Pelajaran",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713006/screenshot-2026-08-24-195914-converted.webp",
        alt: "Dashboard Guru",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713001/screenshot-2026-08-24-200251-converted.webp",
        alt: "Upload dan Kelola Materi Pembelajaran",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713014/screenshot-2026-08-24-200302-converted.webp",
        alt: "Form Upload Materi Multi-Format",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713024/screenshot-2026-08-24-200313-converted.webp",
        alt: "Buat Kuis dengan AI Interaktif",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713012/screenshot-2026-08-24-200322-converted.webp",
        alt: "Pengaturan Timer dan Jadwal Kuis",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713020/screenshot-2026-08-24-200336-converted.webp",
        alt: "Statistik Materi dan Kuis Guru",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713016/screenshot-2026-08-24-200439-converted.webp",
        alt: "Dashboard Siswa dan Progres Belajar",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713029/screenshot-2026-08-24-200449-converted.webp",
        alt: "Akses Materi dengan Filter Pencarian",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713034/screenshot-2026-08-24-200459-converted.webp",
        alt: "Interface Kuis dengan Timer",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713038/screenshot-2026-08-24-200508-converted.webp",
        alt: "Hasil dan Riwayat Nilai Siswa",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713042/screenshot-2026-08-24-200519-converted.webp",
        alt: "Statistik Performa Per Mata Pelajaran",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713048/screenshot-2026-08-24-200530-converted.webp",
        alt: "Detail Progres Pembelajaran",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713056/screenshot-2026-08-24-200538-converted.webp",
        alt: "Profile dan Pengaturan Akun",
      },
    ],
    imageRatio: 16 / 9,
  },
  {
    id: "internship",
    icon: UserRole,
    iconLabel: "Internship",
    title: "Sistem Informasi SDM (Human Resource Information System)",
    description:
      "Aplikasi web HRIS dengan 4 role pengguna (Super Admin, Admin Staff, Staff, Pelamar) yang mengotomatisasi seluruh proses HR dari rekrutmen, onboarding, pengelolaan surat, hingga offboarding.",
    meta: "Date Project : 2025 - 2026",
    githubPrivate: true,
    techStack: [
      { label: "Laravel", slug: "laravel" },
      { label: "React", slug: "react" },
      { label: "TypeScript", slug: "typescript" },
      { label: "Tailwind CSS", slug: "tailwindcss" },
    ],
    overview:
      "Sistem HRIS yang dibangun untuk perusahaan LDP yang mengelola proses kepegawaian dari rekrutmen hingga offboarding secara digital. Aplikasi ini dilengkapi fitur lengkap: dashboard statistik real-time, modul rekrutmen dengan kalender visual untuk penjadwalan interview, sistem disposisi surat digital, pengelolaan pengaduan karyawan, dan proses offboarding terstruktur. Dilengkapi notifikasi real-time menggunakan Laravel Reverb (WebSocket) untuk memastikan semua stakeholder mendapat update langsung. Setiap role memiliki akses dan fitur yang disesuaikan dengan kebutuhan operasional mereka.",
    highlights: [
      "4 role pengguna dengan hak akses berbeda: Super Admin (HRD), Admin Staff, Staff (Karyawan), dan Pelamar",
      "Rekrutmen & onboarding digital dengan kalender visual, checklist proses, dan konversi pelamar ke karyawan",
      "Sistem disposisi surat masuk/keluar dengan template surat dan export ke Word",
      "Proses offboarding terstruktur dengan checklist serah terima dan exit interview",
      "Pengelolaan pengaduan karyawan dengan opsi anonim dan tracking penyelesaian",
      "Notifikasi real-time menggunakan Laravel Reverb (WebSocket)",
      "Tech Stack: Laravel 12, React 18, TypeScript, Tailwind CSS, Inertia.js, MySQL",
    ],
    images: [
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713053/screenshot-2026-08-24-194725-converted.webp",
        alt: "Dashboard Super Admin HRIS",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713063/screenshot-2026-08-24-194759-converted.webp",
        alt: "Modul Rekrutmen",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713065/screenshot-2026-08-24-194808-converted.webp",
        alt: "Kalender Penjadwalan Interview",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713070/screenshot-2026-08-24-194816-converted.webp",
        alt: "Detail Proses Onboarding",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713061/screenshot-2026-08-24-194825-converted.webp",
        alt: "Kelola Divisi dan Lowongan",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713078/screenshot-2026-08-24-194833-converted.webp",
        alt: "Sistem Disposisi Surat",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713074/screenshot-2026-08-24-194841-converted.webp",
        alt: "Template dan Export Surat",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713082/screenshot-2026-08-24-194850-converted.webp",
        alt: "Modul Offboarding",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713087/screenshot-2026-08-24-195114-converted.webp",
        alt: "Pengelolaan Pengaduan Karyawan",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713211/screenshot-2026-08-24-195124-converted.webp",
        alt: "Dashboard Pelamar",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713091/screenshot-2026-08-24-195227-converted.webp",
        alt: "Form Lamaran Kerja",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713216/screenshot-2026-08-24-195237-converted.webp",
        alt: "Profil dan CV Pelamar",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713218/screenshot-2026-08-24-195244-converted.webp",
        alt: "Status Tracking Lamaran",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713214/screenshot-2026-08-24-195433-converted.webp",
        alt: "Kelola Akun Pengguna",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713223/screenshot-2026-08-24-195445-converted.webp",
        alt: "Sistem Notifikasi Real-time",
      },
      {
        src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790713228/screenshot-2026-08-24-195454-converted.webp",
        alt: "Landing Page Lowongan Kerja",
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
  const items = PROJECTS;
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
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
  }, [updateArrows, items.length]);

  const scrollProjects = (direction: 1 | -1): void => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const distance = card ? card.offsetWidth + gap : track.clientWidth;
    track.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative w-full [contain-intrinsic-size:auto_48rem] [content-visibility:auto]"
      data-scroll-reveal
      data-scroll-stagger
    >
      <div className="mx-auto w-full max-w-275 px-4 min-[360px]:px-6 sm:px-10">
        {withHeadline ? (
          <div
            className="flex flex-col items-center gap-4 pt-8 pb-8 text-center sm:gap-5 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14"
            data-scroll-reveal-item
          >
            <h2 className="text-foreground font-serif text-[2.2rem] leading-[1.05] font-medium tracking-tight min-[360px]:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              From playful experiments to thoughtful systems, a look at the work
              I&rsquo;m proud to have shipped.
            </p>
          </div>
        ) : null}

        <div className="relative">
          <div className="flex items-center justify-between pb-4">
            <span className="text-foreground/50 text-sm font-medium tracking-tight">
              {items.length} projects
            </span>
            {items.length > 1 ? (
              <div className="hidden gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollProjects(-1)}
                  disabled={!canPrev}
                  aria-label="Previous projects"
                  className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjects(1)}
                  disabled={!canNext}
                  aria-label="Next projects"
                  className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : null}
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => scrollProjects(-1)}
                disabled={!canPrev}
                aria-label="Previous project"
                className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects(1)}
                disabled={!canNext}
                aria-label="Next project"
                className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            aria-label="Browse projects"
            className="-mx-4 flex touch-auto snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 min-[360px]:-mx-6 min-[360px]:px-6 sm:-mx-10 sm:gap-6 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((project) => (
              <div
                key={project.id}
                data-card
                data-scroll-reveal-item
                className="flex w-full min-w-0 shrink-0 snap-start sm:w-[calc(50%_-_0.75rem)] lg:w-[calc(33.333333%_-_1rem)]"
              >
                <ProjectCard
                  project={project}
                  onSelect={() => setActiveProject(project)}
                />
              </div>
            ))}
          </div>
        </div>

        {viewMoreVisible ? (
          <div
            className="mt-12 flex justify-center sm:mt-16"
            data-scroll-reveal-item
          >
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

      {activeProject ? (
        <Suspense fallback={null}>
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        </Suspense>
      ) : null}
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
  const cover = project.images[0] ?? project.video?.poster;
  const externalUrl = project.githubUrl ?? project.websiteUrl;
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
      className="project-card border-foreground/8 focus-ring bg-background flex h-full min-h-full cursor-pointer flex-col gap-4 rounded-2xl border p-3 sm:rounded-3xl sm:p-3.5"
    >
      <header className="flex items-center gap-2.5 px-1 pt-2">
        <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
          <Icon className="text-foreground h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="text-foreground text-sm font-medium tracking-tight">
          {project.iconLabel}
        </span>
        {externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={
              project.githubUrl
                ? `View ${project.iconLabel} repository on GitHub`
                : `Visit ${project.iconLabel} website`
            }
            aria-describedby={`repository-tooltip-${project.id}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className="group/repository focus-ring border-foreground/10 bg-background text-foreground/70 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground relative ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors"
          >
            {project.githubUrl ? (
              <Github className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Compass className="h-4 w-4" aria-hidden="true" />
            )}
            <span
              id={`repository-tooltip-${project.id}`}
              role="tooltip"
              className="bg-foreground text-background pointer-events-none absolute top-full right-0 z-30 mt-2 w-max rounded-md px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-sm transition-opacity duration-150 group-hover/repository:opacity-100 group-focus-visible/repository:opacity-100"
            >
              {project.githubUrl
                ? "View repository on GitHub"
                : `Visit ${project.iconLabel} website`}
            </span>
          </a>
        ) : project.githubPrivate ? (
          <span
            tabIndex={0}
            role="img"
            aria-label="Repositori GitHub privat"
            aria-describedby={`repository-tooltip-${project.id}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className="group/repository focus-ring border-foreground/10 bg-background text-foreground/60 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground relative ml-auto inline-flex h-8 w-8 shrink-0 cursor-default items-center justify-center rounded-lg border transition-colors"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span
              id={`repository-tooltip-${project.id}`}
              role="tooltip"
              className="bg-foreground text-background pointer-events-none absolute top-full right-0 z-30 mt-2 w-max rounded-md px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-sm transition-opacity duration-150 group-hover/repository:opacity-100 group-focus-visible/repository:opacity-100"
            >
              Repository Private
            </span>
          </span>
        ) : null}
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

      <div className="mt-auto px-1 pb-2">
        <div className="border-foreground/8 flex items-center justify-between gap-3 border-t pt-3">
          <span className="text-foreground/45 text-[11px] font-medium tracking-wide uppercase">
            Tech stack
          </span>
          <ul
            className="flex items-center gap-1.5"
            aria-label={`${project.title} technology stack`}
          >
            {project.techStack.map((tech) => (
              <li
                key={tech.label}
                title={tech.label}
                aria-label={tech.label}
                className="border-foreground/10 bg-background hover:border-foreground/20 hover:bg-foreground/5 flex h-8 w-8 items-center justify-center rounded-lg border transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5"
              >
                <Image
                  src={`/icons/${tech.slug}.svg`}
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className={`h-4 w-4 object-contain ${
                    tech.invertInDark ? "dark:invert" : ""
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        <p className="text-foreground/50 mt-3 text-[12px] tracking-tight">
          {project.meta}
        </p>
      </div>
    </article>
  );
}
