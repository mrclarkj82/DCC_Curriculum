import {
  getEarnedHiddenFrameAchievementIds,
  hiddenFrameAchievements,
} from '../data/hiddenFrameAchievements';
import { hiddenFrameRewardFrames } from '../data/hiddenFrameFrames';
import { hiddenFrameFiles, hiddenFrameFirstChainFiles } from '../data/hiddenFrameFiles';
import {
  completeHiddenFrameFileProgress,
  getHiddenFrameFileProgressState,
  uniqueStrings,
} from './hiddenFrameProgressCore';
import type { HiddenFrameFileRecord, HiddenFrameFileState } from '../data/hiddenFrameFiles';

export interface HiddenFrameProgressSnapshot {
  schemaVersion: 3;
  archiveVisited: boolean;
  unlockedFileIds: string[];
  completedFileIds: string[];
  recoveredFrameIds: string[];
  achievementIds: string[];
  firstVisitedAt: string | null;
  chainCompletedAt: string | null;
  updatedAt: string | null;
}

export interface HiddenFrameProgressSummary {
  archiveInitialized: boolean;
  unlockedFileCount: number;
  completedFileCount: number;
  recoveredFrameCount: number;
  totalFrameCount: number;
  achievementCount: number;
  totalAchievementCount: number;
  chainComplete: boolean;
  allCurrentFramesRecovered: boolean;
}

export const HIDDEN_FRAME_PROGRESS_STORAGE_KEY = 'dcc.hiddenFrame.phase1Progress';
export const HIDDEN_FRAME_PROGRESS_SCHEMA_VERSION = 3;

const DEFAULT_UNLOCKED_FILE_IDS = ['001'];

export const createInitialHiddenFrameProgress = (): HiddenFrameProgressSnapshot => ({
  schemaVersion: HIDDEN_FRAME_PROGRESS_SCHEMA_VERSION,
  archiveVisited: false,
  unlockedFileIds: [...DEFAULT_UNLOCKED_FILE_IDS],
  completedFileIds: [],
  recoveredFrameIds: [],
  achievementIds: [],
  firstVisitedAt: null,
  chainCompletedAt: null,
  updatedAt: null,
});

const canUseLocalStorage = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const knownFileIds = hiddenFrameFiles.map((file) => file.id);
const knownFrameIds = hiddenFrameRewardFrames.map((frame) => frame.id);
const knownAchievementIds = hiddenFrameAchievements.map((achievement) => achievement.id);

const onlyKnownIds = (values: string[], knownIds: string[]): string[] =>
  uniqueStrings(values).filter((value) => knownIds.includes(value));

const getStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const normalizeProgress = (value: unknown): HiddenFrameProgressSnapshot => {
  if (!value || typeof value !== 'object') {
    return createInitialHiddenFrameProgress();
  }

  const progress = value as Partial<HiddenFrameProgressSnapshot>;
  const sourceSchemaVersion =
    typeof progress.schemaVersion === 'number' ? progress.schemaVersion : 1;
  const isLegacyPhaseOneProgress = sourceSchemaVersion < 2;
  const rawUnlockedFileIds = getStringArray(progress.unlockedFileIds);
  const legacyCompletedFileIds = isLegacyPhaseOneProgress ? rawUnlockedFileIds : [];
  const completedFileIds = onlyKnownIds(
    [...getStringArray(progress.completedFileIds), ...legacyCompletedFileIds],
    knownFileIds,
  );
  const unlockedFromCompleted = completedFileIds.flatMap((fileId) => {
    const file = hiddenFrameFiles.find((candidate) => candidate.id === fileId);
    return [fileId, file?.unlocksFileId, ...(file?.unlocksFileIds ?? [])].filter(
      (candidate): candidate is string => Boolean(candidate),
    );
  });
  const recoveredFromCompleted = completedFileIds.flatMap((fileId) => {
    const file = hiddenFrameFiles.find((candidate) => candidate.id === fileId);
    return file?.rewardFrameId ? [file.rewardFrameId] : [];
  });
  const unlockedFileIds = onlyKnownIds(
    [...DEFAULT_UNLOCKED_FILE_IDS, ...rawUnlockedFileIds, ...unlockedFromCompleted],
    knownFileIds,
  );
  const recoveredFrameIds = onlyKnownIds(
    [...getStringArray(progress.recoveredFrameIds), ...recoveredFromCompleted],
    knownFrameIds,
  );
  const earnedAchievementIds = getEarnedHiddenFrameAchievementIds({
    archiveVisited: Boolean(progress.archiveVisited),
    completedFileIds,
    recoveredFrameIds,
  });
  const achievementIds = onlyKnownIds(
    [...getStringArray(progress.achievementIds), ...earnedAchievementIds],
    knownAchievementIds,
  );
  const chainComplete = hiddenFrameFirstChainFiles.every((file) =>
    completedFileIds.includes(file.id),
  );

  return {
    schemaVersion: HIDDEN_FRAME_PROGRESS_SCHEMA_VERSION,
    archiveVisited: Boolean(progress.archiveVisited),
    unlockedFileIds,
    completedFileIds,
    recoveredFrameIds,
    achievementIds,
    firstVisitedAt: typeof progress.firstVisitedAt === 'string' ? progress.firstVisitedAt : null,
    chainCompletedAt:
      chainComplete && typeof progress.chainCompletedAt === 'string'
        ? progress.chainCompletedAt
        : null,
    updatedAt: typeof progress.updatedAt === 'string' ? progress.updatedAt : null,
  };
};

