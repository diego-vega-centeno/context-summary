import { fetchPRIssuesTimeline, fetchPRPulls } from "../data/services/github";
import { writeFile, readFile } from "node:fs/promises";
import { PRTimeline } from "@/types";
import { generatePRSummary } from "../data/services/gemini";
import logger from "../logger";

export async function makePRTimeline(owner: string, repo: string, id: number) {
  // const [metadataRes, timelineRes] = await Promise.all([
  //   fetchPRPulls(owner, repo, id),
  //   fetchPRIssuesTimeline(owner, repo, id),
  // ]);
  // await writeFile(
  //   "metadataRes-test.json",
  //   JSON.stringify(metadataRes, null, 2),
  //   "utf-8",
  // );
  // await writeFile(
  //   "timelineRes-test.json",
  //   JSON.stringify(timelineRes, null, 2),
  //   "utf-8",
  // );

  const timelineRes = JSON.parse(
    await readFile("./lib/action/timelineRes-test.json", "utf-8"),
  );
  const metadataRes = JSON.parse(
    await readFile("./lib/action/metadataRes-test.json", "utf-8"),
  );

  const events = timelineRes
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

  const timeline: PRTimeline = {
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
    events: events,
  };

  return timeline;
}

async function makePRStory(owner: string, repo: string, id: number) {
  logger.info("Making PR timeline");
  const timeline = await makePRTimeline(owner, repo, id);
  await writeFile(
    "./lib/action/timeline.json",
    JSON.stringify(timeline, null, 2),
  );
  logger.info("Generating PR summary");
  const prSummary = await generatePRSummary(timeline);
  await writeFile("./lib/action/summary.json", JSON.stringify(prSummary, null, 2));
  return prSummary;
}

const prStory = await makePRStory("vercel", "next.js", 93949);
console.log(prStory);