"use client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { syncPR } from "@/lib/actions/pr";
import { toast } from "sonner";
import { success } from "zod";

export default function SyncButton({
  prId,
  text,
}: {
  prId: string | string[];
  text: string;
}) {
  const [refreshing, setRefreshing] = useState(false);

  async function refreshPRs() {
    setRefreshing(true);
    let result;
    if (Array.isArray(prId)) {
      const promiseResults = await Promise.all(prId.map((id) => syncPR(id)));
      result = { success: true, data: promiseResults };
    } else {
      result = await syncPR(prId);
    }
    if (result?.success) {
      toast.success("Summary updated!", { duration: 2000 });
    } else {
      toast(result.error, {
        action: {
          label: "Close",
          onClick: () => null,
        },
      });
    }
    setRefreshing(false);
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md text-foreground hover:bg-highlight hover:text-foreground h-8 px-2 border-1 border-border ${refreshing ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={refreshing}
      onClick={refreshPRs}
    >
      <RefreshCw
        className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
      />
      {text}
    </button>
  );
}
