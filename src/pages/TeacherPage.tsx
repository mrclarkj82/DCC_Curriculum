import { Fragment, FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ClassJoinCodePanel } from '../components/classes/ClassJoinCodePanel';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import { SubmissionStatusBadge } from '../components/submissions/SubmissionStatusBadge';
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
import {
  getQuizAttemptDetail,
  getQuizzes,
  subscribeToQuizAttemptsForClass,
} from '../services/quizService';
import {
  resolveSubmissionTargetForActiveItem,
  subscribeToSubmissionsForClassTarget,
  updateSubmissionReviewStatus,
} from '../services/submissionService';
import { getUsersByIds } from '../services/userManagementService';
import type {
  ActiveClassItem,
  ActiveItemType,
  ClassRecord,
  ProgramArea,
  Quiz,
  QuizAttempt,
  QuizAttemptDetail,
  ResponseCompletionSummary,
  StudentSubmission,
  SubmissionStatus,
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
  classIds: string[];
  activeProgramAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
}

const emptyActiveItemForm: ActiveItemFormState = {
  classIds: [],
  activeProgramAreaId: '',
  activeItemType: 'lesson',
  activeItemId: '',
};

type TeacherTab = 'overview' | 'responses' | 'submissions' | 'grades' | 'controls';

const teacherTabs: Array<{ id: TeacherTab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'responses', label: 'Responses' },
  { id: 'submissions', label: 'Submissions' },
  { id: 'grades', label: 'Grades' },
  { id: 'controls', label: 'Controls' },
];

const emptyResponses: ClassItemResponses = {
  bellRingerResponses: [],
  exitTicketResponses: [],
};

const aDayPeriods = new Set(['1', '5']);
const bDayPeriods = new Set(['2', '8']);

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

function formatQuizScore(attempt: QuizAttempt | undefined): string {
  if (!attempt) {
    return 'Not submitted';
  }

  return `${attempt.score}/${attempt.questionCount} (${Math.round(attempt.percentage)}%)`;
}

function normalizedPeriodToken(period: string): string {
  return period.trim().toUpperCase().replace(/^PERIOD\s*/, '');
}

function hasDaySectionLabel(value: string, day: 'A' | 'B'): boolean {
  return new RegExp(`(^|[^A-Z0-9])${day}\\d*($|[^A-Z0-9])`).test(value.toUpperCase());
}

function classDayForRecord(classRecord: ClassRecord): 'A' | 'B' | null {
  const period = normalizedPeriodToken(classRecord.period);

  if (period.startsWith('A')) {
    return 'A';
  }

  if (period.startsWith('B')) {
    return 'B';
  }

  const numericPeriod = period.match(/\d+/)?.[0];

  if (numericPeriod && aDayPeriods.has(numericPeriod)) {
    return 'A';
  }

  if (numericPeriod && bDayPeriods.has(numericPeriod)) {
    return 'B';
  }

  const classLabel = `${classRecord.id} ${classRecord.name}`;

  if (hasDaySectionLabel(classLabel, 'A')) {
    return 'A';
  }

  if (hasDaySectionLabel(classLabel, 'B')) {
    return 'B';
  }

  return null;
}

function classMatchesDay(classRecord: ClassRecord, day: 'A' | 'B'): boolean {
  return classDayForRecord(classRecord) === day;
}

function sameStringSet(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  const rightSet = new Set(right);
  return left.every((value) => rightSet.has(value));
}

function activeFormFromClass(classRecord: ClassRecord): ActiveItemFormState {
  return {
    classIds: [classRecord.id],
    activeProgramAreaId: classRecord.activeProgramAreaId,
    activeItemType: classRecord.activeItemType,
    activeItemId: classRecord.activeItemId,
  };
}

interface ClassSelectionPanelProps {
  classRecords: ClassRecord[];
  label: string;
  onSelect: (classId: string) => void;
}

