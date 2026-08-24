"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/components/projects/projects";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/lib/smooth-scroll";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const FALLBACK_RATIO = 16 / 10;
const MIN_STAGE_HEIGHT = 152;
const MAX_STAGE_HEIGHT = 272;

export function ProjectModal({
  project,
  onClose,
}: ProjectModalProps): ReactNode {
  const [slide, setSlide] = useState(0);
  const [lastProjectId, setLastProjectId] = useState<string | null>(null);
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [stageWidth, setStageWidth] = useState(0);
  const [stageNode, setStageNode] = useState<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isFullscreenRef = useRef(false);
  const total = project?.images.length ?? 0;

  useEffect(() => {
    isFullscreenRef.current = isFullscreen;
  }, [isFullscreen]);

  if ((project?.id ?? null) !== lastProjectId) {
    setLastProjectId(project?.id ?? null);
    setSlide(0);
    setRatios({});
    setIsFullscreen(false);
  }

  const requestClose = useCallback(() => {
    if (isFullscreenRef.current) {
      setIsFullscreen(false);
      return;
    }
    onClose();
  }, [onClose]);

  const ratio = ratios[slide] ?? FALLBACK_RATIO;
  const stageHeight =
    stageWidth > 0
      ? Math.min(
          MAX_STAGE_HEIGHT,
          Math.max(MIN_STAGE_HEIGHT, Math.round(stageWidth / ratio))
        )
      : undefined;

  useEffect(() => {
    if (!stageNode) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) setStageWidth(entry.contentRect.width);
      }
    });
    observer.observe(stageNode);
    return () => observer.disconnect();
  }, [stageNode]);

  const handleImageLoad = useCallback(
    (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
      const image = event.currentTarget;
      if (!image.naturalWidth || !image.naturalHeight) return;
      const value = image.naturalWidth / image.naturalHeight;
      setRatios((previous) =>
        previous[index] === value ? previous : { ...previous, [index]: value }
      );
    },
    []
  );

  const goToPrev = useCallback(() => {
    setSlide((current) => (current - 1 + total) % total);
  }, [total]);

  const goToNext = useCallback(() => {
    setSlide((current) => (current + 1) % total);
  }, [total]);

  useEffect(() => {
    if (!project) return;
    pauseSmoothScroll();
    return () => resumeSmoothScroll();
  }, [project]);

  useEffect(() => {
    if (!project || total < 2) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowLeft") goToPrev();
      if (event.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, total, goToPrev, goToNext]);

  return (
    <Dialog
      open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <AnimatePresence>
        {project ? (
          <DialogPortal forceMount>
            <DialogOverlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </DialogOverlay>

            <DialogContent
              forceMount
              asChild
              showCloseButton={false}
              aria-describedby={undefined}
              className="max-h-[calc(100dvh-1rem)] w-full max-w-xl rounded-2xl p-0 min-[360px]:rounded-3xl sm:max-h-[calc(100dvh-3rem)]"
            >
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full flex-col max-sm:max-h-[calc(100dvh-1rem)]"
              >
                <div
                  ref={setStageNode}
                  className="group/stage bg-foreground/5 relative min-h-[9.5rem] max-h-[30dvh] w-full shrink-0 cursor-zoom-in overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-[34dvh]"
                  style={stageHeight ? { height: stageHeight } : undefined}
                >
                  <motion.div
                    className="absolute inset-0 flex"
                    animate={{ x: `-${slide * 100}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
                          onLoad={(event) => handleImageLoad(index, event)}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </motion.div>

                  {total > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={goToPrev}
                        aria-label="Previous image"
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
                        aria-label="Next image"
                        className="focus-ring absolute top-1/2 right-2 z-10 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65 sm:right-3 sm:h-10 sm:w-10"
                      >
                        <ChevronRight
                          className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                          aria-hidden="true"
                        />
                      </button>

                      <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-3">
                        {project.images.map((image, index) => (
                          <button
                            key={`${image.src}-dot-${index}`}
                            type="button"
                            onClick={() => setSlide(index)}
                            aria-label={`Go to image ${index + 1}`}
                            aria-current={index === slide}
                            className={`pointer-events-auto h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                              index === slide
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

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    aria-label="View image fullscreen"
                    className="focus-ring pointer-events-none absolute top-1/2 left-1/2 z-10 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover/stage:pointer-events-auto group-hover/stage:opacity-100 hover:bg-black/65 group-focus-within/stage:pointer-events-auto group-focus-within/stage:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
                  >
                    <Maximize2 className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={requestClose}
                    aria-label="Close project details"
                    className="focus-ring absolute top-2.5 right-2.5 z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65 sm:top-3 sm:right-3 sm:h-10 sm:w-10"
                  >
                    <X className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
                  </button>
                </div>

                <div
                  data-lenis-prevent
                  className="overscroll-contain flex min-h-0 flex-col gap-3.5 overflow-y-auto p-4 min-[360px]:gap-4 min-[360px]:p-5 sm:p-6"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="border-foreground/10 bg-background inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                      <project.icon
                        className="text-foreground h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>
                    <DialogTitle className="text-foreground text-sm font-medium tracking-tight">
                      {project.iconLabel}
                    </DialogTitle>
                    <span className="text-foreground/50 ml-auto text-[12px] tracking-tight">
                      {project.meta}
                    </span>
                  </div>

                  <h3 className="text-foreground text-[20px] leading-[1.25] font-medium tracking-tight sm:text-[24px]">
                    {project.title}
                  </h3>

                  <p className="text-foreground/65 text-[14px] leading-relaxed tracking-tight sm:text-[15px]">
                    {project.overview}
                  </p>

                  {project.highlights.length > 0 ? (
                    <ul className="mt-1 flex flex-col gap-2.5 pb-1">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-foreground/75 flex items-start gap-2.5 text-[13.5px] leading-snug tracking-tight sm:text-[14px]"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-foreground/30 mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.div>
            </DialogContent>
          </DialogPortal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {project && isFullscreen ? (
          <DialogPortal forceMount>
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
                animate={{ x: `-${slide * 100}%` }}
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
                      priority={index === slide}
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
                className="focus-ring pointer-events-auto absolute top-3 right-3 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:h-11 sm:w-11"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <span className="absolute top-4 left-4 z-20 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white tabular-nums sm:top-5 sm:left-5">
                {slide + 1} / {total}
              </span>

              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goToPrev}
                    onPointerDown={(e) => e.stopPropagation()}
                    aria-label="Previous image"
                    className="focus-ring pointer-events-auto absolute top-1/2 left-2 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:left-4 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    onPointerDown={(e) => e.stopPropagation()}
                    aria-label="Next image"
                    className="focus-ring pointer-events-auto absolute top-1/2 right-2 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:right-4 sm:h-12 sm:w-12"
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
                        onClick={() => setSlide(index)}
                        onPointerDown={(e) => e.stopPropagation()}
                        aria-label={`Go to image ${index + 1}`}
                        aria-current={index === slide}
                        className={`pointer-events-auto h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                          index === slide
                            ? "w-6 bg-white"
                            : "w-1.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </motion.div>
          </DialogPortal>
        ) : null}
      </AnimatePresence>
    </Dialog>
  );
}
