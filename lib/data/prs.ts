import {
  WorkItemDashboardType,
  WorkItemWithSummaryJSON,
  TrackedWorkItemWithSummary,
  User,
  UserAuth,
} from "@/types";
import sql from "../db";
import { auth } from "@/auth";

async function fetchTrackedWorkItems(
  userId: string,
): Promise<TrackedWorkItemWithSummary[]> {
  return await sql<TrackedWorkItemWithSummary[]>`
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
}

async function fetchDashboardPRs(userId: string): Promise<WorkItemDashboardType[]> {
  // throw new Error("some error")
  return await sql<WorkItemDashboardType[]>`
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
}

async function fetchStatusCounts(userId: string) {
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
  // throw new Error("some error")
  const data = await sql<TrackedWorkItemWithSummary[]>`
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

async function upsertWorkItemSummary(prId: string, summaryJSON: any) {
  return await sql`
    INSERT INTO pr_summaries (pr_id, summary_json, generated_at)
    VALUES (${prId}, ${summaryJSON}, NOW())
    ON CONFLICT (pr_id) DO UPDATE
    SET 
      summary_json = EXCLUDED.summary_json,
      generated_at = EXCLUDED.generated_at;
  `;
}

async function fetchWorkItemIdentifiers(
  id: string,
): Promise<
  | { repo_owner: string; repo_name: string; type: string; pr_number: number }
  | undefined
> {
  const data = await sql<
    { repo_owner: string; repo_name: string; type: string; pr_number: number }[]
  >`
  SELECT repo_owner, repo_name, type, pr_number FROM tracked_prs WHERE id = ${id}`;
  return data[0];
}

async function updatePRData(
  prId: string,
  WorkItemWithSummaryJSON: WorkItemWithSummaryJSON,
) {
  const [{ stale_days }] = await sql`
    SELECT u.stale_days
    FROM tracked_prs tp
    JOIN users u ON u.id = tp.user_id
    WHERE tp.id = ${prId}
  `;

  let status = WorkItemWithSummaryJSON.metadata.status;
  const lastActivity = new Date(WorkItemWithSummaryJSON.metadata.last_activity_at);
  const staleThreshold = new Date();
  staleThreshold.setDate(staleThreshold.getDate() - stale_days);

  if (status === "open" && lastActivity < staleThreshold) status = "stale";

  await sql.begin(async (sql) => {
    await sql`
      UPDATE tracked_prs
      SET title = ${WorkItemWithSummaryJSON.metadata.title}, status = ${status},
          last_activity_at = ${WorkItemWithSummaryJSON.metadata.last_activity_at}, last_synced_at = NOW()
      WHERE id = ${prId}
    `;

    await upsertWorkItemSummary(prId, WorkItemWithSummaryJSON.summaryJSON);
  });
}

async function addWorkItemData(workItemWithSummary: WorkItemWithSummaryJSON) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  const userId = session.user?.id!;
  const metadata = workItemWithSummary.metadata;

  let status = metadata.status;
  const lastActivity = new Date(metadata.last_activity_at);
  const staleThreshold = new Date();

  const [{ stale_days }] = await sql`
    SELECT stale_days FROM users WHERE id = ${userId}
  `;

  staleThreshold.setDate(staleThreshold.getDate() - stale_days);
  if (status === "open" && lastActivity < staleThreshold) status = "stale";

  const result = await sql`
      INSERT INTO tracked_prs (
        user_id,
        repo_owner,
        repo_name,
        github_type,
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
      ${metadata.type},
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

  await upsertWorkItemSummary(prId, workItemWithSummary.summaryJSON);

  return prId;
}

export {
  fetchTrackedWorkItems,
  fetchStatusCounts,
  fetchDashboardPRs,
  fetchPRStoryById,
  upsertWorkItemSummary,
  fetchWorkItemIdentifiers,
  addWorkItemData,
  updatePRData,
};
