import type { RefObject } from "react";

export interface LanyardProps {
  active?: boolean;
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  lanyardWidth?: number;
  horizontalOffset?: number;
  eventSource?: RefObject<HTMLElement | null>;
  className?: string;
}

export interface BandProps {
  active?: boolean;
  gravityY: number;
  isMobile?: boolean;
  lanyardWidth?: number;
  horizontalOffset?: number;
}
