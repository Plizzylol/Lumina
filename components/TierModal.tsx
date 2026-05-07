import React from 'react';
import { Theme } from '../types';

interface TierModalProps {
  onClose: () => void;
  onUpgrade: () => void;
  theme: Theme;
}

export default function TierModal({ onClose, onUpgrade, theme }: TierModalProps) {
  const isOLED = theme === 'oled';
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] animate-scale-in backdrop-blur-sm">
      <div className={`rounded-2xl shadow-2xl p-8 max-w-md w-full border transform transition-all ${isOLED ? 'bg-black border-gray-800' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
        <div className="text-center relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
             <img src="/logo-premium.svg" alt="StudyLM Premium" className="w-24 h-24" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-8 mb-2">Go Premium!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Unlock the full power of StudyLM.</p>
        </div>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center text-sm">
            <CheckIcon />
            <span className="font-semibold text-gray-700 dark:text-gray-200">Unlimited AI Searches (No Daily Limit)</span>
          </li>
          <li className="flex items-center text-sm">
            <CheckIcon />
            <span className="text-gray-600 dark:text-gray-300">Search trusted sources (Britannica, etc.)</span>
          </li>
          <li className="flex items-center text-sm">
            <CheckIcon />
            <span className="text-gray-600 dark:text-gray-300">Filter by Exam Boards (AQA, OCR, etc.)</span>
          </li>
          <li className="flex items-center text-sm">
            <CheckIcon />
            <span className="text-gray-600 dark:text-gray-300">Unlimited Source Uploads</span>
          </li>
          <li className="flex items-center text-sm">
            <CheckIcon />
            <span className="text-gray-600 dark:text-gray-300">Generate larger interactive quizzes</span>
          </li>
        </ul>
        <div className="flex flex-col space-y-3">
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-black py-4 px-4 rounded-xl hover:brightness-110 transition-all shadow-xl active:scale-95"
          >
            Upgrade Now - Only $3/mo
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-400 dark:text-gray-500 font-bold py-2 px-4 rounded-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Stay on Free Plan
          </button>
        </div>
      </div>
    </div>
  );
}

const CheckIcon = () => (
    <svg className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);