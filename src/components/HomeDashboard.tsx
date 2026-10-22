import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Globe, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  Scale, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  Activity, 
  Layers, 
  Award, 
  ArrowRight, 
  FileCheck2, 
  CheckCircle2, 
  BookMarked,
  Library,
  Bookmark,
  ExternalLink,
  Info,
  ChevronDown,
  ChevronUp,
  FileCode,
  History,
  MessageSquare
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { UserAccount, UserProgress } from '../types';

interface HomeDashboardProps {
  progress: UserProgress;
  onNavigateToModule: (moduleId: string) => void;
  onNavigateToTab: (tab: 'tracks' | 'exams' | 'stats' | 'tools') => void;
  onOpenCertificate: () => void;
  currentUser?: UserAccount | null;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  onOpenAccountModal?: () => void;
}

// Technical encyclopedic compendium terms (A-Z)
const ENCYCLOPEDIC_TERMS = [
  {
    letter: 'A',
    term: 'Área de Armadura Longitudinal (As)',
    category: 'Engenharia Civil',
    formula: 'As ≈ Md / (0.9 · d · fyd)',
    norm: 'Eurocódigo 2 (EN 1992-1-1) / ABNT NBR 6118:2023',
    definition: 'Área transversal total das barras de aço dispostas na zona tracionada para resistir aos esforços de flexão pura ou composta no Estado Limite Último (ELU).'
  },
  {
    letter: 'B',
    term: 'BDI (Benefícios e Despesas Indiretas)',
    category: 'Gestão de Obras',
    formula: 'BDI = [((1+AC+S+R+G)(1+DF)(1+L)) / (1-I)] - 1',
    norm: 'Engenharia de Custos / TCU / ABNT NBR 12721',
    definition: 'Taxa percentual aplicada sobre o Custo Direto (CD) da obra para cobrir despesas de administração central, riscos, seguros, lucro e tributos sobre faturamento.'
  },
  {
    letter: 'C',
    term: 'Classe C25/30 do Betão',
    category: 'Engenharia Civil',
    formula: 'fck,cyl = 25 MPa | fck,cube = 30 MPa',
    norm: 'Eurocódigo 2 (EN 206 / EN 1992-1-1)',
    definition: 'Notação europeia padronizada de resistência característica. O primeiro valor (25 MPa) é a resistência cilíndrica a adotar no cálculo estrutural; o segundo (30 MPa) refere-se ao ensaio cúbico.'
  },
  {
    letter: 'D',
    term: 'DBO₅ (Demanda Bioquímica de Oxigénio)',
    category: 'Engenharia Ambiental',
    formula: 'Razão DBO₅/DQO > 0.5 (Tratamento Biológico)',
    norm: 'Standard Methods / Padrões de Descarga de Angola',
    definition: 'Quantidade de oxigênio consumida por microrganismos aeróbios durante 5 dias a 20°C para degradar a matéria orgânica carbonácea presente em efluentes ou mananciais.'
  },
  {
    letter: 'D',
    term: 'Decreto Presidencial nº 117/20',
    category: 'Legislação Ambiental',
    formula: 'Categorias A (EIA Completo), B e C',
    norm: 'República de Angola (22 de Abril de 2020)',
    definition: 'Regulamento oficial sobre o Procedimento de Avaliação de Impacte Ambiental em Angola. Define a categorização obrigatória de projetos, audiências públicas e tramitação de licenças.'
  },
  {
    letter: 'E',
    term: 'EIA (Estudo de Impacto Ambiental)',
    category: 'Engenharia Ambiental',
    formula: 'Diagnóstico + Prognóstico + PGA + RIMA',
    norm: 'Lei nº 5/98 (Angola) & Diretiva Europeia 2011/92/UE',
    definition: 'Instrumento preventivo de política ambiental e engenharia que examina as consequências ecológicas e socioeconômicas de projetos de significativa repercussão.'
  },
  {
    letter: 'E',
    term: 'EVM (Earned Value Management)',
    category: 'Gestão de Obras',
    formula: 'IDP = VA / VP  |  IDC = VA / CR',
    norm: 'ISO 21508 / Prática Internacional de Projetos',
    definition: 'Análise do Valor Agregado: metodologia integrada para controle físico-financeiro de obras através de indicadores objetivos de cronograma (IDP) e custos (IDC).'
  },
  {
    letter: 'L',
    term: 'Lei nº 5/98 (Lei de Bases do Ambiente)',
    category: 'Legislação Ambiental',
    formula: 'Artigo 16º: Obrigatoriedade de AIA Prévia',
    norm: 'Assembleia Nacional de Angola (19 de Junho de 1998)',
    definition: 'Diploma legislativo fundamental de Angola que estabelece os princípios da prevenção, poluidor-pagador, cooperação e a exigência de licenciamento ambiental.'
  },
  {
    letter: 'M',
    term: 'Matriz de Leopold',
    category: 'Engenharia Ambiental',
    formula: 'Cruzamento: Magnitude (±1 a 10) / Importância (1 a 10)',
    norm: 'USGS Circular 645 / Metodologia de Leopold et al.',
    definition: 'Método bidimensional de avaliação qualitativa e semiquantitativa de impactos que confronta ações humanas do projeto com fatores ambientais receptores.'
  },
  {
    letter: 'P',
    term: 'PM₂.₅ (Material Particulado Fino)',
    category: 'Engenharia Ambiental',
    formula: 'Diâmetro aerodinâmico ≤ 2.5 µm',
    norm: 'Diretrizes OMS de Qualidade do Ar / IFC Guidelines',
    definition: 'Frações microscópicas de partículas sólidas ou líquidas em suspensão atmosférica capazes de ultrapassar barreiras respiratórias e atingir os alvéolos pulmonares.'
  },
  {
    letter: 'R',
    term: 'RCD (Resíduos de Construção e Demolição)',
    category: 'Engenharia Sustentável',
    formula: 'Taxa de Absorção do ARB: 5% a 12% (Pré-molhagem)',
    norm: 'EN 12620 / ABNT NBR 15116',
    definition: 'Entulhos de concreto e alvenaria britados e triados para substituição parcial de agregados naturais, promovendo a economia circular e redução da pegada de carbono.'
  },
  {
    letter: 'S',
    term: 'Slump Test (Abatimento do Tronco de Cone)',
    category: 'Engenharia Civil',
    formula: 'Tolerância usual: ± 2.0 cm do valor especificado',
    norm: 'EN 12350-2 / ABNT NBR NM 67',
    definition: 'Ensaio de controle tecnológico imediato realizado na recepção do betão pronto em obra para aferir a plasticidade, trabalhabilidade e consistência da mistura fresca.'
  }
];

