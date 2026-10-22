import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Clock, 
  ChevronRight, 
  FileCheck2, 
  Save, 
  Lightbulb, 
  Scale, 
  Calculator, 
  Activity, 
  Compass, 
  Recycle, 
  ShieldCheck, 
  DollarSign, 
  BarChart2,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { ModuleData, PillarType, UserProgress } from '../types';

interface LearningTracksProps {
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  onStartQuiz: (moduleId: string) => void;
  selectedModuleId?: string;
  searchQuery: string;
}

export function LearningTracks({
  progress,
  onUpdateProgress,
  onStartQuiz,
  selectedModuleId,
  searchQuery
}: LearningTracksProps) {
  const [activePillar, setActivePillar] = useState<PillarType>('ambiental');
  const [currentModuleId, setCurrentModuleId] = useState<string>(
    selectedModuleId || COURSES_DATA.find(m => m.pillar === activePillar)?.id || COURSES_DATA[0].id
  );
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [userNote, setUserNote] = useState<string>('');
  const [isSavedNote, setIsSavedNote] = useState<boolean>(false);

  // Active module & lesson
  const currentModule = COURSES_DATA.find(m => m.id === currentModuleId) || COURSES_DATA[0];
  const currentLesson = currentModule.lessons[activeLessonIndex] || currentModule.lessons[0];

  // Sync active pillar when selectedModuleId changes
  React.useEffect(() => {
    if (selectedModuleId) {
      setCurrentModuleId(selectedModuleId);
      const mod = COURSES_DATA.find(m => m.id === selectedModuleId);
      if (mod) setActivePillar(mod.pillar);
    }
  }, [selectedModuleId]);

  // Load user notes for current lesson
  React.useEffect(() => {
    if (currentLesson) {
      setUserNote(progress.notes[currentLesson.id] || '');
      setIsSavedNote(false);
    }
  }, [currentLesson?.id, progress.notes]);

  const handleToggleLessonComplete = (lessonId: string) => {
    const isCompleted = progress.completedLessonIds.includes(lessonId);
    let newCompleted = [...progress.completedLessonIds];

    if (isCompleted) {
      newCompleted = newCompleted.filter(id => id !== lessonId);
    } else {
      newCompleted.push(lessonId);
    }

    // Recalculate module progress
    const moduleLessonIds = currentModule.lessons.map(l => l.id);
    const completedInModule = moduleLessonIds.filter(id => newCompleted.includes(id)).length;
    const newPercent = Math.round((completedInModule / moduleLessonIds.length) * 100);

    onUpdateProgress({
      completedLessonIds: newCompleted,
      moduleProgress: {
        ...progress.moduleProgress,
        [currentModule.id]: newPercent
      }
    });
  };

  const handleSaveNote = () => {
    if (!currentLesson) return;
    onUpdateProgress({
      notes: {
        ...progress.notes,
        [currentLesson.id]: userNote
      }
    });
    setIsSavedNote(true);
    setTimeout(() => setIsSavedNote(false), 2000);
  };

  // Filter modules
  const filteredModules = COURSES_DATA.filter(m => {
    const matchesPillar = m.pillar === activePillar;
    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.lessons.some(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPillar && matchesSearch;
  });

  return (
    <div className="bg-white border border-[#a2a9b1] rounded-sm p-4 sm:p-8 max-w-[1380px] mx-auto text-[#202122] font-sans space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#a2a9b1] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
            Wikipédia Técnica • Leitura e Análise de Tomos
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
            Trilhas e Artigos de Formação Intensiva
          </h1>
        </div>

        {/* Volume selector tabs */}
        <div className="flex items-center gap-1 bg-[#f8f9fa] p-1 border border-[#a2a9b1] rounded">
          <button
            onClick={() => {
              setActivePillar('ambiental');
              const firstAmb = COURSES_DATA.find(m => m.pillar === 'ambiental');
              if (firstAmb) {
                setCurrentModuleId(firstAmb.id);
                setActiveLessonIndex(0);
              }
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded transition-colors flex items-center gap-1.5 ${
              activePillar === 'ambiental'
                ? 'bg-[#72c332] text-black border border-[#5ea832]'
                : 'text-[#54595d] hover:text-black hover:bg-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#4d861e]" /> Volume I: Ambiental (4 Tomos)
          </button>

          <button
            onClick={() => {
              setActivePillar('civil');
              const firstCiv = COURSES_DATA.find(m => m.pillar === 'civil');
              if (firstCiv) {
                setCurrentModuleId(firstCiv.id);
                setActiveLessonIndex(0);
              }
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded transition-colors flex items-center gap-1.5 ${
              activePillar === 'civil'
                ? 'bg-[#72c332] text-black border border-[#5ea832]'
                : 'text-[#54595d] hover:text-black hover:bg-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#4d861e]" /> Volume II: Civil (6 Tomos)
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar List of Modules + Article Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Chapters list */}
        <div className="lg:col-span-4 border border-[#a2a9b1] bg-[#f8f9fa] rounded-sm p-3 space-y-2">
          <div className="text-xs font-bold text-black uppercase tracking-wider pb-1 border-b border-[#eaecf0] flex items-center gap-1">
            <BookMarked className="w-3.5 h-3.5 text-[#4d861e]" /> Tomos Catalogados
          </div>

          <div className="space-y-1.5">
            {filteredModules.map(mod => {
              const isSelected = mod.id === currentModuleId;
              const progressPercent = progress.moduleProgress[mod.id] || 0;

              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    setCurrentModuleId(mod.id);
                    setActiveLessonIndex(0);
                  }}
                  className={`p-2.5 rounded border text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-white border-[#72c332] border-l-4 shadow-xs font-semibold'
                      : 'bg-white border-[#eaecf0] hover:border-[#a2a9b1] text-[#202122]'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-mono text-[10px] text-[#4d861e] font-bold">
                      Tomo {mod.moduleNumber}
                    </span>
                    <span className="text-[10px] text-[#54595d] font-mono">
                      {progressPercent}%
                    </span>
                  </div>

                  <h3 className="text-xs text-black font-bold leading-snug line-clamp-1">
                    {mod.title}
                  </h3>

                  <p className="text-[11px] text-[#54595d] line-clamp-1 mt-0.5">
                    {mod.shortDescription}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Wikipedia Article Reader */}
        <div className="lg:col-span-8 border border-[#a2a9b1] bg-white rounded-sm p-6 space-y-5">
          
          {/* Article Header */}
          <div className="border-b border-[#a2a9b1] pb-3 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-[#72c332] text-black">
                  Tomo {currentModule.moduleNumber} • {currentModule.level}
                </span>
                <span className="text-xs text-[#54595d] font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#4d861e]" /> {currentLesson?.readTimeMinutes || 15} min de leitura
                </span>
              </div>

              {currentLesson && (
                <button
                  onClick={() => handleToggleLessonComplete(currentLesson.id)}
                  className={`px-3 py-1 rounded text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    progress.completedLessonIds.includes(currentLesson.id)
                      ? 'bg-[#f2f9ed] text-[#4d861e] border-[#72c332]'
                      : 'bg-white hover:bg-[#eaecf0] text-black border-[#a2a9b1]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {progress.completedLessonIds.includes(currentLesson.id) ? 'Concluído' : 'Marcar Leitura'}
                </button>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-black font-normal">
              {currentLesson?.title || currentModule.title}
            </h2>

            {/* Sub-lesson tabs if multiple */}
            {currentModule.lessons.length > 1 && (
              <div className="flex items-center gap-1 pt-2 overflow-x-auto text-xs">
                {currentModule.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`px-2.5 py-1 rounded border transition-colors ${
                      idx === activeLessonIndex
                        ? 'bg-[#72c332] text-black font-bold border-[#5ea832]'
                        : 'bg-[#f8f9fa] border-[#a2a9b1] text-[#202122] hover:bg-white'
                    }`}
                  >
                    Parte {idx + 1}: {lesson.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ementa do Tomo */}
          <div className="bg-[#f8f9fa] border border-[#eaecf0] p-3 rounded text-xs space-y-1.5">
            <span className="font-bold text-black uppercase tracking-wider text-[10px] block">
              Objetivos de Aprendizagem Deste Tomo:
            </span>
            <ul className="space-y-1 text-[#202122]">
              {currentModule.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#4d861e] font-bold">▪</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Theory paragraphs */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif text-black font-normal border-b border-[#eaecf0] pb-1">
              Corpo Doutrinário & Fundamentos Analíticos
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#202122]">
              {currentLesson?.theory.map((para, i) => (
                <p key={i} className="text-justify leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Formulas and Standards if present */}
          {currentLesson?.technicalFormulasOrStandards && currentLesson.technicalFormulasOrStandards.length > 0 && (
            <div className="bg-[#f8f9fa] border border-[#a2a9b1] rounded p-3.5 space-y-2">
              <span className="font-serif font-bold text-xs text-black block">
                Formulação Analítica e Normas de Referência
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentLesson.technicalFormulasOrStandards.map((item, idx) => (
                  <div key={idx} className="bg-white border border-[#eaecf0] p-2.5 rounded">
                    <span className="font-bold text-black block mb-0.5">{item.label}</span>
                    <span className="font-mono text-[11px] text-[#4d861e]">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Case Study */}
          {currentLesson?.practicalCase && (
            <div className="bg-[#f2f9ed] border-l-4 border-[#72c332] p-4 text-xs space-y-2 rounded-r">
              <span className="font-bold text-[#4d861e] uppercase tracking-wider text-[10px] block">
                Estudo de Caso Prático / Aplicação em Campo
              </span>
              <h4 className="font-serif font-bold text-sm text-black">
                {currentLesson.practicalCase.title}
              </h4>
              <p><strong>Cenário:</strong> {currentLesson.practicalCase.scenario}</p>
              <p><strong>Solução Técnica:</strong> {currentLesson.practicalCase.solution}</p>
              <p className="text-[#4d861e] italic pt-1 border-t border-[#8fd452]">
                <strong>Conclusão da Engenharia:</strong> {currentLesson.practicalCase.keyTakeaway}
              </p>
            </div>
          )}

          {/* Executive Summary */}
          {currentLesson?.executiveSummary && (
            <div className="bg-[#f8f9fa] border border-[#a2a9b1] p-3 rounded text-xs space-y-1.5">
              <span className="font-bold text-black uppercase tracking-wider text-[10px] block">
                Resumo Executivo (Pontos de Fixação):
              </span>
              <ul className="space-y-1 text-[#202122]">
                {currentLesson.executiveSummary.map((sum, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#4d861e] font-bold">✓</span>
                    <span>{sum}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes area */}
          <div className="bg-white border border-[#eaecf0] p-3 rounded space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-black">Anotações do Engenheiro sobre este Artigo:</span>
              <button
                onClick={handleSaveNote}
                className="px-2.5 py-1 bg-black text-white rounded text-xs hover:bg-[#333] transition-colors"
              >
                {isSavedNote ? 'Salvo!' : 'Salvar Nota'}
              </button>
            </div>
            <textarea
              rows={2}
              placeholder="Digite aqui apontamentos e considerações técnicas sobre este tomo..."
              value={userNote}
              onChange={e => setUserNote(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#a2a9b1] rounded p-2 text-xs text-black focus:outline-none focus:border-[#72c332]"
            />
          </div>

          {/* Bottom CTA to start quiz */}
          <div className="pt-3 border-t border-[#a2a9b1] flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-xs text-[#54595d]">
              Concluiu a leitura da ementa teórica deste tomo?
            </span>
            <button
              onClick={() => onStartQuiz(currentModule.id)}
              className="w-full sm:w-auto px-5 py-2 bg-[#72c332] hover:bg-[#5ea832] text-black text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <FileCheck2 className="w-4 h-4" /> Realizar Prova do Tomo {currentModule.moduleNumber}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
