import type { User } from 'firebase/auth';
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase/client';
import type { UserProfile, UserRole } from '../types';

export const toUserRole = (role: unknown): UserRole =>
  role === 'teacher' || role === 'admin' || role === 'student' ? role : 'student';

export const userProfileFromData = (data: Record<string, unknown>): UserProfile => ({
  uid: String(data.uid ?? ''),
  displayName: String(data.displayName ?? ''),
  email: String(data.email ?? ''),
  photoURL: String(data.photoURL ?? ''),
  role: toUserRole(data.role),
  classIds: Array.isArray(data.classIds) ? data.classIds.map(String) : [],
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  lastLoginAt: data.lastLoginAt,
});

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists()) {
    return null;
  }

  return userProfileFromData(snapshot.data());
}

export async function createUserProfileIfNeeded(firebaseUser: User): Promise<void> {
  if (!firebaseUser.email) {
    throw new Error('A Google account email is required to create a user profile.');
  }

  const userRef = doc(db, 'users', firebaseUser.uid);
  const snapshot = await getDoc(userRef);
  const safeDisplayName = firebaseUser.displayName ?? '';
  const safePhotoURL = firebaseUser.photoURL ?? '';

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: firebaseUser.uid,
      displayName: safeDisplayName,
      email: firebaseUser.email,
      photoURL: safePhotoURL,
      role: 'student',
      classIds: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });
    return;
  }

  await updateDoc(userRef, {
    displayName: safeDisplayName,
    photoURL: safePhotoURL,
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  });
}

export async function updateLastLogin(firebaseUser: User): Promise<void> {
  await updateDoc(doc(db, 'users', firebaseUser.uid), {
    displayName: firebaseUser.displayName ?? '',
    photoURL: firebaseUser.photoURL ?? '',
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  });
}

export function subscribeToUserProfile(
  uid: string,
  onProfile: (profile: UserProfile | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, 'users', uid),
    (snapshot) => {
      onProfile(snapshot.exists() ? userProfileFromData(snapshot.data()) : null);
    },
    onError,
  );
}
