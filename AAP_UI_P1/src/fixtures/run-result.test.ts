import { describe, expect, it } from 'vitest';
import {
  defaultRunResultPayload,
  isRunResultOutcome,
  normalizeRunResultPayload,
  sumResultWeightGrams,
} from './run-result';

describe('P1-UI-008 terminal result fixture contract', () => {
  it('keeps completion rewards pending and received demo items separate', () => {
    const payload = defaultRunResultPayload('completed');
    expect(payload.chosenPendingItems).toHaveLength(1);
    expect(sumResultWeightGrams(payload.chosenPendingItems)).toBe(2_500);
    expect(payload.receivedDemoItems).toEqual([]);
    expect(sumResultWeightGrams(payload.receivedDemoItems)).toBe(0);
    expect(payload.carriedInWeightGrams).toBe(8_500);
  });

  it('normalizes only known fixture IDs and clamps all item quantities to fixture availability', () => {
    const payload = normalizeRunResultPayload(
      {
        fixtureId: 'p1-ui-008-run-result-v1',
        source: 'loot-demo',
        carriedInWeightGrams: 8_500,
        chosenPendingItems: [
          { id: 'main-alloy', nameKey: 'not-a-translation-key', weightGrams: 1, quantity: 99 },
          { id: 'untrusted-item', nameKey: 'loot.stack.alloy', weightGrams: 1, quantity: 4 },
          { id: 'main-rations', nameKey: 'loot.stack.rations', weightGrams: 500, quantity: -2 },
        ],
        receivedDemoItems: [{ id: 'return-salvage', quantity: 2 }],
        forfeitedItems: [],
        escapeContext: 'return-encounter',
      },
      'escaped',
    );

    expect(payload.chosenPendingItems).toEqual([
      {
        id: 'main-alloy',
        nameKey: 'loot.stack.alloy',
        weightGrams: 2_500,
        quantity: 4,
      },
    ]);
    expect(payload.receivedDemoItems).toEqual([
      {
        id: 'return-salvage',
        nameKey: 'loot.stack.returnSalvage',
        weightGrams: 1_800,
        quantity: 2,
      },
    ]);
    expect(payload.escapeContext).toBe('return-encounter');
  });

  it('uses a deterministic sample rather than accepting unknown or missing route payloads', () => {
    expect(normalizeRunResultPayload(null, 'expired')).toEqual(defaultRunResultPayload('expired'));
    expect(
      normalizeRunResultPayload({ fixtureId: 'foreign-state', chosenPendingItems: [] }, 'failed'),
    ).toEqual(defaultRunResultPayload('failed'));
  });

  it('accepts only the four canonical terminal demo outcomes', () => {
    expect(['completed', 'escaped', 'failed', 'expired'].every(isRunResultOutcome)).toBe(true);
    expect(isRunResultOutcome('dead')).toBe(false);
    expect(isRunResultOutcome(undefined)).toBe(false);
  });
});
