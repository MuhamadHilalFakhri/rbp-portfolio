"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "meya-icons/react/outline";
import { lazy, Suspense, useState, type ReactNode } from "react";
import Link from "next/link";
import { PROJECTS } from "./project-data";
import { ProjectCard } from "./project-card";
import { useProjectCarousel } from "./use-project-carousel";
import {
  ProjectFilters,
  matchesProjectFilter,
  type ProjectFilter,
} from "./project-filters";
import type { Project } from "./project-types";
export type {
  Project,
  ProjectImage,
  ProjectVideo,
  ProjectTech,
} from "./project-types";

const ProjectModal = lazy(() =>
  import("@/components/projects/project-modal").then((module) => ({
    default: module.ProjectModal,
  }))
);

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const [filter, setFilter] = useState<ProjectFilter>("Semua");
  const items = PROJECTS.filter((project) =>
    matchesProjectFilter(project, filter)
  );
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const {
    trackRef,
    canPrev,
    canNext,
    isDragging,
    progress,
    visibleRange,
    scrollProjects,
    handleTrackPointerDown,
    handleTrackPointerMove,
    handleTrackPointerEnd,
    handleTrackPointerLeave,
  } = useProjectCarousel(items.length);

  return (
    <section
      id="projects"
      className="relative w-full scroll-mt-24 [contain-intrinsic-size:auto_48rem] [content-visibility:auto]"
      data-scroll-reveal
      data-scroll-stagger
    >
      <div className="mx-auto w-full max-w-275 px-4 min-[360px]:px-6 sm:px-10">
        {withHeadline ? (
          <div
            className="flex flex-col items-center gap-4 pt-8 pb-8 text-center sm:gap-5 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14"
            data-scroll-reveal-item
          >
            <h2 className="text-foreground font-serif text-[2.2rem] leading-[1.05] font-medium tracking-tight min-[360px]:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              From playful experiments to thoughtful systems, a look at the work
              I&rsquo;m proud to have shipped.
            </p>
          </div>
        ) : null}

        <div className="relative">
          <ProjectFilters
            value={filter}
            onChange={(next) => {
              setFilter(next);
              trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
            }}
          />
          <div className="flex items-center justify-between pb-4">
            <span className="text-foreground/50 text-sm font-medium tracking-tight">
              {items.length} projects
            </span>
            {items.length > 1 ? (
              <div className="hidden gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollProjects(-1)}
                  disabled={!canPrev}
                  aria-label="Previous projects"
                  className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjects(1)}
                  disabled={!canNext}
                  aria-label="Next projects"
                  className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : null}
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => scrollProjects(-1)}
                disabled={!canPrev}
                aria-label="Previous project"
                className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects(1)}
                disabled={!canNext}
                aria-label="Next project"
                className="focus-ring border-foreground/10 bg-background text-foreground hover:bg-foreground/5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            aria-label="Browse projects"
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerEnd}
            onPointerCancel={handleTrackPointerEnd}
            onLostPointerCapture={handleTrackPointerEnd}
            onPointerLeave={handleTrackPointerLeave}
            onDragStart={(event) => event.preventDefault()}
            className={`-mx-4 flex touch-auto snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pt-2 pb-4 [scrollbar-width:none] min-[360px]:-mx-6 min-[360px]:scroll-px-6 min-[360px]:px-6 sm:-mx-10 sm:scroll-px-10 sm:gap-6 sm:px-10 [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing select-none" : "sm:cursor-grab"}`}
          >
            {items.map((project) => (
              <div
                key={`${filter}-${project.id}`}
                data-card
                data-scroll-reveal-item
                className="project-carousel-item flex w-full min-w-0 shrink-0 snap-start sm:w-[calc(50%_-_0.75rem)] lg:w-[calc(33.333333%_-_1rem)]"
              >
                <ProjectCard
                  project={project}
                  onSelect={() => setActiveProject(project)}
                />
              </div>
            ))}
          </div>
          <div className="text-foreground/55 mt-3 flex items-center gap-4 text-xs">
            <span className="shrink-0">
              {visibleRange.start}–{visibleRange.end} / {items.length}
            </span>
            <div
              role="progressbar"
              aria-label="Posisi carousel proyek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              className="bg-foreground/10 h-1 flex-1 overflow-hidden rounded-full"
            >
              <div
                className="bg-foreground/55 h-full rounded-full transition-[width] duration-200"
                style={{ width: `${15 + progress * 85}%` }}
              />
            </div>
            <span className="shrink-0">Geser untuk menjelajah</span>
          </div>
        </div>

        {viewMoreVisible ? (
          <div
            className="mt-12 flex justify-center sm:mt-16"
            data-scroll-reveal-item
          >
            <Link
              href="/projects"
              className="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>

      {activeProject ? (
        <Suspense fallback={null}>
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        </Suspense>
      ) : null}
    </section>
  );
}
