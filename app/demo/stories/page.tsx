import { fetchDashboardPRs } from "@/lib/data/prs";
import StoriesClientPage from "@/app/ui/stories/StoriesClientPage";
import { Suspense } from "react";
import { StoriesClientPageSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";
import { Metadata } from "next";
import { dummyPRs } from "@/lib/data/dummy-data";

export const metadata: Metadata = {
  title: "Stories",
};

(dummyPRs as any).forEach((pr: any) => {
  pr.current_state =
    pr.summary?.summary_json.current_state ?? "No summary available";
});

export default async function StoriesPage() {
  return (
    <div>
      <Suspense fallback={<StoriesClientPageSkeleton />}>
        <StoriesClientPageWrapper />
      </Suspense>
    </div>
  );
}

async function StoriesClientPageWrapper() {
  return <StoriesClientPage initialPrs={dummyPRs as any} />;
}
