import { fetchPRIssuesTimeline, fetchPRPulls } from "../services/github";
import { writeFile, readFile } from "node:fs/promises";
import {
  PRWithEvents,
  PRTimelineEvent,
  PRWithSummaryJSON,
} from "@/types";
import { makePRSummary } from "../services/gemini";

export function makePREvents(
  timeline: Record<string, any>[],
): PRTimelineEvent[] {
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
    .filter(Boolean) as PRTimelineEvent[];

  return events;
}

export function makePRWithEvents(
  metadataRes: Record<string, any>,
  events: PRTimelineEvent[],
): PRWithEvents {
  return {
    metadata: {
      pr_number: metadataRes.number,
      repo_owner: metadataRes.base.repo.owner.login,
      repo_name: metadataRes.base.repo.name,
      author: metadataRes.user.login,
      title: metadataRes.title,
      description: metadataRes.body,
      status: metadataRes.merged ? "merged" : metadataRes.state,
      created_at: metadataRes.created_at,
      last_activity_at: metadataRes.updated_at,
    },
    events: events,
  };
}

export async function makePRWithSummary(
  owner: string,
  repo: string,
  id: number,
): Promise<PRWithSummaryJSON> {
  // const prWithEventsFile = `./lib/action/summary-tests/${owner}-${repo}-${id}-prWithEvents.json`;

  //* Fetch PR metadata
  console.log("Fetch PR metadata and timeline");
  const [metadataRes, timelineRes] = await Promise.all([
    fetchPRPulls(owner, repo, id),
    fetchPRIssuesTimeline(owner, repo, id),
  ]);

  //* Make PR timeline
  console.log("Making PR events");
  const events = makePREvents(timelineRes);

  //* Make PR with timeline
  console.log("Making PR with events");
  const prWithEvents = makePRWithEvents(metadataRes, events);

  //* Making PR summary
  console.log("Making PR summary");
  const prSummary = await makePRSummary(prWithEvents as PRWithEvents);

  return {
    metadata: prWithEvents.metadata,
    summaryJSON: prSummary,
  };
}

// let owner = "vercel",
//   repo = "next.js",
//   id = 93949;
// const prWithSummary = await makePRWithSummary(owner, repo, id);

// await writeFile(
//   `./lib/action/summary-tests/${owner}-${repo}-${id}-prWithSummary.json`,
//   JSON.stringify(prWithSummary, null, 2),
//   "utf-8",
// );

