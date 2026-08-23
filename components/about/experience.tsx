"use client";

import {
  Award,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    role: "Fullstack Developer",
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
  const containerRef = useRef<HTMLDivElement>(null);

  const entries =
    activeSection === "experience"
      ? EXPERIENCE
      : activeSection === "organization"
        ? ORGANIZATION
        : CERTIFICATE;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = containerRef.current?.querySelectorAll("li");
    if (!items) return;

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [activeSection]);

  return (
    <div className="flex flex-col gap-3" ref={containerRef}>
      <div className="flex gap-2 border-b border-foreground/10">
        <button
          type="button"
          onClick={() => {
            setActiveSection("experience");
            setExpandedIndex(null);
          }}
          className={`px-3 py-2 text-[14px] font-medium tracking-tight transition-colors ${
            activeSection === "experience"
              ? "text-foreground border-b-2 border-foreground"
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
          className={`px-3 py-2 text-[14px] font-medium tracking-tight transition-colors ${
            activeSection === "organization"
              ? "text-foreground border-b-2 border-foreground"
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
          className={`px-3 py-2 text-[14px] font-medium tracking-tight transition-colors ${
            activeSection === "certificate"
              ? "text-foreground border-b-2 border-foreground"
              : "text-foreground/50 hover:text-foreground/75"
          }`}
        >
          Certificate
        </button>
      </div>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {entries.map((entry, index) => (
            <li key={`${entry.company}-${entry.period}`} className="flex flex-col">
              {entry.pdfUrl ? (
                <a
                  href={entry.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-background border-foreground/5 focus-ring flex items-center gap-4 rounded-3xl border p-2 text-left transition-colors hover:bg-foreground/2"
                  style={{ minHeight: ROW_HEIGHT }}
                >
                  <CompanyLogo entry={entry} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                      {entry.company}
                    </span>
                    <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                      {entry.role}
                      {entry.role && (
                        <span className="text-foreground/30 mx-2">•</span>
                      )}
                      <span className="text-foreground/55">{entry.period}</span>
                    </span>
                  </div>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="hidden text-[12px] tracking-tight text-foreground/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
                      Klik untuk melihat sertifikat
                    </span>
                    <FileText
                      className="h-4 w-4 shrink-0 text-foreground/50"
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
                  className="bg-background border-foreground/5 focus-ring flex items-center gap-4 rounded-3xl border p-2 text-left transition-colors hover:bg-foreground/2"
                  style={{ minHeight: ROW_HEIGHT }}
                >
                  <CompanyLogo entry={entry} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                      {entry.company}
                    </span>
                    <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                      {entry.role}
                      <span className="text-foreground/30 mx-2">•</span>
                      <span className="text-foreground/55">{entry.period}</span>
                    </span>
                  </div>
                  {entry.description && (
                    <motion.span
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex shrink-0"
                    >
                      <ChevronDown
                        className="h-4 w-4 text-foreground/50"
                        aria-hidden="true"
                      />
                    </motion.span>
                  )}
                </button>
              )}

              <AnimatePresence>
                {expandedIndex === index && entry.description && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 overflow-hidden"
                  >
                    <div className="bg-background border-foreground/5 rounded-3xl border p-3 sm:p-4">
                      <ul className="flex flex-col gap-2">
                        {entry.description.map((desc, idx) => (
                          <li
                            key={idx}
                            className="text-foreground/70 text-[14px] leading-relaxed sm:text-[15px]"
                          >
                            <span className="mr-2">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
      className="border-foreground/15 inline-flex h-12 w-12 shrink-0 items-center justify-center border"
      aria-hidden="true"
      style={{ borderRadius: 14 }}
    >
      <Icon className="h-6 w-6 text-foreground/60" />
    </span>
  );
}
