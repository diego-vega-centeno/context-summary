import {
  GitPullRequest,
  GitMerge,
  SquareDot,
  TriangleAlert,
} from "lucide-react";
import { type PRStatus } from "@/types/index";
import { getPRsByStatus, dummyPRs } from "@/lib/data/dummy-data";

const prs = {
  open: getPRsByStatus("open"),
  merged: getPRsByStatus("merged"),
  closed: getPRsByStatus("closed"),
  stale: getPRsByStatus("stale"),
};

const status_data: Record<
  PRStatus | "total",
  {
    title: string;
    icon: React.ComponentType<any>;
    color: string;
    length: number;
  }
> = {
  total: {
    title: "total",
    icon: GitPullRequest,
    color: "bg-grey-700/50 dark:bg-grey-700 border-grey-700",
    length: dummyPRs.length,
  },
  open: {
    title: "open",
    icon: GitPullRequest,
    color: "bg-green-700/50 dark:bg-green-700 border-green-700",
    length: prs["open"].length,
  },
  merged: {
    title: "merged",
    icon: GitMerge,
    color: "bg-purple-700/50 dark:bg-purple-700 border-purple-700",
    length: prs["merged"].length,
  },
  closed: {
    title: "closed",
    icon: SquareDot,
    color: "bg-zinc-600/50  dark:bg-zinc-600 border-zinc-600",
    length: prs["closed"].length,
  },
  stale: {
    title: "stale",
    icon: TriangleAlert,
    color: "bg-yellow-700/50 dark:bg-yellow-700 border-yellow-700",
    length: prs["stale"].length,
  },
};

export { status_data, prs };
