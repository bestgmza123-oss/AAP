import { describe, expect, it } from 'vitest';
import {
  calculateEscapeFixtureCost,
  canConfirmEscape,
  escapeSurrenderFixture,
  getEscapeScenario,
} from './escape-surrender';

describe('P1-UI-006 Escape/Surrender fixture contract', () => {
  it('uses carried weight only before main clear and excludes pending loot', () => {
    const scenario = getEscapeScenario('pre-clear-gold');
    const calculation = calculateEscapeFixtureCost(scenario);

    expect(calculation.retainedWeightGrams).toBe(6400);
    expect(calculation.retainedWeightKg).toBe(6.4);
    expect(calculation.goldCost).toBe(65);
    expect(scenario.fixture_pending_run_loot_weight_grams).toBe(3200);
    expect(canConfirmEscape(scenario, 'gold', calculation.goldCost)).toBe(true);
  });

  it('includes chosen main loot but excludes return-encounter loot from retained weight', () => {
    const scenario = getEscapeScenario('return-encounter-gold');
    const calculation = calculateEscapeFixtureCost(scenario);

    expect(calculation.retainedWeightGrams).toBe(9600);
    expect(calculation.retainedWeightKg).toBe(9.6);
    expect(calculation.goldCost).toBe(85);
    expect(scenario.fixture_return_encounter_loot_weight_grams).toBe(1800);
    expect(canConfirmEscape(scenario, 'gold', calculation.goldCost)).toBe(true);
  });

  it('offers the Warp Stone only when the selected fixture carries one', () => {
    const withStone = getEscapeScenario('pre-clear-warp-stone');
    const withoutStone = getEscapeScenario('pre-clear-gold');

    expect(canConfirmEscape(withStone, 'warp-stone', 65)).toBe(true);
    expect(canConfirmEscape(withoutStone, 'warp-stone', 65)).toBe(false);
    expect(canConfirmEscape(withoutStone, 'gold', 65)).toBe(true);
  });

  it('blocks an Escape with insufficient Gold rather than inventing a debit or fallback', () => {
    const scenario = getEscapeScenario('pre-clear-insufficient-gold');
    const calculation = calculateEscapeFixtureCost(scenario);

    expect(calculation.goldCost).toBe(65);
    expect(scenario.fixture_gold_balance).toBe(10);
    expect(canConfirmEscape(scenario, 'gold', calculation.goldCost)).toBe(false);
    expect(canConfirmEscape(scenario, 'warp-stone', calculation.goldCost)).toBe(false);
  });

  it('keeps fixture inputs unmistakably separate from final balance values', () => {
    expect(escapeSurrenderFixture.fixture_id).toContain('fixture');
    expect(
      escapeSurrenderFixture.scenarios.every(
        (scenario) =>
          scenario.labelKey.startsWith('combat.exitFixture.') &&
          Number.isInteger(scenario.fixture_carried_weight_grams) &&
          scenario.fixture_danger_multiplier > 0,
      ),
    ).toBe(true);
    expect(escapeSurrenderFixture.fixture_formula).toBe('ceil((20 + 5 × W) × Z)');
  });
});
