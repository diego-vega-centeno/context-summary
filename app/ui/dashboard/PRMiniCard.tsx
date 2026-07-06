import { WorkItemDashboardType } from "@/types";
import Link from "next/link";

export default function PRMiniCard({ pr }: { pr: WorkItemDashboardType }) {
  return (
    <Link
      href={`stories/${pr.id}`}
      className="text-sm border border-border rounded-lg p-3 hover:bg-hover hover:cursor-pointer"
    >
      <div className="font-medium text-foreground">{pr.title}</div>
      <div className="text-muted-foreground pb-2">
        <div className="pt-2">{`#${pr.pr_number} - ${pr.repo_name}`}</div>
      </div>
      <hr className="border-border" />
      <div className="pt-2">{pr.current_state}</div>
    </Link>
  );
}
