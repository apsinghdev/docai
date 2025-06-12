import { CohereEmbeddings } from "@langchain/cohere";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

// Initialize embeddings
const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-english-v3.0",
});

// Function to load and process document content
export async function processDocument(content: string, documentName?: string) {
  try {
    // 1. Split the text into chunks

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.createDocuments([content]);

    // 2. Generate embeddings for each chunk
    const embeddingsList = await Promise.all(
      docs.map(async (doc) => {
        const embedding = await embeddings.embedQuery(doc.pageContent);
        return {
          content: doc.pageContent,
          embedding,
          name: documentName || "unnamed-document",
        };
      })
    );
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
}