export const readHiddenFrameProgress = (): HiddenFrameProgressSnapshot => {
  if (!canUseLocalStorage()) {
    return createInitialHiddenFrameProgress();
  }

  const rawProgress = window.localStorage.getItem(HIDDEN_FRAME_PROGRESS_STORAGE_KEY);

  if (!rawProgress) {
    return createInitialHiddenFrameProgress();
  }

  try {
    return normalizeProgress(JSON.parse(rawProgress));
  } catch {
    return createInitialHiddenFrameProgress();
  }
};

export const writeHiddenFrameProgress = (
  progress: HiddenFrameProgressSnapshot,
): HiddenFrameProgressSnapshot => {
  const normalizedProgress = normalizeProgress({
    ...progress,
    updatedAt: new Date().toISOString(),
  });

  if (canUseLocalStorage()) {
    window.localStorage.setItem(
      HIDDEN_FRAME_PROGRESS_STORAGE_KEY,
      JSON.stringify(normalizedProgress),
    );
  }

  return normalizedProgress;
};

export const markHiddenFrameArchiveVisited = (): HiddenFrameProgressSnapshot => {
  const progress = readHiddenFrameProgress();

  if (progress.archiveVisited) {
    return progress;
  }

  const visitedAt = new Date().toISOString();

  return writeHiddenFrameProgress({
    ...progress,
    archiveVisited: true,
    firstVisitedAt: progress.firstVisitedAt ?? visitedAt,
  });
};

export const markHiddenFrameFileUnlocked = (fileId: string): HiddenFrameProgressSnapshot => {
  const progress = readHiddenFrameProgress();

  if (progress.unlockedFileIds.includes(fileId)) {
    return progress;
  }

  return writeHiddenFrameProgress({
    ...progress,
    unlockedFileIds: [...progress.unlockedFileIds, fileId],
  });
};

export const markHiddenFrameFileCompleted = (fileId: string): HiddenFrameProgressSnapshot => {
  const progress = readHiddenFrameProgress();
  const completedAt = new Date().toISOString();
  const nextProgress = completeHiddenFrameFileProgress(
    progress,
    fileId,
    hiddenFrameFiles,
    completedAt,
    hiddenFrameFirstChainFiles,
  );

  if (nextProgress === progress) {
    return progress;
  }

  return writeHiddenFrameProgress({
    ...progress,
    ...nextProgress,
  });
};

export const markHiddenFrameFrameRecovered = (frameId: string): HiddenFrameProgressSnapshot => {
  const progress = readHiddenFrameProgress();

  if (!knownFrameIds.includes(frameId) || progress.recoveredFrameIds.includes(frameId)) {
    return progress;
  }

  return writeHiddenFrameProgress({
    ...progress,
    recoveredFrameIds: [...progress.recoveredFrameIds, frameId],
  });
};

export const resetHiddenFrameProgress = (): HiddenFrameProgressSnapshot => {
  const nextProgress = createInitialHiddenFrameProgress();

  if (canUseLocalStorage()) {
    window.localStorage.setItem(
      HIDDEN_FRAME_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        ...nextProgress,
        updatedAt: new Date().toISOString(),
      }),
    );
  }

  return readHiddenFrameProgress();
};

export const getResolvedHiddenFrameFileState = (
  file: HiddenFrameFileRecord,
  progress: HiddenFrameProgressSnapshot,
): HiddenFrameFileState => getHiddenFrameFileProgressState(file, progress);

export const isHiddenFrameFileAccessible = (
  file: HiddenFrameFileRecord,
  progress: HiddenFrameProgressSnapshot,
): boolean => {
  const state = getResolvedHiddenFrameFileState(file, progress);
  return state === 'available' || state === 'unlocked' || state === 'completed';
};

export const getHiddenFrameProgressSummary = (
  progress: HiddenFrameProgressSnapshot,
): HiddenFrameProgressSummary => ({
  archiveInitialized: progress.archiveVisited,
  unlockedFileCount: progress.unlockedFileIds.length,
  completedFileCount: progress.completedFileIds.length,
  recoveredFrameCount: progress.recoveredFrameIds.length,
  totalFrameCount: hiddenFrameRewardFrames.length,
  achievementCount: progress.achievementIds.length,
  totalAchievementCount: hiddenFrameAchievements.length,
  chainComplete: hiddenFrameFirstChainFiles.every((file) =>
    progress.completedFileIds.includes(file.id),
  ),
  allCurrentFramesRecovered: hiddenFrameRewardFrames.every((frame) =>
    progress.recoveredFrameIds.includes(frame.id),
  ),
});
