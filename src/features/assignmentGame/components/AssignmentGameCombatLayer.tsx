import type { AssignmentGameCombatState } from '../combatTypes';

interface AssignmentGameCombatLayerProps {
  combatState: AssignmentGameCombatState;
}

export function AssignmentGameCombatLayer({ combatState }: AssignmentGameCombatLayerProps) {
  return (
    <div className="assignment-game-combat-layer" aria-hidden="true">
      {combatState.activeSwordAttack && (
        <span
          className={`assignment-game-sword-arc assignment-game-sword-arc--${combatState.activeSwordAttack.direction}`}
          style={{
            left: `${combatState.activeSwordAttack.position.x}%`,
            top: `${combatState.activeSwordAttack.position.y}%`,
          }}
        />
      )}

      {combatState.energyBolts.map((bolt) => (
        <span
          className="assignment-game-energy-bolt"
          key={bolt.id}
          style={{
            left: `${bolt.position.x}%`,
            top: `${bolt.position.y}%`,
          }}
        />
      ))}
    </div>
  );
}
