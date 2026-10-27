/**
 * Deterministic Phase 1 Combat UI fixtures.
 * All numbers and transitions here are private demo data, not approved balance or server outcomes.
 * No RNG, persistence, wall-clock timer, death resolution, or remote calls exist in this module.
 */
import type { TranslationKey, TranslationValues } from '../i18n';

export const combatFixture = {
  id: 'combat-demo-deterministic-v1',
  player: {
    hp: 86,
    maxHp: 120,
    mana: 42,
    maxMana: 60,
    stamina: 186,
    maxStamina: 240,
    physicalDefence: 5,
    normalAttackRawDamage: 20,
  },
  skill: {
    id: 'fixture-skill-direct-magic-damage-v1',
    nameKey: 'combat.skill.name',
    targetKey: 'combat.skill.target',
    effectKey: 'combat.skill.effect',
    rawDamage: 34,
    manaCost: 10,
    cooldownPlayerActions: 2,
    damageKind: 'magic',
  },
  guardReductionPercent: 50,
  mitigationK: 100,
  logLimit: 10,
  enemies: [
    {
      id: 'normal-zombie-fixture-a',
      nameKey: 'combat.enemy.fixtureAName',
      speciesKey: 'combat.species.zombie',
      tierKey: 'combat.tier.normal',
      threatRank: 'F',
      level: 1,
      eventTagKey: 'combat.eventTag.standardRun',
      maxHp: 30,
      physicalDefence: 6,
      magicResistance: 8,
      rawDamage: 10,
      telegraphed: true,
      intentKey: 'combat.intent.claw',
    },
    {
      id: 'normal-human-fixture-b',
      nameKey: 'combat.enemy.fixtureBName',
      speciesKey: 'combat.species.human',
      tierKey: 'combat.tier.normal',
      threatRank: 'F',
      level: 1,
      eventTagKey: 'combat.eventTag.standardRun',
      maxHp: 26,
      physicalDefence: 4,
      magicResistance: 3,
      rawDamage: 9,
      telegraphed: false,
      mana: { current: 8, maximum: 12 },
    },
    {
      id: 'normal-mutant-fixture-c',
      nameKey: 'combat.enemy.fixtureCName',
      speciesKey: 'combat.species.mutant',
      tierKey: 'combat.tier.normal',
      threatRank: 'F',
      level: 1,
      eventTagKey: 'combat.eventTag.standardRun',
      maxHp: 36,
      physicalDefence: 8,
      magicResistance: 5,
      rawDamage: 12,
      telegraphed: true,
      intentKey: 'combat.intent.heavySwipe',
    },
    {
      id: 'normal-zombie-fixture-d',
      nameKey: 'combat.enemy.fixtureDName',
      speciesKey: 'combat.species.zombie',
      tierKey: 'combat.tier.normal',
      threatRank: 'F',
      level: 1,
      eventTagKey: 'combat.eventTag.standardRun',
      maxHp: 28,
      physicalDefence: 5,
      magicResistance: 7,
      rawDamage: 9,
      telegraphed: false,
    },
  ],
} as const;

export type CombatAction = 'attack' | 'skill' | 'guard';
export type CombatPhase = 'player-turn' | 'enemy-turn' | 'complete' | 'paused';

export interface CombatLogEntry {
  id: number;
  key: TranslationKey;
  enemyId?: string;
  values?: TranslationValues;
}

export interface CombatState {
  phase: CombatPhase;
  turnNumber: number;
  enemyIndex: number;
  enemyHp: number;
  defeatedCount: number;
  playerHp: number;
  playerMana: number;
  skillCooldownRemaining: number;
  guardActive: boolean;
  logs: CombatLogEntry[];
  nextLogId: number;
  pauseReasonKey?: TranslationKey;
}

export type CombatRejectionReason =
  | 'not-player-turn'
  | 'not-active'
  | 'skill-cooldown'
  | 'insufficient-mana';

export interface CombatTransition {
  state: CombatState;
  rejection?: CombatRejectionReason;
}

function currentEnemy(state: CombatState) {
  return combatFixture.enemies[state.enemyIndex];
}

export function calculateFixtureDamage(rawDamage: number, defence: number): number {
  // Mirrors the documented mitigation shape with fixture-only inputs; this is not a balance test.
  return Math.max(
    1,
    Math.floor((rawDamage * combatFixture.mitigationK) / (combatFixture.mitigationK + defence)),
  );
}

function appendLog(
  state: CombatState,
  key: TranslationKey,
  options: { enemyId?: string; values?: TranslationValues } = {},
): CombatState {
  const entry: CombatLogEntry = {
    id: state.nextLogId,
    key,
    ...(options.enemyId ? { enemyId: options.enemyId } : {}),
    ...(options.values ? { values: options.values } : {}),
  };

  return {
    ...state,
    logs: [...state.logs, entry].slice(-combatFixture.logLimit),
    nextLogId: state.nextLogId + 1,
  };
}

export function createInitialCombatState(): CombatState {
  const firstEnemy = combatFixture.enemies[0];
  const initial: CombatState = {
    phase: 'player-turn',
    turnNumber: 1,
    enemyIndex: 0,
    enemyHp: firstEnemy.maxHp,
    defeatedCount: 0,
    playerHp: combatFixture.player.hp,
    playerMana: combatFixture.player.mana,
    skillCooldownRemaining: 0,
    guardActive: false,
    logs: [],
    nextLogId: 1,
  };

  return appendLog(initial, 'combat.log.demoStarted', {
    enemyId: firstEnemy.id,
    values: { total: combatFixture.enemies.length },
  });
}

