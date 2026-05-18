import { Suspense } from "react";
import PRMiniCard from "@/components/ui/dashboard/PRMiniCard";
import DashboardCount from "@/components/ui/dashboard/DashboardCount";
import PRMiniCardSkeleton from "@/components/ui/dashboard/PRMiniCardSkeleton";
import DashboardStatus from "@/components/ui/dashboard/DashboardStatus";
import { DashboardStatusSkeleton } from "@/components/ui/skeletons";

export default async function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col justify-between p-6 max-w-6xl mx-auto">
      <div>
        <DashboardCount />
        {/* <Suspense fallback={<DashboardStatusSkeleton />}>
          <DashboardStatus />
        </Suspense> */}
        <DashboardStatusSkeleton />
      </div>
    </main>
  );
}
