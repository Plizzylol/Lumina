
import React, { useState } from 'react';
import { Source, ActiveView, UserTier, Theme } from '../types';
import { 
  Search, 
  Library, 
  FileText, 
  Map, 
  Layers, 
  CheckSquare, 
  GraduationCap, 
  Settings, 
  LogOut, 
  LogIn, 
  Trash2,
  Folder,
  ChevronRight,
  ChevronDown,
  Plus
} from 'lucide-react';
import { examMaterialsData } from '../data/examMaterials';

interface LeftSidebarProps {
  sources: Source[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectSource: (source: Source) => void;
  onDeleteSource: (sourceId: string) => void;
  selectedSource: Source | null;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  userTier: UserTier;
  onUpgradeClick: () => void;
  theme: Theme;
  onOpenSettings: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  searchCount: number;
  maxSearches: number;
  onSelectCurriculumNode?: (curriculumId: string, boardId: string, subjectId?: string) => void;
}

const NavItem: React.FC<{
  icon: React.ReactElement;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  isPremium?: boolean;
  isCollapsed?: boolean;
}> = ({ icon, label, isActive, onClick, disabled, isPremium = false, isCollapsed = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={label}
    className={`flex items-center w-full py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
      isCollapsed ? 'px-0 justify-center' : 'px-0 lg:px-4 justify-center lg:justify-start'
    } ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
        : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {icon}
    <span className={`ml-3 flex-grow text-left ${isCollapsed ? 'hidden' : 'hidden lg:block'}`}>{label}</span>
    {isPremium && <span className={`${isCollapsed ? 'hidden' : 'hidden lg:inline-block'} text-[10px] font-extrabold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 rounded-full border border-yellow-200 dark:border-yellow-700/50`}>PRO</span>}
  </button>
);

export default function LeftSidebar({
  sources,
  onFileUpload,
  onSelectSource,
  onDeleteSource,
  selectedSource,
  activeView,
  setActiveView,
  userTier,
  onUpgradeClick,
  theme,
  onOpenSettings,
  isAuthenticated,
  onLoginClick,
  onLogout,
  searchCount,
  maxSearches,
  onSelectCurriculumNode
}: LeftSidebarProps) {
  
  const handleSearchClick = () => {
    setActiveView('search');
  };

  const handleAddSourceClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (!isAuthenticated) {
      event.preventDefault();
      onLoginClick();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, source: Source) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${source.name}"?`)) {
        onDeleteSource(source.id);
    }
  };

