"use client";

import { useRef, type PointerEvent } from "react";

export function useMediaSwipe({
  enabled,
  onPrevious,
  onNext,
}: {
  enabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    horizontal: boolean;
  } | null>(null);

  const clear = () => {
    gesture.current = null;
  };

  return {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      if (!enabled || !event.isPrimary || event.button !== 0) return;
      if (
        event.target instanceof Element &&
        event.target.closest("button, a, video")
      )
        return;
      gesture.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        horizontal: false,
      };
    },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (!start.horizontal) {
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
          clear();
          return;
        }
        if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
        start.horizontal = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      const start = gesture.current;
      clear();
      if (!start || start.id !== event.pointerId) return;
      if (start.horizontal && Math.abs(event.clientX - start.x) >= 40) {
        if (event.clientX < start.x) onNext();
        else onPrevious();
      }
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
    },
    onPointerCancel: clear,
    onLostPointerCapture: clear,
    onPointerLeave() {
      if (!gesture.current?.horizontal) clear();
    },
    onDragStartCapture(event: React.DragEvent<HTMLElement>) {
      event.preventDefault();
    },
  };
}
