import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
import { PRTimeline, SummaryJSON } from "@/types";
import { NARRATIVE_RECOVERY_PROMPT } from "../prompts";
import logger from "@/lib/logger";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
export async function generatePRSummary(
  timeline: PRTimeline,
): Promise<SummaryJSON> {
  const prompt = `${NARRATIVE_RECOVERY_PROMPT}\n\nINPUT DATA:\n${JSON.stringify(timeline)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/JSON" },
    });
    const text = response.text as string;
    return JSON.parse(text) as SummaryJSON;
  } catch (error) {
    logger.error("Gemini AI Error:", error);
    throw new Error("Failed to generate development narrative.");
  }
}
