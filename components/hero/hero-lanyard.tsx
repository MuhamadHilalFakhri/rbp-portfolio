"use client";

import dynamic from "next/dynamic";
import type { RefObject } from "react";

const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-full w-full" />,
});

interface HeroLanyardProps {
  eventSource: RefObject<HTMLElement | null>;
}

export function HeroLanyard({ eventSource }: HeroLanyardProps) {
  return (
    <div
      aria-label="Interactive lanyard card"
      className="pointer-events-auto absolute inset-0 z-10 overflow-visible"
    >
      <Lanyard
        eventSource={eventSource}
        horizontalOffset={3.15}
        position={[0, 0, 24]}
        gravity={[0, -36, 0]}
        lanyardWidth={1.1}
      />
    </div>
  );
}
