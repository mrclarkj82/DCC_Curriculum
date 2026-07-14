import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { dccDocumentPath } from '../config/firestoreNamespace';
import { db } from '../firebase/client';
import {
  assignmentGameSaveSnapshotVersion,
  type AssignmentGameSaveContext,
  type AssignmentGameSaveDocument,
  type AssignmentGameSaveSnapshot,
} from '../features/assignmentGame/saveTypes';
import type { AssignmentGameFacingDirection } from '../features/assignmentGame/playerMovementTypes';
import type { AssignmentGameInventoryItemId } from '../features/assignmentGame/inventoryTypes';

function safePart(value: string): string {
  return value
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function makeAssignmentGameSaveId(context: AssignmentGameSaveContext): string {
  return [context.classId, context.targetType, context.targetId, context.uid]
    .map(safePart)
    .join('_');
}

function vectorFromData(data: unknown): { x: number; y: number } {
  const vector = data as { x?: unknown; y?: unknown };
  const x = Number(vector?.x);
  const y = Number(vector?.y);

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    throw new Error('Saved game position could not be read.');
  }

  return { x, y };
}

function facingDirectionFromData(data: unknown): AssignmentGameFacingDirection {
  if (data === 'north' || data === 'south' || data === 'east' || data === 'west') {
    return data;
  }

  return 'south';
}

function stringListFromData(data: unknown): string[] {
  return Array.isArray(data) ? data.map(String).filter(Boolean) : [];
}

function collectedItemIdsFromData(data: unknown): AssignmentGameInventoryItemId[] {
  const knownIds = new Set<AssignmentGameInventoryItemId>([
    'emberShard',
    'rustyKey',
    'lanternOil',
  ]);

  return stringListFromData(data).filter((itemId): itemId is AssignmentGameInventoryItemId =>
    knownIds.has(itemId as AssignmentGameInventoryItemId),
  );
}

function snapshotFromData(data: unknown): AssignmentGameSaveSnapshot {
  const snapshot = data as Partial<AssignmentGameSaveSnapshot>;
  const player = snapshot.player as { position?: unknown; facingDirection?: unknown } | undefined;

  return {
    snapshotVersion: assignmentGameSaveSnapshotVersion,
    levelId: String(snapshot.levelId ?? 'ruined-courtyard'),
    player: {
      position: vectorFromData(player?.position),
      facingDirection: facingDirectionFromData(player?.facingDirection),
    },
    defeatedEnemyIds: stringListFromData(snapshot.defeatedEnemyIds),
    collectedItemIds: collectedItemIdsFromData(snapshot.collectedItemIds),
  };
}

function saveDocumentFromData(
  fallbackId: string,
  data: Record<string, unknown>,
): AssignmentGameSaveDocument {
  return {
    id: String(data.id ?? fallbackId),
    uid: String(data.uid ?? ''),
    studentEmail: String(data.studentEmail ?? ''),
    classId: String(data.classId ?? ''),
    programAreaId: String(data.programAreaId ?? ''),
    targetType: data.targetType as AssignmentGameSaveContext['targetType'],
    targetId: String(data.targetId ?? ''),
    activeItemType: data.activeItemType as AssignmentGameSaveContext['activeItemType'],
    activeItemId: String(data.activeItemId ?? ''),
    submissionId: String(data.submissionId ?? ''),
    snapshot: snapshotFromData(data.snapshot),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function getAssignmentGameSave(
  context: AssignmentGameSaveContext,
): Promise<AssignmentGameSaveDocument | null> {
  const saveId = makeAssignmentGameSaveId(context);
  const snapshot = await getDoc(doc(db, dccDocumentPath('gameSaves', saveId)));

  if (!snapshot.exists()) {
    return null;
  }

  return saveDocumentFromData(snapshot.id, snapshot.data());
}

export async function saveAssignmentGameProgress(
  context: AssignmentGameSaveContext,
  snapshot: AssignmentGameSaveSnapshot,
): Promise<AssignmentGameSaveDocument> {
  const saveId = makeAssignmentGameSaveId(context);
  const saveRef = doc(db, dccDocumentPath('gameSaves', saveId));
  const existingSave = await getDoc(saveRef);
  const saveData = {
    id: saveId,
    ...context,
    snapshot,
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

  return {
    id: saveId,
    ...context,
    snapshot,
    createdAt: existingSave.exists() ? existingSave.data().createdAt : null,
    updatedAt: new Date().toISOString(),
  };
}
