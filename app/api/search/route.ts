import { supabaseClient } from "@/lib/supabase/supabase-client";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" });
  }

  // Create Embedding
  const embeddingResponse = await openaiClient.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
  });

  const [{ embedding }] = embeddingResponse.data;

  // console.log(embedding)

  // Search Supabase
  const { data, error } = await supabaseClient.rpc("search_hadiths", {
    query_embedding: embedding,
    similarity_threshold: 0.78,
    match_count: 10,
  });

  // console.log(data)
  console.log(error)

  if (data) {
    return NextResponse.json({ data });
  }

  return NextResponse.json({ error });
}
