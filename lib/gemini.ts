import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ 
  model: "gemini-3.1-flash-lite-preview", 
  
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 200,
    responseMimeType: "text/plain",
  },

  systemInstruction: `
    0. You are a professional debate coach. 
    1. Challenge the user's logic immediately. 
    2. Be concise (max 3 sentences) but sharp. 
    3. If the user makes a weak argument, point it out politely but firmly. 
    4. Always end with one aggressive follow-up question to keep the pressure on.`
});
