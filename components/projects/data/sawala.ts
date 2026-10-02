import { OnlineCourse } from "meya-icons/react/outline";
import type { Project } from "../project-types";

export const sawalaProject: Project = {
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
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714086/sawal-00-landing-page.jpg",
      alt: "Landing page Sawala",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714133/sawal-01-login.jpg",
      alt: "Halaman masuk",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714129/sawal-02-daftar.jpg",
      alt: "Halaman pendaftaran",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714138/sawal-03-ringkasan-admin.jpg",
      alt: "Ringkasan admin",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714146/sawal-04-kelas-pelajaran-admin.jpg",
      alt: "Kelas dan pelajaran",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714150/sawal-05-kosakata-konteks-admin.jpg",
      alt: "Kosakata dan konteks",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714142/sawal-06-kumpulan-aksara-admin.jpg",
      alt: "Kumpulan aksara Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714154/sawal-07-latihan-soal-admin.jpg",
      alt: "Latihan dan soal",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714159/sawal-08-audio-media-admin.jpg",
      alt: "Audio dan media",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714164/sawal-09-pelajar-progres-admin.jpg",
      alt: "Pelajar dan progres",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714161/sawal-10-laporan-analitik-admin.jpg",
      alt: "Laporan dan analitik",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714167/sawal-11-pengaturan-tutor-ai-admin.jpg",
      alt: "Pengaturan Tutor AI",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714171/sawal-12-umpan-balik-admin.jpg",
      alt: "Umpan balik",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714175/sawal-13-profil-admin.jpg",
      alt: "Profil admin",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714184/sawal-14-keamanan-akun-admin.jpg",
      alt: "Keamanan akun admin",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714180/sawal-15-beranda-pengguna.jpg",
      alt: "Beranda pengguna",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714197/sawal-16-bahasa-sunda-pengguna.jpg",
      alt: "Kelas Bahasa Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714188/sawal-17-aksara-sunda-pengguna.jpg",
      alt: "Kelas Aksara Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714191/sawal-18-ruang-belajar-bahasa-sunda-pengguna.jpg",
      alt: "Ruang belajar Bahasa Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714195/sawal-19-ruang-belajar-aksara-sunda-pengguna.jpg",
      alt: "Ruang belajar Aksara Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714203/sawal-20-kumpulan-aksara-pengguna.jpg",
      alt: "Kumpulan Aksara Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714199/sawal-21-latihan-aksara-pengguna.jpg",
      alt: "Daftar latihan Aksara Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714207/sawal-22-kuis-pengguna.jpg",
      alt: "Kuis dan evaluasi",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714210/sawal-23-tutor-ai-pengguna.jpg",
      alt: "Tutor AI",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714215/sawal-24-progres-belajar-pengguna.jpg",
      alt: "Progres belajar",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714213/sawal-25-ulasan-jawaban-pengguna.jpg",
      alt: "Ulasan jawaban",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714222/sawal-26-ulangan-terjadwal-pengguna.jpg",
      alt: "Ulangan terjadwal",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714218/sawal-27-materi-tersimpan-pengguna.jpg",
      alt: "Materi tersimpan",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714220/sawal-28-umpan-balik-pengguna.jpg",
      alt: "Form umpan balik",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714224/sawal-29-profil-pengguna.jpg",
      alt: "Profil pengguna",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714229/sawal-30-keamanan-akun-pengguna.jpg",
      alt: "Keamanan akun pengguna",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714236/sawal-31-pengerjaan-latihan-pengguna.jpg",
      alt: "Pengerjaan latihan Aksara Sunda",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714232/sawal-32-kuis-dikerjakan-pengguna.jpg",
      alt: "Pengerjaan kuis",
    },
  ],
  video: {
    src: "https://res.cloudinary.com/jaiq0dj6/video/upload/v1790759264/sawala-brand-intro.mp4",
    poster: {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790714086/sawal-00-landing-page.jpg",
      alt: "Landing page Sawala",
    },
  },
  imageRatio: 16 / 9,
};
