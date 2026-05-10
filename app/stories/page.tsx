"use client";
import { type TrackedPRWithSummary, type PRStatus } from "@/types/index";
import { Plus } from "lucide-react";
import { useState } from "react";
import { status_data, prs } from "@/lib/data/status-data";
import { dummyPRs } from "@/lib/data/dummy-data";

const status = ["total", "open", "stale", "merged", "closed"];

function PRCard(pr: TrackedPRWithSummary) {
  const IconComponent = status_data[pr.status].icon;
  return (
    <div
      key={pr.id}
      className="text-sm border-1 border-border rounded-lg p-3 hover:bg-hover hover:cursor-pointer"
    >
      <div
        className={`inline-flex items-center border-1 rounded-xl ${status_data[pr.status].color} px-2 mb-2 text-sm`}
      >
        <IconComponent className="inline-block w-6 pr-2" />
        <span>{pr.status}</span>
      </div>
      <div className="font-medium text-foreground">{pr.title}</div>
      <div className="text-muted-foreground pb-2">
        <div className="py-2">{`#${pr.pr_number} - ${pr.repo_name}`}</div>
      </div>
      <hr className="" />
      <div className="text-muted-foreground pt-2">
        {pr.summary?.summary_json.current_state}
      </div>
    </div>
  );
}

export default function Page() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [statusSelected, setStatusSelected] = useState<PRStatus | "total">(
    "total",
  );
  const [selectedPRs, setSelectedPRs] = useState(dummyPRs);

  async function refreshPRs() {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setRefreshing(false);
  }

  function handleStatusSelection(status: PRStatus | "total") {
    setStatusSelected(status);
    if (status === "total") setSelectedPRs(dummyPRs);
    else setSelectedPRs(prs[status]);
  }

  return (
    <main className="flex flex-1 flex-col justify-between p-6 max-w-6xl mx-auto">
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
            className={`inline-flex items-center justify-center rounded-md text-foreground hover:bg-highlight hover:text-foreground h-8 px-2 border-1 border-border ${refreshing ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={refreshing}
            onClick={refreshPRs}
          >
            <Plus className="h-2/3 mr-1" />
            Add PR
          </button>
        </div>
        <div className="w-full flex gap-3 mb-8">
          <input
            placeholder="Search PRs ..."
            className="w-3/8 bg-sidebar-background p-2 rounded-md text-sm"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {status.map((status) => (
            <div
              className={`flex items-center gap-2 px-2 rounded-xl text-sm hover:cursor-pointer border-1 border-border font-semibold ${statusSelected === status ? "bg-white text-black" : "hover:bg-hover hover:text-white text-muted-foreground"}`}
              key={status}
              onClick={() => handleStatusSelection(status as PRStatus)}
            >
              <span>{status}</span>
              <div className="inline-flex items-center justify-center rounded-full bg-muted-background w-6 h-6 text-white text-xs ml-2">
                {status_data[status as PRStatus].length}
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
          {selectedPRs.map((pr) => (
            <div className={"flex flex-col gap-2"} key={pr.id}>
              {PRCard(pr)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
