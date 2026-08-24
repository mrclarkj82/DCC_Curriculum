import { initializeApp } from 'firebase-admin/app';
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall, type CallableRequest } from 'firebase-functions/v2/https';
import {
  activeSchoolYear,
  classCycleFromPeriod,
  dateInTimeZone,
  schoolTimeZone,
} from './scheduledMission';

export { publishScheduledDccMission } from './scheduledMission';

initializeApp();

const studentDomain = 'student.doralacademynv.org';
const allowedCodePattern = /^[A-Z0-9]{6}$/;
const maxQuizAnswers = 100;
const maxAnswerParts = 20;
const maxAnswerLength = 4000;
const maxIdentifierLength = 200;
const maxResponseLength = 4000;
const callableOptions = {
  region: 'us-central1' as const,
  invoker: 'public' as const,
  maxInstances: 5,
  timeoutSeconds: 30,
  enforceAppCheck: process.env.ENFORCE_APPCHECK === 'true',
};
const dccAppRef = () => getFirestore().collection('apps').doc('dcc');

const normalizeCode = (value: unknown): string =>
  typeof value === 'string' ? value.trim().replace(/\s+/g, '').toUpperCase() : '';

const tokenString = (value: unknown): string => (typeof value === 'string' ? value : '');

const safeIdPart = (value: string): string =>
  value
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const makeQuizAttemptId = (classId: string, quizId: string, uid: string): string =>
  [classId, quizId, uid].map(safeIdPart).join('_');

const makeStudentResponseId = (classId: string, lessonId: string, uid: string): string =>
  [classId, lessonId, uid].map(safeIdPart).join('_');

type ResponseKind = 'bellRinger' | 'exitTicket';
type LessonResponseAccessStatus = 'previous' | 'current' | 'future' | 'unscheduled';

interface StudentLessonContext {
  appRef: FirebaseFirestore.DocumentReference;
  classData: FirebaseFirestore.DocumentData;
  lessonData: FirebaseFirestore.DocumentData;
  userData: FirebaseFirestore.DocumentData;
}

interface LessonResponseAccess {
  status: LessonResponseAccessStatus;
  canRespond: boolean;
  cycleDay: 'A' | 'B' | null;
  scheduledDate: string;
  today: string;
}

const responsePrompt = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (value && typeof value === 'object') {
    return tokenString((value as Record<string, unknown>).prompt).trim();
  }

  return '';
};

const getStudentLessonContext = async (
  request: CallableRequest<unknown>,
  classId: string,
  lessonId: string,
): Promise<StudentLessonContext> => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Please sign in before opening lesson responses.');
  }

  if (
    !classId ||
    !lessonId ||
    classId.length > maxIdentifierLength ||
    lessonId.length > maxIdentifierLength
  ) {
    throw new HttpsError('invalid-argument', 'Class ID and lesson ID are required.');
  }

  const appRef = dccAppRef();
  const userRef = appRef.collection('users').doc(request.auth.uid);
  const classRef = appRef.collection('classes').doc(classId);
  const lessonRef = appRef.collection('lessons').doc(lessonId);
  const [userSnapshot, classSnapshot, lessonSnapshot] = await Promise.all([
    userRef.get(),
    classRef.get(),
    lessonRef.get(),
  ]);

  if (!userSnapshot.exists || userSnapshot.data()?.role !== 'student') {
    throw new HttpsError('permission-denied', 'Only student accounts can submit lesson responses.');
  }

  if (!classSnapshot.exists) {
    throw new HttpsError('not-found', 'Class record was not found.');
  }

  if (!lessonSnapshot.exists) {
    throw new HttpsError('not-found', 'Lesson record was not found.');
  }

  const userData = userSnapshot.data() ?? {};
  const classData = classSnapshot.data() ?? {};
  const lessonData = lessonSnapshot.data() ?? {};
  const classStudentIds = Array.isArray(classData.studentIds)
    ? classData.studentIds.map(String)
    : [];
  const userClassIds = Array.isArray(userData.classIds) ? userData.classIds.map(String) : [];

  if (!classStudentIds.includes(request.auth.uid) || !userClassIds.includes(classId)) {
    throw new HttpsError(
      'permission-denied',
      'You can only submit lesson responses for your assigned class.',
    );
  }

  const authEmail = tokenString(request.auth.token.email).toLowerCase();

  if (tokenString(userData.email).toLowerCase() !== authEmail) {
    throw new HttpsError('permission-denied', 'Your sign-in email does not match your profile.');
  }

  return { appRef, classData, lessonData, userData };
};

