import { School } from "meya-icons/react/outline";
import type { Project } from "../project-types";

export const capstoneProject: Project = {
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
};
