import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  createNewAssignmentGameState,
  fireEnergyProjectile,
  performSwordAttack,
  restoreAssignmentGameStateFromSave,
  setAssignmentGameMode,
  snapshotAssignmentGameProgress,
  tickAssignmentGame,
} from '../../features/assignmentGame/gameLogic';
import { assignmentGameLevel, emptyInputState } from '../../features/assignmentGame/level';
import type {
  AssignmentGameInputState,
  AssignmentGameProgressSnapshot,
  AssignmentGameRuntimeState,
  AssignmentGameSaveData,
} from '../../features/assignmentGame/types';

interface AssignmentGameExperienceProps {
  initialSave: AssignmentGameSaveData | null;
  isSaveLoading: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  saveError: string | null;
  backHref: string;
  onSave: (progress: AssignmentGameProgressSnapshot) => Promise<void>;
}

function healthPercent(state: AssignmentGameRuntimeState): number {
  return Math.round((state.player.health / state.player.maxHealth) * 100);
}

function energyPercent(state: AssignmentGameRuntimeState): number {
  return Math.round((state.player.energy / state.player.maxEnergy) * 100);
}

function formatCooldown(value: number): string {
  return value <= 0 ? 'Ready' : `${Math.ceil(value / 100) / 10}s`;
}

function PlayerSprite() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path className="sprite-cloak" d="M10 42 L24 5 L38 42 Z" />
      <path className="sprite-face" d="M18 17 H30 V28 H18 Z" />
      <path className="sprite-blade" d="M33 10 L39 4 L42 7 L36 13 Z" />
      <path className="sprite-glow" d="M20 31 H28 L31 42 H17 Z" />
    </svg>
  );
}

function EnemySprite() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path className="enemy-shadow" d="M8 39 C13 14 35 14 40 39 Z" />
      <path className="enemy-eye" d="M16 24 H22 V29 H16 Z" />
      <path className="enemy-eye" d="M27 24 H33 V29 H27 Z" />
      <path className="enemy-fang" d="M19 33 L24 39 L29 33 Z" />
    </svg>
  );
}

function GuideSprite() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path className="guide-robe" d="M12 42 L18 12 L30 12 L36 42 Z" />
      <circle className="guide-orb" cx="24" cy="10" r="6" />
      <path className="guide-staff" d="M37 7 V43" />
    </svg>
  );
}

function CrestSprite() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        className="crest-shield"
        d="M24 5 L38 12 V24 C38 34 31 40 24 43 C17 40 10 34 10 24 V12 Z"
      />
      <path className="crest-mark" d="M24 13 L29 24 H24 L27 35 L18 22 H24 Z" />
    </svg>
  );
}

function PortalSprite() {
  return (
    <svg viewBox="0 0 64 88" aria-hidden="true">
      <path className="portal-arch" d="M10 80 V34 C10 15 54 15 54 34 V80 Z" />
      <path className="portal-light" d="M20 78 V36 C20 24 44 24 44 36 V78 Z" />
      <path className="portal-rune" d="M32 32 L40 48 H32 L36 64 L24 46 H32 Z" />
    </svg>
  );
}

function keyToMovement(key: string): keyof AssignmentGameInputState | null {
  const normalizedKey = key.toLowerCase();

  if (normalizedKey === 'arrowup' || normalizedKey === 'w') {
    return 'up';
  }

  if (normalizedKey === 'arrowdown' || normalizedKey === 's') {
    return 'down';
  }

  if (normalizedKey === 'arrowleft' || normalizedKey === 'a') {
    return 'left';
  }

  if (normalizedKey === 'arrowright' || normalizedKey === 'd') {
    return 'right';
  }

  return null;
}

