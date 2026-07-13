import type { AssignmentGameDialogueState } from '../dialogueTypes';

interface AssignmentGameNpcLayerProps {
  dialogueState: AssignmentGameDialogueState;
}

export function AssignmentGameNpcLayer({ dialogueState }: AssignmentGameNpcLayerProps) {
  return (
    <div className="assignment-game-npc-layer" aria-label="NPC layer">
      {dialogueState.npcs.map((npc) => {
        const isNearby = dialogueState.nearbyNpcId === npc.id;
        const isActive = dialogueState.activeNpcId === npc.id;

        return (
          <div
            className={`assignment-game-npc${isNearby ? ' is-nearby' : ''}${
              isActive ? ' is-active' : ''
            }`}
            key={npc.id}
            style={{
              left: `${npc.position.x}%`,
              top: `${npc.position.y}%`,
            }}
            aria-label={`${npc.name}, ${npc.title}`}
            role="img"
            title={npc.description}
          >
            <span className="assignment-game-npc-sprite" aria-hidden="true" />
            <span className="assignment-game-npc-name" aria-hidden="true">
              {npc.name}
            </span>
            {isNearby && !dialogueState.isOpen && (
              <span className="assignment-game-npc-prompt" aria-hidden="true">
                Press E
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
