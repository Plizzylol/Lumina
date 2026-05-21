import React, { useState, useRef, useEffect } from 'react';
import { Source, ChatMessage, Theme } from '../types';
import { askGeminiPro } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatPanelProps {
  selectedSource: Source | null;
  isAuthenticated: boolean;
  theme: Theme;
}

export default function ChatPanel({ selectedSource, isAuthenticated, theme }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{ data: string, mime: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if (selectedSource) {
      setMessages([
        { sender: 'ai', text: `StudyLM Pro is ready. Analyzing "${selectedSource.name}". How can I help?` }
      ]);
    } else {
       setMessages([
        { sender: 'ai', text: isAuthenticated ? 'Select a source or upload an image to start a deep study session.' : 'Select a sample source to explore StudyLM Pro.' }
      ]);
    }
  }, [selectedSource, isAuthenticated]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAttachedImage({
          data: ev.target?.result as string,
          mime: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedImage) || isLoading) return;

    const userMessage: ChatMessage = { 
        sender: 'user', 
        text: input || (attachedImage ? "Analyze this image." : ""),
        imageData: attachedImage?.data,
        mimeType: attachedImage?.mime,
        isThinking: useThinking
    };
    
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setAttachedImage(null);
    setIsLoading(true);

    try {
      const stream = await askGeminiPro(newHistory, useThinking, selectedSource?.content);
      let aiResponse = '';
      setMessages(prev => [...prev, { sender: 'ai', text: '', isThinking: useThinking }]);
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        aiResponse += c.text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = aiResponse;
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Gemini encountered an issue. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 relative">
      <div className={`flex items-center justify-between mb-4 border-b pb-2 transition-colors duration-300 ${theme === 'oled' ? 'border-gray-800' : 'border-gray-200 dark:border-gray-700'}`}>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path></svg>
            StudyLM Pro
        </h2>
        <button 
            onClick={() => setUseThinking(!useThinking)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 border ${
                useThinking 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md animate-pulse' 
                : `${theme === 'oled' ? 'bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'} text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600`
            }`}
            title="Enable Gemini Thinking Mode for complex reasoning"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <span>DEEP THINK</span>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4 scrollbar-custom">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                ? 'bg-indigo-600 text-white' 
                : `${theme === 'oled' ? 'bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'} text-gray-800 dark:text-gray-200`
            }`}>
              {msg.imageData && (
                  <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                      <img src={msg.imageData} alt="Uploaded for analysis" className="w-full h-auto max-h-48 object-cover" />
                  </div>
              )}
              {msg.isThinking && msg.sender === 'ai' && !msg.text && (
                  <div className="flex items-center text-xs text-indigo-500 dark:text-indigo-400 font-bold mb-1">
                      <svg className="w-3 h-3 mr-1 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Thinking deeply...
                  </div>
              )}
              <div className="prose prose-sm dark:prose-invert">
                <MarkdownRenderer content={msg.text} />
              </div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1].sender === 'user' && (
            <div className="flex justify-start">
                <div className={`${theme === 'oled' ? 'bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'} px-4 py-2 rounded-2xl shadow-sm`}>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
          {attachedImage && (
              <div className={`absolute bottom-full left-0 mb-2 p-2 border rounded-lg shadow-xl flex items-center group transition-colors duration-300 ${theme === 'oled' ? 'bg-black border-gray-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                  <img src={attachedImage.data} className="w-12 h-12 rounded object-cover" />
                  <button 
                    onClick={() => setAttachedImage(null)}
                    className="ml-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
              </div>
          )}
          <form onSubmit={handleSendMessage} className={`flex items-center rounded-2xl p-1 shadow-inner border focus-within:border-indigo-500 transition-all ${theme === 'oled' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 dark:bg-gray-700 border-transparent'}`}>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-300 transition-colors"
                title="Upload image for AI analysis"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Gemini is thinking..." : "Ask StudyLM anything..."}
              disabled={isLoading}
              className="flex-grow bg-transparent text-gray-900 dark:text-white p-3 focus:outline-none text-sm placeholder:text-gray-400"
            />
            <button type="submit" disabled={(!input.trim() && !attachedImage) || isLoading} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 shadow-lg active:scale-95 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </form>
      </div>
    </div>
  );
}