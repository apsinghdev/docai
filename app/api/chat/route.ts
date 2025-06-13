import { NextRequest, NextResponse } from "next/server";
import { searchRelevantContext } from "@/lib/search";
import { answerQuestion } from "@/lib/llm";

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  console.log(query);
  const context = await searchRelevantContext(query);
  console.log("the relevant context is", context);
  const contextString = context.map(c => c.content).join("\n\n");
  const answer = await answerQuestion(contextString, query);
  return NextResponse.json({ message: answer });
}