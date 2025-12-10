import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

const GROQ_MODEL_IDS = {
    LLAMA_70B_VERSATILE: "llama-3.3-70b-versatile",
    GPT_OSS_120B: "openai/gpt-oss-120b",
} as const;
const MODELS = {
    groq_model: new ChatOpenAI({
        model: GROQ_MODEL_IDS.GPT_OSS_120B, // or mixtral-8x7b, llama3-70b, etc.
        apiKey: process.env.GROQ_API_KEY,
        configuration: {
            baseURL: "https://api.groq.com/openai/v1",
        },
        temperature: 0.7,
    }),
    gemini_model: new ChatGoogleGenerativeAI({
        model: "gemini-3-pro-preview",
        temperature: 0.7,
    }),
};
export const model = MODELS.groq_model;
