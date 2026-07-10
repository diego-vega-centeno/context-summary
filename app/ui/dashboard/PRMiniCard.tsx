import { WorkItemDashboardType } from "@/types";
import Link from "next/link";

export default function PRMiniCard({ pr }: { pr: WorkItemDashboardType }) {
  return (
    <Link
      href={`stories/${pr.id}`}
      className="flex flex-col space-y-2 text-sm border border-border rounded-lg p-3 hover:bg-hover hover:cursor-pointer"
    >
      <div className="font-medium text-foreground">{pr.title}</div>
      <hr className="border-border" />
      <div>
        <div className="text-muted-foreground text-white">{pr.author}</div>
        <div className="text-muted-foreground">
          {`#${pr.external_id} - ${pr.container}`}
        </div>
      </div>
      <hr className="border-border" />
      <div>{pr.current_state}</div>
    </Link>
  );
}
