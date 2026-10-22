import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  KeyRound, 
  Download, 
  Upload, 
  FileText 
} from 'lucide-react';
import { UserAccount, UserProgress } from '../types';
import { registerUser, loginUser, importUserData } from '../utils/authStorage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserAccount) => void;
  initialMode?: 'login' | 'register' | 'backup';
  currentProgress?: UserProgress;
}

export function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
  currentProgress
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'backup'>(initialMode);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regJurisdiction, setRegJurisdiction] = useState<'Angola' | 'Portugal' | 'Brasil' | 'Global'>('Angola');
  const [preserveCurrentProgress, setPreserveCurrentProgress] = useState(true);

  // Status & validation
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginUser(loginEmail, loginPassword);
      setIsSubmitting(false);

      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Erro ao efetuar login.');
      } else {
        setSuccessMessage(`Bem-vindo de volta, ${res.user.name}! Seus dados foram carregados.`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 600);
      }
    }, 200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('As senhas digitadas não coincidem.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = registerUser({
        name: regName,
        email: regEmail,
        password: regPassword,
        jurisdiction: regJurisdiction,
        currentProgress: preserveCurrentProgress ? currentProgress : undefined
      });
      setIsSubmitting(false);

      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Erro ao criar conta.');
      } else {
        setSuccessMessage('Conta criada com sucesso! Seus dados de desempenho estão salvaguardados.');
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 600);
      }
    }, 250);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importUserData(content);
      if (res.success && res.user) {
        setSuccessMessage(`Backup restaurado com sucesso para "${res.user.name}"!`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 700);
      } else {
        setErrorMessage(res.error || 'Falha ao restaurar o backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border-2 border-[#202122] rounded-sm max-w-lg w-full text-[#202122] relative shadow-2xl my-8 font-sans">
        
        {/* Header - Wikipedia Style */}
        <div className="bg-[#f8f9fa] border-b border-[#a2a9b1] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-black text-white flex items-center justify-center font-serif font-black text-lg border border-black shadow-xs">
              L
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-black leading-tight">
                Lopes Engenharia Book
              </h2>
              <p className="text-[11px] text-[#54595d] font-mono">
                Salvaguarda Oficial de Desempenho & Acesso
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

        {/* Tab Switcher */}
        <div className="flex border-b border-[#a2a9b1] bg-[#eaecf0] text-xs font-semibold">
          <button
            onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-2.5 px-4 text-center transition-colors border-r border-[#a2a9b1] ${
              mode === 'login'
                ? 'bg-white text-black font-bold border-b-2 border-b-[#72c332]'
                : 'text-[#54595d] hover:bg-[#dfe3e7]'
            }`}
          >
            Entrar na Conta
          </button>

          <button
            onClick={() => { setMode('register'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-2.5 px-4 text-center transition-colors border-r border-[#a2a9b1] ${
              mode === 'register'
                ? 'bg-white text-black font-bold border-b-2 border-b-[#72c332]'
                : 'text-[#54595d] hover:bg-[#dfe3e7]'
            }`}
          >
            Criar Nova Conta
          </button>

          <button
            onClick={() => { setMode('backup'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`py-2.5 px-3 text-center transition-colors flex items-center gap-1 ${
              mode === 'backup'
                ? 'bg-white text-black font-bold border-b-2 border-b-[#72c332]'
                : 'text-[#54595d] hover:bg-[#dfe3e7]'
            }`}
            title="Restaurar de arquivo .json"
          >
            <Upload className="w-3.5 h-3.5 text-[#4d861e]" />
            <span className="hidden sm:inline">Restaurar</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Messages */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-[#f2f9ed] border border-[#72c332] rounded text-xs text-[#2b550e] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4d861e] shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-xs text-[#54595d] border-l-2 border-[#72c332] pl-3 py-0.5">
                Acesse sua conta para recuperar seu progresso em módulos, notas de cálculo e resultados de provas.
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Endereço de E-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
                  <input
                    type="email"
                    required
                    placeholder="seu.email@engenharia.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-2 text-xs text-black placeholder-[#72777d] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Palavra-passe / Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-2 text-xs text-black placeholder-[#72777d] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#72c332] hover:bg-[#5ea832] disabled:opacity-50 text-black font-bold text-xs rounded transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-black" />
                {isSubmitting ? 'Verificando credenciais...' : 'Entrar e Carregar Desempenho'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(null); }}
                  className="text-xs text-[#202122] hover:underline"
                >
                  Ainda não tem conta? <strong className="text-[#4d861e]">Cadastre-se gratuitamente</strong>
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="text-xs text-[#54595d] border-l-2 border-[#72c332] pl-3 py-0.5">
                Crie seu registro para salvaguardar de forma definitiva todos os seus dados técnicos e certificados.
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Nome Completo (será impresso no Certificado Oficial)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Eng. Hamilton Domingos"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-2 text-xs text-black placeholder-[#72777d] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Endereço de E-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
                  <input
                    type="email"
                    required
                    placeholder="exemplo@dominio.com"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-2 text-xs text-black placeholder-[#72777d] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Senha (mín. 6 dígitos)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-2 text-xs text-black placeholder-[#72777d] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regConfirmPassword}
                      onChange={e => setRegConfirmPassword(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-2 text-xs text-black placeholder-[#72777d] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Jurisdição Técnica Preferencial
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
                  <select
                    value={regJurisdiction}
                    onChange={e => setRegJurisdiction(e.target.value as any)}
                    className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-2 text-xs text-black focus:outline-none transition-colors"
                  >
                    <option value="Angola">🇦🇴 Angola (Dec. Presidencial 117/20 & Lei 5/98)</option>
                    <option value="Portugal">🇵🇹 Portugal (Eurocódigos Estruturais & APA)</option>
                    <option value="Brasil">🇧🇷 Brasil (Normas ABNT NBR & CONAMA)</option>
                    <option value="Global">🌐 Global / Comparativo Internacional</option>
                  </select>
                </div>
              </div>

              {/* Preserve Current Progress Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer bg-[#f8f9fa] p-2.5 border border-[#eaecf0] rounded">
                  <input
                    type="checkbox"
                    checked={preserveCurrentProgress}
                    onChange={e => setPreserveCurrentProgress(e.target.checked)}
                    className="mt-0.5 accent-[#72c332]"
                  />
                  <div className="text-[11px] text-[#202122]">
                    <strong className="text-black block">Salvaguardar o progresso já realizado</strong>
                    Transfere os testes, módulos concluídos e notas desta sessão de convidado para a sua nova conta.
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#72c332] hover:bg-[#5ea832] disabled:opacity-50 text-black font-bold text-xs rounded transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                {isSubmitting ? 'Registrando...' : 'Criar Conta & Salvaguardar Desempenho'}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(null); }}
                  className="text-xs text-[#202122] hover:underline"
                >
                  Já possui conta? <strong className="text-[#4d861e]">Faça login aqui</strong>
                </button>
              </div>
            </form>
          )}

          {/* BACKUP RESTORE TAB */}
          {mode === 'backup' && (
            <div className="space-y-4">
              <div className="text-xs text-[#54595d] border-l-2 border-[#72c332] pl-3 py-0.5">
                Restaurar uma cópia de segurança oficial (.json) gerada anteriormente pelo <strong>Lopes Engenharia Book</strong>.
              </div>

              <div className="border-2 border-dashed border-[#a2a9b1] hover:border-[#72c332] rounded p-6 text-center bg-[#f8f9fa] transition-colors">
                <Upload className="w-8 h-8 text-[#4d861e] mx-auto mb-2" />
                <p className="text-xs font-bold text-black mb-1">
                  Selecione o arquivo de backup (.json)
                </p>
                <p className="text-[11px] text-[#54595d] mb-4">
                  Compatível com todas as exportações de desempenho do sistema.
                </p>
                <label className="inline-block py-2 px-4 bg-black text-white hover:bg-[#202122] text-xs font-bold rounded cursor-pointer transition-colors shadow-xs">
                  Carregar Arquivo JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="bg-[#f2f9ed] p-3 rounded border border-[#72c332] text-[11px] text-[#2b550e] space-y-1">
                <span className="font-bold block">Privacidade e Proteção:</span>
                <p>
                  A restauração é executada de forma estritamente local no seu navegador. Nenhuma informação confidencial de senhas é exposta.
                </p>
              </div>
            </div>
          )}

          {/* Privacy & Safeguard Notice Footer */}
          <div className="pt-3 border-t border-[#eaecf0] flex items-center justify-between text-[10px] text-[#72777d] font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4d861e]" />
              Armazenamento Seguro de Desempenho
            </span>
            <span>Edição 2026.1</span>
          </div>

        </div>

      </div>
    </div>
  );
}
