import { type LootSelection, type LootStackFixture, lootCapacityFixture } from './loot-capacity';

export const runResultFixtureId = 'p1-ui-008-run-result-v1';

export const runResultOutcomes = ['completed', 'escaped', 'failed', 'expired'] as const;
export type RunResultOutcome = (typeof runResultOutcomes)[number];
export type RunResultSource = 'sample-deep-link' | 'loot-demo' | 'combat-exit';
export type EscapeContext = 'pre-clear' | 'return-encounter' | 'not-applicable';

export type RunResultItem = Pick<LootStackFixture, 'id' | 'nameKey' | 'weightGrams'> & {
  quantity: number;
};

export interface RunResultPayload {
  fixtureId: typeof runResultFixtureId;
  source: RunResultSource;
  carriedInWeightGrams: number;
  chosenPendingItems: RunResultItem[];
  receivedDemoItems: RunResultItem[];
  forfeitedItems: RunResultItem[];
  escapeContext: EscapeContext;
  escapePaymentMethod?: 'gold' | 'warp-stone';
  escapeCostGold?: number;
}

const knownStacks = [
  ...lootCapacityFixture.mainLoot,
  lootCapacityFixture.returnEncounterLoot,
] as const;

function safeInteger(value: unknown, fallback = 0, maximum = 1_000_000): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(maximum, Math.trunc(value)))
    : fallback;
}

function normalizeItems(value: unknown): RunResultItem[] {
  if (!Array.isArray(value)) return [];
  const items: RunResultItem[] = [];
  for (const candidate of value) {
    if (!candidate || typeof candidate !== 'object') continue;
    const item = candidate as Partial<RunResultItem>;
    const stack = knownStacks.find((known) => known.id === item.id);
    if (!stack) continue;
    const quantity = safeInteger(item.quantity, 0, stack.availableQuantity);
    if (quantity === 0) continue;
    items.push({
      id: stack.id,
      nameKey: stack.nameKey,
      weightGrams: stack.weightGrams,
      quantity,
    });
  }
  return items;
}

export function itemsFromSelection(
  stacks: readonly LootStackFixture[],
  selection: LootSelection,
): RunResultItem[] {
  return stacks.flatMap((stack) => {
    const quantity = safeInteger(selection[stack.id], 0, stack.availableQuantity);
    return quantity > 0
      ? [
          {
            id: stack.id,
            nameKey: stack.nameKey,
            weightGrams: stack.weightGrams,
            quantity,
          },
        ]
      : [];
  });
}

export function sumResultWeightGrams(items: readonly RunResultItem[]): number {
  return items.reduce((total, item) => total + item.weightGrams * item.quantity, 0);
}

export function defaultRunResultPayload(outcome: RunResultOutcome): RunResultPayload {
  return {
    fixtureId: runResultFixtureId,
    source: 'sample-deep-link',
    carriedInWeightGrams: lootCapacityFixture.initialCarriedWeightGrams,
    chosenPendingItems:
      outcome === 'completed'
        ? itemsFromSelection(lootCapacityFixture.mainLoot, { 'main-alloy': 1 })
        : [],
    receivedDemoItems: [],
    forfeitedItems:
      outcome === 'escaped'
        ? itemsFromSelection(lootCapacityFixture.mainLoot, { 'main-alloy': 1 })
        : [],
    escapeContext: outcome === 'escaped' ? 'pre-clear' : 'not-applicable',
  };
}

/**
 * Route state is a local demo payload, not durable data. Deep links and refreshes use
 * explicit deterministic sample fixtures. Only known fixture IDs and bounded counts survive.
 */
export function normalizeRunResultPayload(
  raw: unknown,
  outcome: RunResultOutcome,
): RunResultPayload {
  if (!raw || typeof raw !== 'object') return defaultRunResultPayload(outcome);
  const candidate = raw as Partial<RunResultPayload>;
  if (candidate.fixtureId !== runResultFixtureId) return defaultRunResultPayload(outcome);
  const source: RunResultSource =
    candidate.source === 'loot-demo' || candidate.source === 'combat-exit'
      ? candidate.source
      : 'sample-deep-link';
  const escapeContext: EscapeContext =
    candidate.escapeContext === 'pre-clear' || candidate.escapeContext === 'return-encounter'
      ? candidate.escapeContext
      : 'not-applicable';
  return {
    fixtureId: runResultFixtureId,
    source,
    carriedInWeightGrams: safeInteger(
      candidate.carriedInWeightGrams,
      lootCapacityFixture.initialCarriedWeightGrams,
    ),
    chosenPendingItems: normalizeItems(candidate.chosenPendingItems),
    receivedDemoItems: normalizeItems(candidate.receivedDemoItems),
    forfeitedItems: normalizeItems(candidate.forfeitedItems),
    escapeContext,
    escapePaymentMethod:
      candidate.escapePaymentMethod === 'gold' || candidate.escapePaymentMethod === 'warp-stone'
        ? candidate.escapePaymentMethod
        : undefined,
    escapeCostGold:
      candidate.escapeCostGold === undefined
        ? undefined
        : safeInteger(candidate.escapeCostGold, 0, 1_000_000),
  };
}

export function isRunResultOutcome(value: string | undefined): value is RunResultOutcome {
  return runResultOutcomes.some((outcome) => outcome === value);
}
