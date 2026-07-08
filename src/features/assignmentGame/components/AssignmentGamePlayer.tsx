import type { AssignmentGamePlayerState } from '../playerMovementTypes';

interface AssignmentGamePlayerProps {
  playerState: AssignmentGamePlayerState;
}

export function AssignmentGamePlayer({ playerState }: AssignmentGamePlayerProps) {
  const movementLabel = playerState.isMoving ? 'moving' : 'idle';

  return (
    <div
      className={`assignment-game-player assignment-game-player--${playerState.facingDirection}${
        playerState.isMoving ? ' is-moving' : ''
      }`}
      style={{
        left: `${playerState.position.x}%`,
        top: `${playerState.position.y}%`,
      }}
      aria-label={`Player ${movementLabel}, facing ${playerState.facingDirection}`}
      role="img"
    >
      <span className="assignment-game-player-sprite" aria-hidden="true" />
      <span className="assignment-game-player-shadow" aria-hidden="true" />
    </div>
  );
}
