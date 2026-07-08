import { assignmentGameLevel } from './level';
import type {
  AssignmentGameDirection,
  AssignmentGameInputState,
  AssignmentGameProgressSnapshot,
  AssignmentGameRuntimeState,
  AssignmentGameSaveData,
  AssignmentGameVector,
} from './types';

const playerSpeed = 142;
const swordDamage = 36;
const swordRange = 62;
const swordCooldownMs = 420;
const projectileDamage = 18;
const projectileCost = 20;
const projectileCooldownMs = 520;
const projectileSpeed = 360;
const playerRadius = 18;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function distance(a: AssignmentGameVector, b: AssignmentGameVector): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function normalize(vector: AssignmentGameVector): AssignmentGameVector {
  const length = Math.hypot(vector.x, vector.y);

  if (!length) {
    return { x: 0, y: 0 };
  }

  return { x: vector.x / length, y: vector.y / length };
}

function directionVector(direction: AssignmentGameDirection): AssignmentGameVector {
  if (direction === 'up') {
    return { x: 0, y: -1 };
  }

  if (direction === 'down') {
    return { x: 0, y: 1 };
  }

  if (direction === 'left') {
    return { x: -1, y: 0 };
  }

  return { x: 1, y: 0 };
}

function cloneState(state: AssignmentGameRuntimeState): AssignmentGameRuntimeState {
  return {
    ...state,
    player: { ...state.player, position: { ...state.player.position } },
    enemies: state.enemies.map((enemy) => ({
      ...enemy,
      position: { ...enemy.position },
    })),
    projectiles: state.projectiles.map((projectile) => ({
      ...projectile,
      position: { ...projectile.position },
      velocity: { ...projectile.velocity },
    })),
    inventory: state.inventory.map((item) => ({ ...item })),
    defeatedEnemyIds: [...state.defeatedEnemyIds],
    collectedItemIds: [...state.collectedItemIds],
    progressionFlags: { ...state.progressionFlags },
  };
}

function makeEnemies(defeatedEnemyIds: string[] = []) {
  return assignmentGameLevel.enemies.map((enemy) => {
    const defeated = defeatedEnemyIds.includes(enemy.id);

    return {
      ...enemy,
      health: defeated ? 0 : enemy.maxHealth,
      attackCooldownMs: 0,
      alive: !defeated,
    };
  });
}

function baseState(): AssignmentGameRuntimeState {
  return {
    mode: 'menu',
    currentLevelId: assignmentGameLevel.id,
    checkpointId: 'ember-camp',
    player: {
      position: { ...assignmentGameLevel.playerSpawn },
      facing: 'right',
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      swordCooldownMs: 0,
      projectileCooldownMs: 0,
    },
    enemies: makeEnemies(),
    projectiles: [],
    inventory: [],
    defeatedEnemyIds: [],
    collectedItemIds: [],
    progressionFlags: {
      introDialogueSeen: false,
      emberGateReady: false,
      levelOneCleared: false,
    },
    message: 'Speak with Aldric, then clear the shades near the Ember Gate.',
    dialogue: assignmentGameLevel.guide.dialogue[0],
    elapsedMs: 0,
    sequence: 0,
  };
}

export function createNewAssignmentGameState(): AssignmentGameRuntimeState {
  return baseState();
}

export function restoreAssignmentGameStateFromSave(
  saveData: AssignmentGameSaveData | null,
): AssignmentGameRuntimeState {
  const next = baseState();

  if (!saveData) {
    return next;
  }

  return {
    ...next,
    currentLevelId: saveData.currentLevelId || assignmentGameLevel.id,
    checkpointId: saveData.checkpointId || 'ember-camp',
    player: {
      ...next.player,
      position: {
        x: clamp(saveData.playerPosition.x, playerRadius, assignmentGameLevel.width - playerRadius),
        y: clamp(
          saveData.playerPosition.y,
          playerRadius,
          assignmentGameLevel.height - playerRadius,
        ),
      },
      health: clamp(saveData.health, 1, next.player.maxHealth),
      energy: clamp(saveData.energy, 0, next.player.maxEnergy),
    },
    enemies: makeEnemies(saveData.defeatedEnemyIds),
    inventory: saveData.inventory.map((item) => ({ ...item })),
    defeatedEnemyIds: [...saveData.defeatedEnemyIds],
    collectedItemIds: [...saveData.collectedItemIds],
    progressionFlags: {
      ...next.progressionFlags,
      ...saveData.progressionFlags,
    },
    message: 'Checkpoint loaded. The Ember Gate remembers your progress.',
  };
}

