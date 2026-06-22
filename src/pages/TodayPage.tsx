import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ClassJoinForm } from '../components/classes/ClassJoinForm';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StudentTodayExperience } from '../components/today/StudentTodayExperience';
import { getActiveItem } from '../services/activeItemService';
import { subscribeToClass } from '../services/classService';
import { firestoreErrorMessage } from '../services/firestoreService';
import { getProgramAreaById } from '../services/programAreaService';
import type { ActiveClassItem, ClassRecord, ProgramArea } from '../types';

export function TodayPage() {
  const { classIds, loading: authLoading, userProfile } = useAuth();
  const [assignedClass, setAssignedClass] = useState<ClassRecord | null>(null);
  const [classLoading, setClassLoading] = useState(false);
  const [classError, setClassError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<ActiveClassItem | null>(null);
  const [programArea, setProgramArea] = useState<ProgramArea | null>(null);
  const [activeItemLoading, setActiveItemLoading] = useState(false);
  const [activeItemError, setActiveItemError] = useState<string | null>(null);

  useEffect(() => {
    if (!classIds.length) {
      setAssignedClass(null);
      setClassLoading(false);
      setClassError(null);
      return undefined;
    }

    setClassLoading(true);
    setClassError(null);

    return subscribeToClass(
      classIds[0],
      (classRecord) => {
        setAssignedClass(classRecord);
        setClassLoading(false);
      },
      (error) => {
        setClassError(error.message || 'Unable to load your class record. Please try again later.');
        setAssignedClass(null);
        setClassLoading(false);
      },
    );
  }, [classIds]);

  useEffect(() => {
    if (!assignedClass) {
      setActiveItem(null);
      setProgramArea(null);
      setActiveItemLoading(false);
      setActiveItemError(null);
      return;
    }

    let didCancel = false;
    setActiveItemLoading(true);
    setActiveItemError(null);

    Promise.all([
      getActiveItem(
        assignedClass.activeItemType,
        assignedClass.activeItemId,
        assignedClass.activeProgramAreaId,
      ),
      getProgramAreaById(assignedClass.activeProgramAreaId),
    ])
      .then(([nextActiveItem, nextProgramArea]) => {
        if (!didCancel) {
          setActiveItem(nextActiveItem);
          setProgramArea(nextProgramArea);
          setActiveItemLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setActiveItem(null);
          setProgramArea(null);
          setActiveItemError(
            firestoreErrorMessage(error, "Unable to load today's active class item."),
          );
          setActiveItemLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [assignedClass]);

  if (authLoading) {
    return <LoadingState label="Loading your secure studio profile..." />;
  }

  if (!userProfile) {
    return (
      <PageContainer
        eyebrow="Profile Setup"
        title="Profile is still being prepared"
        description="Your Google sign-in worked, but the class portal still needs a user profile record before Today's Mission can load."
        className="mission-board"
      >
        <section className="card mission-panel neon-border">
          <p className="muted">Refresh in a moment, or ask your teacher to check your profile.</p>
        </section>
      </PageContainer>
    );
  }

  if (!classIds.length) {
    const canJoinByCode =
      userProfile.role === 'student' &&
      userProfile.email.toLowerCase().endsWith('@student.doralacademynv.org');

    return (
      <PageContainer
        eyebrow="Daily Mission Board"
        title="No class assigned yet"
        description="Join your class with the code your teacher gave you, then Today's Mission can load."
        className="mission-board"
      >
        {canJoinByCode ? (
          <ClassJoinForm />
        ) : (
          <section className="card mission-panel neon-border no-class-panel">
            <p className="retro-label">No Class Assigned Yet</p>
            <h2>Today's Mission is waiting for a class assignment</h2>
            <p>
              Your teacher or admin needs to assign your account to a class before Today's Mission
              can load.
            </p>
            <Link className="outline-button" to="/join-class">
              Enter Class Code
            </Link>
            <Link className="outline-button" to="/areas">
              Open Program Areas
            </Link>
          </section>
        )}
      </PageContainer>
    );
  }

  return (
    <PageContainer
      eyebrow="Daily Mission Board"
      title="Today's Mission"
      description="The active class item is loaded from your Firestore class record."
      className="mission-board"
    >
      {classLoading && <LoadingState label="Loading your assigned class..." />}
      {classError && <ErrorState message={classError} />}
      {activeItemLoading && <LoadingState label="Resolving the active class item..." />}
      {activeItemError && <ErrorState message={activeItemError} />}

      {assignedClass && activeItem && (
        <StudentTodayExperience
          classRecord={assignedClass}
          activeItem={activeItem}
          programArea={programArea}
          userProfile={userProfile}
          viewerMode="student"
        />
      )}
    </PageContainer>
  );
}
