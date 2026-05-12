import Button from "@/components/ui/Button";
import { ArrowLeft, GitPullRequest, RefreshCw } from "lucide-react";
import { dummyPRs } from "@/lib/data/dummy-data";
import SyncButton from "@/components/ui/SyncButton";

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
    <main className="flex flex-1 flex-col justify-between p-6 px-20 max-w-6xl mx-auto">
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
        <div className="w-full flex gap-3 mb-8 flex-wrap"></div>
      </div>
    </main>
  );
}
