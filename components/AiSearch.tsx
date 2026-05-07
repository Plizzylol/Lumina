import React, { useState, useRef, useEffect } from 'react';
import { SearchMessage, TrustedSource, ExamBoard, UserTier, Theme } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface AiSearchProps {
  onSearch: (query: string, trustedSources: TrustedSource[], examBoards: ExamBoard[]) => void;
  searchHistory: SearchMessage[];
  isLoading: boolean;
  userTier: UserTier;
  searchCount: number;
  maxSearches: number;
  theme: Theme;
}

const sourceOptions: TrustedSource[] = ['Britannica', 'Khan Academy', 'Wikipedia'];
const examBoardOptions: ExamBoard[] = ['AQA', 'OCR', 'Edexcel'];

export default function AiSearch({ onSearch, searchHistory, isLoading, userTier, searchCount, maxSearches, theme }: AiSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<TrustedSource[]>([]);
  const [selectedExamBoards, setSelectedExamBoards] = useState<ExamBoard[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [searchHistory, isLoading]);

  const handleSourceToggle = (source: TrustedSource) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleExamBoardToggle = (board: ExamBoard) => {
    setSelectedExamBoards(prev =>
      prev.includes(board)
        ? prev.filter(b => b !== board)
        : [...prev, board]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim(), selectedSources, selectedExamBoards);
      setQuery('');
    }
  };

  const remaining = Math.max(0, maxSearches - searchCount);
  const isLimited = userTier === 'free';

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      <div className={`pt-2 pb-4 border-b transition-colors duration-300 ${theme === 'oled' ? 'border-gray-800' : 'border-gray-200 dark:border-gray-700'}`}>
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Search with Gemini</h2>
            {isLimited && (
                <div className={`mt-2 flex items-center px-3 py-1 rounded-full transition-colors duration-300 ${theme === 'oled' ? 'bg-indigo-900/50' : 'bg-indigo-50 dark:bg-indigo-900/30'}`}>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                        {remaining} free searches remaining today
                    </span>
                </div>
            )}
        </div>
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Sources:</span>
              <div className="flex gap-1">
                {sourceOptions.map(source => (
                    <button
                    key={source}
                    type="button"
                    onClick={() => handleSourceToggle(source)}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                        selectedSources.includes(source)
                        ? 'bg-indigo-600 text-white shadow-md'
                        : `${theme === 'oled' ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'} text-gray-600 dark:text-gray-300`
                    }`}
                    >
                    {source}
                    </button>
                ))}
              </div>
            </div>
            <div className="hidden lg:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Boards:</span>
               <div className="flex gap-1">
                {examBoardOptions.map(board => (
                    <button
                    key={board}
                    type="button"
                    onClick={() => handleExamBoardToggle(board)}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                        selectedExamBoards.includes(board)
                        ? 'bg-indigo-600 text-white shadow-md'
                        : `${theme === 'oled' ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'} text-gray-600 dark:text-gray-300`
                    }`}
                    >
                    {board}
                    </button>
                ))}
               </div>
            </div>
          </div>
      </div>
      
      <div className="flex-grow overflow-y-auto py-6 px-4 space-y-6 scrollbar-custom">
        {searchHistory.length === 0 && (
           <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 opacity-50 space-y-4">
             <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             <p className="text-lg italic font-light text-center">Ask a question to get a web-powered summary from Gemini.</p>
           </div>
        )}
        {searchHistory.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-2xl px-5 py-3 rounded-2xl shadow-md ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : `${theme === 'oled' ? 'bg-black border border-gray-800' : 'bg-white dark:bg-gray-700'} text-gray-800 dark:text-gray-200`}`}>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <MarkdownRenderer content={msg.text} />
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className={`mt-4 pt-3 border-t transition-colors duration-300 ${theme === 'oled' ? 'border-gray-800' : 'border-gray-200 dark:border-gray-600'}`}>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 9.172a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102 1.101" /></svg>
                      Sources
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-2 rounded-lg transition-colors duration-300 ${theme === 'oled' ? 'bg-gray-900 border border-gray-800 hover:bg-gray-800' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                      >
                        <p className="font-semibold text-indigo-700 dark:text-indigo-400 text-sm truncate">{source.title}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{source.uri}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
            <div className="flex justify-start">
                <div className={`px-5 py-3 rounded-2xl shadow-md transition-colors duration-300 ${theme === 'oled' ? 'bg-black border border-gray-800' : 'bg-white dark:bg-gray-700'}`}>
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={`p-4 border-t transition-colors duration-300 ${theme === 'oled' ? 'border-gray-800' : 'border-gray-200 dark:border-gray-700'}`}>
          <div className="flex items-center shadow-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a follow-up question or start a new search..."
              disabled={isLoading}
              className={`w-full text-gray-900 dark:text-white rounded-l-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent disabled:opacity-50 transition-colors duration-300 ${theme === 'oled' ? 'bg-gray-900 dark:border-gray-700' : 'bg-gray-200 dark:bg-gray-700 dark:border-gray-600'}`}
            />
            <button type="submit" disabled={isLoading} className="bg-indigo-600 text-white px-6 py-4 rounded-r-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-500 flex items-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            </button>
          </div>
      </form>
    </div>
  );
}