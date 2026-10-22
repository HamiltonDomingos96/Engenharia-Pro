import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { LearningTracks } from './components/LearningTracks';
import { ExamsAndQuizzes } from './components/ExamsAndQuizzes';
import { StatsAndAICoach } from './components/StatsAndAICoach';
import { EngineeringSimulators } from './components/EngineeringSimulators';
import { StandardsComparator } from './components/StandardsComparator';
import { CertificateModal } from './components/CertificateModal';
import { INITIAL_USER_PROGRESS } from './data/initialData';
import { QuizResult, UserProgress } from './types';
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
  ExternalLink
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

  // Clean legacy data and load fresh zeroed state
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
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

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [progress]);

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
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('academia_pro_engenharia_progress_v1');
      localStorage.removeItem('academia_pro_engenharia_progress_v2');
      setSessionMinutes(0);
    }
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
      />

      {/* Main Container with Optional Wikipedia Left Drawer */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-2 sm:px-6 py-4 flex gap-6 items-start">
        
        {/* Wikipedia Left Sidebar (Drawer/Panel) */}
        {isSidebarOpen && (
          <aside className="w-64 bg-white border border-[#a2a9b1] rounded-sm p-4 text-xs space-y-4 shrink-0 shadow-sm fixed md:static z-30 top-16 left-2 bottom-4 overflow-y-auto">
            <div className="space-y-1 pb-3 border-b border-[#eaecf0]">
              <span className="font-serif font-bold text-sm text-black block">
                Navegação Wikipédia
              </span>
              <p className="text-[11px] text-[#54595d]">Sumário e acessos rápidos</p>
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
            <span className="font-serif font-bold text-black">Wikipédia Técnica de Engenharia</span>
            <span>•</span>
            <span>Tratado de Formação Intensiva (Volume I: Ambiental & Volume II: Civil)</span>
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
          progress={progress}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}
    </div>
  );
}
