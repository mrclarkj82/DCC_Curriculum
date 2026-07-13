export type HiddenFrameProgressFileState =
  | 'locked'
  | 'available'
  | 'unlocked'
  | 'completed'
  | 'future';

export interface HiddenFrameProgressFileDefinition {
  id: string;
  state: HiddenFrameProgressFileState;
  prerequisiteFileId?: string;
  unlocksFileId?: string;
  unlocksFileIds?: string[];
  rewardFrameId?: string;
}

export interface HiddenFrameProgressCoreSnapshot {
  unlockedFileIds: string[];
  completedFileIds: string[];
  recoveredFrameIds: string[];
  chainCompletedAt: string | null;
}

export function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.filter((value): value is string => typeof value === 'string')));
}

export function getHiddenFrameFileProgressState(
  file: HiddenFrameProgressFileDefinition,
  progress: Pick<HiddenFrameProgressCoreSnapshot, 'completedFileIds' | 'unlockedFileIds'>,
): HiddenFrameProgressFileState {
  if (file.state === 'future') {
    return 'future';
  }

  if (progress.completedFileIds.includes(file.id)) {
    return 'completed';
  }

  if (!file.prerequisiteFileId) {
    return file.state === 'locked' ? 'available' : file.state;
  }

  if (progress.unlockedFileIds.includes(file.id)) {
    return 'unlocked';
  }

  if (
    file.prerequisiteFileId &&
    progress.completedFileIds.includes(file.prerequisiteFileId)
  ) {
    return 'unlocked';
  }

  return 'locked';
}

export function canCompleteHiddenFrameFile(
  file: HiddenFrameProgressFileDefinition,
  progress: Pick<HiddenFrameProgressCoreSnapshot, 'completedFileIds' | 'unlockedFileIds'>,
): boolean {
  const state = getHiddenFrameFileProgressState(file, progress);
  return state === 'available' || state === 'unlocked' || state === 'completed';
}

export function completeHiddenFrameFileProgress(
  progress: HiddenFrameProgressCoreSnapshot,
  fileId: string,
  files: HiddenFrameProgressFileDefinition[],
  completedAt: string,
  chainFiles: HiddenFrameProgressFileDefinition[] = files.filter(
    (candidate) => candidate.state !== 'future',
  ),
): HiddenFrameProgressCoreSnapshot {
  const file = files.find((candidate) => candidate.id === fileId);

  if (!file || !canCompleteHiddenFrameFile(file, progress)) {
    return progress;
  }

  const unlockTargetIds = uniqueStrings(
    [file.unlocksFileId, ...(file.unlocksFileIds ?? [])].filter(
      (value): value is string => Boolean(value),
    ),
  );
  const completedFileIds = uniqueStrings([...progress.completedFileIds, file.id]);
  const unlockedFileIds = uniqueStrings(
    [...progress.unlockedFileIds, file.id, ...unlockTargetIds].filter(
      (value): value is string => Boolean(value),
    ),
  );
  const recoveredFrameIds = uniqueStrings(
    [...progress.recoveredFrameIds, file.rewardFrameId].filter(
      (value): value is string => Boolean(value),
    ),
  );
  const activeFileIds = chainFiles
    .filter((candidate) => candidate.state !== 'future')
    .map((candidate) => candidate.id);
  const chainIsComplete = activeFileIds.every((activeFileId) =>
    completedFileIds.includes(activeFileId),
  );

  return {
    unlockedFileIds,
    completedFileIds,
    recoveredFrameIds,
    chainCompletedAt: chainIsComplete ? progress.chainCompletedAt ?? completedAt : null,
  };
}
