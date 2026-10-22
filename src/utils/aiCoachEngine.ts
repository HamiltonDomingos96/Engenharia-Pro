import { COURSES_DATA } from '../data/coursesData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { AICoachAnalysis, MasteryLevel, UserProgress } from '../types';

export function calculateAICoachDiagnosis(progress: UserProgress): AICoachAnalysis {
  const quizResults = Object.values(progress.quizResults);
  const totalQuizzes = quizResults.length;
  
  // Calculate average score
  const avgScore = totalQuizzes > 0
    ? Math.round(quizResults.reduce((acc, curr) => acc + curr.scorePercent, 0) / totalQuizzes)
    : 0;

  // Dominant level
  let dominantLevel: MasteryLevel = 'Iniciante';
  if (avgScore >= 90) dominantLevel = 'Especialista';
  else if (avgScore >= 70) dominantLevel = 'Avançado';
  else if (avgScore >= 50) dominantLevel = 'Intermediário';

  const strengths: string[] = [];
  const criticalWeaknesses: string[] = [];
  const recommendedActions: AICoachAnalysis['recommendedActions'] = [];

  // Analyze each completed or attempted quiz
  Object.entries(progress.quizResults).forEach(([moduleId, result]) => {
    const moduleInfo = COURSES_DATA.find(m => m.id === moduleId);
    const modTitle = moduleInfo?.title || moduleId;

    if (result.scorePercent >= 80) {
      strengths.push(`${modTitle} (${result.scorePercent}% de acerto - Nível ${result.masteryLevel})`);
    } else if (result.scorePercent < 70) {
      criticalWeaknesses.push(`${modTitle} (${result.scorePercent}% de acerto - Abaixo da meta)`);
      
      recommendedActions.push({
        moduleId,
        priority: result.scorePercent < 50 ? 'Alta' : 'Média',
        actionText: `Revisar teoria e exercícios práticos do módulo "${modTitle}".`,
        reason: `Você acertou apenas ${result.correctCount} de ${result.totalQuestions} questões no exame.`
      });
    }
  });

  // Check unattempted critical modules
  COURSES_DATA.forEach(module => {
    if (!progress.quizResults[module.id]) {
      if (module.id === 'amb-mod-4') {
        recommendedActions.push({
          moduleId: module.id,
          priority: 'Alta',
          actionText: 'Estudar Legislação Ambiental Angolana (Lei 5/98 e Decreto Presidencial 117/20).',
          reason: 'Módulo de alto impacto profissional e concurso público ainda não realizado.'
        });
      } else if (module.id === 'civ-mod-4') {
        recommendedActions.push({
          moduleId: module.id,
          priority: 'Média',
          actionText: 'Praticar Análise do Valor Agregado (EVM) e Gestão de Obras.',
          reason: 'Ferramenta indispensável para fiscalização e controle orçamentário em canteiro.'
        });
      }
    }
  });

  if (strengths.length === 0) {
    strengths.push('Dedicação inicial e engajamento com a metodologia de engenharia aplicada.');
  }

  // Calculate Health Score based on completion (40%) and accuracy (60%)
  const totalModules = COURSES_DATA.length;
  const completedModulesCount = Object.values(progress.moduleProgress).filter(p => p >= 100).length;
  const progressRatio = (completedModulesCount / totalModules) * 100;
  const healthScore = Math.min(100, Math.round((progressRatio * 0.4) + (avgScore * 0.6)));

  const dailyMicroTasks = [
    {
      task: 'Revisar cálculo de momento fletor (Md = q*L²/8) e dimensionamento de armadura As',
      estimatedMinutes: 10,
      completed: progress.moduleProgress['civ-mod-2'] > 50
    },
    {
      task: 'Estudar os 4 princípios da Lei 5/98 de Angola (Prevenção, Poluidor-Pagador, etc.)',
      estimatedMinutes: 12,
      completed: false
    },
    {
      task: 'Executar um simulado prático de DBO/DQO e monitorização de ruído acústico',
      estimatedMinutes: 8,
      completed: progress.quizResults['amb-mod-1'] !== undefined
    },
    {
      task: 'Consultar a matriz comparativa Eurocódigos (C25/30) vs ABNT NBR 6118',
      estimatedMinutes: 15,
      completed: false
    }
  ];

  return {
    overallHealthScore: healthScore,
    dominantLevel,
    strengths,
    criticalWeaknesses,
    recommendedActions,
    dailyMicroTasks
  };
}

