"use client";

import {
  ArrowDown,
  DocumentFile,
  EducationCertificate,
  UserRole,
  Users,
} from "meya-icons/react/outline";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import {
  ROW_HEIGHT,
  SMOOTH_EASE,
  type Entry,
  type Section,
} from "./experience-data";

export function ExperienceEntry({
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
          data-card-outline
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
            <DocumentFile
              className="text-foreground/50 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
          </span>
        </motion.a>
      ) : (
        <motion.button
          data-card-outline
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
              <ArrowDown
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
              data-card-outline
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
      ? UserRole
      : entry.icon === "organization"
        ? Users
        : EducationCertificate;
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
