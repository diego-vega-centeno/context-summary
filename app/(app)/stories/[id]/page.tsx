import StoryBoard from "@/app/ui/stories-id/StoryBoard";
import { StoryBoardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={<StoryBoardSkeleton />}>
      <StoryBoard id={id} />
    </Suspense>
  );
}
