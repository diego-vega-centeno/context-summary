import { fetchDashboardPRs } from "@/lib/data/prs";
import StoriesClientPage from "@/app/ui/stories/StoriesClientPage";
import { Suspense } from "react";
import { StoriesClientPageSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories",
};

export default async function StoriesPage() {
  return (
    <div>
      {/* <StoriesClientPageSkeleton /> */}
      <Suspense fallback={<StoriesClientPageSkeleton />}>
        <StoriesClientPageWrapper />
      </Suspense>
    </div>
  );
}

async function StoriesClientPageWrapper() {
  const session = await auth();
  if (!session) return <div>Not logged in</div>;
  const dashboardPRs = await fetchDashboardPRs(session.user?.id!);
  return <StoriesClientPage initialPrs={dashboardPRs} />;
}
