import type { ProgramArea } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

export async function getProgramAreas(): Promise<ProgramArea[]> {
  const areas = await getCollectionRecords<ProgramArea>('programAreas');

  return areas.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProgramAreaById(programAreaId: string): Promise<ProgramArea | null> {
  return getDocumentRecord<ProgramArea>('programAreas', programAreaId);
}
