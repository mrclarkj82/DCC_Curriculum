import { limit, where } from 'firebase/firestore';
import type { MediaProject } from '../types';
import { getCollectionRecords, getDocumentRecord } from './firestoreService';

export async function getMediaProjects(): Promise<MediaProject[]> {
  return getCollectionRecords<MediaProject>('mediaProjects', [limit(100)]);
}

export async function getMediaProjectsByProgramArea(programAreaId: string): Promise<MediaProject[]> {
  return getCollectionRecords<MediaProject>('mediaProjects', [
    where('programAreaId', '==', programAreaId),
    limit(100),
  ]);
}

export async function getMediaProjectById(projectId: string): Promise<MediaProject | null> {
  return getDocumentRecord<MediaProject>('mediaProjects', projectId);
}