function moveToNextEnemyOrComplete(state: CombatState, defeatedEnemyId: string): CombatState {
  const defeatedCount = state.defeatedCount + 1;
  let next = appendLog(
    { ...state, defeatedCount, guardActive: false },
    'combat.log.enemyDefeated',
    {
      enemyId: defeatedEnemyId,
      values: { defeated: defeatedCount, total: combatFixture.enemies.length },
    },
  );
  const nextIndex = state.enemyIndex + 1;

  if (nextIndex >= combatFixture.enemies.length) {
    return { ...next, phase: 'complete', enemyHp: 0, guardActive: false };
  }

  const nextEnemy = combatFixture.enemies[nextIndex];
  next = {
    ...next,
    phase: 'player-turn',
    enemyIndex: nextIndex,
    enemyHp: nextEnemy.maxHp,
    guardActive: false,
  };
  return appendLog(next, 'combat.log.nextEnemy', {
    enemyId: nextEnemy.id,
    values: { defeated: defeatedCount, total: combatFixture.enemies.length },
  });
}

export function performCombatAction(state: CombatState, action: CombatAction): CombatTransition {
  if (state.phase === 'complete' || state.phase === 'paused') {
    return { state, rejection: 'not-active' };
  }
  if (state.phase !== 'player-turn') {
    return { state, rejection: 'not-player-turn' };
  }
  if (action === 'skill' && state.skillCooldownRemaining > 0) {
    return { state, rejection: 'skill-cooldown' };
  }
  if (action === 'skill' && state.playerMana < combatFixture.skill.manaCost) {
    return { state, rejection: 'insufficient-mana' };
  }

  const enemy = currentEnemy(state);
  let next: CombatState = {
    ...state,
    guardActive: false,
    skillCooldownRemaining:
      action === 'skill'
        ? combatFixture.skill.cooldownPlayerActions
        : Math.max(0, state.skillCooldownRemaining - 1),
  };

  if (action === 'guard') {
    next = { ...next, guardActive: true, phase: 'enemy-turn' };
    next = appendLog(next, 'combat.log.guardSet', {
      enemyId: enemy.id,
      values: { reduction: combatFixture.guardReductionPercent },
    });
    return { state: next };
  }

  const rawDamage =
    action === 'skill' ? combatFixture.skill.rawDamage : combatFixture.player.normalAttackRawDamage;
  const defence =
    action === 'skill' && combatFixture.skill.damageKind === 'magic'
      ? enemy.magicResistance
      : enemy.physicalDefence;
  const damage = calculateFixtureDamage(rawDamage, defence);
  const enemyHp = Math.max(0, state.enemyHp - damage);

  next = {
    ...next,
    enemyHp,
    ...(action === 'skill' ? { playerMana: state.playerMana - combatFixture.skill.manaCost } : {}),
  };

  if (action === 'skill') {
    next = appendLog(next, 'combat.log.skillUsed', {
      enemyId: enemy.id,
      values: {
        damage,
        manaCost: combatFixture.skill.manaCost,
        cooldown: combatFixture.skill.cooldownPlayerActions,
      },
    });
  } else {
    next = appendLog(next, 'combat.log.attackUsed', {
      enemyId: enemy.id,
      values: { damage, staminaCost: 0 },
    });
  }

  if (enemyHp === 0) {
    return { state: moveToNextEnemyOrComplete(next, enemy.id) };
  }

  return { state: { ...next, phase: 'enemy-turn', guardActive: false } };
}

export function resolveEnemyAction(state: CombatState): CombatTransition {
  if (state.phase !== 'enemy-turn') {
    return {
      state,
      rejection:
        state.phase === 'complete' || state.phase === 'paused' ? 'not-active' : 'not-player-turn',
    };
  }

  const enemy = currentEnemy(state);
  const mitigatedDamage = calculateFixtureDamage(
    enemy.rawDamage,
    combatFixture.player.physicalDefence,
  );
  const damage = state.guardActive
    ? Math.max(1, Math.floor((mitigatedDamage * (100 - combatFixture.guardReductionPercent)) / 100))
    : mitigatedDamage;
  const nextHp = state.playerHp - damage;

  if (nextHp <= 0) {
    let paused: CombatState = {
      ...state,
      phase: 'paused',
      guardActive: false,
      pauseReasonKey: 'combat.pause.hpBoundary',
    };
    paused = appendLog(paused, 'combat.log.pausedBeforeTerminalHp', {
      enemyId: enemy.id,
      values: { damage },
    });
    return { state: paused };
  }

  let next: CombatState = {
    ...state,
    phase: 'player-turn',
    playerHp: nextHp,
    guardActive: false,
    turnNumber: state.turnNumber + 1,
  };

  if (state.guardActive) {
    next = appendLog(next, 'combat.log.enemyGuarded', {
      enemyId: enemy.id,
      values: { damage },
    });
  } else if (enemy.telegraphed) {
    next = appendLog(next, 'combat.log.enemyTelegraphedResolved', {
      enemyId: enemy.id,
      values: { damage },
    });
  } else {
    next = appendLog(next, 'combat.log.enemyUntelegraphedResolved', {
      values: { damage },
    });
  }

  return { state: next };
}

export function getCombatActionDisabledReason(
  state: CombatState,
  action: CombatAction,
): TranslationKey | undefined {
  if (state.phase !== 'player-turn') {
    return 'combat.actionReason.playerTurn';
  }
  if (action === 'skill' && state.skillCooldownRemaining > 0) {
    return 'combat.actionReason.cooldown';
  }
  if (action === 'skill' && state.playerMana < combatFixture.skill.manaCost) {
    return 'combat.actionReason.mana';
  }
  return undefined;
}
