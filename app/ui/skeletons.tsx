import { statusConfig } from "@/lib/data/status-data";
import { PRStatus } from "@/types";
import SyncButton from "./SyncButton";

const columns: PRStatus[] = ["open", "stale", "merged", "closed"];
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-500/20 before:to-transparent";

export function DashboardStatusSkeleton() {
  return (
    <>
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
                className={`inline-block border rounded-xl ${statusConfig[status].color} px-3 py-1 text-sm`}
              >
                {status}
              </div>
            </div>
            <div
              className={`${shimmer} relative overflow-hidden text-sm border border-border rounded-lg p-3 h-40`}
            />
            <div
              className={`${shimmer} relative overflow-hidden text-sm border border-border rounded-lg p-3 h-40`}
            />
            <div
              className={`${shimmer} relative overflow-hidden text-sm border border-border rounded-lg p-3 h-40`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function DashboardCountSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Dashboard
          </h1>
          <h2 className="text-muted-foreground text-sm">Last synced</h2>
        </div>
        <SyncButton text="Sync all" />
      </div>
      <div
        className={` grid md:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] grid-cols-2 gap-2`}
      >
        {["total", ...columns].map((status) => {
          return (
            <div
              key={status}
              className={`${shimmer} relative overflow-hidden px-3 py-2 border border-border rounded-lg flex items-center gap-2 h-[70px]`}
            ></div>
          );
        })}
      </div>
    </>
  );
}
