import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { AssignmentGameShell } from '../features/assignmentGame/AssignmentGameShell';
import type { AssignmentGameSaveContext } from '../features/assignmentGame/saveTypes';
import { PageContainer } from '../components/PageContainer';
import { usePrimaryClassRecord } from '../hooks/usePrimaryClassRecord';
import { useAssignmentGameAccess } from '../hooks/useAssignmentGameAccess';
import { getActiveItem } from '../services/activeItemService';
import {
  assignmentGameTitle,
  type AssignmentGameAccessResult,
} from '../services/assignmentGameAccessService';
import { firestoreErrorMessage } from '../services/firestoreService';
import { resolveSubmissionTargetForActiveItem } from '../services/submissionService';
import type { ActiveClassItem } from '../types';

function LockedGameGate({ access }: { access: AssignmentGameAccessResult }) {
  return (
    <section className="card mission-panel neon-border assignment-game-gate-card">
      <p className="retro-label">Game Locked</p>
      <h2>Finish today's required work first</h2>
      <p>
        Finish the required assignment work for today's mission to unlock {assignmentGameTitle}.
      </p>
      {access.missingRequirements?.length ? (
        <ul className="assignment-game-missing-list">
          {access.missingRequirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">{access.reason}</p>
      )}
      <div className="hero-actions">
        <Link className="gradient-button" to="/today">
          Back to Today's Mission
        </Link>
      </div>
    </section>
  );
}

function ErrorGameGate({ message }: { message: string }) {
  return (
    <section className="card mission-panel neon-border error-state assignment-game-gate-card">
      <p className="retro-label">Access Check Error</p>
      <h2>The app could not verify access</h2>
      <p>{message}</p>
      <Link className="outline-button" to="/today">
        Return to Today's Mission
      </Link>
    </section>
  );
}

export function StudentGamePage() {
  const { loading: authLoading, userProfile } = useAuth();
  const { classRecord, error: classError, isLoading: classLoading } = usePrimaryClassRecord();
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
            firestoreErrorMessage(error, 'Unable to load the active mission for The Ember Gate.'),
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
  const classRecordPending = Boolean(userProfile?.classIds.length && !classRecord && !classError);
  const activeItemPending = Boolean(classRecord && !activeItem && !activeItemError);
  const accessContextPending =
    authLoading || classLoading || activeItemLoading || classRecordPending || activeItemPending;
  const access = useAssignmentGameAccess(
    userProfile?.uid ?? '',
    target?.targetId ?? '',
    {
      activeItem,
      classRecord,
      target,
      userProfile,
    },
    {
      isPending: accessContextPending,
    },
  );
  const saveContext = useMemo<AssignmentGameSaveContext | null>(() => {
    if (
      !access.allowed ||
      !access.submissionId ||
      !userProfile ||
      !classRecord ||
      !activeItem ||
      !target
    ) {
      return null;
    }

    return {
      uid: userProfile.uid,
      studentEmail: userProfile.email,
      classId: classRecord.id,
      programAreaId: target.programAreaId,
      targetType: target.targetType,
      targetId: target.targetId,
      activeItemType: activeItem.type,
      activeItemId: activeItem.id,
      submissionId: access.submissionId,
    };
  }, [
    access.allowed,
    access.submissionId,
    activeItem?.id,
    activeItem?.type,
    classRecord?.id,
    target?.programAreaId,
    target?.targetId,
    target?.targetType,
    userProfile?.email,
    userProfile?.uid,
  ]);

  return (
    <PageContainer
      eyebrow="Student Game Gate"
      title={assignmentGameTitle}
      description="A gated student adventure unlocked by verified assignment work."
      className="mission-board assignment-game-page"
    >
      {(accessContextPending || access.state === 'loading') && (
        <LoadingState label="Checking assignment progress..." />
      )}
      {classError && <ErrorState message={classError} />}
      {activeItemError && <ErrorState message={activeItemError} />}
      {!authLoading &&
        !classLoading &&
        !activeItemLoading &&
        !classError &&
        !activeItemError &&
        access.state === 'error' && <ErrorGameGate message={access.reason} />}
      {!authLoading &&
        !classLoading &&
        !activeItemLoading &&
        !classError &&
        !activeItemError &&
        access.state === 'locked' && <LockedGameGate access={access} />}
      {!authLoading &&
        !classLoading &&
        !activeItemLoading &&
        !classError &&
        !activeItemError &&
        access.allowed && <AssignmentGameShell saveContext={saveContext} />}
    </PageContainer>
  );
}
