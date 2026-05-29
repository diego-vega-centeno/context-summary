import { type PRDashboardType } from "@/types/index";
import { Clock, RefreshCw } from "lucide-react";
import { statusConfig } from "@/lib/data/status-data";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";

interface PRCardProps {
  pr: PRDashboardType;
  refreshingPR: string | null;
  refreshPR: (id: string) => Promise<void>;
}

export default function PRCard({ pr, refreshingPR, refreshPR }: PRCardProps) {
  const IconComponent = statusConfig[pr.status].icon;
  return (
    <Link href={`stories/${pr.id}`}>
      <div
        key={pr.id}
        className="text-sm border-1 border-border rounded-lg p-4 hover:bg-hover hover:cursor-default"
      >
        <div className="flex justify-between">
          <div
            className={`inline-flex items-center border-1 rounded-xl ${statusConfig[pr.status].color} px-2 mb-2 text-sm`}
          >
            <IconComponent className="inline-block w-6 pr-2" />
            <span>{pr.status}</span>
          </div>
          <div>
            <button
              aria-label={`Refresh PR ${pr.pr_number}`}
              disabled={refreshingPR === pr.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                refreshPR(pr.id);
              }}
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
          {pr.current_state}
        </div>
        <hr className="border-border" />
        <div className="flex items-center pt-2 text-xs text-muted-foreground">
          <Clock className="inline-block mr-2 w-4" />
          <span>Last activity {formatRelativeDate(pr.last_activity_at.toString())}</span>
        </div>
      </div>
    </Link>
  );
}
