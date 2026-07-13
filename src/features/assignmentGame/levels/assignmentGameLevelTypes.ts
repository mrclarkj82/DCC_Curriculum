import type { AssignmentGameMovementBounds, AssignmentGameVector } from '../playerMovementTypes';

export type AssignmentGameTileId =
  | 'stoneFloor'
  | 'crackedStoneFloor'
  | 'grassEdge'
  | 'dirtPath'
  | 'castleWall'
  | 'castleWallTop'
  | 'castleCorner'
  | 'stairs'
  | 'shadow'
  | 'waterOrVoid'
  | 'lockedBoundary';

export interface AssignmentGameLevelDimensions {
  columns: number;
  rows: number;
  tileSize: number;
}

export interface AssignmentGameTileAsset {
  label: string;
  src: string;
  fallbackBackground: string;
}

export interface AssignmentGameLevelZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AssignmentGameLevelFeature extends AssignmentGameLevelZone {
  tileId: AssignmentGameTileId;
  kind: 'entrance' | 'lockedGate' | 'boundary' | 'shadow';
}

export interface AssignmentGameLevel {
  id: string;
  name: string;
  objectiveText: string;
  dimensions: AssignmentGameLevelDimensions;
  playerSpawn: AssignmentGameVector;
  movementBounds: AssignmentGameMovementBounds;
  tileRows: readonly (readonly AssignmentGameTileId[])[];
  blockedZones: readonly AssignmentGameLevelZone[];
  features: readonly AssignmentGameLevelFeature[];
}