function ClassSelectionPanel({ classRecords, label, onSelect }: ClassSelectionPanelProps) {
  return (
    <div className="teacher-class-picker">
      <p className="muted">Choose a class to view its {label.toLowerCase()}.</p>
      <div className="teacher-class-picker-grid">
        {classRecords.map((classRecord) => (
          <button
            className="teacher-class-picker-button"
            type="button"
            key={classRecord.id}
            onClick={() => onSelect(classRecord.id)}
          >
            <span className="teacher-class-picker-title">
              <strong>{classRecord.name}</strong>
              <span>{classRecord.period}</span>
            </span>
            <span className="teacher-class-picker-meta">
              {classRecord.studentIds.length} students
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TeacherPage() {
  const { classIds, isAdmin, userProfile } = useAuth();
  const [activeTeacherTab, setActiveTeacherTab] = useState<TeacherTab>('overview');
  const [classRecords, setClassRecords] = useState<ClassRecord[]>([]);
  const [programAreas, setProgramAreas] = useState<ProgramArea[]>([]);
  const [activeItemsByClassId, setActiveItemsByClassId] = useState<
    Record<string, ActiveClassItem | null>
  >({});
  const [studentsByClassId, setStudentsByClassId] = useState<Record<string, UserProfile[]>>({});
  const [responsesByClassId, setResponsesByClassId] = useState<
    Record<string, ClassItemResponses>
  >({});
  const [submissionsByClassId, setSubmissionsByClassId] = useState<
    Record<string, StudentSubmission[]>
  >({});
  const [quizAttemptsByClassId, setQuizAttemptsByClassId] = useState<
    Record<string, QuizAttempt[]>
  >({});
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizzesLoading, setQuizzesLoading] = useState(true);
  const [quizzesError, setQuizzesError] = useState<string | null>(null);
  const [activeErrorsByClassId, setActiveErrorsByClassId] = useState<Record<string, string>>({});
  const [responseErrorsByClassId, setResponseErrorsByClassId] = useState<Record<string, string>>(
    {},
  );
  const [submissionErrorsByClassId, setSubmissionErrorsByClassId] = useState<
    Record<string, string>
  >({});
  const [quizErrorsByClassId, setQuizErrorsByClassId] = useState<Record<string, string>>({});
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
  const [expandedSubmissionId, setExpandedSubmissionId] = useState<string | null>(null);
  const [feedbackDrafts, setFeedbackDrafts] = useState<Record<string, string>>({});
  const [reviewSavingKey, setReviewSavingKey] = useState<string | null>(null);
  const [selectedResponseClassId, setSelectedResponseClassId] = useState<string | null>(null);
  const [selectedSubmissionClassId, setSelectedSubmissionClassId] = useState<string | null>(null);
  const [selectedGradeClassId, setSelectedGradeClassId] = useState<string | null>(null);
  const [selectedGradeQuizId, setSelectedGradeQuizId] = useState<string | null>(null);
  const [expandedGradeAttemptId, setExpandedGradeAttemptId] = useState<string | null>(null);
  const [gradeAttemptDetailsById, setGradeAttemptDetailsById] = useState<
    Record<string, QuizAttemptDetail | null>
  >({});
  const [gradeAttemptDetailLoadingId, setGradeAttemptDetailLoadingId] = useState<string | null>(
    null,
  );
  const [gradeAttemptDetailErrors, setGradeAttemptDetailErrors] = useState<
    Record<string, string>
  >({});

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
    let didCancel = false;
    setQuizzesLoading(true);
    setQuizzesError(null);

    getQuizzes()
      .then((nextQuizzes) => {
        if (!didCancel) {
          setQuizzes(nextQuizzes);
          setQuizzesLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (!didCancel) {
          setQuizzesError(firestoreErrorMessage(error, 'Unable to load quizzes.'));
          setQuizzesLoading(false);
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
    if (activeForm.classIds.length || !classRecords.length) {
      return;
    }

    setActiveForm(activeFormFromClass(classRecords[0]));
  }, [activeForm.classIds.length, classRecords]);

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
    if (!classRecords.length) {
      setSubmissionsByClassId({});
      setSubmissionErrorsByClassId({});
      return undefined;
    }

    const unsubscribes = classRecords
      .map((classRecord) => {
        const activeItem = activeItemsByClassId[classRecord.id];
        const submissionTarget = activeItem ? resolveSubmissionTargetForActiveItem(activeItem) : null;

        if (!submissionTarget) {
          setSubmissionsByClassId((current) => ({
            ...current,
            [classRecord.id]: [],
          }));
          return null;
        }

        return subscribeToSubmissionsForClassTarget(
          classRecord.id,
          submissionTarget.targetType,
          submissionTarget.targetId,
          (submissions) => {
            setSubmissionsByClassId((current) => ({
              ...current,
              [classRecord.id]: submissions,
            }));
            setFeedbackDrafts((current) => {
              const next = { ...current };
              submissions.forEach((submission) => {
                if (next[submission.id] === undefined) {
                  next[submission.id] = submission.teacherFeedback;
                }
              });
              return next;
            });
            setSubmissionErrorsByClassId((current) => {
              const next = { ...current };
              delete next[classRecord.id];
              return next;
            });
          },
          (error) => {
            setSubmissionErrorsByClassId((current) => ({
              ...current,
              [classRecord.id]: firestoreErrorMessage(error, 'Unable to load submissions.'),
            }));
          },
        );
      })
      .filter((unsubscribe): unsubscribe is () => void => Boolean(unsubscribe));

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [activeItemsByClassId, classRecords]);

  useEffect(() => {
    if (!classRecords.length) {
      setQuizAttemptsByClassId({});
      setQuizErrorsByClassId({});
      return undefined;
    }

    const unsubscribes = classRecords
      .map((classRecord) => {
        return subscribeToQuizAttemptsForClass(
          classRecord.id,
          (attempts) => {
            setQuizAttemptsByClassId((current) => ({
              ...current,
              [classRecord.id]: attempts,
            }));
            setQuizErrorsByClassId((current) => {
              const next = { ...current };
              delete next[classRecord.id];
              return next;
            });
          },
          (error) => {
            setQuizErrorsByClassId((current) => ({
              ...current,
              [classRecord.id]: firestoreErrorMessage(error, 'Unable to load quiz grades.'),
            }));
          },
        );
      })
      .filter((unsubscribe): unsubscribe is () => void => Boolean(unsubscribe));

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

  const selectedResponseClass = useMemo(
    () => classRecords.find((classRecord) => classRecord.id === selectedResponseClassId),
    [classRecords, selectedResponseClassId],
  );

  const selectedSubmissionClass = useMemo(
    () => classRecords.find((classRecord) => classRecord.id === selectedSubmissionClassId),
    [classRecords, selectedSubmissionClassId],
  );

  const selectedGradeClass = useMemo(
    () => classRecords.find((classRecord) => classRecord.id === selectedGradeClassId),
    [classRecords, selectedGradeClassId],
  );

  const gradeQuizzes = useMemo(
    () =>
      selectedGradeClass
        ? quizzes.filter((quiz) => quiz.programAreaId === selectedGradeClass.activeProgramAreaId)
        : [],
    [quizzes, selectedGradeClass],
  );

  const selectedGradeQuiz = useMemo(
    () => gradeQuizzes.find((quiz) => quiz.id === selectedGradeQuizId),
    [gradeQuizzes, selectedGradeQuizId],
  );

  const selectedGradeAttempts = useMemo(
    () =>
      selectedGradeClass && selectedGradeQuiz
        ? (quizAttemptsByClassId[selectedGradeClass.id] ?? []).filter(
            (attempt) => attempt.quizId === selectedGradeQuiz.id,
          )
        : [],
    [quizAttemptsByClassId, selectedGradeClass, selectedGradeQuiz],
  );

  const selectedGradeStudents = selectedGradeClass
    ? studentsByClassId[selectedGradeClass.id] ?? []
    : [];

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

  const aDayClassIds = useMemo(
    () =>
      classRecords
        .filter((classRecord) => classMatchesDay(classRecord, 'A'))
        .map((classRecord) => classRecord.id),
    [classRecords],
  );

  const bDayClassIds = useMemo(
    () =>
      classRecords
        .filter((classRecord) => classMatchesDay(classRecord, 'B'))
        .map((classRecord) => classRecord.id),
    [classRecords],
  );

  const onlyADayChecked =
    aDayClassIds.length > 0 && sameStringSet(activeForm.classIds, aDayClassIds);
  const onlyBDayChecked =
    bDayClassIds.length > 0 && sameStringSet(activeForm.classIds, bDayClassIds);

  const chooseActiveClass = (classId: string) => {
    const classRecord = classRecords.find((nextClass) => nextClass.id === classId);

    if (classRecord) {
      setActiveForm(activeFormFromClass(classRecord));
    }
  };

  const toggleActiveClassTarget = (classId: string, isChecked: boolean) => {
    setActiveForm((current) => {
      const nextClassIds = isChecked
        ? Array.from(new Set([...current.classIds, classId]))
        : current.classIds.filter((currentClassId) => currentClassId !== classId);

      return {
        ...current,
        classIds: nextClassIds,
      };
    });
  };

  const chooseDayTargets = (day: 'A' | 'B', isChecked: boolean) => {
    const dayClassIds = day === 'A' ? aDayClassIds : bDayClassIds;

    setActiveForm((current) => ({
      ...current,
      classIds: isChecked ? dayClassIds : [],
    }));
  };

  const handleSetActiveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);
    setFormError(null);

    const selectedClasses = classRecords.filter((classRecord) =>
      activeForm.classIds.includes(classRecord.id),
    );

    if (!selectedClasses.length) {
      setFormError('Choose at least one class before setting an active item.');
      return;
    }

    if (selectedClasses.some((classRecord) => !canSetActiveItem(userProfile, classRecord))) {
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

      const validatedItem = validation.item;

      await Promise.all(
        selectedClasses.map((classRecord) =>
          updateClassActiveItem(classRecord.id, {
            id: validatedItem.id,
            type: validatedItem.type,
            programAreaId: validatedItem.programAreaId,
          }),
        ),
      );

      setClassRecords((currentClasses) =>
        currentClasses.map((classRecord) =>
          activeForm.classIds.includes(classRecord.id)
            ? {
                ...classRecord,
                activeProgramAreaId: validatedItem.programAreaId,
                activeItemType: validatedItem.type,
                activeItemId: validatedItem.id,
              }
            : classRecord,
        ),
      );
      setFormMessage(
        `Active class item updated for ${selectedClasses.length} ${
          selectedClasses.length === 1 ? 'class' : 'classes'
        }.`,
      );
    } catch (error) {
      setFormError(firestoreErrorMessage(error, 'Unable to update active class item.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReviewSubmission = async (
    submission: StudentSubmission,
    status: Extract<SubmissionStatus, 'needs_revision' | 'accepted'>,
  ) => {
    if (!userProfile) {
      setFormError('Sign in again before reviewing submissions.');
      return;
    }

    const savingKey = `${submission.id}-${status}`;
    setReviewSavingKey(savingKey);
    setFormMessage(null);
    setFormError(null);

    try {
      await updateSubmissionReviewStatus({
        submissionId: submission.id,
        status,
        teacherFeedback: feedbackDrafts[submission.id] ?? submission.teacherFeedback,
        reviewedBy: userProfile.uid,
      });
      setFormMessage(
        status === 'accepted' ? 'Submission marked accepted.' : 'Revision request saved.',
      );
    } catch (error) {
      setFormError(firestoreErrorMessage(error, 'Unable to update submission review.'));
    } finally {
      setReviewSavingKey(null);
    }
  };

  const handleGradeAttemptToggle = async (attempt: QuizAttempt) => {
    if (expandedGradeAttemptId === attempt.id) {
      setExpandedGradeAttemptId(null);
      return;
    }

    setExpandedGradeAttemptId(attempt.id);

    if (Object.prototype.hasOwnProperty.call(gradeAttemptDetailsById, attempt.id)) {
      return;
    }

    setGradeAttemptDetailLoadingId(attempt.id);
    setGradeAttemptDetailErrors((current) => {
      const next = { ...current };
      delete next[attempt.id];
      return next;
    });

    try {
      const detail = await getQuizAttemptDetail(attempt.id);
      setGradeAttemptDetailsById((current) => ({ ...current, [attempt.id]: detail }));
    } catch (error) {
      setGradeAttemptDetailErrors((current) => ({
        ...current,
        [attempt.id]: firestoreErrorMessage(error, 'Unable to load wrong-question details.'),
      }));
    } finally {
      setGradeAttemptDetailLoadingId((current) =>
        current === attempt.id ? null : current,
      );
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

      {!!classRecords.length && (
        <nav className="teacher-tab-list" aria-label="Teacher page sections">
          {teacherTabs.map((tab) => (
            <button
              className={activeTeacherTab === tab.id ? 'teacher-tab active' : 'teacher-tab'}
              type="button"
              aria-pressed={activeTeacherTab === tab.id}
              key={tab.id}
              onClick={() => setActiveTeacherTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      <div className="section-stack">
        {activeTeacherTab === 'overview' && (
          <>
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
              <div className="button-row">
                <Link className="secondary-button" to="/teacher/schedule">
                  Preview Curriculum Schedule
                </Link>
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
                            onClick={() => {
                              chooseActiveClass(classRecord.id);
                              setActiveTeacherTab('controls');
                            }}
                          >
                            Set Active
                          </button>
                          <Link className="outline-button" to="/today">
                            Open Today
                          </Link>
                          {classRecord.activeItemId ? (
                            <Link
                              className="secondary-button"
                              to={`/teacher/classes/${classRecord.id}/student-preview`}
                            >
                              Open Student Preview
                            </Link>
                          ) : (
                            <button
                              className="secondary-button"
                              type="button"
                              disabled
                              title="Set an active item before opening student preview."
                            >
                              Open Student Preview
                            </button>
                          )}
                        </div>
                        <ClassJoinCodePanel classRecord={classRecord} compact />
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {activeTeacherTab === 'responses' && !!classRecords.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Daily Response Completion</p>
            <h2>Bell Ringers And Exit Tickets</h2>
            {!selectedResponseClass ? (
              <ClassSelectionPanel
                classRecords={classRecords}
                label="daily responses"
                onSelect={setSelectedResponseClassId}
              />
            ) : (
              <>
                <div className="teacher-drilldown-heading">
                  <div>
                    <p className="retro-label">Selected Class</p>
                    <h3>
                      {selectedResponseClass.name} / {selectedResponseClass.period}
                    </h3>
                  </div>
                  <button
                    className="outline-button"
                    type="button"
                    onClick={() => setSelectedResponseClassId(null)}
                  >
                    Choose Another Class
                  </button>
                </div>
                <div className="response-completion-stack">
                  {[selectedResponseClass].map((classRecord) => {
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
              </>
            )}
          </section>
        )}

        {activeTeacherTab === 'submissions' && !!classRecords.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Student Submissions</p>
            <h2>Google Drive Evidence Review</h2>
            {!selectedSubmissionClass ? (
              <ClassSelectionPanel
                classRecords={classRecords}
                label="Google Drive submissions"
                onSelect={setSelectedSubmissionClassId}
              />
            ) : (
              <>
                <div className="teacher-drilldown-heading">
                  <div>
                    <p className="retro-label">Selected Class</p>
                    <h3>
                      {selectedSubmissionClass.name} / {selectedSubmissionClass.period}
                    </h3>
                  </div>
                  <button
                    className="outline-button"
                    type="button"
                    onClick={() => setSelectedSubmissionClassId(null)}
                  >
                    Choose Another Class
                  </button>
                </div>
                <div className="response-completion-stack">
                  {[selectedSubmissionClass].map((classRecord) => {
                const activeItem = activeItemsByClassId[classRecord.id];
                const submissionTarget = activeItem
                  ? resolveSubmissionTargetForActiveItem(activeItem)
                  : null;
                const submissions = submissionsByClassId[classRecord.id] ?? [];
                const submissionError = submissionErrorsByClassId[classRecord.id];
                const submittedUids = new Set(submissions.map((submission) => submission.uid));
                const missingCount = Math.max(classRecord.studentIds.length - submittedUids.size, 0);
                const needsRevisionCount = submissions.filter(
                  (submission) => submission.status === 'needs_revision',
                ).length;
                const acceptedCount = submissions.filter(
                  (submission) => submission.status === 'accepted',
                ).length;

                return (
                  <article className="card neon-card response-completion-card" key={classRecord.id}>
                    <div className="section-heading-row">
                      <div>
                        <p className="retro-label">
                          {classRecord.name} / {classRecord.period}
                        </p>
                        <h3>{submissionTarget?.title ?? activeItem?.title ?? classRecord.activeItemId}</h3>
                      </div>
                      <StatusBadge status={`${submissions.length} submitted`} />
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
                        <dt>Submission Target</dt>
                        <dd>
                          {submissionTarget
                            ? `${submissionTarget.targetType} / ${submissionTarget.targetId}`
                            : 'No Drive-link target'}
                        </dd>
                      </div>
                      <div>
                        <dt>Missing</dt>
                        <dd>{missingCount}</dd>
                      </div>
                      <div>
                        <dt>Needs Revision</dt>
                        <dd>{needsRevisionCount}</dd>
                      </div>
                      <div>
                        <dt>Accepted</dt>
                        <dd>{acceptedCount}</dd>
                      </div>
                    </dl>

                    {submissionError && <ErrorState message={submissionError} />}

                    {!submissionTarget ? (
                      <p className="muted">
                        This active item does not have a Drive-link submission target. Quiz scores
                        appear in the Grades tab.
                      </p>
                    ) : !classRecord.studentIds.length ? (
                      <p className="muted">No students are assigned to this class yet.</p>
                    ) : !submissions.length ? (
                      <p className="muted">No Google Drive evidence links have been submitted yet.</p>
                    ) : (
                      <div className="table-scroll">
                        <table className="management-table response-table submission-review-table">
                          <thead>
                            <tr>
                              <th scope="col">Student</th>
                              <th scope="col">Status</th>
                              <th scope="col">Drive Links</th>
                              <th scope="col">Reflection</th>
                              <th scope="col">Submitted</th>
                              <th scope="col">Updated</th>
                              <th scope="col">Teacher Feedback</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {submissions.map((submission) => {
                              const allLinks = [
                                ...submission.driveLinks,
                                ...submission.otherLinks,
                              ];
                              const isExpanded = expandedSubmissionId === submission.id;

                              return (
                                <Fragment key={submission.id}>
                                  <tr>
                                    <td>
                                      <strong>{submission.studentName || submission.uid}</strong>
                                      {submission.studentEmail && (
                                        <p className="meta-line">{submission.studentEmail}</p>
                                      )}
                                    </td>
                                    <td>
                                      <SubmissionStatusBadge status={submission.status} />
                                    </td>
                                    <td>
                                      <ul className="submission-link-display-list compact">
                                        {allLinks.map((link) => (
                                          <li key={link.url}>
                                            <a href={link.url} target="_blank" rel="noreferrer">
                                              {link.label || 'Open evidence'}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                    <td>
                                      <p className="submission-reflection-preview">
                                        {submission.reflection}
                                      </p>
                                    </td>
                                    <td>{formatTimestamp(submission.submittedAt)}</td>
                                    <td>{formatTimestamp(submission.updatedAt)}</td>
                                    <td>
                                      <label className="sr-only" htmlFor={`feedback-${submission.id}`}>
                                        Feedback for {submission.studentName || submission.uid}
                                      </label>
                                      <textarea
                                        id={`feedback-${submission.id}`}
                                        className="submission-feedback-input"
                                        value={
                                          feedbackDrafts[submission.id] ??
                                          submission.teacherFeedback
                                        }
                                        rows={4}
                                        onChange={(event) =>
                                          setFeedbackDrafts((current) => ({
                                            ...current,
                                            [submission.id]: event.target.value,
                                          }))
                                        }
                                      />
                                    </td>
                                    <td>
                                      <div className="button-row vertical">
                                        <button
                                          className="outline-button"
                                          type="button"
                                          aria-expanded={isExpanded}
                                          onClick={() =>
                                            setExpandedSubmissionId(
                                              isExpanded ? null : submission.id,
                                            )
                                          }
                                        >
                                          {isExpanded ? 'Hide Details' : 'View Details'}
                                        </button>
                                        <button
                                          className="secondary-button"
                                          type="button"
                                          disabled={
                                            reviewSavingKey === `${submission.id}-needs_revision`
                                          }
                                          onClick={() =>
                                            handleReviewSubmission(submission, 'needs_revision')
                                          }
                                        >
                                          Needs Revision
                                        </button>
                                        <button
                                          className="gradient-button"
                                          type="button"
                                          disabled={
                                            reviewSavingKey === `${submission.id}-accepted`
                                          }
                                          onClick={() =>
                                            handleReviewSubmission(submission, 'accepted')
                                          }
                                        >
                                          Accept
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                  {isExpanded && (
                                    <tr className="response-detail-row">
                                      <td colSpan={8}>
                                        <div className="response-detail-grid">
                                          <section>
                                            <p className="retro-label">Reflection</p>
                                            <p>{submission.reflection}</p>
                                          </section>
                                          <section>
                                            <p className="retro-label">Checklist</p>
                                            <ul className="submission-checklist-readonly">
                                              {submission.evidenceChecklist.map((item) => (
                                                <li key={item.label}>
                                                  {item.complete ? 'Complete' : 'Missing'}: {item.label}
                                                </li>
                                              ))}
                                            </ul>
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
              </>
            )}
          </section>
        )}

        {activeTeacherTab === 'grades' && !!classRecords.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Grades</p>
            <h2>Quiz Scores</h2>
            {!selectedGradeClass ? (
              <ClassSelectionPanel
                classRecords={classRecords}
                label="quiz grades"
                onSelect={(classId) => {
                  setSelectedGradeClassId(classId);
                  setSelectedGradeQuizId(null);
                }}
              />
            ) : !selectedGradeQuiz ? (
              <>
                <div className="teacher-drilldown-heading">
                  <div>
                    <p className="retro-label">Selected Class</p>
                    <h3>
                      {selectedGradeClass.name} / {selectedGradeClass.period}
                    </h3>
                  </div>
                  <button
                    className="outline-button"
                    type="button"
                    onClick={() => {
                      setSelectedGradeClassId(null);
                      setSelectedGradeQuizId(null);
                    }}
                  >
                    Choose Another Class
                  </button>
                </div>
                <div className="teacher-class-picker">
                  <p className="muted">Choose a quiz to view this class's score roster.</p>
                  {quizzesError && <ErrorState message={quizzesError} />}
                  {quizzesLoading && <LoadingState label="Loading quizzes..." />}
                  {!quizzesLoading && !quizzesError && !gradeQuizzes.length && (
                    <EmptyState
                      title="No quizzes for this program area"
                      message="Quiz records will appear here after they are seeded and published."
                    />
                  )}
                  {!quizzesLoading && !quizzesError && !!gradeQuizzes.length && (
                    <div className="teacher-class-picker-grid">
                      {gradeQuizzes.map((quiz) => {
                        const submittedCount = (quizAttemptsByClassId[selectedGradeClass.id] ?? []).filter(
                          (attempt) => attempt.quizId === quiz.id,
                        ).length;

                        return (
                          <button
                            className="teacher-class-picker-button"
                            type="button"
                            key={quiz.id}
                            onClick={() => setSelectedGradeQuizId(quiz.id)}
                          >
                            <span className="teacher-class-picker-title">
                              <strong>{quiz.title}</strong>
                              <span>{quiz.quarter}</span>
                            </span>
                            <span className="teacher-class-picker-meta">
                              {submittedCount} submitted / {quiz.questions.length} questions
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              (() => {
                const attemptsByUid = new Map(
                  selectedGradeAttempts.map((attempt) => [attempt.uid, attempt]),
                );
                const averagePercentage = selectedGradeAttempts.length
                  ? Math.round(
                      selectedGradeAttempts.reduce(
                        (total, attempt) => total + attempt.percentage,
                        0,
                      ) / selectedGradeAttempts.length,
                    )
                  : null;
                const quizError = quizErrorsByClassId[selectedGradeClass.id];

                return (
                  <>
                    <div className="teacher-drilldown-heading">
                      <div>
                        <p className="retro-label">
                          {selectedGradeClass.name} / {selectedGradeClass.period}
                        </p>
                        <h3>{selectedGradeQuiz.title}</h3>
                      </div>
                      <div className="teacher-drilldown-actions">
                        <button
                          className="outline-button"
                          type="button"
                          onClick={() => setSelectedGradeQuizId(null)}
                        >
                          All Quizzes
                        </button>
                        <button
                          className="outline-button"
                          type="button"
                          onClick={() => {
                            setSelectedGradeClassId(null);
                            setSelectedGradeQuizId(null);
                          }}
                        >
                          Choose Another Class
                        </button>
                      </div>
                    </div>
                    <article className="card neon-card response-completion-card">
                      <div className="section-heading-row">
                        <div>
                          <p className="retro-label">Quiz Score Roster</p>
                          <h3>{selectedGradeQuiz.title}</h3>
                        </div>
                        <StatusBadge
                          status={`${selectedGradeAttempts.length}/${selectedGradeClass.studentIds.length} submitted`}
                        />
                      </div>

                      <dl className="detail-list response-summary-list">
                        <div>
                          <dt>Quarter</dt>
                          <dd>{selectedGradeQuiz.quarter}</dd>
                        </div>
                        <div>
                          <dt>Questions</dt>
                          <dd>{selectedGradeQuiz.questions.length}</dd>
                        </div>
                        <div>
                          <dt>Average</dt>
                          <dd>
                            {averagePercentage === null ? 'Not enough scores' : `${averagePercentage}%`}
                          </dd>
                        </div>
                        <div>
                          <dt>Answer Visibility</dt>
                          <dd>Scores only</dd>
                        </div>
                      </dl>

                      {quizError && <ErrorState message={quizError} />}

                      {!selectedGradeClass.studentIds.length ? (
                        <p className="muted">No students are assigned to this class yet.</p>
                      ) : (
                        <div className="table-scroll">
                          <table className="management-table response-table grade-table">
                            <thead>
                              <tr>
                                <th scope="col">Student</th>
                                <th scope="col">Score</th>
                                <th scope="col">Status</th>
                                <th scope="col">Submitted</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedGradeClass.studentIds.map((uid) => {
                                const student = selectedGradeStudents.find(
                                  (nextStudent) => nextStudent.uid === uid,
                                );
                                const attempt = attemptsByUid.get(uid);
                                const isGradeAttemptExpanded =
                                  attempt && expandedGradeAttemptId === attempt.id;
                                const attemptDetail = attempt
                                  ? gradeAttemptDetailsById[attempt.id]
                                  : undefined;
                                const attemptDetailError = attempt
                                  ? gradeAttemptDetailErrors[attempt.id]
                                  : undefined;

                                return (
                                  <Fragment key={`${selectedGradeQuiz.id}-${uid}`}>
                                    <tr>
                                    <td>
                                      {attempt ? (
                                        <button
                                          className="grade-student-button"
                                          type="button"
                                          aria-expanded={isGradeAttemptExpanded}
                                          onClick={() => handleGradeAttemptToggle(attempt)}
                                        >
                                          <strong>
                                            {student?.displayName || attempt.studentName || uid}
                                          </strong>
                                          {(student?.email || attempt.studentEmail) && (
                                            <span className="meta-line">
                                              {student?.email || attempt.studentEmail}
                                            </span>
                                          )}
                                        </button>
                                      ) : (
                                        <>
                                          <strong>{student?.displayName || uid}</strong>
                                          {student?.email && <p className="meta-line">{student.email}</p>}
                                        </>
                                      )}
                                    </td>
                                    <td>{formatQuizScore(attempt)}</td>
                                    <td>
                                      <StatusBadge status={attempt ? 'submitted' : 'missing'} />
                                    </td>
                                    <td>{formatTimestamp(attempt?.submittedAt)}</td>
                                    </tr>
                                    {isGradeAttemptExpanded && (
                                      <tr className="response-detail-row">
                                        <td colSpan={4}>
                                          <div className="grade-attempt-detail">
                                            <p className="retro-label">Wrong Questions</p>
                                            {gradeAttemptDetailLoadingId === attempt.id && (
                                              <LoadingState label="Loading wrong-question details..." />
                                            )}
                                            {attemptDetailError && (
                                              <ErrorState message={attemptDetailError} />
                                            )}
                                            {attemptDetail &&
                                              (attemptDetail.incorrectQuestionIds.length ? (
                                                <ol className="grade-wrong-question-list">
                                                  {attemptDetail.incorrectQuestionIds.map(
                                                    (questionId) => {
                                                      const question = selectedGradeQuiz.questions.find(
                                                        (nextQuestion) => nextQuestion.id === questionId,
                                                      );

                                                      return (
                                                        <li key={questionId}>
                                                          {question?.text || questionId}
                                                        </li>
                                                      );
                                                    },
                                                  )}
                                                </ol>
                                              ) : (
                                                <p className="muted">
                                                  Perfect score. This student missed no questions.
                                                </p>
                                              ))}
                                            {attemptDetail === null && !attemptDetailError && (
                                              <p className="muted">
                                                Wrong-question details are unavailable for this older
                                                submission.
                                              </p>
                                            )}
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
                  </>
                );
              })()
            )}
          </section>
        )}

        {activeTeacherTab === 'controls' && !!classRecords.length && (
          <section className="content-section neon-section">
            <p className="retro-label">Set Active Item</p>
            <h2>Teacher-Controlled Today Item</h2>
            <form
              className="management-form active-item-management-form"
              onSubmit={handleSetActiveItem}
            >
              <fieldset className="active-target-picker">
                <legend>Class Targets</legend>
                <div className="active-target-grid">
                  {classRecords.map((classRecord) => (
                    <label className="active-target-option" key={classRecord.id}>
                      <input
                        type="checkbox"
                        checked={activeForm.classIds.includes(classRecord.id)}
                        onChange={(event) =>
                          toggleActiveClassTarget(classRecord.id, event.currentTarget.checked)
                        }
                      />
                      <span>
                        <strong>{classRecord.period}</strong>
                        {classRecord.name}
                      </span>
                    </label>
                  ))}
                  <label className="active-target-option shortcut">
                    <input
                      type="checkbox"
                      checked={onlyADayChecked}
                      disabled={!aDayClassIds.length}
                      onChange={(event) => chooseDayTargets('A', event.currentTarget.checked)}
                    />
                    <span>
                      <strong>ONLY A day</strong>
                      Select A-period classes
                    </span>
                  </label>
                  <label className="active-target-option shortcut">
                    <input
                      type="checkbox"
                      checked={onlyBDayChecked}
                      disabled={!bDayClassIds.length}
                      onChange={(event) => chooseDayTargets('B', event.currentTarget.checked)}
                    />
                    <span>
                      <strong>ONLY B day</strong>
                      Select B-period classes
                    </span>
                  </label>
                </div>
              </fieldset>

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
