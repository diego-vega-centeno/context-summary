import { fetchWorkItemTimeline, fetchWorkItemData } from "../services/github";
import {
  PromptSummaryInput,
  WorkItemTimelineEvent,
  WorkItemWithSummaryJSON,
} from "@/types";
import { makeWorkItemSummary } from "../services/gemini";
import logger from "../logger";

export function makeWorkItemEvents(
  timeline: Record<string, any>[],
): WorkItemTimelineEvent[] {
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
    .filter(Boolean) as WorkItemTimelineEvent[];

  return events;
}

export function makePromptSummaryInput(
  metadataRes: Record<string, any>,
  events: WorkItemTimelineEvent[],
  provider: string,
  owner: string,
  repo: string,
  type: string,
): PromptSummaryInput {
  return {
    metadata: {
      external_id: metadataRes.number,
      provider: provider,
      owner: owner,
      container: repo,
      work_item_type: type,
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

export async function makeWorkItemWithSummary(
  provider: string,
  owner: string,
  repo: string,
  type: string,
  id: number,
): Promise<WorkItemWithSummaryJSON> {
  // const prWithEventsFile = `./lib/action/summary-tests/${owner}-${repo}-${id}-prWithEvents.json`;

  //* Fetch PR metadata
  logger.debug("Fetch work item metadata and timeline");
  const [metadataRes, timelineRes] = await Promise.all([
    fetchWorkItemData(owner, repo, type, id),
    fetchWorkItemTimeline(owner, repo, id),
  ]);

  //* Make PR timeline
  logger.debug("Making work item events");
  const events = makeWorkItemEvents(timelineRes);

  //* Make PR with timeline
  logger.debug("Making work item with events");
  const promptSummaryInput = makePromptSummaryInput(
    metadataRes,
    events,
    provider,
    owner,
    repo,
    type,
  );

  //* Making PR summary
  logger.debug("Making work item summary");
  const WorkItemSummary = await makeWorkItemSummary(
    promptSummaryInput as PromptSummaryInput,
  );

  return {
    metadata: promptSummaryInput.metadata,
    summaryJSON: WorkItemSummary,
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
