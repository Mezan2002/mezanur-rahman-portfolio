import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { message: "Topic is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          message:
            "Gemini API Key is missing. Please add GEMINI_API_KEY to your .env.local file.",
        },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      Write a comprehensive, engaging, and professional blog post about the following topic: "${topic}".
      
      The response MUST be a valid JSON object with the following structure:
      {
        "title": "A catchy and SEO-friendly title",
        "excerpt": "A brief summary of the blog post (max 150 characters)",
        "content": "The full blog post content in HTML format. Use <h2> for subheadings, <b> for bold text, <i> for emphasis, and <ul>/<li> for bullet points. Make it look professional and well-structured.",
        "tags": ["tag1", "tag2", "tag3"],
        "readTime": "e.g., 5 min read"
      }

      CRITICAL: Return ONLY the JSON object. Do not include any markdown formatting like \`\`\`json or any other text before or after the JSON.
    `;

    // Use Gemini 2.0 Flash for text generation
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const text = result.response.text();

    console.log("Raw Gemini Response:", text);

    // Attempt to parse the JSON
    try {
      // Find the first { and last } to extract JSON if there's extra text
      const firstBrace = text.indexOf("{");
      const lastBrace = text.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("No JSON found in response");
      }

      const jsonString = text.substring(firstBrace, lastBrace + 1);
      const blogData = JSON.parse(jsonString);
      return NextResponse.json(blogData);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      return NextResponse.json(
        {
          message:
            "Failed to parse AI response. The AI might have returned an invalid format. Please try again.",
          rawResponse: text.substring(0, 500),
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { message: "Error generating blog content", error: error.message },
      { status: 500 },
    );
  }
}
