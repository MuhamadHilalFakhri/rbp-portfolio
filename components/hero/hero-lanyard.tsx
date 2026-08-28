"use client";

import dynamic from "next/dynamic";
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

  return (
    <div
      aria-label="Interactive lanyard card"
      className="pointer-events-none absolute inset-0 z-10 translate-y-7 overflow-visible"
    >
      <Lanyard
        position={isDesktop ? [0, 0, 24] : [0, 0, 22]}
        horizontalOffset={3.15}
        gravity={isDesktop ? [0, -36, 0] : [0, -30, 0]}
        lanyardWidth={isDesktop ? 1.1 : 0.9}
      />
    </div>
  );
}
