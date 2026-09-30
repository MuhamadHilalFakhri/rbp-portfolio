"use client";

import { ChevronLeft, ChevronRight, X } from "meya-icons/react/outline";
import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "./project-types";
import type { useProjectMedia } from "./use-project-media";

type ProjectLightboxProps = { project: Project } & Pick<
  ReturnType<typeof useProjectMedia>,
  | "imageSlide"
  | "imageOffset"
  | "setSlide"
  | "setIsFullscreen"
  | "goToPrevImage"
  | "goToNextImage"
>;

export function ProjectLightbox({
  project,
  imageSlide,
  imageOffset,
  setSlide,
  setIsFullscreen,
  goToPrevImage,
  goToNextImage,
}: ProjectLightboxProps) {
  return (
    <motion.div
      key="lightbox"
      role="dialog"
      aria-label={`${project.iconLabel} fullscreen viewer`}
      className="pointer-events-none fixed inset-0 z-[10002] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 flex"
        animate={{ x: `-${imageSlide * 100}%` }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {project.images.map((image, index) => (
          <div
            key={`${image.src}-fs-${index}`}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              priority={index === imageSlide}
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>

      <button
        type="button"
        onClick={() => setIsFullscreen(false)}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Exit fullscreen"
        autoFocus
        className="focus-ring pointer-events-auto absolute top-3 right-3 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-[0_4px_14px_rgba(0,0,0,0.65)] backdrop-blur transition-colors hover:bg-black/85 sm:h-11 sm:w-11"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <span className="absolute top-4 left-4 z-20 rounded-full border border-white/30 bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white tabular-nums shadow-[0_4px_14px_rgba(0,0,0,0.65)] sm:top-5 sm:left-5">
        {imageSlide + 1} / {project.images.length}
      </span>

      {project.images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goToPrevImage}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Previous image"
            className="focus-ring pointer-events-auto absolute top-1/2 left-2 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-[0_4px_14px_rgba(0,0,0,0.65)] backdrop-blur transition-colors hover:bg-black/85 sm:left-4 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNextImage}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Next image"
            className="focus-ring pointer-events-auto absolute top-1/2 right-2 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-[0_4px_14px_rgba(0,0,0,0.65)] backdrop-blur transition-colors hover:bg-black/85 sm:right-4 sm:h-12 sm:w-12"
          >
            <ChevronRight
              className="h-5 w-5 sm:h-6 sm:w-6"
              aria-hidden="true"
            />
          </button>

          <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
            {project.images.map((image, index) => (
              <button
                key={`${image.src}-fs-dot-${index}`}
                type="button"
                onClick={() => setSlide(index + imageOffset)}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === imageSlide}
                className={`pointer-events-auto h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  index === imageSlide
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </motion.div>
  );
}
