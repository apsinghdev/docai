import { CohereEmbeddings } from "@langchain/cohere";
import { Document } from "langchain/document";
import { vectorStore } from "./memoryStore";

const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-english-v3.0"
});

export async function searchRelevantContext(query: string, topK = 3) {
    const queryEmbedding = await embeddings.embedQuery(query);
    console.log("queryEmbedding", queryEmbedding);
  if (!vectorStore) throw new Error("Vector store not initialized");

  // 1. Generate query embedding
  console.log("Generating embedding for query:", query);
  
  // 2. Perform similarity search
  const results = await vectorStore.similaritySearch(queryEmbedding, topK);

  console.log("Results:", results);
  
  // 3. Extract relevant context
  const context = results.map((doc: Document, i: number) => ({
    rank: i + 1,
    content: doc.pageContent,
    metadata: doc.metadata,
    score: doc.metadata?.score // If using scored results
  }));
  
  // 4. Log the context
  console.log("Retrieved context:\n", JSON.stringify(context, null, 2));
  
  return context;
}