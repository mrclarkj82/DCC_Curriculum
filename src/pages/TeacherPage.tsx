import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import {
  getActiveItemOptions,
  resolveActiveItem,
  supportedActiveItemTypes,
  validateActiveItem,
  type ActiveItemOption,
} from '../services/activeItemService';
import { getClassesForUser } from '../services/classService';
import { subscribeToClasses, updateClassActiveItem } from '../services/classManagementService';
import { firestoreErrorMessage } from '../services/firestoreService';
import { getProgramAreas } from '../services/programAreaService';
import type { ActiveClassItem, ActiveItemType, ClassRecord, ProgramArea } from '../types';
import { canSetActiveItem } from '../types';

const activeItemTypeLabels: Record<ActiveItemType, string> = {
  lesson: 'Lesson',
  assignment: 'Assignment',
  mediaProject: 'Media Project',
  broadcastUpdate: 'Broadcast Update',
  quiz: 'Quiz',
  portfolioCheckpoint: 'Portfolio Checkpoint',
};

interface ActiveItemFormState {
  classId: string;
  activeProgramAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
}

const emptyActiveItemForm: ActiveItemFormState = {
  classId: '',
  activeProgramAreaId: '',
  activeItemType: 'lesson',
  activeItemId: '',
};

function activeFormFromClass(classRecord: ClassRecord): ActiveItemFormState {
  return {
    classId: classRecord.id,
    activeProgramAreaId: classRecord.activeProgramAreaId,
    activeItemType: classRecord.activeItemType,
    activeItemId: classRecord.activeItemId,
  };
}

