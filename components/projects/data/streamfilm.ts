import { VideoCamera } from "meya-icons/react/outline";
import type { Project } from "../project-types";

export const streamfilmProject: Project = {
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
};
