"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  LineChart,
  Sparkles,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

/**
 * Project imagery below is mockup-only. All visuals are sourced from
 * Dribbble and credit belongs to the original creators on dribbble.com.
 * Replace these with your own work before shipping.
 */

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
};

const PROJECTS: Project[] = [
  {
    id: "loom",
    icon: Sparkles,
    iconLabel: "LOOM",
    title:
      "An AI writing companion that thinks alongside you, allowing you to capture ideas, edits, and drafts in one focused space.",
    description:
      "I designed Loom, a focused writing surface where ideas, edits, and drafts coexist without the chat clutter.",
    meta: "Design Engineer, 2024",
    imageRatio: 752 / 497,
    image:
      "https://cdn.dribbble.com/userupload/46128964/file/b92b9d268dd928642ca94bd49e32923a.jpg?resize=752x497&vertical=center",
    imageAlt: "Loom AI writing companion mockup",
  },
  {
    id: "atlas",
    icon: Compass,
    iconLabel: "Atlas Studio",
    title: "A two week brand and product sprint for a creative studio.",
    description:
      "End to end identity, marketing site, and a small product surface designed to feel quietly confident across every touchpoint.",
    meta: "Product & Brand Designer, 2025",
    imageRatio: 1024 / 768,
    image:
      "https://cdn.dribbble.com/userupload/24599416/file/original-1ae5075dcd129aebb16bdbca24b41ac7.png?resize=1024x768&vertical=center",
    imageAlt: "Atlas Studio brand and product sprint mockup",
  },
  {
    id: "rhythm",
    icon: LineChart,
    iconLabel: "Rhythm",
    title: "Calm analytics for indie founders.",
    description:
      "A weekly digest that turns raw product data into a simple narrative. Built so you can read it on a Sunday with coffee.",
    meta: "Founder & Designer, 2024",
    imageRatio: 1024 / 768,
    image:
      "https://cdn.dribbble.com/userupload/47357856/file/75841fa59f32f05ca6c5ddf02d08dfe6.png?resize=1024x768&vertical=center",
    imageAlt: "Rhythm calm analytics mockup",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollToCard = (direction: 1 | -1): void => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const gap = 24;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              From playful experiments to thoughtful systems, a look at the
              work I&rsquo;m proud to have shipped.
            </p>
          </FadeIn>
        ) : null}

        <FadeIn className="relative">
          <div className="flex items-center justify-between pb-4">
            <span className="text-sm font-medium tracking-tight text-foreground/50">
              {items.length} projects
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollToCard(-1)}
                disabled={!canPrev}
                aria-label="Previous project"
                className="border-foreground/10 focus-ring inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border bg-background text-foreground transition-colors hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollToCard(1)}
                disabled={!canNext}
                aria-label="Next project"
                className="border-foreground/10 focus-ring inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border bg-background text-foreground transition-colors hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-10 sm:px-10"
          >
            {items.map((project) => (
              <div
                key={project.id}
                data-card
                className="w-full shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </FadeIn>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
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
    </section>
  );
}

function ProjectCard({ project }: { project: Project }): ReactNode {
  const Icon = project.icon;
  return (
    <article className="project-card flex h-full cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
      <header className="flex items-center gap-2.5 px-1 pt-2">
        <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
          <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium tracking-tight text-foreground">
          {project.iconLabel}
        </span>
      </header>

      <div
        className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
        style={{ aspectRatio: project.imageRatio }}
      >
        <div className="project-card__image-inner">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-1 pb-1">
        <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
          {project.title}
        </h3>
        <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
          {project.description}
        </p>
      </div>

      <p className="mt-auto px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
        {project.meta}
      </p>
    </article>
  );
}
