import { NextResponse } from "next/server";
import { groq, systemInstruction } from "../../../lib/groq";

export async function POST(req) {
  try {
    const { history } = await req.json();

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid history format" }, { status: 400 });
    }

    // Map history to OpenAI format. Map 'model' to 'assistant' for backward compatibility.
    const messages = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // Inject system instruction at the start
    messages.unshift({ role: "system", content: systemInstruction });

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama3-8b-8192", // Fast and efficient Groq model
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
