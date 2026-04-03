import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { systemInstruction } from "../../../lib/groq";

export async function POST(req) {
  try {
    const apiKey = process.env.SB_API_KEY;

    if (!apiKey) {
      console.error("CRITICAL: SB_API_KEY environment variable is not set.");
      return NextResponse.json(
        { error: "Server configuration error: API key missing." },
        { status: 500 }
      );
    }

    // Initialize Groq client inside handler to avoid module-level crash
    const groq = new Groq({ apiKey });

    const body = await req.json();
    const { history } = body;

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid history format" }, { status: 400 });
    }

    // Map history to OpenAI/Groq format. Map 'model' role to 'assistant'.
    const messages = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: String(msg.text || ""),
    }));

    // Inject system instruction at the start
    messages.unshift({ role: "system", content: systemInstruction });

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Groq API Error Details:", {
      message: error.message,
      status: error.status,
      type: error.constructor.name,
    });
    return NextResponse.json(
      { error: `AI error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
