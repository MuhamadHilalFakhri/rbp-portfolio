"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export function useProjectCarousel(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
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
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
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
  }, [updateArrows, itemCount]);

  const scrollProjects = (direction: 1 | -1): void => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const gap =
      Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const distance = card ? card.offsetWidth + gap : track.clientWidth;
    track.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

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
      event.currentTarget.style.scrollBehavior = "";
      event.currentTarget.style.scrollSnapType = "";
      if (drag.active) {
        setIsDragging(false);

        const track = event.currentTarget;
        const cards = Array.from(
          track.querySelectorAll<HTMLElement>("[data-card]")
        );
        const trackLeft = track.getBoundingClientRect().left;
        const firstCardLeft = cards[0]?.getBoundingClientRect().left;
        if (cards.length > 0 && firstCardLeft !== undefined) {
          const firstCardPosition =
            track.scrollLeft + firstCardLeft - trackLeft;
          const maxScrollLeft = track.scrollWidth - track.clientWidth;
          const projectedPosition = Math.max(
            0,
            Math.min(maxScrollLeft, track.scrollLeft + drag.velocity * 260)
          );
          let target = 0;
          let distance = Number.POSITIVE_INFINITY;

          for (const card of cards) {
            const cardLeft =
              track.scrollLeft + card.getBoundingClientRect().left - trackLeft;
            const position = Math.max(0, cardLeft - firstCardPosition);
            const nextDistance = Math.abs(position - projectedPosition);
            if (nextDistance < distance) {
              target = position;
              distance = nextDistance;
            }
          }

          track.scrollTo({ left: target, behavior: "smooth" });
        }
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
    scrollProjects,
    handleTrackPointerDown,
    handleTrackPointerMove,
    handleTrackPointerEnd,
    handleTrackPointerLeave,
  };
}
