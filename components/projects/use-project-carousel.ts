"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

function getScrollPositions(track: HTMLDivElement) {
  const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
  const first = cards[0]?.offsetLeft ?? 0;
  const max = Math.max(0, track.scrollWidth - track.clientWidth);
  return cards.reduce<number[]>((positions, card) => {
    const position = Math.max(0, Math.min(max, card.offsetLeft - first));
    if (!positions.length || position - (positions.at(-1) ?? 0) > 8)
      positions.push(position);
    return positions;
  }, []);
}

export function useProjectCarousel(itemCount: number, resetKey: string) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(itemCount);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startScrollLeft: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    active: boolean;
  } | null>(null);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const positions = getScrollPositions(track);
    let closest = 0;
    let distance = Infinity;
    positions.forEach((position, index) => {
      const next = Math.abs(position - track.scrollLeft);
      if (next < distance) {
        distance = next;
        closest = index;
      }
    });
    setActiveIndex(closest);
    setPageCount(positions.length);
    setCanPrev(closest > 0);
    setCanNext(closest < positions.length - 1);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.scrollSnapType = "none";
    const resetFrame = requestAnimationFrame(() => {
      track.scrollTo({
        left: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      if (track.scrollLeft < 1) track.style.scrollSnapType = "";
    });
    updateArrows();
    const resizeObserver = new ResizeObserver(updateArrows);
    resizeObserver.observe(track);
    let timer = 0;
    const onScroll = () => {
      updateArrows();
      if (track.scrollLeft > 8) setHasInteracted(true);
      setIsScrolling(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setIsScrolling(false);
        if (!dragRef.current?.active) track.style.scrollSnapType = "";
      }, 160);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      cancelAnimationFrame(resetFrame);
      track.style.scrollSnapType = "";
      resizeObserver.disconnect();
      window.clearTimeout(timer);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, itemCount, resetKey]);

  const scrollToProject = (index: number): void => {
    const track = trackRef.current;
    if (!track) return;
    const positions = getScrollPositions(track);
    const position =
      positions[Math.max(0, Math.min(positions.length - 1, index))];
    if (position === undefined) return;
    setHasInteracted(true);
    track.scrollTo({
      left: position,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  const scrollProjects = (direction: 1 | -1) =>
    scrollToProject(activeIndex + direction);

  const handleTrackPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if (
        event.target instanceof Element &&
        event.target.closest("a, button")
      ) {
        return;
      }
      event.currentTarget.style.scrollBehavior = "auto";
      const now = performance.now();
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: event.currentTarget.scrollLeft,
        lastX: event.clientX,
        lastTime: now,
        velocity: 0,
        active: false,
      };
    },
    []
  );

  const handleTrackPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      const now = performance.now();
      const elapsed = Math.max(1, now - drag.lastTime);
      const instantVelocity = (drag.lastX - event.clientX) / elapsed;
      drag.velocity = drag.velocity * 0.65 + instantVelocity * 0.35;
      drag.lastX = event.clientX;
      drag.lastTime = now;

      if (!drag.active) {
        if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
          dragRef.current = null;
          event.currentTarget.style.scrollBehavior = "";
          return;
        }
        if (Math.abs(deltaX) < 8) return;
        drag.active = true;
        event.currentTarget.style.scrollSnapType = "none";
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
      }

      event.preventDefault();
      event.currentTarget.scrollLeft = drag.startScrollLeft - deltaX;
    },
    []
  );

  const handleTrackPointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      dragRef.current = null;
      const track = event.currentTarget;
      track.style.scrollBehavior = "";
      if (drag.active) {
        setIsDragging(false);
        const positions = getScrollPositions(track);
        const maxScroll = track.scrollWidth - track.clientWidth;
        const projected = Math.max(
          0,
          Math.min(maxScroll, track.scrollLeft + drag.velocity * 260)
        );
        const nearestIndex = (value: number) =>
          positions.reduce(
            (closest, position, index) =>
              Math.abs(position - value) <
              Math.abs((positions[closest] ?? 0) - value)
                ? index
                : closest,
            0
          );
        const startIndex = nearestIndex(drag.startScrollLeft);
        let targetIndex = nearestIndex(projected);
        const movement = track.scrollLeft - drag.startScrollLeft;
        const cardWidth =
          track.querySelector<HTMLElement>("[data-card]")?.offsetWidth ??
          track.clientWidth;
        if (
          targetIndex === startIndex &&
          Math.abs(movement) > Math.max(32, cardWidth * 0.15)
        ) {
          targetIndex = Math.max(
            0,
            Math.min(positions.length - 1, startIndex + Math.sign(movement))
          );
        }
        const target = positions[targetIndex] ?? 0;
        // Keep snap disabled until settling; restoring it before scrolling can
        // send the track back to its previous snapped card.
        if (Math.abs(track.scrollLeft - target) < 1)
          track.style.scrollSnapType = "";
        track.scrollTo({
          left: target,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      } else {
        track.style.scrollSnapType = "";
      }
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    []
  );

  const handleTrackPointerLeave = useCallback(() => {
    if (dragRef.current && !dragRef.current.active) {
      dragRef.current = null;
      if (trackRef.current) {
        trackRef.current.style.scrollBehavior = "";
        trackRef.current.style.scrollSnapType = "";
      }
    }
  }, []);

  return {
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
  };
}
