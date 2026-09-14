import {
  GITHUB_USERNAME,
  isGitHubActivityData,
  type GitHubActivityData,
  type GitHubContributionDay,
} from "./github-activity-data";
export type {
  GitHubActivityData,
  GitHubContributionDay,
} from "./github-activity-data";

const GITHUB_ACTIVITY_REVALIDATE_SECONDS = 300;

function parseContributionCount(label: string): number {
  const text = label.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ");
  if (/\bNo\s+contributions?\b/i.test(text)) return 0;
  const match = text.match(
    /(?:^|\s)(\d+|\d{1,3}(?:,\d{3})+)\s+contributions?\b/i
  );
  if (!match)
    throw new Error("GitHub returned an unrecognized contribution count.");
  return Number.parseInt(match[1]!.replaceAll(",", ""), 10);
}

function attributes(tag: string): Map<string, string> {
  return new Map(
    [...tag.matchAll(/([\w-]+)\s*=\s*(["'])([\s\S]*?)\2/g)].map((match) => [
      match[1]!.toLowerCase(),
      match[3]!,
    ])
  );
}

export function parseGitHubActivity(
  html: string,
  year: number,
  fetchedAt = new Date().toISOString()
): GitHubActivityData {
  const labels = new Map<string, string>();
  for (const match of html.matchAll(
    /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi
  )) {
    const target = attributes(match[1]!).get("for");
    if (target) labels.set(target, match[2]!);
  }
  const days: GitHubContributionDay[] = [];
  for (const match of html.matchAll(/<td\b([^>]*)>/gi)) {
    const attrs = attributes(match[1]!);
    const date = attrs.get("data-date");
    if (!date?.startsWith(`${year}-`)) continue;
    const label = labels.get(attrs.get("id") ?? "") ?? attrs.get("aria-label");
    const level = attrs.get("data-level");
    if (!label || !level || !/^[0-4]$/.test(level)) {
      throw new Error("GitHub returned an incomplete contribution day.");
    }
    days.push({
      date,
      count: parseContributionCount(label),
      level: Number(level),
    });
  }

  days.sort((first, second) => first.date.localeCompare(second.date));
  const activity = {
    days,
    fetchedAt,
    total: days.reduce((total, day) => total + day.count, 0),
    username: GITHUB_USERNAME,
    year,
  };
  if (!isGitHubActivityData(activity, year)) {
    throw new Error(
      "GitHub returned an invalid or incomplete contribution calendar."
    );
  }
  return activity;
}

export async function getGitHubActivity(
  year: number
): Promise<GitHubActivityData> {
  const from = `${year}-01-01`;
  const to = `${year}-12-31`;
  const endpoint = new URL(
    `/users/${GITHUB_USERNAME}/contributions`,
    "https://github.com"
  );
  endpoint.searchParams.set("from", from);
  endpoint.searchParams.set("to", to);

  const response = await fetch(endpoint, {
    headers: {
      Accept: "text/html",
      "User-Agent": "rbp-portfolio",
    },
    next: { revalidate: GITHUB_ACTIVITY_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`GitHub activity request failed with ${response.status}.`);
  }

  return parseGitHubActivity(await response.text(), year);
}
