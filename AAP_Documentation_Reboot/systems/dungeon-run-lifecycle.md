# SYS-09 — Dungeon & Run Lifecycle

**Domain:** Expedition  
**New roadmap placement:** Phase 1 prototype; Phase 2 authoritative  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §9; DEC-028/029/030/032–034; AI-DEC-249.

## Goal

One District represents one bounded dungeon Run. Standard Run: roll 4–7 normal enemies once on Run creation and persist the result. Entry cost = 18 + 2 × ceil(dungeon level/5) Stamina; show before confirmation and deduct once. Hard timeout is 30 minutes and continues offline. Main flow: choose → confirm → pay → fight → pending reward → choose loot within carry capacity → at most one return-encounter check → return/close.

## Rules and boundaries

- **Owns:** Run states/timer, enemy sequence, entry debit, pending reward buckets, loot selection and terminal result.
- **Depends on:** Combat, Escape, inventory, death, world time, rewards and event scheduler.
- **Cross-system contract:** COMPLETED grants earned rewards; pre-clear ESCAPED, FAILED and EXPIRED grant no Run loot/EXP and do not refund entry Stamina. Carried-in items are not seized. Timeout is not death.

## UI contract

Preflight must show Province/dungeon, recommended level and Threat Rank, selected enemy-count range, exact entry Stamina, expected duration/hard timeout, current HP/Stamina/Mana/Hunger/Infection, Elite/Boss roll unit/chance when that content tier is enabled, Infection/return-encounter risk, Escape/Surrender consequences, and no-potion/no-loadout-change restrictions before irreversible confirmation. Phase 1 fixtures use only 4–7 Normal enemies; later tiers stay inactive and do not need invented odds. Loot UI shows current weight, selected/remaining weight, quantity control, what will be kept/forfeited and the confirmation result.

## Scope boundary

Flow proof Phase 1; idempotent server state machine Phase 2.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS09-01` — A Standard Run creates a persisted 4–7 enemy count once and does not reroll on refresh/reconnect. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS09-02` — Entry cost is shown before confirmation and charged once from dungeon level, not actual rolled enemy count. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS09-03` — The 30-minute timer continues offline and through loot/return states; expiry is non-death, no reward and no refund. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS09-04` — The main clear opens pending loot selection; there is at most one return-encounter check. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS09-05` — COMPLETED/ESCAPED/FAILED/EXPIRED terminal outcomes preserve original/chosen-pending/received item buckets and cannot grant duplicate rewards. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
