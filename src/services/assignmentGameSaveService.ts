import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { dccDocumentPath } from '../config/firestoreNamespace';
import { db } from '../firebase/client';
import type { ActiveItemType, SubmissionTargetType } from '../types';
import type {
  AssignmentGameInventoryItem,
  AssignmentGameProgressSnapshot,
  AssignmentGameSaveData,
  AssignmentGameVector,
} from '../features/assignmentGame/types';

export interface AssignmentGameSaveContext {
  uid: string;
  classId: string;
  programAreaId: string;
  activeItemType: ActiveItemType;
  activeItemId: string;
  targetType: SubmissionTargetType;
  targetId: string;
  unlockSubmissionId: string;
}

export interface AssignmentGamePersistenceOptions {
  useLocalFallback?: boolean;
}

const localSavePrefix = 'dcc-assignment-game-save';

function safePart(value: string): string {
  return value
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function localStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function localSaveKey(uid: string, classId: string): string {
  return `${localSavePrefix}:${safePart(uid)}:${safePart(classId)}`;
}

function vectorFromData(value: unknown, fallback: AssignmentGameVector): AssignmentGameVector {
  const vector = value as Partial<AssignmentGameVector>;

  return {
    x: Number.isFinite(vector?.x) ? Number(vector.x) : fallback.x,
    y: Number.isFinite(vector?.y) ? Number(vector.y) : fallback.y,
  };
}

function inventoryItemFromData(value: unknown): AssignmentGameInventoryItem {
  const item = value as Partial<AssignmentGameInventoryItem>;

  return {
    id: String(item.id ?? ''),
    name: String(item.name ?? ''),
    description: String(item.description ?? ''),
  };
}

function saveDataFromRecord(id: string, data: Record<string, unknown>): AssignmentGameSaveData {
  return {
    id: String(data.id ?? id),
    uid: String(data.uid ?? ''),
    classId: String(data.classId ?? ''),
    programAreaId: String(data.programAreaId ?? ''),
    activeItemType: data.activeItemType as ActiveItemType,
    activeItemId: String(data.activeItemId ?? ''),
    targetType: data.targetType as SubmissionTargetType,
    targetId: String(data.targetId ?? ''),
    unlockSubmissionId: String(data.unlockSubmissionId ?? ''),
    currentLevelId: String(data.currentLevelId ?? 'ember-gate-approach'),
    checkpointId: String(data.checkpointId ?? 'ember-camp'),
    playerPosition: vectorFromData(data.playerPosition, { x: 86, y: 318 }),
    health: Number(data.health ?? 100),
    energy: Number(data.energy ?? 100),
    inventory: Array.isArray(data.inventory)
      ? data.inventory.map(inventoryItemFromData).filter((item) => item.id)
      : [],
    defeatedEnemyIds: Array.isArray(data.defeatedEnemyIds) ? data.defeatedEnemyIds.map(String) : [],
    collectedItemIds: Array.isArray(data.collectedItemIds) ? data.collectedItemIds.map(String) : [],
    progressionFlags:
      data.progressionFlags && typeof data.progressionFlags === 'object'
        ? (data.progressionFlags as Record<string, boolean>)
        : {},
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export function makeAssignmentGameSaveId(uid: string, classId: string): string {
  return [classId, uid].map(safePart).join('_');
}

function saveToLocalStorage(
  context: AssignmentGameSaveContext,
  progress: AssignmentGameProgressSnapshot,
) {
  if (!localStorageAvailable()) {
    return;
  }

  const id = makeAssignmentGameSaveId(context.uid, context.classId);
  const data: AssignmentGameSaveData = {
    id,
    uid: context.uid,
    classId: context.classId,
    programAreaId: context.programAreaId,
    activeItemType: context.activeItemType,
    activeItemId: context.activeItemId,
    targetType: context.targetType,
    targetId: context.targetId,
    unlockSubmissionId: context.unlockSubmissionId,
    ...progress,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(localSaveKey(context.uid, context.classId), JSON.stringify(data));
}

function loadFromLocalStorage(uid: string, classId: string): AssignmentGameSaveData | null {
  if (!localStorageAvailable()) {
    return null;
  }

  const rawSave = window.localStorage.getItem(localSaveKey(uid, classId));

  if (!rawSave) {
    return null;
  }

  try {
    return saveDataFromRecord(makeAssignmentGameSaveId(uid, classId), JSON.parse(rawSave));
  } catch {
    return null;
  }
}

export async function loadAssignmentGameSave(
  uid: string,
  classId: string,
  options: AssignmentGamePersistenceOptions = {},
): Promise<AssignmentGameSaveData | null> {
  if (options.useLocalFallback) {
    return loadFromLocalStorage(uid, classId);
  }

  try {
    const saveId = makeAssignmentGameSaveId(uid, classId);
    const snapshot = await getDoc(doc(db, dccDocumentPath('assignmentGameSaves', saveId)));

    if (!snapshot.exists()) {
      return null;
    }

    return saveDataFromRecord(snapshot.id, snapshot.data());
  } catch (error) {
    if (options.useLocalFallback) {
      return loadFromLocalStorage(uid, classId);
    }

    throw error;
  }
}

export async function saveAssignmentGameProgress(
  context: AssignmentGameSaveContext,
  progress: AssignmentGameProgressSnapshot,
  options: AssignmentGamePersistenceOptions = {},
): Promise<void> {
  if (options.useLocalFallback) {
    saveToLocalStorage(context, progress);
    return;
  }

  const saveId = makeAssignmentGameSaveId(context.uid, context.classId);
  const saveRef = doc(db, dccDocumentPath('assignmentGameSaves', saveId));
  const existingSave = await getDoc(saveRef);
  const saveData = {
    id: saveId,
    uid: context.uid,
    classId: context.classId,
    programAreaId: context.programAreaId,
    activeItemType: context.activeItemType,
    activeItemId: context.activeItemId,
    targetType: context.targetType,
    targetId: context.targetId,
    unlockSubmissionId: context.unlockSubmissionId,
    currentLevelId: progress.currentLevelId,
    checkpointId: progress.checkpointId,
    playerPosition: progress.playerPosition,
    health: progress.health,
    energy: progress.energy,
    inventory: progress.inventory,
    defeatedEnemyIds: progress.defeatedEnemyIds,
    collectedItemIds: progress.collectedItemIds,
    progressionFlags: progress.progressionFlags,
    updatedAt: serverTimestamp(),
  };

  await setDoc(
    saveRef,
    existingSave.exists()
      ? saveData
      : {
          ...saveData,
          createdAt: serverTimestamp(),
        },
    { merge: true },
  );
}
