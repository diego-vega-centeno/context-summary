import { status_data } from "@/lib/data/status-data";
import { type PRStatus } from "@/types/index";
import { fetchTrackedPRs } from "@/lib/data/prs";
import { Suspense } from "react";
import PRMiniCard from "@/components/ui/dashboard/PRMiniCard";
import DashboardCount from "@/components/ui/dashboard/DashboardCount";

const columns = ["open", "stale", "merged", "closed"];

export default async function DashboardPage() {
  const userId = "7f759600-988e-4a81-9878-439523293021";
  const trackedPRs = await fetchTrackedPRs(userId);

  const prs = {
    open: trackedPRs.filter((pr) => pr.status === "open"),
    merged: trackedPRs.filter((pr) => pr.status === "merged"),
    closed: trackedPRs.filter((pr) => pr.status === "closed"),
    stale: trackedPRs.filter((pr) => pr.status === "stale"),
  };

  return (
    <main className="flex flex-1 flex-col justify-between p-6 max-w-6xl mx-auto">
      <div>
        <DashboardCount />
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
                  className={`inline-block border rounded-xl ${status_data[status as PRStatus].color} px-3 py-1 text-sm`}
                >
                  {status}
                </div>
                <span className="pl-2">{prs[status as PRStatus].length}</span>
              </div>
              {prs[status as PRStatus].map((pr) => (
                // <Suspense fallback={<PRMiniCardSkeleton/>}><PRMiniCard key={pr.id} pr={pr}/></Suspense>
                <PRMiniCard key={pr.id} pr={pr} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
