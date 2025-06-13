import fs from 'fs/promises';
import path from 'path';
import { Document } from "langchain/document";

const STORAGE_DIR = path.join(process.cwd(), 'storage');

interface DocumentWithEmbedding extends Document {
  embedding: number[];
}

export class FileStorage {
  private async ensureStorageDir() {
    try {
      await fs.access(STORAGE_DIR);
    } catch {
      await fs.mkdir(STORAGE_DIR, { recursive: true });
    }
  }

  async saveDocuments(docId: string, documents: DocumentWithEmbedding[]) {
    await this.ensureStorageDir();
    const filePath = path.join(STORAGE_DIR, `${docId}.json`);
    await fs.writeFile(filePath, JSON.stringify(documents, null, 2));
  }

  async getDocuments(docId: string): Promise<DocumentWithEmbedding[]> {
    try {
      const filePath = path.join(STORAGE_DIR, `${docId}.json`);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getAllDocuments(): Promise<DocumentWithEmbedding[]> {
    await this.ensureStorageDir();
    try {
      const files = await fs.readdir(STORAGE_DIR);
      const allDocs: DocumentWithEmbedding[] = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const data = await fs.readFile(path.join(STORAGE_DIR, file), 'utf-8');
          const docs = JSON.parse(data);
          allDocs.push(...docs);
        }
      }
      
      return allDocs;
    } catch {
      return [];
    }
  }

  async deleteDocuments(docId: string) {
    try {
      const filePath = path.join(STORAGE_DIR, `${docId}.json`);
      await fs.unlink(filePath);
    } catch {
      // Ignore if file doesn't exist
    }
  }
}

export const fileStorage = new FileStorage(); 