export function snapshotAssignmentGameProgress(
  state: AssignmentGameRuntimeState,
): AssignmentGameProgressSnapshot {
  return {
    currentLevelId: state.currentLevelId,
    checkpointId: state.checkpointId,
    playerPosition: { ...state.player.position },
    health: state.player.health,
    energy: state.player.energy,
    inventory: state.inventory.map((item) => ({ ...item })),
    defeatedEnemyIds: [...state.defeatedEnemyIds],
    collectedItemIds: [...state.collectedItemIds],
    progressionFlags: { ...state.progressionFlags },
  };
}

function markEnemyDefeat(
  state: AssignmentGameRuntimeState,
  enemyId: string,
): AssignmentGameRuntimeState {
  const enemy = state.enemies.find((candidate) => candidate.id === enemyId);

  if (!enemy || enemy.alive || state.defeatedEnemyIds.includes(enemyId)) {
    return state;
  }

  return {
    ...state,
    defeatedEnemyIds: [...state.defeatedEnemyIds, enemyId],
    progressionFlags: {
      ...state.progressionFlags,
      [`enemy:${enemyId}:defeated`]: true,
    },
    message: `${enemy.name} was defeated.`,
  };
}

function damageEnemy(
  state: AssignmentGameRuntimeState,
  enemyId: string,
  damage: number,
  sourcePosition: AssignmentGameVector,
): AssignmentGameRuntimeState {
  let next = cloneState(state);

  next.enemies = next.enemies.map((enemy) => {
    if (enemy.id !== enemyId || !enemy.alive) {
      return enemy;
    }

    const push = normalize({
      x: enemy.position.x - sourcePosition.x,
      y: enemy.position.y - sourcePosition.y,
    });
    const nextHealth = Math.max(0, enemy.health - damage);

    return {
      ...enemy,
      health: nextHealth,
      alive: nextHealth > 0,
      position: {
        x: clamp(
          enemy.position.x + push.x * 14,
          enemy.radius,
          assignmentGameLevel.width - enemy.radius,
        ),
        y: clamp(
          enemy.position.y + push.y * 14,
          enemy.radius,
          assignmentGameLevel.height - enemy.radius,
        ),
      },
    };
  });

  const damagedEnemy = next.enemies.find((enemy) => enemy.id === enemyId);

  if (damagedEnemy && !damagedEnemy.alive) {
    next = markEnemyDefeat(next, enemyId);
  }

  return next;
}

export function performSwordAttack(state: AssignmentGameRuntimeState): AssignmentGameRuntimeState {
  if (state.mode !== 'playing' || state.player.swordCooldownMs > 0) {
    return state;
  }

  let next = cloneState(state);
  const facing = directionVector(next.player.facing);
  let didHit = false;

  next.player.swordCooldownMs = swordCooldownMs;

  next.enemies
    .filter((enemy) => enemy.alive)
    .forEach((enemy) => {
      const enemyOffset = {
        x: enemy.position.x - next.player.position.x,
        y: enemy.position.y - next.player.position.y,
      };
      const normalizedOffset = normalize(enemyOffset);
      const isInFront = facing.x * normalizedOffset.x + facing.y * normalizedOffset.y > -0.2;
      const isClose = distance(next.player.position, enemy.position) <= swordRange + enemy.radius;

      if (isClose && isInFront) {
        didHit = true;
        next = damageEnemy(next, enemy.id, swordDamage, next.player.position);
      }
    });

  if (!didHit) {
    next.message = 'The sword flashed through empty air.';
  } else if (!next.message.includes('defeated')) {
    next.message = 'Sword strike landed. Close attacks hit harder.';
  }

  return next;
}

export function fireEnergyProjectile(
  state: AssignmentGameRuntimeState,
): AssignmentGameRuntimeState {
  if (
    state.mode !== 'playing' ||
    state.player.projectileCooldownMs > 0 ||
    state.player.energy < projectileCost
  ) {
    return state;
  }

  const next = cloneState(state);
  const direction = directionVector(next.player.facing);
  const nextSequence = next.sequence + 1;

  next.sequence = nextSequence;
  next.player.energy = Math.max(0, next.player.energy - projectileCost);
  next.player.projectileCooldownMs = projectileCooldownMs;
  next.projectiles.push({
    id: `energy-bolt-${nextSequence}`,
    position: {
      x: next.player.position.x + direction.x * 24,
      y: next.player.position.y + direction.y * 24,
    },
    velocity: {
      x: direction.x * projectileSpeed,
      y: direction.y * projectileSpeed,
    },
    damage: projectileDamage,
    ttlMs: 900,
    radius: 8,
  });
  next.message = 'Energy bolt released.';

  return next;
}

