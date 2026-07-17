import { initializeApp } from 'firebase-admin/app';
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

initializeApp();

const studentDomain = 'student.doralacademynv.org';
const allowedCodePattern = /^[A-Z0-9]{6}$/;
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
  { region: 'us-central1', invoker: 'public' },
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

export const submitQuizAttempt = onCall(
  { region: 'us-central1', invoker: 'public' },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Please sign in before submitting a quiz.');
    }

    const uid = request.auth.uid;
    const authToken = request.auth.token;
    const email = tokenString(request.auth.token.email);
    const classId = tokenString(request.data?.classId).trim();
    const quizId = tokenString(request.data?.quizId).trim();
    const answers = Array.isArray(request.data?.answers)
      ? (request.data.answers as QuizAttemptAnswerInput[])
      : [];

    if (!classId || !quizId) {
      throw new HttpsError('invalid-argument', 'Class ID and quiz ID are required.');
    }

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
      let isQuizAvailableForActiveItem =
        activeItemType === 'quiz' && activeItemId === quizId;

      if (!isQuizAvailableForActiveItem && activeItemType === 'lesson' && activeItemId) {
        const activeLessonSnapshot = await transaction.get(
          appRef.collection('lessons').doc(activeItemId),
        );
        const activeLessonData = activeLessonSnapshot.data() ?? {};
        const assignmentData = activeLessonData.assignment;
        const linkedQuizId =
          assignmentData && typeof assignmentData === 'object'
            ? tokenString((assignmentData as Record<string, unknown>).quizId)
            : '';
        const quizLessonIds = Array.isArray(quizData.lessonIds)
          ? quizData.lessonIds.map(String)
          : [];

        isQuizAvailableForActiveItem =
          linkedQuizId === quizId || quizLessonIds.includes(activeItemId);
      }

      if (!isQuizAvailableForActiveItem && activeItemType === 'assignment' && activeItemId) {
        const activeAssignmentSnapshot = await transaction.get(
          appRef.collection('assignments').doc(activeItemId),
        );
        const activeAssignmentData = activeAssignmentSnapshot.data() ?? {};
        isQuizAvailableForActiveItem = tokenString(activeAssignmentData.quizId) === quizId;
      }

      if (!isQuizAvailableForActiveItem) {
        throw new HttpsError(
          'failed-precondition',
          'This quiz is not available for the active class item.',
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

      if (attemptSnapshot.exists) {
        return {
          attempt: quizAttemptFromData(attemptSnapshot.id, attemptSnapshot.data() ?? {}),
          alreadySubmitted: true,
        };
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
        createdAt: now,
        updatedAt: now,
        submittedAt: now,
      };
      const attemptDetailData = {
        id: attemptId,
        uid,
        classId,
        quizId,
        incorrectQuestionIds,
        createdAt: now,
        updatedAt: now,
      };

      transaction.set(attemptRef, attemptData);
      transaction.set(attemptDetailRef, attemptDetailData);

      return {
        attempt: quizAttemptFromData(attemptId, attemptData),
        alreadySubmitted: false,
      };
    });
  },
);
