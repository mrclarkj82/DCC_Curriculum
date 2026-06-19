import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { dccCollectionPath, dccDocumentPath } from '../config/firestoreNamespace';
import { db } from '../firebase/client';

export function firestoreErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
}

function recordFromDocument<T extends { id: string }>(fallbackId: string, data: DocumentData): T {
  return {
    id: String(data.id ?? fallbackId),
    ...data,
  } as T;
}

export async function getCollectionRecords<T extends { id: string }>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
): Promise<T[]> {
  const collectionRef = collection(db, dccCollectionPath(collectionName));
  const snapshot = constraints.length
    ? await getDocs(query(collectionRef, ...constraints))
    : await getDocs(collectionRef);

  return snapshot.docs.map((documentSnapshot) =>
    recordFromDocument<T>(documentSnapshot.id, documentSnapshot.data()),
  );
}

export async function getDocumentRecord<T extends { id: string }>(
  collectionName: string,
  recordId: string,
): Promise<T | null> {
  const snapshot = await getDoc(doc(db, dccDocumentPath(collectionName, recordId)));

  if (!snapshot.exists()) {
    return null;
  }

  return recordFromDocument<T>(snapshot.id, snapshot.data());
}
