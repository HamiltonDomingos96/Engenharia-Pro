import { UserProgress } from '../types';

export const INITIAL_USER_PROGRESS: UserProgress = {
  studentName: '',
  studentRole: 'Programa de Formação Intensiva em Engenharia',
  completedLessonIds: [],
  moduleProgress: {
    'amb-mod-1': 0,
    'amb-mod-2': 0,
    'amb-mod-3': 0,
    'amb-mod-4': 0,
    'civ-mod-1': 0,
    'civ-mod-2': 0,
    'civ-mod-3': 0,
    'civ-mod-4': 0,
    'civ-mod-5': 0,
    'civ-mod-6': 0
  },
  quizResults: {},
  studyMinutesToday: 0,
  totalStudyMinutes: 0,
  lastActive: new Date().toISOString(),
  streakDays: 0,
  unlockedBadges: [],
  notes: {}
};

export const BADGES_INFO = [
  {
    id: 'badge-primeiro-passo',
    title: 'Iniciação Técnica',
    description: 'Completou o primeiro tomo/módulo de formação intensiva.',
    icon: 'Award',
    color: 'emerald'
  },
  {
    id: 'badge-mestre-ar-agua',
    title: 'Monitorização Ambiental',
    description: 'Validação em Parâmetros Físico-Químicos, Ar, Água e Ruído.',
    icon: 'Droplets',
    color: 'sky'
  },
  {
    id: 'badge-leitor-de-plantas',
    title: 'Interpretação Estrutural',
    description: 'Domínio em Pranchas Estruturais, Detalhamento de Armaduras e BIM.',
    icon: 'Compass',
    color: 'amber'
  },
  {
    id: 'badge-calculista-junior',
    title: 'Dimensionamento no ELU',
    description: 'Aprovação com excelência em Cálculo Estrutural de Betão Armado.',
    icon: 'Cpu',
    color: 'indigo'
  },
  {
    id: 'badge-jurisconsulto-verde',
    title: 'Legislação e Licenciamento',
    description: 'Domínio do Decreto Presidencial 117/20 e Lei 5/98 de Angola.',
    icon: 'Scale',
    color: 'purple'
  }
];
