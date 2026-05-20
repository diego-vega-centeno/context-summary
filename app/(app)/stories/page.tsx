import { fetchDashboardPRs } from "@/lib/data/prs";
import StoriesClientPage from "@/app/ui/stories/StoriesClientPage";


export default async function StoriesPage() {
  const userId = "7f759600-988e-4a81-9878-439523293021";
  const dashboardPRs = await fetchDashboardPRs(userId);

  return <StoriesClientPage initialPrs={dashboardPRs} />;
}
