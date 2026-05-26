"use client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { syncPR } from "@/lib/actions/pr";
import logger from "@/lib/logger";

export default function SyncButton({
  prId,
  text,
}: {
  prId: string;
  text: string;
}) {
  const [refreshing, setRefreshing] = useState(false);

  async function refreshPRs() {
    setRefreshing(true);
    const result = await syncPR(prId);
    if (result?.success === false) {
      logger.error(result.error);
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
