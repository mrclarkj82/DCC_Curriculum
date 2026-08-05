import { limit, where } from 'firebase/firestore';
import type { BroadcastUpdate } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

export async function getBroadcastUpdates(): Promise<BroadcastUpdate[]> {
  return getCollectionRecords<BroadcastUpdate>('broadcastUpdates', [limit(100)]);
}

export async function getBroadcastUpdatesByProgramArea(
  programAreaId: string,
): Promise<BroadcastUpdate[]> {
  return getCollectionRecords<BroadcastUpdate>('broadcastUpdates', [
    where('programAreaId', '==', programAreaId),
    limit(100),
  ]);
}

export async function getBroadcastUpdateById(
  updateId: string,
): Promise<BroadcastUpdate | null> {
  return getDocumentRecord<BroadcastUpdate>('broadcastUpdates', updateId);
}
