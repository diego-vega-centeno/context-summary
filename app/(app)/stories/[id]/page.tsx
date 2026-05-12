import Button from "@/components/ui/Button";
import { ArrowLeft, GitPullRequest, ExternalLink } from "lucide-react";
import { dummyPRs } from "@/lib/data/dummy-data";
import { status_data } from "@/lib/data/status-data";
import SyncButton from "@/components/ui/SyncButton";
import { type TrackedPRWithSummary } from "@/types/index";
import { formatRelativeDate } from "@/lib/data/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

function PRMainSection({ pr }: { pr: TrackedPRWithSummary }) {
  return (
    <div className="p-5 border-1 border-border rounded-lg w-full">
      <div className="flex justify-between text-sm items-center py-2">
        <div className="flex gap-2 items-center">
          <div
            className={`inline-block border-1 rounded-xl ${status_data[pr.status].color} px-3 py-1 text-xs`}
          >
            {pr.status}
          </div>
          <div className="text-muted-foreground">
            Last activity {formatRelativeDate(pr.last_activity_at)}
          </div>
        </div>
        <Link
          href={`https://github.com/${pr.repo_owner}/${pr.repo_name}/pull/${pr.pr_number}`}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <span>View on Github</span> <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
      <h2 className="text-2xl font-semibold">{pr.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 text-sm py-3">
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">Repository</div>
            <div className="font-bold">{pr.repo_name}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">PR Number</div>
            <div className="font-bold">#{pr.pr_number}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">Author</div>
            <div className="font-bold">{pr.author}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="text-muted-foreground">Last activity</div>
            <div className="font-bold">{pr.repo_name}</div>
          </div>
        </div>
      </div>
      <hr className="text-border my-2" />
      <div className="flex flex-col">
        <div className="text-muted-foreground">Summary</div>
        <div className="">{pr.summary?.summary_json.one_liner}</div>
      </div>
    </div>
  );
}

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  const pr = dummyPRs.find((pr) => pr.id === id);

  if (!pr) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen gap-4">
        <GitPullRequest className="w-12 h-12 text-muted-foreground/40" />
        <h2 className="text-foreground">PR not found</h2>
        <Button variant="withIcon" href="/stories">
          <ArrowLeft className="w-4 h-4" />
          Back to PR Stories
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-between p-6 px-20 min-w-md max-w-4xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-3">
          <Button href={"/stories"} variant="withIcon" icon={ArrowLeft}>
            PR stories
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Synced</span>
            <SyncButton text="Refresh" />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <PRMainSection pr={pr} />
        </div>
      </div>
    </div>
  );
}
