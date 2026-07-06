import {
  GitPullRequest,
  GitMerge,
  SquareDot,
  TriangleAlert,
} from "lucide-react";
import { type WorkItemStatus } from "@/types/index";

const statusConfig: Record<
  WorkItemStatus | "total",
  {
    title: string;
    icon: React.ComponentType<any>;
    color: string;
  }
> = {
  total: {
    title: "Total tracked",
    icon: GitPullRequest,
    color: "bg-gray-700/50 dark:bg-gray-700 border-gray-700",
  },
  open: {
    title: "Open",
    icon: GitPullRequest,
    color: "bg-green-700/50 dark:bg-green-700 border-green-700",
  },
  merged: {
    title: "Merged",
    icon: GitMerge,
    color: "bg-purple-700/50 dark:bg-purple-700 border-purple-700",
  },
  closed: {
    title: "Closed",
    icon: SquareDot,
    color: "bg-zinc-700/50  dark:bg-zinc-600 border-zinc-600",
  },
  stale: {
    title: "Stale",
    icon: TriangleAlert,
    color: "bg-yellow-700/50 dark:bg-yellow-700 border-yellow-700",
  },
};

export { statusConfig };
