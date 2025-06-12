import { NextRequest, NextResponse } from "next/server";
import { searchRelevantContext } from "@/lib/search";

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  console.log(query);
  const context = await searchRelevantContext(query);
  return NextResponse.json({ message: "Hello, world!" });
}