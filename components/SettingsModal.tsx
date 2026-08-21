
import React from 'react';
import { Theme } from '../types';

interface SettingsModalProps {
  onClose: () => void;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeOption: React.FC<{
  theme: Theme;
  label: string;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  bgClass: string;
  textClass: string;
  accentClass: string;
}> = ({ theme, label, currentTheme, setTheme, bgClass, textClass, accentClass }) => (
  <button
    onClick={() => setTheme(theme)}
    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${currentTheme === theme ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'border-gray-200 dark:border-gray-600 hover:border-indigo-400'}`}
  >
    <p className={`font-bold mb-2 ${textClass}`}>{label}</p>
    <div className={`h-16 rounded ${bgClass} p-2 flex flex-col justify-between`}>
      <div className={`w-3/4 h-2 ${accentClass} rounded-sm`}></div>
      <div className={`w-1/2 h-2 ${accentClass} opacity-70 rounded-sm`}></div>
    </div>
  </button>
);


export default function SettingsModal({ onClose, currentTheme, setTheme }: SettingsModalProps) {
  const isOLED = currentTheme === 'oled';
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] animate-scale-in backdrop-blur-sm">
      <div className={`rounded-2xl shadow-2xl p-8 max-w-md w-full border transform transition-all ${isOLED ? 'bg-black border-gray-800' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Theme</h3>
            <div className="grid grid-cols-3 gap-4">
                <ThemeOption 
                    theme="light"
                    label="Light"
                    currentTheme={currentTheme}
                    setTheme={setTheme}
                    bgClass="bg-gray-100"
                    textClass="text-gray-800"
                    accentClass="bg-gray-300"
                />
                <ThemeOption 
                    theme="dark"
                    label="Dark"
                    currentTheme={currentTheme}
                    setTheme={setTheme}
                    bgClass="bg-gray-800"
                    textClass="text-gray-200"
                    accentClass="bg-gray-600"
                />
                <ThemeOption 
                    theme="oled"
                    label="OLED"
                    currentTheme={currentTheme}
                    setTheme={setTheme}
                    bgClass="bg-black"
                    textClass="text-gray-200"
                    accentClass="bg-gray-800"
                />
            </div>
        </div>

      </div>
    </div>
  );
}