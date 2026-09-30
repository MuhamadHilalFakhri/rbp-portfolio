import type { Body as MatterBody, Engine as MatterEngine } from "matter-js";
import type { ChipState } from "./stack-data";

export function setupStackInteraction(
  Matter: typeof import("matter-js"),
  container: HTMLElement,
  states: ChipState[],
  engine: MatterEngine
) {
  const { Mouse, MouseConstraint, Body } = Matter;
  const mouse = Mouse.create(container);

  const mouseElement = mouse.element;
  const internalMouse = mouse as typeof mouse & {
    mousewheel: ((event: Event) => void) | null;
    mousemove: EventListener;
    mousedown: EventListener;
    mouseup: EventListener;
  };

  if (internalMouse.mousewheel) {
    const wheelHandler = internalMouse.mousewheel;
    mouseElement.removeEventListener("wheel", wheelHandler);
    mouseElement.removeEventListener("DOMMouseScroll", wheelHandler);
    internalMouse.mousewheel = null;
  }

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      damping: 0.2,
      render: { visible: false },
    },
  });

  let releaseTouchDrag: (() => void) | undefined;
  let cleanupTouchListeners: (() => void) | undefined;
  const releaseDrag = (): void => {
    // Matter detaches the mouse constraint on the next physics update.
    mouse.button = -1;
    releaseTouchDrag?.();
    container.style.cursor = "grab";
  };
  const handleMouseMove = (event: MouseEvent): void => {
    if ((event.buttons & 1) === 0) releaseDrag();
  };
  const handleVisibilityChange = (): void => {
    if (document.hidden) releaseDrag();
  };
  window.addEventListener("mouseup", releaseDrag, true);
  window.addEventListener("pointercancel", releaseDrag, true);
  window.addEventListener("blur", releaseDrag);
  window.addEventListener("mousemove", handleMouseMove, true);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (isMobile) {
    mouseElement.removeEventListener("touchmove", internalMouse.mousemove);
    mouseElement.removeEventListener("touchstart", internalMouse.mousedown);
    mouseElement.removeEventListener("touchend", internalMouse.mouseup);

    let draggedBody: MatterBody | null = null;
    const dragOffset = { x: 0, y: 0 };
    let gestureIsVertical = false;
    let gestureDecided = false;
    const touchStart = { x: 0, y: 0 };

    const handleTouchStart = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (!touch) return;

      touchStart.x = touch.clientX;
      touchStart.y = touch.clientY;
      gestureDecided = false;
      gestureIsVertical = false;

      const rect = container.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const bodies = states.map((s) => s.body);
      for (const body of bodies) {
        const bounds = body.bounds;

        if (
          x >= bounds.min.x &&
          x <= bounds.max.x &&
          y >= bounds.min.y &&
          y <= bounds.max.y
        ) {
          draggedBody = body;
          dragOffset.x = body.position.x - x;
          dragOffset.y = body.position.y - y;
          Body.setStatic(body, true);
          break;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (!touch) return;

      if (!draggedBody) return;

      if (!gestureDecided) {
        const dx = Math.abs(touch.clientX - touchStart.x);
        const dy = Math.abs(touch.clientY - touchStart.y);

        if (dx > 8 || dy > 8) {
          gestureDecided = true;
          gestureIsVertical = dy > dx * 1.2;
        }
      }

      if (gestureIsVertical) {
        if (draggedBody) {
          Body.setStatic(draggedBody, false);
          draggedBody = null;
        }
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = touch.clientX - rect.left + dragOffset.x;
      const y = touch.clientY - rect.top + dragOffset.y;

      Body.setPosition(draggedBody, { x, y });
      Body.setVelocity(draggedBody, { x: 0, y: 0 });
      Body.setAngularVelocity(draggedBody, 0);
    };

    const handleTouchEnd = (): void => {
      if (draggedBody) {
        Body.setStatic(draggedBody, false);
        draggedBody = null;
      }
      gestureDecided = false;
      gestureIsVertical = false;
    };
    releaseTouchDrag = handleTouchEnd;

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    window.addEventListener("touchend", releaseDrag, true);
    window.addEventListener("touchcancel", releaseDrag, true);
    cleanupTouchListeners = () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", releaseDrag, true);
      window.removeEventListener("touchcancel", releaseDrag, true);
    };
  }

  return {
    mouseConstraint,
    cleanup: () => {
      releaseDrag();
      cleanupTouchListeners?.();
      window.removeEventListener("mouseup", releaseDrag, true);
      window.removeEventListener("pointercancel", releaseDrag, true);
      window.removeEventListener("blur", releaseDrag);
      window.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mouseElement.removeEventListener("mousemove", internalMouse.mousemove);
      mouseElement.removeEventListener("mousedown", internalMouse.mousedown);
      mouseElement.removeEventListener("mouseup", internalMouse.mouseup);
      mouseElement.removeEventListener("touchmove", internalMouse.mousemove);
      mouseElement.removeEventListener("touchstart", internalMouse.mousedown);
      mouseElement.removeEventListener("touchend", internalMouse.mouseup);
      Mouse.clearSourceEvents(mouse);
    },
  };
}
