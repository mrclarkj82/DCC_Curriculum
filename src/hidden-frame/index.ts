export {
  HIDDEN_FRAME_PUBLIC_BASE_PATH,
  hiddenFramePhase0AssetRoles,
  hiddenFramePhase0Assets,
  type HiddenFramePhase0AssetKey,
} from './hiddenFramePhase0Assets';
export { AchievementBadge } from './components/AchievementBadge';
export { AchievementGrid } from './components/AchievementGrid';
export { CompressionLog } from './components/CompressionLog';
export { FrameCard } from './components/FrameCard';
export { FrameCollectionGrid } from './components/FrameCollectionGrid';
export { HiddenFrameIcon, type HiddenFrameIconSize, type HiddenFrameIconVariant } from './components/HiddenFrameIcon';
export { HiddenFrameProgress } from './components/HiddenFrameProgress';
export { HiddenFrameResetPanel } from './components/HiddenFrameResetPanel';
export { LowerThirdClueCard } from './components/LowerThirdClueCard';
export { ObjectClueCard } from './components/ObjectClueCard';
export { ObjectClueGrid } from './components/ObjectClueGrid';
export { ObjectInspectionFrame } from './components/ObjectInspectionFrame';
export { PasswordGate } from './components/PasswordGate';
export { RecoveredFileCard } from './components/RecoveredFileCard';
export { TimelineClueCard } from './components/TimelineClueCard';
export { TimelineTrack } from './components/TimelineTrack';
export { UnrealClueCard } from './components/UnrealClueCard';
export { UnrealSignalGrid } from './components/UnrealSignalGrid';
export { UnrealViewportReadout } from './components/UnrealViewportReadout';
export { VideoStillClueCard } from './components/VideoStillClueCard';
export { hiddenFrameRewardFrames, getHiddenFrameRewardFrameById, type HiddenFrameRewardFrame } from './data/hiddenFrameFrames';
export {
  getEarnedHiddenFrameAchievementIds,
  getHiddenFrameAchievementById,
  hiddenFrameAchievements,
  isHiddenFrameAchievementEarned,
  type HiddenFrameAchievement,
  type HiddenFrameAchievementCriteria,
  type HiddenFrameAchievementProgressState,
} from './data/hiddenFrameAchievements';
export {
  hiddenFrameCameraFiles,
  hiddenFrameFiles,
  hiddenFrameFirstChainFiles,
  hiddenFrameObjectFiles,
  hiddenFramePlayableFiles,
  hiddenFramePuzzleFiles,
  hiddenFrameUnrealFiles,
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
  getHiddenFrameObjectClueById,
  hiddenFrameObjectClues,
  type HiddenFrameObjectClue,
  type HiddenFrameObjectConcept,
} from './data/hiddenFrameObjectClues';
export {
  getHiddenFrameUnrealClueById,
  hiddenFrameUnrealClues,
  type HiddenFrameUnrealClue,
  type HiddenFrameUnrealConcept,
} from './data/hiddenFrameUnrealClues';
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
  resetHiddenFrameProgress,
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
