import { DocumentFile } from "meya-icons/react/outline";
import type { Project } from "../project-types";

export const rencanaProject: Project = {
  id: "rencana",
  icon: DocumentFile,
  iconLabel: "Rencana.",
  title: "Rencana.",
  description:
    "SaaS berbasis AI untuk mengubah ide produk menjadi PRD terstruktur, menyempurnakan dokumen, dan menyiapkannya untuk coding agent.",
  meta: "Date Project : 2026",
  websiteUrl: "https://rencana.web.id/",
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
    src: "https://res.cloudinary.com/jaiq0dj6/video/upload/v1790763083/rencana-landscape.mp4",
    poster: {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790758477/rencana-homepage-thumbnail.png",
      alt: "Preview landing page Rencana.",
    },
  },
  imageRatio: 16 / 9,
};
