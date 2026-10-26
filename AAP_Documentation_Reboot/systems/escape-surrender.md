# SYS-10 — Escape & Surrender

**Domain:** Expedition / Combat  
**New roadmap placement:** Phase 1 prototype; Phase 2 authoritative  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §10; DEC-025/028/029/032/036/042; AI-DEC-233.

## Goal

Escape consumes one Warp Stone or Gold according to the configured formula, returns to the current Province, does not require owning a home, and does not trigger an extra encounter. Before the dungeon is cleared, escape forfeits pending Run rewards but does not seize carried-in items. Surrender is available during active Combat after confirmation; it ends the Run as FAILED, yields no Run reward/EXP, does not refund entry Stamina, does not kill the Character, and does not refill HP.

## Rules and boundaries

- **Owns:** Eligibility, cost formula, pending-loot treatment and terminal outcome for Escape/Surrender.
- **Depends on:** Combat, Run, inventory, resource ledger and UI preflight.
- **Cross-system contract:** Do not remove either command or invent a new penalty as a shortcut. The overlap between Surrender and paid Escape is a documented balance/UX review item; keep the stated baseline until playtest or an explicit decision.

## UI contract

Clearly compare consequences before the user confirms; communicate which rewards are forfeited and whether Gold/stone is spent.

## Escape cost and retained-weight semantics

The starting formula is `C_escape = ceil((20 + 5×W) × Z)`, where `W` is the carried weight plus only the loot that the current Escape outcome retains; `Z` is a versioned danger multiplier. The UI must show the resolved cost before confirmation. Escape before the main dungeon is fully cleared forfeits pending Run loot, so that pending loot is not included in `W`. Escaping from the return encounter keeps the already chosen main-dungeon loot, so that retained loot is included in `W`. A Warp Stone costs one item if available. Escape returns to the current Province; it never teleports to home/capital and does not trigger a new encounter.

## Scope boundary

Phase 1 flow prototype; terminal-state/idempotency tests Phase 2.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS10-01` — Escape returns to the current Province without requiring a home and triggers no additional Encounter. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS10-02` — Escape cost is resolved from the configured formula and the correct retained-weight bucket; the exact cost is visible before confirmation. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS10-03` — Escape before a full clear forfeits pending Run rewards but never seizes carried-in items. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS10-04` — Escape from a return encounter retains chosen main rewards but not encounter reward when the player flees that encounter. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS10-05` — Surrender is only available in active Combat after confirmation and produces FAILED with no reward/EXP/refund and no Character death/HP refill. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

## Authoring checklist for this system

- [ ] State machine and allowed actions are written where the system is stateful.
- [ ] Inputs, outputs, ownership and side-effects are explicit.
- [ ] Errors/disabled reasons and retry/reconnect behavior are defined.
- [ ] Time and death interactions reference `rules/02_CROSS_SYSTEM_CONTRACTS.md` rather than rewriting global ordering.
- [ ] Numeric values have a stable parameter/content ID and do not conflict with `balance/` ownership.
- [ ] UI states and English localization keys are listed before implementation.
- [ ] Acceptance checks cover normal, boundary, failure and duplicate/replay behavior where applicable.

## Legacy decision provenance

See `decisions/01_DECISION_REGISTER.md` for the old AI-DEC index. AI-DEC entries are design provenance, not owner confirmation or runtime evidence. The current behavior for this system is owned by this file and the named global contracts.
