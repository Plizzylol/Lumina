import React, { useState } from 'react';
import { Theme } from '../types';
import { examMaterialsData, Curriculum, ExamBoardData, Subject, Topic, Material } from '../data/examMaterials';

interface MaterialBrowserProps {
  theme: Theme;
  onSelectMaterial: (material: Material, path?: string[]) => void;
  selectedCurriculum: Curriculum | null;
  setSelectedCurriculum: (c: Curriculum | null) => void;
  selectedBoard: ExamBoardData | null;
  setSelectedBoard: (b: ExamBoardData | null) => void;
  selectedSubject: Subject | null;
  setSelectedSubject: (s: Subject | null) => void;
  selectedTopic: Topic | null;
  setSelectedTopic: (t: Topic | null) => void;
}

export default function MaterialBrowser({ 
  theme, 
  onSelectMaterial,
  selectedCurriculum,
  setSelectedCurriculum,
  selectedBoard,
  setSelectedBoard,
  selectedSubject,
  setSelectedSubject,
  selectedTopic,
  setSelectedTopic
}: MaterialBrowserProps) {

  const resetToCurriculum = () => {
    setSelectedCurriculum(null);
    setSelectedBoard(null);
    setSelectedSubject(null);
    setSelectedTopic(null);
  };

  const resetToBoard = () => {
    setSelectedBoard(null);
    setSelectedSubject(null);
    setSelectedTopic(null);
  };

  const resetToSubject = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
  };

  const resetToTopic = () => {
    setSelectedTopic(null);
  };

  const renderBreadcrumbs = () => {
    return (
      <nav className="flex text-sm font-medium mb-6 text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button onClick={resetToCurriculum} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Curriculums
            </button>
          </li>
          {selectedCurriculum && (
            <li>
              <div className="flex items-center">
                <ChevronRightIcon />
                <button onClick={resetToBoard} className="ml-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors md:ml-2">
                  {selectedCurriculum.name}
                </button>
              </div>
            </li>
          )}
          {selectedBoard && (
            <li>
              <div className="flex items-center">
                <ChevronRightIcon />
                <button onClick={resetToSubject} className="ml-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors md:ml-2">
                  {selectedBoard.name}
                </button>
              </div>
            </li>
          )}
          {selectedSubject && (
            <li>
              <div className="flex items-center">
                <ChevronRightIcon />
                <button onClick={resetToTopic} className="ml-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors md:ml-2">
                  {selectedSubject.name}
                </button>
              </div>
            </li>
          )}
          {selectedTopic && (
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRightIcon />
                <span className="ml-1 text-gray-800 dark:text-gray-200 md:ml-2">
                  {selectedTopic.name}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>
    );
  };

  const cardClasses = `p-6 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${
    theme === 'oled'
      ? 'bg-black border-gray-800 hover:border-indigo-500'
      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400'
  }`;

  const renderContent = () => {
    if (!selectedCurriculum) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {examMaterialsData.map((curr) => (
            <div key={curr.id} className={cardClasses} onClick={() => setSelectedCurriculum(curr)}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{curr.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{curr.examBoards.length} Exam Boards</p>
            </div>
          ))}
        </div>
      );
    }

    if (!selectedBoard) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedCurriculum.examBoards.map((board) => (
            <div key={board.id} className={cardClasses} onClick={() => setSelectedBoard(board)}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{board.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{board.subjects.length} Subjects</p>
            </div>
          ))}
        </div>
      );
    }

    if (!selectedSubject) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedBoard.subjects.map((subject) => (
            <div key={subject.id} className={cardClasses} onClick={() => setSelectedSubject(subject)}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{subject.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{subject.topics.length} Topics</p>
            </div>
          ))}
        </div>
      );
    }

    if (!selectedTopic) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedSubject.topics.map((topic) => (
            <div key={topic.id} className={cardClasses} onClick={() => setSelectedTopic(topic)}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{topic.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{topic.materials.length} Materials</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedTopic.materials.map((material) => (
          <div key={material.id} className={cardClasses} onClick={() => onSelectMaterial(material, [selectedCurriculum.name, selectedBoard.name, selectedSubject.name, selectedTopic.name])}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{material.name}</h3>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  {material.type === 'notes' ? 'Revision Notes' : material.type === 'questions' ? 'Topic Questions' : 'Past Paper'}
                </span>
              </div>
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                <DocumentIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Revision Materials</h2>
        <p className="text-gray-600 dark:text-gray-400">Browse high-quality revision notes and questions by exam board.</p>
      </div>
      {renderBreadcrumbs()}
      <div className="flex-grow overflow-y-auto scrollbar-custom pr-2">
        {renderContent()}
      </div>
    </div>
  );
}

const ChevronRightIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);
