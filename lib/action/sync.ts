import { fetchPRIssuesTimeline, fetchPRPulls } from "../data/services/github";
import { writeFile, readFile } from "node:fs/promises";
import { TrackedPRWithSummary, TrackedPRWithTimeline } from "@/types";
import { makePRSummary } from "../data/services/gemini";
import logger from "../logger";
import { existsSync } from "node:fs";

export async function makePRTimeline(owner: string, repo: string, id: number) {
  const timelineRes = await fetchPRIssuesTimeline(owner, repo, id);

  const timeline = timelineRes
    .map((entry: Record<string, any>) => {
      switch (entry.event) {
        case "committed":
          return {
            type: "committed",
            user: entry.committer.name,
            content: entry.message,
            timestamp: entry.committer.date,
          };
        case "commented":
          return {
            type: "commented",
            user: entry.actor.login,
            content: entry.body,
            timestamp: entry.created_at,
          };
        case "reviewed":
          return {
            type: "reviewed",
            user: entry.user.login,
            state: entry.state,
            content: entry.body,
            timestamp: entry.submitted_at,
          };
        case "merged":
        case "closed":
        case "reopened":
        case "ready_for_review":
          return {
            type: entry.event,
            user: entry.actor.login,
            timestamp: entry.created_at,
          };
        case "review_requested":
          return {
            type: entry.event,
            user: entry.actor.login,
            content: entry.requested_reviewer.login,
            timestamp: entry.created_at,
          };
        default:
          break;
      }
    })
    .filter(Boolean);

  return timeline;
}

async function makePRWithSummary(owner: string, repo: string, id: number) {
  //* Fetch PR metadata
  console.log("Fetch PR metadata");
  const metadataRes = await fetchPRPulls(owner, repo, id);

  //* Make PR timeline
  console.log("Making PR timeline");
  const timeline = await makePRTimeline(owner, repo, id);

  //* Make PR with timeline
  console.log("Making PR with timeline");
  const prWithTimeline = {
    metadata: {
      id: metadataRes.id,
      repo_owner: metadataRes.head.repo.owner.login,
      repo_name: metadataRes.head.repo.name,
      author: metadataRes.user.login,
      title: metadataRes.title,
      description: metadataRes.body,
      state: metadataRes.state,
      created_at: metadataRes.created_at,
    },
    timeline: timeline,
  };

  const timelineResFile = `./lib/action/summary-tests/${owner}-${repo}-${id}-prWithTimeline.json`;
  await writeFile(
    timelineResFile,
    JSON.stringify(prWithTimeline, null, 2),
    "utf-8",
  );

  //* Making PR summary
  console.log("Making PR summary");
  const prSummary = await makePRSummary(prWithTimeline);

  return {
    metadata: prWithTimeline.metadata,
    summary: prSummary,
  };
}

let owner = "vercel",
  repo = "next.js",
  id = 93949;
const prWithSummary = await makePRWithSummary(owner, repo, id);

await writeFile(
  `./lib/action/summary-tests/${owner}-${repo}-${id}-prWithSummary.json`,
  JSON.stringify(prWithSummary, null, 2),
  "utf-8",
);
