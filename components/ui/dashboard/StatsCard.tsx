import { status_data } from "@/lib/data/status-data";
import { PRStatus } from "@/types";

export default function StatsCard({
  status,
  count,
}: {
  status: PRStatus | "total";
  count: string;
}) {
  const IconComponent = status_data[status].icon;
  return (
    <div
      className={`px-3 py-2 border border-border rounded-lg flex items-center gap-2`}
    >
      <div className="w-2/3">
        <div className="text-md text-muted-foreground">
          {status_data[status].title}
        </div>
        <div className="text-xl">{count}</div>
      </div>
      <div
        className={`w-8 h-8 flex items-center justify-center ${status_data[status].color} rounded-xl`}
      >
        {<IconComponent className="w-1/2 h-1/2" />}
      </div>
    </div>
  );
}
