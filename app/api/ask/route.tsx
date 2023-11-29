import { createClient } from '@supabase/supabase-js'
import { codeBlock, oneLine } from 'common-tags'
import GPT3Tokenizer from 'gpt3-tokenizer'
import {
  // ChatCompletionRequestMessage,
  // ChatCompletionRequestMessageRoleEnum,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
} from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

import { supabaseClient } from "@/lib/supabase/supabase-client";
import { NextResponse } from "next/server";
import ChatCompletionRequestMessageRoleEnum from 'openai';
import ChatCompletionRequestMessage from 'openai';
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

  const sanitizedQuery = query.trim()

  // Moderate the content to comply with OpenAI T&C
  const moderationResponse = await openaiClient.moderations.create({ input: sanitizedQuery })

  const [results] = moderationResponse.data.results

  if (results.flagged) {
    throw new UserError('Flagged content', {
      flagged: true,
      categories: results.categories,
    })
  }

  const embeddingResponse = await openaiClient.embeddings.create({
    model: 'text-embedding-ada-002',
    input: sanitizedQuery.replaceAll('\n', ' '),
  })

  if (embeddingResponse.status !== 200) {
    throw new ApplicationError('Failed to create embedding for question', embeddingResponse)
  }

  const [{ embedding }] = embeddingResponse.data

  const { error: matchError, data: pageSections } = await supabaseClient.rpc(
    'match_page_sections',
    {
      embedding,
      match_threshold: 0.78,
      match_count: 10,
      min_content_length: 50,
    }
  )

  if (matchError) {
    throw new ApplicationError('Failed to match page sections', matchError)
  }

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
  let tokenCount = 0
  let contextText = ''

  for (let i = 0; i < pageSections.length; i++) {
    const pageSection = pageSections[i]
    const content = pageSection.content
    const encoded = tokenizer.encode(content)
    tokenCount += encoded.text.length

    if (tokenCount >= 1500) {
      break
    }

    contextText += `${content.trim()}\n---\n`
  }

  const prompt = codeBlock`
  ${oneLine`
    You are a very enthusiastic Supabase representative who loves
    to help people! Given the following sections from the Supabase
    documentation, answer the question using only that information,
    outputted in markdown format. If you are unsure and the answer
    is not explicitly written in the documentation, say
    "Sorry, I don't know how to help with that."
  `}

  Context sections:
  ${contextText}

  Question: """
  ${sanitizedQuery}
  """

  Answer as markdown (including related code snippets if available):
`

// "Please provide detailed and accurate information about Islam as a highly knowledgeable Islamic scholar. 
// Respond to user questions with explanations based on Islamic teachings, history, and culture. 
// Offer insights on various aspects of the faith, such as its beliefs, practices, rituals, and the historical context of Islamic traditions. 
// If possible, incorporate references to Islamic scriptures and scholarly interpretations to provide well-informed responses."


// "In this context, you are a highly knowledgeable Islamic scholar. 
// You have a deep understanding of the religion of Islam, its history, teachings, and practices. 
// Users will ask you questions related to Islam, and you should provide well-informed and detailed responses, drawing upon your expertise as a scholar in the field of Islamic studies. 
// Please answer their questions with the utmost respect and accuracy, and provide context when necessary to help users better understand the religion."
    
// const messages: ChatCompletionRequestMessage[] = [
//     {
//         role: ChatCompletionRequestMessageRoleEnum.System,
//         content: codeBlock`
//         ${oneLine`
//             You are a very enthusiastic Supabase AI who loves
//             to help people! Given the following information from
//             the Supabase documentation, answer the user's question using
//             only that information, outputted in markdown format.
//         `}

//         ${oneLine`
//             If you are unsure
//             and the answer is not explicitly written in the documentation, say
//             "Sorry, I don't know how to help with that."
//         `}
        
//         ${oneLine`
//             Always include related code snippets if available.
//         `}
//         `,
//     },
//     {
//         role: ChatCompletionRequestMessageRoleEnum.User,
//         content: codeBlock`
//         Here is the Supabase documentation:
//         ${contextText}
//         `,
//     },
//     {
//         role: ChatCompletionRequestMessageRoleEnum.User,
//         content: codeBlock`
//         ${oneLine`
//             Answer my next question using only the above documentation.
//             You must also follow the below rules when answering:
//         `}
//         ${oneLine`
//             - Do not make up answers that are not provided in the documentation.
//         `}
//         ${oneLine`
//             - If you are unsure and the answer is not explicitly written
//             in the documentation context, say
//             "Sorry, I don't know how to help with that."
//         `}
//         ${oneLine`
//             - Prefer splitting your response into multiple paragraphs.
//         `}
//         ${oneLine`
//             - Output as markdown with code snippets if available.
//         `}
//         `,
//     },
//     {
//         role: ChatCompletionRequestMessageRoleEnum.User,
//         content: codeBlock`
//         Here is my question:
//         ${oneLine`${sanitizedQuery}`}
//     `,
//     },
//     ]

    const completionOptions: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 1024,
    temperature: 0,
    stream: true,
    }

    const response = await openai.chat.completions.create({
        completionOptions
      })
    
      const stream = OpenAIStream(response, {
        async onCompletion(completion) {
          await db.message.create({
            data: {
              text: completion,
              isUserMessage: false,
              fileId,
              userId,
            },
          })
        },
      })
    
      return new StreamingTextResponse(stream)

//   if (data) {
//     return NextResponse.json({ data });
//   }

//   return NextResponse.json({ error });
}