"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useState, type ReactNode } from "react";
import type { GitHubActivityData } from "@/lib/github-activity-data";
import {
  formatDayLabel,
  LEVEL_CLASSES,
  type CalendarData,
} from "./contribution-calendar";

type Tooltip = {
  day: NonNullable<CalendarData["weeks"][number][number]>;
  x: number;
  y: number;
  below: boolean;
};

export function ContributionGrid({
  activity,
  calendar,
}: {
  activity: GitHubActivityData;
  calendar: CalendarData;
}): ReactNode {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const reduceMotion = useReducedMotion();
  const dayFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const showTooltip = (day: Tooltip["day"], target: HTMLElement): void => {
    const rect = target.getBoundingClientRect();
    const below = rect.top < 88;
    setTooltip({
      day,
      x: Math.max(
        136,
        Math.min(window.innerWidth - 136, rect.left + rect.width / 2)
      ),
      y: below ? rect.bottom + 10 : rect.top - 10,
      below,
    });
  };

  return (
    <>
      <figure
        className="focus-ring overflow-x-auto pb-3 [scrollbar-color:color-mix(in_srgb,var(--foreground)_20%,transparent)_transparent] [scrollbar-width:thin]"
        aria-label={`${activity.year} GitHub contribution heatmap with ${activity.total.toLocaleString("en-US")} total contributions. Darker squares indicate more activity.`}
        role="img"
        tabIndex={0}
      >
        <div className="w-max min-w-full" aria-hidden="true">
          <div
            className="ml-8 grid h-6 gap-1 sm:ml-10"
            style={{
              gridTemplateColumns: `repeat(${calendar.weeks.length}, 0.75rem)`,
            }}
          >
            {calendar.monthMarkers.map((month) => (
              <span
                key={month.label}
                className="text-foreground/55 text-xs"
                style={{ gridColumn: `${month.week + 1} / span 4`, gridRow: 1 }}
              >
                {month.label}
              </span>
            ))}
          </div>
          <div className="flex gap-2 sm:gap-3">
            <div className="text-foreground/50 grid w-6 shrink-0 grid-rows-7 gap-1 text-[11px] sm:w-7">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>
            <div
              className="grid grid-flow-col grid-rows-7 gap-1"
              style={{
                gridTemplateColumns: `repeat(${calendar.weeks.length}, 0.75rem)`,
              }}
            >
              {calendar.weeks.flatMap((week, weekIndex) =>
                week.map((day, dayIndex) =>
                  day ? (
                    <span
                      key={day.date}
                      aria-label={formatDayLabel(day)}
                      onPointerEnter={(event) => {
                        if (event.pointerType !== "touch")
                          showTooltip(day, event.currentTarget);
                      }}
                      onPointerLeave={() => setTooltip(null)}
                      className={`h-3 w-3 rounded-[3px] transition-transform duration-200 hover:scale-125 ${LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0]}`}
                    />
                  ) : (
                    <span
                      key={`empty-${weekIndex}-${dayIndex}`}
                      className="h-3 w-3"
                    />
                  )
                )
              )}
            </div>
          </div>
          <div className="text-foreground/50 mt-4 flex items-center justify-end gap-1.5 text-xs">
            <span>Less</span>
            {LEVEL_CLASSES.map((levelClass, index) => (
              <span
                key={levelClass}
                className={`h-3 w-3 rounded-[3px] ${levelClass}`}
                aria-label={`Contribution level ${index}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </figure>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {tooltip && (
              <motion.div
                role="tooltip"
                initial={{ opacity: 0, y: tooltip.below ? -4 : 5, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: tooltip.below ? -3 : 3, scale: 0.98 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`pointer-events-none fixed z-[10010] -translate-x-1/2 rounded-xl border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-white shadow-xl shadow-black/25 ${tooltip.below ? "" : "-translate-y-full"}`}
                style={{ left: tooltip.x, top: tooltip.y }}
              >
                <p className="text-sm font-semibold tabular-nums">
                  {tooltip.day.count}{" "}
                  {tooltip.day.count === 1 ? "contribution" : "contributions"}
                </p>
                <p className="mt-0.5 text-xs text-white/65">
                  {dayFormatter.format(
                    new Date(`${tooltip.day.date}T00:00:00Z`)
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
