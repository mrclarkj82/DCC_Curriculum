import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getHiddenFrameProgressSummary,
  getResolvedHiddenFrameFileState,
  isHiddenFrameFileAccessible,
  markHiddenFrameArchiveVisited,
  markHiddenFrameFileCompleted,
  markHiddenFrameFileUnlocked,
  readHiddenFrameProgress,
  resetHiddenFrameProgress,
  type HiddenFrameProgressSnapshot,
} from '../progress/hiddenFrameProgress';
import type { HiddenFrameFileRecord } from '../data/hiddenFrameFiles';

export function useHiddenFrameProgress() {
  const [progress, setProgress] = useState<HiddenFrameProgressSnapshot>(() =>
    readHiddenFrameProgress(),
  );

  useEffect(() => {
    setProgress(readHiddenFrameProgress());
  }, []);

  const visitArchive = useCallback(() => {
    setProgress(markHiddenFrameArchiveVisited());
  }, []);

  const unlockFile = useCallback((fileId: string) => {
    setProgress(markHiddenFrameFileUnlocked(fileId));
  }, []);

  const completeFile = useCallback((fileId: string) => {
    setProgress(markHiddenFrameFileCompleted(fileId));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(resetHiddenFrameProgress());
  }, []);

  const isFileUnlocked = useCallback(
    (fileId: string) => progress.unlockedFileIds.includes(fileId),
    [progress.unlockedFileIds],
  );

  const isFileCompleted = useCallback(
    (fileId: string) => progress.completedFileIds.includes(fileId),
    [progress.completedFileIds],
  );

  const hasRecoveredFrame = useCallback(
    (frameId: string) => progress.recoveredFrameIds.includes(frameId),
    [progress.recoveredFrameIds],
  );

  const getFileState = useCallback(
    (file: HiddenFrameFileRecord) => getResolvedHiddenFrameFileState(file, progress),
    [progress],
  );

  const canOpenFile = useCallback(
    (file: HiddenFrameFileRecord) => isHiddenFrameFileAccessible(file, progress),
    [progress],
  );

  const summary = useMemo(() => getHiddenFrameProgressSummary(progress), [progress]);

  return {
    progress,
    summary,
    visitArchive,
    unlockFile,
    completeFile,
    resetProgress,
    isFileUnlocked,
    isFileCompleted,
    hasRecoveredFrame,
    getFileState,
    canOpenFile,
  };
}
