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

const GITHUB_ACTIVITY_REVALIDATE_SECONDS = 300;

function parseContributionCount(label: string): number {
  const match = label.match(/([\d,]+)\s+contributions?/i);
  return match ? Number.parseInt(match[1]!.replaceAll(",", ""), 10) : 0;
}

function parseGitHubActivity(html: string, year: number): GitHubActivityData {
  const heading = html.match(
    /<h2[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/i
  );
  const headingText = heading?.[1]?.replace(/<[^>]+>/g, " ") ?? "";
  const days: GitHubContributionDay[] = [];
  const dayPattern =
    /<td\b(?=[^>]*\bdata-date="([^"]+)")(?=[^>]*\bdata-level="([0-4])")[^>]*><\/td>\s*<tool-tip\b[^>]*>([\s\S]*?)<\/tool-tip>/gi;

  for (const match of html.matchAll(dayPattern)) {
    const date = match[1]!;
    if (!date.startsWith(`${year}-`)) continue;

    days.push({
      count: parseContributionCount(match[3]!.replace(/<[^>]+>/g, " ")),
      date,
      level: Number.parseInt(match[2]!, 10),
    });
  }

  if (days.length === 0) {
    throw new Error("GitHub returned an empty contribution calendar.");
  }

  days.sort((first, second) => first.date.localeCompare(second.date));
  const headingTotal = parseContributionCount(headingText);

  return {
    days,
    fetchedAt: new Date().toISOString(),
    total: headingTotal || days.reduce((total, day) => total + day.count, 0),
    username: GITHUB_USERNAME,
    year,
  };
}

export function createEmptyGitHubActivity(year: number): GitHubActivityData {
  return {
    days: [],
    fetchedAt: new Date().toISOString(),
    total: 0,
    username: GITHUB_USERNAME,
    year,
  };
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
  });

  if (!response.ok) {
    throw new Error(`GitHub activity request failed with ${response.status}.`);
  }

  return parseGitHubActivity(await response.text(), year);
}
