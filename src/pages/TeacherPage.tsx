import { Fragment, FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ClassJoinCodePanel } from '../components/classes/ClassJoinCodePanel';
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
import {
  getBellRingerPrompt,
  getExitTicketPrompt,
  subscribeToResponsesForClassItem,
  type ClassItemResponses,
} from '../services/responseService';
import { getUsersByIds } from '../services/userManagementService';
import type {
  ActiveClassItem,
  ActiveItemType,
  ClassRecord,
  ProgramArea,
  ResponseCompletionSummary,
  UserProfile,
} from '../types';
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

const emptyResponses: ClassItemResponses = {
  bellRingerResponses: [],
  exitTicketResponses: [],
};

function formatTimestamp(value: unknown): string {
  if (!value) {
    return 'Not submitted';
  }

  if (typeof value === 'string') {
    return value || 'Not submitted';
  }

  if (typeof value === 'number') {
    return new Date(value).toLocaleString();
  }

  const timestamp = value as { seconds?: number; toDate?: () => Date };

  if (typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toLocaleString();
  }

  if (typeof timestamp.seconds === 'number') {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }

  return 'Submitted';
}

function buildCompletionSummaries(
  classRecord: ClassRecord,
  students: UserProfile[],
  responses: ClassItemResponses,
): ResponseCompletionSummary[] {
  const studentsByUid = new Map(students.map((student) => [student.uid, student]));
  const bellRingersByUid = new Map(
    responses.bellRingerResponses.map((response) => [response.uid, response]),
  );
  const exitTicketsByUid = new Map(
    responses.exitTicketResponses.map((response) => [response.uid, response]),
  );

  return classRecord.studentIds.map((uid) => {
    const student = studentsByUid.get(uid);
    const bellRingerResponse = bellRingersByUid.get(uid);
    const exitTicketResponse = exitTicketsByUid.get(uid);

    return {
      uid,
      studentName:
        student?.displayName || bellRingerResponse?.studentName || exitTicketResponse?.studentName || uid,
      studentEmail:
        student?.email || bellRingerResponse?.studentEmail || exitTicketResponse?.studentEmail || '',
      bellRingerComplete: Boolean(bellRingerResponse?.response.trim()),
      exitTicketComplete: Boolean(exitTicketResponse?.response.trim()),
      bellRingerUpdatedAt: bellRingerResponse?.updatedAt,
      exitTicketUpdatedAt: exitTicketResponse?.updatedAt,
      bellRingerResponse,
      exitTicketResponse,
    };
  });
}

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
  const [studentsByClassId, setStudentsByClassId] = useState<Record<string, UserProfile[]>>({});
  const [responsesByClassId, setResponsesByClassId] = useState<
    Record<string, ClassItemResponses>
  >({});
  const [activeErrorsByClassId, setActiveErrorsByClassId] = useState<Record<string, string>>({});
  const [responseErrorsByClassId, setResponseErrorsByClassId] = useState<Record<string, string>>(
    {},
  );
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);
  const [classError, setClassError] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<ActiveItemFormState>(emptyActiveItemForm);
  const [activeOptions, setActiveOptions] = useState<ActiveItemOption[]>([]);
  const [activeOptionsLoading, setActiveOptionsLoading] = useState(false);
  const [activeOptionsError, setActiveOptionsError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedResponseKey, setExpandedResponseKey] = useState<string | null>(null);

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
    if (!classRecords.length) {
      setStudentsByClassId({});
      return;
    }

    let didCancel = false;

    Promise.all(
      classRecords.map(async (classRecord) => {
        try {
          const students = await getUsersByIds(classRecord.studentIds);
          return [classRecord.id, students] as const;
        } catch {
          return [classRecord.id, []] as const;
        }
      }),
    ).then((entries) => {
      if (!didCancel) {
        setStudentsByClassId(Object.fromEntries(entries));
      }
    });

    return () => {
      didCancel = true;
    };
  }, [classRecords]);

  useEffect(() => {
    if (!classRecords.length) {
      setResponsesByClassId({});
      setResponseErrorsByClassId({});
      return undefined;
    }

    const unsubscribes = classRecords.map((classRecord) =>
      subscribeToResponsesForClassItem(
        classRecord.id,
        classRecord.activeItemId,
        (responses) => {
          setResponsesByClassId((current) => ({
            ...current,
            [classRecord.id]: responses,
          }));
          setResponseErrorsByClassId((current) => {
            const next = { ...current };
            delete next[classRecord.id];
            return next;
          });
        },
        (error) => {
          setResponseErrorsByClassId((current) => ({
            ...current,
            [classRecord.id]: firestoreErrorMessage(
              error,
              'Unable to load response completion data.',
            ),
          }));
        },
      ),
    );

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
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

  const completionSummariesByClassId = useMemo(
    () =>
      Object.fromEntries(
        classRecords.map((classRecord) => [
          classRecord.id,
          buildCompletionSummaries(
            classRecord,
            studentsByClassId[classRecord.id] ?? [],
            responsesByClassId[classRecord.id] ?? emptyResponses,
          ),
        ]),
      ),
    [classRecords, responsesByClassId, studentsByClassId],
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
                    <ClassJoinCodePanel classRecord={classRecord} compact />
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {!!classRecords.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Daily Response Completion</p>
            <h2>Bell Ringers And Exit Tickets</h2>
            <div className="response-completion-stack">
              {classRecords.map((classRecord) => {
                const activeItem = activeItemsByClassId[classRecord.id];
                const responseError = responseErrorsByClassId[classRecord.id];
                const summaries = completionSummariesByClassId[classRecord.id] ?? [];
                const bellRingerPrompt = getBellRingerPrompt(activeItem);
                const exitTicketPrompt = getExitTicketPrompt(activeItem);
                const bellRingerComplete = summaries.filter(
                  (summary) => summary.bellRingerComplete,
                ).length;
                const exitTicketComplete = summaries.filter(
                  (summary) => summary.exitTicketComplete,
                ).length;

                return (
                  <article className="card neon-card response-completion-card" key={classRecord.id}>
                    <div className="section-heading-row">
                      <div>
                        <p className="retro-label">
                          {classRecord.name} / {classRecord.period}
                        </p>
                        <h3>{activeItem?.title ?? classRecord.activeItemId}</h3>
                      </div>
                      <StatusBadge status={`${classRecord.studentIds.length} students`} />
                    </div>

                    <dl className="detail-list response-summary-list">
                      <div>
                        <dt>Active Item</dt>
                        <dd>
                          {activeItemTypeLabels[classRecord.activeItemType]} /{' '}
                          {classRecord.activeItemId}
                        </dd>
                      </div>
                      <div>
                        <dt>Bell Ringer Completion</dt>
                        <dd>
                          {bellRingerPrompt
                            ? `${bellRingerComplete}/${classRecord.studentIds.length}`
                            : 'No prompt attached'}
                        </dd>
                      </div>
                      <div>
                        <dt>Exit Ticket Completion</dt>
                        <dd>
                          {exitTicketPrompt
                            ? `${exitTicketComplete}/${classRecord.studentIds.length}`
                            : 'No prompt attached'}
                        </dd>
                      </div>
                    </dl>

                    {responseError && <ErrorState message={responseError} />}

                    {!classRecord.studentIds.length ? (
                      <p className="muted">No students are assigned to this class yet.</p>
                    ) : (
                      <div className="table-scroll">
                        <table className="management-table response-table">
                          <thead>
                            <tr>
                              <th scope="col">Student</th>
                              <th scope="col">Bell Ringer</th>
                              <th scope="col">Bell Updated</th>
                              <th scope="col">Exit Ticket</th>
                              <th scope="col">Exit Updated</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {summaries.map((summary) => {
                              const responseKey = `${classRecord.id}-${summary.uid}`;
                              const isExpanded = expandedResponseKey === responseKey;
                              const bellRingerStatus = !bellRingerPrompt
                                ? 'no prompt'
                                : summary.bellRingerComplete
                                  ? 'submitted'
                                  : 'pending';
                              const exitTicketStatus = !exitTicketPrompt
                                ? 'no prompt'
                                : summary.exitTicketComplete
                                  ? 'submitted'
                                  : 'pending';

                              return (
                                <Fragment key={responseKey}>
                                  <tr>
                                    <td>
                                      <strong>{summary.studentName}</strong>
                                      {summary.studentEmail && (
                                        <p className="meta-line">{summary.studentEmail}</p>
                                      )}
                                    </td>
                                    <td>
                                      <StatusBadge status={bellRingerStatus} />
                                    </td>
                                    <td>{formatTimestamp(summary.bellRingerUpdatedAt)}</td>
                                    <td>
                                      <StatusBadge status={exitTicketStatus} />
                                    </td>
                                    <td>{formatTimestamp(summary.exitTicketUpdatedAt)}</td>
                                    <td>
                                      <button
                                        className="outline-button"
                                        type="button"
                                        aria-expanded={isExpanded}
                                        onClick={() =>
                                          setExpandedResponseKey(isExpanded ? null : responseKey)
                                        }
                                      >
                                        {isExpanded ? 'Hide Responses' : 'View Responses'}
                                      </button>
                                    </td>
                                  </tr>
                                  {isExpanded && (
                                    <tr className="response-detail-row">
                                      <td colSpan={6}>
                                        <div className="response-detail-grid">
                                          <section>
                                            <p className="retro-label">Bell Ringer</p>
                                            <p className="muted">
                                              {summary.bellRingerResponse?.prompt ||
                                                bellRingerPrompt ||
                                                'No prompt attached.'}
                                            </p>
                                            <p>
                                              {summary.bellRingerResponse?.response ||
                                                'No bell ringer response submitted yet.'}
                                            </p>
                                          </section>
                                          <section>
                                            <p className="retro-label">Exit Ticket</p>
                                            <p className="muted">
                                              {summary.exitTicketResponse?.prompt ||
                                                exitTicketPrompt ||
                                                'No prompt attached.'}
                                            </p>
                                            <p>
                                              {summary.exitTicketResponse?.response ||
                                                'No exit ticket response submitted yet.'}
                                            </p>
                                          </section>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
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
