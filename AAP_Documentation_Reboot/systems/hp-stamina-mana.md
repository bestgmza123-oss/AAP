# SYS-03 — HP, Stamina & Mana

**Domain:** Survival  
**New roadmap placement:** Phase 2  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§5.1–5.2; DEC-027; AI-DEC-207, 208, 230, 245.

## Goal

HP persists and never passively refills at Run completion, page change, refresh or travel. Stamina funds travel and dungeon entry; Mana funds skills. Selected prototype baselines are Stamina cap 240 and +1 per four full eligible minutes, and Mana +1% of MaxMana per full eligible minute in Province. Stamina may accrue during Simulation because it is not a dungeon Run; Mana remains Province-only and does not regenerate during Combat, dungeon Run or Simulation. Neither resource regenerates during any part of a live dungeon Run (including between-enemy, loot and return states), and Run time is never credited later. Stamina/Mana rates are Phase 2 design parameters, not active Phase 1 simulation unless explicitly shown as inert UI fixtures.

## Rules and boundaries

- **Owns:** Current resource values, regeneration eligibility, derived maxima and healing sources.
- **Depends on:** Combat, Run, travel, Hunger, Simulation, crafting and world-time scheduler.
- **Cross-system contract:** Normal attack costs no Stamina. Hospital heals HP only unless another service is explicitly authored. Treat numeric rates as prototype balance values, not proven balance.

## UI contract

Always-visible, readable resource meters; forecasts where a resource can cause death or block an action.

## Scope boundary

P2 canonical resource/time tests; balance review after playtest.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS03-01` — HP does not refill on Run completion, refresh, page change or travel. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS03-02` — Stamina regenerates only during eligible elapsed time and never during any dungeon Run state; no Run-time backfill occurs. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS03-03` — Mana regenerates only in Province outside live Combat, dungeon Run and Simulation. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS03-04` — Normal Attack costs no Stamina; Hospital heals HP only unless separately authored. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
