import { ApiError, GoogleGenAI } from "@google/genai";
import { PromptSummaryInput, SummaryJSON } from "@/types";
import { NARRATIVE_RECOVERY_PROMPT } from "../data/prompts";
import logger from "../logger";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});
export async function makeWorkItemSummary(
  promptSummaryInput: PromptSummaryInput,
): Promise<SummaryJSON> {
  const prompt = `${NARRATIVE_RECOVERY_PROMPT}\n\nINPUT DATA:\n${JSON.stringify(promptSummaryInput)}`;

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
    logger.log("Gemini AI Error:", error);
    let msg = "Failed to generate development narrative.";

    if (error instanceof ApiError) {
      msg = JSON.parse(error.message).error.message;
    }
    throw new Error(msg);
  }
}
