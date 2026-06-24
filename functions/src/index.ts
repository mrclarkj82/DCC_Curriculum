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
