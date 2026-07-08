export {
  HIDDEN_FRAME_PUBLIC_BASE_PATH,
  hiddenFramePhase0AssetRoles,
  hiddenFramePhase0Assets,
  type HiddenFramePhase0AssetKey,
} from './hiddenFramePhase0Assets';
export { CompressionLog } from './components/CompressionLog';
export { HiddenFrameIcon, type HiddenFrameIconSize, type HiddenFrameIconVariant } from './components/HiddenFrameIcon';
export { HiddenFrameProgress } from './components/HiddenFrameProgress';
export { PasswordGate } from './components/PasswordGate';
export { RecoveredFileCard } from './components/RecoveredFileCard';
export { hiddenFrameFiles, getHiddenFrameFileById, type HiddenFrameFileRecord, type HiddenFrameFileState } from './data/hiddenFrameFiles';
export { useHiddenFrameProgress } from './hooks/useHiddenFrameProgress';
export {
  HIDDEN_FRAME_PROGRESS_STORAGE_KEY,
  createInitialHiddenFrameProgress,
  getHiddenFrameProgressSummary,
  markHiddenFrameArchiveVisited,
  markHiddenFrameFileUnlocked,
  readHiddenFrameProgress,
  writeHiddenFrameProgress,
  type HiddenFrameProgressSnapshot,
  type HiddenFrameProgressSummary,
} from './progress/hiddenFrameProgress';
export { isHiddenFrameAnswerCorrect, normalizeHiddenFrameAnswer } from './utils/passwordGate';
