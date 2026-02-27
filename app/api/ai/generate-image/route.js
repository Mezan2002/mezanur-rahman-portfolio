import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, topic } = await req.json();

    if (!title && !topic) {
      return NextResponse.json(
        { message: "Title or topic is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "Google API Key is missing" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Using gemini-flash-latest (Stable ID with highest available quota)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const basePrompt = title || topic;
    const cleanBasePrompt = basePrompt
      .replace(/[^\w\s]/gi, " ")
      .trim()
      .substring(0, 500);

    const cinematicStyles =
      "cinematic lighting, ultra realistic, highly detailed, 8k, professional photography";
    const fullPrompt = `${cleanBasePrompt}, ${cinematicStyles}`;

    // Use Gemini Flash for image generation
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    });

    // Extract 'inlineData' (base64) from response
    const candidate = result.response.candidates?.[0];
    const inlineData = candidate?.content?.parts?.[0]?.inlineData;

    if (!inlineData || !inlineData.data) {
      throw new Error("No image data returned from Gemini");
    }

    const base64Image = `data:${inlineData.mimeType || "image/png"};base64,${inlineData.data}`;

    console.log("Generated Gemini Image (Base64)");

    return NextResponse.json({ imageUrl: base64Image });
  } catch (error) {
    console.error("Image Generation Error:", error);
    return NextResponse.json(
      { message: "Error generating image", error: error.message },
      { status: 500 },
    );
  }
}
