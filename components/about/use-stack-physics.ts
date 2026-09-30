"use client";

import { useEffect, type RefObject } from "react";
import { CHIPS, CHIP_RADIUS, WALL_PAD, type ChipState } from "./stack-data";
import { setupStackInteraction } from "./stack-interaction";

export function useStackPhysics(
  containerRef: RefObject<HTMLDivElement | null>,
  measureRef: RefObject<HTMLDivElement | null>,
  chipRefs: RefObject<Array<HTMLDivElement | null>>,
  resetKey: number
) {
  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    let cancelled = false;
    let started = false;
    let cleanup: (() => void) | undefined;

    const startPhysics = (): void => {
      if (started) return;
      started = true;

      void (async () => {
        const Matter = await import("matter-js");
        if (cancelled) return;

        const { Engine, Runner, World, Bodies, Body, Events } = Matter;

        const measureChildren = Array.from(measure.children) as HTMLElement[];
        const dims = measureChildren.map((el) => {
          const r = el.getBoundingClientRect();
          return { w: Math.max(80, r.width), h: Math.max(28, r.height) };
        });

        let width = container.clientWidth;
        let height = container.clientHeight;

        const engine = Engine.create();
        engine.gravity.y = 1;
        const world = engine.world;

        const wallThickness = 400;
        const floor = Bodies.rectangle(
          width / 2,
          height - WALL_PAD + wallThickness / 2,
          width * 3,
          wallThickness,
          { isStatic: true }
        );
        const leftWall = Bodies.rectangle(
          WALL_PAD - wallThickness / 2,
          height / 2,
          wallThickness,
          height * 4,
          { isStatic: true }
        );
        const rightWall = Bodies.rectangle(
          width - WALL_PAD + wallThickness / 2,
          height / 2,
          wallThickness,
          height * 4,
          { isStatic: true }
        );
        World.add(world, [floor, leftWall, rightWall]);

        const states: ChipState[] = CHIPS.map((chip, i) => {
          const dim = dims[i] ?? { w: 120, h: 36 };
          const { w, h } = dim;
          const halfW = w / 2;
          const minX = WALL_PAD + halfW + 4;
          const maxX = width - WALL_PAD - halfW - 4;
          const x = minX + Math.random() * Math.max(1, maxX - minX);
          const y = -80 - i * 60 - Math.random() * 120;
          const body = Bodies.rectangle(x, y, w, h, {
            chamfer: { radius: CHIP_RADIUS },
            restitution: 0.35,
            friction: 0.5,
            frictionAir: 0.025,
            density: 0.0018,
            angle: (Math.random() - 0.5) * 0.4,
          });
          World.add(world, body);
          return { chip, body, width: w, height: h };
        });

        const { mouseConstraint, cleanup: cleanupInteraction } =
          setupStackInteraction(Matter, container, states, engine);
        World.add(world, mouseConstraint);

        Events.on(mouseConstraint, "startdrag", () => {
          container.style.cursor = "grabbing";
        });

        Events.on(mouseConstraint, "enddrag", () => {
          container.style.cursor = "grab";
        });

        const runner = Runner.create();
        Runner.run(runner, engine);

        let raf = 0;
        const tick = (): void => {
          for (let i = 0; i < states.length; i++) {
            const s = states[i];
            const el = chipRefs.current[i];
            if (!s || !el) continue;
            const { x, y } = s.body.position;
            el.style.transform = `translate3d(${x - s.width / 2}px, ${y - s.height / 2}px, 0) rotate(${s.body.angle}rad)`;
          }
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const onResize = (): void => {
          const newW = container.clientWidth;
          const newH = container.clientHeight;
          if (newW === width && newH === height) return;
          Body.setPosition(floor, {
            x: newW / 2,
            y: newH - WALL_PAD + wallThickness / 2,
          });
          Body.setPosition(leftWall, {
            x: WALL_PAD - wallThickness / 2,
            y: newH / 2,
          });
          Body.setPosition(rightWall, {
            x: newW - WALL_PAD + wallThickness / 2,
            y: newH / 2,
          });
          width = newW;
          height = newH;
        };
        const ro = new ResizeObserver(onResize);
        ro.observe(container);

        cleanup = () => {
          cleanupInteraction();
          cancelAnimationFrame(raf);
          ro.disconnect();
          Runner.stop(runner);
          World.clear(world, false);
          Engine.clear(engine);
        };
      })();
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        startPhysics();
        visibilityObserver.disconnect();
      },
      { rootMargin: "200px" }
    );
    visibilityObserver.observe(container);

    return () => {
      cancelled = true;
      visibilityObserver.disconnect();
      cleanup?.();
    };
  }, [resetKey, containerRef, measureRef, chipRefs]);
}
