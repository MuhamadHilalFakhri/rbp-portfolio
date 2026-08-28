"use client";

import type {
  GitHubActivityData,
  GitHubContributionDay,
} from "@/lib/github-activity";
import { ExternalLink, Github, LoaderCircle } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

const DAY_IN_MILLISECONDS = 86_400_000;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEVEL_CLASSES = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

type CalendarDay = GitHubContributionDay | null;

type CalendarData = {
  monthMarkers: { label: string; week: number }[];
  weeks: CalendarDay[][];
};

function buildCalendar(data: GitHubActivityData): CalendarData {
  const dayMap = new Map(data.days.map((day) => [day.date, day]));
  const yearStart = new Date(Date.UTC(data.year, 0, 1));
  const yearEnd = new Date(Date.UTC(data.year, 11, 31));
  const calendarStart = new Date(yearStart);
  calendarStart.setUTCDate(
    calendarStart.getUTCDate() - calendarStart.getUTCDay()
  );
  const calendarEnd = new Date(yearEnd);
  calendarEnd.setUTCDate(
    calendarEnd.getUTCDate() + (6 - calendarEnd.getUTCDay())
  );

  const weeks: CalendarDay[][] = [];
  for (
    let timestamp = calendarStart.getTime();
    timestamp <= calendarEnd.getTime();
    timestamp += DAY_IN_MILLISECONDS
  ) {
    const date = new Date(timestamp);
    const weekIndex = Math.floor(
      (timestamp - calendarStart.getTime()) / DAY_IN_MILLISECONDS / 7
    );
    const dateKey = date.toISOString().slice(0, 10);

    if (!weeks[weekIndex]) weeks[weekIndex] = [];
    weeks[weekIndex]!.push(
      date.getUTCFullYear() === data.year
        ? (dayMap.get(dateKey) ?? { count: 0, date: dateKey, level: 0 })
        : null
    );
  }

  const monthMarkers = MONTHS.map((label, month) => {
    const firstDay = Date.UTC(data.year, month, 1);
    const week = Math.floor(
      (firstDay - calendarStart.getTime()) / DAY_IN_MILLISECONDS / 7
    );
    return { label, week };
  });

  return { monthMarkers, weeks };
}

function formatDayLabel(day: GitHubContributionDay): string {
  const date = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${day.date}T00:00:00Z`));
  const contributionLabel =
    day.count === 1 ? "1 contribution" : `${day.count} contributions`;
  return `${contributionLabel} on ${date}`;
}

export function GitHubActivityClient({
  initialData,
  initiallyUnavailable = false,
}: {
  initialData: GitHubActivityData;
  initiallyUnavailable?: boolean;
}): ReactNode {
  const currentYear = new Date().getUTCFullYear();
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);
  const [activity, setActivity] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingYear, setPendingYear] = useState<number | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(initiallyUnavailable);
  const calendar = useMemo(() => buildCalendar(activity), [activity]);

  async function selectYear(year: number): Promise<void> {
    if (year === activity.year || isLoading) return;

    setIsLoading(true);
    setPendingYear(year);
    setIsUnavailable(false);
    try {
      const response = await fetch(`/api/github-activity?year=${year}`);
      if (!response.ok) throw new Error("Unable to load GitHub activity.");
      setActivity((await response.json()) as GitHubActivityData);
    } catch {
      setIsUnavailable(true);
    } finally {
      setIsLoading(false);
      setPendingYear(null);
    }
  }

  return (
    <section
      className="mx-auto w-full max-w-320 px-4 [contain-intrinsic-size:auto_42rem] [content-visibility:auto] min-[360px]:px-6 sm:px-10"
      data-github-activity
      data-scroll-reveal
      data-scroll-stagger
    >
      <div
        className="mb-8 flex flex-col items-center gap-4 text-center sm:mb-12 sm:gap-5"
        data-scroll-reveal-item
      >
        <div className="border-foreground/10 bg-foreground/4 text-foreground/70 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-tight">
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          Live GitHub activity
        </div>
        <h2 className="text-foreground font-serif text-[2.2rem] leading-[1.05] font-medium tracking-tight min-[360px]:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
          Building in public
        </h2>
        <p className="text-foreground/65 max-w-[38ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
          A live look at the code, experiments, and ideas I&rsquo;ve been
          contributing on GitHub.
        </p>
      </div>

      <div
        className="border-foreground/10 bg-background overflow-hidden rounded-2xl border shadow-[0_24px_70px_-45px_rgba(0,0,0,0.35)] sm:rounded-3xl"
        data-scroll-reveal-item
      >
        <div className="border-foreground/8 flex flex-col gap-4 border-b px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="bg-foreground text-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Github className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-foreground text-base font-medium tracking-tight sm:text-lg">
                {activity.total.toLocaleString("en-US")} contributions in{" "}
                {activity.year}
              </p>
              <p className="text-foreground/50 mt-0.5 flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39d353]" />
                {isUnavailable
                  ? "Live data temporarily unavailable"
                  : "Synced from GitHub"}
              </p>
            </div>
          </div>

          <a
            href={`https://github.com/${activity.username}`}
            target="_blank"
            rel="noreferrer"
            className="focus-ring text-foreground/60 hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors"
          >
            @{activity.username}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col gap-5 p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">
          <div className="min-w-0 flex-1">
            <div
              className="overflow-x-auto pb-3 [scrollbar-color:color-mix(in_srgb,var(--foreground)_20%,transparent)_transparent] [scrollbar-width:thin]"
              aria-label={`${activity.year} GitHub contribution calendar`}
              role="grid"
            >
              <div className="w-max min-w-full">
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
                      style={{
                        gridColumn: `${month.week + 1} / span 4`,
                        gridRow: 1,
                      }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div
                    className="text-foreground/50 grid w-6 shrink-0 grid-rows-7 gap-1 text-[11px] sm:w-7"
                    aria-hidden="true"
                  >
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
                            className={`h-3 w-3 rounded-[3px] transition-transform duration-200 hover:scale-125 ${LEVEL_CLASSES[day.level] ?? LEVEL_CLASSES[0]}`}
                            role="gridcell"
                            title={formatDayLabel(day)}
                          />
                        ) : (
                          <span
                            key={`empty-${weekIndex}-${dayIndex}`}
                            aria-hidden="true"
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
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:w-24 lg:shrink-0 lg:flex-col lg:overflow-visible lg:pb-0">
            {years.map((year) => {
              const isActive = year === activity.year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => selectYear(year)}
                  disabled={isLoading}
                  aria-pressed={isActive}
                  className={`focus-ring flex min-w-20 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors disabled:cursor-wait lg:w-full lg:justify-between ${
                    isActive
                      ? "bg-[#0969da] text-white"
                      : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  {year}
                  {isLoading && pendingYear === year ? (
                    <LoaderCircle
                      className="h-3.5 w-3.5 animate-spin"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
