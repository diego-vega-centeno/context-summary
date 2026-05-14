import Button from "@/components/ui/Button";
import {
  ArrowLeft,
  GitPullRequest,
  Hammer,
  Lightbulb,
  ShieldAlert,
  Activity,
  ListChecks,
} from "lucide-react";
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
          icon={<Hammer className="h-4 w-4" />}
          accent="bg-blue-300 dark:bg-blue-950 text-blue-900 dark:text-blue-400"
        >
          <div className="space-y-2">
            <div className="text-md font-semibold">
              {pr.summary?.summary_json.what_was_built.summary}
            </div>
            <div className="text-muted-foreground">
              {pr.summary?.summary_json.what_was_built.context}
            </div>
          </div>
        </StorySection>
        <StorySection
          title={`Key decisions (${pr.summary?.summary_json.key_decisions.length})`}
          icon={<Lightbulb className="h-4 w-4" />}
          accent="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
        >
          {pr.summary?.summary_json.key_decisions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No key decisions recorded.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {pr.summary?.summary_json.key_decisions.map((d, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {d.decision}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1 leading-relaxed">
                      {d.context}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Decision by{" "}
                      <span className="font-medium text-foreground">
                        {d.made_by}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </StorySection>
        <StorySection
          title={`Blocking points (${pr.summary?.summary_json.blocking_points.length})`}
          icon={<Lightbulb className="h-4 w-4" />}
          accent="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400"
        >
          {pr.summary?.summary_json.blocking_points.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No blocking points — this PR is unblocked.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {pr.summary?.summary_json.blocking_points.map((b, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-red-500 mt-0.5" />
                    <p className="text-sm font-medium text-foreground">
                      {b.point}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {b.context}
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs">
                    <p className="text-muted-foreground">
                      Waiting on:{" "}
                      <span className="font-medium text-foreground">
                        {b.waiting_on}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      Next step:{" "}
                      <span className="text-foreground">{b.next_step}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </StorySection>
        <StorySection
          title="Current state"
          icon={<Activity className="h-4 w-4" />}
          accent="bg-zinc-900 text-foreground"
        >
          <p className="text-sm text-muted-foreground">
            {pr.summary?.summary_json.current_state}
          </p>
        </StorySection>
        <StorySection
          title={`Suggested next steps (${pr.summary?.summary_json.next_steps.length})`}
          icon={<ListChecks className="h-4 w-4" />}
          accent="bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400"
        >
          {pr.summary?.summary_json.next_steps.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No next steps — this PR may be complete.
            </p>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {pr.summary?.summary_json.next_steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs flex items-center justify-center shrink-0 mt-0.5 font-medium">
                    {i + 1}
                  </span>
                  <span className="text-foreground leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </StorySection>
      </div>
    </div>
  );
}
