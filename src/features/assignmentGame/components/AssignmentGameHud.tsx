import { assignmentGameHudPlaceholders } from '../gameShellConstants';
import type { AssignmentGamePlayerState } from '../playerMovementTypes';

interface AssignmentGameHudProps {
  playerState: AssignmentGamePlayerState;
}

export function AssignmentGameHud({ playerState }: AssignmentGameHudProps) {
  const roundedX = Math.round(playerState.position.x);
  const roundedY = Math.round(playerState.position.y);

  return (
    <aside className="assignment-game-hud" aria-label="Game HUD placeholders">
      {assignmentGameHudPlaceholders.map((item) => (
        <div className="assignment-game-hud-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
      <div className="assignment-game-hud-item assignment-game-hud-item--movement">
        <span>Movement</span>
        <strong>
          {playerState.isMoving ? 'Moving' : 'Ready'} / {playerState.facingDirection} / {roundedX},
          {roundedY}
        </strong>
      </div>
    </aside>
  );
}
