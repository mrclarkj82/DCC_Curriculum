export type AssignmentGameFacingDirection = 'north' | 'south' | 'east' | 'west';

export interface AssignmentGameVector {
  x: number;
  y: number;
}

export interface AssignmentGameMovementBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface AssignmentGamePlayerState {
  position: AssignmentGameVector;
  facingDirection: AssignmentGameFacingDirection;
  isMoving: boolean;
  lastInputDirection: AssignmentGameVector;
}
