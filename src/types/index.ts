export type PillarType = 'ambiental' | 'civil';

export type MasteryLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';

export interface LessonContent {
  id: string;
  title: string;
  readTimeMinutes: number;
  theory: string[];
  practicalCase: {
    title: string;
    scenario: string;
    solution: string;
    keyTakeaway: string;
  };
  executiveSummary: string[];
  technicalFormulasOrStandards?: {
    label: string;
    description: string;
  }[];
}

export interface ModuleData {
  id: string;
  pillar: PillarType;
  moduleNumber: number;
  title: string;
  shortDescription: string;
  iconName: string;
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Profissional';
  estimatedHours: number;
  lessons: LessonContent[];
  learningObjectives: string[];
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  question: string;
  contextCase?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  normReference?: string;
}

export interface QuizResult {
  moduleId: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  masteryLevel: MasteryLevel;
  completedAt: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

export interface UserProgress {
  studentName: string;
  studentRole: string;
  completedLessonIds: string[];
  moduleProgress: Record<string, number>; // moduleId -> percent (0-100)
  quizResults: Record<string, QuizResult>; // moduleId -> result
  studyMinutesToday: number;
  totalStudyMinutes: number;
  lastActive: string;
  streakDays: number;
  unlockedBadges: string[];
  notes: Record<string, string>; // lessonId -> user note
}

export interface AICoachAnalysis {
  overallHealthScore: number; // 0-100
  dominantLevel: MasteryLevel;
  strengths: string[];
  criticalWeaknesses: string[];
  recommendedActions: {
    moduleId: string;
    priority: 'Alta' | 'Média' | 'Normal';
    actionText: string;
    reason: string;
  }[];
  dailyMicroTasks: {
    task: string;
    estimatedMinutes: number;
    completed: boolean;
  }[];
}
