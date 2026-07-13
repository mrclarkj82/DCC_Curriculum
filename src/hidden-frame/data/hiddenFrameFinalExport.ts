export const HIDDEN_FRAME_FINAL_FRAME_ID = 'frame-000';

export const hiddenFrameFinalPrerequisiteFrameIds = [
  'frame-001',
  'frame-002',
  'frame-003',
  'frame-004',
  'frame-005',
  'frame-006',
  'frame-007',
  'frame-008',
  'frame-009',
  'frame-010',
  'frame-011',
  'frame-012',
  'frame-013',
  'frame-014',
  'frame-015',
  'frame-016',
  'frame-017',
];

export const getHiddenFrameFinalExportStatus = (recoveredFrameIds: string[]) => {
  const recoveredPrerequisiteCount = hiddenFrameFinalPrerequisiteFrameIds.filter((frameId) =>
    recoveredFrameIds.includes(frameId),
  ).length;

  return {
    recoveredPrerequisiteCount,
    totalPrerequisiteCount: hiddenFrameFinalPrerequisiteFrameIds.length,
    canRevealFinalFrame:
      recoveredPrerequisiteCount === hiddenFrameFinalPrerequisiteFrameIds.length,
  };
};
