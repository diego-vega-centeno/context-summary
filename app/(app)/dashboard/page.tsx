import { Suspense } from "react";
import DashboardCount from "@/app/ui/dashboard/DashboardCount";
import DashboardStatus from "@/app/ui/dashboard/DashboardStatus";
import {
  DashboardStatusSkeleton,
  DashboardCountSkeleton,
} from "@/app/ui/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col justify-between p-6 max-w-6xl mx-auto">
      <div>
        <Suspense fallback={<DashboardCountSkeleton />}>
          <DashboardCount />
        </Suspense>
        <Suspense fallback={<DashboardStatusSkeleton />}>
          <DashboardStatus />
        </Suspense>
      </div>
    </main>
  );
}
