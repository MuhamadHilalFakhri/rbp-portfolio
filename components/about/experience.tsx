"use client";

import {
  Award,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

const TABS: Array<{ id: Section; label: string }> = [
  { id: "experience", label: "Experience" },
  { id: "organization", label: "Organization" },
  { id: "certificate", label: "Certificate" },
];

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
const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Experience(): ReactNode {
  const [activeSection, setActiveSection] = useState<Section>("experience");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const reducedMotion = Boolean(useReducedMotion());

  const entries =
    activeSection === "experience"
      ? EXPERIENCE
      : activeSection === "organization"
        ? ORGANIZATION
        : CERTIFICATE;

  const changeSection = (nextSection: Section): void => {
    if (nextSection === activeSection) return;

    const currentIndex = TABS.findIndex((tab) => tab.id === activeSection);
    const nextIndex = TABS.findIndex((tab) => tab.id === nextSection);

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setExpandedIndex(null);
    setActiveSection(nextSection);
  };

  return (
    <div className="flex flex-col gap-3" data-scroll-reveal-item>
      <div
        className="border-foreground/10 grid grid-cols-3 border-b"
        role="tablist"
        aria-label="Experience categories"
      >
        {TABS.map((tab) => {
          const isActive = activeSection === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              role="tab"
              id={`experience-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls="experience-tab-panel"
              onClick={() => changeSection(tab.id)}
              whileHover={reducedMotion ? {} : { y: -1 }}
              whileTap={reducedMotion ? {} : { scale: 0.97 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
              className={`focus-ring relative min-w-0 cursor-pointer px-1 py-2 text-[11px] font-medium tracking-tight transition-colors min-[360px]:px-1.5 min-[360px]:text-[12px] sm:px-3 sm:text-[14px] ${
                isActive
                  ? "text-foreground"
                  : "text-foreground/50 hover:text-foreground/75"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive ? (
                <motion.span
                  layoutId="experience-active-tab"
                  className="bg-foreground absolute right-1 bottom-[-1px] left-1 h-0.5 rounded-full"
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                  aria-hidden="true"
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        layout
        transition={
          reducedMotion
            ? { duration: 0 }
            : { layout: { duration: 0.42, ease: SMOOTH_EASE } }
        }
        className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-3xl border p-2 sm:rounded-4xl sm:p-4"
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.ul
            key={activeSection}
            id="experience-tab-panel"
            role="tabpanel"
            aria-labelledby={`experience-tab-${activeSection}`}
            custom={direction}
            initial={{
              opacity: 0,
              x: reducedMotion ? 0 : direction * 22,
              filter: reducedMotion ? "none" : "blur(3px)",
            }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              x: reducedMotion ? 0 : direction * -16,
              filter: reducedMotion ? "none" : "blur(2px)",
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.32,
              ease: SMOOTH_EASE,
            }}
            className="flex flex-col gap-2"
          >
            {entries.map((entry, index) => (
              <ExperienceEntry
                key={`${entry.company}-${entry.period}`}
                entry={entry}
                index={index}
                section={activeSection}
                expanded={expandedIndex === index}
                reducedMotion={reducedMotion}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              />
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ExperienceEntry({
  entry,
  index,
  section,
  expanded,
  reducedMotion,
  onToggle,
}: {
  entry: Entry;
  index: number;
  section: Section;
  expanded: boolean;
  reducedMotion: boolean;
  onToggle: () => void;
}): ReactNode {
  const detailId = `experience-${section}-details-${index}`;
  const interaction = reducedMotion ? {} : { y: -2, scale: 1.005 };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.3,
        delay: reducedMotion ? 0 : index * 0.055,
        ease: SMOOTH_EASE,
      }}
      className="flex flex-col"
    >
      {entry.pdfUrl ? (
        <motion.a
          href={entry.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={interaction}
          whileTap={reducedMotion ? {} : { scale: 0.985 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="group focus-ring border-foreground/5 bg-background hover:bg-foreground/2 flex items-center gap-3 rounded-2xl border p-2 text-left transition-colors sm:gap-4 sm:rounded-3xl"
          style={{ minHeight: ROW_HEIGHT }}
        >
          <CompanyLogo entry={entry} />
          <EntryCopy entry={entry} />
          <span className="flex shrink-0 items-center gap-2">
            <span className="text-foreground/40 hidden text-[12px] tracking-tight opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
              Klik untuk melihat sertifikat
            </span>
            <FileText
              className="text-foreground/50 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
          </span>
        </motion.a>
      ) : (
        <motion.button
          type="button"
          aria-expanded={expanded}
          aria-controls={detailId}
          onClick={onToggle}
          whileHover={interaction}
          whileTap={reducedMotion ? {} : { scale: 0.985 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="focus-ring border-foreground/5 bg-background hover:bg-foreground/2 flex items-center gap-3 rounded-2xl border p-2 text-left transition-colors sm:gap-4 sm:rounded-3xl"
          style={{ minHeight: ROW_HEIGHT }}
        >
          <CompanyLogo entry={entry} />
          <EntryCopy entry={entry} />
          {entry.description ? (
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 360, damping: 28 }
              }
              className="inline-flex shrink-0"
            >
              <ChevronDown
                className="text-foreground/50 h-4 w-4"
                aria-hidden="true"
              />
            </motion.span>
          ) : null}
        </motion.button>
      )}

      <AnimatePresence initial={false}>
        {expanded && entry.description ? (
          <motion.div
            id={detailId}
            key={detailId}
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{
              height: {
                duration: reducedMotion ? 0 : 0.4,
                ease: SMOOTH_EASE,
              },
              opacity: { duration: reducedMotion ? 0 : 0.25 },
              marginTop: { duration: reducedMotion ? 0 : 0.3 },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: reducedMotion ? 0 : -8 }}
              animate={{ y: 0 }}
              exit={{ y: reducedMotion ? 0 : -6 }}
              transition={{
                duration: reducedMotion ? 0 : 0.35,
                ease: SMOOTH_EASE,
              }}
              className="border-foreground/5 bg-background rounded-2xl border p-3 sm:rounded-3xl sm:p-4"
            >
              <ul className="flex flex-col gap-2">
                {entry.description.map((description, descriptionIndex) => (
                  <motion.li
                    key={description}
                    initial={{ opacity: 0, x: reducedMotion ? 0 : -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.28,
                      delay: reducedMotion ? 0 : 0.08 + descriptionIndex * 0.04,
                    }}
                    className="text-foreground/70 text-[13px] leading-relaxed sm:text-[15px]"
                  >
                    <span className="mr-2">•</span>
                    {description}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

function EntryCopy({ entry }: { entry: Entry }): ReactNode {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="text-foreground text-[15px] leading-snug font-semibold tracking-tight break-words min-[360px]:text-[16px] sm:text-[18px]">
        {entry.company}
      </span>
      <span className="text-foreground/65 mt-0.5 text-[12px] leading-snug tracking-tight break-words min-[360px]:text-[13px] sm:text-[15px]">
        {entry.role}
        {entry.role ? <span className="text-foreground/30 mx-2">•</span> : null}
        <span className="text-foreground/55">{entry.period}</span>
      </span>
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
