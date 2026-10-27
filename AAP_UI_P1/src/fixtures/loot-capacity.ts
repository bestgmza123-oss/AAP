/**
 * P1-UI-007 deterministic loot/capacity fixtures.
 * Values are display/test data only; no item claim, drop, server roll, or persistence exists.
 * Physical weights are integer grams. The initial carried total includes the bag and excludes worn gear.
 */
export interface LootStackFixture {
  id: string;
  nameKey:
    | 'loot.stack.rations'
    | 'loot.stack.alloy'
    | 'loot.stack.cloth'
    | 'loot.stack.returnSalvage';
  weightGrams: number;
  availableQuantity: number;
}

export const lootCapacityFixture = {
  fixtureId: 'p1-ui-007-loot-capacity-v1',
  totalCapacityGrams: 20_000,
  initialCarriedWeightGrams: 8_500,
  mainLoot: [
    { id: 'main-alloy', nameKey: 'loot.stack.alloy', weightGrams: 2_500, availableQuantity: 4 },
    { id: 'main-rations', nameKey: 'loot.stack.rations', weightGrams: 500, availableQuantity: 3 },
    { id: 'main-cloth', nameKey: 'loot.stack.cloth', weightGrams: 1_000, availableQuantity: 2 },
  ] satisfies readonly LootStackFixture[],
  returnEncounterLoot: {
    id: 'return-salvage',
    nameKey: 'loot.stack.returnSalvage',
    weightGrams: 1_800,
    availableQuantity: 2,
  } satisfies LootStackFixture,
  returnEncounterBranches: ['none', 'one'] as const,
} as const;

export type ReturnEncounterBranch = (typeof lootCapacityFixture.returnEncounterBranches)[number];
export type LootSelection = Record<string, number>;

export function sumSelectedWeightGrams(
  stacks: readonly LootStackFixture[],
  selection: LootSelection,
): number {
  return stacks.reduce((sum, stack) => {
    const quantity = Math.max(
      0,
      Math.min(stack.availableQuantity, Math.trunc(selection[stack.id] ?? 0)),
    );
    return sum + stack.weightGrams * quantity;
  }, 0);
}

export function getCapacityCheck(
  currentTotalWeightGrams: number,
  capacityGrams: number,
  stack: LootStackFixture,
  requestedQuantity: number,
): { allowed: boolean; shortfallGrams: number; projectedTotalGrams: number } {
  const safeQuantity = Math.trunc(requestedQuantity);
  const projectedTotalGrams = currentTotalWeightGrams + stack.weightGrams * safeQuantity;
  const shortfallGrams = Math.max(0, projectedTotalGrams - capacityGrams);
  return {
    allowed:
      safeQuantity >= 0 &&
      safeQuantity <= stack.availableQuantity &&
      currentTotalWeightGrams + stack.weightGrams * safeQuantity <= capacityGrams,
    shortfallGrams,
    projectedTotalGrams,
  };
}
