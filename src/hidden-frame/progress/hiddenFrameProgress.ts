export interface HiddenFrameProgressSnapshot {
  archiveVisited: boolean;
  unlockedFileIds: string[];
  updatedAt: string | null;
}

export interface HiddenFrameProgressSummary {
  archiveInitialized: boolean;
  unlockedFileCount: number;
}

export const HIDDEN_FRAME_PROGRESS_STORAGE_KEY = 'dcc.hiddenFrame.phase1Progress';

export const createInitialHiddenFrameProgress = (): HiddenFrameProgressSnapshot => ({
  archiveVisited: false,
  unlockedFileIds: [],
  updatedAt: null,
});

const canUseLocalStorage = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const normalizeProgress = (value: unknown): HiddenFrameProgressSnapshot => {
  if (!value || typeof value !== 'object') {
    return createInitialHiddenFrameProgress();
  }

  const progress = value as Partial<HiddenFrameProgressSnapshot>;

  return {
    archiveVisited: Boolean(progress.archiveVisited),
    unlockedFileIds: Array.isArray(progress.unlockedFileIds)
      ? progress.unlockedFileIds.filter((fileId): fileId is string => typeof fileId === 'string')
      : [],
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

  return writeHiddenFrameProgress({
    ...progress,
    archiveVisited: true,
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

export const getHiddenFrameProgressSummary = (
  progress: HiddenFrameProgressSnapshot,
): HiddenFrameProgressSummary => ({
  archiveInitialized: progress.archiveVisited,
  unlockedFileCount: progress.unlockedFileIds.length,
});
