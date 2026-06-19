import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase/client';
import type { ClassMembershipType, UserProfile, UserRole } from '../types';
import { userProfileFromData } from './userService';

const sortUsers = (users: UserProfile[]) =>
  [...users].sort((a, b) => {
    const first = a.displayName || a.email || a.uid;
    const second = b.displayName || b.email || b.uid;

    return first.localeCompare(second);
  });

const classMemberField = (membershipType: ClassMembershipType) =>
  membershipType === 'teacher' ? 'teacherIds' : 'studentIds';

export async function getAllUsers(): Promise<UserProfile[]> {
  const snapshot = await getDocs(collection(db, 'users'));

  return sortUsers(
    snapshot.docs.map((documentSnapshot) => userProfileFromData(documentSnapshot.data())),
  );
}

export function subscribeToUsers(
  onUsers: (users: UserProfile[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, 'users'),
    (snapshot) => {
      onUsers(
        sortUsers(
          snapshot.docs.map((documentSnapshot) => userProfileFromData(documentSnapshot.data())),
        ),
      );
    },
    onError,
  );
}

export async function updateUserRole(uid: string, role: UserRole): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    role,
    updatedAt: serverTimestamp(),
  });
}

export async function assignUserToClass(
  uid: string,
  classId: string,
  membershipType: ClassMembershipType,
): Promise<void> {
  const batch = writeBatch(db);
  const userRef = doc(db, 'users', uid);
  const classRef = doc(db, 'classes', classId);

  batch.update(userRef, {
    classIds: arrayUnion(classId),
    updatedAt: serverTimestamp(),
  });
  batch.update(classRef, {
    [classMemberField(membershipType)]: arrayUnion(uid),
    updatedAt: serverTimestamp(),
  });

  await batch.commit();
}

export async function removeUserFromClass(
  uid: string,
  classId: string,
  membershipType: ClassMembershipType,
): Promise<void> {
  const batch = writeBatch(db);
  const userRef = doc(db, 'users', uid);
  const classRef = doc(db, 'classes', classId);

  batch.update(userRef, {
    classIds: arrayRemove(classId),
    updatedAt: serverTimestamp(),
  });
  batch.update(classRef, {
    [classMemberField(membershipType)]: arrayRemove(uid),
    updatedAt: serverTimestamp(),
  });

  await batch.commit();
}
