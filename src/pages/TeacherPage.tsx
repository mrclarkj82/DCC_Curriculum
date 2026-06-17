import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { getClassesForUser } from '../services/classService';
import type { ClassRecord } from '../types';

const teacherCards = [
  'Assigned Classes',
  'Active Class Item',
  'Bell ringer completion',
  'Assignment submissions',
  'Media submissions',
  'Quiz results',
  'Needs review',
  'Program area filter',
];

export function TeacherPage() {
  const { classIds, isAdmin } = useAuth();
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [classError, setClassError] = useState<string | null>(null);

  useEffect(() => {
    if (!classIds.length) {
      setClasses([]);
      return;
    }

    setIsLoadingClasses(true);
    setClassError(null);

    getClassesForUser(classIds)
      .then((classRecords) => {
        setClasses(classRecords);
        setIsLoadingClasses(false);
      })
      .catch((error: Error) => {
        setClassError(error.message || 'Unable to load assigned classes.');
        setIsLoadingClasses(false);
      });
  }, [classIds]);

  return (
    <PageContainer
      eyebrow="Teacher Placeholder"
      title="Teacher Mission Control"
      description="Phase 3 only provides dashboard placeholders. Real teacher data, grading, and review workflows arrive later."
      className="studio-cyan"
    >
      {isLoadingClasses && <LoadingState label="Loading assigned classes..." />}
      {classError && <ErrorState message={classError} />}
      {!classIds.length && !isAdmin && (
        <section className="card mission-panel neon-border no-class-panel">
          <p className="retro-label">No Assigned Classes</p>
          <h2>No assigned classes yet</h2>
          <p className="muted">
            A project admin needs to assign this teacher account to class records in Firestore.
          </p>
        </section>
      )}

      <div className="card-grid three">
        {teacherCards.map((card) => (
          <article className="card neon-card metric-card" key={card}>
            <h2>{card}</h2>
            {card === 'Assigned Classes' ? (
              <p className="muted">
                {classes.length
                  ? classes.map((classRecord) => classRecord.period).join(', ')
                  : 'No class records loaded yet.'}
              </p>
            ) : (
              <p className="muted">Future teacher workflow placeholder.</p>
            )}
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
