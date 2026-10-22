import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Globe, 
  Download, 
  Upload, 
  ShieldCheck, 
  LogOut, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  Clock, 
  FileCheck2,
  AlertTriangle
} from 'lucide-react';
import { UserAccount, UserProgress } from '../types';
import { exportUserData, importUserData, logoutUser } from '../utils/authStorage';
import { INITIAL_USER_PROGRESS } from '../data/initialData';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLogout: () => void;
  onUpdateUser: (user: UserAccount) => void;
  onResetProgress: () => void;
}

export function UserAccountModal({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onUpdateUser,
  onResetProgress
}: UserAccountModalProps) {
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const progress = currentUser.progress;
  const completedModules = Object.values(progress.moduleProgress || {}).filter(p => p >= 100).length;
  const quizCount = Object.keys(progress.quizResults || {}).length;
  const averageQuizScore = quizCount > 0
    ? Math.round(Object.values(progress.quizResults).reduce((acc, q) => acc + q.scorePercent, 0) / quizCount)
    : 0;

  const handleDownloadBackup = () => {
    const jsonStr = exportUserData(currentUser);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanName = currentUser.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    a.download = `lopes_book_backup_${cleanName}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSuccessMsg('Cópia de segurança exportada com sucesso!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importUserData(content);
      if (res.success && res.user) {
        onUpdateUser(res.user);
        setSuccessMsg('Backup restaurado e sincronizado com êxito!');
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert(res.error || 'Falha ao restaurar backup');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border-2 border-[#202122] rounded-sm max-w-xl w-full text-[#202122] relative shadow-2xl my-8 font-sans">
        
        {/* Header */}
        <div className="bg-[#f8f9fa] border-b border-[#a2a9b1] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-black text-[#72c332] flex items-center justify-center font-bold text-base border border-black shadow-xs">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-base text-black">
                  {currentUser.name}
                </h2>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#f2f9ed] text-[#2b550e] border border-[#72c332] rounded font-bold">
                  CONTA ATIVA
                </span>
              </div>
              <p className="text-[11px] text-[#54595d] font-mono">
                {currentUser.email} • {currentUser.jurisdiction}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#54595d] hover:text-black hover:bg-[#eaecf0] transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {successMsg && (
            <div className="p-3 bg-[#f2f9ed] border border-[#72c332] rounded text-xs text-[#2b550e] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4d861e] shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Safeguard Status Box */}
          <div className="bg-[#f8f9fa] border border-[#a2a9b1] rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#4d861e]" />
                Estado da Salvaguarda de Desempenho
              </span>
              <span className="text-[10px] font-mono font-bold text-[#4d861e] bg-white px-2 py-0.5 rounded border border-[#72c332]">
                Sincronização Contínua
              </span>
            </div>

            <p className="text-[#54595d] text-[11px] leading-relaxed">
              Todos os seus registros de estudo, notas de cálculo, tempo de leitura e resultados de provas 
              estão associados ao seu perfil e protegidos contra perda acidental.
            </p>

            {/* Performance Statistics Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#eaecf0] text-center font-mono">
              <div className="bg-white p-2 rounded border border-[#eaecf0]">
                <span className="block text-[10px] text-[#54595d]">Módulos</span>
                <strong className="text-black text-sm">{completedModules} / 10</strong>
              </div>
              <div className="bg-white p-2 rounded border border-[#eaecf0]">
                <span className="block text-[10px] text-[#54595d]">Provas</span>
                <strong className="text-black text-sm">{quizCount}</strong>
              </div>
              <div className="bg-white p-2 rounded border border-[#eaecf0]">
                <span className="block text-[10px] text-[#54595d]">Média</span>
                <strong className="text-black text-sm">{averageQuizScore}%</strong>
              </div>
              <div className="bg-white p-2 rounded border border-[#eaecf0]">
                <span className="block text-[10px] text-[#54595d]">Estudo Total</span>
                <strong className="text-black text-sm">{progress.totalStudyMinutes || 0}m</strong>
              </div>
            </div>
          </div>

          {/* Backup & Portability Actions */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-black text-xs">
              Salvaguarda Externa & Portabilidade
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadBackup}
                className="p-3 bg-white hover:bg-[#f2f9ed] border border-[#a2a9b1] hover:border-[#72c332] rounded flex items-center gap-2.5 text-left transition-colors group shadow-xs"
              >
                <div className="w-8 h-8 rounded bg-[#f8f9fa] group-hover:bg-[#72c332] flex items-center justify-center text-black shrink-0 transition-colors">
                  <Download className="w-4 h-4 text-black" />
                </div>
                <div>
                  <strong className="block text-black text-xs">Exportar Backup (.json)</strong>
                  <span className="text-[10px] text-[#54595d]">Baixe uma cópia dos seus dados</span>
                </div>
              </button>

              <label className="p-3 bg-white hover:bg-[#f2f9ed] border border-[#a2a9b1] hover:border-[#72c332] rounded flex items-center gap-2.5 text-left transition-colors group cursor-pointer shadow-xs">
                <div className="w-8 h-8 rounded bg-[#f8f9fa] group-hover:bg-[#72c332] flex items-center justify-center text-black shrink-0 transition-colors">
                  <Upload className="w-4 h-4 text-black" />
                </div>
                <div>
                  <strong className="block text-black text-xs">Restaurar Backup</strong>
                  <span className="text-[10px] text-[#54595d]">Carregue arquivo .json anterior</span>
                </div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Danger zone & Session Actions */}
          <div className="pt-3 border-t border-[#eaecf0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => {
                if (window.confirm(`Confirma que deseja zerar os dados de desempenho da conta de ${currentUser.name}? Todos os módulos e testes voltarão a 0%.`)) {
                  onResetProgress();
                  setSuccessMsg('Desempenho da conta zerado para 0%.');
                }
              }}
              className="px-3 py-2 text-[#72777d] hover:text-red-700 hover:bg-red-50 rounded border border-transparent hover:border-red-200 text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Zerar meu desempenho (0%)
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-black hover:bg-[#202122] text-white font-bold rounded text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5 text-[#72c332]" /> Terminar Sessão (Sair)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