function updatePlayerMovement(
  state: AssignmentGameRuntimeState,
  input: AssignmentGameInputState,
  deltaMs: number,
): AssignmentGameRuntimeState {
  const next = cloneState(state);
  const intent = {
    x: Number(input.right) - Number(input.left),
    y: Number(input.down) - Number(input.up),
  };
  const movement = normalize(intent);
  const distanceThisFrame = playerSpeed * (deltaMs / 1000);

  if (movement.x || movement.y) {
    next.player.position = {
      x: clamp(
        next.player.position.x + movement.x * distanceThisFrame,
        playerRadius,
        assignmentGameLevel.width - playerRadius,
      ),
      y: clamp(
        next.player.position.y + movement.y * distanceThisFrame,
        playerRadius,
        assignmentGameLevel.height - playerRadius,
      ),
    };

    if (Math.abs(movement.x) >= Math.abs(movement.y)) {
      next.player.facing = movement.x >= 0 ? 'right' : 'left';
    } else {
      next.player.facing = movement.y >= 0 ? 'down' : 'up';
    }
  }

  return next;
}

function updateProjectiles(
  state: AssignmentGameRuntimeState,
  deltaMs: number,
): AssignmentGameRuntimeState {
  let next = cloneState(state);
  const remainingProjectiles = [];

  for (const projectile of next.projectiles) {
    let projectileWasSpent = false;
    const movedProjectile = {
      ...projectile,
      position: {
        x: projectile.position.x + projectile.velocity.x * (deltaMs / 1000),
        y: projectile.position.y + projectile.velocity.y * (deltaMs / 1000),
      },
      ttlMs: projectile.ttlMs - deltaMs,
    };

    for (const enemy of next.enemies.filter((candidate) => candidate.alive)) {
      if (
        distance(movedProjectile.position, enemy.position) <=
        movedProjectile.radius + enemy.radius
      ) {
        next = damageEnemy(next, enemy.id, movedProjectile.damage, movedProjectile.position);
        projectileWasSpent = true;
        break;
      }
    }

    const inBounds =
      movedProjectile.position.x >= 0 &&
      movedProjectile.position.x <= assignmentGameLevel.width &&
      movedProjectile.position.y >= 0 &&
      movedProjectile.position.y <= assignmentGameLevel.height;

    if (!projectileWasSpent && movedProjectile.ttlMs > 0 && inBounds) {
      remainingProjectiles.push(movedProjectile);
    }
  }

  next.projectiles = remainingProjectiles;
  return next;
}

function updateEnemies(
  state: AssignmentGameRuntimeState,
  deltaMs: number,
): AssignmentGameRuntimeState {
  const next = cloneState(state);

  next.enemies = next.enemies.map((enemy) => {
    if (!enemy.alive) {
      return enemy;
    }

    const enemyToPlayer = {
      x: next.player.position.x - enemy.position.x,
      y: next.player.position.y - enemy.position.y,
    };
    const enemyDistance = distance(enemy.position, next.player.position);
    const movement = enemyDistance < 278 ? normalize(enemyToPlayer) : { x: 0, y: 0 };
    const attackCooldown = Math.max(0, enemy.attackCooldownMs - deltaMs);
    const nextEnemy = {
      ...enemy,
      attackCooldownMs: attackCooldown,
      position: {
        x: clamp(
          enemy.position.x + movement.x * enemy.speed * (deltaMs / 1000),
          enemy.radius,
          assignmentGameLevel.width - enemy.radius,
        ),
        y: clamp(
          enemy.position.y + movement.y * enemy.speed * (deltaMs / 1000),
          enemy.radius,
          assignmentGameLevel.height - enemy.radius,
        ),
      },
    };

    if (enemyDistance <= enemy.radius + playerRadius + 4 && attackCooldown <= 0) {
      next.player.health = Math.max(0, next.player.health - enemy.attackDamage);
      next.player.position = {
        x: clamp(
          next.player.position.x + normalize({ x: -enemyToPlayer.x, y: -enemyToPlayer.y }).x * 18,
          playerRadius,
          assignmentGameLevel.width - playerRadius,
        ),
        y: clamp(
          next.player.position.y + normalize({ x: -enemyToPlayer.x, y: -enemyToPlayer.y }).y * 18,
          playerRadius,
          assignmentGameLevel.height - playerRadius,
        ),
      };
      next.message = `${enemy.name} struck you. Use space and distance.`;
      nextEnemy.attackCooldownMs = 950;
    }

    return nextEnemy;
  });

  if (next.player.health <= 0) {
    next.mode = 'defeated';
    next.message = 'You were pushed back to the camp. Start again from the menu.';
  }

  return next;
}

