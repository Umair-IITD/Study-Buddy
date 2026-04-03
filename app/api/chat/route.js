import { NextResponse } from "next/server";
import { model } from "../../../lib/gemini";

export async function POST(req) {
  try {
    const { history } = await req.json();

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: "Invalid history format" }, { status: 400 });
    }

    const transformedHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chatSession = model.startChat({
      history: transformedHistory.slice(0, -1), // Everything except the last message
    });

    const lastMessage = transformedHistory[transformedHistory.length - 1].parts[0].text;
    const result = await chatSession.sendMessage(lastMessage);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
