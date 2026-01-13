
import { GoogleGenAI } from "@google/genai";
import { TableMode } from "../types";

export async function getFeedback(score: number, total: number, mode: TableMode) {
  // Always initialize inside the function to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const modeName = mode === TableMode.TWO ? "tafel van 2" : mode === TableMode.FIVE ? "tafel van 5" : "tafels van 2 en 5";
    const prompt = `Je bent een enthousiaste en grappige wiskunde-coach voor kinderen. 
    De leerling heeft net de ${modeName} geoefend. 
    Score: ${score} van de ${total}.
    Geef een korte, aanmoedigende reactie in het Nederlands (max 3 zinnen). 
    Als de score hoog is, wees dan extra feestelijk. 
    Als de score laag is, geef een handige tip om beter te onthouden.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Goed gedaan! Blijf oefenen!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Geweldig gewerkt! Wiskunde is een superkracht!";
  }
}

export async function getMathFact(number: number) {
  // Always initialize inside the function to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Vertel een kort, leuk weetje in het Nederlands over het getal ${number}. Houd het simpel voor kinderen.`,
    });
    return response.text;
  } catch (error) {
    return null;
  }
}
