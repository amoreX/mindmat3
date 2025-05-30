"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { mood } from "./types";
interface getMentalHealthProps {
  history: mood[];
}
export async function getMentalHealth({ history }: getMentalHealthProps) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAxWhVJfD7fw1RLuP86qNMbflH2N7gcchY",
  );
  //new one -> AIzaSyBYm_TyKpW2rrhyOZSekvc1BlUP9_SKJYA
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let prompt = ``;

  let result = await model.generateContent(prompt);
  let answer = result.response.text();

  //   console.log(result);

  return answer;
}
