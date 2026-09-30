import type {
  GitHubActivityData,
  GitHubContributionDay,
} from "@/lib/github-activity-data";

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

export const LEVEL_CLASSES = [
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

export function buildCalendar(data: GitHubActivityData): CalendarData {
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
      date.getUTCFullYear() === data.year ? (dayMap.get(dateKey) ?? null) : null
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

export function formatDayLabel(day: GitHubContributionDay): string {
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
