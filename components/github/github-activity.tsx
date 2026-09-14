import { GitHubActivityClient } from "@/components/github/github-activity-client";
import {
  getGitHubActivity,
  type GitHubActivityData,
} from "@/lib/github-activity";
import type { ReactNode } from "react";

export async function GitHubActivity(): Promise<ReactNode> {
  const currentYear = new Date().getUTCFullYear();
  let activity: GitHubActivityData | null = null;

  try {
    activity = await getGitHubActivity(currentYear);
  } catch {
    activity = null;
  }

  return (
    <GitHubActivityClient initialData={activity} initialYear={currentYear} />
  );
}
