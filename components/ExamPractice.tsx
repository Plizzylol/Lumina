import React, { useState } from 'react';
import { ExamQuestion, Theme, UserTier, ExamBoard } from '../types';

interface ExamPracticeProps {
  questions: ExamQuestion[];
  onGenerate: (count: number, marks: number, board: ExamBoard | 'Generic') => void;
  userTier: UserTier;
  isAuthenticated: boolean;
  theme: Theme;
}

export default function ExamPractice({ questions, onGenerate, userTier, isAuthenticated, theme }: ExamPracticeProps) {
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [marksPerQuestion, setMarksPerQuestion] = useState<number>(4);
  const [selectedBoard, setSelectedBoard] = useState<ExamBoard | 'Generic'>('Generic');
  const [showMarkScheme, setShowMarkScheme] = useState<Record<number, boolean>>({});

  const toggleMarkScheme = (index: number) => {
    setShowMarkScheme(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-20 h-20 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0112.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Exam Practice Generator</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Generate exam-style questions based on your selected material. Perfect for testing your knowledge before the real thing.
        </p>
        
        <div className={`p-6 rounded-xl border w-full max-w-md mb-8 ${theme === 'oled' ? 'bg-black border-gray-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Exam Board</label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value as ExamBoard | 'Generic')}
              className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${theme === 'oled' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'}`}
            >
              <option value="Generic">Generic</option>
              <option value="AQA">AQA</option>
              <option value="Edexcel">Edexcel</option>
              <option value="OCR">OCR</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Questions</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={questionCount} 
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
            />
            <div className="text-center mt-2 font-bold text-indigo-600 dark:text-indigo-400">{questionCount}</div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marks per Question (approx)</label>
            <input 
              type="range" 
              min="1" 
              max="6" 
              value={marksPerQuestion} 
              onChange={(e) => setMarksPerQuestion(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
            />
            <div className="text-center mt-2 font-bold text-indigo-600 dark:text-indigo-400">{marksPerQuestion}</div>
          </div>

          <button
            onClick={() => onGenerate(questionCount, marksPerQuestion, selectedBoard)}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-md active:scale-95"
          >
            Generate Exam Questions
          </button>
        </div>
        
        {isAuthenticated && userTier === 'free' && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Free tier is limited to 3 questions per generation. <span className="text-yellow-600 dark:text-yellow-400 font-bold">Upgrade to PRO</span> for more.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exam Practice</h2>
          <p className="text-gray-600 dark:text-gray-400">Answer the questions, then check the mark scheme.</p>
        </div>
        <button
          onClick={() => onGenerate(questionCount, marksPerQuestion, selectedBoard)}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-800/60 rounded-lg font-medium transition-colors text-sm"
        >
          Generate New
        </button>
      </div>

      <div className="flex-grow overflow-y-auto space-y-6 pr-2 scrollbar-custom">
        {questions.map((q, index) => (
          <div key={index} className={`p-6 rounded-xl border ${theme === 'oled' ? 'bg-black border-gray-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-grow mr-4">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">Q{index + 1}.</span>
                {q.question}
              </h3>
              <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                [{q.marks} marks]
              </span>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => toggleMarkScheme(index)}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
              >
                {showMarkScheme[index] ? 'Hide Mark Scheme' : 'Show Mark Scheme'}
                <svg className={`w-4 h-4 ml-1 transition-transform ${showMarkScheme[index] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showMarkScheme[index] && (
                <div className={`mt-4 p-4 rounded-lg border ${theme === 'oled' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'}`}>
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Mark Scheme</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                    {q.markScheme.map((point, i) => (
                      <li key={i}>{point} <span className="text-green-600 dark:text-green-400 font-bold ml-1">(1)</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
