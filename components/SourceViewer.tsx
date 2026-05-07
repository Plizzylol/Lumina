import React from 'react';
import { Source, Theme } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface SourceViewerProps {
  source: Source;
  theme: Theme;
  onNavigateBack?: () => void;
}

export default function SourceViewer({ source, theme, onNavigateBack }: SourceViewerProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-custom pr-2">
      <div className={`sticky top-0 py-2 transition-colors duration-300 z-10 ${theme === 'oled' ? 'bg-black' : 'bg-white dark:bg-gray-800'}`}>
        {(source.path || onNavigateBack) && (
          <nav className="flex text-xs font-medium mb-1 text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              {onNavigateBack && (
                <li className="inline-flex items-center">
                  <button onClick={onNavigateBack} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Materials
                  </button>
                </li>
              )}
              {source.path && source.path.map((p, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    {index > 0 || onNavigateBack ? <ChevronRightIcon /> : null}
                    <span className={`${index > 0 || onNavigateBack ? 'ml-1 md:ml-2' : ''} text-gray-600 dark:text-gray-300 truncate max-w-[100px] sm:max-w-[150px] md:max-w-none`} title={p}>
                      {p}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{source.name}</h2>
      </div>
      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mt-4">
        <MarkdownRenderer content={source.content} />
      </div>
    </div>
  );
}

const ChevronRightIcon = () => (
  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);