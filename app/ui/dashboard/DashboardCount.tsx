import SyncButton from "@/app/ui/SyncButton";
import StatsCard from "./StatsCard";
import { WorkItemStatus } from "@/types";
import { fetchStatusCounts } from "@/lib/data/prs";
import { auth } from "@/auth";

const columns = ["total", "open", "stale", "merged", "closed"];

export default async function DashboardCount() {
  const session = await auth();
  if (!session) return <div>Not logged in</div>;

  const statusCounts = await fetchStatusCounts(session.user?.id!);
  const countMap: Partial<Record<WorkItemStatus | "total", string>> = {};
  statusCounts.forEach((pr) => {
    if (columns.includes(pr.status)) {
      countMap[pr.status as WorkItemStatus | "total"] = pr.count;
    }
  });

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Dashboard
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] grid-cols-2 gap-2">
        {columns.map((status) => {
          const count =
            status in countMap ? countMap[status as WorkItemStatus | "total"] : "0";
          return (
            <div key={status}>
              <StatsCard
                status={status as WorkItemStatus | "total"}
                count={count as string}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
