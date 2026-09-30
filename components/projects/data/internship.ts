import { UserRole } from "meya-icons/react/outline";
import type { Project } from "../project-types";

export const internshipProject: Project = {
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
};