const getLessonResponseAccessForClass = async (
  appRef: FirebaseFirestore.DocumentReference,
  classData: FirebaseFirestore.DocumentData,
  lessonId: string,
): Promise<LessonResponseAccess> => {
  const cycleDay = classCycleFromPeriod(classData.period);
  const today = dateInTimeZone(new Date(), schoolTimeZone);

  if (!cycleDay || tokenString(classData.schoolYear) !== activeSchoolYear) {
    return { status: 'unscheduled', canRespond: false, cycleDay, scheduledDate: '', today };
  }

  const scheduleSnapshot = await appRef
    .collection('lessonSchedule')
    .where('lessonId', '==', lessonId)
    .limit(2)
    .get();

  if (scheduleSnapshot.empty) {
    return { status: 'unscheduled', canRespond: false, cycleDay, scheduledDate: '', today };
  }

  if (scheduleSnapshot.size !== 1) {
    throw new HttpsError(
      'failed-precondition',
      'This lesson has more than one aligned schedule record.',
    );
  }

  const scheduleData = scheduleSnapshot.docs[0].data();
  const scheduledDate = tokenString(cycleDay === 'A' ? scheduleData.aDayDate : scheduleData.bDayDate);

  if (!scheduledDate) {
    return { status: 'unscheduled', canRespond: false, cycleDay, scheduledDate: '', today };
  }

  const status: LessonResponseAccessStatus =
    scheduledDate < today ? 'previous' : scheduledDate === today ? 'current' : 'future';

  return {
    status,
    canRespond: status === 'previous' || status === 'current',
    cycleDay,
    scheduledDate,
    today,
  };
};

type AnswerValue = string | string[];

interface QuizAttemptAnswerInput {
  questionId: string;
  selectedAnswer: AnswerValue;
}

interface QuizQuestionData {
  id?: unknown;
  text?: unknown;
}

interface QuizAnswerKeyItem {
  questionId?: unknown;
  correctAnswer?: unknown;
}

const isAnswerValue = (value: unknown): value is AnswerValue => {
  if (typeof value === 'string') {
    return value.length <= maxAnswerLength;
  }

  return (
    Array.isArray(value) &&
    value.length <= maxAnswerParts &&
    value.every((part) => typeof part === 'string' && part.length <= maxAnswerLength)
  );
};

const isQuizAttemptAnswer = (value: unknown): value is QuizAttemptAnswerInput => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const answer = value as Record<string, unknown>;

  return (
    typeof answer.questionId === 'string' &&
    answer.questionId.trim().length > 0 &&
    answer.questionId.length <= maxIdentifierLength &&
    isAnswerValue(answer.selectedAnswer)
  );
};

const normalizeAnswerPart = (value: unknown): string =>
  String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

const normalizeAnswerValue = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.map(normalizeAnswerPart).filter(Boolean).sort()
    : [normalizeAnswerPart(value)].filter(Boolean);

const answersMatch = (selectedAnswer: unknown, correctAnswer: unknown): boolean => {
  const selected = normalizeAnswerValue(selectedAnswer);
  const correct = normalizeAnswerValue(correctAnswer);

  return (
    selected.length === correct.length &&
    selected.every((answerPart, index) => answerPart === correct[index])
  );
};

