import type { Body as MatterBody } from "matter-js";

export type Chip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
};

export const CHIPS: Chip[] = [
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

export const CHIP_RADIUS = 14;
export const ICON_RADIUS = 10;
export const WALL_PAD = 16;

export type ChipState = {
  chip: Chip;
  body: MatterBody;
  width: number;
  height: number;
};
