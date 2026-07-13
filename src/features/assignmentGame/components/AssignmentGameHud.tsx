import { assignmentGameHudPlaceholders } from '../gameShellConstants';
import type { AssignmentGameCombatState } from '../combatTypes';
import type { AssignmentGameDialogueState } from '../dialogueTypes';
import type { AssignmentGameEnemiesState } from '../enemyTypes';
import type { AssignmentGameInventoryState } from '../inventoryTypes';
import type { AssignmentGamePlayerState } from '../playerMovementTypes';

interface AssignmentGameHudProps {
  combatState: AssignmentGameCombatState;
  dialogueState: AssignmentGameDialogueState;
  enemiesState: AssignmentGameEnemiesState;
  inventoryState: AssignmentGameInventoryState;
  playerState: AssignmentGamePlayerState;
}

function dialogueStatusText(dialogueState: AssignmentGameDialogueState): string {
  if (dialogueState.isOpen) {
    return `${dialogueState.activeNpc?.name}: ${dialogueState.activeLineIndex + 1}/${
      dialogueState.lineCount
    }`;
  }

  if (dialogueState.nearbyNpc) {
    return `Talk to ${dialogueState.nearbyNpc.name}`;
  }

  return 'Find the Lantern Keeper';
}

function inventoryStatusText(inventoryState: AssignmentGameInventoryState): string {
  if (!inventoryState.collectedItems.length) {
    return 'No items yet';
  }

  return inventoryState.collectedItems.map((item) => item.shortName).join(', ');
}

export function AssignmentGameHud({
  combatState,
  dialogueState,
  enemiesState,
  inventoryState,
  playerState,
}: AssignmentGameHudProps) {
  const roundedX = Math.round(playerState.position.x);
  const roundedY = Math.round(playerState.position.y);
  const contactDamage = enemiesState.enemies[0]?.contactDamage ?? 0;
  const dialogueStatus = dialogueStatusText(dialogueState);
  const inventoryStatus = inventoryStatusText(inventoryState);

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
      <div className="assignment-game-hud-item">
        <span>Enemies</span>
        <strong>
          {enemiesState.remainingCount} active / {enemiesState.defeatedCount} defeated
        </strong>
      </div>
      <div className="assignment-game-hud-item">
        <span>Contact</span>
        <strong>{contactDamage} dmg</strong>
      </div>
      <div className="assignment-game-hud-item">
        <span>Inventory</span>
        <strong>
          {inventoryState.collectedCount} / {inventoryState.totalCount}
        </strong>
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
      <div className="assignment-game-hud-item assignment-game-hud-item--enemies">
        <span>Enemy Status</span>
        <strong>{enemiesState.lastEnemyEvent}</strong>
      </div>
      <div className="assignment-game-hud-item assignment-game-hud-item--dialogue">
        <span>Dialogue</span>
        <strong>{dialogueStatus}</strong>
      </div>
      <div className="assignment-game-hud-item assignment-game-hud-item--inventory">
        <span>Items</span>
        <strong>{inventoryStatus}</strong>
      </div>
      <div className="assignment-game-hud-item assignment-game-hud-item--inventory">
        <span>Item Status</span>
        <strong>{inventoryState.lastInventoryEvent}</strong>
      </div>
    </aside>
  );
}
