import { GoogleGenAI } from "@google/genai";
import "dotenv/config"

const Gemini_key=process.env.GEMINI_API_KEY ||""

let GenAi: GoogleGenAI | null = null;

// Only initialize GenAI if API key is provided
if (Gemini_key) {
    GenAi = new GoogleGenAI({
        apiKey:Gemini_key,
    });
}

export default GenAi    