"use client";
import { useEffect } from "react";
import logger from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-secondary px-4 py-2 text-sm text-white transition-colors hover:bg-secondary/50"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
