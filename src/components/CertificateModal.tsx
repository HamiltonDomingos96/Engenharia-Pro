import React from 'react';
import { Award, Printer, X, ShieldCheck } from 'lucide-react';
import { UserProgress } from '../types';

interface CertificateModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export function CertificateModal({ progress, onClose }: CertificateModalProps) {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const certificateHash = `LEB-ENG-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`;

  const handlePrint = () => {
    window.print();
  };

  const [customName, setCustomName] = React.useState(progress.studentName || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border-2 border-black rounded-sm max-w-4xl w-full p-6 text-[#202122] relative shadow-2xl my-8 font-sans">
        
        {/* Action bar (hidden in print) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 no-print border-b border-[#a2a9b1] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#72c332] text-black font-bold flex items-center justify-center text-xs">
              ✓
            </span>
            <h3 className="font-serif font-bold text-base text-black">
              Emissão de Certificado — Lopes Engenharia Book
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-[#f8f9fa] px-3 py-1.5 rounded border border-[#a2a9b1] text-xs">
              <span className="text-[#54595d] font-bold">Titular:</span>
              <input
                type="text"
                placeholder="Insira seu nome completo"
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                className="bg-white border border-[#a2a9b1] rounded px-2 py-0.5 text-black font-semibold text-xs focus:outline-none focus:border-[#72c332]"
              />
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#72c332] hover:bg-[#5ea832] text-black rounded text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" /> Imprimir / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#54595d] hover:text-black hover:bg-[#eaecf0] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="bg-white text-black p-8 sm:p-12 border-8 border-double border-black relative overflow-hidden shadow-xs font-sans">
          
          <div className="relative z-10 text-center space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <div className="text-[#4d861e] font-bold uppercase tracking-[0.25em] text-xs font-mono">
                LOPES ENGENHARIA BOOK • MANUAL & TRATADO DE FORMAÇÃO INTENSIVA
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight font-serif">
                CERTIFICADO DE CAPACITAÇÃO PROFISSIONAL
              </h1>
              <p className="text-xs text-[#54595d] font-mono tracking-widest uppercase">
                Engenharia Ambiental e Monitorização • Engenharia Civil e Gestão de Obras
              </p>
            </div>

            <div className="w-24 h-1 bg-[#72c332] mx-auto rounded-full" />

            {/* Recipient */}
            <div className="py-2 space-y-2">
              <p className="text-[#54595d] text-sm italic">Certificamos com distinção acadêmica e rigor normativo que o(a) Engenheiro(a)</p>
              <div className="text-2xl sm:text-3xl font-serif font-black text-black border-b-2 border-black pb-1 inline-block px-8 min-w-[280px]">
                {customName.trim() || 'Engenheiro(a) Titular'}
              </div>
            </div>

            {/* Description */}
            <p className="text-[#202122] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              concluiu com aproveitamento integral a formação intensiva do <strong className="text-black">Lopes Engenharia Book</strong> nos pilares de <strong className="text-black">Engenharia Ambiental e Monitorização</strong> (Parâmetros Físico-Químicos, EIA/RIMA, ISO 14001 e Legislação de Angola: Lei 5/98 e Dec. Presidencial 117/20) e <strong className="text-black">Engenharia Civil e Gestão de Obras</strong> (Plantas Estruturais, Cálculo de Vigas no ELU, BDI/Curva ABC, EVM, Agregados Reciclados RCD e Cruzamento Normativo Angola-Portugal-Brasil), com carga horária de:
            </p>

            {/* Hours and Grade */}
            <div className="inline-flex items-center gap-6 bg-[#f8f9fa] border border-[#a2a9b1] px-6 py-2.5 rounded text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#54595d] block">Carga Horária</span>
                <span className="text-lg font-black font-mono text-black">140 Horas</span>
              </div>
              <div className="w-px h-8 bg-[#a2a9b1]" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#54595d] block">Aproveitamento</span>
                <span className="text-lg font-black font-mono text-[#4d861e]">Avançado / Especialista</span>
              </div>
            </div>

            {/* Signatures and Validation */}
            <div className="pt-6 border-t border-[#eaecf0] grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
              <div>
                <div className="font-serif italic text-sm text-black font-bold">Coordenação Técnica do Tratado</div>
                <div className="w-44 h-0.5 bg-black mx-auto my-1" />
                <span className="text-[10px] text-[#54595d] uppercase tracking-wider block font-mono">
                  Conselho Acadêmico & Normativo
                </span>
              </div>

              {/* Seal Stamp */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#72c332] flex items-center justify-center text-black bg-[#f2f9ed] shadow-inner font-serif font-bold text-xl">
                  LEB
                </div>
                <span className="text-[9px] font-mono font-bold text-black mt-1">LOPES ENG BOOK</span>
              </div>

              <div>
                <div className="font-serif italic text-sm text-black">{currentDate}</div>
                <div className="w-36 h-0.5 bg-black mx-auto my-1" />
                <span className="text-[10px] text-[#54595d] uppercase tracking-wider block font-mono">
                  Registro: {certificateHash}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
