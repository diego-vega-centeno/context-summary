"use server";
import { addPRData, fetchPRGithubIdentifiers, updatePRData } from "../data/prs";
import { revalidatePath } from "next/cache";
import { makePRWithSummary } from "../data/transformers";
import sql from "../db";
import logger from "../logger";
import { z } from "zod";
import { redirect } from "next/navigation";
import { ActionReturn } from "@/types";

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
    revalidatePath(`/stories`);
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

const PRURLSchema = z.object({
  url: z
    .string()
    .regex(
      /^https:\/\/github.com\/[^/]+\/[^/]+\/pull\/\d+$/,
      "Please enter a valid GitHub Pull Request URL (e.g., https://github.com/owner/repo/pull/123)",
    ),
});

const prParams = z.object({
  owner: z.string(),
  repo: z.string(),
  prNumber: z.coerce.number(),
});

export async function addPR(
  prevState: any,
  formData: FormData,
): Promise<ActionReturn | void> {
  try {
    logger.info("Getting pr data from URL");
    const formURL = formData.get("url");
    const { url } = PRURLSchema.parse({ url: formURL });
    const objectURL = new URL(url);
    const segments = objectURL!.pathname.split("/").filter(Boolean);

    const { owner, repo, prNumber } = prParams.parse({
      owner: segments[0],
      repo: segments[1],
      prNumber: segments[3],
    });

    logger.info(`Adding PR: ${owner}/${repo} #${prNumber}`);
    const prWithSummary = await makePRWithSummary(owner, repo, prNumber);

    logger.info("Adding PR to database");
    await addPRData(prWithSummary);

  } catch (error) {
    logger.error("Add PR error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues,
      };
    }

    return {
      success: false,
      error: [
        {
          code: "error",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        },
      ],
    };
  }
  revalidatePath("/dashboard");
  revalidatePath(`/stories`);
  redirect("/dashboard");
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
    logger.error("Batch Sync Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}

export async function deletePR(id: string) {
  try {
    await sql`DELETE FROM tracked_prs WHERE id = ${id}`;
    revalidatePath("/dashboard");
    revalidatePath("/stories");
    return { success: true, data: "Deleted PR" };
  } catch (error) {
    logger.error("Delete PR Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}
