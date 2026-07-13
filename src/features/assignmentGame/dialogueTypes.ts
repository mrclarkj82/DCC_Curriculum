import type { AssignmentGameVector } from './playerMovementTypes';

export interface AssignmentGameDialogueLine {
  id: string;
  text: string;
}

export interface AssignmentGameNpcDefinition {
  id: string;
  name: string;
  title: string;
  description: string;
  position: AssignmentGameVector;
  interactionRadius: number;
  dialogue: readonly AssignmentGameDialogueLine[];
}

export interface AssignmentGameDialogueRuntimeState {
  activeNpcId: string | null;
  activeLineIndex: number;
  nearbyNpcId: string | null;
  lastDialogueEvent: string;
}

export interface AssignmentGameDialogueState extends AssignmentGameDialogueRuntimeState {
  activeNpc: AssignmentGameNpcDefinition | null;
  currentLine: AssignmentGameDialogueLine | null;
  isFinalLine: boolean;
  isOpen: boolean;
  lineCount: number;
  nearbyNpc: AssignmentGameNpcDefinition | null;
  npcs: readonly AssignmentGameNpcDefinition[];
}
