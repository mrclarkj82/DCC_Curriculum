import type { AssignmentGameVector } from './playerMovementTypes';

export type AssignmentGameInventoryItemId = 'emberShard' | 'rustyKey' | 'lanternOil';
export type AssignmentGameInventoryItemStatus = 'available' | 'collected';

export interface AssignmentGameInventoryItemDefinition {
  id: AssignmentGameInventoryItemId;
  name: string;
  shortName: string;
  description: string;
  position: AssignmentGameVector;
  interactionRadius: number;
}

export interface AssignmentGameInventoryItemState
  extends AssignmentGameInventoryItemDefinition {
  status: AssignmentGameInventoryItemStatus;
}

export interface AssignmentGameInventoryState {
  items: readonly AssignmentGameInventoryItemState[];
  collectedItems: readonly AssignmentGameInventoryItemState[];
  collectedCount: number;
  totalCount: number;
  nearbyItem: AssignmentGameInventoryItemState | null;
  lastInventoryEvent: string;
}
