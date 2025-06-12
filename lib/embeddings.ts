import { CohereEmbeddings } from "@langchain/cohere";

// 1. load the doc

// 2. split the text

// 3. generate and store the embeddings.

const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
});

const res = await embeddings.embedQuery("Hello world");