import React, { useState, useRef, useEffect } from 'react';
import { RevisionPlan, Theme } from '../types';

interface RevisionPlannerProps {
  plan: RevisionPlan | null;
  onGenerate: () => void;
  theme: Theme;
}

const ExportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export default function RevisionPlanner({ plan, onGenerate }: RevisionPlannerProps) {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatPlanAsText = () => {
    if (!plan) return '';
    let text = 'StudyLM Revision Plan\n\n';
    plan.forEach((item, index) => {
      text += `${index + 1}. ${item.topic}\n`;
      item.subtopics.forEach(subtopic => {
        text += `   - ${subtopic}\n`;
      });
      text += '\n';
    });
    return text;
  };

  const handleExportTxt = () => {
    const textContent = formatPlanAsText();
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revision-plan.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportOptions(false);
  };

  const handleExportPdf = () => {
    if (!plan) return;
    // @ts-ignore - jsPDF is loaded from CDN via index.html
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let y = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    doc.setFontSize(22);
    doc.text('StudyLM Revision Plan', margin, y);
    y += 15;

    plan.forEach((item) => {
      if (y > pageHeight - margin - 10) { // Add buffer
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      const topicLines = doc.splitTextToSize(item.topic, doc.internal.pageSize.width - margin * 2);
      doc.text(topicLines, margin, y);
      y += (topicLines.length * 7);
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      item.subtopics.forEach(subtopic => {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          const subtopicLines = doc.splitTextToSize(`- ${subtopic}`, doc.internal.pageSize.width - (margin * 2) - 5);
          doc.text(subtopicLines, margin + 5, y);
          y += (subtopicLines.length * 5) + 2;
      });
      y += 5; 
    });

    doc.save('revision-plan.pdf');
    setShowExportOptions(false);
  };
  
  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to plan your revision?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Let AI create a structured study plan from your source material.</p>
        <button
          onClick={onGenerate}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Generate Revision Plan
        </button>
      </div>
    );
  }

  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Revision Plan</h2>
        <div className="relative" ref={exportMenuRef}>
          <button
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            <ExportIcon />
            <span className="ml-2 font-semibold text-sm">Export</span>
          </button>
          {showExportOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 animate-scale-in origin-top-right border border-gray-100 dark:border-gray-600">
              <button
                onClick={handleExportTxt}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-md"
              >
                Export as Text (.txt)
              </button>
              <button
                onClick={handleExportPdf}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-md"
              >
                Export as PDF
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {plan.map((item, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-3">{index + 1}. {item.topic}</h3>
            <ul className="space-y-2 list-disc list-inside">
              {item.subtopics.map((subtopic, subIndex) => (
                <li key={subIndex} className="text-gray-700 dark:text-gray-300 ml-4">
                  {subtopic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}