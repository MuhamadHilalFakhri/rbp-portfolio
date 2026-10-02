"use client";

import { Github } from "lucide-react";
import { Compass } from "meya-icons/react/outline";
import Image from "next/image";
import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Project } from "./project-types";

export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}): ReactNode {
  const Icon = project.icon;
  const cover = project.images[0] ?? project.video?.poster;
  const externalUrl = project.githubUrl ?? project.websiteUrl;
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const TAP_THRESHOLD = 8;

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>): void => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handleClick = (event: ReactMouseEvent<HTMLElement>): void => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start) {
      const dx = Math.abs(event.clientX - start.x);
      const dy = Math.abs(event.clientY - start.y);
      if (dx > TAP_THRESHOLD || dy > TAP_THRESHOLD) {
        // Treat as a swipe/scroll gesture, not a tap.
        return;
      }
    }
    onSelect();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details for ${project.iconLabel}`}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className="project-card border-foreground/20 focus-ring bg-background flex h-full min-h-full cursor-pointer flex-col gap-4 rounded-2xl border p-3 sm:rounded-3xl sm:p-3.5"
    >
      <header className="flex items-center gap-2.5 px-1 pt-2">
        <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
          <Icon className="text-foreground h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="text-foreground text-sm font-medium tracking-tight">
          {project.iconLabel}
        </span>
        {externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={
              project.githubUrl
                ? `View ${project.iconLabel} repository on GitHub`
                : `Visit ${project.iconLabel} website`
            }
            aria-describedby={`repository-tooltip-${project.id}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className="group/repository focus-ring border-foreground/10 bg-background text-foreground/70 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground relative ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors"
          >
            {project.githubUrl ? (
              <Github className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Compass className="h-4 w-4" aria-hidden="true" />
            )}
            <span
              id={`repository-tooltip-${project.id}`}
              role="tooltip"
              className="bg-foreground text-background pointer-events-none absolute top-full right-0 z-30 mt-2 w-max rounded-md px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-sm transition-opacity duration-150 group-hover/repository:opacity-100 group-focus-visible/repository:opacity-100"
            >
              {project.githubUrl
                ? "View repository on GitHub"
                : `Visit ${project.iconLabel} website`}
            </span>
          </a>
        ) : project.githubPrivate ? (
          <span
            tabIndex={0}
            role="img"
            aria-label="Repositori GitHub privat"
            aria-describedby={`repository-tooltip-${project.id}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className="group/repository focus-ring border-foreground/10 bg-background text-foreground/60 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground relative ml-auto inline-flex h-8 w-8 shrink-0 cursor-default items-center justify-center rounded-lg border transition-colors"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span
              id={`repository-tooltip-${project.id}`}
              role="tooltip"
              className="bg-foreground text-background pointer-events-none absolute top-full right-0 z-30 mt-2 w-max rounded-md px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-sm transition-opacity duration-150 group-hover/repository:opacity-100 group-focus-visible/repository:opacity-100"
            >
              Repository Private
            </span>
          </span>
        ) : null}
      </header>

      {cover ? (
        <div
          className="project-card__image ring-foreground/5 bg-foreground/5 relative w-full overflow-hidden rounded-2xl ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-2.5 px-1 pb-1">
        <h3 className="text-foreground text-[18px] leading-[1.25] font-medium tracking-tight min-[360px]:text-[20px] sm:text-[22px]">
          {project.title}
        </h3>
        <p className="text-foreground/65 text-[14px] leading-normal tracking-tight sm:text-[15px]">
          {project.description}
        </p>
      </div>

      <div className="mt-auto px-1 pb-2">
        <div className="border-foreground/8 flex items-center justify-between gap-3 border-t pt-3">
          <span className="text-foreground/45 text-[11px] font-medium tracking-wide uppercase">
            Tech stack
          </span>
          <ul
            className="flex items-center gap-1.5"
            aria-label={`${project.title} technology stack`}
          >
            {project.techStack.map((tech) => (
              <li
                key={tech.label}
                title={tech.label}
                aria-label={tech.label}
                className="border-foreground/10 bg-background hover:border-foreground/20 hover:bg-foreground/5 flex h-8 w-8 items-center justify-center rounded-lg border transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5"
              >
                <Image
                  src={`/icons/${tech.slug}.svg`}
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className={`h-4 w-4 object-contain ${
                    tech.invertInDark ? "dark:invert" : ""
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        <p className="text-foreground/50 mt-3 text-[12px] tracking-tight">
          {project.meta}
        </p>
      </div>
    </article>
  );
}
