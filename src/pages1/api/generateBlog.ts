import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API called");
  console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  console.log("Prompt:", prompt);

  try {
    // Generate blog content
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a blog content generator. Respond ONLY with pure JSON (no markdown, no ```json) in the format: {\"title\":\"...\",\"content\":\"...\",\"tags\":[\"tag1\",\"tag2\"]}",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let blogData: any;
    try {
      let rawContent = completion.choices[0]?.message?.content || "{}";
      rawContent = rawContent.replace(/```json|```/g, "").trim();
      blogData = JSON.parse(rawContent);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    return res.status(200).json(blogData);
  } catch (error: unknown) {
    console.error("Error generating blog:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}
