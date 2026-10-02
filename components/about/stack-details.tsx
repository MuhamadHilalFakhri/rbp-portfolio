"use client";

import { lazy, Suspense, useState } from "react";
import { CHIPS } from "./stack-data";
import { PROJECTS } from "@/components/projects/project-data";
import type { Project } from "@/components/projects/project-types";

const ProjectModal = lazy(() =>
  import("@/components/projects/project-modal").then((module) => ({
    default: module.ProjectModal,
  }))
);

const TECHNOLOGY_ROLES: Record<string, string> = {
  react: "Membangun antarmuka berbasis komponen dan interaksi pengguna.",
  nextdotjs:
    "Mengatur halaman, rendering, dan fitur aplikasi React di sisi server.",
  typescript:
    "Menjaga tipe data dan kontrak antar komponen agar kode lebih mudah dipelihara.",
  shadcnui:
    "Menyusun komponen antarmuka yang dapat disesuaikan dengan desain aplikasi.",
  gsap: "Membuat animasi antarmuka dan transisi saat halaman di-scroll.",
  github:
    "Mengelola versi kode dan kolaborasi melalui repository serta pull request.",
  vercel: "Menjalankan deployment dan hosting aplikasi web.",
  tailwindcss: "Menyusun tampilan responsif dengan utility CSS.",
  go: "Membangun layanan backend dan API untuk kebutuhan aplikasi.",
  php: "Mengembangkan logika aplikasi web di sisi server.",
  laravel: "Membangun backend, routing, autentikasi, dan pengelolaan data.",
  laragon: "Menyiapkan lingkungan pengembangan web lokal.",
};

export function StackDetails() {
  const [selected, setSelected] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const chip = CHIPS.find((item) => item.slug === selected);
  const projects = PROJECTS.filter((item) =>
    item.techStack.some((tech) => tech.slug === selected)
  );

  return (
    <div className="border-foreground/10 bg-background rounded-3xl border p-4 sm:p-5">
      <p className="text-foreground/60 mb-3 text-sm">
        Pilih teknologi untuk melihat peran dan proyek terkait.
      </p>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Pilih teknologi"
      >
        {CHIPS.map((item) => (
          <button
            type="button"
            key={item.slug}
            aria-pressed={selected === item.slug}
            onClick={() => setSelected(item.slug)}
            className={`focus-ring cursor-pointer rounded-full border px-3 py-2 text-xs transition-colors ${selected === item.slug ? "border-foreground bg-foreground text-background" : "border-foreground/15 text-foreground/70 hover:border-foreground/35"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {chip && (
        <div
          className="border-foreground/10 mt-4 border-t pt-4"
          aria-live="polite"
        >
          <h4 className="text-sm font-semibold">{chip.label}</h4>
          <p className="text-foreground/65 mt-2 text-sm leading-relaxed">
            {TECHNOLOGY_ROLES[chip.slug]}
          </p>
          {projects.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {projects.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setProject(item)}
                    className="focus-ring text-foreground/80 decoration-foreground/25 hover:text-foreground cursor-pointer text-left text-sm underline underline-offset-4"
                  >
                    {item.title} <span aria-hidden="true">↗</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground/50 mt-3 text-xs">
              Belum ada proyek terkait yang tercantum di portfolio.
            </p>
          )}
        </div>
      )}
      {project && (
        <Suspense
          fallback={
            <p role="status" className="text-foreground/60 mt-3 text-sm">
              Memuat detail proyek…
            </p>
          }
        >
          <ProjectModal project={project} onClose={() => setProject(null)} />
        </Suspense>
      )}
    </div>
  );
}
