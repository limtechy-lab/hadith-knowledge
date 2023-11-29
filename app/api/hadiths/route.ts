import { supabaseClient } from "@/lib/supabase/supabase-client";
import { hadithType } from "@/types";
import { NextResponse } from "next/server";

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
// const openAi = new OpenAIApi(configuration);
import OpenAI from 'openai';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const hadith = (await request.json()) as hadithType;

  // Create Embedding
  const embeddingResponse = await openaiClient.embeddings.create({
    model: "text-embedding-ada-002",
    input: `${hadith.narrator} - ${hadith.english}`,
  });

  const [{ embedding }] = embeddingResponse.data;
  const { total_tokens } = embeddingResponse.usage;

  // console.log(embedding)
  // console.log(hadith.id)
  // console.log(total_tokens)

  // Insert Into Supabase
  const { error } = await supabaseClient.from("hadiths").insert({
    ...hadith,
    total_tokens,
    embedding,
  });

  console.log(error)

  return NextResponse.json({ error });
}
