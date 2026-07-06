import { statusConfig } from "@/lib/data/status-data";
import { WorkItemStatus } from "@/types";

export default function StatsCard({
  status,
  count,
}: {
  status: WorkItemStatus | "total";
  count: string;
}) {
  const IconComponent = statusConfig[status].icon;
  return (
    <div
      className={`px-3 py-2 border border-border rounded-lg flex items-center gap-2`}
    >
      <div className="w-2/3">
        <div className="text-md text-muted-foreground">
          {statusConfig[status].title}
        </div>
        <div className="text-xl">{count}</div>
      </div>
      <div
        className={`w-8 h-8 flex items-center justify-center ${statusConfig[status].color} rounded-xl`}
      >
        {<IconComponent className="w-1/2 h-1/2" />}
      </div>
    </div>
  );
}
