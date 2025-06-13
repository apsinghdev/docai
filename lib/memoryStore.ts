import { Document } from "langchain/document";
import { fileStorage } from "./fileStorage";

type Embedding = number[];

interface DocumentWithEmbedding extends Document {
  embedding: number[];
}

export class MemoryVectorStore {
  private static instance: MemoryVectorStore;

  private constructor() {}

  static getInstance(): MemoryVectorStore {
    if (!MemoryVectorStore.instance) {
      MemoryVectorStore.instance = new MemoryVectorStore();
    }
    return MemoryVectorStore.instance;
  }

  // Add document chunks with embeddings
  async addDocuments(
    docId: string,
    documents: DocumentWithEmbedding[]
  ): Promise<void> {
    const docChunks = documents.map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        timestamp: Date.now(),
      },
    }));

    console.log("docChunks", docChunks);
    await fileStorage.saveDocuments(docId, docChunks);
    console.log("docs stored successfully 🔥🚀");
  }

  // Semantic search across all documents
  async similaritySearch(
    queryEmbedding: Embedding,
    k: number = 4
  ): Promise<DocumentWithEmbedding[]> {
    const allChunks = await fileStorage.getAllDocuments();
    console.log("allChunks", allChunks);
    
    // Calculate cosine similarity (optimized for memory)
    const scoredChunks = allChunks.map((chunk) => {
      const similarity = this.cosineSimilarity(queryEmbedding, chunk.embedding);
      return { ...chunk, score: similarity };
    });

    console.log("scoredChunks", scoredChunks);

    // Return top-k most relevant chunks
    return scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(({ score, ...rest }) => rest); // Remove score from final output
  }

  // Memory-efficient cosine similarity calculation
  private cosineSimilarity(a: Embedding, b: Embedding): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Optional cleanup of old documents
  async cleanupOlderThan(maxAgeHours: number): Promise<void> {
    const allDocs = await fileStorage.getAllDocuments();
    const cutoff = Date.now() - maxAgeHours * 60 * 60 * 1000;
    
    // Group documents by docId
    const docsByDocId = new Map<string, DocumentWithEmbedding[]>();
    for (const doc of allDocs) {
      const docId = doc.metadata.docId as string;
      if (!docsByDocId.has(docId)) {
        docsByDocId.set(docId, []);
      }
      docsByDocId.get(docId)?.push(doc);
    }

    // Delete old documents
    for (const [docId, docs] of docsByDocId.entries()) {
      if (docs[0].metadata.timestamp < cutoff) {
        await fileStorage.deleteDocuments(docId);
      }
    }
  }
}

export const vectorStore = MemoryVectorStore.getInstance();