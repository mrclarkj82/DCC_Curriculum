import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ActiveClassItem, ClassRecord, SubmissionTarget, UserProfile } from '../types';
import type {
  AssignmentGameProgressSnapshot,
  AssignmentGameSaveData,
} from '../features/assignmentGame/types';
import {
  loadAssignmentGameSave,
  makeAssignmentGameSaveId,
  saveAssignmentGameProgress,
  type AssignmentGameSaveContext,
} from '../services/assignmentGameSaveService';

interface UseAssignmentGameSaveOptions {
  userProfile: UserProfile | null;
  classRecord: ClassRecord | null;
  activeItem: ActiveClassItem | null;
  target: SubmissionTarget | null;
  unlockSubmissionId: string | null;
  enabled: boolean;
  useLocalFallback: boolean;
}

interface UseAssignmentGameSaveResult {
  saveData: AssignmentGameSaveData | null;
  isLoading: boolean;
  isSaving: boolean;
  message: string | null;
  error: string | null;
  saveProgress: (progress: AssignmentGameProgressSnapshot) => Promise<void>;
}

function contextFromOptions({
  activeItem,
  classRecord,
  target,
  unlockSubmissionId,
  userProfile,
}: UseAssignmentGameSaveOptions): AssignmentGameSaveContext | null {
  if (!userProfile || !classRecord || !activeItem || !target || !unlockSubmissionId) {
    return null;
  }

  return {
    uid: userProfile.uid,
    classId: classRecord.id,
    programAreaId: target.programAreaId,
    activeItemType: activeItem.type,
    activeItemId: activeItem.id,
    targetType: target.targetType,
    targetId: target.targetId,
    unlockSubmissionId,
  };
}

export function useAssignmentGameSave(
  options: UseAssignmentGameSaveOptions,
): UseAssignmentGameSaveResult {
  const [saveData, setSaveData] = useState<AssignmentGameSaveData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const saveContext = useMemo(
    () => contextFromOptions(options),
    [
      options.activeItem?.id,
      options.activeItem?.type,
      options.classRecord?.id,
      options.target?.programAreaId,
      options.target?.targetId,
      options.target?.targetType,
      options.unlockSubmissionId,
      options.userProfile?.uid,
    ],
  );

  useEffect(() => {
    if (!options.enabled || !saveContext) {
      setSaveData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let didCancel = false;
    setIsLoading(true);
    setError(null);

    loadAssignmentGameSave(saveContext.uid, saveContext.classId, {
      useLocalFallback: options.useLocalFallback,
    })
      .then((nextSave) => {
        if (!didCancel) {
          setSaveData(nextSave);
          setIsLoading(false);
        }
      })
      .catch((nextError: Error) => {
        if (!didCancel) {
          setError(nextError.message || 'Unable to load assignment game save data.');
          setSaveData(null);
          setIsLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [options.enabled, options.useLocalFallback, saveContext]);

  const saveProgress = useCallback(
    async (progress: AssignmentGameProgressSnapshot) => {
      if (!saveContext) {
        throw new Error('Assignment game save context is not ready.');
      }

      setIsSaving(true);
      setMessage(null);
      setError(null);

      try {
        await saveAssignmentGameProgress(saveContext, progress, {
          useLocalFallback: options.useLocalFallback,
        });
        setSaveData({
          id: makeAssignmentGameSaveId(saveContext.uid, saveContext.classId),
          uid: saveContext.uid,
          classId: saveContext.classId,
          programAreaId: saveContext.programAreaId,
          activeItemType: saveContext.activeItemType,
          activeItemId: saveContext.activeItemId,
          targetType: saveContext.targetType,
          targetId: saveContext.targetId,
          unlockSubmissionId: saveContext.unlockSubmissionId,
          ...progress,
          updatedAt: new Date().toISOString(),
        });
        setMessage('Checkpoint saved.');
      } catch (nextError) {
        const errorMessage =
          nextError instanceof Error
            ? nextError.message
            : 'Unable to save assignment game progress.';
        setError(errorMessage);
        throw nextError;
      } finally {
        setIsSaving(false);
      }
    },
    [options.useLocalFallback, saveContext],
  );

  return {
    saveData,
    isLoading,
    isSaving,
    message,
    error,
    saveProgress,
  };
}
