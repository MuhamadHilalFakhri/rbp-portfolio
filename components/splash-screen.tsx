"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import DynamicText from "@/components/kokonutui/dynamic-text";
import { LoaderOne } from "@/components/ui/loader";

const EASE = [0.22, 1, 0.36, 1] as const;
const LOADER_HOLD = 1600;

type SplashStage = "loader" | "greeting" | "done";

function markSplashDone(): void {
  try {
    window.sessionStorage.setItem("splash-shown", "1");
  } catch {}
  document.documentElement.dataset.splash = "done";
}

export function SplashScreen(): ReactNode {
  const [stage, setStage] = useState<SplashStage>("loader");

  useEffect(() => {
    if (stage !== "loader") return;

    const nextStage = window.setTimeout(
      () => setStage("greeting"),
      LOADER_HOLD
    );
    return () => window.clearTimeout(nextStage);
  }, [stage]);

  return (
    <div className="splash-gate">
      <AnimatePresence onExitComplete={markSplashDone}>
        {stage !== "done" && (
          <motion.div
            key="splash-shell"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-background fixed inset-0 z-[999] flex items-center justify-center px-4"
          >
            <AnimatePresence mode="wait">
              {stage === "loader" ? (
                <motion.div
                  key="loader"
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex flex-col items-center justify-center gap-8"
                >
                  <LoaderOne />
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.55, ease: EASE }}
                    className="text-foreground/50 text-sm font-medium tracking-tight"
                  >
                    Muhamad Hilal Fakhri
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="greeting"
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="w-full max-w-sm"
                >
                  <DynamicText onComplete={() => setStage("done")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