export function AssignmentGameExperience({
  backHref,
  initialSave,
  isSaveLoading,
  isSaving,
  onSave,
  saveError,
  saveMessage,
}: AssignmentGameExperienceProps) {
  const [gameState, setGameState] = useState(() => createNewAssignmentGameState());
  const inputRef = useRef<AssignmentGameInputState>({ ...emptyInputState });
  const victorySavedRef = useRef(false);
  const hasSave = Boolean(initialSave);
  const visibleCollectibles = useMemo(
    () =>
      assignmentGameLevel.collectibles.filter(
        (collectible) => !gameState.collectedItemIds.includes(collectible.id),
      ),
    [gameState.collectedItemIds],
  );

  const handleSave = useCallback(
    async (state: AssignmentGameRuntimeState) => {
      await onSave(snapshotAssignmentGameProgress(state));
    },
    [onSave],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const movementKey = keyToMovement(event.key);

      if (movementKey) {
        inputRef.current = { ...inputRef.current, [movementKey]: true };
        event.preventDefault();
        return;
      }

      if (event.key.toLowerCase() === 'j' || event.key === ' ') {
        setGameState((current) => performSwordAttack(current));
        event.preventDefault();
      }

      if (event.key.toLowerCase() === 'k') {
        setGameState((current) => fireEnergyProjectile(current));
        event.preventDefault();
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      const movementKey = keyToMovement(event.key);

      if (movementKey) {
        inputRef.current = { ...inputRef.current, [movementKey]: false };
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState.mode !== 'playing') {
      return undefined;
    }

    let frameId = 0;
    let lastFrame = performance.now();

    const step = (timestamp: number) => {
      const deltaMs = timestamp - lastFrame;
      lastFrame = timestamp;
      setGameState((current) => tickAssignmentGame(current, inputRef.current, deltaMs));
      frameId = window.requestAnimationFrame(step);
    };

    frameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frameId);
  }, [gameState.mode]);

  useEffect(() => {
    if (gameState.mode !== 'victory' || victorySavedRef.current) {
      return;
    }

    victorySavedRef.current = true;
    void handleSave(gameState);
  }, [gameState, handleSave]);

  const startNewGame = () => {
    victorySavedRef.current = false;
    inputRef.current = { ...emptyInputState };
    setGameState(setAssignmentGameMode(createNewAssignmentGameState(), 'playing'));
  };

  const continueGame = () => {
    victorySavedRef.current = false;
    inputRef.current = { ...emptyInputState };
    setGameState(setAssignmentGameMode(restoreAssignmentGameStateFromSave(initialSave), 'playing'));
  };

  const returnToMenu = () => {
    inputRef.current = { ...emptyInputState };
    setGameState((current) => setAssignmentGameMode(current, 'menu'));
  };

  return (
    <section className="assignment-game-shell" aria-label="Assignment game vertical slice">
      <div className="assignment-game-menu">
        <div>
          <p className="retro-label">Unlocked Assignment Game</p>
          <h2>Ember Gate</h2>
          <p className="muted">
            A medieval action prototype that continues as assignment progress unlocks future areas.
          </p>
        </div>
        <div className="assignment-game-menu-actions">
          <button className="gradient-button" type="button" onClick={startNewGame}>
            New Game
          </button>
          <button
            className="secondary-button"
            type="button"
            disabled={!hasSave || isSaveLoading}
            onClick={continueGame}
          >
            Continue
          </button>
          <Link className="outline-button" to={backHref}>
            Back to Assignments
          </Link>
        </div>
      </div>

      <div className="assignment-game-hud">
        <div>
          <span>Health</span>
          <strong>{healthPercent(gameState)}%</strong>
          <meter min="0" max="100" value={gameState.player.health} />
        </div>
        <div>
          <span>Energy</span>
          <strong>{energyPercent(gameState)}%</strong>
          <meter min="0" max="100" value={gameState.player.energy} />
        </div>
        <div>
          <span>Sword</span>
          <strong>{formatCooldown(gameState.player.swordCooldownMs)}</strong>
        </div>
        <div>
          <span>Bolt</span>
          <strong>{formatCooldown(gameState.player.projectileCooldownMs)}</strong>
        </div>
        <div>
          <span>Goal</span>
          <strong>{gameState.progressionFlags.levelOneCleared ? 'Cleared' : 'Open Gate'}</strong>
        </div>
      </div>

      <div className="assignment-game-stage-wrap">
        <div
          className={`assignment-game-stage is-${gameState.mode}`}
          style={{
            width: assignmentGameLevel.width,
            height: assignmentGameLevel.height,
          }}
        >
          <div className="assignment-game-terrain assignment-game-terrain--courtyard" />
          <div className="assignment-game-terrain assignment-game-terrain--water" />
          <div className="assignment-game-terrain assignment-game-terrain--ruin-one" />
          <div className="assignment-game-terrain assignment-game-terrain--ruin-two" />
          <div
            className={`assignment-game-portal ${
              gameState.progressionFlags.emberGateReady ? 'is-ready' : ''
            }`}
            style={{
              left: assignmentGameLevel.portal.position.x,
              top: assignmentGameLevel.portal.position.y,
            }}
            title={assignmentGameLevel.portal.name}
          >
            <PortalSprite />
          </div>
          <div
            className="assignment-game-guide"
            style={{
              left: assignmentGameLevel.guide.position.x,
              top: assignmentGameLevel.guide.position.y,
            }}
            title={assignmentGameLevel.guide.name}
          >
            <GuideSprite />
          </div>
          {visibleCollectibles.map((collectible) => (
            <div
              className="assignment-game-collectible"
              key={collectible.id}
              style={{ left: collectible.position.x, top: collectible.position.y }}
              title={collectible.item.name}
            >
              <CrestSprite />
            </div>
          ))}
          {gameState.enemies.map((enemy) => (
            <div
              className={`assignment-game-enemy ${enemy.alive ? '' : 'is-defeated'}`}
              key={enemy.id}
              style={{ left: enemy.position.x, top: enemy.position.y }}
              title={enemy.name}
            >
              <EnemySprite />
              {enemy.alive && (
                <span
                  className="assignment-game-healthbar"
                  style={{ width: `${Math.max(0, (enemy.health / enemy.maxHealth) * 100)}%` }}
                />
              )}
            </div>
          ))}
          {gameState.projectiles.map((projectile) => (
            <span
              className="assignment-game-projectile"
              key={projectile.id}
              style={{ left: projectile.position.x, top: projectile.position.y }}
            />
          ))}
          <div
            className={`assignment-game-player facing-${gameState.player.facing}`}
            style={{ left: gameState.player.position.x, top: gameState.player.position.y }}
          >
            <PlayerSprite />
          </div>
          {gameState.mode === 'menu' && (
            <div className="assignment-game-overlay">
              <h3>{assignmentGameLevel.title}</h3>
              <p>{assignmentGameLevel.subtitle}</p>
              <p className="meta-line">WASD/Arrows move / J or Space sword / K energy bolt</p>
            </div>
          )}
          {gameState.mode === 'victory' && (
            <div className="assignment-game-overlay">
              <h3>Gate Opened</h3>
              <p>The first chapter is complete. Your checkpoint is being saved.</p>
            </div>
          )}
          {gameState.mode === 'defeated' && (
            <div className="assignment-game-overlay">
              <h3>Returned to Camp</h3>
              <p>Start a new run or continue from your last save.</p>
            </div>
          )}
        </div>
      </div>

      <div className="assignment-game-control-panel">
        <div className="assignment-game-dialogue">
          <p className="retro-label">{assignmentGameLevel.guide.name}</p>
          <p>{gameState.dialogue}</p>
          <p className="meta-line">{gameState.message}</p>
        </div>
        <div className="assignment-game-actions">
          <button
            className="secondary-button"
            type="button"
            disabled={gameState.mode !== 'playing'}
            onClick={() => setGameState((current) => performSwordAttack(current))}
          >
            Sword
          </button>
          <button
            className="secondary-button"
            type="button"
            disabled={gameState.mode !== 'playing'}
            onClick={() => setGameState((current) => fireEnergyProjectile(current))}
          >
            Energy Bolt
          </button>
          <button
            className="outline-button"
            type="button"
            disabled={gameState.mode === 'menu' || isSaving}
            onClick={() => void handleSave(gameState)}
          >
            {isSaving ? 'Saving...' : 'Save Checkpoint'}
          </button>
          <button
            className="ghost-button"
            type="button"
            disabled={gameState.mode === 'menu'}
            onClick={returnToMenu}
          >
            Menu
          </button>
        </div>
        <div className="assignment-game-inventory">
          <p className="retro-label">Inventory</p>
          {gameState.inventory.length ? (
            <ul>
              {gameState.inventory.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No items collected yet.</p>
          )}
          {saveMessage && <p className="form-message">{saveMessage}</p>}
          {saveError && <p className="form-message error-text">{saveError}</p>}
        </div>
      </div>
    </section>
  );
}
