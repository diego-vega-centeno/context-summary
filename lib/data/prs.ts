import {
  PRDashboardType,
  PRWithSummaryJSON,
  TrackedPRWithSummary,
} from "@/types";
import postgres from "postgres";
import logger from "../logger";

const sql = postgres(process.env.POSTGRES_URL!);

async function fetchTrackedPRs(
  userId: string,
): Promise<TrackedPRWithSummary[]> {
  try {
    logger.info("Fetching data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));
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

async function fetchDashboardPRs(userId: string): Promise<PRDashboardType[]> {
  try {
    logger.info("Fetching data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const prs = await sql<PRDashboardType[]>`
      SELECT
        p.id, 
        p.title,
        p.status,
        p.pr_number, 
        p.repo_name, 
        p.repo_owner,
        p.author,
        p.last_activity_at,
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
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return await sql`
    SELECT status::text, count(*)::int FROM tracked_prs
    WHERE user_id = ${userId}
    GROUP BY status
    UNION
    SELECT 'total', count(*)::int FROM tracked_prs
    WHERE user_id = ${userId}
  `;
}

async function fetchPRStoryById(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await sql<TrackedPRWithSummary[]>`
    SELECT
      p.*,
      json_build_object(
        'id', s.id,
        'summary_json', s.summary_json,
        'generated_at', s.generated_at
      ) as summary
    FROM tracked_prs p
    LEFT JOIN pr_summaries s ON p.id = s.pr_id
    WHERE p.id = ${id} 
  `;
  return data[0];
}

async function upsertPRSummary(prId: string, summaryJSON: any) {
  try {
    return await sql`
    INSERT INTO pr_summaries (pr_id, summary_json, generated_at)
    VALUES (${prId}, ${JSON.stringify(summaryJSON)}, NOW())
    ON CONFLICT (pr_id) DO UPDATE
    SET 
      summary_json = EXCLUDED.summary_json,
      generated_at = EXCLUDED.generated_at;
  `;
  } catch (error) {
    logger.info("Database error:", error);
    throw new Error("Failed to upsert PR summary");
  }
}

async function fetchPRGithubIdentifiers(
  prId: string,
): Promise<
  { repo_owner: string; repo_name: string; pr_number: number } | undefined
> {
  const data = await sql<
    { repo_owner: string; repo_name: string; pr_number: number }[]
  >`
  SELECT repo_owner, repo_name, pr_number FROM tracked_prs WHERE id = ${prId}`;
  return data[0];
}

async function updatePRData(
  prId: string,
  prWithSummaryJSON: PRWithSummaryJSON,
) {
  try {
    let status = prWithSummaryJSON.metadata.status;

    const lastActivity = new Date(prWithSummaryJSON.metadata.last_activity_at);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    if (status === "open" && lastActivity < sevenDaysAgo) {
      status = "stale";
    }

    await sql.begin(async (sql) => {
      await sql`
            UPDATE tracked_prs
            SET title = ${prWithSummaryJSON.metadata.title}, status = ${status},
                last_activity_at = ${prWithSummaryJSON.metadata.last_activity_at}, last_synced_at = NOW()
            WHERE id = ${prId}
          `;

      await upsertPRSummary(prId, prWithSummaryJSON.summaryJSON);
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

async function addPRData(prWithSummary: PRWithSummaryJSON) {
  const userId = "7f759600-988e-4a81-9878-439523293021";
  const metadata = prWithSummary.metadata;

  let status = metadata.status;
  const lastActivity = new Date(metadata.last_activity_at);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  if (status === "open" && lastActivity < sevenDaysAgo) status = "stale";

  try {
    const result = await sql`
      INSERT INTO tracked_prs (
        user_id,
        repo_owner,
        repo_name,
        pr_number,
        title,
        status,
        author,
        created_at,
        last_activity_at,
        last_synced_at,
        added_at
      )
      VALUES (
      ${userId},
      ${metadata.repo_owner},
      ${metadata.repo_name},
      ${metadata.pr_number},
      ${metadata.title},
      ${status},
      ${metadata.author},
      ${metadata.created_at},
      ${metadata.last_activity_at},
      NOW(),
      NOW())
      RETURNING id
    `;
    const prId = result[0].id;

    await upsertPRSummary(prId, prWithSummary.summaryJSON);

    return prId
  } catch (error) {
    logger.info("Failed to add PR:", error);
    throw error;
  }
}

export {
  fetchTrackedPRs,
  fetchStatusCounts,
  fetchDashboardPRs,
  fetchPRStoryById,
  upsertPRSummary,
  fetchPRGithubIdentifiers,
  addPRData,
  updatePRData,
};