export function TeacherPage() {
  const { classIds, isAdmin, userProfile } = useAuth();
  const [classRecords, setClassRecords] = useState<ClassRecord[]>([]);
  const [programAreas, setProgramAreas] = useState<ProgramArea[]>([]);
  const [activeItemsByClassId, setActiveItemsByClassId] = useState<
    Record<string, ActiveClassItem | null>
  >({});
  const [activeErrorsByClassId, setActiveErrorsByClassId] = useState<Record<string, string>>({});
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [classError, setClassError] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<ActiveItemFormState>(emptyActiveItemForm);
  const [activeOptions, setActiveOptions] = useState<ActiveItemOption[]>([]);
  const [activeOptionsLoading, setActiveOptionsLoading] = useState(false);
  const [activeOptionsError, setActiveOptionsError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let didCancel = false;

    getProgramAreas()
      .then((nextProgramAreas) => {
        if (!didCancel) {
          setProgramAreas(nextProgramAreas);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setClassError(firestoreErrorMessage(error, 'Unable to load program areas.'));
        }
      });

    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    if (!userProfile) {
      setClassRecords([]);
      setIsLoadingClasses(false);
      return undefined;
    }

    setIsLoadingClasses(true);
    setClassError(null);

    if (isAdmin) {
      return subscribeToClasses(
        (nextClasses) => {
          setClassRecords(nextClasses);
          setIsLoadingClasses(false);
        },
        (error) => {
          setClassError(firestoreErrorMessage(error, 'Unable to load classes.'));
          setClassRecords([]);
          setIsLoadingClasses(false);
        },
      );
    }

    if (!classIds.length) {
      setClassRecords([]);
      setIsLoadingClasses(false);
      return undefined;
    }

    let didCancel = false;

    getClassesForUser(classIds)
      .then((nextClasses) => {
        if (!didCancel) {
          setClassRecords(
            nextClasses.filter((classRecord) => canSetActiveItem(userProfile, classRecord)),
          );
          setIsLoadingClasses(false);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setClassError(firestoreErrorMessage(error, 'Unable to load assigned classes.'));
          setClassRecords([]);
          setIsLoadingClasses(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [classIds, isAdmin, userProfile]);

  useEffect(() => {
    if (activeForm.classId || !classRecords.length) {
      return;
    }

    setActiveForm(activeFormFromClass(classRecords[0]));
  }, [activeForm.classId, classRecords]);

  useEffect(() => {
    if (!classRecords.length) {
      setActiveItemsByClassId({});
      setActiveErrorsByClassId({});
      return undefined;
    }

    let didCancel = false;

    Promise.all(
      classRecords.map(async (classRecord) => {
        try {
          const activeItem = await resolveActiveItem(
            classRecord.activeItemType,
            classRecord.activeItemId,
            classRecord.activeProgramAreaId,
          );

          return { classId: classRecord.id, activeItem, error: null };
        } catch (error) {
          return {
            classId: classRecord.id,
            activeItem: null,
            error: firestoreErrorMessage(error, 'Unable to resolve active item.'),
          };
        }
      }),
    ).then((results) => {
      if (didCancel) {
        return;
      }

      setActiveItemsByClassId(
        Object.fromEntries(results.map((result) => [result.classId, result.activeItem])),
      );
      setActiveErrorsByClassId(
        Object.fromEntries(
          results
            .filter((result) => result.error)
            .map((result) => [result.classId, result.error as string]),
        ),
      );
    });

    return () => {
      didCancel = true;
    };
  }, [classRecords]);

  useEffect(() => {
    if (!activeForm.activeProgramAreaId || activeForm.activeItemType === 'portfolioCheckpoint') {
      setActiveOptions([]);
      setActiveOptionsLoading(false);
      setActiveOptionsError(null);
      return undefined;
    }

    let didCancel = false;
    setActiveOptionsLoading(true);
    setActiveOptionsError(null);
    setActiveOptions([]);

    getActiveItemOptions(activeForm.activeProgramAreaId, activeForm.activeItemType)
      .then((options) => {
        if (didCancel) {
          return;
        }

        setActiveOptions(options);
        setActiveOptionsLoading(false);

        if (options.length && !options.some((option) => option.id === activeForm.activeItemId)) {
          setActiveForm((current) => {
            if (
              current.activeProgramAreaId !== activeForm.activeProgramAreaId ||
              current.activeItemType !== activeForm.activeItemType
            ) {
              return current;
            }

            return { ...current, activeItemId: options[0].id };
          });
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setActiveOptions([]);
          setActiveOptionsError(
            firestoreErrorMessage(error, 'Unable to load active item options.'),
          );
          setActiveOptionsLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [activeForm.activeItemId, activeForm.activeItemType, activeForm.activeProgramAreaId]);

  const programAreaById = useMemo(
    () => new Map(programAreas.map((programArea) => [programArea.id, programArea])),
    [programAreas],
  );

  const overview = useMemo(
    () => ({
      classes: classRecords.length,
      students: classRecords.reduce(
        (totalStudents, classRecord) => totalStudents + classRecord.studentIds.length,
        0,
      ),
      activeItems: classRecords.filter((classRecord) => classRecord.activeItemId).length,
    }),
    [classRecords],
  );

  const chooseActiveClass = (classId: string) => {
    const classRecord = classRecords.find((nextClass) => nextClass.id === classId);

    if (classRecord) {
      setActiveForm(activeFormFromClass(classRecord));
    }
  };

  const handleSetActiveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setFormError(null);

    const selectedClass = classRecords.find((classRecord) => classRecord.id === activeForm.classId);

    if (!selectedClass) {
      setFormError('Choose a class before setting an active item.');
      return;
    }

    if (!canSetActiveItem(userProfile, selectedClass)) {
      setFormError('You can only set active items for classes assigned to you.');
      return;
    }

    setIsSaving(true);

    try {
      const validation = await validateActiveItem(
        activeForm.activeProgramAreaId,
        activeForm.activeItemType,
        activeForm.activeItemId,
      );

      if (!validation.isValid || !validation.item) {
        setFormError(validation.message);
        return;
      }

      await updateClassActiveItem(selectedClass.id, {
        id: validation.item.id,
        type: validation.item.type,
        programAreaId: validation.item.programAreaId,
      });

      setClassRecords((currentClasses) =>
        currentClasses.map((classRecord) =>
          classRecord.id === selectedClass.id
            ? {
                ...classRecord,
                activeProgramAreaId:
                  validation.item?.programAreaId ?? classRecord.activeProgramAreaId,
                activeItemType: validation.item?.type ?? classRecord.activeItemType,
                activeItemId: validation.item?.id ?? classRecord.activeItemId,
              }
            : classRecord,
        ),
      );
      setFormMessage('Active class item updated.');
    } catch (error) {
      setFormError(firestoreErrorMessage(error, 'Unable to update active class item.'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageContainer
      eyebrow="Teacher Control Panel"
      title="Active Class Items"
      description="View assigned classes and set the Firestore item students see on Today's Mission."
      className="studio-cyan"
    >
      {isLoadingClasses && <LoadingState label="Loading assigned classes from Firestore..." />}
      {classError && <ErrorState message={classError} />}
      {formMessage && <p className="form-message">{formMessage}</p>}
      {formError && <ErrorState message={formError} />}

      {!classRecords.length && !isLoadingClasses && (
        <EmptyState
          title={isAdmin ? 'No classes exist yet' : 'No assigned teacher classes yet'}
          message={
            isAdmin
              ? 'Create classes from the admin page before managing active items here.'
              : 'An admin needs to assign your account as a teacher on a class before this page can manage active items.'
          }
        />
      )}

      <div className="section-stack">
        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">Teacher Overview</p>
              <h2>{isAdmin ? 'All Classes' : 'Assigned Classes'}</h2>
            </div>
            <StatusBadge status={isAdmin ? 'admin' : 'teacher'} />
          </div>
          <div className="metric-grid">
            <article className="card neon-card metric-card">
              <p className="retro-label">Classes</p>
              <h3>{overview.classes}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Students</p>
              <h3>{overview.students}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Active Items</p>
              <h3>{overview.activeItems}</h3>
            </article>
          </div>
        </section>

        {!!classRecords.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Assigned Class Cards</p>
            <h2>What Students See Today</h2>
            <div className="card-grid two">
              {classRecords.map((classRecord) => {
                const activeItem = activeItemsByClassId[classRecord.id];
                const activeError = activeErrorsByClassId[classRecord.id];

                return (
                  <article className="card neon-card compact-card" key={classRecord.id}>
                    <div className="card-header">
                      <h3>
                        {classRecord.name} / {classRecord.period}
                      </h3>
                      <StatusBadge status={activeItem?.status ?? 'active'} />
                    </div>
                    <dl className="detail-list">
                      <div>
                        <dt>Program Area</dt>
                        <dd>
                          {programAreaById.get(classRecord.activeProgramAreaId)?.title ??
                            classRecord.activeProgramAreaId}
                        </dd>
                      </div>
                      <div>
                        <dt>Active Item Type</dt>
                        <dd>{activeItemTypeLabels[classRecord.activeItemType]}</dd>
                      </div>
                      <div>
                        <dt>Active Item ID</dt>
                        <dd>{classRecord.activeItemId}</dd>
                      </div>
                      <div>
                        <dt>Active Item Title</dt>
                        <dd>{activeItem?.title ?? activeError ?? 'Resolving...'}</dd>
                      </div>
                      <div>
                        <dt>Student Count</dt>
                        <dd>{classRecord.studentIds.length}</dd>
                      </div>
                    </dl>
                    <div className="button-row">
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() => chooseActiveClass(classRecord.id)}
                      >
                        Set Active
                      </button>
                      <Link className="outline-button" to="/today">
                        Open Today
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {!!classRecords.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Set Active Item</p>
            <h2>Teacher-Controlled Today Item</h2>
            <form
              className="management-form active-item-management-form"
              onSubmit={handleSetActiveItem}
            >
              <label>
                Class
                <select
                  value={activeForm.classId}
                  onChange={(event) => chooseActiveClass(event.target.value)}
                >
                  {classRecords.map((classRecord) => (
                    <option key={classRecord.id} value={classRecord.id}>
                      {classRecord.name} / {classRecord.period}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Program area
                <select
                  value={activeForm.activeProgramAreaId}
                  onChange={(event) =>
                    setActiveForm((current) => ({
                      ...current,
                      activeProgramAreaId: event.target.value,
                      activeItemId: '',
                    }))
                  }
                >
                  {programAreas.map((programArea) => (
                    <option key={programArea.id} value={programArea.id}>
                      {programArea.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Active item type
                <select
                  value={activeForm.activeItemType}
                  onChange={(event) =>
                    setActiveForm((current) => ({
                      ...current,
                      activeItemType: event.target.value as ActiveItemType,
                      activeItemId: '',
                    }))
                  }
                >
                  {supportedActiveItemTypes.map((type) => (
                    <option key={type} value={type}>
                      {activeItemTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Active item ID
                {activeForm.activeItemType === 'portfolioCheckpoint' || !activeOptions.length ? (
                  <input
                    value={activeForm.activeItemId}
                    onChange={(event) =>
                      setActiveForm((current) => ({
                        ...current,
                        activeItemId: event.target.value,
                      }))
                    }
                    placeholder="ue-q1-l01"
                  />
                ) : (
                  <select
                    value={activeForm.activeItemId}
                    disabled={activeOptionsLoading}
                    onChange={(event) =>
                      setActiveForm((current) => ({
                        ...current,
                        activeItemId: event.target.value,
                      }))
                    }
                  >
                    {activeOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title} ({option.id})
                      </option>
                    ))}
                  </select>
                )}
              </label>

              <button className="gradient-button" type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Set Active Item'}
              </button>
            </form>
            {activeOptionsLoading && <LoadingState label="Loading active item choices..." />}
            {activeOptionsError && <ErrorState message={activeOptionsError} />}
          </section>
        )}
      </div>
    </PageContainer>
  );
}
