"use server";
import { ActionReturn } from "@/types";
import { updateUserData } from "../data/user";
import logger from "../logger";
import { revalidatePath } from "next/cache";
import { unstable_update } from "@/auth";

export async function updateUserSettings(
  prevState: ActionReturn,
  formData: FormData,
): Promise<ActionReturn> {
  try {
    const name = formData.get("name") as string;
    const id = formData.get("id") as string;
    const staleDays = Number(formData.get("staleDays"));

    if (!name || name.trim() === "") {
      return {
        success: false,
        data: {
          name: ["Name can't be empty"],
        },
      };
    }

    if (!staleDays || isNaN(staleDays) || staleDays <= 0) {
      return {
        success: false,
        data: {
          staleDays: ["Invalid staleness value"],
        },
      };
    }

    await updateUserData({ name: name, id: id, staleDays: staleDays });

    await unstable_update({
      user: {
        name: name,
      },
    });

    revalidatePath("/settings");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    logger.error("Update user data error: ", error);
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
}
