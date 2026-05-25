import { GoogleGenAI } from "@google/genai";
import { PRWithEvents, SummaryJSON } from "@/types";
import { NARRATIVE_RECOVERY_PROMPT } from "../data/prompts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});
export async function makePRSummary(
  prWithEvents: PRWithEvents,
): Promise<SummaryJSON> {
  const prompt = `${NARRATIVE_RECOVERY_PROMPT}\n\nINPUT DATA:\n${JSON.stringify(prWithEvents)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    const summary = JSON.parse(response.text!);
    return summary;
  } catch (error) {
    console.log("Gemini AI Error:", error);
    throw new Error("Failed to generate development narrative.");
  }
}
