import React from 'react';
import { Theme } from '../types';

interface UpgradeToProPanelProps {
  onUpgradeClick: () => void;
  theme: Theme;
}

const UpgradeToProPanel = ({ onUpgradeClick, theme }: UpgradeToProPanelProps) => {
  return (
    <div className={`flex flex-col h-full items-center justify-center p-8 text-center rounded-lg transition-colors duration-300 ${theme === 'oled' ? 'bg-black' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
      <img src="/logo-premium.svg" alt="Upgrade to Pro" className="w-20 h-20 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unlock StudyLM Pro Chat</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm max-w-xs">
        Upgrade to chat with Gemini Pro about your documents, analyze images, and use Deep Think mode for complex problems.
      </p>
      <button
        onClick={onUpgradeClick}
        className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-black py-3 px-4 rounded-xl hover:brightness-110 transition-all shadow-xl active:scale-95"
      >
        Upgrade to Pro
      </button>
    </div>
  );
};

export default UpgradeToProPanel;