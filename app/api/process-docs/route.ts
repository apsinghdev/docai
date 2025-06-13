import { processDocument } from '@/lib/embeddings';
import { vectorStore } from '@/lib/memoryStore';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {

    const { docs } = await request.json();

    // process the doc and generate embeddings
    const {docId, chunks, sourceName} = await processDocument(docs[0].text)

    // Convert chunks to DocumentWithEmbedding format
    const formattedChunks = chunks.map((chunk, idx) => ({
      pageContent: chunk.content,
      embedding: chunk.embedding,
      metadata: {
        docId,
        chunkIndex: idx,
        sourceName,
        timestamp: Date.now(),
      },
    }));

    // store the embeddings
    await vectorStore.addDocuments(docId, formattedChunks)

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${docs.length} documents`,
    //   documents: docs.map((doc: any) => ({
    //     text: doc.text,
    //     source: doc.metadata.source
    //   }))
    });
  } catch (error) {
    console.error('Error processing documents:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process documents' 
      },
      { status: 500 }
    );
  }
} 