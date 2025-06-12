import { Document } from "langchain/document";

type Embedding = number[];
type DocumentWithEmbedding = Document & {
  embedding: Embedding;
  metadata: {
    docId: string;
    chunkIndex: number;
    sourceName: string;
    timestamp: number;
  };
};

class MemoryVectorStore {
  private static instance: MemoryVectorStore;
  private documents: Map<string, DocumentWithEmbedding[]>; // Key: docId, Value: Chunks

  private constructor() {
    this.documents = new Map();
  }

  static getInstance(): MemoryVectorStore {
    if (!MemoryVectorStore.instance) {
      MemoryVectorStore.instance = new MemoryVectorStore();
    }
    return MemoryVectorStore.instance;
  }

  // Add document chunks with embeddings
  async addDocuments(
    docId: string,
    chunks: { content: string; embedding: Embedding }[],
    sourceName: string
  ): Promise<void> {
    const timestamp = Date.now();
    const docChunks = chunks.map((chunk, index) => ({
      pageContent: chunk.content,
      embedding: chunk.embedding,
      metadata: {
        docId,
        chunkIndex: index,
        sourceName,
        timestamp,
      },
    }));

    this.documents.set(docId, docChunks);
    console.log("docs stored successfully 🔥🚀");
  }

  // Semantic search across all documents
  async similaritySearch(
    queryEmbedding: Embedding,
    k: number = 4
  ): Promise<DocumentWithEmbedding[]> {
    const allChunks = Array.from(this.documents.values()).flat();
    
    // Calculate cosine similarity (optimized for memory)
    const scoredChunks = allChunks.map((chunk) => {
      const similarity = this.cosineSimilarity(queryEmbedding, chunk.embedding);
      return { ...chunk, score: similarity };
    });

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
  cleanupOlderThan(maxAgeHours: number): void {
    const cutoff = Date.now() - maxAgeHours * 60 * 60 * 1000;
    for (const [docId, chunks] of this.documents.entries()) {
      if (chunks[0].metadata.timestamp < cutoff) {
        this.documents.delete(docId);
      }
    }
  }
}

export const vectorStore = MemoryVectorStore.getInstance();