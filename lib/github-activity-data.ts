export const GITHUB_USERNAME = "MuhamadHilalFakhri";

export type GitHubContributionDay = {
  count: number;
  date: string;
  level: number;
};

export type GitHubActivityData = {
  days: GitHubContributionDay[];
  fetchedAt: string;
  total: number;
  username: string;
  year: number;
};

export function isGitHubActivityData(
  value: unknown,
  year: number
): value is GitHubActivityData {
  if (!value || typeof value !== "object") return false;
  const data = value as GitHubActivityData;
  if (
    data.year !== year ||
    data.username !== GITHUB_USERNAME ||
    !Number.isSafeInteger(data.total) ||
    data.total < 0 ||
    typeof data.fetchedAt !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T/.test(data.fetchedAt) ||
    !Number.isFinite(Date.parse(data.fetchedAt)) ||
    !Array.isArray(data.days) ||
    data.days.length === 0
  )
    return false;

  let timestamp = Date.UTC(year, 0, 1);
  let total = 0;
  for (const day of data.days) {
    if (
      !day ||
      day.date !== new Date(timestamp).toISOString().slice(0, 10) ||
      !day.date.startsWith(`${year}-`) ||
      !Number.isSafeInteger(day.count) ||
      day.count < 0 ||
      !Number.isInteger(day.level) ||
      day.level < 0 ||
      day.level > 4
    )
      return false;
    total += day.count;
    timestamp += 86_400_000;
  }
  const requiredEnd = Math.min(
    Date.UTC(year, 11, 31),
    Date.parse(data.fetchedAt.slice(0, 10))
  );
  return total === data.total && timestamp > requiredEnd;
}
