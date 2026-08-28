"use client";

import {
  Award,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  UsersRound,
} from "lucide-react";
import { useState, type ReactNode } from "react";

type Entry = {
  company: string;
  role?: string;
  period: string;
  icon: "briefcase" | "organization" | "certificate";
  brand?: string;
  description?: string[];
  pdfUrl?: string;
};

type Section = "experience" | "organization" | "certificate";

const EXPERIENCE: Entry[] = [
  {
    company: "PT. Lintas Data Prima",
    role: "Internship",
    period: "Sep 2025 – Jan 2026",
    icon: "briefcase",
    brand: "#0066CC",
    description: [
      "Mengembangkan sistem Human Resource Information System (HRIS) berbasis web dari tahap perancangan hingga implementasi menggunakan Laravel, Inertia.js, dan React.js",
      "Melakukan analisis kebutuhan sistem berdasarkan proses bisnis perusahaan",
      "Merancang struktur database dan arsitektur backend untuk mendukung sistem HRIS",
      "Mengimplementasikan fitur backend menggunakan Laravel serta mengintegrasikan frontend dengan React.js melalui Inertia.js",
      "Berkolaborasi dengan tim dalam proses pengembangan dan pengujian sistem untuk memastikan aplikasi berjalan dengan optimal",
    ],
  },
];

const ORGANIZATION: Entry[] = [
  {
    company: "Keluarga Mahasiswa Teknologi Informasi (KMTI)",
    role: "Anggota",
    period: "Sep 2023 – Agustus 2024",
    icon: "organization",
    brand: "#FF6B35",
    description: [
      "Bertanggung jawab dalam perencanaan dan pelaksanaan seminar kewirausahaan dari tahap awal hingga selesai",
      "Mengelola keseluruhan rangkaian acara, termasuk penyusunan konsep dan koordinasi tim",
      "Menjalin komunikasi dan koordinasi dengan narasumber serta pihak terkait",
      "Memastikan pelaksanaan acara berjalan lancar sesuai dengan rencana dan tujuan kegiatan",
    ],
  },
  {
    company: "Panitia MATAF Teknik UMY",
    role: "Panitia",
    period: "Mar 2023 – Sep 2023",
    icon: "organization",
    brand: "#1DB954",
    description: [
      "Bertanggung jawab dalam pendampingan dan pengelolaan mahasiswa baru selama rangkaian kegiatan MATAF Teknik",
      "Mengawal mahasiswa baru mulai dari tahap orientasi hingga seluruh rangkaian kegiatan selesai",
      "Berperan dalam memastikan kelancaran kegiatan serta kedisiplinan peserta",
      "Berkoordinasi dengan panitia lain untuk menjaga jalannya kegiatan sesuai dengan rencana",
    ],
  },
];

const CERTIFICATE: Entry[] = [
  {
    company: "Deployment Perangkat Lunak",
    period: "Completion Date : Juni 2025 – Juli 2025",
    icon: "certificate",
    pdfUrl: "/Deployment.pdf",
  },
  {
    company: "Web Developer",
    role: "BNSP",
    period: "2026 – 2029",
    icon: "certificate",
    pdfUrl: "/BNSP.pdf",
  },
  {
    company: "Software Development",
    role: "Certiport",
    period: "2026 – 2031",
    icon: "certificate",
    pdfUrl: "/SoftDev.pdf",
  },
];

const ROW_HEIGHT = 64;

