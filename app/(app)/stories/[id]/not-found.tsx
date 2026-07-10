import { ArrowLeft, GitPullRequest } from "lucide-react";
import Button from "@/app/ui/Button";

export default function NotFound() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen gap-4">
      <GitPullRequest className="w-12 h-12 text-muted-foreground/40" />
      <h2 className="text-foreground">Story not found</h2>
      <Button variant="withIcon" href="/stories">
        <ArrowLeft className="w-4 h-4" />
        Back to Stories
      </Button>
    </div>
  );
}