export function HomeDashboard({
  progress,
  onNavigateToModule,
  onNavigateToTab,
  onOpenCertificate,
  currentUser,
  onOpenAuth,
  onOpenAccountModal
}: HomeDashboardProps) {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolume, setSelectedVolume] = useState<'all' | 'ambiental' | 'civil'>('all');
  const [isTocOpen, setIsTocOpen] = useState(true);
  const [activeArticleTab, setActiveArticleTab] = useState<'artigo' | 'discussao' | 'formulas'>('artigo');
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<typeof ENCYCLOPEDIC_TERMS[0] | null>(null);

  // Daily challenge
  const [dailyAnswer, setDailyAnswer] = useState<number | null>(null);
  const [showDailyFeedback, setShowDailyFeedback] = useState(false);

  // Stats calculation (zerado)
  const totalModules = COURSES_DATA.length;
  const completedModules = Object.values(progress.moduleProgress).filter(p => p >= 100).length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  // Filter modules for encyclopedic index
  const filteredModules = useMemo(() => {
    return COURSES_DATA.filter(mod => {
      const matchVolume = selectedVolume === 'all' || mod.pillar === selectedVolume;
      const term = searchTerm.toLowerCase().trim();

      const matchSearch = term === '' ||
        mod.title.toLowerCase().includes(term) ||
        mod.shortDescription.toLowerCase().includes(term) ||
        mod.learningObjectives.some(o => o.toLowerCase().includes(term)) ||
        mod.lessons.some(l => 
          l.title.toLowerCase().includes(term) ||
          l.theory.some(t => t.toLowerCase().includes(term)) ||
          l.executiveSummary.some(s => s.toLowerCase().includes(term)) ||
          l.technicalFormulasOrStandards?.some(f => f.label.toLowerCase().includes(term) || f.description.toLowerCase().includes(term))
        );

      return matchVolume && matchSearch;
    });
  }, [searchTerm, selectedVolume]);

  const ambientalModules = filteredModules.filter(m => m.pillar === 'ambiental');
  const civilModules = filteredModules.filter(m => m.pillar === 'civil');

  return (
    <div className="bg-white border border-[#a2a9b1] rounded-sm shadow-sm p-4 sm:p-8 max-w-[1380px] mx-auto text-[#202122] font-sans">
      
      {/* Wikipedia Article Top Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#a2a9b1] pb-0 -mt-2 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveArticleTab('artigo')}
            className={`px-3 py-1.5 border-t border-x rounded-t transition-colors ${
              activeArticleTab === 'artigo'
                ? 'bg-white border-[#a2a9b1] border-b-transparent font-bold text-black relative top-[1px]'
                : 'bg-[#f8f9fa] border-transparent text-[#54595d] hover:text-black'
            }`}
          >
            Artigo Principal
          </button>

          <button
            onClick={() => onNavigateToTab('stats')}
            className="px-3 py-1.5 border-t border-x border-transparent rounded-t text-[#54595d] hover:text-black hover:bg-[#eaecf0] transition-colors flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3 text-[#4d861e]" /> Discussão com IA Coach
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#54595d]">
          <span className="hidden sm:inline font-mono text-[11px]">Normas: 🇦🇴 Lei 5/98 • 🇵🇹 Eurocódigos • 🇧🇷 ABNT</span>
          <span className="text-[#a2a9b1] hidden sm:inline">|</span>
          <button
            onClick={() => onNavigateToTab('tools')}
            className="hover:text-black hover:underline flex items-center gap-1"
          >
            <FileCode className="w-3 h-3 text-[#4d861e]" /> Ver Fórmulas Técnicas
          </button>
        </div>
      </div>

      {/* Wikipedia Article Main Heading */}
      <div className="space-y-1 mb-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#a2a9b1] pb-1">
          <h1 className="text-3xl sm:text-4xl font-serif text-black font-normal">
            Lopes Engenharia Book
          </h1>
          <span className="text-xs text-[#54595d] font-mono">
            Edição Atualizada 2026 • Tratado Técnico Oficial
          </span>
        </div>
        <p className="text-xs text-[#54595d] italic">
          Origem: Lopes Engenharia Book — Enciclopédia Técnica e Manual Prático Livre.
        </p>
      </div>

      {/* User Performance Safeguard Notice Banner */}
      {!currentUser ? (
        <div className="p-3 mb-4 bg-white border border-[#a2a9b1] border-l-4 border-l-[#72c332] text-xs text-[#202122] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#4d861e] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-black block text-xs">
                Salvaguarda Oficial de Desempenho do Estudante
              </strong>
              <p className="text-[#54595d] text-[11px] leading-relaxed">
                Você está em modo de leitura aberta. <strong>Cadastre-se ou inicie sessão</strong> para salvaguardar permanentemente seu progresso de leitura, resoluções de provas, notas de estudo e emissão de certificados oficiais com seu nome.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenAuth?.('register')}
              className="px-3 py-1.5 bg-[#72c332] hover:bg-[#5ea832] text-black font-bold rounded text-xs transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span>Criar Conta</span>
            </button>
            <button
              onClick={() => onOpenAuth?.('login')}
              className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#eaecf0] border border-[#a2a9b1] text-black font-semibold rounded text-xs transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 mb-4 bg-[#f2f9ed] border border-[#72c332] border-l-4 border-l-[#4d861e] text-xs text-[#202122] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xs bg-black text-[#72c332] flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-black font-bold text-xs flex items-center gap-1.5">
                Desempenho Salvaguardado: {currentUser.name}
                <span className="w-2 h-2 rounded-full bg-[#72c332]" />
              </span>
              <p className="text-[#54595d] text-[11px]">
                Conta oficial autenticada ({currentUser.email}) • Jurisdição ativa: {currentUser.jurisdiction} • Dados 100% salvos e sincronizados.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAccountModal}
            className="px-3 py-1.5 bg-white hover:bg-[#f8f9fa] border border-[#a2a9b1] hover:border-black text-black font-bold rounded text-xs transition-colors shrink-0 shadow-2xs"
          >
            Gerenciar Salvaguarda & Backup
          </button>
        </div>
      )}

      {/* Wikipedia Callout Notice Box in White, Black, Lettuce Green */}
      <div className="p-3 mb-6 bg-[#f2f9ed] border-l-4 border-[#72c332] text-xs text-[#202122] flex items-start gap-3 shadow-xs">
        <div className="w-5 h-5 rounded-full bg-[#72c332] text-black font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono">
          i
        </div>
        <div className="space-y-1 leading-relaxed">
          <span className="font-bold text-black uppercase tracking-wide">
            Lopes Engenharia Book — Formação Intensiva de Elite (Do Básico ao Profissional):
          </span>
          <p>
            Este tratado técnico reúne os fundamentos científicos, o cálculo estrutural no Estado Limite Último (ELU), a monitorização físico-química de poluentes, e o arcabouço normativo cruzado entre a <strong>República de Angola (Lei nº 5/98 e Decreto Presidencial nº 117/20)</strong>, <strong>Portugal (Eurocódigos EN 1990/EN 1992)</strong> e o <strong>Brasil (ABNT NBR 6118:2023)</strong>.
          </p>
        </div>
      </div>


      {/* Main Grid: Left Column (Article, TOC, Syllabus) + Right Column (Wikipedia Infobox) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Article Body & Structured Syllabus) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Article Introduction */}
          <div className="text-sm leading-relaxed text-[#202122] space-y-3">
            <p>
              O <strong>Lopes Engenharia Book</strong> é um compêndio enciclopédico e manual prático de formação acelerada estruturado em dois volumes primários complementares. No âmbito ambiental, a obra examina as variáveis físico-químicas de corpos receptores (demanda bioquímica de oxigênio DBO₅, DQO e oxigênio dissolvido)<sup>[1]</sup>, o controle de material particulado atmosférico (PM₁₀ e PM₂.₅)<sup>[2]</sup>, os Estudos de Impacto Ambiental (EIA) e a auditoria em conformidade com o ciclo PDCA da norma ISO 14001<sup>[3]</sup>.
            </p>
            <p>
              No campo da engenharia estrutural e de infraestruturas, a enciclopédia aborda a interpretação técnica de pranchas de armaduras, o dimensionamento à flexão simples de vigas de betão armado, o controle orçamentário por meio do BDI e Curva ABC 80/20<sup>[4]</sup>, e a fiscalização de avanço físico-financeiro baseada no <em>Earned Value Management</em> (EVM)<sup>[5]</sup>.
            </p>
          </div>

          {/* Wikipedia Table of Contents (Índice de Conteúdos Box) */}
          <div className="border border-[#a2a9b1] bg-[#f8f9fa] rounded-sm p-4 w-full sm:w-auto inline-block min-w-[300px]">
            <div className="flex items-center justify-between gap-4 border-b border-[#eaecf0] pb-2 mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-[#4d861e]" /> Índice do Tratado
              </span>
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="text-xs text-[#0645ad] hover:underline flex items-center gap-1 font-mono"
              >
                [{isTocOpen ? 'ocultar' : 'mostrar'}]
              </button>
            </div>

            {isTocOpen && (
              <ol className="text-xs space-y-1.5 text-[#202122] font-sans">
                <li>
                  <a href="#volume-1" className="text-[#0645ad] hover:underline font-bold">
                    1. Volume I: Engenharia Ambiental e Monitorização
                  </a>
                  <ol className="pl-4 pt-1 space-y-1 text-[#54595d]">
                    <li><a href="#amb-mod-1" className="text-[#0645ad] hover:underline">1.1 Tomo 1: Monitorização de Ar, Água, Solos e Ruído</a></li>
                    <li><a href="#amb-mod-2" className="text-[#0645ad] hover:underline">1.2 Tomo 2: EIA, RIMA e Matriz de Leopold</a></li>
                    <li><a href="#amb-mod-3" className="text-[#0645ad] hover:underline">1.3 Tomo 3: Auditorias Ambientais ISO 14001 e RCA</a></li>
                    <li><a href="#amb-mod-4" className="text-[#0645ad] hover:underline">1.4 Tomo 4: Legislação de Angola (Lei 5/98 e Dec. 117/20)</a></li>
                  </ol>
                </li>
                <li className="pt-1">
                  <a href="#volume-2" className="text-[#0645ad] hover:underline font-bold">
                    2. Volume II: Engenharia Civil e Gestão de Obras
                  </a>
                  <ol className="pl-4 pt-1 space-y-1 text-[#54595d]">
                    <li><a href="#civ-mod-1" className="text-[#0645ad] hover:underline">2.1 Tomo 1: Leitura de Plantas e Armaduras de Betão</a></li>
                    <li><a href="#civ-mod-2" className="text-[#0645ad] hover:underline">2.2 Tomo 2: Cálculo Estrutural e Flexão de Vigas no ELU</a></li>
                    <li><a href="#civ-mod-3" className="text-[#0645ad] hover:underline">2.3 Tomo 3: Orçamento Analítico, BDI e Curva ABC</a></li>
                    <li><a href="#civ-mod-4" className="text-[#0645ad] hover:underline">2.4 Tomo 4: Controlo de Obras, EVM e Slump Test</a></li>
                    <li><a href="#civ-mod-5" className="text-[#0645ad] hover:underline">2.5 Tomo 5: Normas Aplicadas (Angola, Eurocódigos, ABNT)</a></li>
                    <li><a href="#civ-mod-6" className="text-[#0645ad] hover:underline">2.6 Tomo 6: Betão com Agregados Reciclados (RCD)</a></li>
                  </ol>
                </li>
                <li className="pt-1">
                  <a href="#glossario" className="text-[#0645ad] hover:underline font-bold">
                    3. Vocabulário & Dicionário Enciclopédico (A–Z)
                  </a>
                </li>
                <li className="pt-1">
                  <a href="#desafio" className="text-[#0645ad] hover:underline font-bold">
                    4. Desafio Prático Diário de Obra
                  </a>
                </li>
                <li className="pt-1">
                  <a href="#referencias" className="text-[#0645ad] hover:underline font-bold">
                    5. Referências e Base Legal Atualizada
                  </a>
                </li>
              </ol>
            )}
          </div>

          {/* Search & Filter Toolbar inside article */}
          <div className="bg-[#f8f9fa] border border-[#a2a9b1] rounded-sm p-3 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#4d861e]" /> Filtrar Tomos do Tratado:
              </span>
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setSelectedVolume('all')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedVolume === 'all'
                      ? 'bg-black text-white font-bold'
                      : 'bg-white border border-[#a2a9b1] text-black hover:bg-[#eaecf0]'
                  }`}
                >
                  Todos ({COURSES_DATA.length})
                </button>
                <button
                  onClick={() => setSelectedVolume('ambiental')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                    selectedVolume === 'ambiental'
                      ? 'bg-[#72c332] text-black font-bold border border-[#5ea832]'
                      : 'bg-white border border-[#a2a9b1] text-black hover:bg-[#eaecf0]'
                  }`}
                >
                  <Activity className="w-3 h-3 text-[#4d861e]" /> Vol. I: Ambiental (4)
                </button>
                <button
                  onClick={() => setSelectedVolume('civil')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                    selectedVolume === 'civil'
                      ? 'bg-[#72c332] text-black font-bold border border-[#5ea832]'
                      : 'bg-white border border-[#a2a9b1] text-black hover:bg-[#eaecf0]'
                  }`}
                >
                  <Compass className="w-3 h-3 text-[#4d861e]" /> Vol. II: Civil (6)
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#72777d]" />
              <input
                type="text"
                placeholder="Filtrar por palavras-chave na ementa (ex: DBO, Leopold, Lei 5/98, armadura, EVM, C25/30)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#a2a9b1] rounded pl-8 pr-3 py-1.5 text-xs text-black focus:outline-none focus:border-[#72c332]"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: VOLUME I - ENGENHARIA AMBIENTAL */}
          {/* ======================================================== */}
          {(selectedVolume === 'all' || selectedVolume === 'ambiental') && (
            <section id="volume-1" className="space-y-4 pt-2">
              <div className="border-b border-[#a2a9b1] pb-1 flex justify-between items-baseline">
                <h2 className="text-2xl font-serif text-black font-normal flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#4d861e]" /> Volume I: Engenharia Ambiental e Monitorização
                </h2>
                <span className="text-xs font-mono text-[#54595d]">Tomos 1 a 4</span>
              </div>

              <div className="space-y-4">
                {ambientalModules.map(module => (
                  <div
                    key={module.id}
                    id={module.id}
                    className="border border-[#a2a9b1] bg-white rounded-sm p-4 hover:border-black transition-colors space-y-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#eaecf0] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#72c332] text-black text-[11px] font-bold font-mono rounded">
                          Tomo {module.moduleNumber}
                        </span>
                        <h3 className="text-base font-serif font-bold text-black">
                          {module.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-[#54595d]">
                        {module.level} • {module.estimatedHours}h de estudo
                      </span>
                    </div>

                    <p className="text-xs text-[#202122] leading-relaxed">
                      {module.shortDescription}
                    </p>

                    {/* Syllabus summary */}
                    <div className="bg-[#f8f9fa] border border-[#eaecf0] p-3 rounded text-xs space-y-1.5">
                      <span className="font-bold text-black uppercase tracking-wider text-[10px] block">
                        Tópicos do Tomo (Ementa Técnica):
                      </span>
                      <ul className="space-y-1 text-[#202122]">
                        {module.learningObjectives.slice(0, 3).map((obj, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#4d861e] font-bold">▪</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#eaecf0]">
                      <span className="text-xs font-mono text-[#54595d]">
                        Progresso: <strong>{progress.moduleProgress[module.id] || 0}%</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigateToModule(module.id)}
                          className="px-3 py-1 bg-white hover:bg-[#eaecf0] text-black border border-[#a2a9b1] text-xs font-semibold rounded transition-colors"
                        >
                          Ler Artigo Completo
                        </button>
                        <button
                          onClick={() => onNavigateToTab('exams')}
                          className="px-3 py-1 bg-[#72c332] hover:bg-[#5ea832] text-black text-xs font-bold rounded transition-colors"
                        >
                          Fazer Avaliação
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ======================================================== */}
          {/* SECTION 2: VOLUME II - ENGENHARIA CIVIL */}
          {/* ======================================================== */}
          {(selectedVolume === 'all' || selectedVolume === 'civil') && (
            <section id="volume-2" className="space-y-4 pt-4">
              <div className="border-b border-[#a2a9b1] pb-1 flex justify-between items-baseline">
                <h2 className="text-2xl font-serif text-black font-normal flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#4d861e]" /> Volume II: Engenharia Civil e Gestão de Obras
                </h2>
                <span className="text-xs font-mono text-[#54595d]">Tomos 1 a 6</span>
              </div>

              <div className="space-y-4">
                {civilModules.map(module => (
                  <div
                    key={module.id}
                    id={module.id}
                    className="border border-[#a2a9b1] bg-white rounded-sm p-4 hover:border-black transition-colors space-y-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#eaecf0] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#72c332] text-black text-[11px] font-bold font-mono rounded">
                          Tomo {module.moduleNumber}
                        </span>
                        <h3 className="text-base font-serif font-bold text-black">
                          {module.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-[#54595d]">
                        {module.level} • {module.estimatedHours}h de estudo
                      </span>
                    </div>

                    <p className="text-xs text-[#202122] leading-relaxed">
                      {module.shortDescription}
                    </p>

                    {/* Syllabus summary */}
                    <div className="bg-[#f8f9fa] border border-[#eaecf0] p-3 rounded text-xs space-y-1.5">
                      <span className="font-bold text-black uppercase tracking-wider text-[10px] block">
                        Tópicos do Tomo (Ementa Técnica):
                      </span>
                      <ul className="space-y-1 text-[#202122]">
                        {module.learningObjectives.slice(0, 3).map((obj, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#4d861e] font-bold">▪</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#eaecf0]">
                      <span className="text-xs font-mono text-[#54595d]">
                        Progresso: <strong>{progress.moduleProgress[module.id] || 0}%</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigateToModule(module.id)}
                          className="px-3 py-1 bg-white hover:bg-[#eaecf0] text-black border border-[#a2a9b1] text-xs font-semibold rounded transition-colors"
                        >
                          Ler Artigo Completo
                        </button>
                        <button
                          onClick={() => onNavigateToTab('exams')}
                          className="px-3 py-1 bg-[#72c332] hover:bg-[#5ea832] text-black text-xs font-bold rounded transition-colors"
                        >
                          Fazer Avaliação
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ======================================================== */}
          {/* SECTION 3: VOCABULÁRIO TÉCNICO ENCICLOPÉDICO A-Z */}
          {/* ======================================================== */}
          <section id="glossario" className="space-y-4 pt-4">
            <div className="border-b border-[#a2a9b1] pb-1">
              <h2 className="text-2xl font-serif text-black font-normal">
                3. Vocabulário & Dicionário Enciclopédico de Engenharia (A–Z)
              </h2>
              <p className="text-xs text-[#54595d]">
                Terminologia operacional, fórmulas fundamentais e fundamentação legal catalogadas para consulta rápida.
              </p>
            </div>

            {/* Wikipedia Data Table */}
            <div className="overflow-x-auto border border-[#a2a9b1]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#eaecf0] border-b border-[#a2a9b1] text-black font-bold">
                    <th className="p-2.5 border-r border-[#a2a9b1]">Termo</th>
                    <th className="p-2.5 border-r border-[#a2a9b1]">Área</th>
                    <th className="p-2.5 border-r border-[#a2a9b1]">Expressão / Critério</th>
                    <th className="p-2.5 border-r border-[#a2a9b1]">Norma</th>
                    <th className="p-2.5">Definição Operacional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaecf0]">
                  {ENCYCLOPEDIC_TERMS.map((item, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => setActiveGlossaryTerm(item)}
                      className="hover:bg-[#f2f9ed] cursor-pointer transition-colors"
                    >
                      <td className="p-2.5 font-bold text-[#0645ad] border-r border-[#eaecf0] whitespace-nowrap">
                        {item.term}
                      </td>
                      <td className="p-2.5 border-r border-[#eaecf0] text-[#54595d] whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="p-2.5 border-r border-[#eaecf0] font-mono text-[#202122] bg-[#f8f9fa] whitespace-nowrap">
                        {item.formula}
                      </td>
                      <td className="p-2.5 border-r border-[#eaecf0] text-[#54595d] whitespace-nowrap">
                        {item.norm}
                      </td>
                      <td className="p-2.5 text-[#202122] leading-relaxed">
                        {item.definition}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ======================================================== */}
          {/* SECTION 4: DESAFIO PRÁTICO DIÁRIO */}
          {/* ======================================================== */}
          <section id="desafio" className="space-y-3 pt-4 border-t border-[#a2a9b1]">
            <h2 className="text-xl font-serif text-black font-normal flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#4d861e]" /> 4. Problema Prático de Aplicação de Canteiro
            </h2>
            <div className="bg-[#f8f9fa] border border-[#a2a9b1] rounded-sm p-4 text-xs space-y-3">
              <p className="leading-relaxed text-[#202122]">
                <strong>Caso:</strong> Uma viga de betão armado de vão <code className="bg-white px-1 py-0.5 border border-[#eaecf0]">L = 6.0 m</code> suporta uma carga uniformemente distribuída majorada de cálculo <code className="bg-white px-1 py-0.5 border border-[#eaecf0]">qd = 40 kN/m</code>. Qual é o esforço cortante de cálculo máximo (Vd) junto aos apoios de extremidade que dimensionará os estribos transversais?
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 1, text: 'Vd = 60 kN', isCorrect: false },
                  { id: 2, text: 'Vd = 120 kN (Vd = qd · L / 2)', isCorrect: true },
                  { id: 3, text: 'Vd = 240 kN', isCorrect: false }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setDailyAnswer(opt.id);
                      setShowDailyFeedback(true);
                    }}
                    className={`px-3 py-1.5 rounded border text-xs font-semibold transition-colors ${
                      dailyAnswer === opt.id
                        ? opt.isCorrect
                          ? 'bg-[#72c332] text-black border-[#5ea832] font-bold'
                          : 'bg-black text-white border-black font-bold'
                        : 'bg-white border-[#a2a9b1] text-black hover:bg-[#eaecf0]'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {showDailyFeedback && (
                <div className="p-3 bg-white border border-[#72c332] rounded text-xs space-y-1">
                  <span className="font-bold text-[#4d861e] block">Comentário do Engenheiro:</span>
                  <p className="text-[#202122] leading-relaxed">
                    Em vigas isostáticas biapoiadas sob carga uniforme, as reações verticais nos apoios equilibram a metade da carga total: <code className="font-mono bg-[#f8f9fa] px-1 py-0.5">Vd = (qd · L) / 2 = (40 · 6) / 2 = 120 kN</code>. Este esforço cortante atinge o valor de pico na face dos pilares e decresce linearmente até zero no meio do vão.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ======================================================== */}
          {/* SECTION 5: REFERÊNCIAS BIBLIOGRÁFICAS (WIKIPEDIA STYLE) */}
          {/* ======================================================== */}
          <section id="referencias" className="pt-4 border-t border-[#a2a9b1] text-xs text-[#54595d] space-y-2">
            <h2 className="text-xl font-serif text-black font-normal">
              5. Referências e Base Legal Atualizada
            </h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>República de Angola:</strong> Lei nº 5/98 de 19 de Junho — <em>Lei de Bases do Ambiente</em>. Assembleia Nacional.</li>
              <li><strong>República de Angola:</strong> Decreto Presidencial nº 117/20 de 22 de Abril — <em>Regulamento sobre o Procedimento de Avaliação de Impacte Ambiental</em>.</li>
              <li><strong>União Europeia:</strong> <em>EN 1992-1-1:2004+A1:2014 (Eurocode 2)</em> — Design of concrete structures.</li>
              <li><strong>Brasil:</strong> <em>ABNT NBR 6118:2023</em> — Projeto de estruturas de concreto — Procedimento. Associação Brasileira de Normas Técnicas.</li>
              <li><strong>Internacional:</strong> <em>IFC Performance Standards on Environmental and Social Sustainability</em> (World Bank Group, 2012/2026).</li>
            </ol>
          </section>
        </div>

        {/* Right Column (Wikipedia Infobox) */}
        <div className="lg:col-span-4 w-full">
          <div className="wiki-infobox border border-[#a2a9b1] bg-[#f8f9fa] text-xs p-3 space-y-3 shadow-xs">
            
            {/* Infobox Title */}
            <div className="bg-[#eaecf0] border-b border-[#a2a9b1] -m-3 p-2.5 text-center mb-3">
              <span className="font-serif font-bold text-sm text-black block">
                Lopes Engenharia Book
              </span>
              <span className="text-[10px] text-[#54595d] uppercase tracking-wider font-mono">
                Manual & Enciclopédia Técnica
              </span>
            </div>

            {/* Emblem in Black, White, Lettuce Green */}
            <div className="w-20 h-20 rounded-full bg-white border-2 border-[#72c332] text-black flex items-center justify-center font-serif font-bold text-2xl mx-auto shadow-inner">
              LEB
            </div>
            <span className="text-[10px] text-center text-[#54595d] block italic">
              Insígnia oficial do tratado de engenharia
            </span>

            {/* Infobox Table */}
            <div className="border-t border-[#eaecf0] pt-2 space-y-2">
              <div className="flex justify-between py-1 border-b border-[#eaecf0]">
                <span className="font-bold text-[#54595d]">Obra</span>
                <span className="text-right text-black font-semibold">Lopes Engenharia Book</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#eaecf0]">
                <span className="font-bold text-[#54595d]">Áreas de Estudo</span>
                <span className="text-right text-black font-medium">Ambiental • Civil</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#eaecf0]">
                <span className="font-bold text-[#54595d]">Volumes Oficiais</span>
                <span className="text-right text-black font-medium">2 Volumes (10 Tomos)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#eaecf0]">
                <span className="font-bold text-[#54595d]">Carga Horária</span>
                <span className="text-right text-black font-mono font-bold text-[#4d861e]">140 Horas</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#eaecf0]">
                <span className="font-bold text-[#54595d]">Jurisdições</span>
                <span className="text-right text-black">🇦🇴 AO • 🇵🇹 PT • 🇧🇷 BR</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#eaecf0]">
                <span className="font-bold text-[#54595d]">Normas Centrais</span>
                <span className="text-right text-black text-[11px]">
                  Dec. 117/20 • Eurocódigo 2 • NBR 6118
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#eaecf0]">
                <span className="font-bold text-[#54595d]">Progresso Global</span>
                <span className="text-right font-mono font-bold text-black">{overallProgress}%</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="font-bold text-[#54595d]">Certificação</span>
                <span className="text-right text-black font-semibold">Técnico-Profissional</span>
              </div>
            </div>

            {/* Infobox CTA Buttons */}
            <div className="pt-2 border-t border-[#a2a9b1] space-y-2">
              <button
                onClick={() => onNavigateToTab('tracks')}
                className="w-full py-2 bg-[#72c332] hover:bg-[#5ea832] text-black font-bold text-xs rounded transition-colors shadow-xs"
              >
                Acessar Artigos do Tratado
              </button>

              <button
                onClick={onOpenCertificate}
                className="w-full py-1.5 bg-white hover:bg-[#eaecf0] text-black font-semibold text-xs border border-[#a2a9b1] rounded transition-colors"
              >
                Visualizar Certificado Oficial
              </button>

              <button
                onClick={() => onNavigateToTab('tools')}
                className="w-full py-1.5 bg-white hover:bg-[#eaecf0] text-[#54595d] hover:text-black text-[11px] rounded transition-colors"
              >
                Abrir Calculadoras de Campo →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for clicked glossary term */}
      {activeGlossaryTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border-2 border-black rounded-sm max-w-lg w-full p-6 text-[#202122] space-y-4 shadow-2xl relative font-sans">
            <div className="flex justify-between items-start border-b border-[#a2a9b1] pb-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4d861e] font-bold block">
                  Artigo Enciclopédico • {activeGlossaryTerm.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-black mt-0.5">
                  {activeGlossaryTerm.term}
                </h3>
              </div>
              <button
                onClick={() => setActiveGlossaryTerm(null)}
                className="text-[#54595d] hover:text-black p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-2.5 bg-[#f8f9fa] border border-[#a2a9b1] font-mono text-xs text-black">
              <span className="text-[10px] uppercase font-bold text-[#54595d] block mb-0.5">Expressão / Formulação:</span>
              {activeGlossaryTerm.formula}
            </div>

            <div className="space-y-1.5 text-xs text-[#202122] leading-relaxed">
              <span className="text-[10px] uppercase font-bold text-[#54595d] block font-mono">Definição Operacional:</span>
              <p>{activeGlossaryTerm.definition}</p>
            </div>

            <div className="p-2.5 bg-[#f2f9ed] border-l-4 border-[#72c332] text-xs text-[#202122]">
              <span className="font-bold text-black">Fundamentação Normativa: </span>
              {activeGlossaryTerm.norm}
            </div>

            <button
              onClick={() => setActiveGlossaryTerm(null)}
              className="w-full py-2 bg-black hover:bg-[#333] text-white text-xs font-bold transition-colors"
            >
              Fechar Artigo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
