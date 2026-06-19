import { FormEvent, useEffect, useMemo, useState } from 'react';
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
import {
  assignStudentToClass,
  assignTeacherToClass,
  createClass,
  removeStudentFromClass,
  removeTeacherFromClass,
  subscribeToClasses,
  updateClassActiveItem,
  updateClassBasicInfo,
} from '../services/classManagementService';
import { firestoreErrorMessage } from '../services/firestoreService';
import { getProgramAreas } from '../services/programAreaService';
import { subscribeToUsers, updateUserRole } from '../services/userManagementService';
import type {
  ActiveItemType,
  ClassMembershipType,
  ClassRecord,
  ProgramArea,
  UserProfile,
  UserRole,
} from '../types';

const safeClassIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

interface CreateClassFormState {
  id: string;
  name: string;
  period: string;
  schoolYear: string;
}

const emptyActiveItemForm: ActiveItemFormState = {
  classId: '',
  activeProgramAreaId: '',
  activeItemType: 'lesson',
  activeItemId: '',
};

const defaultCreateClassForm: CreateClassFormState = {
  id: '',
  name: '',
  period: '',
  schoolYear: '2026-2027',
};

function formatTimestamp(value: unknown): string {
  if (!value) {
    return 'Never';
  }

  if (typeof value === 'string') {
    return value || 'Never';
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

  return 'Recorded';
}

function classSummary(classIds: string[]): string {
  return classIds.length ? classIds.join(', ') : 'No classes';
}

function activeFormFromClass(classRecord: ClassRecord): ActiveItemFormState {
  return {
    classId: classRecord.id,
    activeProgramAreaId: classRecord.activeProgramAreaId,
    activeItemType: classRecord.activeItemType,
    activeItemId: classRecord.activeItemId,
  };
}

export function AdminPage() {
  const { userProfile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [programAreas, setProgramAreas] = useState<ProgramArea[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [classesLoading, setClassesLoading] = useState(true);
  const [programAreasLoading, setProgramAreasLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [operationMessage, setOperationMessage] = useState<string | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [selectedClassByUser, setSelectedClassByUser] = useState<Record<string, string>>({});
  const [classEdits, setClassEdits] = useState<
    Record<string, Pick<ClassRecord, 'name' | 'period'>>
  >({});
  const [createClassForm, setCreateClassForm] =
    useState<CreateClassFormState>(defaultCreateClassForm);
  const [activeForm, setActiveForm] = useState<ActiveItemFormState>(emptyActiveItemForm);
  const [activeOptions, setActiveOptions] = useState<ActiveItemOption[]>([]);
  const [activeOptionsLoading, setActiveOptionsLoading] = useState(false);
  const [activeOptionsError, setActiveOptionsError] = useState<string | null>(null);
  const [activeTitlesByClassId, setActiveTitlesByClassId] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    setUsersLoading(true);

    return subscribeToUsers(
      (nextUsers) => {
        setUsers(nextUsers);
        setUsersLoading(false);
      },
      (error) => {
        setLoadError(firestoreErrorMessage(error, 'Unable to load users.'));
        setUsersLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    setClassesLoading(true);

    return subscribeToClasses(
      (nextClasses) => {
        setClasses(nextClasses);
        setClassesLoading(false);
      },
      (error) => {
        setLoadError(firestoreErrorMessage(error, 'Unable to load classes.'));
        setClassesLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    let didCancel = false;
    setProgramAreasLoading(true);

    getProgramAreas()
      .then((nextAreas) => {
        if (!didCancel) {
          setProgramAreas(nextAreas);
          setProgramAreasLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setLoadError(firestoreErrorMessage(error, 'Unable to load program areas.'));
          setProgramAreasLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    if (activeForm.classId || !classes.length) {
      return;
    }

    setActiveForm(activeFormFromClass(classes[0]));
  }, [activeForm.classId, classes]);

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

  useEffect(() => {
    if (!classes.length) {
      setActiveTitlesByClassId({});
      return undefined;
    }

    let didCancel = false;

    Promise.all(
      classes.map(async (classRecord) => {
        try {
          const activeItem = await resolveActiveItem(
            classRecord.activeItemType,
            classRecord.activeItemId,
            classRecord.activeProgramAreaId,
          );

          return [classRecord.id, activeItem.title ?? 'Not resolved'] as const;
        } catch {
          return [classRecord.id, 'Unable to resolve'] as const;
        }
      }),
    ).then((entries) => {
      if (!didCancel) {
        setActiveTitlesByClassId(Object.fromEntries(entries));
      }
    });

    return () => {
      didCancel = true;
    };
  }, [classes]);

  const isLoading = usersLoading || classesLoading || programAreasLoading;

  const programAreaById = useMemo(
    () => new Map(programAreas.map((programArea) => [programArea.id, programArea])),
    [programAreas],
  );

  const overview = useMemo(() => {
    const schoolYears = Array.from(
      new Set(classes.map((classRecord) => classRecord.schoolYear).filter(Boolean)),
    );

    return {
      totalUsers: users.length,
      students: users.filter((user) => user.role === 'student').length,
      teachers: users.filter((user) => user.role === 'teacher').length,
      admins: users.filter((user) => user.role === 'admin').length,
      classes: classes.length,
      schoolYear: schoolYears.join(', ') || 'Not set',
    };
  }, [classes, users]);

  const setMessage = (message: string) => {
    setOperationMessage(message);
    setOperationError(null);
  };

  const setError = (message: string) => {
    setOperationError(message);
    setOperationMessage(null);
  };

  const handleRoleChange = async (targetUser: UserProfile, role: UserRole) => {
    if (targetUser.uid === userProfile?.uid && role !== 'admin') {
      setError('Self-demotion is blocked here so the current admin does not lose access.');
      return;
    }

    setSavingKey(`role-${targetUser.uid}`);

    try {
      await updateUserRole(targetUser.uid, role);
      setMessage(`Updated ${targetUser.displayName || targetUser.email} to ${role}.`);
    } catch (error) {
      setError(firestoreErrorMessage(error, 'Unable to update role.'));
    } finally {
      setSavingKey(null);
    }
  };

  const handleMembershipAction = async (
    targetUser: UserProfile,
    classId: string,
    membershipType: ClassMembershipType,
    action: 'assign' | 'remove',
  ) => {
    if (!classId) {
      setError('Choose a class before updating membership.');
      return;
    }

    const actionKey = `${action}-${membershipType}-${targetUser.uid}-${classId}`;
    setSavingKey(actionKey);

    try {
      if (membershipType === 'student' && action === 'assign') {
        await assignStudentToClass(targetUser.uid, classId);
      }

      if (membershipType === 'student' && action === 'remove') {
        await removeStudentFromClass(targetUser.uid, classId);
      }

      if (membershipType === 'teacher' && action === 'assign') {
        await assignTeacherToClass(targetUser.uid, classId);
      }

      if (membershipType === 'teacher' && action === 'remove') {
        await removeTeacherFromClass(targetUser.uid, classId);
      }

      setMessage(
        `${action === 'assign' ? 'Assigned' : 'Removed'} ${
          targetUser.displayName || targetUser.email
        } ${action === 'assign' ? 'to' : 'from'} ${classId} as ${membershipType}.`,
      );
    } catch (error) {
      setError(firestoreErrorMessage(error, 'Unable to update class membership.'));
    } finally {
      setSavingKey(null);
    }
  };

  const handleClassEdit = async (classRecord: ClassRecord) => {
    const edit = classEdits[classRecord.id] ?? {
      name: classRecord.name,
      period: classRecord.period,
    };
    const name = edit.name.trim();
    const period = edit.period.trim();

    if (!name || !period) {
      setError('Class name and period cannot be empty.');
      return;
    }

    setSavingKey(`class-${classRecord.id}`);

    try {
      await updateClassBasicInfo(classRecord.id, { name, period });
      setClassEdits((current) => {
        const next = { ...current };
        delete next[classRecord.id];
        return next;
      });
      setMessage(`Updated ${classRecord.id}.`);
    } catch (error) {
      setError(firestoreErrorMessage(error, 'Unable to update class.'));
    } finally {
      setSavingKey(null);
    }
  };

  const handleCreateClass = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const classId = createClassForm.id.trim();
    const name = createClassForm.name.trim();
    const period = createClassForm.period.trim();
    const schoolYear = createClassForm.schoolYear.trim();

    if (!classId || !safeClassIdPattern.test(classId)) {
      setError('Class ID must be lowercase kebab style, like dcc-a1.');
      return;
    }

    if (classes.some((classRecord) => classRecord.id === classId)) {
      setError(`Class ${classId} already exists.`);
      return;
    }

    if (!name || !period || !schoolYear) {
      setError('Class ID, name, period, and school year are required.');
      return;
    }

    setSavingKey('create-class');

    try {
      await createClass({
        id: classId,
        name,
        period,
        schoolYear,
        activeProgramAreaId: programAreas[0]?.id ?? 'unreal-engine',
        activeItemType: 'lesson',
        activeItemId: 'ue-q1-l01',
      });
      setCreateClassForm(defaultCreateClassForm);
      setMessage(`Created class ${classId}.`);
    } catch (error) {
      setError(firestoreErrorMessage(error, 'Unable to create class.'));
    } finally {
      setSavingKey(null);
    }
  };

  const handleActiveItemSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeForm.classId) {
      setError('Choose a class before setting an active item.');
      return;
    }

    setSavingKey('active-item');

    try {
      const validation = await validateActiveItem(
        activeForm.activeProgramAreaId,
        activeForm.activeItemType,
        activeForm.activeItemId,
      );

      if (!validation.isValid || !validation.item) {
        setError(validation.message);
        return;
      }

      await updateClassActiveItem(activeForm.classId, {
        id: validation.item.id,
        type: validation.item.type,
        programAreaId: validation.item.programAreaId,
      });
      setActiveForm((current) => ({
        ...current,
        activeItemId: validation.item?.id ?? current.activeItemId,
      }));
      setMessage('Active item updated for the selected class.');
    } catch (error) {
      setError(firestoreErrorMessage(error, 'Unable to update active item.'));
    } finally {
      setSavingKey(null);
    }
  };

  const chooseActiveClass = (classId: string) => {
    const classRecord = classes.find((nextClass) => nextClass.id === classId);

    if (classRecord) {
      setActiveForm(activeFormFromClass(classRecord));
    }
  };

  return (
    <PageContainer
      eyebrow="Admin Control Center"
      title="Classroom Management"
      description="Manage DCC Creative Studio roles, rosters, classes, and the active Today item from Firestore-backed controls."
      className="studio-pink"
    >
      {isLoading && <LoadingState label="Loading admin management data..." />}
      {loadError && <ErrorState message={loadError} />}
      {operationMessage && <p className="form-message">{operationMessage}</p>}
      {operationError && <ErrorState message={operationError} />}

      <div className="section-stack">
        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">Admin Overview</p>
              <h2>Studio Roster Snapshot</h2>
            </div>
            <StatusBadge status="admin" />
          </div>

          <div className="metric-grid">
            <article className="card neon-card metric-card">
              <p className="retro-label">Users</p>
              <h3>{overview.totalUsers}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Students</p>
              <h3>{overview.students}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Teachers</p>
              <h3>{overview.teachers}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Admins</p>
              <h3>{overview.admins}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Classes</p>
              <h3>{overview.classes}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">School Year</p>
              <h3>{overview.schoolYear}</h3>
            </article>
          </div>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Bootstrap Reminder</p>
          <h2>First Admin Setup</h2>
          <p className="muted">
            The first admin must still be manually promoted in Firebase Console after their first
            Google sign-in. After that, this page can manage roles and class assignments. There is
            no self-promotion button in the client.
          </p>
          <p className="muted">
            Your own role selector is guarded so you do not accidentally demote yourself and lose
            access to this page.
          </p>
        </section>

        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">User Management</p>
              <h2>Roles And Class Membership</h2>
            </div>
            <StatusBadge status={`${users.length} users`} />
          </div>

          {!users.length && !usersLoading ? (
            <EmptyState
              title="No signed-in users yet"
              message="Users appear here after they sign in with an approved Google account."
            />
          ) : (
            <div className="table-scroll">
              <table className="management-table">
                <thead>
                  <tr>
                    <th scope="col">Display Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Class IDs</th>
                    <th scope="col">Last Login</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((targetUser) => {
                    const selectedClassId =
                      selectedClassByUser[targetUser.uid] ?? classes[0]?.id ?? '';
                    const selectedClass = classes.find(
                      (classRecord) => classRecord.id === selectedClassId,
                    );
                    const isSelf = targetUser.uid === userProfile?.uid;
                    const isSelectedStudent = Boolean(
                      selectedClass?.studentIds.includes(targetUser.uid),
                    );
                    const isSelectedTeacher = Boolean(
                      selectedClass?.teacherIds.includes(targetUser.uid),
                    );

                    return (
                      <tr key={targetUser.uid}>
                        <td>{targetUser.displayName || 'Unnamed user'}</td>
                        <td>{targetUser.email}</td>
                        <td>
                          <div className="stacked-cell">
                            <StatusBadge status={targetUser.role} />
                            <label className="sr-only" htmlFor={`role-${targetUser.uid}`}>
                              Role for {targetUser.displayName || targetUser.email}
                            </label>
                            <select
                              id={`role-${targetUser.uid}`}
                              value={targetUser.role}
                              disabled={isSelf || savingKey === `role-${targetUser.uid}`}
                              onChange={(event) =>
                                handleRoleChange(targetUser, event.target.value as UserRole)
                              }
                              title={isSelf ? 'Self-demotion is blocked for safety.' : undefined}
                            >
                              <option value="student">student</option>
                              <option value="teacher">teacher</option>
                              <option value="admin">admin</option>
                            </select>
                          </div>
                        </td>
                        <td>{classSummary(targetUser.classIds)}</td>
                        <td>{formatTimestamp(targetUser.lastLoginAt)}</td>
                        <td>
                          <div className="action-cluster">
                            <label>
                              Class
                              <select
                                value={selectedClassId}
                                disabled={!classes.length}
                                onChange={(event) =>
                                  setSelectedClassByUser((current) => ({
                                    ...current,
                                    [targetUser.uid]: event.target.value,
                                  }))
                                }
                              >
                                {classes.map((classRecord) => (
                                  <option key={classRecord.id} value={classRecord.id}>
                                    {classRecord.name} / {classRecord.period}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <div className="button-row">
                              <button
                                className="secondary-button"
                                type="button"
                                disabled={!selectedClassId || isSelectedStudent}
                                onClick={() =>
                                  handleMembershipAction(
                                    targetUser,
                                    selectedClassId,
                                    'student',
                                    'assign',
                                  )
                                }
                              >
                                Assign Student
                              </button>
                              <button
                                className="outline-button"
                                type="button"
                                disabled={!selectedClassId || !isSelectedStudent}
                                onClick={() =>
                                  handleMembershipAction(
                                    targetUser,
                                    selectedClassId,
                                    'student',
                                    'remove',
                                  )
                                }
                              >
                                Remove Student
                              </button>
                              <button
                                className="secondary-button"
                                type="button"
                                disabled={!selectedClassId || isSelectedTeacher}
                                onClick={() =>
                                  handleMembershipAction(
                                    targetUser,
                                    selectedClassId,
                                    'teacher',
                                    'assign',
                                  )
                                }
                              >
                                Assign Teacher
                              </button>
                              <button
                                className="outline-button"
                                type="button"
                                disabled={!selectedClassId || !isSelectedTeacher}
                                onClick={() =>
                                  handleMembershipAction(
                                    targetUser,
                                    selectedClassId,
                                    'teacher',
                                    'remove',
                                  )
                                }
                              >
                                Remove Teacher
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">Class Management</p>
              <h2>Class Records</h2>
            </div>
            <StatusBadge status={`${classes.length} classes`} />
          </div>

          {!classes.length && !classesLoading ? (
            <EmptyState
              title="No class records yet"
              message="Create a starter class below before assigning teachers or students."
            />
          ) : (
            <div className="table-scroll">
              <table className="management-table">
                <thead>
                  <tr>
                    <th scope="col">Class Name</th>
                    <th scope="col">Period</th>
                    <th scope="col">Teachers</th>
                    <th scope="col">Students</th>
                    <th scope="col">Active Program</th>
                    <th scope="col">Active Type</th>
                    <th scope="col">Active ID</th>
                    <th scope="col">Active Title</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classRecord) => {
                    const edit = classEdits[classRecord.id] ?? {
                      name: classRecord.name,
                      period: classRecord.period,
                    };

                    return (
                      <tr key={classRecord.id}>
                        <td>
                          <label className="sr-only" htmlFor={`class-name-${classRecord.id}`}>
                            Class name for {classRecord.id}
                          </label>
                          <input
                            id={`class-name-${classRecord.id}`}
                            value={edit.name}
                            onChange={(event) =>
                              setClassEdits((current) => ({
                                ...current,
                                [classRecord.id]: {
                                  name: event.target.value,
                                  period: edit.period,
                                },
                              }))
                            }
                          />
                        </td>
                        <td>
                          <label className="sr-only" htmlFor={`class-period-${classRecord.id}`}>
                            Period for {classRecord.id}
                          </label>
                          <input
                            id={`class-period-${classRecord.id}`}
                            value={edit.period}
                            onChange={(event) =>
                              setClassEdits((current) => ({
                                ...current,
                                [classRecord.id]: {
                                  name: edit.name,
                                  period: event.target.value,
                                },
                              }))
                            }
                          />
                        </td>
                        <td>{classRecord.teacherIds.length}</td>
                        <td>{classRecord.studentIds.length}</td>
                        <td>
                          {programAreaById.get(classRecord.activeProgramAreaId)?.shortTitle ??
                            classRecord.activeProgramAreaId}
                        </td>
                        <td>{activeItemTypeLabels[classRecord.activeItemType]}</td>
                        <td>{classRecord.activeItemId}</td>
                        <td>{activeTitlesByClassId[classRecord.id] ?? 'Resolving...'}</td>
                        <td>
                          <div className="button-row vertical">
                            <button
                              className="secondary-button"
                              type="button"
                              disabled={savingKey === `class-${classRecord.id}`}
                              onClick={() => handleClassEdit(classRecord)}
                            >
                              Save Class
                            </button>
                            <button
                              className="outline-button"
                              type="button"
                              onClick={() => chooseActiveClass(classRecord.id)}
                            >
                              Set Active
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Create Class</p>
          <h2>New Class Record</h2>
          <form className="management-form" onSubmit={handleCreateClass}>
            <label>
              Class ID
              <input
                value={createClassForm.id}
                onChange={(event) =>
                  setCreateClassForm((current) => ({ ...current, id: event.target.value }))
                }
                placeholder="dcc-a1"
              />
            </label>
            <label>
              Name
              <input
                value={createClassForm.name}
                onChange={(event) =>
                  setCreateClassForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Digital Content Creators A1"
              />
            </label>
            <label>
              Period
              <input
                value={createClassForm.period}
                onChange={(event) =>
                  setCreateClassForm((current) => ({ ...current, period: event.target.value }))
                }
                placeholder="A1"
              />
            </label>
            <label>
              School Year
              <input
                value={createClassForm.schoolYear}
                onChange={(event) =>
                  setCreateClassForm((current) => ({ ...current, schoolYear: event.target.value }))
                }
                placeholder="2026-2027"
              />
            </label>
            <button
              className="gradient-button"
              type="submit"
              disabled={savingKey === 'create-class'}
            >
              {savingKey === 'create-class' ? 'Creating...' : 'Create Class'}
            </button>
          </form>
        </section>

        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">Class Join Codes</p>
              <h2>Student Enrollment Codes</h2>
            </div>
            <StatusBadge status="admin" />
          </div>
          <p className="muted">
            Admins can manage join codes for every class. Students cannot read these code records
            directly; they join through the secure callable function.
          </p>
          <div className="card-grid two">
            {classes.map((classRecord) => (
              <article className="card neon-card compact-card" key={classRecord.id}>
                <h3>
                  {classRecord.name} / {classRecord.period}
                </h3>
                <ClassJoinCodePanel classRecord={classRecord} compact />
              </article>
            ))}
          </div>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Active Item Control</p>
          <h2>Set What A Class Sees On Today</h2>
          <form
            className="management-form active-item-management-form"
            onSubmit={handleActiveItemSubmit}
          >
            <label>
              Class
              <select
                value={activeForm.classId}
                onChange={(event) => chooseActiveClass(event.target.value)}
              >
                {classes.map((classRecord) => (
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
                    setActiveForm((current) => ({ ...current, activeItemId: event.target.value }))
                  }
                  placeholder="ue-q1-l01"
                />
              ) : (
                <select
                  value={activeForm.activeItemId}
                  disabled={activeOptionsLoading}
                  onChange={(event) =>
                    setActiveForm((current) => ({ ...current, activeItemId: event.target.value }))
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
            <button
              className="gradient-button"
              type="submit"
              disabled={!classes.length || savingKey === 'active-item'}
            >
              {savingKey === 'active-item' ? 'Saving...' : 'Set Active Item'}
            </button>
          </form>
          {activeOptionsLoading && <LoadingState label="Loading active item choices..." />}
          {activeOptionsError && <ErrorState message={activeOptionsError} />}
        </section>
      </div>
    </PageContainer>
  );
}
