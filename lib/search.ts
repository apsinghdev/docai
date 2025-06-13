import { CohereEmbeddings } from "@langchain/cohere";
import { Document } from "langchain/document";
import { vectorStore } from "./memoryStore";

const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-english-v3.0"
});

export async function searchRelevantContext(query: string, topK = 3) {
  if (!vectorStore) throw new Error("Vector store not initialized");
  // 1. Generate query embedding
  const queryEmbedding = await embeddings.embedQuery(query);

  // 2. Perform similarity search
  const results = await vectorStore.similaritySearch(queryEmbedding, topK);
  
  // 3. Extract relevant context
  const context = results.map((doc: Document, i: number) => ({
    rank: i + 1,
    content: doc.pageContent,
    metadata: doc.metadata,
    score: doc.metadata?.score // If using scored results
  }));
  
  return context;
}