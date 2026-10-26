# SYS-04 — Hunger & Fridge

**Domain:** Survival  
**New roadmap placement:** Hunger Phase 2; Fridge Phase 3  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§5.3–5.4; DEC-079/084/101; AI-DEC-207, 221, 238, 258, 261; RECON-003/010.

## Goal

Player-facing term is Hunger. Preserve the existing meter semantics unless explicitly changed: 100 = fully fed, value decays over server elapsed time, and 0 causes death. Current prototype decay is 1 point per 30 minutes. The Starter Room has no Fridge. A home has at most one Fridge; it consumes stored food only while the Character is physically in that home, picking highest Hunger recovery first and using a seeded tie-break.

## Rules and boundaries

- **Owns:** Hunger scale/decay, food recovery, Fridge eligibility, forecast and warning schedule.
- **Depends on:** Death, inventory/storage, home/rent expiry, offline time, Simulation, UI/localization.
- **Cross-system contract:** Changing the label to Hunger does not reverse the meter. A Fridge creates no food and never feeds remotely. Due feed/death ordering must be deterministic.

## UI contract

Show value and meaning (e.g. “100 = Fed”), expected time until food runs out and until Hunger reaches zero; warnings are deduplicated.

## Scope boundary

Hunger begins in Phase 2 private tests; no public/shared release before Fridge + offline survival gate in Phase 3.

## Warning and event behavior

Show both time until eligible food stock is exhausted and estimated time until Hunger reaches zero. Baseline warning checkpoints are 12h/6h/2h for the food-exhaustion forecast and Hunger-zero forecast, deduplicated by the current forecast version. Recalculate after food/resource/location state changes. At the same due instant, eligible Fridge feed is processed before evaluating Hunger death only while residence eligibility remains valid. Apply `rules/02_CROSS_SYSTEM_CONTRACTS.md` CC-05 for terminal ties: if Character death has logical effect time at or before lease expiry, the death branch wins and normal living-owner expiry/Fridge/overflow processing does not also run. If expiry is earlier, remove old-home eligibility first; do not feed from that home afterward. Dispose of remaining rental Fridge stock only through the applicable single terminal branch.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS04-01` — The player-facing label says Hunger and its semantics are explicitly displayed as 100=fed and 0=death. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS04-02` — The selected baseline loses one Hunger point per 30 full server-elapsed minutes, including offline time after the real Phase 2 system activates. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS04-03` — A Fridge never creates food or feeds remotely; it exists only in an eligible current home and picks the greatest Hunger recovery first. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS04-04` — Food-stock and Hunger-zero forecasts use deduplicated 12h/6h/2h warnings and refresh when relevant state changes. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS04-05` — Simulation restore and lease/death/Fridge due-time order cannot resurrect a dead Character or feed from an ineligible home. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
