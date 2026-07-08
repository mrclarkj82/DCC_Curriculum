export {
  HIDDEN_FRAME_PUBLIC_BASE_PATH,
  hiddenFramePhase0AssetRoles,
  hiddenFramePhase0Assets,
  type HiddenFramePhase0AssetKey,
} from './hiddenFramePhase0Assets';
export { CompressionLog } from './components/CompressionLog';
export { FrameCard } from './components/FrameCard';
export { FrameCollectionGrid } from './components/FrameCollectionGrid';
export { HiddenFrameIcon, type HiddenFrameIconSize, type HiddenFrameIconVariant } from './components/HiddenFrameIcon';
export { HiddenFrameProgress } from './components/HiddenFrameProgress';
export { PasswordGate } from './components/PasswordGate';
export { RecoveredFileCard } from './components/RecoveredFileCard';
export { hiddenFrameRewardFrames, getHiddenFrameRewardFrameById, type HiddenFrameRewardFrame } from './data/hiddenFrameFrames';
export { hiddenFrameFiles, hiddenFramePuzzleFiles, getHiddenFrameFileById, type HiddenFrameFileRecord, type HiddenFrameFileState } from './data/hiddenFrameFiles';
export { useHiddenFrameProgress } from './hooks/useHiddenFrameProgress';
export {
  HIDDEN_FRAME_PROGRESS_STORAGE_KEY,
  HIDDEN_FRAME_PROGRESS_SCHEMA_VERSION,
  createInitialHiddenFrameProgress,
  getHiddenFrameProgressSummary,
  getResolvedHiddenFrameFileState,
  isHiddenFrameFileAccessible,
  markHiddenFrameArchiveVisited,
  markHiddenFrameFileCompleted,
  markHiddenFrameFileUnlocked,
  readHiddenFrameProgress,
  writeHiddenFrameProgress,
  type HiddenFrameProgressSnapshot,
  type HiddenFrameProgressSummary,
} from './progress/hiddenFrameProgress';
export {
  canCompleteHiddenFrameFile,
  completeHiddenFrameFileProgress,
  getHiddenFrameFileProgressState,
} from './progress/hiddenFrameProgressCore';
export { isHiddenFrameAnswerCorrect, normalizeHiddenFrameAnswer } from './utils/passwordGate';
