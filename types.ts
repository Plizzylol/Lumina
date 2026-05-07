
export interface Source {
  id: string;
  name: string;
  content: string;
  path?: string[];
}

export type ActiveView = 'source' | 'plan' | 'flashcards' | 'quiz' | 'search' | 'browse_materials' | 'exam_practice';

export type UserTier = 'free' | 'premium';

export type Theme = 'light' | 'dark' | 'oled';

export type TrustedSource = 'Britannica' | 'Khan Academy' | 'Wikipedia';

export type ExamBoard = 'AQA' | 'OCR' | 'Edexcel';

export interface RevisionPlanItem {
  topic: string;
  subtopics: string[];
}

export type RevisionPlan = RevisionPlanItem[];

export interface Flashcard {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ExamQuestion {
  question: string;
  marks: number;
  markScheme: string[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface AiSearchResult {
  summary: string;
  sources: GroundingSource[];
}

export interface SearchMessage {
  sender: 'user' | 'ai';
  text: string;
  sources?: GroundingSource[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  imageData?: string;
  mimeType?: string;
  isThinking?: boolean;
}

export interface SearchStatus {
  count: number;
  lastDate: string;
}