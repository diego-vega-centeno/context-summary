import Button from "@/components/ui/Button";
import { ArrowLeft, GitPullRequest, Hammer } from "lucide-react";
import { dummyPRs } from "@/lib/data/dummy-data";
import SyncButton from "@/components/ui/SyncButton";
import { formatRelativeDate } from "@/lib/data/utils";
import PRMainSection from "@/components/ui/PRMainSection";
import StorySection from "@/components/ui/StorySection";

interface Props {
  params: Promise<{ id: string }>;
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
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-3">
          <Button href={"/stories"} variant="withIcon" icon={ArrowLeft}>
            PR stories
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">
              Synced <span>{formatRelativeDate(pr.last_synced_at)}</span>
            </span>
            <SyncButton text="Refresh" />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <PRMainSection pr={pr} />
        </div>
        <StorySection
          title="What was being built and why"
          content={
            <div className="space-y-2">
              <div className="text-md font-semibold">
                {pr.summary?.summary_json.what_was_built.summary}</div>
              <div className="text-muted-foreground">
                {pr.summary?.summary_json.what_was_built.context}</div>
            </div>
          }
          icon={<Hammer className="h-4 w-4"/>}
          accent="bg-blue-300 dark:bg-blue-950 text-blue-900 dark:text-blue-400"
        />
      </div>
    </div>
  );
}