  const searchPercentage = Math.min(100, (searchCount / maxSearches) * 100);

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'gcse': false,
    'a-level': false
  });

  const toggleFolder = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('sidebarWidth');
    return saved ? parseInt(saved, 10) : 320;
  });
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isResizing) {
        let clientX;
        if ('touches' in e) {
          clientX = e.touches[0].clientX;
        } else {
          clientX = e.clientX;
        }
        
        let newWidth = clientX;
        
        if (newWidth < 160) {
          newWidth = 80;
        } else if (newWidth > 600) {
          newWidth = 600;
        }

        setSidebarWidth(newWidth);
        localStorage.setItem('sidebarWidth', newWidth.toString());
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    if (isResizing) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  }, [isResizing]);

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('touchmove', resize, { passive: false });
    window.addEventListener('touchend', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('touchmove', resize);
      window.removeEventListener('touchend', stopResizing);
    };
  }, [resize, stopResizing]);

  const isCollapsed = sidebarWidth < 160;

  return (
    <aside 
      style={{ width: `${sidebarWidth}px`, minWidth: `${sidebarWidth}px` }}
      className={`relative p-2 ${isCollapsed ? '' : 'lg:p-4'} flex flex-col h-full overflow-y-auto scrollbar-custom border-r shadow-xl z-20 transition-colors duration-300 ${theme === 'oled' ? 'bg-black border-gray-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
    >
      <div
        className="absolute top-0 right-0 w-4 h-full cursor-col-resize z-50 group"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
      >
        <div className="absolute right-0 top-0 w-1 h-full group-hover:bg-indigo-500/50 group-active:bg-indigo-500 transition-colors" />
      </div>
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} mb-6 shrink-0`}>
        <img src="/logo.svg" alt="StudyLM Logo" className="w-8 h-8" />
        {!isCollapsed && (
          <div className="ml-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">StudyLM</h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 -mt-1">Powered by Google Gemini</p>
          </div>
        )}
      </div>

      <div className={`mb-4 shrink-0 ${isCollapsed ? 'px-2' : ''}`}>
        <label
          htmlFor="file-upload"
          onClick={handleAddSourceClick}
          title="Add Source"
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-start px-4'} py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-md active:scale-95`}
        >
          <Plus className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} />
          {!isCollapsed && <span>Add Source</span>}
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={onFileUpload} accept=".txt,.md" />
      </div>

      <div className="flex-grow mb-4 overflow-x-hidden">
        {!isCollapsed && <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 px-2">Knowledge Base</h2>}
        
        <div className="space-y-1 mb-4">
          {examMaterialsData.map(curriculum => (
            <div key={curriculum.id}>
              <button
                onClick={(e) => toggleFolder(curriculum.id, e)}
                title={curriculum.name}
                className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-start px-3'} w-full py-2.5 rounded-md text-sm transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium`}
              >
                {!isCollapsed && (
                  <div>
                    {expandedFolders[curriculum.id] ? <ChevronDown className="w-4 h-4 mr-2 text-gray-400" /> : <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />}
                  </div>
                )}
                <Folder className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-2'} text-indigo-500 shrink-0`} />
                {!isCollapsed && <span className="truncate">{curriculum.name}</span>}
              </button>
              
              {expandedFolders[curriculum.id] && !isCollapsed && (
                <ul className="pl-6 mt-1 space-y-1">
                  {curriculum.examBoards.map(board => {
                    const boardFolderId = `${curriculum.id}-${board.id}`;
                    return (
                      <li key={board.id}>
                        <button
                          onClick={(e) => toggleFolder(boardFolderId, e)}
                          title={board.name}
                          className="flex items-center justify-start w-full px-3 py-2 rounded-md text-sm transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          <div>
                            {expandedFolders[boardFolderId] ? <ChevronDown className="w-4 h-4 mr-2 text-gray-400" /> : <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />}
                          </div>
                          <Folder className="w-4 h-4 mr-2 text-indigo-400/70 shrink-0" />
                          <span className="truncate">{board.name}</span>
                        </button>

                        {expandedFolders[boardFolderId] && (
                          <ul className="pl-6 mt-1 space-y-1">
                            {board.subjects.map(subject => (
                              <li key={subject.id}>
                                <button
                                  onClick={() => onSelectCurriculumNode?.(curriculum.id, board.id, subject.id)}
                                  title={subject.name}
                                  className="flex items-center justify-start w-full px-3 py-2 rounded-md text-sm transition-all duration-200 text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                  <FileText className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                                  <span className="truncate">{subject.name}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>

        {sources.length > 0 && (
          <>
            {!isCollapsed && <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-2 mt-4">Your Files</h3>}
            <ul className="space-y-1">
              {sources.map(source => (
                <li key={source.id} className="group relative flex items-center">
                  <button
                    onClick={() => onSelectSource(source)}
                    title={source.name}
                    className={`flex-grow flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-start px-3'} py-2.5 rounded-md text-sm transition-all duration-200 truncate ${
                      selectedSource?.id === source.id ? `bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 font-bold ${isCollapsed ? '' : 'border-l-4'} border-indigo-500` : `text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isCollapsed ? '' : 'border-l-4'} border-transparent`
                    }`}
                  >
                    <FileText className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mr-2'} shrink-0 opacity-70`} />
                    {!isCollapsed && <span className="truncate">{source.name}</span>}
                  </button>
                  {!source.id.startsWith('sample-') && !isCollapsed && (
                    <button 
                      onClick={(e) => handleDeleteClick(e, source)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                      aria-label={`Delete ${source.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className={`mt-auto shrink-0 border-t pt-4 transition-colors duration-300 ${theme === 'oled' ? 'border-gray-800' : 'border-gray-100 dark:border-gray-700'}`}>
        <div className={`rounded-xl p-2 border transition-colors duration-300 ${theme === 'oled' ? 'bg-black border-gray-800' : 'bg-gray-50 dark:bg-gray-700/20 border-gray-100 dark:border-gray-700'}`}>
          {!isCollapsed && <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-2">Learning Tools</h2>}
          <nav className="space-y-1">
              <NavItem icon={<Search className="w-5 h-5" />} label="AI Search" isActive={activeView === 'search'} onClick={handleSearchClick} isPremium={userTier === 'free'} isCollapsed={isCollapsed} />
              <NavItem icon={<Library className="w-5 h-5" />} label="Browse Materials" isActive={activeView === 'browse_materials'} onClick={() => setActiveView('browse_materials')} isCollapsed={isCollapsed} />
              <NavItem icon={<FileText className="w-5 h-5" />} label="View Source" isActive={activeView === 'source'} onClick={() => setActiveView('source')} disabled={!selectedSource} isCollapsed={isCollapsed} />
              <NavItem icon={<Map className="w-5 h-5" />} label="Revision Plan" isActive={activeView === 'plan'} onClick={() => setActiveView('plan')} disabled={!selectedSource} isCollapsed={isCollapsed} />
              <NavItem icon={<Layers className="w-5 h-5" />} label="Flashcards" isActive={activeView === 'flashcards'} onClick={() => setActiveView('flashcards')} disabled={!selectedSource} isCollapsed={isCollapsed} />
              <NavItem icon={<CheckSquare className="w-5 h-5" />} label="AI Quiz" isActive={activeView === 'quiz'} onClick={() => setActiveView('quiz')} disabled={!selectedSource} isCollapsed={isCollapsed} />
              <NavItem icon={<GraduationCap className="w-5 h-5" />} label="Exam Practice" isActive={activeView === 'exam_practice'} onClick={() => setActiveView('exam_practice')} disabled={!selectedSource} isCollapsed={isCollapsed} />
          </nav>
        </div>
        
        <div className="mt-4 pt-4 space-y-4">
            {isAuthenticated && (
              <div className={`rounded-xl p-2 ${isCollapsed ? '' : 'lg:p-4'} border shadow-inner transition-colors duration-300 ${theme === 'oled' ? 'bg-black border-gray-800' : 'bg-gray-50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-700'}`}>
                  <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center ${isCollapsed ? '' : 'mb-2'}`}>
                    {!isCollapsed && <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Usage Plan</span>}
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${userTier === 'premium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {userTier === 'premium' ? 'PRO' : 'FREE'}
                    </span>
                  </div>
                  
                  {userTier === 'free' && !isCollapsed && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400">
                            <span>Daily AI Searches</span>
                            <span className="font-bold">{searchCount} / {maxSearches}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div 
                                className={`h-1.5 rounded-full transition-all duration-1000 ${searchCount >= maxSearches ? 'bg-red-500' : 'bg-indigo-500'}`} 
                                style={{ width: `${searchPercentage}%` }}
                            ></div>
                        </div>
                        <button onClick={onUpgradeClick} className="mt-3 w-full text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-black py-2 rounded-lg hover:brightness-110 transition-all shadow-md active:scale-95">
                            UPGRADE TO PRO
                        </button>
                    </div>
                  )}
                  {userTier === 'premium' && !isCollapsed && (
                      <p className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center mt-1">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                          Unlimited Search Active
                      </p>
                  )}
              </div>
            )}

            <div className={`flex ${isCollapsed ? 'flex-col' : 'flex-row'} items-center justify-between gap-2`}>
                {isAuthenticated ? (
                  <button onClick={onLogout} title="Logout" className={`flex-grow flex items-center justify-center text-sm text-gray-400 hover:text-red-500 font-bold transition-colors py-2 ${isCollapsed ? 'px-0' : 'px-3'} border border-transparent hover:border-red-100 dark:hover:border-red-900/30 rounded-lg`}>
                      <LogOut className="w-5 h-5" />
                      {!isCollapsed && <span className="ml-2">Logout</span>}
                  </button>
                ) : (
                  <button onClick={onLoginClick} title="Sign In" className={`flex-grow flex items-center justify-center text-sm text-white bg-indigo-600 hover:bg-indigo-700 font-bold transition-all py-2 ${isCollapsed ? 'px-0' : 'px-4'} rounded-lg shadow-lg active:scale-95`}>
                      <LogIn className="w-5 h-5" />
                      {!isCollapsed && <span className="ml-2">Sign In</span>}
                  </button>
                )}
                <button onClick={onOpenSettings} title="Settings" className={`p-2.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 border transition-all active:scale-90 ${theme === 'oled' ? 'border-gray-800' : 'border-gray-100 dark:border-gray-700'}`}>
                    <Settings className={`w-6 h-6 ${isCollapsed ? 'lg:w-5 lg:h-5' : ''}`} />
                </button>
            </div>
        </div>
      </div>
    </aside>
  );
}