import React, { useState } from 'react';
import { BookOpen, Shield, Globe, Award, Check, Layers, AlertCircle } from 'lucide-react';

export function StandardsComparator() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'concreto' | 'ambiental' | 'seguranca'>('all');

  const standardsMatrix = [
    {
      category: 'concreto',
      topic: 'Notação e Resistência à Compressão do Betão (fck)',
      angola: 'RAA / NEC: Baseado no fck cilíndrico (15x30 cm). Projetos atuais de grande porte adotam nomenclatura europeia C25/30.',
      portugal: 'Eurocódigo 2 (EN 1992-1-1 / EN 206): Notação dupla C(cilíndrico)/C(cúbico). Ex: C25/30. No cálculo de dimensionamento utiliza-se estritamente 25 MPa.',
      brasil: 'ABNT NBR 6118 / NBR 8953: Notação única C25 referenciada a corpos cilíndricos padrão 10x20 cm ou 15x30 cm.',
      criticalInsight: 'Nunca confunda cubos e cilindros: para o mesmo betão, o corpo cúbico rompe com ~20% a mais de carga que o cilíndrico.'
    },
    {
      category: 'concreto',
      topic: 'Coeficientes Parciais de Minoração no ELU (Materiais)',
      angola: 'γc = 1.50 para betão; γs = 1.15 para aço (conforme alinhamento Eurocódigo).',
      portugal: 'Eurocódigo 2: γc = 1.50 (betão); γs = 1.15 (armaduras de aço). Em situações acidentais ou sísmicas, γc = 1.20.',
      brasil: 'ABNT NBR 6118: γc = 1.40 (betão); γs = 1.15 (armaduras de aço). Permite γc = 1.30 com controle de qualidade rigoroso.',
      criticalInsight: 'A norma brasileira é ligeiramente menos conservadora no betão (γc = 1.40 vs 1.50), compensando com maiores exigências de cobrimento nominal.'
    },
    {
      category: 'concreto',
      topic: 'Coeficientes de Majoração de Ações (γF)',
      angola: 'γG = 1.35 a 1.40 (cargas permanentes); γQ = 1.50 (cargas variáveis).',
      portugal: 'Eurocódigo 0 (EN 1990): γG = 1.35 (permanente desfavorável); γQ = 1.50 (variável desfavorável).',
      brasil: 'ABNT NBR 8681: γG = 1.40 (edificações convencionais); γQ = 1.40.',
      criticalInsight: 'O Eurocódigo penaliza mais severamente cargas variáveis que a ABNT (1.50 vs 1.40).'
    },
    {
      category: 'ambiental',
      topic: 'Avaliação de Impacto Ambiental (AIA)',
      angola: 'Lei nº 5/98 (Lei de Bases do Ambiente) e Decreto Presidencial nº 117/20. Categorias A (EIA integral), B (simplificado) e C (isento). Ministério do Ambiente / INBAC.',
      portugal: 'Decreto-Lei nº 151-B/2013 e Diretiva Europeia 2011/92/UE. Agência Portuguesa do Ambiente (APA). Licença Ambiental Integrada (RECAPE / DIA).',
      brasil: 'Lei nº 6.938/81 (PNMA) e Resoluções CONAMA 001/86 e 237/97. Licenciamento trifásico: Licença Prévia (LP), Licença de Instalação (LI) e Licença de Operação (LO).',
      criticalInsight: 'Em Angola e Portugal, a aprovação do EIA conduz diretamente à emissão da Licença Ambiental de Instalação vinculada ao PGA.'
    },
    {
      category: 'ambiental',
      topic: 'Padrões de Descarga de Efluentes em Corpos Hídricos',
      angola: 'Regulamento de Utilização dos Recursos Hídricos (Lei nº 6/02) e Decretos Executivos de Descarga. Padrão geral de DBO < 50 mg/L.',
      portugal: 'Decreto-Lei nº 236/98 e Diretiva Quadro da Água (2000/60/CE). Padrões rígidos para bacias sensíveis.',
      brasil: 'Resolução CONAMA nº 430/2011 e 357/2005: DBO máxima de lançamento de 120 mg/L ou remoção mínima de 60%.',
      criticalInsight: 'Diretrizes internacionais de financiamento (IFC EHS) exigem DBO < 30 mg/L e DQO < 125 mg/L, frequentemente mais restritivas que as normas nacionais locais.'
    },
    {
      category: 'seguranca',
      topic: 'Segurança e Saúde no Trabalho em Canteiros (SST)',
      angola: 'Lei Geral do Trabalho (Lei nº 7/15) e Decretos Executivos sobre Segurança na Construção Civil.',
      portugal: 'Decreto-Lei nº 273/2003 (Regime de Segurança e Saúde no Trabalho em Canteiros Temporários ou Móveis - PSS).',
      brasil: 'Norma Regulamentadora NR 18 (Condições e Meio Ambiente de Trabalho na Indústria da Construção) e PGR.',
      criticalInsight: 'O Plano de Segurança e Saúde (PSS / PGR da construção) deve estar compatibilizado com o Plano de Gestão de Resíduos (PGR) desde o layout inicial do canteiro.'
    }
  ];

  const filtered = filterCategory === 'all' 
    ? standardsMatrix 
    : standardsMatrix.filter(s => s.category === filterCategory);

  return (
    <div className="bg-white border border-[#a2a9b1] rounded-sm p-4 sm:p-8 max-w-[1380px] mx-auto text-[#202122] font-sans space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#a2a9b1] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
            Wikipédia Técnica • Matriz Comparativa Internacional
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
            Normas Técnicas: Angola 🇦🇴 vs Portugal 🇵🇹 vs Brasil 🇧🇷
          </h1>
          <p className="text-xs text-[#54595d] mt-0.5">
            Tabela analítica de equivalência para cálculo estrutural e licenciamento ambiental em consórcios multilaterais.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#f8f9fa] p-1 border border-[#a2a9b1] rounded text-xs">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 rounded transition-colors ${filterCategory === 'all' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d] hover:text-black'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterCategory('concreto')}
            className={`px-2.5 py-1 rounded transition-colors ${filterCategory === 'concreto' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d] hover:text-black'}`}
          >
            Betão & Estruturas
          </button>
          <button
            onClick={() => setFilterCategory('ambiental')}
            className={`px-2.5 py-1 rounded transition-colors ${filterCategory === 'ambiental' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d] hover:text-black'}`}
          >
            Meio Ambiente
          </button>
          <button
            onClick={() => setFilterCategory('seguranca')}
            className={`px-2.5 py-1 rounded transition-colors ${filterCategory === 'seguranca' ? 'bg-[#72c332] text-black font-bold' : 'text-[#54595d] hover:text-black'}`}
          >
            SST & Canteiro
          </button>
        </div>
      </div>

      {/* Comparison Table in Wikipedia Style */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="border border-[#a2a9b1] bg-white rounded-sm p-4 space-y-3">
            <h3 className="text-sm font-serif font-bold text-black border-b border-[#eaecf0] pb-1">
              {item.topic}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded space-y-1">
                <span className="font-bold text-black flex items-center gap-1">
                  <span>🇦🇴</span> Angola (Legislação & RAA)
                </span>
                <p className="text-[#202122] leading-relaxed">{item.angola}</p>
              </div>

              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded space-y-1">
                <span className="font-bold text-black flex items-center gap-1">
                  <span>🇵🇹</span> Portugal (Eurocódigos EN)
                </span>
                <p className="text-[#202122] leading-relaxed">{item.portugal}</p>
              </div>

              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded space-y-1">
                <span className="font-bold text-black flex items-center gap-1">
                  <span>🇧🇷</span> Brasil (ABNT NBR)
                </span>
                <p className="text-[#202122] leading-relaxed">{item.brasil}</p>
              </div>
            </div>

            <div className="p-2.5 bg-[#f2f9ed] border-l-4 border-[#72c332] text-xs text-[#202122]">
              <strong>Observação Técnica Crítica:</strong> {item.criticalInsight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
