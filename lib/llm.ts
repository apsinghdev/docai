import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

// Initialize Gemini
const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.0-flash",
  temperature: 0.3,
  maxOutputTokens: 1024,
});

// Context-aware prompt template
const prompt = PromptTemplate.fromTemplate(`
Use the following context to answer the question at the end.
If you don't know the answer, say "I couldn't find that information". but, Please make sure in most cases the user gets the answer from the context.

Also, add 1-2 lines on your own that you think would be helpful to the user.

Context:
{context}

Question: {question}

Answer in markdown format with clear sections where applicable.
`);

export async function answerQuestion(context: string, question: string) {
  console.log("context", context);
  console.log("question", question);
  const formattedPrompt = await prompt.format({ context, question });
  console.log("formattedPrompt", formattedPrompt);
  const response = await llm.invoke(formattedPrompt);
  console.log("response", response);
  return typeof response === "string" ? response : response.content ?? String(response);
}