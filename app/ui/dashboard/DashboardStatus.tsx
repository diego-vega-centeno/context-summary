import { fetchDashboardPRs } from "@/lib/data/prs";
import { statusConfig } from "@/lib/data/status-data";
import { PRStatus } from "@/types";
import PRMiniCard from "./PRMiniCard";
import { auth } from "@/auth";
import SyncButton from "../SyncButton";

const columns: PRStatus[] = ["open", "stale", "merged", "closed"];

export default async function DashboardStatus() {
  const session = await auth();
  if (!session) return <div>Not logged in</div>;
  const dashboardPRs = await fetchDashboardPRs(session.user?.id!);

  const prs = {
    open: dashboardPRs.filter((pr) => pr.status === "open"),
    merged: dashboardPRs.filter((pr) => pr.status === "merged"),
    closed: dashboardPRs.filter((pr) => pr.status === "closed"),
    stale: dashboardPRs.filter((pr) => pr.status === "stale"),
  };

  const syncAllPRs = [...prs["open"], ...prs["stale"]].map((pr) => pr.id);

  return (
    <>
      <h2 className="pt-8 max-w-xs text-3xl font-semibold leading-10 tracking-tight">
        Status board
      </h2>
      <div className="py-2">
        <SyncButton prId={syncAllPRs} text="Sync all" />
      </div>
      <div className="py-1 text-sm text-muted-foreground">
        click to view full story
      </div>
      <div className="grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-2 gap-2">
        {columns.map((status) => (
          <div className={"flex flex-col gap-2"} key={status}>
            <div className="py-2">
              <div
                className={`inline-block border rounded-xl ${statusConfig[status].color} px-3 py-1 text-sm`}
              >
                {status}
              </div>
              <span className="pl-2">{prs[status].length}</span>
            </div>
            {prs[status].map((pr) => (
              <PRMiniCard key={pr.id} pr={pr} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
