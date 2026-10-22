import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RefreshCw, 
  ChevronRight, 
  BookOpen,
  Cpu
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { MasteryLevel, QuizQuestion, QuizResult, UserProgress } from '../types';

interface ExamsAndQuizzesProps {
  progress: UserProgress;
  onSaveQuizResult: (result: QuizResult) => void;
  selectedModuleId?: string;
  onNavigateToStats: () => void;
  onNavigateToModule: (moduleId: string) => void;
}

export function ExamsAndQuizzes({
  progress,
  onSaveQuizResult,
  selectedModuleId,
  onNavigateToStats,
  onNavigateToModule
}: ExamsAndQuizzesProps) {
  const [currentModuleId, setCurrentModuleId] = useState<string>(
    selectedModuleId || COURSES_DATA[0].id
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);

  // Sync selected module if prop changes
  React.useEffect(() => {
    if (selectedModuleId) {
      setCurrentModuleId(selectedModuleId);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsAnswerSubmitted(false);
      setIsExamCompleted(false);
    }
  }, [selectedModuleId]);

  const questions = QUIZZES_DATA[currentModuleId] || [];
  const currentQuestion: QuizQuestion | undefined = questions[currentQuestionIndex];
  const currentModule = COURSES_DATA.find(m => m.id === currentModuleId) || COURSES_DATA[0];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleSubmitCurrentAnswer = () => {
    if (!selectedAnswers[currentQuestion?.id]) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    let correctCount = 0;
    const answersRecord: QuizResult['answers'] = [];

    questions.forEach(q => {
      const chosenOptId = selectedAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      const isCorrect = chosenOptId === correctOpt?.id;
      if (isCorrect) correctCount++;

      answersRecord.push({
        questionId: q.id,
        selectedOptionId: chosenOptId || '',
        isCorrect
      });
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);

    let masteryLevel: MasteryLevel = 'Iniciante';
    if (scorePercent >= 90) masteryLevel = 'Especialista';
    else if (scorePercent >= 70) masteryLevel = 'Avançado';
    else if (scorePercent >= 50) masteryLevel = 'Intermediário';

    const result: QuizResult = {
      moduleId: currentModuleId,
      scorePercent,
      correctCount,
      totalQuestions: questions.length,
      masteryLevel,
      completedAt: new Date().toISOString(),
      answers: answersRecord
    };

    onSaveQuizResult(result);
    setIsExamCompleted(true);

    if (scorePercent >= 70) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsAnswerSubmitted(false);
    setIsExamCompleted(false);
  };

  const previousResult = progress.quizResults[currentModuleId];

  return (
    <div className="bg-white border border-[#a2a9b1] rounded-sm p-4 sm:p-8 max-w-[1100px] mx-auto text-[#202122] font-sans space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#a2a9b1] pb-3 space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
              Lopes Engenharia Book • Avaliação do Tratado
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
              Provas Comentadas e Validação de Conhecimento
            </h1>
          </div>
          <span className="text-xs text-[#54595d] font-mono">
            Correção imediata com fundamentação de engenharia
          </span>
        </div>

        {/* Tome selection tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs pt-2">
          {COURSES_DATA.map(mod => {
            const isSelected = mod.id === currentModuleId;
            const res = progress.quizResults[mod.id];

            return (
              <button
                key={mod.id}
                onClick={() => {
                  setCurrentModuleId(mod.id);
                  handleRestartQuiz();
                }}
                className={`px-3 py-1.5 rounded border whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#72c332] text-black font-bold border-[#5ea832]'
                    : 'bg-[#f8f9fa] border-[#a2a9b1] text-black hover:bg-white'
                }`}
              >
                <span>Tomo {mod.moduleNumber}: {mod.title.split(' ')[0]}</span>
                {res && (
                  <span className="text-[10px] font-mono font-bold px-1 bg-white rounded border border-[#a2a9b1]">
                    {res.scorePercent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Box */}
      {!isExamCompleted && currentQuestion && (
        <div className="border border-[#a2a9b1] bg-[#f8f9fa] rounded-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#eaecf0] pb-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-black text-white font-mono font-bold">
              Questão {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="text-[#54595d]">
              Grau de Dificuldade: <strong>{currentQuestion.difficulty}</strong>
            </span>
            {currentQuestion.normReference && (
              <span className="text-[#54595d] font-mono hidden sm:inline">
                Referência: {currentQuestion.normReference}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-serif text-black font-bold leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswers[currentQuestion.id] === option.id;
              let optionStyle = 'bg-white border-[#a2a9b1] hover:bg-[#eaecf0] text-[#202122]';

              if (isAnswerSubmitted) {
                if (option.isCorrect) {
                  optionStyle = 'bg-[#f2f9ed] border-2 border-[#4d861e] text-black font-semibold';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'bg-[#f8f9fa] border-2 border-black text-[#54595d]';
                } else {
                  optionStyle = 'bg-white border-[#eaecf0] text-[#72777d] opacity-50';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#f2f9ed] border-2 border-[#72c332] text-black font-bold';
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-3.5 rounded border text-xs sm:text-sm cursor-pointer transition-colors ${optionStyle}`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono font-bold mt-0.5">
                      {isAnswerSubmitted && option.isCorrect && '✓'}
                      {isAnswerSubmitted && isSelected && !option.isCorrect && '✗'}
                      {!isAnswerSubmitted && (isSelected ? '●' : '○')}
                    </span>
                    <div className="space-y-2 flex-1">
                      <div className="leading-relaxed">{option.text}</div>
                      
                      {isAnswerSubmitted && (isSelected || option.isCorrect) && (
                        <div className={`p-2.5 rounded text-xs leading-relaxed border ${
                          option.isCorrect ? 'bg-white border-[#72c332] text-black' : 'bg-white border-black text-black'
                        }`}>
                          <strong className="block mb-0.5">
                            {option.isCorrect ? 'Justificativa Técnica de Engenharia:' : 'Por que está incorreta:'}
                          </strong>
                          {option.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-[#eaecf0]">
            <span className="text-xs text-[#54595d]">
              Tomo: {currentModule.title}
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitCurrentAnswer}
                disabled={!selectedAnswers[currentQuestion.id]}
                className="px-5 py-2 bg-black hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded transition-colors"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2 bg-[#72c332] hover:bg-[#5ea832] text-black text-xs font-bold rounded flex items-center gap-1 transition-colors"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Próxima Questão' : 'Finalizar Prova'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completed Exam Card */}
      {isExamCompleted && (
        <div className="border border-[#a2a9b1] bg-[#f8f9fa] rounded-sm p-8 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-[#72c332] text-[#4d861e] flex items-center justify-center mx-auto text-2xl font-bold font-serif">
            ✓
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#54595d] font-bold block">
              Avaliação do Tomo Concluída
            </span>
            <h2 className="text-xl font-serif font-bold text-black">
              {currentModule.title}
            </h2>
          </div>

          {previousResult && (
            <div className="p-4 bg-white border border-[#a2a9b1] rounded max-w-xs mx-auto space-y-2">
              <div className="text-4xl font-mono font-black text-black">
                {previousResult.scorePercent}%
              </div>
              <span className="inline-block px-2.5 py-0.5 bg-[#72c332] text-black text-xs font-bold font-mono rounded">
                Nível: {previousResult.masteryLevel}
              </span>
              <p className="text-xs text-[#54595d]">
                {previousResult.correctCount} de {previousResult.totalQuestions} questões acertadas.
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="px-4 py-2 bg-white hover:bg-[#eaecf0] text-black border border-[#a2a9b1] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refazer Prova
            </button>
            <button
              onClick={() => onNavigateToModule(currentModuleId)}
              className="px-4 py-2 bg-white hover:bg-[#eaecf0] text-black border border-[#a2a9b1] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" /> Rever Teoria do Tomo
            </button>
            <button
              onClick={onNavigateToStats}
              className="px-4 py-2 bg-[#72c332] hover:bg-[#5ea832] text-black text-xs font-bold rounded flex items-center gap-1.5 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5" /> Ver IA Mentor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
