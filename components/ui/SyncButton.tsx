"use client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function SyncButton({ text }) {
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
      <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
      {text}
    </button>
  );
}
