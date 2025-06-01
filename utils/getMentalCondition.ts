"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { mood } from "./types";

interface getMentalHealthProps {
  mood_history: mood[];
}

export async function getMentalHealth({ mood_history }: getMentalHealthProps) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAxWhVJfD7fw1RLuP86qNMbflH2N7gcchY",
  );

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let prompt = `Analyze my mood history and provide a JSON response with the following structure:
{
  "current_mental_state": "",
  "recommendations": [],
  "mood_insights": []
}

Guidelines:
- current_mental_state: A brief, supportive summary of my overall mental wellbeing
- recommendations: 3 practical, actionable suggestions to improve my mental health
- mood_insights: Positive, encouraging observations about my mood patterns and emotional journey (focus on growth, patterns, and progress - keep it uplifting and user-friendly)

Important:
- Only respond with valid JSON
- Keep insights positive and focused on personal growth
- Avoid technical commentary about data accuracy or model performance
- Make recommendations specific and actionable
- Keep tone supportive and encouraging

Mood History Data:
${JSON.stringify(mood_history, null, 2)}`;

  let result = await model.generateContent(prompt);
  let answer = result.response.text();
  let cleanedAnswer = answer
    .replace(/```json\n?/g, "") // Remove ```json
    .replace(/```\n?/g, "") // Remove closing ```
    .trim(); // Remove whitespace
  let parsed = JSON.parse(cleanedAnswer);
  console.log(parsed);

  return parsed;
}
