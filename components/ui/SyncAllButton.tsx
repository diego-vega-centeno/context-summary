'use client'
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function SyncAllButton() {
  const [refreshing, setRefreshing] = useState(false);

  async function refreshPRs() {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setRefreshing(false);
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md text-foreground hover:bg-highlight hover:text-foreground h-8 px-2 border-1 border-border ${refreshing ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={refreshing}
      onClick={refreshPRs}
    >
      <RefreshCw className={`h-2/3 mr-1 ${refreshing ? "animate-spin" : ""}`} />
      Sync all
    </button>
  );
}
