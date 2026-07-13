import type { AssignmentGameEnemiesState, AssignmentGameEnemyState } from '../enemyTypes';

interface AssignmentGameEnemyLayerProps {
  enemiesState: AssignmentGameEnemiesState;
}

function enemyHealthPercent(enemy: AssignmentGameEnemyState): number {
  return Math.round((enemy.health / enemy.maxHealth) * 100);
}

export function AssignmentGameEnemyLayer({ enemiesState }: AssignmentGameEnemyLayerProps) {
  return (
    <div className="assignment-game-enemy-layer" aria-label="Enemy layer">
      {enemiesState.enemies.map((enemy) => (
        <div
          className={`assignment-game-enemy assignment-game-enemy--${enemy.kind} assignment-game-enemy--${enemy.status}`}
          key={enemy.id}
          style={{
            left: `${enemy.position.x}%`,
            top: `${enemy.position.y}%`,
          }}
          aria-label={`${enemy.name}, ${enemy.status}, ${enemy.health} health`}
          role="img"
          title={enemy.description}
        >
          <span className="assignment-game-enemy-sprite" aria-hidden="true" />
          <span className="assignment-game-enemy-name" aria-hidden="true">
            {enemy.name}
          </span>
          <span className="assignment-game-enemy-health" aria-hidden="true">
            <span
              className="assignment-game-enemy-health-fill"
              style={{ width: `${enemyHealthPercent(enemy)}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
