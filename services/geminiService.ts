
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, Language, Template, GeneratedContract } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
