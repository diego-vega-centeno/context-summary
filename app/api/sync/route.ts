import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (
    req.headers.get("authorization") !== `Bearer ${process.env.SYNC_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json({
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