function collectNearbyItems(state: AssignmentGameRuntimeState): AssignmentGameRuntimeState {
  const next = cloneState(state);

  assignmentGameLevel.collectibles.forEach((collectible) => {
    if (next.collectedItemIds.includes(collectible.id)) {
      return;
    }

    if (distance(next.player.position, collectible.position) <= collectible.radius + playerRadius) {
      next.collectedItemIds.push(collectible.id);
      next.inventory.push({ ...collectible.item });
      next.progressionFlags[`item:${collectible.id}:collected`] = true;
      next.message = `${collectible.item.name} added to your inventory.`;
    }
  });

  return next;
}

function updateDialogue(state: AssignmentGameRuntimeState): AssignmentGameRuntimeState {
  const next = cloneState(state);
  const nearGuide = distance(next.player.position, assignmentGameLevel.guide.position) <= 86;
  const secondLineUnlocked = next.defeatedEnemyIds.length > 0 || next.inventory.length > 0;

  if (nearGuide) {
    next.dialogue = secondLineUnlocked
      ? assignmentGameLevel.guide.dialogue[1]
      : assignmentGameLevel.guide.dialogue[0];
    next.progressionFlags.introDialogueSeen = true;
  }

  return next;
}

function updateGoal(state: AssignmentGameRuntimeState): AssignmentGameRuntimeState {
  const next = cloneState(state);
  const allEnemiesDefeated = assignmentGameLevel.enemies.every((enemy) =>
    next.defeatedEnemyIds.includes(enemy.id),
  );
  const crestCollected = next.collectedItemIds.includes('sunlit-crest');

  if (allEnemiesDefeated && crestCollected) {
    next.progressionFlags.emberGateReady = true;
  }

  if (
    next.progressionFlags.emberGateReady &&
    distance(next.player.position, assignmentGameLevel.portal.position) <=
      assignmentGameLevel.portal.radius + playerRadius
  ) {
    next.mode = 'victory';
    next.checkpointId = 'ember-gate-cleared';
    next.progressionFlags.levelOneCleared = true;
    next.message = 'The Ember Gate opened. Progress saved for the next assignment chapter.';
  }

  return next;
}

function updateCooldownsAndEnergy(
  state: AssignmentGameRuntimeState,
  deltaMs: number,
): AssignmentGameRuntimeState {
  const next = cloneState(state);

  next.player.swordCooldownMs = Math.max(0, next.player.swordCooldownMs - deltaMs);
  next.player.projectileCooldownMs = Math.max(0, next.player.projectileCooldownMs - deltaMs);
  next.player.energy = clamp(next.player.energy + 18 * (deltaMs / 1000), 0, next.player.maxEnergy);

  return next;
}

export function tickAssignmentGame(
  state: AssignmentGameRuntimeState,
  input: AssignmentGameInputState,
  deltaMs: number,
): AssignmentGameRuntimeState {
  if (state.mode !== 'playing') {
    return state;
  }

  const cappedDelta = clamp(deltaMs, 0, 50);
  let next = cloneState(state);

  next.elapsedMs += cappedDelta;
  next = updateCooldownsAndEnergy(next, cappedDelta);
  next = updatePlayerMovement(next, input, cappedDelta);
  next = updateProjectiles(next, cappedDelta);
  next = updateEnemies(next, cappedDelta);
  next = collectNearbyItems(next);
  next = updateDialogue(next);
  next = updateGoal(next);

  return next;
}

export function setAssignmentGameMode(
  state: AssignmentGameRuntimeState,
  mode: AssignmentGameRuntimeState['mode'],
): AssignmentGameRuntimeState {
  return {
    ...cloneState(state),
    mode,
  };
}
