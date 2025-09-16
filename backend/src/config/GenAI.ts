import { GoogleGenAI } from "@google/genai";
import "dotenv/config"

const Gemini_key=process.env.GEMINI_API_KEY ||""
const GenAi = new GoogleGenAI({
    apiKey:Gemini_key,
});


export default GenAi

// import { OpenAI } from "openai/client.js";
// import "dotenv/config"

// const Gemini_key=process.env.GEMINI_API_KEY ||""
// const GenAi = new OpenAI({
//     apiKey:Gemini_key,
//     baseURL:"https://generativelanguage.googleapis.com/v1beta/openai/"
// });


// export default GenAi    