// Built-in intelligent engineering answers database for the AI Coach Chat
export function answerEngineeringQuery(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('dbo') || q.includes('dqo') || q.includes('biodegradabilidade') || q.includes('efluente')) {
    return `**Análise do AI Coach (Qualidade da Água & Efluentes):**
A relação **DBO₅ / DQO** é o principal indicador de tratabilidade biológica:
- **DBO₅/DQO > 0.5**: O efluente é facilmente biodegradável. A rota ideal é biológica (Lodos Ativados, Reator UASB, MBBR ou Lagoas de Estabilização).
- **DBO₅/DQO entre 0.2 e 0.5**: Biodegradabilidade moderada. Pode requerer pré-tratamento físico-químico (coagulação/floculação).
- **DBO₅/DQO < 0.2**: Efluente recalcitrante ou tóxico à biomassa bacteriana. Exige Processos Oxidativos Avançados (POA - Fenton, Ozonização) ou adsorção em carvão ativado.`;
  }

  if (q.includes('angola') || q.includes('lei 5/98') || q.includes('117/20') || q.includes('legislação') || q.includes('inbac')) {
    return `**Análise do AI Coach (Legislação Ambiental de Angola):**
O arcabouço angolano fundamenta-se em:
1. **Lei nº 5/98 (Lei de Bases do Ambiente):** Art. 16º torna a Avaliação de Impacto Ambiental (AIA) obrigatória para projetos com impacto relevante. Consagra o Princípio da Prevenção e do Poluidor-Pagador.
2. **Decreto Presidencial nº 117/20:** Regulamento do procedimento de AIA. Divide os projetos em:
   - **Categoria A:** Grande impacto (ex: portos, barragens, mineração, refinarias). Exige EIA completo, RIMA, Consulta Pública formal e Licença Ambiental.
   - **Categoria B:** Impacto moderado/localizado. Requer Estudo Ambiental Simplificado.
   - **Categoria C:** Impactos negligenciáveis.
3. **Órgão Responsável:** Ministério do Ambiente e INBAC (para áreas de conservação e biodiversidade).`;
  }

  if (q.includes('viga') || q.includes('momento') || q.includes('armadura') || q.includes('fletor') || q.includes('as =')) {
    return `**Análise do AI Coach (Cálculo de Vigas de Betão Armado):**
Para uma viga biapoiada com carga uniformemente distribuída *q* e vão *L*:
1. **Momento Característico:** $M_k = \\frac{q \\cdot L^2}{8}$
2. **Momento de Cálculo Majorado:** $M_d = \\gamma_f \\cdot M_k$ (onde $\\gamma_f = 1.4$ pelo Eurocódigo/ABNT).
3. **Área de Aço Longitidunal ($A_s$):**
   $$A_s \\approx \\frac{M_d}{0.9 \\cdot d \\cdot f_{yd}}$$
   Onde:
   - $d = h - cobrimento - \\phi_{estribo} - \\frac{\\phi_{long}}{2}$ (altura útil).
   - $f_{yd} = \\frac{f_{yk}}{\\gamma_s} = \\frac{500}{1.15} \\approx 434.8 \\text{ MPa}$.
*Dica prática:* Em vigas biapoiadas gravitacionais, a armadura calculada de tração fica sempre no **fundo** da viga!`;
  }

  if (q.includes('bdi') || q.includes('abc') || q.includes('orçamento') || q.includes('custo')) {
    return `**Análise do AI Coach (Gestão de Custos & BDI):**
- **BDI (Benefícios e Despesas Indiretas):**
  $$BDI = \\left[ \\frac{(1 + AC + S + R + G)(1 + DF)(1 + L)}{1 - I} \\right] - 1$$
  *Nunca coloque insumos de obra (concreto, tijolo, pedreiro) dentro do BDI!* Eles são **Custos Diretos**.
- **Curva ABC (Princípio de Pareto 80/20):**
  - **Classe A:** ~20% dos insumos que respondem por ~80% do dinheiro total da obra (concreto, aço, tubulação principal, terraplenagem). Foco 100% da negociação!`;
  }

  if (q.includes('evm') || q.includes('idp') || q.includes('idc') || q.includes('spi') || q.includes('cpi')) {
    return `**Análise do AI Coach (Earned Value Management - EVM):**
As 3 variáveis do EVM:
- **VP (Planned Value):** O que você planejou gastar até a data.
- **VA (Earned Value):** O valor orçado do que você *realmente construiu*.
- **CR (Actual Cost):** O dinheiro real que saiu do caixa.

Indicadores:
- **IDP (SPI) = VA / VP:** Se $> 1.0$ (Adiantado); se $< 1.0$ (Atrasado).
- **IDC (CPI) = VA / CR:** Se $> 1.0$ (Economia/Abaixo do orçado); se $< 1.0$ (Estouro de custos).`;
  }

  if (q.includes('eurocódigo') || q.includes('abnt') || q.includes('c25/30') || q.includes('norma')) {
    return `**Análise do AI Coach (Comparativo Normativo Eurocódigos vs ABNT):**
- **Notação C25/30 (Eurocódigo 2):** O '25' é a resistência cilíndrica ($f_{ck,cyl}$ aos 28 dias) e '30' é a cúbica ($f_{ck,cube}$). **Sempre use 25 MPa no cálculo!**
- **ABNT NBR 6118:** Utiliza apenas o valor cilíndrico ($f_{ck} = 25 \\text{ MPa}$).
- **Coeficiente de Segurança do Betão ($\\gamma_c$):** Eurocódigo adota $\\gamma_c = 1.50$; ABNT adota $\\gamma_c = 1.40$.`;
  }

  if (q.includes('rcd') || q.includes('recicla') || q.includes('sustentab') || q.includes('plástico')) {
    return `**Análise do AI Coach (Materiais Sustentáveis & RCD):**
- **Agregados Reciclados de Betão (ARB):** Podem substituir até 20% a 30% da brita natural em betão estrutural.
- **Ponto Crítico:** O agregado reciclado tem absorção de água de 5% a 12% (muito poroso). Deve ser **pré-molhado** para não roubar água da reação de cura do cimento.
- **Pegada de Carbono:** O cimento comum emite ~0.85 t de CO₂ por tonelada. O uso de pozolanas e cinzas volantes reduz significativamente essa pegada.`;
  }

  return `**Recomendação do AI Coach:**
Sua dúvida sobre "${query}" é fundamental para a formação integrada de Engenharia Civil e Ambiental.
- Se for sobre dimensionamento de concreto, consulte a aba **Trilhas de Aprendizagem > Pilar Civil > Módulo 2** ou acesse nossos **Simuladores de Engenharia**.
- Se envolver fiscalização e leis de Angola, verifique **Pilar Ambiental > Módulo 4 (Lei 5/98 e Dec. Presidencial 117/20)**.
- Gostaria que eu detalhasse uma fórmula de cálculo, um estudo de caso específico ou simulasse uma questão de exame?`;
}
