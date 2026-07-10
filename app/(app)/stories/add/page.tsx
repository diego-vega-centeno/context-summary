"use client";
import Button from "@/app/ui/Button";
import { addPR } from "@/lib/actions/pr";
import { ActionReturn } from "@/types";
import { useActionState } from "react";

export default function AddPRPage() {
  const initialState: ActionReturn = { success: false, error: [] };
  const [state, formAction, isPending] = useActionState(addPR, initialState);
  return (
    <div className="flex justify-center px-40 p-6">
      <form action={formAction} className="w-full" aria-live="polite">
        <div className="space-y-3">
          <div>
            <label htmlFor="url">Work item URL</label>
          </div>
          <input
            id="url"
            name="url"
            type="text"
            placeholder="Enter url ..."
            className="w-full bg-sidebar-background p-2 rounded-md text-sm"
          />
          {state?.error &&
            state.error.map((err) => (
              <p key={err.code} className="text-red-500 text-sm">
                {err.message}
              </p>
            ))}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Analyzing summary..." : "Add story"}
          </Button>
        </div>
      </form>
    </div>
  );
}
