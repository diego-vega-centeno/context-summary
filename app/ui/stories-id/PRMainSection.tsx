import { ExternalLink } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";
import { statusConfig } from "@/lib/data/status-data";
import { type TrackedWorkItemWithSummary } from "@/types/index";
import Link from "next/link";

export default function PRMainSection({ pr }: { pr: TrackedWorkItemWithSummary }) {
;
  return (
    <div className="p-5 border-1 border-border rounded-lg w-full">
      <div className="flex justify-between text-sm items-center py-2">
        <div className="flex gap-2 items-center">
          <div
            className={`inline-block border-1 rounded-xl ${statusConfig[pr.status].color} px-3 py-1 text-xs`}
          >
            {pr.status}
          </div>
          <div className="text-muted-foreground">
            Last activity {formatRelativeDate(pr.last_activity_at.toString())}
          </div>
        </div>
        <Link
          href={`https://github.com/${pr.repo_owner}/${pr.repo_name}/pull/${pr.pr_number}`}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span>View on Github</span> <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
      <h2 className="text-2xl font-semibold">{pr.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 text-sm py-3">
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">Repository</div>
            <div className="font-bold">{pr.repo_name}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">PR Number</div>
            <div className="font-bold">#{pr.pr_number}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">Author</div>
            <div className="font-bold">{pr.author}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">Last activity</div>
            <div className="font-bold">{pr.last_activity_at.toLocaleDateString()}</div>
          </div>
        </div>
      </div>
      <hr className="text-border my-2" />
      <div className="flex flex-col">
        <div className="text-muted-foreground">Summary</div>
        <div className="">{pr.summary?.summary_json.one_liner}</div>
      </div>
    </div>
  );
}
