"use client";

import { useEffect, useRef } from "react";

export function BackgroundLines() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      layer.style.setProperty("--line-x", `${x}px`);
      layer.style.setProperty("--line-y", `${y}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType !== "mouse") return;
      x = (event.clientX / window.innerWidth - 0.5) * 32;
      y = (event.clientY / window.innerHeight - 0.5) * 24;
      schedule();
    };
    const reset = () => {
      x = 0;
      y = 0;
      schedule();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    reducedMotion.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      reducedMotion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div ref={layerRef} className="background-lines" aria-hidden="true">
      <svg
        className="background-lines__drawing"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <g className="background-lines__slow">
          <path d="M-100 740 C180 800 340 140 690 290 C980 415 730 740 500 565 C250 375 1090 180 1540 310" />
          <path d="M-100 775 C210 835 365 170 700 325 C955 440 735 705 530 570 C320 425 1100 215 1540 345" />
        </g>
        <g className="background-lines__fast">
          <path d="M220 -100 C140 210 980 230 1010 545 C1040 835 580 765 790 580 C980 410 1330 720 1540 860" />
          <path d="M255 -100 C175 185 1015 250 1045 545 C1070 870 580 810 805 615 C1010 455 1350 755 1540 895" />
        </g>
      </svg>
    </div>
  );
}
