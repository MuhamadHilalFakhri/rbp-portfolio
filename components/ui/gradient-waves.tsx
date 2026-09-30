"use client";

import { VERTEX_SHADER, FRAGMENT_SHADER } from "./gradient-waves-shaders";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef, type ReactNode } from "react";

export type GradientWavesDetail = "low" | "medium" | "high";

export interface GradientWavesProps {
  horizonColor?: string;
  waveColor?: string;
  crestColor?: string;
  speed?: number;
  amplitude?: number;
  waveScale?: number;
  waveRatio?: number;
  swell?: number;
  turbulence?: number;
  tilt?: number;
  zoom?: number;
  height?: number;
  fogDepth?: number;
  detail?: GradientWavesDetail;
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  parallaxStrength?: number;
  grain?: boolean;
  grainIntensity?: number;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];

  return [
    Number.parseInt(result[1]!, 16) / 255,
    Number.parseInt(result[2]!, 16) / 255,
    Number.parseInt(result[3]!, 16) / 255,
  ];
}

function detailToSteps(detail: GradientWavesDetail): number {
  if (detail === "low") return 40;
  if (detail === "high") return 110;
  return 70;
}

export default function GradientWaves({
  horizonColor = "#5227FF",
  waveColor = "#FF9FFC",
  crestColor = "#FFFFFF",
  speed = 0.4,
  amplitude = 2.5,
  waveScale = 0.6,
  waveRatio = 0.9,
  swell = 35,
  turbulence = 20,
  tilt = 1.11,
  zoom = 1,
  height = 5.5,
  fogDepth = 15,
  detail = "medium",
  brightness = 1,
  opacity = 1,
  mouseInteraction = true,
  parallaxStrength = 0.5,
  grain = true,
  grainIntensity = 0.05,
  className = "",
}: GradientWavesProps): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: 1,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaveScale: { value: waveScale },
        uWaveRatio: { value: waveRatio },
        uSwell: { value: swell },
        uTurbulence: { value: turbulence },
        uTilt: { value: tilt },
        uZoom: { value: zoom },
        uHeight: { value: height },
        uFogDepth: { value: fogDepth },
        uSteps: { value: detailToSteps(detail) },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity },
        uGrain: { value: grain ? 1 : 0 },
        uGrainIntensity: { value: grainIntensity },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uParallax: { value: parallaxStrength },
        uEnableMouse: { value: mouseInteraction },
        uHorizonColor: { value: new Float32Array(hexToRgb(horizonColor)) },
        uWaveColor: { value: new Float32Array(hexToRgb(waveColor)) },
        uCrestColor: { value: new Float32Array(hexToRgb(crestColor)) },
      },
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });

    const setSize = (): void => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(
        Math.max(1, Math.floor(rect.width)),
        Math.max(1, Math.floor(rect.height))
      );
      program.uniforms.iResolution.value = new Float32Array([
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ]);
      renderer.render({ scene: mesh });
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    const currentMouse: [number, number] = [0.5, 0.5];
    const targetMouse: [number, number] = [0.5, 0.5];

    const onPointerMove = (event: PointerEvent): void => {
      if (!mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetMouse[0] = (event.clientX - rect.left) / rect.width;
      targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height;
    };
    const onPointerLeave = (): void => {
      targetMouse[0] = 0.5;
      targetMouse[1] = 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    let animationFrame = 0;
    let isOnScreen = true;
    let isPageVisible = !document.hidden;
    const startTime = performance.now();

    const loop = (time: number): void => {
      program.uniforms.iTime.value = (time - startTime) * 0.001;
      const targetX = mouseInteraction ? targetMouse[0] : 0.5;
      const targetY = mouseInteraction ? targetMouse[1] : 0.5;
      currentMouse[0] += 0.05 * (targetX - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetY - currentMouse[1]);
      program.uniforms.uMouse.value[0] = currentMouse[0];
      program.uniforms.uMouse.value[1] = currentMouse[1];
      renderer.render({ scene: mesh });
      animationFrame = requestAnimationFrame(loop);
    };

    const start = (): void => {
      if (isOnScreen && isPageVisible && animationFrame === 0) {
        animationFrame = requestAnimationFrame(loop);
      }
    };
    const stop = (): void => {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      isOnScreen = entry.isIntersecting;
      if (isOnScreen) start();
      else stop();
    });
    intersectionObserver.observe(container);

    const onVisibilityChange = (): void => {
      isPageVisible = !document.hidden;
      if (isPageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      if (canvas.parentElement === container) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    mouseInteraction,
    parallaxStrength,
    grain,
    grainIntensity,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
}
