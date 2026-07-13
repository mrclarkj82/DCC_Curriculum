import { assignmentGameHudPlaceholders } from '../gameShellConstants';
import type { AssignmentGameCombatState } from '../combatTypes';
import type { AssignmentGamePlayerState } from '../playerMovementTypes';

interface AssignmentGameHudProps {
  combatState: AssignmentGameCombatState;
  playerState: AssignmentGamePlayerState;
}

export function AssignmentGameHud({ combatState, playerState }: AssignmentGameHudProps) {
  const roundedX = Math.round(playerState.position.x);
  const roundedY = Math.round(playerState.position.y);

  return (
    <aside className="assignment-game-hud" aria-label="Game HUD">
      <div className="assignment-game-hud-item">
        <span>Health</span>
        <strong>{combatState.stats.playerHealth}</strong>
      </div>
      <div className="assignment-game-hud-item">
        <span>Sword</span>
        <strong>{combatState.stats.swordDamage} dmg</strong>
      </div>
      <div className="assignment-game-hud-item">
        <span>Energy Bolt</span>
        <strong>{combatState.stats.energyBoltDamage} dmg</strong>
      </div>
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
      <div className="assignment-game-hud-item assignment-game-hud-item--combat">
        <span>Combat</span>
        <strong>{combatState.isAttacking ? 'Attacking' : combatState.lastAction}</strong>
      </div>
    </aside>
  );
}
