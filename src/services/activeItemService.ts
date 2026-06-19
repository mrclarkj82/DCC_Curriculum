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
import { getAssignmentById, getAssignments } from './assignmentService';
import { getBroadcastUpdateById, getBroadcastUpdates } from './broadcastUpdateService';
import { getLessonById, getLessonsByProgramArea } from './lessonService';
import { getMediaProjectById, getMediaProjectsByProgramArea } from './mediaProjectService';
import { getProgramAreaById } from './programAreaService';
import { getQuizById, getQuizzes } from './quizService';

export const supportedActiveItemTypes: ActiveItemType[] = [
  'lesson',
  'assignment',
  'mediaProject',
  'broadcastUpdate',
  'quiz',
  'portfolioCheckpoint',
];

export interface ActiveItemOption {
  id: string;
  title: string;
  programAreaId: string;
  status?: string;
}

export interface ActiveItemValidationResult {
  isValid: boolean;
  message: string;
  item: ActiveClassItem | null;
}

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

const programAreaForRecord = (record: ActiveItemRecord, fallbackProgramAreaId: string): string => {
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

export async function resolveActiveItem(
  activeItemType: ActiveItemType,
  activeItemId: string,
  fallbackProgramAreaId = '',
): Promise<ActiveClassItem> {
  return getActiveItem(activeItemType, activeItemId, fallbackProgramAreaId);
}

const optionSort = (options: ActiveItemOption[]) =>
  [...options].sort((a, b) => a.title.localeCompare(b.title) || a.id.localeCompare(b.id));

const optionFromRecord = (
  record: Lesson | Assignment | MediaProject | BroadcastUpdate | Quiz,
): ActiveItemOption => ({
  id: record.id,
  title: record.title,
  programAreaId: record.programAreaId,
  status: 'status' in record ? record.status : undefined,
});

export async function getActiveItemOptions(
  activeProgramAreaId: string,
  activeItemType: ActiveItemType,
): Promise<ActiveItemOption[]> {
  if (activeItemType === 'portfolioCheckpoint') {
    return [];
  }

  if (activeItemType === 'lesson') {
    return optionSort((await getLessonsByProgramArea(activeProgramAreaId)).map(optionFromRecord));
  }

  if (activeItemType === 'assignment') {
    const assignments = await getAssignments();

    return optionSort(
      assignments
        .filter((assignment) => assignment.programAreaId === activeProgramAreaId)
        .map(optionFromRecord),
    );
  }

  if (activeItemType === 'mediaProject') {
    return optionSort(
      (await getMediaProjectsByProgramArea(activeProgramAreaId)).map(optionFromRecord),
    );
  }

  if (activeItemType === 'broadcastUpdate') {
    const updates = await getBroadcastUpdates();

    return optionSort(
      updates
        .filter((update) => update.programAreaId === activeProgramAreaId)
        .map(optionFromRecord),
    );
  }

  if (activeItemType === 'quiz') {
    const quizzes = await getQuizzes();

    return optionSort(
      quizzes.filter((quiz) => quiz.programAreaId === activeProgramAreaId).map(optionFromRecord),
    );
  }

  return [];
}

export async function validateActiveItem(
  activeProgramAreaId: string,
  activeItemType: ActiveItemType,
  activeItemId: string,
): Promise<ActiveItemValidationResult> {
  const programAreaId = activeProgramAreaId.trim();
  const itemId = activeItemId.trim();

  if (!programAreaId) {
    return { isValid: false, message: 'Choose a program area.', item: null };
  }

  const programArea = await getProgramAreaById(programAreaId);

  if (!programArea) {
    return {
      isValid: false,
      message: 'That program area does not exist in Firestore.',
      item: null,
    };
  }

  if (!supportedActiveItemTypes.includes(activeItemType)) {
    return { isValid: false, message: 'Choose a supported active item type.', item: null };
  }

  if (!itemId) {
    return { isValid: false, message: 'Choose or enter an active item ID.', item: null };
  }

  if (activeItemType === 'portfolioCheckpoint') {
    return {
      isValid: true,
      message: 'Portfolio checkpoint placeholder is valid.',
      item: {
        id: itemId,
        type: activeItemType,
        programAreaId,
        title: 'Portfolio checkpoint',
        status: 'placeholder',
        record: null,
      },
    };
  }

  const item = await resolveActiveItem(activeItemType, itemId, programAreaId);

  if (!item.record) {
    return {
      isValid: false,
      message: 'That active item ID does not exist in the matching Firestore collection.',
      item: null,
    };
  }

  if (item.programAreaId !== programAreaId) {
    return {
      isValid: false,
      message: 'That active item belongs to a different program area.',
      item: null,
    };
  }

  return { isValid: true, message: 'Active item is valid.', item };
}
