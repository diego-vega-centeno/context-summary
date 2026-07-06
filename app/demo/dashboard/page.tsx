import { Suspense } from "react";
import { dummyPRs } from "@/lib/data/dummy-data";
import {
  DashboardStatusSkeleton,
  DashboardCountSkeleton,
} from "@/app/ui/skeletons";
import { Metadata } from "next";
import { WorkItemStatus } from "@/types";
import StatsCard from "@/app/ui/dashboard/StatsCard";
import { RefreshCw } from "lucide-react";
import { statusConfig } from "@/lib/data/status-data";
import PRMiniCard from "@/app/ui/dashboard/PRMiniCard";

const columns = ["open", "stale", "merged", "closed"];

(dummyPRs as any).forEach((pr: any) => {
  pr.current_state =
    pr.summary?.summary_json.current_state ?? "No summary available";
});

const prs = {
  total: dummyPRs,
  open: dummyPRs.filter((pr) => pr.status === "open"),
  merged: dummyPRs.filter((pr) => pr.status === "merged"),
  closed: dummyPRs.filter((pr) => pr.status === "closed"),
  stale: dummyPRs.filter((pr) => pr.status === "stale"),
};

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col justify-between p-6 max-w-6xl mx-auto">
      <div>
        <Suspense fallback={<DashboardCountSkeleton />}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
                Dashboard
              </h1>
            </div>
          </div>
          <div className="grid md:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] grid-cols-2 gap-2">
            {["total", "open", "stale", "merged", "closed"].map((status) => (
              <div key={status}>
                <StatsCard
                  status={status as WorkItemStatus | "total"}
                  count={String(prs[status as WorkItemStatus | "total"].length)}
                />
              </div>
            ))}
          </div>
        </Suspense>
        <Suspense fallback={<DashboardStatusSkeleton />}>
          <>
            <h2 className="pt-8 max-w-xs text-3xl font-semibold leading-10 tracking-tight">
              Status board
            </h2>
            <div className="py-2">
              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-md text-foreground hover:bg-highlight hover:text-foreground h-8 px-2 border-1 border-border`}
              >
                <RefreshCw className={`w-4 h-4 mr-2`} />
                Sync all
              </button>
            </div>
            <div className="py-1 text-sm text-muted-foreground">
              click to view full story
            </div>
            <div className="grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-2 gap-2">
              {columns.map((status) => (
                <div className={"flex flex-col gap-2"} key={status}>
                  <div className="py-2">
                    <div
                      className={`inline-block border rounded-xl ${statusConfig[status as WorkItemStatus | "total"].color} px-3 py-1 text-sm`}
                    >
                      {status}
                    </div>
                    <span className="pl-2">
                      {prs[status as WorkItemStatus | "total"].length}
                    </span>
                  </div>
                  {prs[status as WorkItemStatus | "total"].map((pr) => (
                    <PRMiniCard key={pr.id} pr={pr as any} />
                  ))}
                </div>
              ))}
            </div>
          </>
        </Suspense>
      </div>
    </main>
  );
}
