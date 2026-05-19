import { PRMiniCardType, TrackedPRWithSummary } from "@/types";
import postgres from "postgres";
import logger from "../logger";

const sql = postgres(process.env.POSTGRES_URL!);

async function fetchTrackedPRs(
  userId: string,
): Promise<TrackedPRWithSummary[]> {
  try {
    logger.info("Fetching data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const prs = await sql<TrackedPRWithSummary[]>`
      SELECT
        p.*,
        json_build_object(
          'id', s.id,
          'summary_json', s.summary_json,
          'generated_at', s.generated_at
        ) as summary
      FROM tracked_prs  p
      LEFT JOIN pr_summaries s ON p.id = s.pr_id
      WHERE user_id=${userId}
    `;

    return prs;
  } catch (error) {
    logger.error("Database error: ", error);
    throw new Error("Failed to fetch PRs.");
  }
}

async function fetchDashboardPRs(
  userId: string,
): Promise<PRMiniCardType[]> {
  try {
    logger.info("Fetching data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const prs = await sql<PRMiniCardType[]>`
      SELECT
        p.id, 
        p.title,
        p.status,
        p.pr_number, 
        p.repo_name, 
        s.summary_json->>'current_state' AS current_state
      FROM tracked_prs  p
      LEFT JOIN pr_summaries s ON p.id = s.pr_id
      WHERE user_id=${userId}
    `;

    return prs;
  } catch (error) {
    logger.error("Database error: ", error);
    throw new Error("Failed to fetch PRs.");
  }
}

async function fetchStatusCounts(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return await sql`
    SELECT status::text, count(*)::int FROM tracked_prs
    WHERE user_id = ${userId}
    GROUP BY status
    UNION
    SELECT 'total', count(*)::int FROM tracked_prs
    WHERE user_id = ${userId}
  `;
}

async function fetchPRById(id: string) {}

async function fetchPRSummary(prId: string) {}

export { fetchTrackedPRs, fetchStatusCounts, fetchDashboardPRs };
