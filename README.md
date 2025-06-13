## docai

### Project Overview

docai is an AI-powered document Q&A and retrieval-augmented generation (RAG) system. It allows users to upload documents, process them, and interact with them using state-of-the-art LLMs (Gemini, GPT-4, Claude, etc.) via a modern web interface.

---

### Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/D0d6AMo8ImY?si=WQL-B-u3ZftzoAH5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Features
- Connect and process documents using Google docs
- Semantic search and context retrieval (RAG)
- Chat interface with LLM responses
- Model selection (Gemini, GPT-4, Claude, ...)
- File system-based vector/document storage

---

### Local Setup Instructions

#### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- A Google AI API key (for Gemini)
- (Optional) API keys for Cohere, OpenAI, or Anthropic if using other models

#### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd docai
```

#### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

#### 4. Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
GOOGLE_API_KEY=your-google-api-key
COHERE_API_KEY=your-cohere-api-key   # If using Cohere embeddings
# Add other keys as needed
```

#### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

```

- `lib/` — Core logic for LLMs, embeddings, RAG, and storage
- `app/api/` — Next.js API routes for chat and document processing
- `components/` — React components for the frontend UI

---

### Architecture Diagram

```
flowchart TD
  A[User Interface (React/Next.js)]
  B[API Routes (Next.js)]
  C[LangChain RAG System]
  D[LLMs (Gemini, GPT-4, Claude, ...)]
  E[Embeddings (Cohere, etc.)]
  F[File System Storage]

  A-->|Chat/Upload|B
  B-->|Process Query|C
  C-->|Retrieve Context|F
  C-->|Embed/Search|E
  C-->|Call LLM|D
  D-->|Response|C
  C-->|Answer|B
  B-->|Stream/Send|A
```

- **User Interface**: Users upload documents and chat with the AI.
- **API Routes**: Handle requests, route to RAG logic or document processing.
- **LangChain RAG System**: Retrieves relevant context, manages embeddings, and orchestrates LLM calls.
- **LLMs**: Gemini (Google), GPT-4 (OpenAI), Claude (Anthropic), etc.
- **Embeddings**: Used for semantic search and context retrieval.
- **File System Storage**: Stores processed document chunks and embeddings.

---

