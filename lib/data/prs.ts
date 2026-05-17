import { TrackedPRWithSummary } from "@/types";
import postgres from "postgres";
import logger from "../logger";

const sql = postgres(process.env.POSTGRES_URL!);

async function fetchTrackedPRs(
  userId: string,
): Promise<TrackedPRWithSummary[]> {
  try {
    logger.info("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const prs = await sql<TrackedPRWithSummary[]>`
      SELECT
        p.*,
        s.id as "summary.id",
        s.summary_json as "summary.summary_json",
        s.generated_at as "summary.generated_at"
      FROM tracked_prs p
      LEFT JOIN pr_summaries s ON p.id = s.pr_id
      WHERE user_id=${userId}
    `;

    return prs;
  } catch (error) {
    logger.error("Database error: ", error);
    throw new Error("Failed to fetch PRs.");
  }
}

async function fetchPRById(id: string) {}

async function fetchPRSummary(prId: string) {}

export { fetchTrackedPRs };
