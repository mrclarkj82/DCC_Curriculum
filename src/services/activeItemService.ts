import type {
  ActiveClassItem,
  ActiveItemRecord,
  ActiveItemType,
  Assignment,
  BroadcastUpdate,
  Lesson,
  MediaProject,
  Quiz,
} from '../types';
import { getAssignmentById } from './assignmentService';
import { getBroadcastUpdateById } from './broadcastUpdateService';
import { getLessonById } from './lessonService';
import { getMediaProjectById } from './mediaProjectService';
import { getQuizById } from './quizService';

const titleForRecord = (record: ActiveItemRecord): string | undefined => {
  if (!record) {
    return undefined;
  }

  return 'title' in record ? record.title : undefined;
};

const statusForRecord = (record: ActiveItemRecord): string | undefined => {
  if (!record) {
    return undefined;
  }

  return 'status' in record ? record.status : undefined;
};

const programAreaForRecord = (
  record: ActiveItemRecord,
  fallbackProgramAreaId: string,
): string => {
  if (!record) {
    return fallbackProgramAreaId;
  }

  return 'programAreaId' in record ? record.programAreaId : fallbackProgramAreaId;
};

export async function getActiveItem(
  activeItemType: ActiveItemType,
  activeItemId: string,
  fallbackProgramAreaId = '',
): Promise<ActiveClassItem> {
  let record: ActiveItemRecord = null;

  if (activeItemType === 'lesson') {
    record = await getLessonById(activeItemId);
  }

  if (activeItemType === 'assignment') {
    record = await getAssignmentById(activeItemId);
  }

  if (activeItemType === 'mediaProject') {
    record = await getMediaProjectById(activeItemId);
  }

  if (activeItemType === 'broadcastUpdate') {
    record = await getBroadcastUpdateById(activeItemId);
  }

  if (activeItemType === 'quiz') {
    record = await getQuizById(activeItemId);
  }

  if (activeItemType === 'portfolioCheckpoint') {
    return {
      id: activeItemId,
      type: activeItemType,
      programAreaId: fallbackProgramAreaId,
      title: 'Portfolio checkpoint',
      status: 'placeholder',
      record: null,
    };
  }

  return {
    id: activeItemId,
    type: activeItemType,
    programAreaId: programAreaForRecord(record, fallbackProgramAreaId),
    title: titleForRecord(record),
    status: statusForRecord(record),
    record: record as Lesson | Assignment | MediaProject | BroadcastUpdate | Quiz | null,
  };
}
