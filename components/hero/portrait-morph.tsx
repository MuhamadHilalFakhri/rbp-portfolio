"use client";

import { VERTEX_SHADER, FRAGMENT_SHADER } from "./portrait-morph-shaders";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Renderer, Program, Mesh, Triangle, Transform, Texture } from "ogl";

export type PortraitMorphProps = {
  srcA: string;
  srcB: string;
  alt: string;
  className?: string;
};

export function PortraitMorph({
  srcA,
  srcB,
  alt,
  className,
}: PortraitMorphProps): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const hoverRef = useRef(false);
  const progressRef = useRef(0);
  const originRef = useRef<[number, number]>([0.5, 0.5]);
  const directionRef = useRef<[number, number]>([1, 0]);
  const lastPointerRef = useRef<{ x: number; y: number; t: number } | null>(
    null
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const scene = new Transform();

    const texA = new Texture(gl, { generateMipmaps: false });
    const texB = new Texture(gl, { generateMipmaps: false });

    const imageSize: [number, number] = [1, 1];

    const loadImage = (src: string, target: Texture): Promise<void> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          target.image = img;
          imageSize[0] = img.naturalWidth;
          imageSize[1] = img.naturalHeight;
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTexA: { value: texA },
        uTexB: { value: texB },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: [1, 1] as [number, number] },
        uImageSize: { value: imageSize },
        uOrigin: { value: [0.5, 0.5] as [number, number] },
        uDirection: { value: [1, 0] as [number, number] },
      },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      program.uniforms.uResolution.value = [w * renderer.dpr, h * renderer.dpr];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let raf = 0;
    let last = performance.now();
    let time = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;

      const target = hoverRef.current ? 1 : 0;
      const stiffness = hoverRef.current ? 2.4 : 2.0;
      const k = 1 - Math.exp(-stiffness * dt);
      progressRef.current += (target - progressRef.current) * k;

      program.uniforms.uTime.value = time;
      program.uniforms.uProgress.value = progressRef.current;
      program.uniforms.uOrigin.value = originRef.current;
      program.uniforms.uDirection.value = directionRef.current;
      program.uniforms.uImageSize.value = imageSize;

      renderer.render({ scene });
      raf = requestAnimationFrame(tick);
    };

    Promise.all([loadImage(srcA, texA), loadImage(srcB, texB)])
      .then(() => {
        setReady(true);
        last = performance.now();
        tick();
      })
      .catch(() => {
        setReady(false);
      });

    const computeEdgeDirection = (x: number, y: number): [number, number] => {
      const dxLeft = x;
      const dxRight = 1 - x;
      const dyBottom = y;
      const dyTop = 1 - y;
      const minDist = Math.min(dxLeft, dxRight, dyBottom, dyTop);
      if (minDist === dxLeft) return [1, 0];
      if (minDist === dxRight) return [-1, 0];
      if (minDist === dyBottom) return [0, 1];
      return [0, -1];
    };

    const onPointerEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      originRef.current = [x, y];
      directionRef.current = computeEdgeDirection(x, y);
      lastPointerRef.current = { x, y, t: performance.now() };
      hoverRef.current = true;
    };
    const onPointerLeave = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      originRef.current = [x, y];
      directionRef.current = computeEdgeDirection(x, y).map((v) => -v) as [
        number,
        number,
      ];
      hoverRef.current = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const last = lastPointerRef.current;
      if (
        last &&
        performance.now() - last.t < 80 &&
        progressRef.current < 0.15
      ) {
        const vx = x - last.x;
        const vy = y - last.y;
        const mag = Math.hypot(vx, vy);
        if (mag > 0.01) {
          directionRef.current = [vx / mag, vy / mag];
        }
      }
      lastPointerRef.current = { x, y, t: performance.now() };
    };

    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointermove", onPointerMove);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointermove", onPointerMove);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [srcA, srcB]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        filter: "grayscale(100%)",
      }}
    >
      {!ready ? (
        <NextImage
          src={srcA}
          alt={alt}
          fill
          unoptimized
          sizes="100vw"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none"
        />
      ) : null}
    </div>
  );
}
