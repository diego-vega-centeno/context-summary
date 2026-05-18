import { fetchTrackedPRs } from "@/lib/data/prs";
import { statusConfig } from "@/lib/data/status-data";
import { PRStatus } from "@/types";
import PRMiniCard from "./PRMiniCard";

const columns: PRStatus[] = ["open", "stale", "merged", "closed"];

export default async function DashboardStatus() {
  const userId = "7f759600-988e-4a81-9878-439523293021";
  const trackedPRs = await fetchTrackedPRs(userId);

  const prs = {
    open: trackedPRs.filter((pr) => pr.status === "open"),
    merged: trackedPRs.filter((pr) => pr.status === "merged"),
    closed: trackedPRs.filter((pr) => pr.status === "closed"),
    stale: trackedPRs.filter((pr) => pr.status === "stale"),
  };

  return (
    <>
      <h2 className="pt-8 max-w-xs text-3xl font-semibold leading-10 tracking-tight">
        Status board
      </h2>
      <div className="py-4 text-sm text-muted-foreground">
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