const quizAttemptFromData = (id: string, data: Record<string, unknown>) => ({
  id: tokenString(data.id) || id,
  uid: tokenString(data.uid),
  studentName: tokenString(data.studentName),
  studentEmail: tokenString(data.studentEmail),
  classId: tokenString(data.classId),
  programAreaId: tokenString(data.programAreaId),
  quizId: tokenString(data.quizId),
  quizTitle: tokenString(data.quizTitle),
  questionCount: Number(data.questionCount ?? 0),
  answeredCount: Number(data.answeredCount ?? 0),
  score: Number(data.score ?? 0),
  percentage: Number(data.percentage ?? 0),
  status: 'submitted',
  createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : data.createdAt,
  updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : data.updatedAt,
  submittedAt:
    data.submittedAt instanceof Timestamp ? data.submittedAt.toMillis() : data.submittedAt,
});

export const joinClassWithCode = onCall(
  callableOptions,
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Please sign in before joining a class.');
    }

    const uid = request.auth.uid;
    const authToken = request.auth.token;
    const email = tokenString(request.auth.token.email);
    const normalizedEmail = email.toLowerCase();

    if (!normalizedEmail.endsWith(`@${studentDomain}`)) {
      throw new HttpsError('permission-denied', 'This code is only for student school accounts.');
    }

    const code = normalizeCode(request.data?.code);

    if (!allowedCodePattern.test(code)) {
      throw new HttpsError('not-found', 'That class code was not found.');
    }

    const db = getFirestore();
    const appRef = dccAppRef();
    const codeRef = appRef.collection('classJoinCodes').doc(code);
    const userRef = appRef.collection('users').doc(uid);
    const now = Timestamp.now();

    return db.runTransaction(async (transaction) => {
      const codeSnapshot = await transaction.get(codeRef);

      if (!codeSnapshot.exists) {
        throw new HttpsError('not-found', 'That class code was not found.');
      }

      const codeData = codeSnapshot.data() ?? {};

      if (codeData.isActive !== true) {
        throw new HttpsError('failed-precondition', 'That class code is no longer active.');
      }

      if (codeData.allowedEmailDomain !== studentDomain) {
        throw new HttpsError('permission-denied', 'This code is only for student school accounts.');
      }

      if (
        codeData.expiresAt &&
        codeData.expiresAt instanceof Timestamp &&
        codeData.expiresAt.toMillis() < now.toMillis()
      ) {
        throw new HttpsError('deadline-exceeded', 'That class code is no longer active.');
      }

      const classId = tokenString(codeData.classId);
      const classRef = appRef.collection('classes').doc(classId);
      const classSnapshot = await transaction.get(classRef);

      if (!classSnapshot.exists) {
        throw new HttpsError('not-found', 'That class code was not found.');
      }

      const classData = classSnapshot.data() ?? {};
      const userSnapshot = await transaction.get(userRef);
      const userData = userSnapshot.exists ? (userSnapshot.data() ?? {}) : null;

      if (userData && userData.role !== 'student') {
        throw new HttpsError(
          'permission-denied',
          'Teacher and admin accounts cannot join classes with student codes.',
        );
      }

      const classIds = Array.isArray(userData?.classIds) ? userData?.classIds.map(String) : [];

      if (classIds.includes(classId)) {
        throw new HttpsError('already-exists', 'Your account is already in this class.');
      }

      if (userSnapshot.exists) {
        transaction.update(userRef, {
          classIds: FieldValue.arrayUnion(classId),
          updatedAt: now,
          lastLoginAt: now,
        });
      } else {
        transaction.set(userRef, {
          uid,
          displayName: tokenString(authToken.name),
          email,
          photoURL: tokenString(authToken.picture),
          role: 'student',
          classIds: [classId],
          createdAt: now,
          updatedAt: now,
          lastLoginAt: now,
        });
      }

      transaction.update(classRef, {
        studentIds: FieldValue.arrayUnion(uid),
        updatedAt: now,
      });

      transaction.update(codeRef, {
        usageCount: FieldValue.increment(1),
        lastUsedAt: now,
        updatedAt: now,
      });

      return {
        classId,
        className: tokenString(classData.name) || tokenString(codeData.className),
        period: tokenString(classData.period) || tokenString(codeData.period),
      };
    });
  },
);

