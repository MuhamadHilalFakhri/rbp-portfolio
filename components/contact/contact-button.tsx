"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState, type ReactNode } from "react";

const EMAIL = "muhamadhilal04@gmail.com";

export function ContactButton(): ReactNode {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-label={
        copied ? "Email copied" : open ? `Copy ${EMAIL}` : "Show email"
      }
      className="focus-ring bg-foreground text-background relative inline-flex h-11 max-w-full cursor-pointer items-center justify-center rounded-xl px-4 text-sm font-medium sm:px-5"
    >
      {open ? (
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          {copied ? (
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          <span className="sm:hidden">{copied ? "Copied" : "Copy email"}</span>
          <span className="hidden tabular-nums sm:inline">{EMAIL}</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Contact</span>
        </span>
      )}
    </button>
  );
}
