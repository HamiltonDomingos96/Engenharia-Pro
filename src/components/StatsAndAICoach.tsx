import React, { useState } from 'react';
import { 
  BarChart3, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Target, 
  Compass, 
  Activity, 
  Check,
  MessageSquare
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { BADGES_INFO } from '../data/initialData';
import { calculateAICoachDiagnosis, answerEngineeringQuery } from '../utils/aiCoachEngine';
import { UserProgress } from '../types';

interface StatsAndAICoachProps {
  progress: UserProgress;
  onNavigateToModule: (moduleId: string) => void;
  onNavigateToQuiz: (moduleId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export function StatsAndAICoach({
  progress,
  onNavigateToModule,
  onNavigateToQuiz
}: StatsAndAICoachProps) {
  const diagnosis = calculateAICoachDiagnosis(progress);

  // Chatbot state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Olá! Sou o Mentor Técnico do Lopes Engenharia Book. Analisei a sua matriz de aprendizagem: a formação intensiva está pronta para início no Volume I (Monitorização Ambiental) e Volume II (Leitura de Plantas e Estruturas). O que gostaria de calcular, consultar ou esclarecer sobre o corpus normativo agora?`,
      timestamp: 'Hoje'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Pillar statistics
  const ambientalModules = COURSES_DATA.filter(m => m.pillar === 'ambiental');
  const civilModules = COURSES_DATA.filter(m => m.pillar === 'civil');

  const calcPillarProgress = (mods: typeof COURSES_DATA) => {
    const total = mods.length * 100;
    const current = mods.reduce((sum, m) => sum + (progress.moduleProgress[m.id] || 0), 0);
    return Math.round((current / total) * 100);
  };

  const ambientalPercent = calcPillarProgress(ambientalModules);
  const civilPercent = calcPillarProgress(civilModules);

  // Quick suggestions for chat
  const quickQuestions = [
    'Como calcular a armadura As de uma viga retangular?',
    'Quais as exigências da Lei nº 5/98 e Dec. 117/20 de Angola?',
    'Qual a relação prática entre DBO e DQO no tratamento de efluentes?',
    'Como interpretar IDP e IDC na Análise do Valor Agregado (EVM)?',
    'O que significa o betão C25/30 no Eurocódigo 2?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Agora'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = answerEngineeringQuery(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response,
        timestamp: 'Agora'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="bg-white border border-[#a2a9b1] rounded-sm p-4 sm:p-8 max-w-[1380px] mx-auto text-[#202122] font-sans space-y-6">
      
      {/* Section Header */}
      <div className="border-b border-[#a2a9b1] pb-3 space-y-1">
        <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
          Lopes Engenharia Book • Painel Analítico & Tutoria
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
          Métricas de Aprendizagem & IA Mentor de Engenharia
        </h1>
        <p className="text-xs text-[#54595d]">
          Diagnóstico do avanço curricular, índice de domínio analítico e mentoria técnica especializada.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Progress by Volume and Accuracy */}
        <div className="lg:col-span-6 border border-[#a2a9b1] bg-[#f8f9fa] rounded-sm p-5 space-y-4">
          <h2 className="text-base font-serif font-bold text-black border-b border-[#eaecf0] pb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#4d861e]" /> Progresso Curricular por Volume
          </h2>

          {/* Volume I */}
          <div className="space-y-1.5 bg-white border border-[#eaecf0] p-3 rounded">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-black flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#4d861e]" /> Volume I: Engenharia Ambiental (4 Tomos)
              </span>
              <span className="font-mono font-bold text-black">{ambientalPercent}%</span>
            </div>
            <div className="w-full bg-[#eaecf0] h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#72c332] rounded-full transition-all duration-500" 
                style={{ width: `${ambientalPercent}%` }}
              />
            </div>
          </div>

          {/* Volume II */}
          <div className="space-y-1.5 bg-white border border-[#eaecf0] p-3 rounded">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-black flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#4d861e]" /> Volume II: Engenharia Civil (6 Tomos)
              </span>
              <span className="font-mono font-bold text-black">{civilPercent}%</span>
            </div>
            <div className="w-full bg-[#eaecf0] h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black rounded-full transition-all duration-500" 
                style={{ width: `${civilPercent}%` }}
              />
            </div>
          </div>

          {/* Module Breakdown */}
          <div className="border-t border-[#eaecf0] pt-3 space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider text-[#54595d] block">
              Avanço Individual dos 10 Tomos:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {COURSES_DATA.map(m => {
                const p = progress.moduleProgress[m.id] || 0;
                return (
                  <div key={m.id} className="p-2 rounded bg-white border border-[#eaecf0] flex justify-between items-center">
                    <span className="text-[#202122] truncate pr-1">T{m.moduleNumber}: {m.title.split(' ')[0]}</span>
                    <span className={`font-bold ${p === 100 ? 'text-[#4d861e]' : 'text-[#72777d]'}`}>{p}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Diagnosis & Recommendations */}
        <div className="lg:col-span-6 border border-[#a2a9b1] bg-white rounded-sm p-5 space-y-4">
          <h2 className="text-base font-serif font-bold text-black border-b border-[#eaecf0] pb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#4d861e]" /> Diagnóstico Automático & Prioridades
          </h2>

          <div className="p-3 bg-[#f2f9ed] border-l-4 border-[#72c332] text-xs space-y-1">
            <span className="font-bold text-black">Conceito de Domínio Atual:</span>
            <div className="text-2xl font-mono font-bold text-black">
              {diagnosis.overallHealthScore}% ({diagnosis.dominantLevel})
            </div>
            <p className="text-[#54595d]">
              Inicie os estudos teóricos e simulados para consolidar a matriz de proficiência do tratado.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-black block uppercase tracking-wide">
              Ações Curriculares Recomendadas:
            </span>
            <div className="space-y-2">
              {diagnosis.recommendedActions.slice(0, 3).map((rec, i) => (
                <div key={i} className="p-2.5 rounded bg-[#f8f9fa] border border-[#eaecf0] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-black">{rec.actionText}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#72c332] text-black">
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#54595d]">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wikipedia AI Discussion Room (Chatbot in White, Black, Lettuce Green) */}
      <div className="border border-[#a2a9b1] bg-[#f8f9fa] rounded-sm p-6 space-y-4">
        <div className="border-b border-[#eaecf0] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-[#72c332] text-black flex items-center justify-center font-bold font-mono">
              IA
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-black">
                Página de Discussão Técnica com o IA Mentor
              </h3>
              <p className="text-xs text-[#54595d]">
                Consulte qualquer dúvida sobre dimensionamento, fórmulas de vigas, normas de Angola ou parâmetros ambientais.
              </p>
            </div>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[#54595d] text-[11px] font-mono whitespace-nowrap">Perguntas Frequentes:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded bg-white hover:bg-[#eaecf0] border border-[#a2a9b1] text-xs text-[#202122] whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat message box */}
        <div className="space-y-3 max-h-96 overflow-y-auto p-4 rounded bg-white border border-[#a2a9b1]">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-[#72c332] text-black text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-1">
                  W
                </div>
              )}

              <div className={`p-3 rounded text-xs sm:text-sm leading-relaxed max-w-xl ${
                msg.sender === 'user'
                  ? 'bg-black text-white rounded-tr-none'
                  : 'bg-[#f8f9fa] border border-[#a2a9b1] text-[#202122] rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-1">
                  U
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="text-xs text-[#54595d] italic font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#72c332] animate-ping" />
              IA Mentor estruturando a resposta com fundamentação técnica...
            </div>
          )}
        </div>

        {/* Chat input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite a sua dúvida técnica de engenharia..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-white border border-[#a2a9b1] rounded px-3 py-2 text-xs sm:text-sm text-black placeholder-[#72777d] focus:outline-none focus:border-[#72c332]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim()}
            className="px-5 py-2 bg-black hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded transition-colors flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" /> Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