export const getLessonResponseAccess = onCall(callableOptions, async (request) => {
  const classId = tokenString(request.data?.classId);
  const lessonId = tokenString(request.data?.lessonId);
  const { appRef, classData } = await getStudentLessonContext(request, classId, lessonId);

  return getLessonResponseAccessForClass(appRef, classData, lessonId);
});

export const submitScheduledLessonResponse = onCall(callableOptions, async (request) => {
  const classId = tokenString(request.data?.classId);
  const lessonId = tokenString(request.data?.lessonId);
  const responseKind = tokenString(request.data?.responseKind) as ResponseKind;
  const response = tokenString(request.data?.response);

  if (!['bellRinger', 'exitTicket'].includes(responseKind)) {
    throw new HttpsError('invalid-argument', 'Choose a valid lesson response type.');
  }

  if (!response || response.length > maxResponseLength) {
    throw new HttpsError(
      'invalid-argument',
      `Write a response between 1 and ${maxResponseLength} characters.`,
    );
  }

  const { appRef, classData, lessonData, userData } = await getStudentLessonContext(
    request,
    classId,
    lessonId,
  );
  const access = await getLessonResponseAccessForClass(appRef, classData, lessonId);

  if (!access.canRespond) {
    throw new HttpsError(
      'failed-precondition',
      access.status === 'future'
        ? `This response unlocks on ${access.scheduledDate}.`
        : 'This lesson is not available for scheduled responses.',
    );
  }

  const prompt = responsePrompt(
    responseKind === 'bellRinger' ? lessonData.bellRinger : lessonData.exitTicket,
  );

  if (!prompt) {
    throw new HttpsError('failed-precondition', 'This lesson does not have that response prompt.');
  }

  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Please sign in before submitting a response.');
  }

  const db = getFirestore();
  const now = Timestamp.now();
  const uid = request.auth.uid;
  const authToken = request.auth.token;
  const responseId = makeStudentResponseId(classId, lessonId, uid);
  const collectionName =
    responseKind === 'bellRinger' ? 'bellRingerResponses' : 'exitTicketResponses';
  const responseRef = appRef.collection(collectionName).doc(responseId);

  await db.runTransaction(async (transaction) => {
    const existingResponse = await transaction.get(responseRef);
    const responseData = {
      id: responseId,
      uid,
      studentName: tokenString(userData.displayName) || tokenString(authToken.name),
      studentEmail: tokenString(authToken.email),
      classId,
      programAreaId: tokenString(lessonData.programAreaId),
      activeItemType: 'lesson',
      activeItemId: lessonId,
      prompt,
      response,
      status: 'submitted',
      updatedAt: now,
    };

    transaction.set(
      responseRef,
      existingResponse.exists ? responseData : { ...responseData, createdAt: now },
      { merge: true },
    );
  });

  return { status: 'submitted', updatedAt: now.toMillis() };
});

