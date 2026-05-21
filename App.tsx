
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Source, ActiveView, UserTier, RevisionPlan, Flashcard, QuizQuestion, SearchMessage, ExamBoard, SearchStatus, Theme } from './types';
import LeftSidebar from './components/LeftSidebar';
import SourceViewer from './components/SourceViewer';
import RevisionPlanner from './components/RevisionPlanner';
import FlashcardViewer from './components/FlashcardViewer';
import QuizRunner from './components/QuizRunner';
import ExamPractice from './components/ExamPractice';
import ChatPanel from './components/ChatPanel';
import TierModal from './components/TierModal';
import AiSearch from './components/AiSearch';
import MaterialBrowser from './components/MaterialBrowser';
import AuthPage from './components/AuthPage';
import CheckoutPage from './components/CheckoutPage';
import SettingsModal from './components/SettingsModal';
import { generateRevisionPlan, generateFlashcards, generateQuiz, generateExamQuestions, searchWithAi } from './services/geminiService';
import { TrustedSource, ExamQuestion } from './types';
import { sampleSources } from './data/sampleSources';
import { Material, Curriculum, ExamBoardData, Subject, Topic, examMaterialsData } from './data/examMaterials';
import UpgradeToProPanel from './components/UpgradeToProPanel';

const MAX_FREE_SEARCHES = 15;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('user-authenticated'));
  const [sources, setSources] = useState<Source[]>(() => {
    return sampleSources;
  });
  const [selectedSource, setSelectedSource] = useState<Source | null>(sampleSources[0] || null);
  const [activeView, setActiveView] = useState<ActiveView>('source');
  
  const [revisionPlan, setRevisionPlan] = useState<RevisionPlan | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchMessage[]>([]);

  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<ExamBoardData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  
  const [userTier, setUserTier] = useState<UserTier>(() => (localStorage.getItem('user-tier') as UserTier) || 'free');
  const [showTierModal, setShowTierModal] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  const [searchStatus, setSearchStatus] = useState<SearchStatus>(() => {
    const saved = localStorage.getItem('search-status');
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
    if (saved) {
      const parsed = JSON.parse(saved) as SearchStatus;
      if (parsed.lastDate === today) return parsed;
    }
    return { count: 0, lastDate: today };
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || theme === 'oled') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('user-tier', userTier);
  }, [userTier]);

  useEffect(() => {
    localStorage.setItem('search-status', JSON.stringify(searchStatus));
  }, [searchStatus]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user-authenticated', 'true');
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserTier('free');
    setSources(sampleSources);
    setSelectedSource(sampleSources[0] || null);
    setActiveView('source');
    localStorage.removeItem('user-authenticated');
    localStorage.removeItem('user-tier');
    localStorage.removeItem('subscription-key');
  };

  const handleUpgradeInitiate = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowTierModal(false);
    setShowCheckout(true);
  };
  
  const handlePaymentSuccess = (key: string) => {
      setUserTier('premium');
      localStorage.setItem('subscription-key', key);
  };

  const handleSelectCurriculumNode = (curriculumId: string, boardId: string, subjectId?: string) => {
    const curriculum = examMaterialsData.find(c => c.id === curriculumId);
    if (curriculum) {
      setSelectedCurriculum(curriculum);
      const board = curriculum.examBoards.find(b => b.id === boardId);
      if (board) {
        setSelectedBoard(board);
        if (subjectId) {
          const subject = board.subjects.find(s => s.id === subjectId);
          setSelectedSubject(subject || null);
        } else {
          setSelectedSubject(null);
        }
      } else {
        setSelectedBoard(null);
        setSelectedSubject(null);
      }
      setSelectedTopic(null);
      handleSetActiveView('browse_materials');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSource: Source = {
          id: Date.now().toString(),
          name: file.name,
          content: e.target?.result as string,
        };
        setSources(prev => [...prev, newSource]);
        setSelectedSource(newSource);
        handleSetActiveView('source');
      };
      reader.readAsText(file);
    }
  };

  const handleSelectSource = (source: Source) => {
    setSelectedSource(source);
    handleSetActiveView('source');
  };
  
  const handleDeleteSource = (sourceId: string) => {
    if (selectedSource?.id === sourceId) {
      setSelectedSource(sampleSources[0] || null);
      setActiveView('source');
    }
    setSources(prevSources => prevSources.filter(source => source.id !== sourceId));
  };

  const handleSelectMaterial = (material: Material, path?: string[]) => {
    const existingSource = sources.find(s => s.id === material.id);
    if (existingSource) {
      if (path && !existingSource.path) {
        const updatedSource = { ...existingSource, path };
        setSources(prev => prev.map(s => s.id === material.id ? updatedSource : s));
        setSelectedSource(updatedSource);
      } else {
        setSelectedSource(existingSource);
      }
    } else {
      const newSource: Source = {
        id: material.id,
        name: material.name,
        content: material.content,
        path: path,
      };
      setSources(prev => [...prev, newSource]);
      setSelectedSource(newSource);
    }
    handleSetActiveView('source');
  };

  const handleSetActiveView = (view: ActiveView) => {
    setRevisionPlan(null);
    setFlashcards([]);
    setQuiz([]);
    setExamQuestions([]);
    if (view !== 'search') {
      setSearchHistory([]);
    }
    setActiveView(view);
  };

  const handleGenerateRevisionPlan = useCallback(async () => {
    if (!selectedSource) return;
    if(isAuthenticated && userTier === 'free' && sources.filter(s => !s.id.startsWith('sample-')).length >= 1) {
        setShowTierModal(true);
        return;
    }
    setIsLoading(true);
    setLoadingMessage('Crafting your revision plan...');
    try {
      const plan = await generateRevisionPlan(selectedSource.content);
      setRevisionPlan(plan);
    } catch (error) {
      console.error("Failed to generate revision plan:", error);
      alert("Sorry, I couldn't generate a revision plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedSource, userTier, sources, isAuthenticated]);

  const handleGenerateFlashcards = useCallback(async () => {
    if (!selectedSource) return;
    setIsLoading(true);
    setLoadingMessage('Creating your flashcards...');
    try {
      const cards = await generateFlashcards(selectedSource.content);
      setFlashcards(cards);
    } catch (error) {
      console.error("Failed to generate flashcards:", error);
      alert("Sorry, I couldn't generate flashcards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedSource]);

  const handleGenerateQuiz = useCallback(async (questionCount: number) => {
    if (!selectedSource) return;
    if (isAuthenticated && userTier === 'free' && questionCount > 5) {
      setShowTierModal(true);
      return;
    }
    setIsLoading(true);
    setLoadingMessage('Building your quiz...');
    try {
      const questions = await generateQuiz(selectedSource.content, questionCount);
      setQuiz(questions);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      alert("Sorry, I couldn't generate a quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedSource, userTier, isAuthenticated]);

  const handleGenerateExamQuestions = useCallback(async (questionCount: number, marksPerQuestion: number, board: ExamBoard | 'Generic') => {
    if (!selectedSource) return;
    if (isAuthenticated && userTier === 'free' && questionCount > 3) {
      setShowTierModal(true);
      return;
    }
    setIsLoading(true);
    setLoadingMessage(`Generating ${board !== 'Generic' ? board + ' ' : ''}exam questions...`);
    try {
      const questions = await generateExamQuestions(selectedSource.content, questionCount, marksPerQuestion, board);
      setExamQuestions(questions);
    } catch (error) {
      console.error("Failed to generate exam questions:", error);
      alert("Sorry, I couldn't generate exam questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedSource, userTier, isAuthenticated]);

  const handleAiSearch = useCallback(async (query: string, trustedSources: TrustedSource[], examBoards: ExamBoard[]) => {
    const today = new Date().toLocaleDateString('en-CA');
    
    if (userTier === 'free') {
      if (searchStatus.lastDate === today && searchStatus.count >= MAX_FREE_SEARCHES) {
        setShowTierModal(true);
        return;
      }
    }

    const userMessage: SearchMessage = { sender: 'user', text: query };
    const currentHistory = [...searchHistory, userMessage];
    setSearchHistory(currentHistory);
    setIsLoading(true);
    setLoadingMessage('Searching with Gemini...');
    try {
      const result = await searchWithAi(currentHistory, trustedSources, examBoards);
      const aiMessage: SearchMessage = { sender: 'ai', text: result.summary, sources: result.sources };
      setSearchHistory(prev => [...prev, aiMessage]);
      
      if (userTier === 'free') {
        setSearchStatus(prev => ({
          count: prev.lastDate === today ? prev.count + 1 : 1,
          lastDate: today
        }));
      }
    } catch (error) {
      console.error("Failed to perform AI search:", error);
      const errorMessage: SearchMessage = { sender: 'ai', text: "Sorry, I couldn't complete the search. Please try again."};
      setSearchHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [userTier, searchStatus, searchHistory]);

  const renderMainContent = () => {
    if (isLoading && activeView !== 'search') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <svg className="animate-spin h-10 w-10 text-indigo-500 dark:text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg">{loadingMessage}</p>
        </div>
      );
    }

    if (activeView !== 'search' && activeView !== 'browse_materials' && !selectedSource) {
      return (
        <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-500">
          <p className="text-xl">Select or upload a source document to get started.</p>
        </div>
      );
    }

    switch (activeView) {
      case 'browse_materials':
        return (
          <MaterialBrowser 
            theme={theme} 
            onSelectMaterial={handleSelectMaterial} 
            selectedCurriculum={selectedCurriculum}
            setSelectedCurriculum={setSelectedCurriculum}
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        );
      case 'plan':
        return <RevisionPlanner plan={revisionPlan} onGenerate={handleGenerateRevisionPlan} theme={theme} />;
      case 'flashcards':
        return <FlashcardViewer cards={flashcards} onGenerate={handleGenerateFlashcards} theme={theme} />;
      case 'quiz':
        return <QuizRunner quiz={quiz} onGenerate={handleGenerateQuiz} userTier={userTier} isAuthenticated={isAuthenticated} theme={theme} />;
      case 'exam_practice':
        return <ExamPractice questions={examQuestions} onGenerate={handleGenerateExamQuestions} userTier={userTier} isAuthenticated={isAuthenticated} theme={theme} />;
      case 'search':
        return <AiSearch onSearch={handleAiSearch} searchHistory={searchHistory} isLoading={isLoading} userTier={userTier} searchCount={searchStatus.count} maxSearches={MAX_FREE_SEARCHES} theme={theme} />;
      case 'source':
      default:
        return selectedSource ? <SourceViewer source={selectedSource} theme={theme} onNavigateBack={() => handleSetActiveView('browse_materials')} /> : null;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300 ${theme === 'oled' ? 'bg-black' : 'bg-gray-100 dark:bg-gray-900'}`}>
      {showAuthModal && <AuthPage onLoginSuccess={handleLoginSuccess} onClose={() => setShowAuthModal(false)} theme={theme} />}
      {showTierModal && <TierModal onClose={() => setShowTierModal(false)} onUpgrade={handleUpgradeInitiate} theme={theme} />}
      {showCheckout && <CheckoutPage onClose={() => setShowCheckout(false)} onPaymentSuccess={handlePaymentSuccess} theme={theme} />}
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} currentTheme={theme} setTheme={setTheme} />}

      <LeftSidebar
        sources={sources}
        onFileUpload={handleFileUpload}
        onSelectSource={handleSelectSource}
        onDeleteSource={handleDeleteSource}
        selectedSource={selectedSource}
        activeView={activeView}
        setActiveView={handleSetActiveView}
        userTier={userTier}
        onUpgradeClick={() => setShowTierModal(true)}
        theme={theme}
        onOpenSettings={() => setShowSettingsModal(true)}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        searchCount={searchStatus.count}
        maxSearches={MAX_FREE_SEARCHES}
        onSelectCurriculumNode={handleSelectCurriculumNode}
      />
      <main className="flex-grow flex flex-col md:grid md:grid-cols-3 gap-4 p-4 h-screen overflow-hidden">
        <div className={`md:col-span-2 rounded-lg shadow-lg overflow-y-auto h-full p-2 md:p-6 transition-colors duration-300 scrollbar-custom ${theme === 'oled' ? 'bg-black border border-gray-800' : 'bg-white dark:bg-gray-800'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={`rounded-lg shadow-lg flex flex-col h-full overflow-hidden transition-colors duration-300 ${theme === 'oled' ? 'bg-black border border-gray-800' : 'bg-white dark:bg-gray-800'}`}>
          {userTier === 'premium' ? (
            <ChatPanel selectedSource={selectedSource} isAuthenticated={isAuthenticated} theme={theme} />
          ) : (
            <UpgradeToProPanel onUpgradeClick={() => setShowTierModal(true)} theme={theme} />
          )}
        </div>
      </main>
    </div>
  );
}