export function Experience(): ReactNode {
  const [activeSection, setActiveSection] = useState<Section>("experience");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const entries =
    activeSection === "experience"
      ? EXPERIENCE
      : activeSection === "organization"
        ? ORGANIZATION
        : CERTIFICATE;

  return (
    <div className="flex flex-col gap-3" data-scroll-reveal-item>
      <div className="border-foreground/10 grid grid-cols-3 border-b">
        <button
          type="button"
          onClick={() => {
            setActiveSection("experience");
            setExpandedIndex(null);
          }}
          className={`focus-ring min-w-0 cursor-pointer px-1 py-2 text-[11px] font-medium tracking-tight transition-colors min-[360px]:px-1.5 min-[360px]:text-[12px] sm:px-3 sm:text-[14px] ${
            activeSection === "experience"
              ? "text-foreground border-foreground border-b-2"
              : "text-foreground/50 hover:text-foreground/75"
          }`}
        >
          Experience
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveSection("organization");
            setExpandedIndex(null);
          }}
          className={`focus-ring min-w-0 cursor-pointer px-1 py-2 text-[11px] font-medium tracking-tight transition-colors min-[360px]:px-1.5 min-[360px]:text-[12px] sm:px-3 sm:text-[14px] ${
            activeSection === "organization"
              ? "text-foreground border-foreground border-b-2"
              : "text-foreground/50 hover:text-foreground/75"
          }`}
        >
          Organization
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveSection("certificate");
            setExpandedIndex(null);
          }}
          className={`focus-ring min-w-0 cursor-pointer px-1 py-2 text-[11px] font-medium tracking-tight transition-colors min-[360px]:px-1.5 min-[360px]:text-[12px] sm:px-3 sm:text-[14px] ${
            activeSection === "certificate"
              ? "text-foreground border-foreground border-b-2"
              : "text-foreground/50 hover:text-foreground/75"
          }`}
        >
          Certificate
        </button>
      </div>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-3xl border p-2 sm:rounded-4xl sm:p-4">
        <ul className="flex flex-col gap-2">
          {entries.map((entry, index) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="flex flex-col"
            >
              {entry.pdfUrl ? (
                <a
                  href={entry.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group focus-ring border-foreground/5 bg-background hover:bg-foreground/2 flex items-center gap-3 rounded-2xl border p-2 text-left transition-colors sm:gap-4 sm:rounded-3xl"
                  style={{ minHeight: ROW_HEIGHT }}
                >
                  <CompanyLogo entry={entry} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-foreground text-[15px] leading-snug font-semibold tracking-tight break-words min-[360px]:text-[16px] sm:text-[18px]">
                      {entry.company}
                    </span>
                    <span className="text-foreground/65 mt-0.5 text-[12px] leading-snug tracking-tight break-words min-[360px]:text-[13px] sm:text-[15px]">
                      {entry.role}
                      {entry.role && (
                        <span className="text-foreground/30 mx-2">•</span>
                      )}
                      <span className="text-foreground/55">{entry.period}</span>
                    </span>
                  </div>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="text-foreground/40 hidden text-[12px] tracking-tight opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
                      Klik untuk melihat sertifikat
                    </span>
                    <FileText
                      className="text-foreground/50 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="focus-ring border-foreground/5 bg-background hover:bg-foreground/2 flex items-center gap-3 rounded-2xl border p-2 text-left transition-colors sm:gap-4 sm:rounded-3xl"
                  style={{ minHeight: ROW_HEIGHT }}
                >
                  <CompanyLogo entry={entry} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-foreground text-[15px] leading-snug font-semibold tracking-tight break-words min-[360px]:text-[16px] sm:text-[18px]">
                      {entry.company}
                    </span>
                    <span className="text-foreground/65 mt-0.5 text-[12px] leading-snug tracking-tight break-words min-[360px]:text-[13px] sm:text-[15px]">
                      {entry.role}
                      <span className="text-foreground/30 mx-2">•</span>
                      <span className="text-foreground/55">{entry.period}</span>
                    </span>
                  </div>
                  {entry.description && (
                    <span
                      className={`inline-flex shrink-0 transition-transform duration-200 ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown
                        className="text-foreground/50 h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </button>
              )}

              {expandedIndex === index && entry.description && (
                <div className="mt-2 overflow-hidden">
                  <div className="border-foreground/5 bg-background rounded-2xl border p-3 sm:rounded-3xl sm:p-4">
                    <ul className="flex flex-col gap-2">
                      {entry.description.map((desc, idx) => (
                        <li
                          key={idx}
                          className="text-foreground/70 text-[13px] leading-relaxed sm:text-[15px]"
                        >
                          <span className="mr-2">•</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompanyLogo({ entry }: { entry: Entry }): ReactNode {
  const Icon =
    entry.icon === "briefcase"
      ? BriefcaseBusiness
      : entry.icon === "organization"
        ? UsersRound
        : Award;
  return (
    <span
      className="border-foreground/15 inline-flex h-10 w-10 shrink-0 items-center justify-center border sm:h-12 sm:w-12"
      aria-hidden="true"
      style={{ borderRadius: 14 }}
    >
      <Icon className="text-foreground/60 h-5 w-5 sm:h-6 sm:w-6" />
    </span>
  );
}
