import {
  getGitHubActivity,
  type GitHubActivityData,
} from "@/lib/github-activity";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest
): Promise<NextResponse<GitHubActivityData | { error: string }>> {
  const currentYear = new Date().getUTCFullYear();
  const requestedYear = Number.parseInt(
    request.nextUrl.searchParams.get("year") ?? `${currentYear}`,
    10
  );

  if (
    !Number.isInteger(requestedYear) ||
    requestedYear < currentYear - 3 ||
    requestedYear > currentYear
  ) {
    return NextResponse.json(
      { error: "The requested contribution year is not available." },
      { status: 400 }
    );
  }

  try {
    const activity = await getGitHubActivity(requestedYear);
    return NextResponse.json(activity, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub activity is temporarily unavailable." },
      { status: 502 }
    );
  }
}
