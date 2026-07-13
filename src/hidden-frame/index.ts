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
export { LowerThirdClueCard } from './components/LowerThirdClueCard';
export { PasswordGate } from './components/PasswordGate';
export { RecoveredFileCard } from './components/RecoveredFileCard';
export { TimelineClueCard } from './components/TimelineClueCard';
export { TimelineTrack } from './components/TimelineTrack';
export { VideoStillClueCard } from './components/VideoStillClueCard';
export { hiddenFrameRewardFrames, getHiddenFrameRewardFrameById, type HiddenFrameRewardFrame } from './data/hiddenFrameFrames';
export {
  hiddenFrameCameraFiles,
  hiddenFrameFiles,
  hiddenFrameFirstChainFiles,
  hiddenFramePlayableFiles,
  hiddenFramePuzzleFiles,
  hiddenFrameVideoFiles,
  getHiddenFrameFileById,
  type HiddenFrameArcId,
  type HiddenFrameFileRecord,
  type HiddenFrameFileState,
} from './data/hiddenFrameFiles';
export {
  getHiddenFrameCameraClueById,
  hiddenFrameCameraClues,
  type HiddenFrameCameraClue,
  type HiddenFrameCompositionPrinciple,
} from './data/hiddenFrameCameraClues';
export {
  getHiddenFrameVideoClueById,
  hiddenFrameVideoClues,
  type HiddenFrameVideoClue,
  type HiddenFrameVideoClueType,
} from './data/hiddenFrameVideoClues';
export { CameraClueCard } from './components/CameraClueCard';
export { CameraClueGrid } from './components/CameraClueGrid';
export { CompositionGuideFrame } from './components/CompositionGuideFrame';
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
