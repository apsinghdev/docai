## docai


src/
├── lib/
│   ├── pipedream-client.ts    # Custom Pipedream integration
│   ├── rag-system.ts          # LangChain-powered RAG logic
│   └── chat-handler.ts        # Connects RAG to your API routes
├── app/api/
│   ├── chat/route.ts          # Uses LangChain for responses
│   └── documents/route.ts     # Pipedream integration for doc loading
└── components/
    └── ChatInterface.tsx      # UI
