import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function pauseSmoothScroll(): void {
  lenisInstance?.stop();
}

export function resumeSmoothScroll(): void {
  lenisInstance?.start();
}
