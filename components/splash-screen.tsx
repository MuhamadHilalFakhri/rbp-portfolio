"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { LoaderOne } from "@/components/ui/loader";

const EASE = [0.22, 1, 0.36, 1] as const;
const SPLASH_HOLD = 2600;

function markSplashDone(): void {
  try {
    window.sessionStorage.setItem("splash-shown", "1");
  } catch {}
  document.documentElement.dataset.splash = "done";
}

export function SplashScreen(): ReactNode {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const hide = window.setTimeout(() => setActive(false), SPLASH_HOLD);
    return () => window.clearTimeout(hide);
  }, []);

  return (
    <div className="splash-gate">
      <AnimatePresence onExitComplete={markSplashDone}>
        {active && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-background fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8"
          >
            <LoaderOne />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              className="text-foreground/50 text-sm font-medium tracking-tight"
            >
              Muhamad Hilal Fakhri
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
