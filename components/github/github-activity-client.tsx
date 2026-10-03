"use client";

import { buildCalendar } from "./contribution-calendar";
import { ContributionGrid } from "./contribution-grid";

import {
  GITHUB_USERNAME,
  isGitHubActivityData,
  type GitHubActivityData,
} from "@/lib/github-activity-data";
import { ExternalLink, Github, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export function GitHubActivityClient({
  initialData,
  initialYear,
}: {
  initialData: GitHubActivityData | null;
  initialYear: number;
}): ReactNode {
  const currentYear = initialYear;
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);
  const [activity, setActivity] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingYear, setPendingYear] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [failedYear, setFailedYear] = useState<number | null>(
    initialData ? null : initialYear
  );
  const requestRef = useRef<AbortController | null>(null);
  const calendar = useMemo(
    () => (activity ? buildCalendar(activity) : null),
    [activity]
  );

  useEffect(() => () => requestRef.current?.abort(), []);

  async function selectYear(year: number, retry = false): Promise<void> {
    if (requestRef.current) return;
    setSelectedYear(year);
    if (year === activity?.year && !retry) {
      setFailedYear(null);
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 12_000);
    setIsLoading(true);
    setPendingYear(year);
    setFailedYear(null);
    try {
      const response = await fetch(`/api/github-activity?year=${year}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Unable to load GitHub activity.");
      const data: unknown = await response.json();
      if (!isGitHubActivityData(data, year))
        throw new Error("Invalid GitHub activity.");
      setActivity(data);
    } catch {
      setFailedYear(year);
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
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
        data-card-outline
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
                {activity
                  ? `${activity.total.toLocaleString("en-US")} contributions in ${activity.year}`
                  : `GitHub activity for ${selectedYear}`}
              </p>
              <p
                role="status"
                className="text-foreground/50 mt-0.5 flex items-center gap-1.5 text-xs sm:text-sm"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${failedYear !== null ? "bg-amber-500" : isLoading ? "bg-foreground/40" : "bg-[#39d353]"}`}
                />
                {isLoading
                  ? `Loading ${pendingYear} activity…`
                  : failedYear !== null
                    ? "Live data temporarily unavailable"
                    : "Synced from GitHub"}
              </p>
            </div>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="focus-ring text-foreground/60 hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors"
          >
            @{GITHUB_USERNAME}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div
          aria-busy={isLoading}
          className="flex flex-col gap-5 p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8"
        >
          <div className="min-w-0 flex-1">
            {failedYear !== null && (
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                <p className="text-foreground/65">
                  Could not load activity for {failedYear}.
                  {activity
                    ? ` Showing the last successful data for ${activity.year}.`
                    : " Please try again."}
                </p>
                <button
                  type="button"
                  onClick={() => selectYear(failedYear, true)}
                  className="focus-ring border-foreground/15 hover:bg-foreground/5 rounded-lg border px-3 py-2 font-medium"
                >
                  Try again
                </button>
              </div>
            )}
            {!activity && isLoading && (
              <p className="text-foreground/65 py-8 text-sm">
                Loading contribution calendar…
              </p>
            )}
            {activity && calendar && (
              <ContributionGrid activity={activity} calendar={calendar} />
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:w-24 lg:shrink-0 lg:flex-col lg:overflow-visible lg:pb-0">
            {years.map((year) => {
              const isActive = year === selectedYear;
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
