import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getHiddenFrameProgressSummary,
  markHiddenFrameArchiveVisited,
  markHiddenFrameFileUnlocked,
  readHiddenFrameProgress,
  type HiddenFrameProgressSnapshot,
} from '../progress/hiddenFrameProgress';

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

  const isFileUnlocked = useCallback(
    (fileId: string) => progress.unlockedFileIds.includes(fileId),
    [progress.unlockedFileIds],
  );

  const summary = useMemo(() => getHiddenFrameProgressSummary(progress), [progress]);

  return {
    progress,
    summary,
    visitArchive,
    unlockFile,
    isFileUnlocked,
  };
}
