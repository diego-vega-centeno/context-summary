import { fetchPRIssuesTimeline, fetchPRPulls } from "../data/services/github";
import { writeFile, readFile } from "node:fs/promises";
import { TrackedPRWithEvents, TrackedPRWithSummary } from "@/types";
import { makePRSummary } from "../data/services/gemini";
import logger from "../logger";

export function makePREvents(timeline: Record<string, any>[]) {
  const events = timeline
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

  return events;
}

async function makePRWithSummary(owner: string, repo: string, id: number) {
  const timelineResFile = `./lib/action/summary-tests/${owner}-${repo}-${id}-timelineResFile.json`;
  const metadataResFile = `./lib/action/summary-tests/${owner}-${repo}-${id}-metadataResFile.json`;

  //* Fetch PR metadata
  console.log("Fetch PR metadata and timeline");
  const [metadataRes, timelineRes] = await Promise.all([
    fetchPRPulls(owner, repo, id),
    fetchPRIssuesTimeline(owner, repo, id),
  ]);
  await writeFile(
    timelineResFile,
    JSON.stringify(timelineRes, null, 2),
    "utf-8",
  );
  await writeFile(
    metadataResFile,
    JSON.stringify(metadataRes, null, 2),
    "utf-8",
  );

  //* Make PR timeline
  console.log("Making PR events");
  const events = makePREvents(timelineRes);

  //* Make PR with timeline
  console.log("Making PR with timeline");
  const prWithEvents = {
    metadata: {
      pr_number: metadataRes.id,
      repo_owner: metadataRes.head.repo.owner.login,
      repo_name: metadataRes.head.repo.name,
      author: metadataRes.user.login,
      title: metadataRes.title,
      description: metadataRes.body,
      status: metadataRes.state,
      created_at: metadataRes.created_at,
      last_activity_at:metadataRes.updated_at
    },
    events: events,
  };

  //* Making PR summary
  console.log("Making PR summary");
  const prSummary = await makePRSummary(prWithEvents as TrackedPRWithEvents);

  return {
    metadata: prWithEvents.metadata,
    summary: {
      summary_json: prSummary,
    },
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
