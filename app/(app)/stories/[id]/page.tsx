"use client";
import { type PRStatus } from "@/types/index";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { status_data, prs, useDebounce } from "@/lib/data/status-data";
import { dummyPRs } from "@/lib/data/dummy-data";
import PRCard from "@/components/ui/PRCard";

const status = ["total", "open", "stale", "merged", "closed"];

export default function Page() {
  return (
    <main className="flex flex-1 flex-col justify-between p-6 px-20 max-w-6xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
              Stories
            </h1>
            <h2 className="text-muted-foreground text-sm">Last synced</h2>
          </div>
        </div>
        <div className="w-full flex gap-3 mb-8 flex-wrap"></div>
      </div>
    </main>
  );
}
