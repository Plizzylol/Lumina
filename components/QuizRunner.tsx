import React, { useState, useEffect } from 'react';
// Fix: Add theme prop to props interface to fix TypeScript error from App.tsx.
import { QuizQuestion, UserTier, Theme } from '../types';

interface QuizRunnerProps {
  quiz: QuizQuestion[];
  onGenerate: (questionCount: number) => void;
  userTier: UserTier;
  isAuthenticated: boolean;
  theme: Theme;
}

export default function QuizRunner({ quiz, onGenerate, userTier, isAuthenticated }: QuizRunnerProps) {
  const [questionCount, setQuestionCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setScore(0);
  }, [quiz]);

  const handleAnswerSelect = (option: string) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: option }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finish quiz
      let finalScore = 0;
      quiz.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
          finalScore++;
        }
      });
      setScore(finalScore);
      setIsFinished(true);
    }
  };

  if (quiz.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge yourself with a quiz.</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Generate a multiple-choice quiz based on your study material.</p>
        <div className="flex items-center space-x-4">
          <label htmlFor="question-count" className="text-gray-600 dark:text-gray-300">Questions:</label>
          <select 
            id="question-count"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md p-2"
          >
            <option value={5}>5</option>
            <option value={10}>10 {isAuthenticated && userTier === 'free' && '(Premium)'}</option>
            <option value={15}>15 {isAuthenticated && userTier === 'free' && '(Premium)'}</option>
          </select>
        </div>
        <button
          onClick={() => onGenerate(questionCount)}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h2>
            <p className="text-2xl text-indigo-500 dark:text-indigo-400 mb-8">Your Score: {score} / {quiz.length}</p>
            <button
                onClick={() => onGenerate(quiz.length)}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
            >
                Try Again
            </button>
        </div>
    );
  }

  const currentQuestion = quiz[currentIndex];

  return (
    <div className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Question {currentIndex + 1} of {quiz.length}</p>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{currentQuestion.question}</h3>
        <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentIndex] === option;
                return (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 ${
                            isSelected
                                ? 'bg-indigo-500 border-indigo-400 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
        <div className="mt-8 flex justify-end">
            <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentIndex]}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {currentIndex < quiz.length - 1 ? 'Next' : 'Finish'}
            </button>
        </div>
    </div>
  );
}