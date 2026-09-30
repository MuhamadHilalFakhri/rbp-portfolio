"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "./project-types";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/lib/smooth-scroll";

const FALLBACK_RATIO = 16 / 10;
const MIN_STAGE_HEIGHT = 152;
const MAX_STAGE_HEIGHT = 272;

export function useProjectMedia(project: Project | null, onClose: () => void) {
  const [slide, setSlide] = useState(0);
  const [lastProjectId, setLastProjectId] = useState<string | null>(null);
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [stageWidth, setStageWidth] = useState(0);
  const [stageNode, setStageNode] = useState<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isFullscreenRef = useRef(false);
  const imageOffset = project?.video ? 1 : 0;
  const imageSlide = slide - imageOffset;
  const isVideoSlide = Boolean(project?.video && slide === 0);
  const total = (project?.images.length ?? 0) + imageOffset;

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

  const ratio = ratios[slide] ?? (isVideoSlide ? 16 / 9 : FALLBACK_RATIO);
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

  const goToPrevImage = useCallback(() => {
    const imageCount = project?.images.length ?? 0;
    if (imageCount < 1) return;
    setSlide(
      (current) =>
        imageOffset + ((current - imageOffset - 1 + imageCount) % imageCount)
    );
  }, [imageOffset, project?.images.length]);

  const goToNextImage = useCallback(() => {
    const imageCount = project?.images.length ?? 0;
    if (imageCount < 1) return;
    setSlide(
      (current) => imageOffset + ((current - imageOffset + 1) % imageCount)
    );
  }, [imageOffset, project?.images.length]);

  useEffect(() => {
    if (!project) return;
    pauseSmoothScroll();
    return () => resumeSmoothScroll();
  }, [project]);

  useEffect(() => {
    if (!project || total < 2) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowLeft") {
        if (isFullscreen) goToPrevImage();
        else goToPrev();
      }
      if (event.key === "ArrowRight") {
        if (isFullscreen) goToNextImage();
        else goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    project,
    total,
    isFullscreen,
    goToPrev,
    goToNext,
    goToPrevImage,
    goToNextImage,
  ]);

  return {
    slide,
    setSlide,
    isFullscreen,
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
    goToPrevImage,
    goToNextImage,
  };
}
