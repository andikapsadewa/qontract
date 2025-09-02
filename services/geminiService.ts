import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, Language, Template, GeneratedContract } from '../types';

// Read API key and endpoint from Vite environment variables exposed to the browser.
// Vite only exposes variables that start with VITE_. Add `VITE_GOOGLE_GENAI_API_KEY` to your `.env`.
const VITE = (import.meta as any).env as Record<string, any>;
const API_KEY: string | undefined = VITE.VITE_GOOGLE_GENAI_API_KEY || VITE.VITE_GOOGLE_GENAI_APIKEY || VITE.GOOGLE_GENAI_API_KEY;
const API_ENDPOINT: string | undefined = VITE.VITE_GOOGLE_GENAI_API_ENDPOINT || VITE.VITE_GOOGLE_GENAI_APIENDPOINT || VITE.GOOGLE_GENAI_API_ENDPOINT;

let ai: any;
if (!API_KEY) {
    // Avoid constructing the library without an API key — the library will throw an error in the browser.
    console.error("Missing VITE_GOOGLE_GENAI_API_KEY. Set it in your .env file and restart the dev server. For security, prefer calling the API from a backend.");
    // Provide a stub that surfaces a clearer error when used.
    ai = {
        models: {
            generateContent: async () => {
                throw new Error('GoogleGenAI: no API key configured. Set VITE_GOOGLE_GENAI_API_KEY in .env or use a server-side proxy.');
            }
        }
    };
} else {
    // The GoogleGenAI constructor currently accepts an `apiKey` option. If you need to override endpoint,
    // check the library docs — passing a non-standard option may cause type errors.
    ai = new GoogleGenAI({ apiKey: API_KEY });
}

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        opening: { type: Type.STRING },
        parties: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    details: { type: Type.STRING }
                }
            }
        },
        preamble: { type: Type.STRING },
        clauses: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    content: { type: Type.STRING }
                }
            }
        },
        closing: { type: Type.STRING },
        signatures: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    party: { type: Type.STRING },
                    name: { type: Type.STRING }
                }
            }
        }
    }
};

const buildPrompt = (formData: FormData, template: Template, language: Language): string => {
    const langInstructions = language === 'id' 
        ? 'Anda adalah asisten hukum virtual yang ahli dalam membuat draf kontrak sederhana untuk UMKM dan freelancer di Indonesia. Buatlah draf Surat Perjanjian Kerjasama berdasarkan data berikut. Gunakan bahasa hukum yang formal, jelas, dan mudah dipahami. Jangan sertakan pasal-pasal yang terlalu kompleks. Respon harus dalam Bahasa Indonesia.'
        : 'You are a virtual legal assistant specializing in creating simple contract drafts for MSMEs and freelancers. Create a draft Agreement based on the following data. Use formal, clear, and easy-to-understand legal language. Do not include overly complex clauses. The response must be in English.';
    
    const partyOneLabel = language === 'id' ? 'Pihak Pertama' : 'First Party';
    const partyTwoLabel = language === 'id' ? 'Pihak Kedua' : 'Second Party';

    return `
${langInstructions}

Data for Contract:
- Contract Type: ${template.title[language]}
- Language for Document: ${language === 'id' ? 'Indonesia' : 'English'}

Parties Involved:
- ${partyOneLabel}:
  - Name: ${formData.partyOneName}
  - Position: ${formData.partyOnePosition}
  - Address: ${formData.partyOneAddress}
- ${partyTwoLabel}:
  - Name: ${formData.partyTwoName}
  - Position: ${formData.partyTwoPosition}
  - Address: ${formData.partyTwoAddress}

Agreement Details:
- Project Title/Object: ${formData.projectTitle}
- Scope of Work: ${formData.scope}
- Contract Value: IDR ${formData.value}
- Contract Duration: From ${formData.startDate} to ${formData.endDate}
- Additional Terms: ${formData.additionalTerms || (language === 'id' ? 'Tidak ada' : 'None')}

Please generate the contract draft. The output MUST be a valid JSON object matching the provided schema.
`;
};

export const generateContract = async (formData: FormData, template: Template, language: Language): Promise<GeneratedContract | null> => {
    const prompt = buildPrompt(formData, template, language);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        if (jsonText) {
            return JSON.parse(jsonText) as GeneratedContract;
        }
        return null;
    } catch (error) {
        console.error("Error generating contract with Gemini:", error);
        return null;
    }
};
