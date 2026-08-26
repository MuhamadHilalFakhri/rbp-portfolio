"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Chip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

const CHIPS: Chip[] = [
  { label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
  { label: "Next.js", slug: "nextdotjs", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
  { label: "shadcn/ui", slug: "shadcnui", bg: "#5b54ff", fg: "#ffffff" },
  { label: "GSAP", slug: "gsap", bg: "#0AE448", fg: "#0a0a0a" },
  { label: "GitHub", slug: "github", bg: "#181717", fg: "#ffffff" },
  { label: "Vercel", slug: "vercel", bg: "#0a0a0a", fg: "#ffffff" },
  { label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
  { label: "Golang", slug: "go", bg: "#00ADD8", fg: "#ffffff" },
  { label: "PHP", slug: "php", bg: "#777BB4", fg: "#ffffff" },
  { label: "Laravel", slug: "laravel", bg: "#FF2D20", fg: "#ffffff" },
  { label: "Laragon", slug: "laragon", bg: "#0E83CD", fg: "#ffffff" },
];

const CHIP_RADIUS = 14;
const ICON_RADIUS = 10;
const WALL_PAD = 16;

type ChipState = {
  chip: Chip;
  body: Matter.Body;
  width: number;
  height: number;
};

export function Stack(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [resetKey, setResetKey] = useState(0);

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

        const {
          Engine,
          Runner,
          World,
          Bodies,
          Body,
          Mouse,
          MouseConstraint,
          Events,
        } = Matter;

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

        const mouse = Mouse.create(container);

        const mouseElement = mouse.element;
        const internalMouse = mouse as typeof mouse & {
          mousewheel: ((event: Event) => void) | null;
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
        World.add(world, mouseConstraint);

        const isMobile =
          typeof window !== "undefined" &&
          window.matchMedia("(hover: none), (pointer: coarse)").matches;

        if (isMobile) {
          const internalMouse = mouse as typeof mouse & {
            mousemove: EventListener;
            mousedown: EventListener;
            mouseup: EventListener;
          };

          mouseElement.removeEventListener(
            "touchmove",
            internalMouse.mousemove
          );
          mouseElement.removeEventListener(
            "touchstart",
            internalMouse.mousedown
          );
          mouseElement.removeEventListener("touchend", internalMouse.mouseup);

          let draggedBody: Matter.Body | null = null;
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

          container.addEventListener("touchstart", handleTouchStart, {
            passive: true,
          });
          container.addEventListener("touchmove", handleTouchMove, {
            passive: true,
          });
          container.addEventListener("touchend", handleTouchEnd, {
            passive: true,
          });
          container.addEventListener("touchcancel", handleTouchEnd, {
            passive: true,
          });
        }

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
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-3" data-scroll-reveal-item>
      <div className="flex items-center gap-3">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
          Stack
        </h3>
      </div>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative h-80 overflow-hidden rounded-3xl border sm:h-72 sm:rounded-4xl">
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          aria-label="Reset stack"
          className="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
        >
          <RotateCcw
            className="h-4 w-4"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        </button>

        <div
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute top-0 left-0 flex flex-wrap gap-2"
        >
          {CHIPS.map((chip) => (
            <ChipPill key={`m-${chip.label}`} chip={chip} />
          ))}
        </div>

        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab select-none"
          style={{ touchAction: "pan-y" }}
        >
          {CHIPS.map((chip, i) => (
            <div
              key={`${resetKey}-${chip.label}`}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              data-stack-chip
              className="pointer-events-none absolute top-0 left-0 will-change-transform"
              style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
            >
              <ChipPill chip={chip} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipPill({ chip }: { chip: Chip }): ReactNode {
  return (
    <div
      className="inline-flex items-center gap-1.5 p-1 pr-2 text-[13px] font-medium tracking-tight sm:gap-2 sm:text-[16px] dark:ring-1 dark:ring-white/15"
      style={{
        backgroundColor: chip.bg,
        color: chip.fg,
        borderRadius: `${CHIP_RADIUS}px`,
      }}
    >
      <span
        className="inline-flex h-7 w-7 items-center justify-center bg-white/95 sm:h-8 sm:w-8"
        style={{ borderRadius: `${ICON_RADIUS}px` }}
        aria-hidden="true"
      >
        <img
          src={`/icons/${chip.slug}.svg`}
          alt=""
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          className="h-4 w-4 sm:h-5 sm:w-5"
          draggable={false}
        />
      </span>
      <span>{chip.label}</span>
    </div>
  );
}
