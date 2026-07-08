import 'dotenv/config'
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage } from "langchain";
import { response } from "express";



const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

//using GEMINI MODEL
export async function generateResponse(messages) {

    const response = await geminiModel.invoke(messages.map(msg => {
        if (msg.role == "user") {
            if (msg.image) {
                const mimeType = msg.image.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
                const base64Data = msg.image.split(",")[1] || msg.image;
                return new HumanMessage({
                    content: [
                        {
                            type: "text",
                            text: msg.content || "Analyze this image."
                        },
                        {
                            type: "image_url",
                            image_url: `data:${mimeType};base64,${base64Data}`
                        }
                    ]
                });
            } else {
                return new HumanMessage(msg.content || "");
            }
        } else if (msg.role == "ai") {
            return new AIMessage(msg.content || "");
        }
    }));


    return response.text;

} 

//using MISTRAL MODEL
export async function generateChatTitle(message) {

    const response = await mistralModel.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `)
    ])

    return response.text;

}
