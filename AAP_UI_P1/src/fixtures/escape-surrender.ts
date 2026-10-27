/**
 * P1-UI-006 Escape/Surrender demonstration fixtures.
 * Every numeric value is explicitly non-final UI-only test data.
 * No currency/item is charged, no Run is created, and no outcome is persisted.
 */
export const escapeSurrenderFixture = {
  fixture_id: 'fixture-p1-ui-006-escape-surrender-v1',
  fixture_formula: 'ceil((20 + 5 × W) × Z)',
  scenarios: [
    {
      fixture_id: 'pre-clear-gold',
      labelKey: 'combat.exitFixture.preClearGold',
      fixture_context: 'pre-clear',
      fixture_carried_weight_grams: 6400,
      fixture_pending_run_loot_weight_grams: 3200,
      fixture_chosen_main_loot_weight_grams: 0,
      fixture_return_encounter_loot_weight_grams: 0,
      fixture_danger_multiplier: 1.25,
      fixture_gold_balance: 90,
      fixture_warp_stone_count: 0,
    },
    {
      fixture_id: 'pre-clear-warp-stone',
      labelKey: 'combat.exitFixture.preClearWarpStone',
      fixture_context: 'pre-clear',
      fixture_carried_weight_grams: 6400,
      fixture_pending_run_loot_weight_grams: 3200,
      fixture_chosen_main_loot_weight_grams: 0,
      fixture_return_encounter_loot_weight_grams: 0,
      fixture_danger_multiplier: 1.25,
      fixture_gold_balance: 10,
      fixture_warp_stone_count: 1,
    },
    {
      fixture_id: 'pre-clear-insufficient-gold',
      labelKey: 'combat.exitFixture.insufficientGoldScenario',
      fixture_context: 'pre-clear',
      fixture_carried_weight_grams: 6400,
      fixture_pending_run_loot_weight_grams: 3200,
      fixture_chosen_main_loot_weight_grams: 0,
      fixture_return_encounter_loot_weight_grams: 0,
      fixture_danger_multiplier: 1.25,
      fixture_gold_balance: 10,
      fixture_warp_stone_count: 0,
    },
    {
      fixture_id: 'return-encounter-gold',
      labelKey: 'combat.exitFixture.returnEncounter',
      fixture_context: 'return-encounter',
      fixture_carried_weight_grams: 6400,
      fixture_pending_run_loot_weight_grams: 0,
      fixture_chosen_main_loot_weight_grams: 3200,
      fixture_return_encounter_loot_weight_grams: 1800,
      fixture_danger_multiplier: 1.25,
      fixture_gold_balance: 100,
      fixture_warp_stone_count: 0,
    },
  ],
} as const;

export type EscapeScenario = (typeof escapeSurrenderFixture.scenarios)[number];
export type EscapeScenarioId = EscapeScenario['fixture_id'];
export type EscapePaymentMethod = 'gold' | 'warp-stone';

export function getEscapeScenario(id: EscapeScenarioId): EscapeScenario {
  return (
    escapeSurrenderFixture.scenarios.find((scenario) => scenario.fixture_id === id) ??
    escapeSurrenderFixture.scenarios[0]
  );
}

export function calculateEscapeFixtureCost(scenario: EscapeScenario) {
  const retainedLootWeightGrams =
    scenario.fixture_context === 'return-encounter'
      ? scenario.fixture_chosen_main_loot_weight_grams
      : 0;
  const retainedWeightGrams = scenario.fixture_carried_weight_grams + retainedLootWeightGrams;
  const retainedWeightKg = retainedWeightGrams / 1000;
  const goldCost = Math.ceil((20 + 5 * retainedWeightKg) * scenario.fixture_danger_multiplier);

  return {
    retainedWeightGrams,
    retainedWeightKg,
    goldCost,
  };
}

export function canConfirmEscape(
  scenario: EscapeScenario,
  paymentMethod: EscapePaymentMethod,
  goldCost: number,
): boolean {
  if (paymentMethod === 'warp-stone') return scenario.fixture_warp_stone_count > 0;
  return scenario.fixture_gold_balance >= goldCost;
}
