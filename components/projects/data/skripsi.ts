import { Users } from "meya-icons/react/outline";
import type { Project } from "../project-types";

export const skripsiProject: Project = {
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
};
