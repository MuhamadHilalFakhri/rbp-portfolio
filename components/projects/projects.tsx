"use client";

import { lazy, Suspense, useState, type ReactNode } from "react";
import { PROJECTS } from "./project-data";
import { ProjectCard } from "./project-card";
import { CarouselControls } from "./carousel-controls";
import { useProjectCarousel } from "./use-project-carousel";
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
};

export function Projects({ withHeadline = false }: ProjectsProps): ReactNode {
  const items = PROJECTS;
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const {
    trackRef,
    canPrev,
    canNext,
    isDragging,
    activeIndex,
    pageCount,
    hasInteracted,
    isScrolling,
    scrollToProject,
    scrollProjects,
    handleTrackPointerDown,
    handleTrackPointerMove,
    handleTrackPointerEnd,
    handleTrackPointerLeave,
  } = useProjectCarousel(items.length, "all");

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
            data-scrolling={isDragging || isScrolling}
            className={`project-carousel-track relative -mx-4 flex touch-auto snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pt-5 pb-5 [scrollbar-width:none] min-[360px]:-mx-6 min-[360px]:scroll-px-6 min-[360px]:px-6 sm:-mx-10 sm:scroll-px-10 sm:gap-6 sm:px-10 [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing select-none" : "sm:cursor-grab"}`}
          >
            {items.map((project, index) => (
              <div
                key={project.id}
                data-card
                data-active={index === activeIndex}
                data-scroll-reveal-item
                className="project-carousel-item flex w-[86%] min-w-0 shrink-0 snap-start sm:w-[48%] lg:w-[42%]"
              >
                <ProjectCard
                  project={project}
                  onSelect={() => setActiveProject(project)}
                />
              </div>
            ))}
          </div>
          <CarouselControls
            items={items.slice(0, pageCount)}
            activeIndex={activeIndex}
            canPrev={canPrev}
            canNext={canNext}
            hasInteracted={hasInteracted}
            onPrevious={() => scrollProjects(-1)}
            onNext={() => scrollProjects(1)}
            onSelect={scrollToProject}
          />
        </div>
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
