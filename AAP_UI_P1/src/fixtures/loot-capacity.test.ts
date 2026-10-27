import { describe, expect, it } from 'vitest';
import { getCapacityCheck, lootCapacityFixture, sumSelectedWeightGrams } from './loot-capacity';

describe('P1-UI-007 loot capacity fixture model', () => {
  it('uses integer grams and allows an exact 20 kg boundary including carried weight', () => {
    const selected = { 'main-alloy': 4, 'main-rations': 3 };
    const chosenWeight = sumSelectedWeightGrams(lootCapacityFixture.mainLoot, selected);

    expect(chosenWeight).toBe(11_500);
    expect(lootCapacityFixture.initialCarriedWeightGrams + chosenWeight).toBe(20_000);
    expect(
      getCapacityCheck(
        lootCapacityFixture.initialCarriedWeightGrams + 10_000,
        lootCapacityFixture.totalCapacityGrams,
        lootCapacityFixture.mainLoot[1],
        3,
      ),
    ).toEqual({ allowed: true, shortfallGrams: 0, projectedTotalGrams: 20_000 });
  });

  it('rejects over-capacity additions with an exact gram shortfall', () => {
    const check = getCapacityCheck(
      19_500,
      lootCapacityFixture.totalCapacityGrams,
      lootCapacityFixture.mainLoot[1],
      2,
    );

    expect(check.allowed).toBe(false);
    expect(check.projectedTotalGrams).toBe(20_500);
    expect(check.shortfallGrams).toBe(500);
  });

  it('clamps invalid selections for weight summaries and preserves available quantity bounds', () => {
    expect(
      sumSelectedWeightGrams(lootCapacityFixture.mainLoot, {
        'main-alloy': 99,
        'main-rations': -3,
      }),
    ).toBe(10_000);
  });
});
