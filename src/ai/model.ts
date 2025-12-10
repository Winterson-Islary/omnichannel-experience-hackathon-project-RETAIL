import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

const MODELS = {
    groq_model: new ChatOpenAI({
        model: "openai/gpt-oss-120b", // or mixtral-8x7b, llama3-70b, etc.
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
