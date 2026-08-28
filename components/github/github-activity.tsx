import { GitHubActivityClient } from "@/components/github/github-activity-client";
import {
  createEmptyGitHubActivity,
  getGitHubActivity,
} from "@/lib/github-activity";
import type { ReactNode } from "react";

export async function GitHubActivity(): Promise<ReactNode> {
  const currentYear = new Date().getUTCFullYear();
  let activity = createEmptyGitHubActivity(currentYear);
  let initiallyUnavailable = false;

  try {
    activity = await getGitHubActivity(currentYear);
  } catch {
    initiallyUnavailable = true;
  }

  return (
    <GitHubActivityClient
      initialData={activity}
      initiallyUnavailable={initiallyUnavailable}
    />
  );
}
