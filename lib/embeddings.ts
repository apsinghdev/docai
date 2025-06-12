import { CohereEmbeddings } from "@langchain/cohere";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { v4 as uuidv4 } from 'uuid';

// Initialize embeddings
const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-english-v3.0",
});

interface ProcessedDocument {
  docId: string;
  chunks: {
    content: string;
    embedding: number[];
  }[];
  sourceName: string;
}

// Function to load and process document content
export async function processDocument(content: string, documentName?: string): Promise<ProcessedDocument> {
  try {
    // 1. Split the text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.createDocuments([content]);

    // 2. Generate embeddings for each chunk
    const chunks = await Promise.all(
      docs.map(async (doc) => {
        const embedding = await embeddings.embedQuery(doc.pageContent);
        return {
          content: doc.pageContent,
          embedding,
        };
      })
    );

    // 3. Return the processed document with required properties
    return {
      docId: uuidv4(), // Generate a unique document ID
      chunks,
      sourceName: documentName || "unnamed-document"
    };
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
}
