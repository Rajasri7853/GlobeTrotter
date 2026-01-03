
import { GoogleGenAI, Type } from "@google/genai";
import { Package } from "../types";

// Always use the required initialization format
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelSuggestions = async (prompt: string, packages: Package[]) => {
  try {
    // Simplified contents parameter to use direct string prompt
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional travel assistant for SkyBound Travels. 
          Use these available packages: ${JSON.stringify(packages.map(p => ({ id: p.id, name: p.name, destination: p.destination, price: p.price })))}
          User message: ${prompt}
          Give helpful, concise travel advice and recommend specific packages from the list above if they match the user's intent. Format your response with Markdown.`,
      config: {
        systemInstruction: "You are a helpful travel concierge. Be professional, friendly, and suggest specific packages when appropriate."
      }
    });
    // Access response text using the .text property
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, I'm having trouble connecting to my travel brain. How else can I help you today?";
  }
};

export const generateCustomItinerary = async (destination: string, days: number, budget: string) => {
  try {
    // Simplified contents parameter for itinerary generation
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed ${days}-day travel itinerary for ${destination} with a budget of ${budget}. 
          Include morning, afternoon, and evening activities for each day.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            duration: { type: Type.STRING },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  theme: { type: Type.STRING },
                  activities: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        }
      }
    });
    // Safely parse JSON from the response text property
    const jsonStr = response.text?.trim();
    return jsonStr ? JSON.parse(jsonStr) : null;
  } catch (error) {
    console.error("Itinerary Error:", error);
    return null;
  }
};