export const submitQuizAttempt = onCall(
  callableOptions,
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Please sign in before submitting a quiz.');
    }

    const uid = request.auth.uid;
    const authToken = request.auth.token;
    const email = tokenString(request.auth.token.email);
    const classId = tokenString(request.data?.classId).trim();
    const quizId = tokenString(request.data?.quizId).trim();
    const lessonId = tokenString(request.data?.lessonId).trim();
    const rawAnswers = request.data?.answers;

    if (
      !classId ||
      !quizId ||
      classId.length > maxIdentifierLength ||
      quizId.length > maxIdentifierLength ||
      lessonId.length > maxIdentifierLength
    ) {
      throw new HttpsError('invalid-argument', 'Class ID and quiz ID are required.');
    }

    if (
      !Array.isArray(rawAnswers) ||
      rawAnswers.length > maxQuizAnswers ||
      !rawAnswers.every(isQuizAttemptAnswer)
    ) {
      throw new HttpsError('invalid-argument', 'Quiz answers are invalid or too large.');
    }

    const answers = rawAnswers;

    const db = getFirestore();
    const appRef = dccAppRef();
    const userRef = appRef.collection('users').doc(uid);
    const classRef = appRef.collection('classes').doc(classId);
    const quizRef = appRef.collection('quizzes').doc(quizId);
    const answerKeyRef = appRef.collection('quizAnswerKeys').doc(quizId);
    const attemptId = makeQuizAttemptId(classId, quizId, uid);
    const attemptRef = appRef.collection('quizAttempts').doc(attemptId);
    const attemptDetailRef = appRef.collection('quizAttemptDetails').doc(attemptId);
    const now = Timestamp.now();

    return db.runTransaction(async (transaction) => {
      const [userSnapshot, classSnapshot, quizSnapshot, answerKeySnapshot, attemptSnapshot] =
        await Promise.all([
          transaction.get(userRef),
          transaction.get(classRef),
          transaction.get(quizRef),
          transaction.get(answerKeyRef),
          transaction.get(attemptRef),
        ]);

      if (!userSnapshot.exists) {
        throw new HttpsError('permission-denied', 'Your student profile was not found.');
      }

      const userData = userSnapshot.data() ?? {};

      if (userData.role !== 'student') {
        throw new HttpsError('permission-denied', 'Only student accounts can submit quiz attempts.');
      }

      if (tokenString(userData.email).toLowerCase() !== email.toLowerCase()) {
        throw new HttpsError('permission-denied', 'Your sign-in email does not match your profile.');
      }

      if (!classSnapshot.exists) {
        throw new HttpsError('not-found', 'Class record was not found.');
      }

      const classData = classSnapshot.data() ?? {};
      const classStudentIds = Array.isArray(classData.studentIds)
        ? classData.studentIds.map(String)
        : [];
      const userClassIds = Array.isArray(userData.classIds) ? userData.classIds.map(String) : [];

      if (!classStudentIds.includes(uid) || !userClassIds.includes(classId)) {
        throw new HttpsError(
          'permission-denied',
          'You can only submit a quiz for your assigned class.',
        );
      }

      if (!quizSnapshot.exists) {
        throw new HttpsError('not-found', 'Quiz record was not found.');
      }

      const quizData = quizSnapshot.data() ?? {};

      const activeItemType = tokenString(classData.activeItemType);
      const activeItemId = tokenString(classData.activeItemId);
      const quizLessonIds = Array.isArray(quizData.lessonIds)
        ? quizData.lessonIds.map(String)
        : [];
      let isQuizAvailable = false;

      if (lessonId) {
        const lessonSnapshot = await transaction.get(
          appRef.collection('lessons').doc(lessonId),
        );

        if (!lessonSnapshot.exists) {
          throw new HttpsError('not-found', 'The lesson linked to this quiz was not found.');
        }

        const lessonData = lessonSnapshot.data() ?? {};
        const assignmentData = lessonData.assignment;
        const linkedQuizId =
          assignmentData && typeof assignmentData === 'object'
            ? tokenString((assignmentData as Record<string, unknown>).quizId)
            : '';

        isQuizAvailable =
          tokenString(lessonData.programAreaId) === tokenString(quizData.programAreaId) &&
          (linkedQuizId === quizId || quizLessonIds.includes(lessonId));
      } else {
        isQuizAvailable = activeItemType === 'quiz' && activeItemId === quizId;
      }

      if (!lessonId && !isQuizAvailable && activeItemType === 'lesson' && activeItemId) {
        const activeLessonSnapshot = await transaction.get(
          appRef.collection('lessons').doc(activeItemId),
        );
        const activeLessonData = activeLessonSnapshot.data() ?? {};
        const assignmentData = activeLessonData.assignment;
        const linkedQuizId =
          assignmentData && typeof assignmentData === 'object'
            ? tokenString((assignmentData as Record<string, unknown>).quizId)
            : '';
        isQuizAvailable =
          linkedQuizId === quizId || quizLessonIds.includes(activeItemId);
      }

      if (!lessonId && !isQuizAvailable && activeItemType === 'assignment' && activeItemId) {
        const activeAssignmentSnapshot = await transaction.get(
          appRef.collection('assignments').doc(activeItemId),
        );
        const activeAssignmentData = activeAssignmentSnapshot.data() ?? {};
        isQuizAvailable = tokenString(activeAssignmentData.quizId) === quizId;
      }

      if (!isQuizAvailable) {
        throw new HttpsError(
          'failed-precondition',
          'This quiz is not available for this lesson or class item.',
        );
      }

      if (quizData.isPublished !== true) {
        throw new HttpsError('failed-precondition', 'This quiz is not published yet.');
      }

      if (quizData.programAreaId !== classData.activeProgramAreaId) {
        throw new HttpsError(
          'failed-precondition',
          'This quiz does not match the active class program area.',
        );
      }

      const questions = Array.isArray(quizData.questions)
        ? (quizData.questions as QuizQuestionData[])
        : [];

      if (!questions.length) {
        throw new HttpsError('failed-precondition', 'This quiz has no questions yet.');
      }

      const answerSource = answerKeySnapshot.exists
        ? (answerKeySnapshot.data()?.answers as QuizAnswerKeyItem[] | undefined)
        : (quizData.questions as QuizAnswerKeyItem[] | undefined);
      const answerKeys = Array.isArray(answerSource) ? answerSource : [];
      const answerKeyByQuestionId = new Map(
        answerKeys
          .filter((answerKey) => tokenString(answerKey.questionId))
          .map((answerKey) => [tokenString(answerKey.questionId), answerKey.correctAnswer]),
      );
      const submittedAnswersByQuestionId = new Map(
        answers
          .filter((answer) => tokenString(answer.questionId))
          .map((answer) => [tokenString(answer.questionId), answer.selectedAnswer]),
      );

      if (submittedAnswersByQuestionId.size !== questions.length) {
        throw new HttpsError('failed-precondition', 'Answer every question before submitting.');
      }

      let score = 0;
      const incorrectQuestionIds: string[] = [];

      for (const question of questions) {
        const questionId = tokenString(question.id);
        const correctAnswer = answerKeyByQuestionId.get(questionId);
        const selectedAnswer = submittedAnswersByQuestionId.get(questionId);

        if (!questionId || correctAnswer === undefined) {
          throw new HttpsError(
            'failed-precondition',
            'This quiz is missing a private answer key.',
          );
        }

        if (answersMatch(selectedAnswer, correctAnswer)) {
          score += 1;
        } else {
          incorrectQuestionIds.push(questionId);
        }
      }

      const questionCount = questions.length;
      const percentage = questionCount ? Math.round((score / questionCount) * 100) : 0;
      const attemptData = {
        id: attemptId,
        uid,
        studentName: tokenString(userData.displayName) || tokenString(authToken.name),
        studentEmail: email,
        classId,
        programAreaId: tokenString(quizData.programAreaId),
        quizId,
        quizTitle: tokenString(quizData.title),
        questionCount,
        answeredCount: submittedAnswersByQuestionId.size,
        score,
        percentage,
        status: 'submitted',
        createdAt: attemptSnapshot.exists
          ? attemptSnapshot.data()?.createdAt ?? now
          : now,
        updatedAt: now,
        submittedAt: now,
      };
      const attemptDetailData = {
        id: attemptId,
        uid,
        classId,
        quizId,
        incorrectQuestionIds,
        ...(attemptSnapshot.exists ? {} : { createdAt: now }),
        updatedAt: now,
      };

      transaction.set(attemptRef, attemptData, { merge: true });
      transaction.set(attemptDetailRef, attemptDetailData, { merge: true });

      return {
        attempt: quizAttemptFromData(attemptId, attemptData),
        alreadySubmitted: attemptSnapshot.exists,
      };
    });
  },
);
