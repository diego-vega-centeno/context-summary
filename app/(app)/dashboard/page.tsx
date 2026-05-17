import { status_data } from "@/lib/data/status-data";
import { type TrackedPRWithSummary, type PRStatus } from "@/types/index";
import SyncButton from "@/components/ui/SyncButton";
import Link from "next/link";
import { fetchTrackedPRs } from "@/lib/data/prs";
// import { dummyPRs } from "@/lib/data/dummy-data";

const columns = ["open", "stale", "merged", "closed"];

function StatsCard({ status }: { status: PRStatus | "total" }) {
  const IconComponent = status_data[status].icon;
  return (
    <div
      className={`px-3 py-2 border border-border rounded-lg flex items-center gap-2`}
    >
      <div className="w-2/3">
        <div className="text-md text-muted-foreground">
          {status_data[status].title}
        </div>
        <div className="text-xl">{status_data[status].length}</div>
      </div>
      <div
        className={`w-8 h-8 flex items-center justify-center ${status_data[status].color} rounded-xl`}
      >
        {<IconComponent className="w-1/2 h-1/2" />}
      </div>
    </div>
  );
}

function PRMiniCard(pr: TrackedPRWithSummary) {
  return (
    <Link
      href={`stories/${pr.id}`}
      key={pr.id}
      className="text-sm border border-border rounded-lg p-3 hover:bg-hover hover:cursor-pointer"
    >
      <div className="font-medium text-foreground">{pr.title}</div>
      <div className="text-muted-foreground pb-2">
        <div className="pt-2">{`#${pr.pr_number} - ${pr.repo_name}`}</div>
      </div>
      <hr className="border-border" />
      <div className="pt-2">{pr.summary?.summary_json.current_state}</div>
    </Link>
  );
}

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
          {["total", ...columns].map((status) => (
            <div key={status}>
              <StatsCard status={status as PRStatus | "total"} />
            </div>
          ))}
        </div>
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
              {prs[status as PRStatus].map((pr) => PRMiniCard(pr))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
