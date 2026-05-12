import { type TrackedPRWithSummary } from "@/types/index";
import { Clock, RefreshCw } from "lucide-react";
import { status_data, formatRelativeDate } from "@/lib/data/status-data";

interface PRCardProps {
  pr: TrackedPRWithSummary;
  refreshingPR: string | null;
  refreshPR: (id: string) => Promise<void>;
}

export default function PRCard({ pr, refreshingPR, refreshPR }: PRCardProps) {
  const IconComponent = status_data[pr.status].icon;
  return (
    <div
      key={pr.id}
      className="text-sm border-1 border-border rounded-lg p-4 hover:bg-hover hover:cursor-default"
    >
      <div className="flex justify-between">
        <div
          className={`inline-flex items-center border-1 rounded-xl ${status_data[pr.status].color} px-2 mb-2 text-sm`}
        >
          <IconComponent className="inline-block w-6 pr-2" />
          <span>{pr.status}</span>
        </div>
        <div>
          <button
            aria-label={`Refresh PR ${pr.pr_number}`}
            disabled={refreshingPR === pr.id}
            onClick={() => refreshPR(pr.id)}
            className={`hover:bg-highlight rounded-full p-1.5 ${refreshingPR === pr.id ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshingPR === pr.id ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>
      <div className="font-medium text-foreground">{pr.title}</div>
      <div className="">
        <div className="py-2 text-muted-foreground">{`${pr.repo_owner}/${pr.repo_name} \u00B7 #${pr.pr_number} \u00B7 ${pr.author}`}</div>
      </div>
      <div className="text-foreground py-2">
        {pr.summary?.summary_json.current_state}
      </div>
      <hr className="border-border" />
      <div className="flex items-center pt-2 text-xs text-muted-foreground">
        <Clock className="inline-block mr-2 w-4" />
        <span>Last activity {formatRelativeDate(pr.last_activity_at)}</span>
      </div>
    </div>
  );
}
