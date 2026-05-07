import React, { useState } from 'react';
import { Theme } from '../types';

interface AuthPageProps {
  onLoginSuccess: () => void;
  onClose: () => void;
  theme: Theme;
}

export default function AuthPage({ onLoginSuccess, onClose, theme }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form data and API calls here.
    // For this simulation, we'll just log the user in.
    onLoginSuccess();
  };
  
  const isOLED = theme === 'oled';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-scale-in">
      <div className={`relative w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg transition-colors duration-300 ${isOLED ? 'bg-black border border-gray-800' : 'bg-white dark:bg-gray-800'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.svg" alt="StudyLM Logo" className="w-10 h-10" />
            <div className="ml-2 text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">StudyLM</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">powered by Google Gemini</p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            {isLogin ? 'Log in to continue' : 'Create an account to continue'}
          </p>
        </div>

        <div className={`flex border-b transition-colors duration-300 ${isOLED ? 'border-gray-700' : 'border-gray-200 dark:border-gray-600'}`}>
          <button onClick={() => setIsLogin(true)} className={`w-1/2 py-4 text-center font-medium text-sm transition-colors ${isLogin ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
            Log In
          </button>
          <button onClick={() => setIsLogin(false)} className={`w-1/2 py-4 text-center font-medium text-sm transition-colors ${!isLogin ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email address"
            required
            className={`w-full px-4 py-3 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${isOLED ? 'bg-gray-900 border border-gray-700' : 'bg-gray-200 dark:bg-gray-700'}`}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={`w-full px-4 py-3 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${isOLED ? 'bg-gray-900 border border-gray-700' : 'bg-gray-200 dark:bg-gray-700'}`}
          />
          <button type="submit" className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            {isLogin ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t transition-colors duration-300 ${isOLED ? 'border-gray-700' : 'border-gray-300 dark:border-gray-600'}`}></div>
            </div>
            <div className={`relative px-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 ${isOLED ? 'bg-black' : 'bg-white dark:bg-gray-800'}`}>Or continue with</div>
        </div>
        
        <button onClick={onLoginSuccess} className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg transition-colors duration-300 ${isOLED ? 'border-gray-700 hover:bg-gray-900' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            <GoogleIcon />
            <span className="ml-3 text-gray-700 dark:text-gray-200">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.618-3.317-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);