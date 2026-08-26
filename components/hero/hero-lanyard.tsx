"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore, type ReactNode } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-full w-full" />,
});

function subscribeToDesktop(onChange: () => void): () => void {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getDesktopSnapshot(): boolean {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

export function HeroLanyard(): ReactNode {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    () => false
  );

  if (!isDesktop) return <StaticLanyard />;

  return (
    <div
      aria-label="Interactive lanyard card"
      className="pointer-events-auto absolute inset-0 z-10 overflow-visible"
    >
      <Lanyard
        horizontalOffset={3.15}
        position={[0, 0, 24]}
        gravity={[0, -36, 0]}
        lanyardWidth={1.1}
      />
    </div>
  );
}

function StaticLanyard(): ReactNode {
  return (
    <div
      aria-label="Lanyard portrait card"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden md:hidden"
    >
      <div className="absolute top-0 left-1/2 h-[25rem] w-1 -translate-x-1/2 bg-neutral-950 shadow-sm" />
      <div className="absolute top-[23.5rem] left-1/2 aspect-2/3 w-[min(54vw,14rem)] -translate-x-1/2 overflow-hidden rounded-[1.15rem] shadow-[0_18px_48px_rgba(4,12,24,0.32)]">
        <Image
          src="/hilal-navy.webp"
          alt="Muhamad Hilal Fakhri"
          width={768}
          height={1152}
          preload
          fetchPriority="high"
          decoding="sync"
          unoptimized
          draggable={false}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-0 left-1/2 h-10 w-4 -translate-x-1/2 rounded-b-lg bg-neutral-950 shadow-sm" />
      </div>
    </div>
  );
}
