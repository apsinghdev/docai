import { processDocument } from '@/lib/embeddings';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    console.log("API GOT HIIIITTT 🤯❤️")
    const { docs } = await request.json();
    console.log("data received", docs);

    console.log("text before processing", docs[0].text)
    await processDocument(docs[0].text)

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${docs.length} documents`,
      documents: docs.map((doc: any) => ({
        text: doc.text,
        source: doc.metadata.source
      }))
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