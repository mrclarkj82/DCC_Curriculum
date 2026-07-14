import type {
  ActiveClassItem,
  ClassRecord,
  StudentSubmission,
  SubmissionStatus,
  SubmissionTarget,
  UserProfile,
} from '../types';
import { getSubmission } from './submissionService';

export type AssignmentGameAccessState = 'loading' | 'locked' | 'unlocked' | 'error';

export interface AssignmentGameAccessContext {
  userProfile: UserProfile | null;
  classRecord: ClassRecord | null;
  activeItem: ActiveClassItem | null;
  target: SubmissionTarget | null;
}

export interface AssignmentGameAccessResult {
  allowed: boolean;
  reason: string;
  state: AssignmentGameAccessState;
  classId?: string;
  targetId?: string;
  submissionId?: string;
  missingRequirements?: string[];
}

export const assignmentGameTitle = 'The Ember Gate';

// Phase 1 treats required submission work as enough to unlock the placeholder.
// Change this to ['accepted'] later if unlocks should require teacher approval.
export const ASSIGNMENT_GAME_UNLOCK_SUBMISSION_STATUSES: readonly SubmissionStatus[] = [
  'submitted',
  'resubmitted',
  'accepted',
] as const;

const lockedResult = (
  reason: string,
  missingRequirements: string[],
  context: AssignmentGameAccessContext,
): AssignmentGameAccessResult => ({
  allowed: false,
  reason,
  state: 'locked',
  classId: context.classRecord?.id,
  targetId: context.target?.targetId,
  missingRequirements,
});

export const loadingAssignmentGameAccessResult: AssignmentGameAccessResult = {
  allowed: false,
  reason: 'Checking assignment progress...',
  state: 'loading',
  missingRequirements: [],
};

function evidenceChecklistIsComplete(submission: StudentSubmission): boolean {
  return (
    !submission.evidenceChecklist.length ||
    submission.evidenceChecklist.every((item) => item.complete)
  );
}

function submissionHasEvidenceLink(submission: StudentSubmission): boolean {
  return submission.driveLinks.length + submission.otherLinks.length > 0;
}

export function validateAssignmentGameAccessContext(
  studentId: string,
  targetId: string,
  context: AssignmentGameAccessContext,
): AssignmentGameAccessResult | null {
  if (!studentId || !context.userProfile) {
    return lockedResult(
      'Sign in with your student account to unlock The Ember Gate.',
      ['Sign in with an approved DCC student account.'],
      context,
    );
  }

  if (context.userProfile.role !== 'student') {
    return lockedResult(
      'The Ember Gate is only available to signed-in students.',
      ['Use a student account for this assignment unlock.'],
      context,
    );
  }

  if (context.userProfile.uid !== studentId) {
    return lockedResult(
      'The signed-in student profile could not be verified.',
      ['Refresh and sign in again with your own student account.'],
      context,
    );
  }

  if (!context.classRecord) {
    return lockedResult(
      'Join or be assigned to a class before unlocking The Ember Gate.',
      ['Join your class with the teacher-provided class code.'],
      context,
    );
  }

  if (
    !context.classRecord.studentIds.includes(studentId) ||
    !context.userProfile.classIds.includes(context.classRecord.id)
  ) {
    return lockedResult(
      'Your student account is not on this active class roster.',
      ['Ask your teacher to confirm your class assignment.'],
      context,
    );
  }

  if (!context.activeItem) {
    return lockedResult(
      "Today's active mission could not be loaded yet.",
      ['Wait for the active class mission to load.'],
      context,
    );
  }

  if (
    context.activeItem.type !== context.classRecord.activeItemType ||
    context.activeItem.id !== context.classRecord.activeItemId
  ) {
    return lockedResult(
      'The game unlock must match the current active class mission.',
      ["Open today's current mission from the Daily Mission Board."],
      context,
    );
  }

  if (!context.target) {
    return lockedResult(
      'This active mission does not have a submission target yet.',
      ['Complete the current mission directions from your teacher.'],
      context,
    );
  }

  if (!targetId || targetId !== context.target.targetId) {
    return lockedResult(
      'The assignment unlock target could not be verified.',
      ["Return to Today's Mission and try again from the current assignment card."],
      context,
    );
  }

  return null;
}

export function getAssignmentGameAccessResultFromSubmission(
  studentId: string,
  targetId: string,
  context: AssignmentGameAccessContext,
  submission: StudentSubmission | null,
): AssignmentGameAccessResult {
  const contextResult = validateAssignmentGameAccessContext(studentId, targetId, context);

  if (contextResult) {
    return contextResult;
  }

  const missingRequirements: string[] = [];

  if (!submission) {
    missingRequirements.push("Submit the required evidence for today's mission.");
  } else {
    if (!ASSIGNMENT_GAME_UNLOCK_SUBMISSION_STATUSES.includes(submission.status)) {
      missingRequirements.push('Submit or resubmit the evidence after making revisions.');
    }

    if (!submissionHasEvidenceLink(submission)) {
      missingRequirements.push(
        'Add at least one Google Drive, Google Docs, or YouTube evidence link.',
      );
    }

    if (!submission.reflection.trim()) {
      missingRequirements.push('Complete the reflection field.');
    }

    if (!evidenceChecklistIsComplete(submission)) {
      missingRequirements.push('Check off each required evidence item.');
    }
  }

  if (missingRequirements.length) {
    return lockedResult(
      "Finish the required assignment work for today's mission to unlock The Ember Gate.",
      missingRequirements,
      context,
    );
  }

  return {
    allowed: true,
    reason:
      'You have opened the first gate. The game will appear here in a future phase. For now, your completion unlock has been verified.',
    state: 'unlocked',
    classId: context.classRecord?.id,
    targetId: context.target?.targetId,
    submissionId: submission?.id,
    missingRequirements: [],
  };
}

export async function canStudentAccessAssignmentGame(
  studentId: string,
  targetId: string,
  context: AssignmentGameAccessContext,
): Promise<AssignmentGameAccessResult> {
  const contextResult = validateAssignmentGameAccessContext(studentId, targetId, context);

  if (contextResult) {
    return contextResult;
  }

  if (!context.classRecord || !context.target) {
    return lockedResult(
      'The assignment game access check could not resolve the current target.',
      ['Return to Today and let the current mission finish loading.'],
      context,
    );
  }

  const submission = await getSubmission(
    context.classRecord.id,
    context.target.targetType,
    context.target.targetId,
    studentId,
  );

  return getAssignmentGameAccessResultFromSubmission(studentId, targetId, context, submission);
}
