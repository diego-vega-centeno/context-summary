"use client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { deletePR } from "@/lib/actions/pr";
import logger from "@/lib/logger";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  prId,
  text,
}: {
  prId: string;
  text: string;
}) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  async function refreshPRs() {
    setRefreshing(true);
    if (window.confirm("Are you sure you want to delete this PR?")) {
      const result = await deletePR(prId);
      if (result?.success === false) {
        logger.error(result.error);
      }
      router.push("/stories");
    }
    setRefreshing(false);
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md text-foreground bg-red-500/50 hover:bg-red-500/80 hover:text-white-500 hover:bg-highlight hover:text-foreground h-8 w-18 px-2 border-1 border-border ${refreshing ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={refreshing}
      onClick={refreshPRs}
    >
      {refreshing ? (
        <RefreshCw
          className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
        />
      ) : (
        text
      )}
    </button>
  );
}
