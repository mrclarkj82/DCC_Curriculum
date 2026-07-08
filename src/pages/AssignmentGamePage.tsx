import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { AssignmentGameGateView } from '../components/assignmentGame/AssignmentGameGateView';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { useAssignmentGameAccess } from '../hooks/useAssignmentGameAccess';
import { useAssignmentGameSave } from '../hooks/useAssignmentGameSave';
import { usePrimaryClassRecord } from '../hooks/usePrimaryClassRecord';
import { getActiveItem } from '../services/activeItemService';
import { firestoreErrorMessage } from '../services/firestoreService';
import { resolveSubmissionTargetForActiveItem } from '../services/submissionService';
import type { ActiveClassItem } from '../types';

export function AssignmentGamePage() {
  const { isLocalDemoMode } = useAuth();
  const {
    classRecord,
    error: classError,
    isLoading: classLoading,
    userProfile,
  } = usePrimaryClassRecord();
  const [activeItem, setActiveItem] = useState<ActiveClassItem | null>(null);
  const [activeItemLoading, setActiveItemLoading] = useState(false);
  const [activeItemError, setActiveItemError] = useState<string | null>(null);

  useEffect(() => {
    if (!classRecord) {
      setActiveItem(null);
      setActiveItemLoading(false);
      setActiveItemError(null);
      return;
    }

    let didCancel = false;
    setActiveItemLoading(true);
    setActiveItemError(null);

    getActiveItem(
      classRecord.activeItemType,
      classRecord.activeItemId,
      classRecord.activeProgramAreaId,
    )
      .then((nextActiveItem) => {
        if (!didCancel) {
          setActiveItem(nextActiveItem);
          setActiveItemLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setActiveItem(null);
          setActiveItemError(
            firestoreErrorMessage(error, 'Unable to load the active assignment for the game gate.'),
          );
          setActiveItemLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [classRecord]);

  const target = useMemo(
    () => (activeItem ? resolveSubmissionTargetForActiveItem(activeItem) : null),
    [activeItem],
  );
  const access = useAssignmentGameAccess({
    activeItem,
    classRecord,
    studentId: userProfile?.uid ?? '',
    target,
    userProfile,
  });
  const save = useAssignmentGameSave({
    activeItem,
    classRecord,
    enabled: access.canAccess,
    target,
    unlockSubmissionId: access.submissionId,
    userProfile,
    useLocalFallback: isLocalDemoMode,
  });

  return (
    <PageContainer
      eyebrow="Student Game"
      title="Ember Gate"
      description="A student-only assignment reward game that unlocks after required class work is complete."
      className="mission-board assignment-game-page"
    >
      {classLoading && <LoadingState label="Loading your class before opening the game gate..." />}
      {classError && <ErrorState message={classError} />}
      {activeItemLoading && <LoadingState label="Checking the active assignment..." />}
      {activeItemError && <ErrorState message={activeItemError} />}
      {!classLoading && !activeItemLoading && !classError && !activeItemError && (
        <AssignmentGameGateView
          access={access}
          saveData={save.saveData}
          isSaveLoading={save.isLoading}
          isSaving={save.isSaving}
          saveMessage={save.message}
          saveError={save.error}
          onSave={save.saveProgress}
        />
      )}
    </PageContainer>
  );
}
