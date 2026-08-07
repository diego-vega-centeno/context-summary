import { NextResponse } from "next/server";
import { fetchWorkItemsLastSync } from "@/lib/data/prs";

export async function GET(req: Request) {
  if (
    req.headers.get("authorization") !== `Bearer ${process.env.SYNC_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const workItems = await fetchWorkItemsLastSync();
  const due = workItems.filter((item) => isDue(item));

  return NextResponse.json(
    { data: workItems },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

function isDue(item: { id: string; last_synced_at: Date }) {
  const diff = (item.last_synced_at.getTime() - Date.now()) / 1000;
  return diff >= Number(process.env.SYNC_INTERVAL);
}
