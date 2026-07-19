
import { GoogleGenAI, Type } from "@google/genai";
import { RevisionPlan, Flashcard, QuizQuestion, ExamQuestion, AiSearchResult, GroundingSource, TrustedSource, ExamBoard, SearchMessage, ChatMessage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const trustedSourceDomains: Record<TrustedSource, string> = {
    'Britannica': 'britannica.com',
    'Khan Academy': 'khanacademy.org',
    'Wikipedia': 'wikipedia.org',
};

// FAST TASKS - Using gemini-3-flash-preview
export async function generateRevisionPlan(sourceText: string): Promise<RevisionPlan> {
    const model = "gemini-3-flash-preview";
    const prompt = `Based on the following learning material, create a structured revision plan.
    Material:
    ---
    ${sourceText}
    ---
    Provide the output as a JSON array.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        topic: { type: Type.STRING },
                        subtopics: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["topic", "subtopics"]
                }
            }
        }
    });
    
    return JSON.parse(response.text || "[]");
}

export async function generateFlashcards(sourceText: string): Promise<Flashcard[]> {
    const model = "gemini-3-flash-preview";
    const prompt = `From the text provided, create a set of 10-15 flashcards.
    Text:
    ---
    ${sourceText}
    ---
    Return as JSON array.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        term: { type: Type.STRING },
                        definition: { type: Type.STRING }
                    },
                    required: ["term", "definition"]
                }
            }
        }
    });

    return JSON.parse(response.text || "[]");
}

export async function generateQuiz(sourceText: string, questionCount: number): Promise<QuizQuestion[]> {
    const model = "gemini-3-flash-preview";
    const prompt = `Create a multiple-choice quiz with exactly ${questionCount} questions based on:
    ${sourceText}
    Return as JSON array.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswer: { type: Type.STRING }
                    },
                    required: ["question", "options", "correctAnswer"]
                }
            }
        }
    });

    return JSON.parse(response.text || "[]");
}

export async function generateExamQuestions(sourceText: string, questionCount: number, marksPerQuestion: number, board: ExamBoard | 'Generic'): Promise<ExamQuestion[]> {
    const model = "gemini-3-flash-preview";
    const boardInstruction = board !== 'Generic' ? `These questions MUST be in the style of the ${board} exam board.` : '';
    const prompt = `Create exactly ${questionCount} exam-style questions based on the following text. 
    Each question should be worth approximately ${marksPerQuestion} marks.
    ${boardInstruction}
    Provide a detailed mark scheme for each question, with one point per mark.
    
    Text:
    ---
    ${sourceText}
    ---
    Return as a JSON array.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        marks: { type: Type.NUMBER },
                        markScheme: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["question", "marks", "markScheme"]
                }
            }
        }
    });

    return JSON.parse(response.text || "[]");
}

// PRO CHAT BOT - Using gemini-3-pro-preview with thinking & image support
export async function askGeminiPro(history: ChatMessage[], useThinking: boolean, sourceText?: string) {
    const model = "gemini-3-pro-preview";
    
    const contents = history.map(msg => {
        const parts: any[] = [{ text: msg.text }];
        if (msg.imageData && msg.mimeType) {
            parts.push({
                inlineData: {
                    data: msg.imageData.split(',')[1], // remove prefix
                    mimeType: msg.mimeType
                }
            });
        }
        return {
            role: msg.sender === 'user' ? 'user' : 'model',
            parts
        };
    });

    const systemInstruction = `You are StudyLM, a world-class AI study assistant. 
    Use the following source material if relevant: 
    ---
    ${sourceText || 'No source selected.'}
    ---
    Be helpful, academic, and encouraging. If images are provided, analyze them deeply.`;

    const response = await ai.models.generateContentStream({
        model,
        contents,
        config: {
            systemInstruction,
            thinkingConfig: useThinking ? { thinkingBudget: 32768 } : undefined,
        }
    });
    
    return response;
}

// SEARCH - Using gemini-3-flash-preview with googleSearch
export async function searchWithAi(history: SearchMessage[], trustedSources: TrustedSource[], examBoards: ExamBoard[]): Promise<AiSearchResult> {
    const model = "gemini-3-flash-preview";
    const lastUserMessage = history[history.length - 1];
    
    let query = lastUserMessage.text;
    if (trustedSources.length) query += ` (Focus on: ${trustedSources.join(', ')})`;
    if (examBoards.length) query += ` (Exam boards: ${examBoards.join(', ')})`;

    const contents = history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg === lastUserMessage ? query : msg.text }]
    }));

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            tools: [{googleSearch: {}}],
        },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map(chunk => chunk.web)
      .filter(web => web?.uri && web?.title)
      .map(web => ({ uri: web!.uri!, title: web!.title! }));

    return { summary: response.text || "No results.", sources };
}