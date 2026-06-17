export type ProgramAreaStatus = 'active' | 'draft' | 'archived';

export interface ProgramArea {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  status: ProgramAreaStatus | string;
  defaultRoute: string;
  icon: string;
  sortOrder: number;
  supportedContentTypes: string[];
}

export interface VocabularyTerm {
  term: string;
  definition: string;
}

export interface RubricItem {
  score: number;
  description: string;
}

export interface Lesson {
  id: string;
  programAreaId: string;
  quarter: string;
  unit: string;
  lessonNumber: number;
  title: string;
  status: string;
  video: {
    source: string;
    start: string;
    end: string;
    url: string;
  };
  learningTarget: string;
  bellRinger: {
    type: string;
    prompt: string;
  };
  vocabulary: VocabularyTerm[];
  slides: {
    title: string;
    url: string;
    status: string;
  };
  assignment: {
    id: string;
    title: string;
    submissionType: string;
    evidenceRequired: string[];
  };
  exitTicket: string;
  tags: string[];
}

export interface Assignment {
  id: string;
  programAreaId: string;
  lessonId: string;
  title: string;
  skillFocus: string[];
  instructions: string;
  requiredSteps: string[];
  submissionType: string;
  evidenceRequired: string[];
  rubric: RubricItem[];
  extensionChallenge: string;
  reflectionPrompt: string;
}

export interface QuizQuestion {
  id: string;
  type: string;
  text: string;
  choices?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: string;
  lessonId: string;
  tag: string;
}

export interface Quiz {
  id: string;
  programAreaId: string;
  title: string;
  quarter: string;
  lessonIds: string[];
  status: string;
  isPublished: boolean;
  questions: QuizQuestion[];
}

export interface MediaProject {
  id: string;
  programAreaId: string;
  title: string;
  status: string;
  projectType: string;
  skillFocus: string[];
  description: string;
  studentTask: string;
  submissionTypes: string[];
  evidenceRequired: string[];
  rubric: RubricItem[];
  reflectionPrompt: string;
  tags: string[];
}

export interface BroadcastUpdate {
  id: string;
  programAreaId: string;
  title: string;
  status: string;
  audience: string[];
  summary: string;
  studentInstructions: string;
  linkedResources: string[];
  relatedProjectIds: string[];
  submissionRequirements: string[];
  teacherNotes: string;
  publishDate: string;
  dueDate: string;
  tags: string[];
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: UserRole;
  classIds: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
  lastLoginAt?: unknown;
}

export type ActiveItemType =
  | 'lesson'
  | 'assignment'
  | 'mediaProject'
  | 'broadcastUpdate'
  | 'quiz'
  | 'portfolioCheckpoint';

export type ActiveItemRecord =
  | Lesson
  | Assignment
  | MediaProject
  | BroadcastUpdate
  | Quiz
  | null;

export interface ActiveClassItem {
  id: string;
  type: ActiveItemType;
  programAreaId: string;
  title?: string;
  status?: string;
  record?: ActiveItemRecord;
}

export interface ClassRecord {
  id: string;
  name: string;
  period: string;
  teacherIds: string[];
  studentIds: string[];
  activeProgramAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  schoolYear: string;
  createdAt: unknown;
  updatedAt: unknown;
}
