import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Messages are required and must be an array" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "Gemini API Key is missing" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Using gemini-flash-latest (Stable ID with highest available quota)
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction:
        "You are an AI assistant for Mezanur Rahman's portfolio. You are helpful, professional, and friendly. You can answer questions about Mezan's projects, skills (Full Stack Development, GSAP, Next.js), and experience. If you don't know something specifically about Mezan, feel free to chat about general topics but always remain polite. IMPORTANT: Use stylish formatting in your responses! Use **bold** for key terms, *italics* for emphasis, and - bulleted lists for technical details or multiple points to make your responses look premium and easy to read.",
    });

    // Format history for the chat
    let history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // The Gemini SDK requires the first message in the history to be from the 'user'
    const firstUserIndex = history.findIndex((msg) => msg.role === "user");
    if (firstUserIndex !== -1) {
      history = history.slice(firstUserIndex);
    } else {
      history = [];
    }

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { message: "Error in chat completion", error: error.message },
      { status: 500 },
    );
  }
}
