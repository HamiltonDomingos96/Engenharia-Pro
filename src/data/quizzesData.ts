import { QuizQuestion } from '../types';

export const QUIZZES_DATA: Record<string, QuizQuestion[]> = {
  // ==========================================
  // PILAR A: ENGENHARIA AMBIENTAL
  // ==========================================
  'amb-mod-1': [
    {
      id: 'q-amb-1-1',
      moduleId: 'amb-mod-1',
      difficulty: 'Médio',
      normReference: 'Standard Methods for the Examination of Water & Wastewater',
      question: 'Ao analisar um efluente industrial, o laboratório registrou DBO₅ = 240 mg/L e DQO = 300 mg/L. Qual é a interpretação técnica correta para o projeto da estação de tratamento de efluentes (ETDI)?',
      options: [
        {
          id: 'opt-a',
          text: 'A razão DBO/DQO é 0.80, indicando alta biodegradabilidade, sendo ideal o tratamento por processos biológicos (ex: lodos ativados ou reatores anaeróbios).',
          isCorrect: true,
          explanation: 'Correto! Uma razão DBO₅/DQO superior a 0.5 a 0.6 indica que a grande maioria da matéria orgânica é biodegradável, tornando o tratamento biológico altamente eficiente e de menor custo operacional.'
        },
        {
          id: 'opt-b',
          text: 'A razão indica efluente tóxico e recalcitrante, exigindo exclusivamente processos oxidativos avançados (Fenton / Ozônio).',
          isCorrect: false,
          explanation: 'Incorreto. Efluentes recalcitrantes ou tóxicos apresentam DBO₅/DQO muito baixa (< 0.2), o que não é o caso aqui.'
        },
        {
          id: 'opt-c',
          text: 'A DBO sempre deve ser superior à DQO; logo, houve erro de medição do laboratório.',
          isCorrect: false,
          explanation: 'Incorreto. A DQO é sempre maior ou igual à DBO, pois oxida tanto a fração biodegradável quanto a não biodegradável.'
        },
        {
          id: 'opt-d',
          text: 'O efluente pode ser lançado diretamente no corpo d’água sem tratamento prévio.',
          isCorrect: false,
          explanation: 'Incorreto. Uma DBO de 240 mg/L causaria anóxia grave e morte em massa de peixes se descartada in natura.'
        }
      ]
    },
    {
      id: 'q-amb-1-2',
      moduleId: 'amb-mod-1',
      difficulty: 'Médio',
      normReference: 'Diretrizes OMS de Qualidade do Ar & IFC EHS Guidelines',
      question: 'Qual é a principal distinção toxicológica e ambiental entre as frações de material particulado PM₁₀ e PM₂.₅?',
      options: [
        {
          id: 'opt-a',
          text: 'PM₁₀ é inofensivo à saúde humana, enquanto PM₂.₅ afeta unicamente a visibilidade atmosférica.',
          isCorrect: false,
          explanation: 'Incorreto. Ambas as frações causam danos respiratórios significativos.'
        },
        {
          id: 'opt-b',
          text: 'PM₂.₅ atinge os alvéolos pulmonares e pode passar à corrente sanguínea devido ao seu tamanho micrométrico, ao passo que PM₁₀ fica retido em grande parte nas vias aéreas superiores.',
          isCorrect: true,
          explanation: 'Exato! Partículas finas com diâmetro aerodinâmico menor que 2.5 µm possuem penetração profunda alveolar e endotelial, apresentando o maior fator de morbimortalidade cardiovascular e respiratória.'
        },
        {
          id: 'opt-c',
          text: 'PM₁₀ só é emitido por veículos a gasolina, enquanto PM₂.₅ provém exclusivamente de queimadas rurais.',
          isCorrect: false,
          explanation: 'Incorreto. Ambas as frações têm origens mistas: canteiros de obras, tráfego, indústrias e reações fotoquímicas secundárias.'
        },
        {
          id: 'opt-d',
          text: 'PM₂.₅ é uma medição de ruído acústico ponderada na escala A.',
          isCorrect: false,
          explanation: 'Incorreto. PM refere-se a Particulate Matter (material particulado atmosférico).'
        }
      ]
    },
    {
      id: 'q-amb-1-3',
      moduleId: 'amb-mod-1',
      difficulty: 'Difícil',
      normReference: 'ISO 1996 - Acústica Ambiental',
      question: 'Em um canteiro de obras, um gerador emite 82 dB(A) medidos a 10 metros. Se um segundo gerador idêntico for acionado exatamente ao lado do primeiro, qual será o nível de pressão sonora combinado resultante a essa mesma distância?',
      options: [
        {
          id: 'opt-a',
          text: '164 dB(A), devido à soma aritmética das duas fontes sonoras.',
          isCorrect: false,
          explanation: 'Incorreto. Os decibéis operam em escala logarítmica; somas aritméticas não se aplicam em acústica física.'
        },
        {
          id: 'opt-b',
          text: '85 dB(A), pois o acréscimo de uma fonte de mesma intensidade representa um aumento de +3 dB.',
          isCorrect: true,
          explanation: 'Perfeito! Pela fórmula L_total = 10 * log10(10^(8.2) + 10^(8.2)) = 82 + 10 * log10(2) ≈ 82 + 3.01 = 85.0 dB(A).'
        },
        {
          id: 'opt-c',
          text: '82 dB(A), porque a interferência destrutiva das ondas cancela o segundo ruído.',
          isCorrect: false,
          explanation: 'Incorreto. Fontes incoerentes somam potência sonora.'
        },
        {
          id: 'opt-d',
          text: '92 dB(A), pois a cada gerador somam-se +10 dB.',
          isCorrect: false,
          explanation: 'Incorreto. +10 dB representaria um aumento de dez vezes a potência sonora original (10 geradores).'
        }
      ]
    }
  ],

  'amb-mod-2': [
    {
      id: 'q-amb-2-1',
      moduleId: 'amb-mod-2',
      difficulty: 'Médio',
      normReference: 'Metodologia de Leopold et al. / Avaliação de Impacto Ambiental',
      question: 'Na aplicação da Matriz de Leopold para avaliação de impactos ambientais, qual é a distinção metodológica entre os termos "Magnitude" e "Importância"?',
      options: [
        {
          id: 'opt-a',
          text: 'Magnitude refere-se à gravidade penal da infração e Importância ao valor monetário da multa.',
          isCorrect: false,
          explanation: 'Incorreto. O EIA é um instrumento técnico-preventivo, não punitivo.'
        },
        {
          id: 'opt-b',
          text: 'Magnitude reflete a escala física e intensidade do impacto intrínseco (grau de alteração), enquanto Importância pondera a relevância do fator afetado no contexto ecológico e socioambiental regional.',
          isCorrect: true,
          explanation: 'Exato! A magnitude expressa o quão severa ou extensa é a alteração física direta, enquanto a importância avalia o peso sistémico ou fragilidade ecológica daquele recurso.'
        },
        {
          id: 'opt-c',
          text: 'Magnitude só pode ser positiva e Importância só pode ser negativa.',
          isCorrect: false,
          explanation: 'Incorreto. Magnitude pode ter sinal positivo (impacto benéfico) ou negativo (impacto adverso).'
        },
        {
          id: 'opt-d',
          text: 'Os dois termos são sinónimos matemáticos na matriz.',
          isCorrect: false,
          explanation: 'Incorreto. São independentes; um impacto pode ter alta magnitude local mas baixa importância regional, ou vice-versa.'
        }
      ]
    },
    {
      id: 'q-amb-2-2',
      moduleId: 'amb-mod-2',
      difficulty: 'Fácil',
      normReference: 'Hierarquia de Mitigação de Impactos (BBOP / IFC)',
      question: 'Qual é a sequência prioritária recomendada pela "Hierarquia de Mitigação" em engenharia ambiental?',
      options: [
        {
          id: 'opt-a',
          text: 'Compensar financeiramente > Restaurar > Minimizar > Evitar.',
          isCorrect: false,
          explanation: 'Incorreto. Essa é a ordem invertida de mitigação.'
        },
        {
          id: 'opt-b',
          text: 'Evitar o impacto na concepção > Minimizar na fonte > Restaurar/Reabilitar in loco > Compensar perdas residuais.',
          isCorrect: true,
          explanation: 'Correto! Primeiro ajusta-se o traçado/projeto para evitar a afetação; o que não puder ser evitado é minimizado; o que restar é restaurado; apenas perdas residuais líquidas são compensadas.'
        },
        {
          id: 'opt-c',
          text: 'Pagar a taxa ambiental do órgão > Iniciar as obras imediatamente.',
          isCorrect: false,
          explanation: 'Incorreto. O princípio poluidor-pagador não é licença para poluir sem gestão.'
        },
        {
          id: 'opt-d',
          text: 'Ignorar impactos bióticos e focar apenas nos custos de engenharia.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    }
  ],

  'amb-mod-3': [
    {
      id: 'q-amb-3-1',
      moduleId: 'amb-mod-3',
      difficulty: 'Médio',
      normReference: 'ISO 14001:2015 & ISO 19011',
      question: 'Durante uma auditoria ambiental interna, o auditor constata que óleo lubrificante usado está sendo drenado diretamente no solo permeável atrás da oficina do canteiro. Como esse achado deve ser classificado?',
      options: [
        {
          id: 'opt-a',
          text: 'Oportunidade de Melhoria (OM), pois basta colocar areia por cima posteriormente.',
          isCorrect: false,
          explanation: 'Incorreto. Trata-se de contaminação flagrante e infração ambiental severa.'
        },
        {
          id: 'opt-b',
          text: 'Não-Conformidade Menor, pois afeta apenas uma área restrita da obra.',
          isCorrect: false,
          explanation: 'Incorreto. Violação direta à legislação ambiental e falha de controlo de risco é considerada NC Maior.'
        },
        {
          id: 'opt-c',
          text: 'Não-Conformidade Maior, requerendo estancamento imediato, remoção de solo contaminado e instauração de plano de ação corretivo 5W2H.',
          isCorrect: true,
          explanation: 'Correto! Descarte de efluente perigoso no solo sem contenção contraria leis ambientais, requisitos da ISO 14001 e põe em risco lençóis freáticos.'
        },
        {
          id: 'opt-d',
          text: 'Conformidade plena com observação verbal.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    }
  ],

  'amb-mod-4': [
    {
      id: 'q-amb-4-1',
      moduleId: 'amb-mod-4',
      difficulty: 'Difícil',
      normReference: 'Legislação Ambiental da República de Angola (Lei nº 5/98 e Dec. Presidencial 117/20)',
      question: 'Segundo o Decreto Presidencial nº 117/20 de Angola, um projeto de construção de uma nova barragem hidroelétrica ou grande refinaria enquadra-se em qual categoria de avaliação ambiental e qual é a exigência formal?',
      options: [
        {
          id: 'opt-a',
          text: 'Categoria C: Isento de qualquer procedimento ambiental perante o Ministério.',
          isCorrect: false,
          explanation: 'Incorreto. Categoria C é para projetos com impactos insignificantes.'
        },
        {
          id: 'opt-b',
          text: 'Categoria B: Exige apenas uma declaração simplificada sem consulta pública.',
          isCorrect: false,
          explanation: 'Incorreto. Categoria B aplica-se a atividades de médio porte com impactos localizados.'
        },
        {
          id: 'opt-c',
          text: 'Categoria A: Obriga à elaboração de Estudo de Impacte Ambiental (EIA) completo, audiência/consulta pública obrigatória e Plano de Gestão Ambiental para obtenção da Licença Ambiental de Instalação.',
          isCorrect: true,
          explanation: 'Perfeito! Grandes obras de infraestrutura, mineração, barragens e refinarias pertencem à Categoria A do Dec. Presidencial nº 117/20 em Angola, demandando EIA/RIMA integral e consulta pública.'
        },
        {
          id: 'opt-d',
          text: 'A legislação de Angola não adota o sistema de categorias A, B e C.',
          isCorrect: false,
          explanation: 'Incorreto. O Decreto Presidencial 117/20 estrutura expressamente o procedimento em categorias A, B e C.'
        }
      ]
    },
    {
      id: 'q-amb-4-2',
      moduleId: 'amb-mod-4',
      difficulty: 'Médio',
      normReference: 'Lei nº 5/98 de 19 de Junho - Lei de Bases do Ambiente de Angola',
      question: 'O Artigo 16º da Lei de Bases do Ambiente de Angola (Lei nº 5/98) consagra qual obrigatoriedade fundamental para o desenvolvimento de novos projetos?',
      options: [
        {
          id: 'opt-a',
          text: 'Obrigatoriedade de Avaliação de Impacto Ambiental (AIA) prévia para quaisquer empreendimentos suscetíveis de produzir alterações sensíveis no ambiente.',
          isCorrect: true,
          explanation: 'Correto! A Lei nº 5/98 instituiu expressamente a AIA prévia como pilar de salvaguarda ambiental no território nacional angolano.'
        },
        {
          id: 'opt-b',
          text: 'Obrigatoriedade de privatização imediata de todas as reservas hídricas.',
          isCorrect: false,
          explanation: 'Incorreto. Os recursos hídricos em Angola pertencem ao domínio público do Estado (Lei nº 6/02).'
        },
        {
          id: 'opt-c',
          text: 'Isenção total para empreiteiras que operem em parceria público-privada.',
          isCorrect: false,
          explanation: 'Incorreto. A lei vincula entes públicos e privados indistintamente.'
        },
        {
          id: 'opt-d',
          text: 'Dispensa de fiscalização após o pagamento de taxa anual de canteiro.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    }
  ],

  // ==========================================
  // PILAR B: ENGENHARIA CIVIL E GESTÃO DE OBRAS
  // ==========================================
  'civ-mod-1': [
    {
      id: 'q-civ-1-1',
      moduleId: 'civ-mod-1',
      difficulty: 'Fácil',
      normReference: 'Simbologia de Desenho Técnico Estrutural',
      question: 'Em uma prancha de armação estrutural de uma laje, lê-se a seguinte indicação: "N3 12 φ 10.0 c/ 15 c = 340". Qual é o significado rigoroso de cada termo?',
      options: [
        {
          id: 'opt-a',
          text: 'Posição N3, 12 barras de diâmetro nominal 10 mm, espaçadas a cada 15 cm, com comprimento de corte de 340 cm.',
          isCorrect: true,
          explanation: 'Correto! N é a posição na tabela de ferros, 12 é a quantidade, φ 10.0 é a bitola da barra em mm, c/ 15 é o espaçamento entre eixos em cm, e c = 340 é o comprimento total esticado em cm.'
        },
        {
          id: 'opt-b',
          text: 'Número 3, 12 metros de barra de 10 polegadas a cada 15 metros.',
          isCorrect: false,
          explanation: 'Incorreto. Bitolas em plantas são em milímetros e comprimentos em centímetros.'
        },
        {
          id: 'opt-c',
          text: '12 quilos de ferro número 10 instalados com 15% de folga.',
          isCorrect: false,
          explanation: 'Incorreto.'
        },
        {
          id: 'opt-d',
          text: 'Posição N3 com 12 emendas a cada 15 cm em 340 minutos.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    },
    {
      id: 'q-civ-1-2',
      moduleId: 'civ-mod-1',
      difficulty: 'Médio',
      normReference: 'Comportamento de Peças Fletidas de Betão Armado',
      question: 'Em uma viga biapoiada submetida a uma carga uniformemente distribuída (gravitacional), onde se localizam as tensões de tração e onde deve ser concentrada a armadura longitudinal de flexão?',
      options: [
        {
          id: 'opt-a',
          text: 'Na fibra superior no meio do vão; a armadura deve ficar estritamente no topo.',
          isCorrect: false,
          explanation: 'Incorreto. A fibra superior no vão central sofre compressão.'
        },
        {
          id: 'opt-b',
          text: 'Na fibra inferior (bordo inferior) da viga no meio do vão; o aço de tração deve ser posicionado na parte inferior para absorver os momentos fletores positivos.',
          isCorrect: true,
          explanation: 'Correto! A curvatura para baixo traciona a fibra inferior e comprime a superior. Como o betão resiste mal à tração (~10% da sua resistência à compressão), o aço deve ser colocado onde há tração.'
        },
        {
          id: 'opt-c',
          text: 'Apenas nas laterais da viga para controle térmico.',
          isCorrect: false,
          explanation: 'Incorreto. Armadura lateral (armadura de pele) só é exigida em vigas com altura h > 60 cm.'
        },
        {
          id: 'opt-d',
          text: 'Vigas biapoiadas não sofrem tração, apenas cisalhamento puro.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    }
  ],

  'civ-mod-2': [
    {
      id: 'q-civ-2-1',
      moduleId: 'civ-mod-2',
      difficulty: 'Difícil',
      normReference: 'Eurocódigo 2 (EN 1992-1-1) / ABNT NBR 6118',
      question: 'Uma viga isostática de vão L = 5.0 m suporta uma carga de cálculo total qd = 32 kN/m. Qual é o momento fletor de cálculo máximo (Md) atuante na seção crítica de meio de vão?',
      options: [
        {
          id: 'opt-a',
          text: 'Md = 50.0 kNm',
          isCorrect: false,
          explanation: 'Incorreto. Revise a fórmula do momento isostático.'
        },
        {
          id: 'opt-b',
          text: 'Md = 100.0 kNm, calculado por Md = (qd * L²) / 8.',
          isCorrect: true,
          explanation: 'Exato! Md = (32 * 5²) / 8 = (32 * 25) / 8 = 800 / 8 = 100 kNm.'
        },
        {
          id: 'opt-c',
          text: 'Md = 200.0 kNm, calculado por Md = (qd * L²) / 4.',
          isCorrect: false,
          explanation: 'Incorreto. q*L²/4 seria a área do triângulo para carga pontual concentrada no meio do vão.'
        },
        {
          id: 'opt-d',
          text: 'Md = 160.0 kNm.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    },
    {
      id: 'q-civ-2-2',
      moduleId: 'civ-mod-2',
      difficulty: 'Médio',
      normReference: 'Eurocódigo 2 / NBR 6118 - Resistência de Cálculo dos Materiais',
      question: 'Para um betão de classe C30 (fck = 30 MPa) e considerando o coeficiente de minoração do betão γC = 1.50 preconizado pelo Eurocódigo 2 no ELU, qual é o valor da resistência de cálculo à compressão do betão (fcd)?',
      options: [
        {
          id: 'opt-a',
          text: 'fcd = 45.0 MPa',
          isCorrect: false,
          explanation: 'Incorreto. Resistências de cálculo no ELU são minoradas (divididas por γC), não multiplicadas.'
        },
        {
          id: 'opt-b',
          text: 'fcd = 20.0 MPa, pois fcd = fck / γC = 30 / 1.50 = 20.0 MPa.',
          isCorrect: true,
          explanation: 'Correto! A resistência de projeto fcd é calculada dividindo a resistência característica fck pelo coeficiente parcial de segurança γC (30 / 1.5 = 20 MPa).'
        },
        {
          id: 'opt-c',
          text: 'fcd = 30.0 MPa',
          isCorrect: false,
          explanation: 'Incorreto. 30 MPa é o valor característico fck, não o de cálculo minorado.'
        },
        {
          id: 'opt-d',
          text: 'fcd = 15.0 MPa',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    }
  ],

  'civ-mod-3': [
    {
      id: 'q-civ-3-1',
      moduleId: 'civ-mod-3',
      difficulty: 'Médio',
      normReference: 'Engenharia de Custos / Curva ABC de Insumos',
      question: 'Ao aplicar a análise da Curva ABC em uma planilha orçamentária de uma grande obra de infraestrutura, o engenheiro orçamentista descobre que o cimento e o aço compõem a Classe A. O que isso significa estrategicamente?',
      options: [
        {
          id: 'opt-a',
          text: 'Significa que esses dois itens representam cerca de 80% do custo financeiro total da obra, exigindo prioridade absoluta nas negociações de compra, logística e redução de perdas no canteiro.',
          isCorrect: true,
          explanation: 'Perfeito! No princípio de Pareto da Curva ABC, os itens Classe A acumulam cerca de 80% do valor global em aproximadamente 20% da quantidade de itens, gerando o maior impacto no resultado financeiro.'
        },
        {
          id: 'opt-b',
          text: 'Significa que esses itens têm baixa importância financeira e não precisam de controle de estoque.',
          isCorrect: false,
          explanation: 'Incorreto. Essa é a definição dos itens Classe C.'
        },
        {
          id: 'opt-c',
          text: 'Significa que esses itens devem ser comprados exclusivamente no varejo sem desconto.',
          isCorrect: false,
          explanation: 'Incorreto.'
        },
        {
          id: 'opt-d',
          text: 'Significa que a obra está com prejuízo garantido.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    },
    {
      id: 'q-civ-3-2',
      moduleId: 'civ-mod-3',
      difficulty: 'Fácil',
      normReference: 'Conceito e Composição de BDI',
      question: 'Qual dos seguintes componentes NÃO deve fazer parte da composição do BDI (Benefícios e Despesas Indiretas), devendo figurar diretamente na planilha de Custos Diretos?',
      options: [
        {
          id: 'opt-a',
          text: 'Administração central da construtora.',
          isCorrect: false,
          explanation: 'Incorreto. Administração central faz parte do BDI.'
        },
        {
          id: 'opt-b',
          text: 'Margem de lucro operacional da empresa.',
          isCorrect: false,
          explanation: 'Incorreto. O lucro faz parte do BDI.'
        },
        {
          id: 'opt-c',
          text: 'Fornecimento de betão usinado e horas de operários executando a alvenaria.',
          isCorrect: true,
          explanation: 'Correto! Mão de obra direta, equipamentos alocados na frente de serviço e materiais consumidos na peça estrutural são Custos Diretos (CD), nunca compondo o percentual de BDI.'
        },
        {
          id: 'opt-d',
          text: 'Tributos incidentes sobre a fatura de venda (ISS, PIS/COFINS ou equivalentes).',
          isCorrect: false,
          explanation: 'Incorreto. Os tributos incidentes sobre o faturamento integram a fórmula do BDI.'
        }
      ]
    }
  ],

  'civ-mod-4': [
    {
      id: 'q-civ-4-1',
      moduleId: 'civ-mod-4',
      difficulty: 'Difícil',
      normReference: 'Earned Value Management (EVM - Análise do Valor Agregado)',
      question: 'Na fiscalização de um viaduto no 4º mês, os relatórios apresentam: Valor Planejado (VP) = $1.000.000 USD; Valor Agregado (VA) = $800.000 USD; Custo Real (CR) = $1.000.000 USD. Quais são os índices IDP (SPI) e IDC (CPI) e a situação real da obra?',
      options: [
        {
          id: 'opt-a',
          text: 'IDP = 1.25 e IDC = 1.00; obra adiantada e dentro do custo.',
          isCorrect: false,
          explanation: 'Incorreto. Os cálculos foram invertidos.'
        },
        {
          id: 'opt-b',
          text: 'IDP = 0.80 e IDC = 0.80; a obra está atrasada em relação ao cronograma (executou só 80% do planejado) e com sobrecusto (custou 25% a mais para realizar o mesmo serviço).',
          isCorrect: true,
          explanation: 'Exato! IDP = VA / VP = 800k / 1000k = 0.80 (< 1 atraso). IDC = VA / CR = 800k / 1000k = 0.80 (< 1 estouro de custos). A obra está em situação crítica de prazo e de custo.'
        },
        {
          id: 'opt-c',
          text: 'IDP = 1.00 e IDC = 0.80; obra no prazo mas estourando custo.',
          isCorrect: false,
          explanation: 'Incorreto.'
        },
        {
          id: 'opt-d',
          text: 'IDP = 0.80 e IDC = 1.25; obra atrasada mas economizando dinheiro.',
          isCorrect: false,
          explanation: 'Incorreto. O Custo Real foi de 1M para apenas 800k de valor agregado, logo não houve economia.'
        }
      ]
    },
    {
      id: 'q-civ-4-2',
      moduleId: 'civ-mod-4',
      difficulty: 'Médio',
      normReference: 'Controle Tecnológico do Betão / Slump Test (EN 12350-2 / NBR NM 67)',
      question: 'Ao descarregar um camião-betoneira na obra, o ensaio de abatimento (slump test) resultou em 4 cm, quando o projeto especificava slump de 12 ± 2 cm (betão muito seco). O motorista sugere adicionar 40 litros de água diretamente no balão para facilitar o bombeamento. Como deve agir o engenheiro fiscal?',
      options: [
        {
          id: 'opt-a',
          text: 'Autorizar a adição de água, desde que se misture o balão por 5 minutos.',
          isCorrect: false,
          explanation: 'Incorreto! Adicionar água altera drasticamente a relação a/c e destrói o fck do betão.'
        },
        {
          id: 'opt-b',
          text: 'Proibir veementemente a adição de água não prevista; se o traço permitir, utilizar aditivo superplastificante compatível dosado tecnicamente, ou rejeitar o camião se o tempo de pega ou plasticidade estiver comprometido.',
          isCorrect: true,
          explanation: 'Perfeito! Água adicionada indevidamente no canteiro aumenta a porosidade capilar, reduz drasticamente a resistência mecânica e durabilidade, aumentando o risco de patologias graves.'
        },
        {
          id: 'opt-c',
          text: 'Aceitar o betão seco e exigir que os pedreiros utilizem marretas para compactar nas fôrmas.',
          isCorrect: false,
          explanation: 'Incorreto. Causará nichos de concretagem (bicheiras) e exposição de armaduras.'
        },
        {
          id: 'opt-d',
          text: 'Adicionar areia para absorver a rigidez.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    }
  ],

  'civ-mod-5': [
    {
      id: 'q-civ-5-1',
      moduleId: 'civ-mod-5',
      difficulty: 'Difícil',
      normReference: 'Eurocódigo 2 vs ABNT NBR 6118 / Comparador de Normas',
      question: 'Na especificação europeia (Eurocódigo 2 / EN 206), um betão é classificado como "C25/30". Qual é o significado técnico desses dois números?',
      options: [
        {
          id: 'opt-a',
          text: 'Consumo mínimo de 25 kg de cimento e 30 litros de água por metro cúbico.',
          isCorrect: false,
          explanation: 'Incorreto.'
        },
        {
          id: 'opt-b',
          text: '25 MPa é a resistência característica cilíndrica (fck,cyl aos 28 dias) e 30 MPa é a resistência característica cúbica (fck,cube); nos cálculos de dimensionamento estrutural adota-se o valor cilíndrico de 25 MPa.',
          isCorrect: true,
          explanation: 'Correto! A notação dupla europeia expressa as resistências medidas em corpos de prova cilíndricos (150x300 mm) e cúbicos (150 mm). Para o dimensionamento estrutural sob Eurocódigo 2, o fck nominal de projeto é SEMPRE o valor cilíndrico.'
        },
        {
          id: 'opt-c',
          text: 'Resistência de 25 MPa aos 7 dias e 30 MPa aos 28 dias.',
          isCorrect: false,
          explanation: 'Incorreto. Ambos os valores referem-se à idade de referência de 28 dias.'
        },
        {
          id: 'opt-d',
          text: 'Tamanho máximo do agregado graúdo entre 25 mm e 30 mm.',
          isCorrect: false,
          explanation: 'Incorreto.'
        }
      ]
    }
  ],

  'civ-mod-6': [
    {
      id: 'q-civ-6-1',
      moduleId: 'civ-mod-6',
      difficulty: 'Médio',
      normReference: 'Sustentabilidade e Economia Circular na Construção Civil (RCD / Cimentos Verdes)',
      question: 'Ao produzir betão estrutural substituindo 25% dos agregados graúdos naturais por Agregados Reciclados de Betão (ARB provenientes de britagem de demolição), qual cuidado tecnológico de dosagem é estritamente obrigatório?',
      options: [
        {
          id: 'opt-a',
          text: 'Não há necessidade de qualquer cuidado, pois o agregado reciclado tem propriedades idênticas ao granito virgem.',
          isCorrect: false,
          explanation: 'Incorreto. O agregado reciclado possui argamassa aderida muito porosa.'
        },
        {
          id: 'opt-b',
          text: 'Compensar a alta taxa de absorção de água do agregado reciclado (pré-molhagem ou água de compensação), sob pena do agregado sugar a água de amassamento e prejudicar a hidratação da pasta e a trabalhabilidade.',
          isCorrect: true,
          explanation: 'Perfeito! Os agregados reciclados de concreto possuem absorção de água de 5% a 12% (contra < 1.5% das rochas britadas naturais). Sem pré-umedecimento, eles roubam água da pasta fresca, reduzindo o abatimento e gerando fissuração.'
        },
        {
          id: 'opt-c',
          text: 'Eliminar completamente o uso de cimento e usar apenas água com o agregado reciclado.',
          isCorrect: false,
          explanation: 'Incorreto.'
        },
        {
          id: 'opt-d',
          text: 'Adicionar 50% mais cloreto de cálcio na mistura.',
          isCorrect: false,
          explanation: 'Incorreto. Cloretos são proibidos em betão armado por causarem corrosão rápida por pites nas armaduras.'
        }
      ]
    }
  ]
};
