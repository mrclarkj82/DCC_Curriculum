import { useEffect, useState } from 'react';
import {
  getAssignmentGameAccessStatusFromSubmission,
  validateAssignmentGameAccessContext,
  type AssignmentGameAccessContext,
  type AssignmentGameAccessResult,
} from '../services/assignmentGameAccessService';
import { subscribeToSubmission } from '../services/submissionService';

const loadingAccessState: AssignmentGameAccessResult = {
  state: 'loading',
  canAccess: false,
  reason: 'Checking assignment completion...',
  targetTitle: 'Current assignment',
  assignmentLink: '/today',
  submissionId: null,
};

export function useAssignmentGameAccess(
  context: AssignmentGameAccessContext,
): AssignmentGameAccessResult {
  const [access, setAccess] = useState<AssignmentGameAccessResult>(loadingAccessState);

  useEffect(() => {
    const preflight = validateAssignmentGameAccessContext(context);

    if (preflight) {
      setAccess(preflight);
      return undefined;
    }

    const { classRecord, studentId, target } = context;

    if (!classRecord || !target) {
      setAccess(preflight ?? loadingAccessState);
      return undefined;
    }

    setAccess({
      ...loadingAccessState,
      targetTitle: target.title,
      assignmentLink:
        target.targetType === 'assignment' ? `/assignments/${target.targetId}` : '/today',
    });

    return subscribeToSubmission(
      classRecord.id,
      target.targetType,
      target.targetId,
      studentId,
      (submission) => {
        setAccess(getAssignmentGameAccessStatusFromSubmission(context, submission));
      },
      (error) => {
        setAccess({
          state: 'locked',
          canAccess: false,
          reason:
            error.message ||
            'Unable to confirm your assignment completion. Try refreshing after submitting evidence.',
          targetTitle: target.title,
          assignmentLink:
            target.targetType === 'assignment' ? `/assignments/${target.targetId}` : '/today',
          submissionId: null,
        });
      },
    );
  }, [
    context.activeItem?.id,
    context.activeItem?.type,
    context.classRecord?.id,
    context.studentId,
    context.target?.targetId,
    context.target?.targetType,
    context.userProfile?.role,
    context.userProfile?.uid,
  ]);

  return access;
}
