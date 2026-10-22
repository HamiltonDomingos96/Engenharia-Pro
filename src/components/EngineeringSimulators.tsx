import React, { useState } from 'react';
import { Calculator, Activity, BarChart3, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Zap } from 'lucide-react';

export function EngineeringSimulators() {
  const [activeTab, setActiveTab] = useState<'viga' | 'ambiental' | 'evm'>('viga');

  // ----------------------------------------------------
  // Simulator 1: Viga de Betão Armado
  // ----------------------------------------------------
  const [spanL, setSpanL] = useState<number>(5.5); // metros
  const [loadQ, setLoadQ] = useState<number>(24.0); // kN/m
  const [widthB, setWidthB] = useState<number>(20); // cm
  const [heightH, setHeightH] = useState<number>(50); // cm
  const [fck, setFck] = useState<number>(25); // MPa
  const [cobrimento, setCobrimento] = useState<number>(3.0); // cm

  // Cálculos da Viga
  const fcd = fck / 1.5; // MPa (Eurocódigo)
  const fyd = 500 / 1.15; // MPa (Aço A500 / CA-50 = 434.78 MPa)
  const Mk = (loadQ * Math.pow(spanL, 2)) / 8; // kNm
  const Md = 1.4 * Mk; // kNm
  const d = heightH - cobrimento - 0.8 - 1.0; // cm (altura útil estimada)
  const d_m = d / 100; // m

  const As_m2 = (Md * 1000) / (0.9 * d_m * (fyd * 1e6));
  const As_cm2 = As_m2 * 10000;
  
  const rho = (As_cm2 / (widthB * heightH)) * 100;
  const isBeamSafe = rho >= 0.15 && rho <= 4.0;

  const nBars12 = Math.ceil(As_cm2 / 1.13);
  const nBars16 = Math.ceil(As_cm2 / 2.01);
  const nBars20 = Math.ceil(As_cm2 / 3.14);

  // ----------------------------------------------------
  // Simulator 2: Monitorização Ambiental
  // ----------------------------------------------------
  const [dbo, setDbo] = useState<number>(180);
  const [dqo, setDqo] = useState<number>(320);
  const [od, setOd] = useState<number>(4.2);
  const [noise1, setNoise1] = useState<number>(78);
  const [noise2, setNoise2] = useState<number>(75);

  const dboDqoRatio = dqo > 0 ? +(dbo / dqo).toFixed(2) : 0;
  let bioClassification = 'Elevada biodegradabilidade (Tratamento Biológico indicado)';
  let bioColor = 'text-[#4d861e]';
  if (dboDqoRatio < 0.2) {
    bioClassification = 'Recalcitrante / Tóxico (Exige POA ou físico-químico)';
    bioColor = 'text-black';
  } else if (dboDqoRatio < 0.5) {
    bioClassification = 'Biodegradabilidade moderada (Pode requerer condicionamento prévio)';
    bioColor = 'text-[#54595d]';
  }

  const combinedNoise = +(10 * Math.log10(Math.pow(10, noise1 / 10) + Math.pow(10, noise2 / 10))).toFixed(1);

  // ----------------------------------------------------
  // Simulator 3: EVM Gestão de Obra
  // ----------------------------------------------------
  const [bac, setBac] = useState<number>(1500000); // USD
  const [vp, setVp] = useState<number>(600000); // USD
  const [va, setVa] = useState<number>(540000); // USD
  const [cr, setCr] = useState<number>(580000); // USD

  const idp = vp > 0 ? +(va / vp).toFixed(2) : 1;
  const idc = cr > 0 ? +(va / cr).toFixed(2) : 1;
  const vpr = va - vp;
  const vc = va - cr;
  const eac = idc > 0 ? Math.round(bac / idc) : bac;

  return (
    <div className="bg-white border border-[#a2a9b1] rounded-sm p-4 sm:p-8 max-w-[1380px] mx-auto text-[#202122] font-sans space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#a2a9b1] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#54595d] font-bold block">
            Wikipédia Técnica • Laboratório Computacional
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-black font-normal">
            Calculadoras e Simuladores de Engenharia
          </h1>
        </div>

        <div className="flex items-center gap-1 bg-[#f8f9fa] p-1 border border-[#a2a9b1] rounded text-xs">
          <button
            onClick={() => setActiveTab('viga')}
            className={`px-3 py-1.5 rounded font-bold transition-colors ${
              activeTab === 'viga' ? 'bg-[#72c332] text-black border border-[#5ea832]' : 'text-[#54595d] hover:text-black'
            }`}
          >
            Betão Armado (Vigas)
          </button>
          <button
            onClick={() => setActiveTab('ambiental')}
            className={`px-3 py-1.5 rounded font-bold transition-colors ${
              activeTab === 'ambiental' ? 'bg-[#72c332] text-black border border-[#5ea832]' : 'text-[#54595d] hover:text-black'
            }`}
          >
            Monitorização Ambiental
          </button>
          <button
            onClick={() => setActiveTab('evm')}
            className={`px-3 py-1.5 rounded font-bold transition-colors ${
              activeTab === 'evm' ? 'bg-[#72c332] text-black border border-[#5ea832]' : 'text-[#54595d] hover:text-black'
            }`}
          >
            Gestão de Obra (EVM)
          </button>
        </div>
      </div>

      {/* Simulator 1: Viga de Betão */}
      {activeTab === 'viga' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 border border-[#a2a9b1] bg-[#f8f9fa] rounded p-4 space-y-3">
            <h2 className="text-sm font-serif font-bold text-black border-b border-[#eaecf0] pb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#4d861e]" /> Parâmetros de Entrada da Viga
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#54595d] block mb-1">Vão Livre (L)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="20"
                    value={spanL}
                    onChange={e => setSpanL(parseFloat(e.target.value) || 1)}
                    className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono focus:outline-none focus:border-[#72c332]"
                  />
                  <span className="absolute right-2.5 top-1.5 text-xs text-[#54595d] font-mono">m</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#54595d] block mb-1">Carga Linear (q)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="150"
                    value={loadQ}
                    onChange={e => setLoadQ(parseFloat(e.target.value) || 1)}
                    className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono focus:outline-none focus:border-[#72c332]"
                  />
                  <span className="absolute right-2.5 top-1.5 text-xs text-[#54595d] font-mono">kN/m</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#54595d] block mb-1">Largura (b)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="10"
                    max="100"
                    value={widthB}
                    onChange={e => setWidthB(parseFloat(e.target.value) || 10)}
                    className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono focus:outline-none focus:border-[#72c332]"
                  />
                  <span className="absolute right-2.5 top-1.5 text-xs text-[#54595d] font-mono">cm</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#54595d] block mb-1">Altura Total (h)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="20"
                    max="150"
                    value={heightH}
                    onChange={e => setHeightH(parseFloat(e.target.value) || 20)}
                    className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono focus:outline-none focus:border-[#72c332]"
                  />
                  <span className="absolute right-2.5 top-1.5 text-xs text-[#54595d] font-mono">cm</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#54595d] block mb-1">Classe Betão</label>
                <select
                  value={fck}
                  onChange={e => setFck(parseInt(e.target.value))}
                  className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black focus:outline-none focus:border-[#72c332]"
                >
                  <option value={20}>C20/25 (20 MPa)</option>
                  <option value={25}>C25/30 (25 MPa)</option>
                  <option value={30}>C30/37 (30 MPa)</option>
                  <option value={35}>C35/45 (35 MPa)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#54595d] block mb-1">Cobrimento (c_nom)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="1.5"
                    max="5.0"
                    value={cobrimento}
                    onChange={e => setCobrimento(parseFloat(e.target.value) || 2)}
                    className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono focus:outline-none focus:border-[#72c332]"
                  />
                  <span className="absolute right-2.5 top-1.5 text-xs text-[#54595d] font-mono">cm</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-[#eaecf0] rounded text-[11px] text-[#54595d]">
              <strong>Norma:</strong> Eurocódigo 2 / ABNT NBR 6118 com γc = 1.50 e γs = 1.15.
            </div>
          </div>

          <div className="lg:col-span-7 border border-[#a2a9b1] bg-white rounded p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#eaecf0] pb-2">
              <h2 className="text-sm font-serif font-bold text-black">Resultados Analíticos</h2>
              <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                isBeamSafe ? 'bg-[#72c332] text-black' : 'bg-black text-white'
              }`}>
                {isBeamSafe ? '✓ Seção Válida no ELU' : '⚠ Redimensionar Seção'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded">
                <span className="text-[10px] text-[#54595d] uppercase block">Momento Mk</span>
                <span className="text-lg font-mono font-bold text-black">{Mk.toFixed(1)} kNm</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded">
                <span className="text-[10px] text-[#54595d] uppercase block">Momento Md</span>
                <span className="text-lg font-mono font-bold text-black">{Md.toFixed(1)} kNm</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded">
                <span className="text-[10px] text-[#54595d] uppercase block">Altura Útil d</span>
                <span className="text-lg font-mono font-bold text-black">{d.toFixed(1)} cm</span>
              </div>
            </div>

            <div className="p-4 bg-[#f2f9ed] border-l-4 border-[#72c332] rounded flex justify-between items-baseline">
              <div>
                <span className="text-xs font-bold text-black uppercase">Área de Aço Requerida (As)</span>
                <div className="text-3xl font-mono font-black text-black">
                  {As_cm2.toFixed(2)} <span className="text-sm font-normal">cm²</span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#54595d]">Taxa ρ = {rho.toFixed(2)}%</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-black uppercase block">Opções Comerciais Recomendadas:</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 border border-[#eaecf0] bg-[#f8f9fa] rounded">
                  <div className="text-[#54595d]">φ 12.5 mm</div>
                  <div className="font-mono font-bold text-black mt-0.5">{nBars12} barras</div>
                </div>
                <div className="p-2 border-2 border-[#72c332] bg-white rounded">
                  <div className="text-[#4d861e] font-bold">φ 16.0 mm (Ideal)</div>
                  <div className="font-mono font-bold text-black mt-0.5">{nBars16} barras</div>
                </div>
                <div className="p-2 border border-[#eaecf0] bg-[#f8f9fa] rounded">
                  <div className="text-[#54595d]">φ 20.0 mm</div>
                  <div className="font-mono font-bold text-black mt-0.5">{nBars20} barras</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulator 2: Ambiental */}
      {activeTab === 'ambiental' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 border border-[#a2a9b1] bg-[#f8f9fa] rounded p-4 space-y-3">
            <h2 className="text-sm font-serif font-bold text-black border-b border-[#eaecf0] pb-2">
              Parâmetros de Efluentes & Qualidade da Água
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-[#54595d] block mb-1">DBO₅ (mg/L)</label>
                <input
                  type="number"
                  value={dbo}
                  onChange={e => setDbo(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-[#54595d] block mb-1">DQO (mg/L)</label>
                <input
                  type="number"
                  value={dqo}
                  onChange={e => setDqo(parseFloat(e.target.value) || 1)}
                  className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-[#54595d] block mb-1">OD (mg/L)</label>
                <input
                  type="number"
                  step="0.1"
                  value={od}
                  onChange={e => setOd(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs text-black font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-white border border-[#eaecf0] rounded space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-[#54595d]">Razão de Biodegradabilidade (DBO₅/DQO):</span>
                <span className="text-xl font-mono font-bold text-black">{dboDqoRatio}</span>
              </div>
              <p className={`text-xs font-medium ${bioColor}`}>• {bioClassification}</p>
            </div>

            <div className="border-t border-[#eaecf0] pt-2 space-y-2">
              <span className="text-xs font-bold text-black block">Ruído Acústico Logarítmico (dB(A)):</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-[#54595d] block">Fonte 1 (dB)</label>
                  <input
                    type="number"
                    value={noise1}
                    onChange={e => setNoise1(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-[#a2a9b1] rounded px-2 py-1 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#54595d] block">Fonte 2 (dB)</label>
                  <input
                    type="number"
                    value={noise2}
                    onChange={e => setNoise2(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-[#a2a9b1] rounded px-2 py-1 text-xs font-mono"
                  />
                </div>
              </div>
              <div className="p-2 bg-white border border-[#eaecf0] rounded flex justify-between items-center text-xs">
                <span className="text-[#54595d]">Soma Acústica:</span>
                <span className="font-mono font-bold text-black">{combinedNoise} dB(A)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 border border-[#a2a9b1] bg-white rounded p-4 space-y-3">
            <h2 className="text-sm font-serif font-bold text-black border-b border-[#eaecf0] pb-2">
              Diretrizes de Enquadramento Legal
            </h2>
            <div className="space-y-2 text-xs text-[#202122] leading-relaxed">
              <div className="p-2.5 bg-[#f8f9fa] border border-[#eaecf0] rounded">
                <strong>Critério de Oxigênio:</strong> Águas com OD ≥ 5 mg/L sustentam ecossistemas aquáticos hígidos. Concentrações &lt; 2 mg/L caracterizam anóxia aguda.
              </div>
              <div className="p-2.5 bg-[#f8f9fa] border border-[#eaecf0] rounded">
                <strong>Ruído em Canteiro:</strong> Segundo normas internacionais IFC/OMS, o limiar residencial diurno é de 55 dB(A). Valores &gt; 70 dB(A) exigem barreira acústica mitigadora.
              </div>
              <div className="p-2.5 bg-[#f2f9ed] border-l-4 border-[#72c332] rounded">
                <strong>Legislação de Angola:</strong> Descarte de efluentes industriais em corpos hídricos rege-se pela Lei nº 6/02 e decretos executivos do Ministério do Ambiente.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulator 3: EVM */}
      {activeTab === 'evm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 border border-[#a2a9b1] bg-[#f8f9fa] rounded p-4 space-y-3">
            <h2 className="text-sm font-serif font-bold text-black border-b border-[#eaecf0] pb-2">
              Variáveis da Análise do Valor Agregado (EVM)
            </h2>

            <div>
              <label className="text-xs text-[#54595d] block mb-1">Orçamento Aprovado (BAC)</label>
              <input
                type="number"
                value={bac}
                onChange={e => setBac(parseFloat(e.target.value) || 1)}
                className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs font-mono text-black"
              />
            </div>
            <div>
              <label className="text-xs text-[#54595d] block mb-1">Valor Planejado (VP)</label>
              <input
                type="number"
                value={vp}
                onChange={e => setVp(parseFloat(e.target.value) || 1)}
                className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs font-mono text-black"
              />
            </div>
            <div>
              <label className="text-xs text-[#54595d] block mb-1">Valor Agregado (VA)</label>
              <input
                type="number"
                value={va}
                onChange={e => setVa(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs font-mono text-black"
              />
            </div>
            <div>
              <label className="text-xs text-[#54595d] block mb-1">Custo Real (CR)</label>
              <input
                type="number"
                value={cr}
                onChange={e => setCr(parseFloat(e.target.value) || 1)}
                className="w-full bg-white border border-[#a2a9b1] rounded px-2.5 py-1.5 text-xs font-mono text-black"
              />
            </div>
          </div>

          <div className="lg:col-span-7 border border-[#a2a9b1] bg-white rounded p-4 space-y-3">
            <h2 className="text-sm font-serif font-bold text-black border-b border-[#eaecf0] pb-2">
              Indicadores Físico-Financeiros
            </h2>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded">
                <span className="text-xs text-[#54595d] block">Índice de Prazo (IDP / SPI)</span>
                <span className="text-2xl font-mono font-bold text-black">{idp}</span>
                <span className="text-[11px] text-[#54595d] block mt-1">
                  {idp >= 1 ? 'Adiantado' : 'Atrasado'}
                </span>
              </div>
              <div className="p-3 bg-[#f8f9fa] border border-[#eaecf0] rounded">
                <span className="text-xs text-[#54595d] block">Índice de Custo (IDC / CPI)</span>
                <span className="text-2xl font-mono font-bold text-black">{idc}</span>
                <span className="text-[11px] text-[#54595d] block mt-1">
                  {idc >= 1 ? 'Abaixo do Orçado' : 'Sobrecusto'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#f2f9ed] border-l-4 border-[#72c332] rounded text-xs space-y-1">
              <div className="flex justify-between">
                <span>Variação de Prazo (VPr):</span>
                <span className="font-mono font-bold text-black">${vpr.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span>Variação de Custo (VC):</span>
                <span className="font-mono font-bold text-black">${vc.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#8fd452]">
                <span className="font-bold">Estimativa Final no Término (EAC):</span>
                <span className="font-mono font-bold text-black">${eac.toLocaleString()} USD</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
