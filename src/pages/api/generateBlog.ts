import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Pixabay API
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API called");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Step 1: Generate blog content from OpenAI
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

    // Parse AI response safely
    let blogData: any;
    try {
      let rawContent = completion.choices[0]?.message?.content || "{}";
      rawContent = rawContent.replace(/```json|```/g, "").trim();
      blogData = JSON.parse(rawContent);
    } catch (err) {
      console.error("❌ Failed to parse AI JSON:", err);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    // Step 2: Fetch image from Pixabay using blog title
    let imageUrl = null;
    if (PIXABAY_API_KEY && blogData?.title) {
      const searchQuery = encodeURIComponent(blogData.title);
      const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchQuery}&image_type=photo`;

      try {
        const response = await fetch(pixabayUrl);
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
          imageUrl = data.hits[0].webformatURL; // take first image
        }
      } catch (imgErr) {
        console.error("❌ Pixabay fetch error:", imgErr);
      }
    }

    // Step 3: Return combined blog + image
    return res.status(200).json({
      ...blogData,
      image: imageUrl || "https://via.placeholder.com/600x400?text=No+Image+Found",
    });
  } catch (error: unknown) {
    console.error("❌ Error generating blog:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}
