import { statusConfig } from "@/lib/data/status-data";
import { WorkItemStatus } from "@/types";
import { ArrowLeft, Plus, RefreshCw } from "lucide-react";
import Button from "./Button";

const status: WorkItemStatus[] = ["open", "stale", "merged", "closed"];
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
        {status.map((status) => (
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
      </div>
      <div
        className={` grid md:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] grid-cols-2 gap-2`}
      >
        {["total", ...status].map((status) => {
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

export function StoriesClientPageSkeleton() {
  return (
    <main className="flex flex-1 flex-col justify-between p-6 px-20 max-w-6xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
              Stories
            </h1>
            <h2 className="text-muted-foreground text-sm">Last synced</h2>
          </div>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-md hover:bg-highlight hover:text-foreground h-7 px-2 border-1 border-border bg-foreground text-background`}
          >
            <Plus className="w-5 h-5 mr-1" />
            Add story
          </button>
        </div>
        <div className="w-full flex gap-3 mb-8 flex-wrap">
          <input
            placeholder="Search stories ..."
            className="min-w-full md:min-w-40 w-3/8 bg-sidebar-background p-2 rounded-md text-sm"
            type="text"
          />
          {["total", ...status].map((status) => (
            <div
              className="min-h-9 flex items-center gap-2 px-2 rounded-xl text-sm hover:cursor-pointer border-1 border-border font-semibold"
              key={status}
            >
              <span>{status}</span>
              <div className="inline-flex items-center justify-center rounded-full bg-muted-background w-6 h-6 text-white text-xs ml-2">
                0
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <div className={"flex flex-col gap-2"}>
            <div
              className={`${shimmer} relative overflow-hidden w-full h-[200px] border-1 border-border rounded-lg`}
            />
            <div
              className={`${shimmer} relative overflow-hidden w-full h-[200px] border-1 border-border rounded-lg`}
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <div
              className={`${shimmer} relative overflow-hidden w-full h-[200px] border-1 border-border rounded-lg`}
            />
            <div
              className={`${shimmer} relative overflow-hidden w-full h-[200px] border-1 border-border rounded-lg`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export function StoryBoardSkeleton() {
  return (
    <div className="flex flex-1 flex-col justify-between p-6 px-20 min-w-md max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-3">
          <Button href={"/stories"} variant="withIcon" icon={ArrowLeft}>
            Stories
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">Synced</span>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md text-foreground hover:bg-highlight hover:text-foreground h-8 px-2 border-1 border-border"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div
            className={`${shimmer} relative overflow-hidden p-5 border-1 border-border rounded-lg w-full h-[250px]`}
          ></div>
        </div>
      </div>
    </div>
  );
}
