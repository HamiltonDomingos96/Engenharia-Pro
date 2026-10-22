import { ModuleData } from '../types';

export const COURSES_DATA: ModuleData[] = [
  // ==========================================
  // PILAR A: ENGENHARIA AMBIENTAL E MONITORIZAÇÃO
  // ==========================================
  {
    id: 'amb-mod-1',
    pillar: 'ambiental',
    moduleNumber: 1,
    title: 'Monitorização Ambiental e Parâmetros Físico-Químicos',
    shortDescription: 'Qualidade do ar, recursos hídricos, contaminação de solos e controle de ruído acústico.',
    iconName: 'Activity',
    level: 'Básico',
    estimatedHours: 12,
    learningObjectives: [
      'Identificar e interpretar os principais parâmetros da qualidade da água (DBO5, DQO, OD, Turbidez, pH e Coliformes).',
      'Compreender as frações de material particulado (PM10 e PM2.5) e gases poluentes (SO2, NOx, CO, O3).',
      'Dominar técnicas de caracterização e amostragem de solos degradados ou contaminados.',
      'Calcular níveis sonoros contínuos equivalentes (LAeq em dB(A)) e avaliar conforto acústico urbano e industrial.'
    ],
    lessons: [
      {
        id: 'amb-1-1',
        title: 'Monitorização da Qualidade da Água e Efluentes',
        readTimeMinutes: 15,
        theory: [
          'A monitorização de corpos hídricos visa salvaguardar a saúde pública e a integridade ecológica. Os parâmetros fundamentais dividem-se em físicos, químicos e biológicos.',
          'Oxigénio Dissolvido (OD): O parâmetro mais crítico para a vida aquática. Águas limpas costumam apresentar OD > 5 mg/L. Concentrações abaixo de 2 mg/L causam asfixia de peixes e favorecem condições anaeróbias.',
          'Demanda Bioquímica de Oxigénio (DBO5,20): Mede a quantidade de oxigénio consumida por microrganismos durante 5 dias a 20°C para degradar a matéria orgânica carbonácea.',
          'Demanda Química de Oxigénio (DQO): Mede a oxidação total (biodegradável + recalcitrante) usando dicromato de potássio em meio ácido forte. A razão DBO5/DQO indica a biodegradabilidade do efluente: se for > 0.5, o efluente é altamente biodegradável por via biológica (lodos ativados, reatores UASB).',
          'Coliformes Termotolerantes (E. coli): Indicadores biológicos clássicos de contaminação fecal em mananciais.'
        ],
        practicalCase: {
          title: 'Efluente Industrial de Abatedouro Despejado em Rio Urbano',
          scenario: 'Uma fiscalização ambiental coletou amostras a montante e a jusante do ponto de lançamento de um abatedouro. Os resultados revelaram DBO5 de 180 mg/L e DQO de 320 mg/L no ponto de descarte, com OD caindo de 6.8 mg/L para 1.4 mg/L a jusante.',
          solution: 'A razão DBO/DQO é de 180/320 = 0.56, confirmando alta biodegradabilidade. A solução técnica consiste na implantação imediata de tratamento primário (gradeamento e caixa de gordura/flotador por ar dissolvido - DAF) seguido de reator biológico anaeróbio (UASB) e lagoa de polimento antes do lançamento regulamentado.',
          keyTakeaway: 'A relação DBO/DQO guia a escolha entre tratamento biológico (alta razão) ou físico-químico/oxidação avançada (baixa razão).'
        },
        executiveSummary: [
          'OD > 5 mg/L é meta mandatória para preservação da biota aquática.',
          'DBO mede fração biodegradável; DQO mede oxidação global.',
          'Relação DBO/DQO > 0.5 viabiliza reatores biológicos como solução mais económica e eficiente.',
          'Sonda multiparâmetros calibrada e cadeia de custódia de amostras são mandatórias em campo.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Razão de Biodegradabilidade', description: 'DBO5 / DQO (Valor > 0.5 = Tratável biologicamente; < 0.2 = Recalcitrante/Tóxico)' },
          { label: 'Modelo de Streeter-Phelps', description: 'D(t) = [k1*L0/(k2 - k1)] * [e^(-k1*t) - e^(-k2*t)] + D0 * e^(-k2*t) para decaimento de OD' },
          { label: 'Norma de Referência', description: 'Decreto Executivo de Padrões de Descarga de Águas Residuais (Angola) & Portaria MS 888 / Conama 357 (Brasil)' }
        ]
      },
      {
        id: 'amb-1-2',
        title: 'Monitorização Atmosférica e Ruído Acústico',
        readTimeMinutes: 14,
        theory: [
          'A monitorização do ar foca nas partículas inaláveis: PM10 (partículas com diâmetro aerodinâmico < 10 µm que penetram no trato respiratório superior) e PM2.5 (partículas finas < 2.5 µm que penetram nos alvéolos pulmonares e corrente sanguínea).',
          'Gases critérios incluem Dióxido de Enxofre (SO2), Óxidos de Azoto (NOx), Monóxido de Carbono (CO) e Ozono troposférico (O3 - poluente secundário fotoquímico).',
          'Na monitorização de ruído ambiental, a grandeza padrão é o Nível Sonoro Contínuo Equivalente Ponderado "A", expresso em LAeq,T dB(A), que reproduz a resposta do sistema auditivo humano.',
          'Em canteiros de obras ou áreas de mineração, os decibéis aumentam exponencialmente devido à escala logarítmica. A soma de duas fontes de 80 dB resulta em 83 dB, não em 160 dB.'
        ],
        practicalCase: {
          title: 'Controle de Ruído e Poeiras em Britadeira de Obra Rodoviária',
          scenario: 'Durante a duplicação de uma rodovia próxima a uma comunidade residencial, o LAeq diurno medido na fachada da habitação mais próxima alcançou 78 dB(A), com concentração de PM10 de 190 µg/m³ (limite de 50 µg/m³).',
          solution: 'Instalação de barreiras acústicas móveis reflexivo-absorventes de 3.5 m de altura, enclausuramento do alimentador da britadeira, aspersão de água pressurizada nos pontos de britagem e umidificação periódica das vias de tráfego com caminhão-pipa.',
          keyTakeaway: 'Medidas na fonte (enclausuramento e aspersão) têm eficácia superior a medidas na trajetória ou no receptor.'
        },
        executiveSummary: [
          'PM2.5 apresenta o maior risco toxicológico por atingir os alvéolos pulmonares.',
          'Escala de decibéis é logarítmica: dobrar a potência sonora equivale a somar +3 dB.',
          'Monitorização acústica deve ser feita com sonómetro integrador de Classe 1 ou 2 com protetor de vento.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Soma Logarítmica de Ruído', description: 'L_total = 10 * log10 [ Σ 10^(Li / 10) ]' },
          { label: 'Limite OMS / IFC', description: 'Ruído diurno residencial: máx. 55 dB(A); Noturno: máx. 45 dB(A)' }
        ]
      }
    ]
  },

  {
    id: 'amb-mod-2',
    pillar: 'ambiental',
    moduleNumber: 2,
    title: 'Estudos de Impacto Ambiental (EIA) e Planos de Gestão (PGA / PGR)',
    shortDescription: 'Metodologias de avaliação, Matriz de Leopold, RIMA, PGA e mitigação de passivos.',
    iconName: 'FileText',
    level: 'Intermediário',
    estimatedHours: 16,
    learningObjectives: [
      'Estruturar as fases constitutivas de um EIA: Diagnóstico Ambiental, Prognóstico e Análise de Impactos.',
      'Aplicar matrizes de interação causa-efeito (Matriz de Leopold e Redes de Interação).',
      'Diferenciar impactos Diretos/Indiretos, Reversíveis/Irreversíveis, Cumulativos e Sinérgicos.',
      'Elaborar Planos de Gestão Ambiental (PGA) e Planos de Gestão de Resíduos (PGR) auditáveis.'
    ],
    lessons: [
      {
        id: 'amb-2-1',
        title: 'Estruturação do EIA e Matrizes de Impacto',
        readTimeMinutes: 18,
        theory: [
          'O Estudo de Impacto Ambiental (EIA) é um instrumento de política pública preventiva e de engenharia multidisciplinar, obrigatório para projetos com potencial de significativa degradação ambiental.',
          'Etapas essenciais do EIA: (1) Enquadramento e Termos de Referência (TdR); (2) Diagnóstico Ambiental contemplando os meios Físico (clima, geologia, hidrogeologia, relevo), Biótico (flora, fauna, corredores ecológicos) e Socioeconómico (uso do solo, património cultural, saúde pública); (3) Prognóstico e Avaliação de Impactos; (4) Medidas Mitigadoras e Compensatórias; (5) Plano de Gestão Ambiental (PGA).',
          'Matriz de Leopold: Método bidimensional que cruza ações do projeto (linhas) com fatores ambientais (colunas). Para cada interação, atribui-se Magnitude (escala de 1 a 10, com sinal + ou -) e Importância (ponderação da relevância sistémica de 1 a 10).',
          'Hierarquia da Mitigação: (1) Evitar o impacto > (2) Minimizar / Reduzir na fonte > (3) Restaurar / Recuperar in loco > (4) Compensar perdas residuais.'
        ],
        practicalCase: {
          title: 'Implantação de Terminal Portuário e Dragagem de Canal',
          scenario: 'O projeto prevê dragagem de 2 milhões de m³ de sedimentos finos com risco de ressuspensão de metais pesados e afetação de esteiros com mangais.',
          solution: 'Aplicação da hierarquia: (1) Evitar dragagem nos meses de desova da ictiofauna; (2) Uso de dragas de sucção com cortina de turbidez geotêxtil (silt curtain); (3) Disposição do material dragado em bota-fora confinado oceânico georreferenciado; (4) Programa de compensação com reflorestamento de 50 hectares de mangal degradado.',
          keyTakeaway: 'A compensação ambiental é a última ratio; a engenharia deve prioritariamente conceber soluções que evitem ou minimizem na fonte.'
        },
        executiveSummary: [
          'EIA cobre 3 meios: Físico, Biótico e Socioeconómico.',
          'Matriz de Leopold cruza Magnitude (intensidade) e Importância (peso no ecossistema).',
          'RIMA (Relatório de Impacto Ambiental) deve ser escrito em linguagem clara e acessível ao público geral para audiências públicas.',
          'Hierarquia de mitigação: Evitar -> Minimizar -> Restaurar -> Compensar.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Índice de Importância de Impacto (I)', description: 'I = ± [3*M + 2*E + 2*D + R + P + S] (Metodologia de Conesa Fernández-Vítora)' },
          { label: 'Diretrizes', description: 'Decreto Presidencial nº 117/20 (Angola) & Resolução CONAMA 001/86 (Brasil)' }
        ]
      },
      {
        id: 'amb-2-2',
        title: 'Planos de Gestão Ambiental (PGA) e Gestão de Resíduos (PGR)',
        readTimeMinutes: 16,
        theory: [
          'O PGA converte as conclusões do EIA em compromissos operacionais, cronogramas executivos, orçamentos e responsáveis na obra.',
          'Subprogramas obrigatórios num PGA típico de infraestrutura: Programa de Monitorização da Qualidade da Água, Programa de Supressão Vegetal e Resgate de Fauna, Programa de Controlo de Ruído e Emissões, Programa de Educação Ambiental dos Trabalhadores, Plano de Resposta a Emergências (PRE).',
          'O Plano de Gestão de Resíduos (PGR) estabelece a segregação na origem conforme a classificação dos resíduos: Perigosos (Classe I - óleos, tintas, baterias, solventes) e Não Perigosos (Classe II - inertes e recicláveis).',
          'Para cada fluxo de resíduo deve existir MTR (Manifesto de Transporte de Resíduos) e Certificado de Destinação Final (CDF) emitido por empresa licenciada.'
        ],
        practicalCase: {
          title: 'Derramamento de Combustível em Canteiro Central de Obra Ferroviária',
          scenario: 'Rompimento de mangueira no abastecimento de escavadeira provocou derramamento de 300 litros de óleo diesel próximo a uma linha de água.',
          solution: 'Acionamento imediato do PRE: contenção com barreiras absorventes flutuantes (turfa/cordões oleofílicos), escavação mecânica do solo contaminado para tambores de aço homologados, caracterização laboratorial do solo e remediação por bioaumento em pátio de biorremediação licenciado.',
          keyTakeaway: 'Bacias de contenção impermeabilizadas em tanques de combustível evitam acidentes catastróficos e paralisações operacionais pelo órgão fiscalizador.'
        },
        executiveSummary: [
          'PGA é o plano executivo que torna as licenças ambientais operacionais.',
          'Resíduos Classe I (Perigosos) exigem armazenamento secundário impermeabilizado e MTR.',
          'A segregação rigorosa no canteiro de obras reduz até 60% os custos de transporte e destinação.'
        ]
      }
    ]
  },

  {
    id: 'amb-mod-3',
    pillar: 'ambiental',
    moduleNumber: 3,
    title: 'Relatórios Ambientais, Auditorias e Não-Conformidades',
    shortDescription: 'Auditorias ISO 14001, relatórios de conformidade (RCA/PCA) e metodologia 5W2H.',
    iconName: 'ShieldCheck',
    level: 'Avançado',
    estimatedHours: 14,
    learningObjectives: [
      'Executar auditorias ambientais em conformidade com as diretrizes da norma ISO 19011 e ISO 14001.',
      'Identificar, classificar e registrar Não-Conformidades Maiores, Menores e Oportunidades de Melhoria.',
      'Elaborar Relatórios de Controlo Ambiental (RCA) e Planos de Controlo Ambiental (PCA).',
      'Estruturar planos de ação corretiva eficazes utilizando a ferramenta 5W2H e análise de causa raiz (Ishikawa).'
    ],
    lessons: [
      {
        id: 'amb-3-1',
        title: 'Auditorias Ambientais e Ciclo PDCA da ISO 14001',
        readTimeMinutes: 15,
        theory: [
          'A norma ISO 14001:2015 baseia-se no ciclo PDCA (Plan-Do-Check-Act) com ênfase na perspetiva de ciclo de vida e liderança organizacional.',
          'Classificação dos Achados de Auditoria: (1) Conformidade (evidência atende ao requisito); (2) Não-Conformidade Menor (desvio pontual sem quebra sistémica); (3) Não-Conformidade Maior (ausência total de procedimento, risco iminente de dano severo ou infração direta à legislação ambiental); (4) Oportunidade de Melhoria (OM).',
          'Técnicas de Auditoria: Entrevista com operadores, inspeção visual minuciosa in loco, amostragem aleatória e verificação cruzada de registos (ex: confrontar notas fiscais de compra de produtos químicos com manifestos de resíduos descartados).'
        ],
        practicalCase: {
          title: 'Auditoria de Conformidade Legal em Fábrica de Cimento',
          scenario: 'Durante auditoria periódica, constatou-se que o filtro de mangas de um dos fornos estava com diferencial de pressão fora da faixa calibrada há 18 dias sem ordem de manutenção corretiva.',
          solution: 'Registro de Não-Conformidade Maior. Ação imediata: parada técnica do setor e troca dos elementos filtrantes. Análise de Causa Raiz: falta de alerta sonoro automatizado no SCADA. Plano Corretivo: automação de intertravamento do forno caso o filtro opere fora da faixa.',
          keyTakeaway: 'Não-conformidade maior envolve violação legal ou ausência sistemática de controlo operacional.'
        },
        executiveSummary: [
          'Não-conformidade maior envolve violação legal ou ausência sistemática de controlo operacional.',
          'Toda constatação deve ser sustentada por evidência objetiva (foto, log, documento assinado).',
          'O ciclo PDCA assegura a melhoria contínua do Sistema de Gestão Ambiental (SGA).'
        ]
      }
    ]
  },

  {
    id: 'amb-mod-4',
    pillar: 'ambiental',
    moduleNumber: 4,
    title: 'Legislação Ambiental Aplicada (Angola & Padrões Globais)',
    shortDescription: 'Lei de Bases do Ambiente Lei nº 5/98, Decreto Presidencial 117/20, INBAC e Padrões IFC.',
    iconName: 'Scale',
    level: 'Profissional',
    estimatedHours: 18,
    learningObjectives: [
      'Dominar o arcabouço legislativo ambiental da República de Angola: Lei nº 5/98 (Lei de Bases do Ambiente).',
      'Aplicar o Decreto Presidencial nº 117/20 que aprova o Regulamento sobre o Procedimento de Avaliação de Impacte Ambiental.',
      'Conhecer o papel institucional do Ministério do Ambiente, do INBAC (Instituto Nacional da Biodiversidade e Áreas de Conservação) e da ANPG.',
      'Alinhar projetos aos Padrões de Desempenho sobre Sustentabilidade Socioambiental da IFC / Banco Mundial (Performance Standards 1 a 8).'
    ],
    lessons: [
      {
        id: 'amb-4-1',
        title: 'Quadro Jurídico Ambiental de Angola',
        readTimeMinutes: 20,
        theory: [
          '1. Lei nº 5/98, de 19 de Junho (Lei de Bases do Ambiente de Angola): É a espinha dorsal jurídica. Consagra os princípios basilares: Princípio da Prevenção, Princípio do Poluidor-Pagador, Princípio da Participação Pública e Princípio da Cooperação Internacional.',
          'Artigo 16º da Lei nº 5/98: Estabelece expressamente a obrigatoriedade de Avaliação de Impacto Ambiental (AIA) prévia para quaisquer ações, empreendimentos ou atividades que possam produzir alterações sensíveis no ambiente.',
          '2. Decreto Presidencial nº 117/20, de 22 de Abril: Regulamento sobre o Procedimento de Avaliação de Impacte Ambiental. Define categorias de projetos (Categoria A: sujeitos a EIA aprofundado obrigatório; Categoria B: sujeitos a estudos ambientais simplificados; Categoria C: isentos ou sujeitos a boas práticas).',
          '3. Licenciamento Ambiental em Angola: Fases do licenciamento: (a) Parecer de Enquadramento e Termos de Referência; (b) Submissão do EIA e Consulta Pública; (c) Emissão da Licença Ambiental de Instalação; (d) Emissão da Licença Ambiental de Operação (LAO), condicionada ao cumprimento integral do PGA.',
          '4. Outros diplomas relevantes: Lei de Recursos Hídricos (Lei nº 6/02), Regulamento sobre Gestão de Resíduos (Decreto Executivo nº 190/12) e legislação florestal e faunística.',
          '5. Padrões Internacionais: IFC Performance Standards (PS1 a PS8) e Princípios do Equador, fundamentais para financiamentos internacionais (ex: AfDB, Banco Mundial).'
        ],
        practicalCase: {
          title: 'Licenciamento de Central Fotovoltaica de 50 MW no Sul de Angola',
          scenario: 'Um consórcio internacional planeia instalar um parque solar de grande porte numa área semiárida próxima ao Parque Nacional do Iona. O projeto enquadra-se na Categoria A do Decreto Presidencial 117/20.',
          solution: 'Passo 1: Solicitar TdR ao Ministério do Ambiente. Passo 2: Diagnóstico da avifauna e mamíferos locais com apoio do INBAC. Passo 3: Sessões formais de consulta pública nas comunidades tradicionais locais com tradução na língua local. Passo 4: Submissão do EIA/RIMA e PGA detalhado prevendo corredores de migração sem vedação agressiva e consumo reduzido de água na lavagem dos painéis.',
          keyTakeaway: 'Projetos sem consulta pública válida e sem cumprimento do Dec. Presidencial 117/20 arriscam anulação judicial da licença e perda de crédito internacional.'
        },
        executiveSummary: [
          'Lei 5/98 consagra o princípio da prevenção e poluidor-pagador em Angola.',
          'Dec. Presidencial 117/20 regula o rito processual do licenciamento ambiental e categorias A, B e C.',
          'A Consulta Pública é requisito jurídico indispensável para validade da Licença Ambiental de Categoria A.',
          'Financiadores multilaterais exigem conformidade estrita com os IFC Performance Standards.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Lei nº 5/98', description: 'Lei de Bases do Ambiente (República de Angola)' },
          { label: 'Decreto Presidencial nº 117/20', description: 'Regulamento de Avaliação de Impacte Ambiental de Angola' },
          { label: 'IFC Performance Standards', description: 'PS1: Avaliação de Riscos | PS3: Prevenção da Poluição | PS6: Biodiversidade' }
        ]
      }
    ]
  },

  // ==========================================
  // PILAR B: ENGENHARIA CIVIL E GESTÃO DE OBRAS
  // ==========================================
  {
    id: 'civ-mod-1',
    pillar: 'civil',
    moduleNumber: 1,
    title: 'Leitura e Interpretação Avançada de Plantas de Engenharia',
    shortDescription: 'Plantas arquitetónicas, cortes, plantas estruturais, armaduras de betão e BIM.',
    iconName: 'Compass',
    level: 'Básico',
    estimatedHours: 12,
    learningObjectives: [
      'Interpretar e cruzar plantas baixas, cortes longitudinais/transversais e fachadas arquitetónicas.',
      'Ler pranchas estruturais de betão armado: vigas, pilares, sapatas e lajes.',
      'Decifrar detalhamentos de armaduras: diâmetro nominal (φ), espaçamento (c/), comprimento e dobras.',
      'Detectar interferências espaciais e incompatibilidades entre arquitetura, estrutura e instalações (MEP).'
    ],
    lessons: [
      {
        id: 'civ-1-1',
        title: 'Simbologia e Decodificação de Armaduras Estruturais',
        readTimeMinutes: 16,
        theory: [
          'A leitura precisa de plantas estruturais é a principal linha de defesa contra erros de execução em canteiro.',
          'Notação padronizada de barras de aço: N1 4 φ 16.0 c/ 15 c = 485. Onde:',
          ' - N1: Posição ou marca da barra no quadro de corte e dobra.',
          ' - 4: Quantidade total de barras com aquela geometria.',
          ' - φ 16.0: Diâmetro nominal da barra em milímetros (bitola #16).',
          ' - c/ 15: Espaçamento entre eixos das barras consecutivas (a cada 15 cm).',
          ' - c = 485: Comprimento total de corte da barra desdobrada em centímetros.',
          'Armadura Longitudinal: Resiste aos esforços de tração e compressão decorrentes da flexão pura ou composta (momento fletor).',
          'Armadura Transversal (Estribos): Resiste aos esforços de corte (cisalhamento) e confina o núcleo de betão comprimido.',
          'Cobrimento Nominal (c_nom): Espessura de betão entre a superfície externa da armadura e a face externa da peça. Fundamental para proteger o aço contra corrosão e carbonatação, dependendo da classe de agressividade ambiental (15 mm a 50 mm).'
        ],
        practicalCase: {
          title: 'Conferência de Viga Contínua V102 (20x60 cm) no Pavimento Tipo',
          scenario: 'No vão central da viga V102, o encarregado armou 3 φ 20 mm na face superior e 2 φ 10 mm na face inferior, invertendo a armadura de tração no meio do vão.',
          solution: 'Paralisação imediata da concretagem. Em vigas biapoiadas ou vãos centrais sob carga gravitacional positiva, a tração concentra-se na fibra inferior (requerendo maior aço embaixo), enquanto apoios sobre pilares sofrem momentos negativos (tração na fibra superior). Corrigir para 3 φ 20 mm na base e recolocar os espaçadores garantindo c_nom = 3.0 cm.',
          keyTakeaway: 'O momento positivo traciona as fibras inferiores; inverter o aço positivo e negativo resulta em colapso catastrófico por flexão.'
        },
        executiveSummary: [
          'Notação: N (posição), Qtd, φ (bitola em mm), c/ (passo/espaçamento), c (comprimento total).',
          'Estribos fecham o cisalhamento e evitam flambagem das barras longitudinais.',
          'Cobrimento de projeto deve ser rigorosamente respeitado com espaçadores plásticos tipo pastilha.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Comprimento de Ancoragem Básico', description: 'lb = (φ / 4) * (fyd / fbd) (Eurocódigo 2 / NBR 6118)' },
          { label: 'Cobrimento Mínimo', description: 'Ambiente Urbano/Marinho: c_nom = 30 a 50 mm conforme agressividade' }
        ]
      }
    ]
  },

  {
    id: 'civ-mod-2',
    pillar: 'civil',
    moduleNumber: 2,
    title: 'Cálculo Estrutural Básico e Intermediário de Betão Armado',
    shortDescription: 'Momento fletor, esforço cortante, dimensionamento de vigas, pilares e ELU/ELS.',
    iconName: 'Calculator',
    level: 'Intermediário',
    estimatedHours: 20,
    learningObjectives: [
      'Determinar diagramas de esforço cortante (V) e momento fletor (M) para vigas isostáticas e hiperestáticas.',
      'Dimensionar a área de armadura longitudinal de tração (As) para seções retangulares de betão no ELU.',
      'Verificar o estado limite de serviço (ELS): flechas excessivas e abertura de fissuras (wk ≤ 0.3 mm).',
      'Compreender os efeitos de flambagem e esbeltez em pilares de betão armado.'
    ],
    lessons: [
      {
        id: 'civ-2-1',
        title: 'Dimensionamento de Vigas à Flexão Simples (ELU)',
        readTimeMinutes: 18,
        theory: [
          'No Estado Limite Último (ELU), a segurança da estrutura é aferida contra a ruína. Para isso, majoram-se as ações (coeficientes γF) e minoram-se as resistências dos materiais (γC = 1.5 para betão, γS = 1.15 para aço segundo o Eurocódigo 2).',
          'Resistência de Cálculo do Betão: fcd = fck / γC. Ex: Para C25/30, fcd = 25 / 1.5 = 16.67 MPa.',
          'Resistência de Cálculo do Aço: fyd = fyk / γS. Ex: Para aço A500 (ou CA-50), fyd = 500 / 1.15 = 434.8 MPa.',
          'Equilíbrio na Seção Retangular com Braço de Alavanca (z ≈ 0.9 * d para domínios usuais):',
          'A área de armadura de tração necessária é dada aproximadamente por: As = Md / (0.9 * d * fyd).',
          'Onde d é a altura útil da viga (d = h - cobrimento - φ_estribo - φ_long/2) e Md é o momento de cálculo majorado (Md = 1.4 * Mk).'
        ],
        practicalCase: {
          title: 'Dimensionamento de Viga de Salão de Aulas (Vão de 6.0 m)',
          scenario: 'Uma viga retangular de 20 cm x 50 cm com d = 45 cm suporta um carregamento característico total distribuído qk = 25 kN/m num vão L = 6.0 m. Utiliza-se betão C25/30 e aço A500.',
          solution: '1. Momento característico: Mk = qk * L² / 8 = 25 * 36 / 8 = 112.5 kNm. 2. Momento de cálculo: Md = 1.4 * 112.5 = 157.5 kNm. 3. Área de aço aproximada: As = 157.5e3 / (0.9 * 0.45 * 434.78e3) = 0.000895 m² = 8.95 cm². 4. Escolha de barras: 5 barras de φ 16 mm (5 * 2.01 = 10.05 cm² > 8.95 cm²). A viga atende plenamente ao ELU.',
          keyTakeaway: 'A altura útil d tem impacto quadrático na rigidez da peça; aumentar a altura h é muito mais eficiente para controlar flechas e economizar aço do que apenas alargar a viga.'
        },
        executiveSummary: [
          'ELU visa a segurança estrutural; ELS visa a durabilidade e conforto de utilização.',
          'Fórmula expedita de As: As ≈ Md / (0.9 * d * fyd).',
          'Aço CA-50 / A500 tem fyd = 435 MPa; betão C25 tem fcd = 16.7 MPa.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Momento Máximo Isostático', description: 'M_max = q * L² / 8 (Carga distribuída uniforme)' },
          { label: 'Área de Aço Flexão', description: 'As = Md / (fyd * (d - 0.4 * x))' },
          { label: 'Posição da Linha Neutra', description: 'x = (d - sqrt(d² - (2*Md)/(0.85*fcd*b))) / 0.8' }
        ]
      }
    ]
  },

  {
    id: 'civ-mod-3',
    pillar: 'civil',
    moduleNumber: 3,
    title: 'Orçamento Analítico, Fiscalização e Gestão de Canteiro',
    shortDescription: 'Cálculo de BDI, Curva ABC, cronograma físico-financeiro, diário de obra e logística.',
    iconName: 'DollarSign',
    level: 'Intermediário',
    estimatedHours: 15,
    learningObjectives: [
      'Calcular o BDI (Benefícios e Despesas Indiretas) e compor preços unitários de serviços (CPU).',
      'Construir e interpretar a Curva ABC de insumos e serviços para foco de negociação e controlo.',
      'Elaborar cronogramas físico-financeiros integrados à curva S de avanço.',
      'Gerir o diário de obra e organizar o layout físico do canteiro sob normas de segurança.'
    ],
    lessons: [
      {
        id: 'civ-3-1',
        title: 'BDI e Engenharia de Custos',
        readTimeMinutes: 15,
        theory: [
          'O preço final de venda de uma obra é composto por: Custo Direto (CD) + Despesas Indiretas + Lucro + Tributos.',
          'O BDI (Benefícios e Despesas Indiretas) é a taxa percentual aplicada sobre o Custo Direto para cobrir administração central, riscos/imprevistos, despesas financeiras, margem de lucro e impostos sobre o faturamento.',
          'Fórmula clássica do BDI recomendada por Tribunais de Contas e órgãos de contratação pública:',
          'BDI = { [ (1 + AC + S + R + G) * (1 + DF) * (1 + L) ] / [ 1 - I ] } - 1.',
          'Onde: AC = Administração Central, S = Seguros, R = Riscos, G = Garantias, DF = Despesas Financeiras, L = Lucro operacional, I = Tributos sobre receita bruta.',
          'Curva ABC: Princípio de Pareto (80/20). Os itens Classe A representam cerca de 80% do valor financeiro acumulado em apenas 20% dos itens da planilha. Uma variação de 5% no preço do cimento ou do aço impacta o orçamento mais do que 50% de variação em pregos ou arame.'
        ],
        practicalCase: {
          title: 'Planejamento de Compras de Grande Loteamento Habitacional',
          scenario: 'O orçamento totalizou $12 milhões de USD com 450 itens orçamentários. O departamento de compras estava gastando 4 semanas cotando miudezas de marcenaria e pregos.',
          solution: 'Aplicação imediata da Curva ABC: identificou-se que apenas 11 itens (betão usinado, aço CA-50, blocos de betão, tubos PEAD e serviços de terraplenagem) respondiam por 79.4% de todo o custo. Negociações em escala e contratos de fornecimento global concentraram-se exclusivamente nesses 11 itens, alcançando uma economia direta de 8.2% no custo global da obra.',
          keyTakeaway: 'Não perca tempo negociando centavos em itens da Classe C; garanta as melhores condições nos insumos da Classe A.'
        },
        executiveSummary: [
          'Preço de Venda = Custo Direto * (1 + BDI).',
          'Itens Classe A representam ~80% do valor total e demandam 100% da atenção do gestor.',
          'O diário de obra com registro de clima, efetivo de pessoal e paralisações é prova jurídica pericial.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Fórmula Oficial BDI', description: 'BDI = [((1 + AC + S + R + G)*(1 + DF)*(1 + L)) / (1 - I)] - 1' },
          { label: 'Curva ABC', description: 'Classe A (80% valor / 20% itens) | Classe B (15% valor) | Classe C (5% valor)' }
        ]
      }
    ]
  },

  {
    id: 'civ-mod-4',
    pillar: 'civil',
    moduleNumber: 4,
    title: 'Monitorização, Ferramentas de Controlo de Obras e Fiscalização',
    shortDescription: 'EVM (Earned Value Management), ensaios de campo (slump test, esclerometria) e medições.',
    iconName: 'BarChart2',
    level: 'Avançado',
    estimatedHours: 16,
    learningObjectives: [
      'Dominar a Análise do Valor Agregado (EVM / Earned Value Management): VP, VA, CR, IDP (SPI) e IDC (CPI).',
      'Fiscalizar a qualidade dos materiais em obra através de ensaios de campo (Slump Test, moldagem de corpos de prova, esclerometria).',
      'Proceder a medições mensais de subempreiteiros vinculadas aos critérios de medição contratual.',
      'Controlar desvios de cronograma e custos antecipando o Custo Final Previsto (EAC).'
    ],
    lessons: [
      {
        id: 'civ-4-1',
        title: 'Earned Value Management (EVM) na Construção Civil',
        readTimeMinutes: 17,
        theory: [
          'A Análise do Valor Agregado integra simultaneamente Escopo, Custo e Prazo na gestão de projetos.',
          'As 3 Variáveis Fundamentais:',
          ' 1. Valor Planejado (VP / PV): O orçamento aprovado para o trabalho agendado até a data de status.',
          ' 2. Valor Agregado (VA / EV): O valor orçado do trabalho efetivamente realizado até a data.',
          ' 3. Custo Real (CR / AC): O dinheiro total gasto para executar o trabalho até a data.',
          'Indicadores de Desempenho:',
          ' - Índice de Desempenho de Prazos (IDP / SPI) = VA / VP. Se IDP > 1: Obra adiantada. Se IDP < 1: Obra atrasada.',
          ' - Índice de Desempenho de Custos (IDC / CPI) = VA / CR. Se IDC > 1: Obra abaixo do orçamento (economia). Se IDC < 1: Obra estourando custos.',
          'Ensaios Tecnológicos de Betão no Recebimento: Teste de Abatimento do Tronco de Cone (Slump Test conforme norma EN 12350-2 / NBR NM 67). A tolerância usual para abatimento especificado de 12 cm é de ± 2 cm. Adicionar água no canteiro para amolecer betão é falta grave que destrói a relação água/cimento e reduz drasticamente o fck.'
        ],
        practicalCase: {
          title: 'Auditoria de Progresso em Edifício Comercial de 12 Pavimentos',
          scenario: 'No 6º mês de obra, os dados registram: VP = $2.000.000 USD; VA = $1.700.000 USD; CR = $1.900.000 USD.',
          solution: '1. Variação de Prazo (VPr) = VA - VP = -$300.000. IDP = 1.7M / 2.0M = 0.85 (A obra executou apenas 85% do ritmo previsto - 15% de atraso). 2. Variação de Custo (VC) = VA - CR = -$200.000. IDC = 1.7M / 1.9M = 0.89 (Para cada $1 gasto, gerou-se apenas $0.89 de valor). Ação de fiscalização: reprogramação do caminho crítico e renegociação de produtividade das equipes.',
          keyTakeaway: 'Sem o EVM, um gestor que vê custos menores que o orçamento pode achar falsamente que economizou, quando na verdade está gravemente atrasado.'
        },
        executiveSummary: [
          'IDP (SPI) = VA / VP. (>1 adiantado, <1 atrasado).',
          'IDC (CPI) = VA / CR. (>1 econômico, <1 com sobrecusto).',
          'Slump Test é obrigatório na chegada de cada camião-betoneira antes da descarga.',
          'Corpos de prova devem ser curados a 20°C ± 2°C com umidade > 95% para ensaio aos 7 e 28 dias.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Índice de Prazo (IDP)', description: 'IDP = VA / VP (Earned Value / Planned Value)' },
          { label: 'Índice de Custo (IDC)', description: 'IDC = VA / CR (Earned Value / Actual Cost)' },
          { label: 'Estimativa no Término (EAC)', description: 'EAC = Orçamento Total / IDC' }
        ]
      }
    ]
  },

  {
    id: 'civ-mod-5',
    pillar: 'civil',
    moduleNumber: 5,
    title: 'Normas Técnicas Aplicadas: Angola, Portugal e Brasil',
    shortDescription: 'Cruzamento normativo comparativo entre NEC/RAA (Angola), Eurocódigos (EN) e ABNT (Brasil).',
    iconName: 'BookOpen',
    level: 'Profissional',
    estimatedHours: 18,
    learningObjectives: [
      'Mapear e comparar as principais normas de dimensionamento estrutural e betão: Eurocódigo 2 (EN 1992-1-1) vs ABNT NBR 6118 vs RAA de Angola.',
      'Compreender as normas de ações e combinações: Eurocódigo 0 (EN 1990) vs ABNT NBR 8681.',
      'Identificar as especificações de cimento e agregados segundo a norma angolana e europeia.',
      'Saber transitar entre projetos concebidos em normas diferentes em consórcios multinacionais de engenharia.'
    ],
    lessons: [
      {
        id: 'civ-5-1',
        title: 'Matriz Comparativa Normativa: Angola vs Portugal vs Brasil',
        readTimeMinutes: 20,
        theory: [
          'Em grandes empreendimentos na África Lusófona, é comum a convivência de projetos concebidos por projetistas portugueses (Eurocódigos), brasileiros (ABNT) ou locais (Regulamento de Betões de Angola - RAA / NEC).',
          '1. Filosofia de Segurança: Ambas as escolas utilizam o método dos coeficientes parciais de segurança no ELU. No entanto, os coeficientes variam ligeiramente:',
          ' - Eurocódigos (EN 1990 / EN 1992): γC = 1.50 (betão), γS = 1.15 (aço), γG = 1.35 (cargas permanentes desfavoráveis), γQ = 1.50 (cargas variáveis).',
          ' - ABNT (NBR 8681 / NBR 6118): γC = 1.40 (betão), γS = 1.15 (aço), γG = 1.40 (combinação normal), γQ = 1.40.',
          '2. Resistência Característica do Betão:',
          ' - Eurocódigo adota a notação cilíndrica/cúbica: C25/30 significa fck cilíndrico de 25 MPa e fck cúbico de 30 MPa. Atenção: no dimensionamento usa-se SEMPRE o valor cilíndrico (25 MPa)!',
          ' - Brasil (NBR 8953 / 6118) adota apenas o valor cilíndrico: C25.',
          '3. Angola: Tradicionalmente baseia-se no Regulamento de Estruturas de Betão Armado (REBAP / RAA), mas atualmente projetos de grande porte adotam os Eurocódigos com Anexo Nacional ou normas ABNT quando financiados por bancos de desenvolvimento específicos.'
        ],
        practicalCase: {
          title: 'Conversão de Especificação em Ponte Rodoviária em Luanda',
          scenario: 'O projeto executivo veio de Lisboa com especificação de betão C35/45. A usina local em Viana orçou betão "C45" referindo-se a corpos de prova cúbicos.',
          solution: 'Se a usina entregar betão com fck cilíndrico de apenas 28 MPa (cúbico ~35 MPa), a estrutura ficará subdimensionada e correrá risco de colapso. O engenheiro fiscal exigiu ensaio em corpos de prova cilíndricos padrão 15x30 cm com comprovação de fck,cyl ≥ 35 MPa aos 28 dias.',
          keyTakeaway: 'Nunca confunda a resistência cúbica com a cilíndrica. A resistência cilíndrica é tipicamente 15% a 25% menor que a cúbica para o mesmo betão.'
        },
        executiveSummary: [
          'Eurocódigo: C25/30 = 25 MPa (cilindro) / 30 MPa (cubo). Dimensionar sempre pelo menor (cilindro).',
          'ABNT: γC = 1.40; Eurocódigo: γC = 1.50 (Eurocódigo é ligeiramente mais conservador na resistência do betão).',
          'No canteiro, assegurar que os moldes de ensaio (cilíndricos 15x30 cm ou 10x20 cm) correspondam exatamente à norma de cálculo adotada no projeto.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Eurocódigos', description: 'EN 1990 (Bases de Projeto) | EN 1991 (Ações) | EN 1992 (Betão Armado)' },
          { label: 'ABNT', description: 'NBR 6118:2023 (Projeto de estruturas de concreto) | NBR 8681 (Ações e segurança)' },
          { label: 'Angola', description: 'Regulamentos Oficiais de Estruturas e Edificações da República de Angola' }
        ]
      }
    ]
  },

  {
    id: 'civ-mod-6',
    pillar: 'civil',
    moduleNumber: 6,
    title: 'Materiais Sustentáveis, Reciclagem de RCD e Redução da Pegada de Carbono',
    shortDescription: 'Betão com agregados reciclados, polímeros em infraestrutura, reaproveitamento de aço e pozolanas.',
    iconName: 'Recycle',
    level: 'Profissional',
    estimatedHours: 14,
    learningObjectives: [
      'Classificar os Resíduos de Construção e Demolição (RCD) e aplicar técnicas de britagem e triagem.',
      'Dosar betão com agregados graúdos reciclados (AGR) respeitando limites normativos de absorção e abatimento.',
      'Avaliar o uso de resíduos plásticos (PET, PEAD) em pavimentação asfáltica modificada e dutos de drenagem.',
      'Calcular o índice de redução da pegada de carbono (CO2 equivalente) com uso de cinzas volantes e escória de alto-forno em cimentos sustentáveis.'
    ],
    lessons: [
      {
        id: 'civ-6-1',
        title: 'Betão com Agregados Reciclados e Economia Circular na Obra',
        readTimeMinutes: 16,
        theory: [
          'A produção convencional de cimento Portland responde por aproximadamente 7% a 8% de todas as emissões globais antropogênicas de CO2 (devido à descarbonatação do calcário CaCO3 -> CaO + CO2 e à queima em fornos a 1450°C).',
          '1. Agregados Reciclados de Betão (ARB): Podem substituir até 20% a 30% dos agregados graúdos naturais em betões estruturais sem prejuízo perceptível na resistência mecânica à compressão.',
          'Particularidade do ARB: Maior porosidade e alta taxa de absorção de água (5% a 12%, contra 0.5% a 1.5% do brita granítica). Exige pré-umidificação do agregado para não roubar água de hidratação da pasta de cimento.',
          '2. Reutilização de Aço de Construção: Sobras de barras retas podem ser emendadas por solda de topo de topo ou luvas mecânicas prensadas, garantindo 100% da resistência nominal sem desperdício em pontas.',
          '3. Plásticos Reciclados na Infraestrutura: Polímeros triturados (PEAD/PP) incorporados a misturas asfálticas tipo SMA (Stone Matrix Asphalt) aumentam o ponto de amolecimento do asfalto, reduzindo deformações permanentes em climas quentes como o de Angola e Brasil.',
          '4. Cimentos de Baixo Carbono: Substituição de clínquer por pozolanas naturais, cinzas volantes e fíler calcário reduz até 40% a pegada de CO2.'
        ],
        practicalCase: {
          title: 'Pavimentação de Vias Internas de Polo Industrial com RCD',
          scenario: 'A demolição de antigos galpões gerou 15.000 toneladas de entulho de alvenaria e betão. A disposição em aterro custaria $180.000 USD mais custos de transporte.',
          solution: 'Implantação de britador móvel no próprio canteiro: triagem com eletroímã para retirar armaduras (vendidas para siderúrgica de reciclagem), britagem primária obtendo bica corrida reciclada para sub-base de pavimento, e agregado graúdo reciclado para betão de calçadas e meios-fios (fck = 15 MPa). Economia total gerada: $240.000 USD e zero descarte em aterro.',
          keyTakeaway: 'A reciclagem in loco de RCD reduz custos de frete, elimina passivo ambiental e gera insumos com pegada de carbono quase neutra.'
        },
        executiveSummary: [
          'Cimento Portland responde por ~8% do CO2 mundial; materiais cimentícios suplementares são cruciais.',
          'Agregados reciclados exigem pré-molhagem devido à sua alta taxa de absorção.',
          'Sobra de barras de aço pode ser reaproveitada com luvas de emenda mecânica homologadas.'
        ],
        technicalFormulasOrStandards: [
          { label: 'Emissões de CO2', description: '1 ton de clínquer emite aproximadamente 0.82 a 0.90 ton de CO2' },
          { label: 'Norma de RCD', description: 'EN 12620 / ABNT NBR 15116 (Agregados reciclados para concreto)' }
        ]
      }
    ]
  }
];
