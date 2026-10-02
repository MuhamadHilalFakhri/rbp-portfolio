"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  X,
} from "meya-icons/react/outline";
import { motion, useReducedMotion } from "motion/react";
import { useMediaSwipe } from "./use-media-swipe";
import Image from "next/image";
import type { Project } from "./project-types";
import type { useProjectMedia } from "./use-project-media";

type ProjectMediaStageProps = { project: Project } & Pick<
  ReturnType<typeof useProjectMedia>,
  | "slide"
  | "setSlide"
  | "setIsFullscreen"
  | "imageOffset"
  | "imageSlide"
  | "isVideoSlide"
  | "total"
  | "requestClose"
  | "stageHeight"
  | "setStageNode"
  | "handleImageLoad"
  | "goToPrev"
  | "goToNext"
>;

export function ProjectMediaStage({
  project,
  slide,
  setSlide,
  setIsFullscreen,
  imageOffset,
  imageSlide,
  isVideoSlide,
  total,
  requestClose,
  stageHeight,
  setStageNode,
  handleImageLoad,
  goToPrev,
  goToNext,
}: ProjectMediaStageProps) {
  const reducedMotion = useReducedMotion();
  const swipe = useMediaSwipe({
    enabled: !isVideoSlide && total > 1,
    onPrevious: goToPrev,
    onNext: goToNext,
  });
  return (
    <div
      ref={setStageNode}
      {...swipe}
      className={`group/stage bg-foreground/5 relative max-h-[30dvh] min-h-[9.5rem] w-full shrink-0 ${isVideoSlide ? "cursor-default" : "cursor-zoom-in"} overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-[34dvh]`}
      style={{
        height: stageHeight ?? undefined,
        touchAction: isVideoSlide ? "auto" : "pan-y pinch-zoom",
      }}
    >
      {isVideoSlide && project.video ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={project.video.poster.src}
          aria-label={`Video ${project.title}`}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        >
          <source src={project.video.src} type="video/mp4" />
          Browser Anda tidak mendukung pemutaran video.
        </video>
      ) : (
        <motion.div
          className="absolute inset-0 flex"
          animate={{ x: `-${imageSlide * 100}%` }}
          transition={{
            duration: reducedMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {project.images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 576px, 100vw"
                onLoad={(event) => handleImageLoad(index + imageOffset, event)}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      )}

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous media"
            className="focus-ring absolute top-1/2 left-2 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65 sm:left-3 sm:h-10 sm:w-10"
          >
            <ChevronLeft
              className="h-[18px] w-[18px] sm:h-5 sm:w-5"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next media"
            className="focus-ring absolute top-1/2 right-2 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65 sm:right-3 sm:h-10 sm:w-10"
          >
            <ChevronRight
              className="h-[18px] w-[18px] sm:h-5 sm:w-5"
              aria-hidden="true"
            />
          </button>

          <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-3">
            {project.video ? (
              <button
                key="video-dot"
                type="button"
                onClick={() => setSlide(0)}
                aria-label="Go to project video"
                aria-current={isVideoSlide}
                className={`pointer-events-auto h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  isVideoSlide
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ) : null}
            {project.images.map((image, index) => (
              <button
                key={`${image.src}-dot-${index}`}
                type="button"
                onClick={() => setSlide(index + imageOffset)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index + imageOffset === slide}
                className={`pointer-events-auto h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  index + imageOffset === slide
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <span className="absolute right-2.5 bottom-2.5 z-10 rounded-full bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white tabular-nums backdrop-blur sm:right-3 sm:bottom-3 sm:px-2.5 sm:py-1">
            {slide + 1} / {total}
          </span>
        </>
      ) : null}

      {!isVideoSlide ? (
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          aria-label="View image fullscreen"
          className="focus-ring pointer-events-none absolute top-1/2 left-1/2 z-10 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition-all duration-300 group-focus-within/stage:pointer-events-auto group-focus-within/stage:opacity-100 group-hover/stage:pointer-events-auto group-hover/stage:opacity-100 hover:bg-black/65 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
        >
          <Maximize className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={requestClose}
        aria-label="Close project details"
        className="focus-ring absolute top-2.5 right-2.5 z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65 sm:top-3 sm:right-3 sm:h-10 sm:w-10"
      >
        <X className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
