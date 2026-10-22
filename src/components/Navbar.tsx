import { 
  BookOpen, 
  Search, 
  Layers, 
  FileCheck2, 
  Cpu, 
  Wrench, 
  Clock, 
  Award,
  Globe,
  Menu,
  X,
  ExternalLink,
  RotateCcw,
  User,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { UserAccount, UserProgress } from '../types';

interface NavbarProps {
  currentTab: 'home' | 'tracks' | 'exams' | 'stats' | 'tools';
  setCurrentTab: (tab: 'home' | 'tracks' | 'exams' | 'stats' | 'tools') => void;
  progress: UserProgress;
  sessionMinutes: number;
  onOpenCertificate: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  currentUser: UserAccount | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenAccountModal: () => void;
}

export function Navbar({
  currentTab,
  setCurrentTab,
  progress,
  sessionMinutes,
  onOpenCertificate,
  searchQuery,
  setSearchQuery,
  onToggleSidebar,
  isSidebarOpen,
  currentUser,
  onOpenAuth,
  onOpenAccountModal
}: NavbarProps) {
  const completedCount = Object.values(progress.moduleProgress).filter(p => p >= 100).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#a2a9b1] text-[#202122] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Top utility bar - Wikipedia User Tools & Jurisdictions */}
      <div className="border-b border-[#eaecf0] bg-[#f8f9fa] text-[11px] text-[#54595d] py-1 px-4 sm:px-6 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-semibold text-black flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#72c332] inline-block shadow-sm" />
            LOPES ENGENHARIA BOOK
          </span>
          <span className="hidden md:inline text-[#a2a9b1]">|</span>
          <span className="hidden md:inline font-mono text-[#54595d]">
            Tratado Curricular Intensivo 2026
          </span>
        </div>

        {/* Right: Personal tools & Login/Register */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1 font-mono text-black font-semibold">
            <Clock className="w-3 h-3 text-[#4d861e]" />
            <span>{sessionMinutes}m nesta sessão</span>
          </div>

          <span className="text-[#a2a9b1] hidden sm:inline">|</span>

          {currentUser ? (
            <button
              onClick={onOpenAccountModal}
              className="flex items-center gap-1.5 py-0.5 px-2 bg-white hover:bg-[#f2f9ed] border border-[#a2a9b1] hover:border-[#72c332] rounded text-black transition-colors"
              title="Abrir Painel da Conta & Salvaguarda de Desempenho"
            >
              <span className="w-4 h-4 rounded-xs bg-black text-[#72c332] flex items-center justify-center font-bold text-[10px]">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
              <span className="font-bold max-w-[120px] truncate text-black">
                {currentUser.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#72c332]" title="Desempenho Salvaguardado" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-[#202122] hover:text-black hover:underline font-medium text-[11px] flex items-center gap-1 transition-colors"
              >
                <LogIn className="w-3 h-3 text-[#4d861e]" />
                <span>Entrar</span>
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="py-0.5 px-2 bg-[#72c332] hover:bg-[#5ea832] text-black font-bold text-[11px] rounded transition-colors flex items-center gap-1 shadow-2xs"
                title="Cadastre-se para salvaguardar todo o seu histórico de desempenho"
              >
                <User className="w-3 h-3 text-black" />
                <span>Criar Conta</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-3">
          
          {/* Left: Hamburger + Lopes Engenharia Book Logo */}
          <div className="flex items-center gap-3 shrink-0">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-1.5 rounded hover:bg-[#eaecf0] text-black border border-transparent hover:border-[#a2a9b1] transition-all"
                title="Alternar índice da enciclopédia"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <div 
              onClick={() => setCurrentTab('home')} 
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-sm bg-black text-white flex items-center justify-center font-serif font-black text-xl border border-black shadow-sm group-hover:bg-[#72c332] group-hover:text-black group-hover:border-[#5ea832] transition-colors">
                L
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-serif font-bold text-lg tracking-tight text-black">
                    Lopes Engenharia
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#72c332] text-black rounded uppercase">
                    BOOK
                  </span>
                </div>
                <span className="text-[9px] text-[#54595d] tracking-wide block font-mono mt-0.5">
                  A Enciclopédia Técnica Livre
                </span>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#72777d]" />
              <input
                type="text"
                placeholder="Pesquisar no Lopes Engenharia Book (ex: DBO, Viga, Lei 5/98, EVM, C25/30)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black focus:border-[#72c332] focus:bg-white rounded pl-9 pr-3 py-1.5 text-xs text-black placeholder-[#72777d] focus:outline-none transition-colors shadow-inner"
              />
            </div>
          </div>

          {/* Right Navigation & Tools */}
          <div className="flex items-center gap-1 sm:gap-2">
            <nav className="hidden lg:flex items-center gap-1 border-r border-[#eaecf0] pr-2">
              <button
                onClick={() => setCurrentTab('home')}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  currentTab === 'home'
                    ? 'bg-[#72c332] text-black font-bold border border-[#5ea832]'
                    : 'text-[#202122] hover:bg-[#eaecf0]'
                }`}
              >
                Página Principal
              </button>

              <button
                onClick={() => setCurrentTab('tracks')}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  currentTab === 'tracks'
                    ? 'bg-[#72c332] text-black font-bold border border-[#5ea832]'
                    : 'text-[#202122] hover:bg-[#eaecf0]'
                }`}
              >
                Artigos & Tomos
              </button>

              <button
                onClick={() => setCurrentTab('exams')}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  currentTab === 'exams'
                    ? 'bg-[#72c332] text-black font-bold border border-[#5ea832]'
                    : 'text-[#202122] hover:bg-[#eaecf0]'
                }`}
              >
                Provas & Testes
              </button>

              <button
                onClick={() => setCurrentTab('stats')}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  currentTab === 'stats'
                    ? 'bg-[#72c332] text-black font-bold border border-[#5ea832]'
                    : 'text-[#202122] hover:bg-[#eaecf0]'
                }`}
              >
                Métricas & IA Coach
              </button>

              <button
                onClick={() => setCurrentTab('tools')}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  currentTab === 'tools'
                    ? 'bg-[#72c332] text-black font-bold border border-[#5ea832]'
                    : 'text-[#202122] hover:bg-[#eaecf0]'
                }`}
              >
                Calculadoras & Normas
              </button>
            </nav>

            {/* Certificate Button (Styled in White/Black/Lettuce Green) */}
            <button
              onClick={onOpenCertificate}
              className="px-3 py-1.5 rounded bg-white hover:bg-[#f2f9ed] text-black text-xs font-bold border-2 border-[#72c332] flex items-center gap-1.5 transition-colors shadow-sm"
              title="Emitir Certificado Técnico Oficial"
            >
              <Award className="w-3.5 h-3.5 text-[#4d861e]" />
              <span className="hidden sm:inline">Certificado</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-[#eaecf0] text-xs overflow-x-auto gap-2 bg-white">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-2 py-1 rounded text-xs ${currentTab === 'home' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d]'}`}
          >
            Início
          </button>
          <button
            onClick={() => setCurrentTab('tracks')}
            className={`px-2 py-1 rounded text-xs ${currentTab === 'tracks' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d]'}`}
          >
            Artigos
          </button>
          <button
            onClick={() => setCurrentTab('exams')}
            className={`px-2 py-1 rounded text-xs ${currentTab === 'exams' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d]'}`}
          >
            Provas
          </button>
          <button
            onClick={() => setCurrentTab('stats')}
            className={`px-2 py-1 rounded text-xs ${currentTab === 'stats' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d]'}`}
          >
            IA Coach
          </button>
          <button
            onClick={() => setCurrentTab('tools')}
            className={`px-2 py-1 rounded text-xs ${currentTab === 'tools' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d]'}`}
          >
            Ferramentas
          </button>
          {currentUser ? (
            <button
              onClick={onOpenAccountModal}
              className="px-2 py-1 rounded text-xs text-[#202122] flex items-center gap-1 font-bold"
              title="Minha Conta e Desempenho"
            >
              <span className="w-3.5 h-3.5 rounded-xs bg-black text-[#72c332] flex items-center justify-center text-[9px]">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
              <span>Conta</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-2 py-1 rounded text-xs text-[#202122] flex items-center gap-1 font-bold"
            >
              <User className="w-3 h-3 text-[#4d861e]" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
