import { Suspense } from "react";
import DashboardCount from "@/app/ui/dashboard/DashboardCount";
import DashboardStatus from "@/app/ui/dashboard/DashboardStatus";
import { DashboardStatusSkeleton } from "@/app/ui/skeletons";

export default async function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col justify-between p-6 max-w-6xl mx-auto">
      <div>
        <DashboardCount />
        <Suspense fallback={<DashboardStatusSkeleton />}>
          <DashboardStatus />
        </Suspense>
      </div>
    </main>
  );
}
