"use server";
import { addPRData, fetchPRGithubIdentifiers, updatePRData } from "../data/prs";
import { revalidatePath } from "next/cache";
import { makePRWithSummary } from "../data/transformers";

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
  } catch (error) {
    console.error("Sync Error:", error);
    return { success: false, error: "Failed to sync PR" };
  }
}

export async function addPR(owner: string, repo: string, prNumber: number) {
  try {
    const prWithSummary = await makePRWithSummary(owner, repo, prNumber);
    const prId = await addPRData(prWithSummary);

    revalidatePath("/dashboard");
    revalidatePath(`/stories/${prId}`);
  } catch (error) {
    console.error("Sync Error:", error);
    return { success: false, error: "Failed to sync PR" };
  }
}
