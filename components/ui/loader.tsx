"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function LoaderOne(): ReactNode {
  const transition = (index: number) => ({
    duration: 1,
    repeat: Infinity,
    repeatType: "loop" as const,
    delay: index * 0.2,
    ease: "easeInOut" as const,
  });

  return (
    <div className="flex items-center gap-2" role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(index)}
          className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
        />
      ))}
    </div>
  );
}

export function LoaderThree({ className }: { className?: string }): ReactNode {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.4,
          duration: 1,
          ease: "easeInOut" as const,
          repeat: Infinity,
          repeatDelay: 0.6,
        },
        opacity: { delay: i * 0.4, duration: 0.01 },
      },
    }),
  };

  return (
    <div
      className={cn(
        "text-foreground flex items-center justify-center",
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.circle
          cx="24"
          cy="24"
          r="18"
          custom={0}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M16 24 L22 30 L32 19"
          custom={1}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </div>
  );
}
