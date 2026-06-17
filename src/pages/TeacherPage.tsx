import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { getActiveItem } from '../services/activeItemService';
import { getClassesForUser, updateActiveClassItem } from '../services/classService';
import { firestoreErrorMessage } from '../services/firestoreService';
import type { ActiveClassItem, ActiveItemType, ClassRecord } from '../types';

const activeItemTypes: ActiveItemType[] = [
  'lesson',
  'assignment',
  'mediaProject',
  'broadcastUpdate',
  'quiz',
  'portfolioCheckpoint',
];

interface ClassActiveView {
  classRecord: ClassRecord;
  activeItem: ActiveClassItem | null;
  error: string | null;
}

export function TeacherPage() {
  const { classIds, isAdmin } = useAuth();
  const [classViews, setClassViews] = useState<ClassActiveView[]>([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [classError, setClassError] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [activeItemType, setActiveItemType] = useState<ActiveItemType>('lesson');
  const [activeItemId, setActiveItemId] = useState('');
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!classIds.length) {
      setClassViews([]);
      setSelectedClassId('');
      return;
    }

    let didCancel = false;
    setIsLoadingClasses(true);
    setClassError(null);

    getClassesForUser(classIds)
      .then(async (classRecords) => {
        const nextViews = await Promise.all(
          classRecords.map(async (classRecord) => {
            try {
              const activeItem = await getActiveItem(
                classRecord.activeItemType,
                classRecord.activeItemId,
                classRecord.activeProgramAreaId,
              );

              return { classRecord, activeItem, error: null };
            } catch (error) {
              return {
                classRecord,
                activeItem: null,
                error: firestoreErrorMessage(error, 'Unable to resolve active item.'),
              };
            }
          }),
        );

        if (!didCancel) {
          setClassViews(nextViews);
          setSelectedClassId((current) => current || nextViews[0]?.classRecord.id || '');
          setIsLoadingClasses(false);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setClassError(firestoreErrorMessage(error, 'Unable to load assigned classes.'));
          setIsLoadingClasses(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [classIds]);

  const selectedClass = classViews.find((view) => view.classRecord.id === selectedClassId)
    ?.classRecord;

  const handleSetActiveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setFormError(null);

    if (!selectedClass) {
      setFormError('Choose a class before setting an active item.');
      return;
    }

    if (!activeItemTypes.includes(activeItemType)) {
      setFormError('Choose a supported active item type.');
      return;
    }

    if (!activeItemId.trim()) {
      setFormError('Enter an active item ID.');
      return;
    }

    setIsSaving(true);

    try {
      const resolvedItem = await getActiveItem(
        activeItemType,
        activeItemId.trim(),
        selectedClass.activeProgramAreaId,
      );

      if (activeItemType !== 'portfolioCheckpoint' && !resolvedItem.record) {
        setFormError('That active item ID does not exist in Firestore yet.');
        setIsSaving(false);
        return;
      }

      await updateActiveClassItem(selectedClass.id, {
        id: activeItemId.trim(),
        type: activeItemType,
        programAreaId: resolvedItem.programAreaId || selectedClass.activeProgramAreaId,
      });

      setClassViews((currentViews) =>
        currentViews.map((view) =>
          view.classRecord.id === selectedClass.id
            ? {
                classRecord: {
                  ...view.classRecord,
                  activeProgramAreaId: resolvedItem.programAreaId || selectedClass.activeProgramAreaId,
                  activeItemType,
                  activeItemId: activeItemId.trim(),
                },
                activeItem: resolvedItem,
                error: null,
              }
            : view,
        ),
      );
      setFormMessage('Active class item updated.');
      setIsSaving(false);
    } catch (error) {
      setFormError(firestoreErrorMessage(error, 'Unable to update active class item.'));
      setIsSaving(false);
    }
  };

  return (
    <PageContainer
      eyebrow="Teacher Dashboard"
      title="Teacher Studio Board"
      description="Assigned classes and active class items are loaded from Firestore."
      className="studio-cyan"
    >
      {isLoadingClasses && <LoadingState label="Loading assigned classes from Firestore..." />}
      {classError && <ErrorState message={classError} />}
      {!classIds.length && (
        <EmptyState
          title={isAdmin ? 'No assigned admin classes yet' : 'No assigned classes yet'}
          message="Class IDs must be added to your user profile before this dashboard can show assigned class records."
        />
      )}

      <div className="section-stack">
        <section className="content-section neon-section">
          <p className="retro-label">Assigned Classes</p>
          <h2>Active Class Items</h2>
          <div className="card-grid two">
            {classViews.map(({ classRecord, activeItem, error }) => (
              <article className="card neon-card compact-card" key={classRecord.id}>
                <div className="card-header">
                  <h3>
                    {classRecord.name} / {classRecord.period}
                  </h3>
                  <StatusBadge status={activeItem?.status ?? 'active'} />
                </div>
                <dl className="detail-list">
                  <div>
                    <dt>Program Area ID</dt>
                    <dd>{classRecord.activeProgramAreaId}</dd>
                  </div>
                  <div>
                    <dt>Active Item Type</dt>
                    <dd>{classRecord.activeItemType}</dd>
                  </div>
                  <div>
                    <dt>Active Item ID</dt>
                    <dd>{classRecord.activeItemId}</dd>
                  </div>
                  <div>
                    <dt>Resolved Title</dt>
                    <dd>{activeItem?.title ?? error ?? 'Not resolved yet'}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {!!classViews.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Optional Phase 5 Control</p>
            <h2>Set Active Item</h2>
            <form className="class-active-form" onSubmit={handleSetActiveItem}>
              <label>
                Class
                <select
                  value={selectedClassId}
                  onChange={(event) => setSelectedClassId(event.target.value)}
                >
                  {classViews.map(({ classRecord }) => (
                    <option key={classRecord.id} value={classRecord.id}>
                      {classRecord.name} / {classRecord.period}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Active item type
                <select
                  value={activeItemType}
                  onChange={(event) => setActiveItemType(event.target.value as ActiveItemType)}
                >
                  {activeItemTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Active item ID
                <input
                  value={activeItemId}
                  onChange={(event) => setActiveItemId(event.target.value)}
                  placeholder="ue-q1-l01"
                />
              </label>

              <button className="gradient-button" type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Set Active Item'}
              </button>
            </form>
            {formMessage && <p className="form-message">{formMessage}</p>}
            {formError && <ErrorState message={formError} />}
          </section>
        )}
      </div>
    </PageContainer>
  );
}
