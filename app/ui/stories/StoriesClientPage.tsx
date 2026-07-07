"use client";
import { WorkItemDashboardType, type WorkItemStatus } from "@/types/index";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import PRCard from "@/app/ui/stories/PRCard";
import Link from "next/link";
import { syncPR } from "@/lib/actions/pr";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const status: (WorkItemStatus | "total")[] = [
  "total",
  "open",
  "stale",
  "merged",
  "closed",
];

export default function StoriesClientPage({
  initialPrs,
  demo,
}: {
  initialPrs: WorkItemDashboardType[];
  demo?: boolean;
}) {
  const router = useRouter();
  const [refreshingPR, setRefreshingPR] = useState<null | string>(null);
  const [searchInput, setSearchInput] = useState("");
  const [statusSelected, setStatusSelected] = useState<WorkItemStatus | "total">(
    "total",
  );
  const debouncedSearchInput = useDebounce(searchInput, 300);

  const prs = useMemo(() => {
    return {
      total: initialPrs,
      open: initialPrs.filter((pr) => pr.status === "open"),
      merged: initialPrs.filter((pr) => pr.status === "merged"),
      closed: initialPrs.filter((pr) => pr.status === "closed"),
      stale: initialPrs.filter((pr) => pr.status === "stale"),
    };
  }, [initialPrs]);

  const filteredPRs = useMemo(() => {
    const basePRs =
      statusSelected === "total" ? prs.total : prs[statusSelected];
    if (debouncedSearchInput) {
      const query = debouncedSearchInput.trim().toLowerCase();
      return basePRs.filter(
        (pr) =>
          pr.title.toLowerCase().includes(query) ||
          pr.owner.toLowerCase().includes(query) ||
          pr.container.toLowerCase().includes(query) ||
          pr.author.toLowerCase().includes(query),
      );
    }
    return basePRs;
  }, [statusSelected, debouncedSearchInput, prs]);

  async function refreshPR(id: string) {
    if (demo) return;
    setRefreshingPR(id);
    const result = await syncPR(id);
    if (result?.success) {
      toast.success("Summary updated!", { duration: 2000 });
      router.refresh();
    } else {
      toast(result.error, {
        action: {
          label: "Close",
          onClick: () => null,
        },
      });
    }
    setRefreshingPR(null);
  }

  return (
    <main className="flex flex-1 flex-col justify-between p-6 md:px-20 max-w-6xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
              Stories
            </h1>
            <h2 className="text-muted-foreground text-sm">Last synced</h2>
          </div>
          <Link
            href="/stories/add"
            className={`inline-flex items-center justify-center rounded-md hover:bg-highlight hover:text-foreground h-7 px-2 border-1 border-border bg-foreground text-background`}
          >
            <Plus className="w-5 h-5 mr-1" />
            Add PR
          </Link>
        </div>
        <div className="w-full flex gap-3 mb-8 flex-wrap">
          <input
            placeholder="Search PRs ..."
            className="min-w-full md:min-w-40 w-3/8 bg-sidebar-background p-2 rounded-md text-sm"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {status.map((status) => (
            <div
              className={`min-h-9 flex items-center gap-2 px-2 rounded-xl text-sm hover:cursor-pointer border-1 border-border font-semibold ${statusSelected === status ? "bg-white text-black" : "hover:bg-hover hover:text-white text-muted-foreground"}`}
              key={status}
              onClick={() => setStatusSelected(status as WorkItemStatus)}
            >
              <span>{status}</span>
              <div className="inline-flex items-center justify-center rounded-full bg-muted-background w-6 h-6 text-white text-xs ml-2">
                {prs[status].length}
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          {filteredPRs.map((pr) => (
            <div className={"flex flex-col gap-2"} key={pr.id}>
              <PRCard
                pr={pr}
                refreshingPR={refreshingPR}
                refreshPR={refreshPR}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
