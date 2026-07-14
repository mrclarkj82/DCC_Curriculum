import type { SubmissionTargetType } from '../../types';

export type AssignmentGameGateId = 'ember-gate';
export type AssignmentGameAreaId = 'ruined-courtyard' | 'ember-gate-passage';

export interface AssignmentGameProgressionSnapshot {
  unlockedGateIds: AssignmentGameGateId[];
  unlockedAreaIds: AssignmentGameAreaId[];
  completedTargetIds: string[];
}

export interface AssignmentGameProgressionState extends AssignmentGameProgressionSnapshot {
  currentTargetId: string;
  currentTargetType: SubmissionTargetType | null;
  statusText: string;
  nextStepText: string;
}

const firstGateId: AssignmentGameGateId = 'ember-gate';
const firstAreaId: AssignmentGameAreaId = 'ruined-courtyard';
const firstUnlockedAreaId: AssignmentGameAreaId = 'ember-gate-passage';

const emptyProgressionSnapshot: AssignmentGameProgressionSnapshot = {
  unlockedGateIds: [],
  unlockedAreaIds: [firstAreaId],
  completedTargetIds: [],
};

function stringListFromData(data: unknown): string[] {
  return Array.isArray(data) ? data.map(String).filter(Boolean) : [];
}

export function createAssignmentGameProgressionSnapshot(
  completedTargetId: string,
): AssignmentGameProgressionSnapshot {
  if (!completedTargetId) {
    return emptyProgressionSnapshot;
  }

  return {
    unlockedGateIds: [firstGateId],
    unlockedAreaIds: [firstAreaId, firstUnlockedAreaId],
    completedTargetIds: [completedTargetId],
  };
}

export function normalizeAssignmentGameProgressionSnapshot(
  data: unknown,
  fallbackCompletedTargetId: string,
): AssignmentGameProgressionSnapshot {
  const progression = data as Partial<AssignmentGameProgressionSnapshot> | undefined;
  const completedTargetIds = stringListFromData(progression?.completedTargetIds);
  const completedTargetId = fallbackCompletedTargetId || completedTargetIds[0] || '';

  if (!completedTargetId) {
    return emptyProgressionSnapshot;
  }

  return createAssignmentGameProgressionSnapshot(completedTargetId);
}

export function createAssignmentGameProgressionState(
  snapshot: AssignmentGameProgressionSnapshot,
  currentTargetType: SubmissionTargetType | null,
  currentTargetId: string,
): AssignmentGameProgressionState {
  const firstGateIsOpen = snapshot.unlockedGateIds.includes(firstGateId);

  return {
    ...snapshot,
    currentTargetId,
    currentTargetType,
    statusText: firstGateIsOpen
      ? 'The Ember Gate is open for this verified assignment target.'
      : 'Complete the current assignment target to restore the Ember Gate.',
    nextStepText: firstGateIsOpen
      ? 'Gate Passage is restored. Future phases can place the next playable area beyond it.'
      : 'Return to Today and finish the required work before this path opens.',
  };
}
