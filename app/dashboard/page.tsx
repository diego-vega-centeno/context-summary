import { getPRsByStatus, dummyPRs } from "@/lib/data/dummy-data";
import {
  GitPullRequest,
  GitMerge,
  SquareDot,
  TriangleAlert,
  RefreshCw,
} from "lucide-react";
import type { TrackedPRWithSummary } from "@/types/index.ts";
import Button from "@/components/ui/Button";

const total_prs_length = dummyPRs.length;

const status_config = {
  total: { title: "total", icon: GitPullRequest, color: "text-grey-700" },
  open: { title: "open", icon: GitPullRequest, color: "text-green-700" },
  merged: { title: "merged", icon: GitMerge, color: "text-purple-700" },
  closed: { title: "closed", icon: SquareDot, color: "text-grey-700" },
  stale: { title: "stale", icon: TriangleAlert, color: "text-yellow-700" },
};

function StatsCard({
  value,
  config,
}: {
  value: number;
  config: Record<string, any>;
}) {
  return (
    <div
      className={`p-3 border-1 border-border rounded-lg flex items-center gap-2`}
    >
      <div className="w-2/3">
        <div className="text-lg text-muted-foreground">{config.title}</div>
        <div className="text-xl">{value}</div>
      </div>
      <div
        className={`w-10 h-10 flex items-center justify-center ${config.color} bg-muted-background rounded-xl`}
      >
        {<config.icon className="w-1/2 h-1/2" />}
      </div>
    </div>
  );
}

function PRMiniCard(pr: TrackedPRWithSummary) {
  return (
    <div className="text-sm border-1 border-border rounded-lg p-3 hover:bg-hover hover:cursor-pointer">
      <div className="font-medium text-foreground">{pr.title}</div>
      <div className="text-muted-foreground pb-2">
        <div className="py-2">{`#${pr.pr_number} - ${pr.repo_name}`}</div>
      </div>
      <hr className="" />
      <div className="text-muted-foreground pt-2">
        {pr.summary?.summary_json.current_state}
      </div>
    </div>
  );
}

const columns: { status: string; prs: TrackedPRWithSummary[] }[] = [
  { status: "open", prs: getPRsByStatus("open") },
  { status: "stale", prs: getPRsByStatus("stale") },
  { status: "merged", prs: getPRsByStatus("merged") },
  { status: "closed", prs: getPRsByStatus("closed") },
];

export default function Page() {
  return (
    <main className="flex flex-1 h-full w-full flex-col justify-between p-6 max-w-6xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
              Dashboard
            </h1>
            <h2 className="text-muted-foreground text-sm">Last synced</h2>
          </div>
          <Button variant="withIcon" border icon={RefreshCw}>
            Sync all
          </Button>
        </div>
        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] grid-cols-2 gap-2">
          {(
            Object.keys(status_config) as Array<keyof typeof status_config>
          ).map((status) => (
            <div key={status}>
              <StatsCard
                value={
                  status === "total"
                    ? total_prs_length
                    : getPRsByStatus(status).length
                }
                config={status_config[status]}
              />
            </div>
          ))}
        </div>
        <h2 className="pt-8 max-w-xs text-3xl font-semibold leading-10 tracking-tight">
          Status board
        </h2>
        <div className="py-4 text-sm text-muted-foreground">
          click to view full story
        </div>
        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] grid-cols-2 gap-2">
          {columns.map(({ status, prs }) => (
            <div className={"flex flex-col gap-2"} key={status}>
              <div className="border- rounded-md">{status}</div>
              {getPRsByStatus(status).map((pr) => PRMiniCard(pr))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
