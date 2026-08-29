"use client";

import { Check, Copy, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

const EMAIL = "muhamadhilal04@gmail.com";

export function ContactButton(): ReactNode {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      } catch {}
      document.body.removeChild(textarea);
    }
  };

  const handleClick = (): void => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (canHover || open) {
      void handleCopy();
      return;
    }

    setOpen(true);
  };

  const contentKey = copied ? "copied" : open ? "email" : "contact";

  return (
    <motion.button
      layout
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-label={
        copied ? "Email copied" : open ? `Copy ${EMAIL}` : "Show email"
      }
      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.015 }}
      whileTap={shouldReduceMotion ? {} : { y: 1, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.6 }}
      className={`focus-ring group relative inline-flex h-11 max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border px-4 text-sm font-medium shadow-sm transition-[color,background-color,border-color,box-shadow] duration-300 sm:px-5 ${
        copied
          ? "border-emerald-500 bg-emerald-500 text-white shadow-emerald-500/20"
          : "bg-foreground text-background border-foreground/10 hover:shadow-foreground/15 hover:shadow-lg"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/35 opacity-0 transition-[left,opacity] duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
      />

      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={contentKey}
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 6, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: -6, scale: 0.96 }
          }
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-flex items-center gap-2 whitespace-nowrap"
        >
          {copied ? (
            <Check
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          ) : open ? (
            <Copy
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
              aria-hidden="true"
            />
          ) : (
            <Mail
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
              aria-hidden="true"
            />
          )}

          {copied ? (
            <span>Copied!</span>
          ) : open ? (
            <>
              <span className="sm:hidden">Copy email</span>
              <span className="hidden tabular-nums sm:inline">{EMAIL}</span>
            </>
          ) : (
            <span>Contact</span>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
