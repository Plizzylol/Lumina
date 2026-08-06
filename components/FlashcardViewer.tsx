import React, { useState, useEffect } from 'react';
// Fix: Add theme prop to props interface to fix TypeScript error from App.tsx.
import { Flashcard, Theme } from '../types';

interface FlashcardViewerProps {
  cards: Flashcard[];
  onGenerate: () => void;
  theme: Theme;
}

export default function FlashcardViewer({ cards, onGenerate }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Test your knowledge.</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Generate interactive flashcards from your source material.</p>
        <button
          onClick={onGenerate}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Generate Flashcards
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Flashcards</h2>
      <div className="w-full max-w-2xl h-80 perspective-1000">
        <div
          className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-2xl cursor-pointer">
            <p className="text-2xl text-center text-gray-900 dark:text-white">{currentCard.term}</p>
          </div>
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-indigo-600 rounded-xl shadow-2xl cursor-pointer transform rotate-y-180">
            <p className="text-xl text-center text-white">{currentCard.definition}</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-500 dark:text-gray-400">{currentIndex + 1} / {cards.length}</p>
      <div className="mt-6 flex items-center space-x-4">
        <button onClick={handlePrev} className="px-5 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Previous</button>
        <button onClick={() => setIsFlipped(!isFlipped)} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Flip</button>
        <button onClick={handleNext} className="px-5 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Next</button>
      </div>
    </div>
  );
}

// Basic CSS for 3D effect (Tailwind doesn't have utilities for this out of the box)
const style = document.createElement('style');
style.innerHTML = `
  .perspective-1000 { perspective: 1000px; }
  .transform-style-preserve-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
  .rotate-y-180 { transform: rotateY(180deg); }
`;
document.head.appendChild(style);