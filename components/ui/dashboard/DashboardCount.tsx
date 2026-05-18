import SyncButton from "@/components/ui/SyncButton";
import StatsCard from "./StatsCard";
import { PRStatus } from "@/types";
import { fetchStatusCounts } from "@/lib/data/prs";

const columns = ["total", "open", "stale", "merged", "closed"];

export default async function DashboardCount() {
  const statusCounts = await fetchStatusCounts(
    "7f759600-988e-4a81-9878-439523293021",
  );
  const countMap: Partial<Record<PRStatus | "total", string>> = {};
  let totalCount = 0;

  statusCounts.forEach((pr) => {
    if (columns.includes(pr.status)) {
      countMap[pr.status as PRStatus | "total"] = pr.count;
      totalCount += pr.count;
    }
  });
  countMap["total"] = totalCount.toString();

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Dashboard
          </h1>
          <h2 className="text-muted-foreground text-sm">Last synced</h2>
        </div>
        <SyncButton text="Sync all" />
      </div>
      <div className="grid md:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] grid-cols-2 gap-2">
        {columns.map((status) => {
          const count =
            status in countMap ? countMap[status as PRStatus | "total"] : "0";
          return (
            <div key={status}>
              <StatsCard
                status={status as PRStatus | "total"}
                count={count as string}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
