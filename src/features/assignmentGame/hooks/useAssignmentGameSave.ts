import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getAssignmentGameSave,
  makeAssignmentGameSaveId,
  saveAssignmentGameProgress,
} from '../../../services/assignmentGameSaveService';
import { firestoreErrorMessage } from '../../../services/firestoreService';
import type {
  AssignmentGameSaveContext,
  AssignmentGameSaveDocument,
  AssignmentGameSaveSnapshot,
} from '../saveTypes';

type AssignmentGameSaveStatus = 'unavailable' | 'loading' | 'ready' | 'saving' | 'error';

interface UseAssignmentGameSaveResult {
  canSave: boolean;
  isLoading: boolean;
  isSaving: boolean;
  message: string;
  saveDocument: AssignmentGameSaveDocument | null;
  saveError: string | null;
  saveProgress: (snapshot: AssignmentGameSaveSnapshot) => Promise<void>;
}

export function useAssignmentGameSave(
  saveContext: AssignmentGameSaveContext | null,
): UseAssignmentGameSaveResult {
  const [saveDocument, setSaveDocument] = useState<AssignmentGameSaveDocument | null>(null);
  const [saveStatus, setSaveStatus] = useState<AssignmentGameSaveStatus>(
    saveContext ? 'loading' : 'unavailable',
  );
  const [saveError, setSaveError] = useState<string | null>(null);

  const saveId = useMemo(
    () => (saveContext ? makeAssignmentGameSaveId(saveContext) : ''),
    [saveContext],
  );

  useEffect(() => {
    if (!saveContext) {
      setSaveDocument(null);
      setSaveStatus('unavailable');
      setSaveError(null);
      return;
    }

    let didCancel = false;
    setSaveDocument(null);
    setSaveStatus('loading');
    setSaveError(null);

    getAssignmentGameSave(saveContext)
      .then((nextSave) => {
        if (!didCancel) {
          setSaveDocument(nextSave);
          setSaveStatus('ready');
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setSaveDocument(null);
          setSaveError(firestoreErrorMessage(error, 'Unable to load saved game progress.'));
          setSaveStatus('error');
        }
      });

    return () => {
      didCancel = true;
    };
  }, [saveContext, saveId]);

  const saveProgress = useCallback(
    async (snapshot: AssignmentGameSaveSnapshot) => {
      if (!saveContext) {
        setSaveError('Saved progress requires a verified student, class, and assignment target.');
        setSaveStatus('error');
        return;
      }

      setSaveStatus('saving');
      setSaveError(null);

      try {
        const nextSave = await saveAssignmentGameProgress(saveContext, snapshot);
        setSaveDocument(nextSave);
        setSaveStatus('ready');
      } catch (error) {
        setSaveError(firestoreErrorMessage(error, 'Unable to save game progress.'));
        setSaveStatus('error');
      }
    },
    [saveContext],
  );

  const message = useMemo(() => {
    if (saveStatus === 'unavailable') {
      return 'Save is unavailable until the game verifies your student, class, and assignment target.';
    }

    if (saveStatus === 'loading') {
      return 'Checking for a saved run...';
    }

    if (saveStatus === 'saving') {
      return 'Saving progress...';
    }

    if (saveStatus === 'error') {
      return saveError ?? 'Saved progress could not be verified.';
    }

    return saveDocument
      ? 'Saved run ready. Continue will load your latest Firestore save.'
      : 'No saved run yet. Start a new game and use Save Progress to create one.';
  }, [saveDocument, saveError, saveStatus]);

  return {
    canSave: Boolean(saveContext) && saveStatus !== 'loading' && saveStatus !== 'saving',
    isLoading: saveStatus === 'loading',
    isSaving: saveStatus === 'saving',
    message,
    saveDocument,
    saveError,
    saveProgress,
  };
}
