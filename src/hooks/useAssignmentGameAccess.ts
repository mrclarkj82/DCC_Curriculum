import { useEffect, useState } from 'react';
import {
  canStudentAccessAssignmentGame,
  getAssignmentGameAccessResultFromSubmission,
  loadingAssignmentGameAccessResult,
  validateAssignmentGameAccessContext,
  type AssignmentGameAccessContext,
  type AssignmentGameAccessResult,
} from '../services/assignmentGameAccessService';
import { subscribeToSubmission } from '../services/submissionService';

interface UseAssignmentGameAccessOptions {
  isPending?: boolean;
}

export function useAssignmentGameAccess(
  studentId: string,
  targetId: string,
  context: AssignmentGameAccessContext,
  options: UseAssignmentGameAccessOptions = {},
): AssignmentGameAccessResult {
  const [access, setAccess] = useState<AssignmentGameAccessResult>(
    loadingAssignmentGameAccessResult,
  );
  const isPending = options.isPending ?? false;

  useEffect(() => {
    if (isPending) {
      setAccess({
        ...loadingAssignmentGameAccessResult,
        classId: context.classRecord?.id,
        targetId: targetId || context.target?.targetId,
      });
      return undefined;
    }

    const contextResult = validateAssignmentGameAccessContext(studentId, targetId, context);

    if (contextResult) {
      setAccess(contextResult);
      return undefined;
    }

    if (!context.classRecord || !context.target) {
      setAccess({
        allowed: false,
        reason: 'The assignment game access check could not resolve the current target.',
        state: 'locked',
        missingRequirements: ['Return to Today and let the current mission finish loading.'],
      });
      return undefined;
    }

    let didCancel = false;
    setAccess({
      ...loadingAssignmentGameAccessResult,
      classId: context.classRecord.id,
      targetId: context.target.targetId,
    });

    void canStudentAccessAssignmentGame(studentId, targetId, context)
      .then((nextAccess) => {
        if (!didCancel) {
          setAccess(nextAccess);
        }
      })
      .catch((error: Error) => {
        if (!didCancel) {
          setAccess({
            allowed: false,
            reason:
              error.message ||
              'The app could not verify access to The Ember Gate. Please try again from Today.',
            state: 'error',
            classId: context.classRecord?.id,
            targetId: context.target?.targetId,
            missingRequirements: [],
          });
        }
      });

    const unsubscribe = subscribeToSubmission(
      context.classRecord.id,
      context.target.targetType,
      context.target.targetId,
      studentId,
      (submission) => {
        if (!didCancel) {
          setAccess(
            getAssignmentGameAccessResultFromSubmission(
              studentId,
              targetId,
              context,
              submission,
            ),
          );
        }
      },
      (error) => {
        if (!didCancel) {
          setAccess({
            allowed: false,
            reason:
              error.message ||
              'The app could not verify access to The Ember Gate. Please try again from Today.',
            state: 'error',
            classId: context.classRecord?.id,
            targetId: context.target?.targetId,
            missingRequirements: [],
          });
        }
      },
    );

    return () => {
      didCancel = true;
      unsubscribe();
    };
  }, [
    context.activeItem?.id,
    context.activeItem?.type,
    context.classRecord?.id,
    context.target?.targetId,
    context.target?.targetType,
    context.userProfile?.role,
    context.userProfile?.uid,
    isPending,
    studentId,
    targetId,
  ]);

  return access;
}
