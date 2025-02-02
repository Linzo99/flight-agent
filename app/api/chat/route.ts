import flyAgent from "@/flight/agent";
import { FlightSearchParams } from "@/flight/kiwi/types";
import { systemTemplate } from "@/flight/prompt";
import { ChatMessage, Gemini, GEMINI_MODEL, GeminiSession } from "llamaindex";
import { NextResponse, type NextRequest } from "next/server";
//@ts-ignore
import { zodToJsonSchema } from "zod-to-json-schema";
const jsonSchema = zodToJsonSchema(FlightSearchParams);
const prompt = systemTemplate(JSON.stringify(jsonSchema));

export async function POST(request: NextRequest) {
  try {
    const { messages, apiKey } = await request.json();
    const llm = new Gemini({
      model: GEMINI_MODEL.GEMINI_PRO_1_5_FLASH,
      session: new GeminiSession({
        // if no api key was set this will look the
        // env GOOGLE_API_KEY
        apiKey: apiKey,
      }),
    });

    const config = {
      llm: llm,
      error: 0,
      memory: [] as ChatMessage[],
      systemPrompt: {
        role: "system",
        content: prompt,
      } as ChatMessage,
    };

    const result = await flyAgent.run(messages, config);
    return NextResponse.json(result.data);
  } catch (error) {
    console.log("Catch error");
    return NextResponse.json({
      role: "assistant",
      content: "Error: Check your API KEY or Rate Limiting",
      isFinal: false,
    });
  }
}
