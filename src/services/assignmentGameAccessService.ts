import type {
  ActiveClassItem,
  ClassRecord,
  StudentSubmission,
  SubmissionTarget,
  UserProfile,
} from '../types';
import { getSubmission } from './submissionService';

export type AssignmentGameAccessState = 'loading' | 'unlocked' | 'locked' | 'unavailable';

export interface AssignmentGameAccessContext {
  studentId: string;
  userProfile: UserProfile | null;
  classRecord: ClassRecord | null;
  activeItem: ActiveClassItem | null;
  target: SubmissionTarget | null;
}

export interface AssignmentGameAccessResult {
  state: AssignmentGameAccessState;
  canAccess: boolean;
  reason: string;
  targetTitle: string;
  assignmentLink: string;
  submissionId: string | null;
}

const completeSubmissionStatuses = ['submitted', 'resubmitted', 'accepted'];

const defaultAccessResult = (
  state: AssignmentGameAccessState,
  reason: string,
  target: SubmissionTarget | null,
): AssignmentGameAccessResult => ({
  state,
  canAccess: state === 'unlocked',
  reason,
  targetTitle: target?.title ?? 'Current assignment',
  assignmentLink:
    target?.targetType === 'assignment' ? `/assignments/${target.targetId}` : '/today',
  submissionId: null,
});

export function submissionCompletesAssignmentGameGate(
  submission: StudentSubmission | null,
): boolean {
  if (!submission || !completeSubmissionStatuses.includes(submission.status)) {
    return false;
  }

  const evidenceItemsComplete =
    !submission.evidenceChecklist.length ||
    submission.evidenceChecklist.every((item) => item.complete);
  const hasEvidenceLink = submission.driveLinks.length + submission.otherLinks.length > 0;

  return evidenceItemsComplete && hasEvidenceLink && Boolean(submission.reflection.trim());
}

export function validateAssignmentGameAccessContext(
  context: AssignmentGameAccessContext,
): AssignmentGameAccessResult | null {
  const { activeItem, classRecord, studentId, target, userProfile } = context;

  if (!userProfile || !studentId) {
    return defaultAccessResult(
      'locked',
      'Sign in with your student account to unlock the game.',
      target,
    );
  }

  if (userProfile.role !== 'student') {
    return defaultAccessResult(
      'locked',
      'The assignment game is student-facing. Teacher preview mode stays read-only.',
      target,
    );
  }

  if (!classRecord) {
    return defaultAccessResult('locked', 'Join or be assigned to a class before playing.', target);
  }

  if (!classRecord.studentIds.includes(studentId)) {
    return defaultAccessResult(
      'locked',
      'This game only unlocks for students on the active class roster.',
      target,
    );
  }

  if (!activeItem) {
    return defaultAccessResult(
      'unavailable',
      'The current class assignment could not be loaded.',
      target,
    );
  }

  if (
    activeItem.type !== classRecord.activeItemType ||
    activeItem.id !== classRecord.activeItemId
  ) {
    return defaultAccessResult(
      'locked',
      "The assignment game unlocks from your class's current active mission.",
      target,
    );
  }

  if (!target) {
    return defaultAccessResult(
      'unavailable',
      'This active class item does not have a link-submission target yet.',
      target,
    );
  }

  return null;
}

export function getAssignmentGameAccessStatusFromSubmission(
  context: AssignmentGameAccessContext,
  submission: StudentSubmission | null,
): AssignmentGameAccessResult {
  const preflight = validateAssignmentGameAccessContext(context);

  if (preflight) {
    return preflight;
  }

  if (submissionCompletesAssignmentGameGate(submission)) {
    return {
      ...defaultAccessResult(
        'unlocked',
        'Required evidence is complete. The Ember Gate assignment game is unlocked.',
        context.target,
      ),
      submissionId: submission?.id ?? null,
    };
  }

  return defaultAccessResult(
    'locked',
    'Complete the required evidence checklist, submit at least one accepted link, and add a reflection to unlock the game.',
    context.target,
  );
}

export async function canStudentAccessAssignmentGame(
  context: AssignmentGameAccessContext,
): Promise<AssignmentGameAccessResult> {
  const preflight = validateAssignmentGameAccessContext(context);

  if (preflight) {
    return preflight;
  }

  const { classRecord, studentId, target } = context;

  if (!classRecord || !target) {
    return defaultAccessResult(
      'unavailable',
      'The assignment game gate could not resolve the current class target.',
      target,
    );
  }

  const submission = await getSubmission(
    classRecord.id,
    target.targetType,
    target.targetId,
    studentId,
  );

  return getAssignmentGameAccessStatusFromSubmission(context, submission);
}
