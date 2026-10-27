/**
 * Phase 1 preflight display fixture only.
 * Entry cost previews use the canonical Phase 1 baseline formula, but never debit Stamina,
 * roll enemies, create a Run, or start a clock.
 */
export const runPreflightFixture = {
  id: 'run-preflight-standard-v1',
  runId: 'run-fixture-standard-velra',
  scenarioLevels: [1, 5, 6, 50] as const,
  minSupportedDungeonLevel: 1,
  maxSupportedDungeonLevel: 50,
  entryCost: {
    baseStamina: 18,
    staminaPerLevelBand: 2,
    levelsPerBand: 5,
  },
  normalEnemyCount: { minimum: 4, maximum: 7 },
  hardTimeoutMinutes: 30,
  lowStaminaExample: 18,
  restrictions: ['no-potions', 'no-loadout-change'] as const,
  riskDisclosure: ['enemy-range', 'return-encounter', 'timeout-consequences'] as const,
} as const;

export type RunFixtureLevel = (typeof runPreflightFixture.scenarioLevels)[number];

export function calculateEntryStaminaCost(dungeonLevel: number): number | null {
  if (
    !Number.isInteger(dungeonLevel) ||
    dungeonLevel < runPreflightFixture.minSupportedDungeonLevel ||
    dungeonLevel > runPreflightFixture.maxSupportedDungeonLevel
  ) {
    return null;
  }

  return (
    runPreflightFixture.entryCost.baseStamina +
    runPreflightFixture.entryCost.staminaPerLevelBand *
      Math.ceil(dungeonLevel / runPreflightFixture.entryCost.levelsPerBand)
  );
}
