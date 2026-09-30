"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, events as createPointerEvents } from "@react-three/fiber";
import * as THREE from "three";
import { Band } from "./lanyard/band";
import type { LanyardProps } from "./lanyard/lanyard-types";

export default function Lanyard({
  active = true,
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  lanyardWidth = 1,
  horizontalOffset = 0,
  eventSource,
  className = "",
}: LanyardProps) {
  const interactionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const interactionSource = eventSource ?? interactionRef;

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`pointer-events-none relative z-0 flex h-full w-full items-center justify-center select-none ${className}`}
    >
      <Canvas
        camera={{ position, fov }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        eventSource={interactionSource as RefObject<HTMLElement>}
        events={(store) => {
          const eventManager = createPointerEvents(store);

          return {
            ...eventManager,
            compute: (event, state) => {
              const bounds = state.gl.domElement.getBoundingClientRect();
              const x = event.clientX - bounds.left;
              const y = event.clientY - bounds.top;

              state.pointer.set(
                (x / bounds.width) * 2 - 1,
                -(y / bounds.height) * 2 + 1
              );
              state.raycaster.setFromCamera(state.pointer, state.camera);
            },
          };
        }}
        gl={{
          alpha: transparent,
          antialias: !isMobile,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: isMobile ? "pan-y" : "none" }}
        fallback={<div className="h-full w-full bg-transparent" />}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        }}
      >
        <ambientLight intensity={2.4} />
        <directionalLight intensity={4} position={[4, 6, 8]} />
        <directionalLight intensity={2} position={[-4, 2, 5]} />
        <pointLight intensity={8} position={[0, -4, 6]} />
        <Band
          active={active}
          gravityY={gravity[1]}
          horizontalOffset={isMobile ? 0 : horizontalOffset}
          isMobile={isMobile}
          lanyardWidth={lanyardWidth}
        />
      </Canvas>
      <div
        ref={interactionRef}
        aria-hidden="true"
        data-lanyard-drag-area
        className={`absolute top-[27%] left-[5%] z-10 h-[52%] w-[90%] cursor-grab select-none md:top-[28%] md:right-[3%] md:left-auto md:h-[48%] md:w-[36%] ${
          eventSource || !active ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{ touchAction: isMobile ? "pan-y" : "none" }}
      />
    </div>
  );
}
