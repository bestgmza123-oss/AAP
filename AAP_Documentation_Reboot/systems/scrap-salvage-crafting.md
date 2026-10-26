# SYS-14 — Scrap, Salvage & Crafting

**Domain:** Items / Production  
**New roadmap placement:** Basic craft Phase 2; Salvage and advanced craft Phase 4  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§14.1–14.4; DEC-111/119; AI-DEC-204/220.

## Goal

Scrap is a usable resource, not merely a vendor drop. Basic food/healing recipes are instant by default. Advanced consumables take 5 minutes; Common equipment 15 minutes, Uncommon 30, Rare+ 60, unless versioned recipe data overrides duration. One job runs at once with a queue of three total; materials are reserved atomically at start. Cancel before 25% returns 80% of reserved materials; at/after 25% returns none. Jobs continue offline. Salvage happens only at a Station, immediately, without fee; baseline return is 40% C–A, 30% S–SSS and 20% SSS+/Mythic.

## Rules and boundaries

- **Owns:** Recipe inputs/outputs/duration, job queue, reservation, cancellation, offline completion and salvage eligibility/yields.
- **Depends on:** Inventory, resources, equipment, Stations, time, market and Admin content data.
- **Cross-system contract:** Never duplicate completion on retry. Do not salvage worn/equipped or market-listed items. Farming/crops are not approved.

## UI contract

Show recipe materials, expected output, duration, queue position and cancellation consequences.

## Scope boundary

Basic craft Phase 2; salvage/advanced production Phase 4.

## Salvage eligibility and outputs

Salvage is immediate at a dedicated Station and has no default Gold fee. Items that are equipped/worn, listed/in escrow, trade-locked, mission-locked, quest/story critical, the Starter Bag, achievement-unique or marked `salvage_allowed=false` are protected. Material return is floored per material: 40% for Common–A, 30% for S–SSS, 20% for SSS+/Mythic. Gold, paid currency and unique boss-drop components are never returned; Special/quest-unique items are non-salvageable by default. Rare/high-value salvage requires a second confirmation naming the item and expected output.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS14-01` — Basic recipes complete atomically; timed recipes reserve inputs and keep their duration/queue/cancel policy from versioned data. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS14-02` — Craft jobs continue correctly through offline time and cancellation at 25% boundary follows the defined refund rule. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS14-03` — Salvage only occurs at a Station, applies the correct rank return rate, and never salvages protected/locked items. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS14-04` — Gold/paid currency/unique boss components are never created by Salvage; rare/high-value results require explicit preview/confirmation. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
