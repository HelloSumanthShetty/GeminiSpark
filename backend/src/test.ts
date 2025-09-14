import { GoogleGenAI } from "@google/genai";
import "dotenv/config" 
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
}); 

async function main() {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash-lite",
    history: [
      {
        role: "user",
        parts: [{ text: "Hello my name is sumanth" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const response1 = await chat.sendMessage({
    message: "what is your model name?",
  });
  console.log("Chat response 1:", response1.text);
}

 main();