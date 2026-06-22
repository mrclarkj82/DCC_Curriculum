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

export type PromptField =
  | string
  | {
      type?: string;
      prompt: string;
    };

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
  bellRinger?: PromptField;
  exitTicket?: PromptField;
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
  bellRinger?: PromptField;
  exitTicket?: PromptField;
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
  bellRinger?: PromptField;
  exitTicket?: PromptField;
  tags: string[];
}

export type UserRole = 'student' | 'teacher' | 'admin';

export type ClassMembershipType = 'student' | 'teacher';

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

export type ActiveItemRecord = Lesson | Assignment | MediaProject | BroadcastUpdate | Quiz | null;

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

export type ClassJoinCodeStatus = 'active' | 'disabled' | 'expired';

export interface ClassJoinCode {
  code: string;
  classId: string;
  className: string;
  period: string;
  createdBy: string;
  createdAt: unknown;
  updatedAt: unknown;
  expiresAt: unknown | null;
  isActive: boolean;
  allowedEmailDomain: string;
  usageCount: number;
  lastUsedAt: unknown | null;
}

export interface JoinClassResult {
  classId: string;
  className: string;
  period: string;
}

export interface JoinClassError {
  code: string;
  message: string;
}

export type ResponseStatus = 'submitted';

export type ResponseKind = 'bellRinger' | 'exitTicket';

export type ViewerMode = 'student' | 'teacher-preview';

export interface StudentResponseBase {
  id: string;
  uid: string;
  studentName: string;
  studentEmail: string;
  classId: string;
  programAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  prompt: string;
  response: string;
  status: ResponseStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface BellRingerResponse extends StudentResponseBase {
  kind: 'bellRinger';
}

export interface ExitTicketResponse extends StudentResponseBase {
  kind: 'exitTicket';
}

export interface TeacherPreviewResponse {
  id: string;
  teacherUid: string;
  teacherName: string;
  teacherEmail: string;
  classId: string;
  programAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  responseKind: ResponseKind;
  prompt: string;
  response: string;
  status: 'preview-submitted';
  isPreview: true;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface TeacherPreviewContext {
  classRecord: ClassRecord;
  activeItem: ActiveClassItem;
  programArea: ProgramArea | null;
}

export interface ResponseCompletionSummary {
  uid: string;
  studentName: string;
  studentEmail: string;
  bellRingerComplete: boolean;
  exitTicketComplete: boolean;
  bellRingerUpdatedAt?: unknown;
  exitTicketUpdatedAt?: unknown;
  bellRingerResponse?: BellRingerResponse;
  exitTicketResponse?: ExitTicketResponse;
}

export const isAdminRole = (role: UserRole | null | undefined): role is 'admin' => role === 'admin';

export const isTeacherRole = (role: UserRole | null | undefined): role is 'teacher' | 'admin' =>
  role === 'teacher' || role === 'admin';

export const canManageClass = (
  userProfile: UserProfile | null | undefined,
  classRecord: ClassRecord,
): boolean =>
  Boolean(
    userProfile &&
    (isAdminRole(userProfile.role) || classRecord.teacherIds.includes(userProfile.uid)),
  );

export const canSetActiveItem = (
  userProfile: UserProfile | null | undefined,
  classRecord: ClassRecord,
): boolean => canManageClass(userProfile, classRecord);

export const isTeacherPreviewMode = (viewerMode: ViewerMode): viewerMode is 'teacher-preview' =>
  viewerMode === 'teacher-preview';
