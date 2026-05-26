"use server";
import { addPRData, fetchPRGithubIdentifiers, updatePRData } from "../data/prs";
import { revalidatePath } from "next/cache";
import { makePRWithSummary } from "../data/transformers";
import sql from "../db";
import logger from "../logger";

export async function syncPR(prId: string) {
  try {
    const prIdentifiers = await fetchPRGithubIdentifiers(prId);
    if (!prIdentifiers) throw new Error("PR not found in database");

    const prWithSummary = await makePRWithSummary(
      prIdentifiers.repo_owner,
      prIdentifiers.repo_name,
      prIdentifiers.pr_number,
    );
    await updatePRData(prId, prWithSummary);

    revalidatePath("/dashboard");
    revalidatePath(`/stories/${prId}`);
    return { success: true, data: "Synced PR" };
  } catch (error) {
    logger.error("Sync PR Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}

export async function addPR(owner: string, repo: string, prNumber: number) {
  try {
    logger.info("Making PR with summary");
    const prWithSummary = await makePRWithSummary(owner, repo, prNumber);

    logger.info("Adding PR with summary to database");
    const prId = await addPRData(prWithSummary);

    revalidatePath("/dashboard");
    revalidatePath(`/stories/${prId}`);
    return { success: true, data: "Added PR" };
  } catch (error) {
    logger.error("Add PR Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}

export async function syncActivePRs(userId: string) {
  try {
    const activePRs = await sql`
        SELECT id FROM tracked_prs
        WHERE user_id = ${userId} AND status IN ('open', 'stale')
      `;
    for (const pr of activePRs) {
      logger.debug(`Syncing PR: ${pr.id}`);
      await syncPR(pr.id);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    revalidatePath("/dashboard");
    return { success: true, count: activePRs.length };
  } catch (error) {
    logger.debug("Batch Sync Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}
