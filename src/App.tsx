import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { LearningTracks } from './components/LearningTracks';
import { ExamsAndQuizzes } from './components/ExamsAndQuizzes';
import { StatsAndAICoach } from './components/StatsAndAICoach';
import { EngineeringSimulators } from './components/EngineeringSimulators';
import { StandardsComparator } from './components/StandardsComparator';
import { CertificateModal } from './components/CertificateModal';
import { AuthModal } from './components/AuthModal';
import { UserAccountModal } from './components/UserAccountModal';
import { INITIAL_USER_PROGRESS } from './data/initialData';
import { QuizResult, UserAccount, UserProgress } from './types';
import { getCurrentUser, saveUserProgress, logoutUser } from './utils/authStorage';
import { 
  Wrench, 
  Globe, 
  RotateCcw, 
  BookOpen, 
  Compass, 
  Activity, 
  Award, 
  FileCheck2, 
  Cpu, 
  Layers,
  ChevronRight,
  ExternalLink,
  User,
  ShieldCheck,
  LogIn
} from 'lucide-react';

const STORAGE_KEY = 'academia_pro_engenharia_v3_enciclopedia_zero';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'tracks' | 'exams' | 'stats' | 'tools'>('home');
  const [toolsSubTab, setToolsSubTab] = useState<'simuladores' | 'normas'>('simuladores');
  const [selectedModuleId, setSelectedModuleId] = useState<string | undefined>(undefined);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Authentication & Account State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Load progress for active user or clean zeroed guest state
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const activeUser = getCurrentUser();
      if (activeUser && activeUser.progress) {
        return activeUser.progress;
      }
      localStorage.removeItem('academia_pro_engenharia_progress_v1');
      localStorage.removeItem('academia_pro_engenharia_progress_v2');
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return INITIAL_USER_PROGRESS;
  });

  // Save progress changes to user account (if logged in) and localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        saveUserProgress(currentUser.id, progress);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [progress, currentUser]);

  // Session timer increment every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionMinutes(prev => prev + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleUpdateProgress = (updated: Partial<UserProgress>) => {
    setProgress(prev => ({
      ...prev,
      ...updated
    }));
  };

  const handleSaveQuizResult = (result: QuizResult) => {
    setProgress(prev => {
      const updatedResults = {
        ...prev.quizResults,
        [result.moduleId]: result
      };

      const updatedModuleProgress = {
        ...prev.moduleProgress,
        [result.moduleId]: Math.max(prev.moduleProgress[result.moduleId] || 0, result.scorePercent >= 70 ? 100 : 70)
      };

      const newBadges = [...prev.unlockedBadges];
      if (result.moduleId === 'civ-mod-2' && result.scorePercent >= 80 && !newBadges.includes('badge-calculista-junior')) {
        newBadges.push('badge-calculista-junior');
      }
      if (result.moduleId === 'amb-mod-4' && result.scorePercent >= 70 && !newBadges.includes('badge-jurisconsulto-verde')) {
        newBadges.push('badge-jurisconsulto-verde');
      }

      return {
        ...prev,
        quizResults: updatedResults,
        moduleProgress: updatedModuleProgress,
        unlockedBadges: newBadges
      };
    });
  };

  const handleNavigateToModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentTab('tracks');
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentTab('exams');
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    if (window.confirm('Confirma que deseja zerar 100% dos dados da plataforma?')) {
      setProgress(INITIAL_USER_PROGRESS);
      if (currentUser) {
        saveUserProgress(currentUser.id, INITIAL_USER_PROGRESS);
      }
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('academia_pro_engenharia_progress_v1');
      localStorage.removeItem('academia_pro_engenharia_progress_v2');
      setSessionMinutes(0);
    }
  };

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.progress) {
      setProgress(user.progress);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setIsAccountModalOpen(false);
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsSidebarOpen(false);
  };

  const handleResetUserProgress = () => {
    setProgress(INITIAL_USER_PROGRESS);
    if (currentUser) {
      saveUserProgress(currentUser.id, INITIAL_USER_PROGRESS);
    }
    localStorage.removeItem(STORAGE_KEY);
    setSessionMinutes(0);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#202122] flex flex-col font-sans selection:bg-[#72c332] selection:text-black">
      {/* Wikipedia Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => { setCurrentTab(tab); setIsSidebarOpen(false); }}
        progress={progress}
        sessionMinutes={sessionMinutes}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
      />

      {/* Main Container with Optional Wikipedia Left Drawer */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-2 sm:px-6 py-4 flex gap-6 items-start">
        
        {/* Wikipedia Left Sidebar (Drawer/Panel) */}
        {isSidebarOpen && (
          <aside className="w-64 bg-white border border-[#a2a9b1] rounded-sm p-4 text-xs space-y-4 shrink-0 shadow-sm fixed md:static z-30 top-16 left-2 bottom-4 overflow-y-auto">
            <div className="space-y-1 pb-3 border-b border-[#eaecf0]">
              <span className="font-serif font-bold text-sm text-black block">
                Lopes Engenharia Book
              </span>
              <p className="text-[11px] text-[#54595d]">
                Sumário e acessos rápidos
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
                Páginas
              </span>
              <button
                onClick={() => { setCurrentTab('home'); setIsSidebarOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-1.5 ${currentTab === 'home' ? 'bg-[#72c332] text-black font-bold' : 'hover:bg-[#eaecf0] text-[#202122]'}`}
              >
                <Layers className="w-3.5 h-3.5 text-[#4d861e]" /> Página Principal (Artigo)
              </button>

              <button
                onClick={() => { setCurrentTab('tracks'); setIsSidebarOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-1.5 ${currentTab === 'tracks' ? 'bg-[#72c332] text-black font-bold' : 'hover:bg-[#eaecf0] text-[#202122]'}`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#4d861e]" /> Todos os Tomos (10)
              </button>

              <button
                onClick={() => { setCurrentTab('exams'); setIsSidebarOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-1.5 ${currentTab === 'exams' ? 'bg-[#72c332] text-black font-bold' : 'hover:bg-[#eaecf0] text-[#202122]'}`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#4d861e]" /> Provas & Avaliações
              </button>

              <button
                onClick={() => { setCurrentTab('stats'); setIsSidebarOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-1.5 ${currentTab === 'stats' ? 'bg-[#72c332] text-black font-bold' : 'hover:bg-[#eaecf0] text-[#202122]'}`}
              >
                <Cpu className="w-3.5 h-3.5 text-[#4d861e]" /> Métricas & IA Coach
              </button>

              <button
                onClick={() => { setCurrentTab('tools'); setIsSidebarOpen(false); }}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-1.5 ${currentTab === 'tools' ? 'bg-[#72c332] text-black font-bold' : 'hover:bg-[#eaecf0] text-[#202122]'}`}
              >
                <Wrench className="w-3.5 h-3.5 text-[#4d861e]" /> Calculadoras & Normas
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#eaecf0]">
              <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
                Volumes do Tratado
              </span>
              <button
                onClick={() => { setCurrentTab('tracks'); handleNavigateToModule('amb-mod-1'); }}
                className="w-full text-left px-2 py-1 rounded hover:bg-[#eaecf0] text-[#202122] flex items-center gap-1"
              >
                <Activity className="w-3 h-3 text-[#4d861e]" /> Vol. I: Eng. Ambiental
              </button>
              <button
                onClick={() => { setCurrentTab('tracks'); handleNavigateToModule('civ-mod-1'); }}
                className="w-full text-left px-2 py-1 rounded hover:bg-[#eaecf0] text-[#202122] flex items-center gap-1"
              >
                <Compass className="w-3 h-3 text-[#4d861e]" /> Vol. II: Eng. Civil
              </button>
            </div>

            {/* Account & Safeguard Status in Sidebar */}
            <div className="space-y-1.5 pt-2 border-t border-[#eaecf0]">
              <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
                Salvaguarda de Desempenho
              </span>
              {currentUser ? (
                <div className="p-2 bg-[#f2f9ed] rounded border border-[#72c332] space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-xs bg-black text-[#72c332] flex items-center justify-center font-bold text-[10px]">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                    <strong className="text-black text-[11px] truncate">{currentUser.name}</strong>
                  </div>
                  <button
                    onClick={() => { setIsAccountModalOpen(true); setIsSidebarOpen(false); }}
                    className="w-full text-center py-1 bg-white hover:bg-[#eaecf0] border border-[#a2a9b1] text-black text-[10px] font-bold rounded transition-colors"
                  >
                    Painel da Conta & Backup
                  </button>
                </div>
              ) : (
                <div className="p-2 bg-[#f8f9fa] rounded border border-[#eaecf0] space-y-1.5">
                  <span className="text-[10px] text-[#54595d] block leading-tight">
                    Modo visitante: cadastre-se para salvaguardar notas e módulos.
                  </span>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="w-full text-center py-1 bg-[#72c332] hover:bg-[#5ea832] text-black text-[10px] font-bold rounded transition-colors"
                  >
                    Criar Conta Grátis
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#eaecf0]">
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="w-full text-left px-2 py-1.5 rounded bg-white hover:bg-[#f2f9ed] border border-[#72c332] text-black font-bold flex items-center gap-1.5 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-[#4d861e]" /> Emitir Certificado
              </button>

              <button
                onClick={handleResetProgress}
                className="w-full text-left px-2 py-1 text-[11px] text-[#54595d] hover:text-black flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reiniciar Dados (0%)
              </button>
            </div>
          </aside>
        )}

        {/* Central Article Canvas */}
        <main className="flex-1 w-full min-w-0">
          {currentTab === 'home' && (
            <HomeDashboard
              progress={progress}
              onNavigateToModule={handleNavigateToModule}
              onNavigateToTab={setCurrentTab}
              onOpenCertificate={() => setIsCertificateOpen(true)}
              currentUser={currentUser}
              onOpenAuth={handleOpenAuth}
              onOpenAccountModal={() => setIsAccountModalOpen(true)}
            />
          )}


          {currentTab === 'tracks' && (
            <LearningTracks
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onStartQuiz={handleStartQuiz}
              selectedModuleId={selectedModuleId}
              searchQuery={searchQuery}
            />
          )}

          {currentTab === 'exams' && (
            <ExamsAndQuizzes
              progress={progress}
              onSaveQuizResult={handleSaveQuizResult}
              selectedModuleId={selectedModuleId}
              onNavigateToStats={() => setCurrentTab('stats')}
              onNavigateToModule={handleNavigateToModule}
            />
          )}

          {currentTab === 'stats' && (
            <StatsAndAICoach
              progress={progress}
              onNavigateToModule={handleNavigateToModule}
              onNavigateToQuiz={handleStartQuiz}
            />
          )}

          {currentTab === 'tools' && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1 bg-white p-1 rounded border border-[#a2a9b1]">
                  <button
                    onClick={() => setToolsSubTab('simuladores')}
                    className={`px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      toolsSubTab === 'simuladores'
                        ? 'bg-[#72c332] text-black border border-[#5ea832]'
                        : 'text-[#54595d] hover:text-black'
                    }`}
                  >
                    <Wrench className="w-3.5 h-3.5 text-[#4d861e]" /> Calculadoras & Simuladores
                  </button>
                  <button
                    onClick={() => setToolsSubTab('normas')}
                    className={`px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      toolsSubTab === 'normas'
                        ? 'bg-[#72c332] text-black border border-[#5ea832]'
                        : 'text-[#54595d] hover:text-black'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-[#4d861e]" /> Comparador de Normas (AO-PT-BR)
                  </button>
                </div>
              </div>

              {toolsSubTab === 'simuladores' ? (
                <EngineeringSimulators />
              ) : (
                <StandardsComparator />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Wikipedia Style Footer in White, Black, Lettuce Green */}
      <footer className="border-t border-[#a2a9b1] bg-white py-6 text-xs text-[#54595d] no-print mt-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-serif font-bold text-black">Lopes Engenharia Book</span>
            <span>•</span>
            <span className="text-[#202122]">
              Idealizado e desenvolvido por <strong className="text-black">Hamilton Domingos (H-Digital)</strong>
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Tratado Técnico Oficial (Volume I: Ambiental & Volume II: Civil)</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <button
              onClick={handleResetProgress}
              className="text-[#54595d] hover:text-black hover:underline flex items-center gap-1 transition-colors"
              title="Restaurar dados para 0%"
            >
              <RotateCcw className="w-3 h-3 text-[#4d861e]" /> Zerar Dados (0%)
            </button>
            <span>•</span>
            <span>Angola 🇦🇴 • Portugal 🇵🇹 • Brasil 🇧🇷</span>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {isCertificateOpen && (
        <CertificateModal
          progress={{
            ...progress,
            studentName: currentUser?.name || progress.studentName || ''
          }}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Auth Modal (Login / Register / Restore) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
        currentProgress={progress}
      />

      {/* User Account & Performance Safeguard Modal */}
      {currentUser && (
        <UserAccountModal
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
            setProgress(updated.progress);
          }}
          onResetProgress={handleResetUserProgress}
        />
      )}
    </div>
  );
}
