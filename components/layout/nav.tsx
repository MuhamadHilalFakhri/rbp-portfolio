"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function NavThemeToggle(): ReactNode {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const next = isDark ? "light" : "dark";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function";

    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-cx", `${cx}px`);
    root.style.setProperty("--theme-cy", `${cy}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeAnim = "1";

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      aria-pressed={mounted ? isDark : undefined}
      className="focus-ring relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_3px_10px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:bg-white/65 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_5px_14px_rgba(15,23,42,0.12)] sm:h-8 sm:w-8 dark:border-white/12 dark:bg-white/8 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_10px_rgba(0,0,0,0.24)] dark:hover:bg-white/14"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <Sun
          className={`text-foreground absolute inset-0 h-4 w-4 transition-all duration-300 ${
            mounted && isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }`}
        />
        <Moon
          className={`text-foreground absolute inset-0 h-4 w-4 transition-all duration-300 ${
            mounted && !isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

export function Nav(): ReactNode {
  const pathname = usePathname();

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  return (
    <nav
      aria-label="Primary"
      className="fixed top-3 left-1/2 z-50 w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 sm:top-6"
    >
      <div className="relative isolate flex w-full items-center gap-1 overflow-hidden rounded-full border border-white/70 bg-white/45 p-1 shadow-[0_10px_35px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl backdrop-saturate-200 transition-all duration-500 before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent after:pointer-events-none after:absolute after:-top-8 after:-left-8 after:h-20 after:w-36 after:rounded-full after:bg-white/25 after:blur-2xl hover:bg-white/55 hover:shadow-[0_14px_42px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.32)] sm:p-1.5 dark:border-white/14 dark:bg-neutral-950/45 dark:shadow-[0_12px_40px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(255,255,255,0.04)] dark:before:via-white/35 dark:after:bg-white/8 dark:hover:bg-neutral-950/55">
        <ul className="relative z-10 flex items-center gap-1">
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={item.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full border border-white/80 bg-gradient-to-b from-white/80 to-white/35 shadow-[0_5px_16px_rgba(15,23,42,0.11),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.3)] backdrop-blur-md dark:border-white/15 dark:from-white/16 dark:to-white/5 dark:shadow-[0_5px_18px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.18)]"
                  />
                )}
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="focus-ring group relative inline-flex cursor-pointer items-center justify-center rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-300 min-[360px]:px-3 sm:px-4 sm:py-1.5 sm:text-sm"
                >
                  <span
                    className={
                      isActive
                        ? "text-foreground relative z-10"
                        : "text-foreground/60 group-hover:text-foreground relative z-10 transition-colors"
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <NavThemeToggle />
      </div>
    </nav>
  );
}
