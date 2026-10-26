# SYS-23 — Companions

**Domain:** Helpers  
**New roadmap placement:** Phase 5  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §22.3; DEC-096/103/104; AI-DEC-202/215/241.

## Goal

Companions have their own record, Level/Stats/Skills/equipment/Traits, missions, progression and return flow. One farm mission at a time; before dispatch show duration, expected yield interval, risk, permanent-loss chance and carried-item recovery path. Farm-mission loss chance baseline: Low 0%, Medium 0.25%, High 1%. A Companion may be permanently lost only during a farm mission; defeat outside that mission causes injury/energy loss rather than permanent loss. Carried items go to an idempotent Recovery Locker and remain claimable if storage is full; if owner Character is dead, normal Character-death asset rules still apply.

## Rules and boundaries

- **Owns:** Mission lifecycle, yield inputs, risk, item custody, result finalization and recovery locker.
- **Depends on:** Inventory, death, time, stats, skills, guild/raid, crafting and claims.
- **Cross-system contract:** One mission at a time. No dispatch to the first/starting map if not explicitly enabled by content. Never duplicate result or drop carried items solely due to Companion death.

## UI contract

Risk and expected return are shown before dispatch; status and collected/awaiting-collection states are clear.

## Scope boundary

Phase 5.

## Mission lifecycle, duration, yield and custody

Mission states are `IDLE → PREPARING → DISPATCHED → WORKING/ENCOUNTERED → RETURNED_AWAITING_COLLECTION → COLLECTED`, with terminal/exception paths `FAILED`, `INJURED` and `LOST`. One Companion can have only one active mission, and a mission result is immutable after finalization. Dispatch locks the Companion, its equipment and carried items against sale, direct trade, gear swaps or a second assignment.

Suggested mission durations: Low 30 minutes, Medium 2 hours, High 8 hours. Yield baseline: `base_yield_per_hour × duration_hours^0.8 × stat_factor × skill_factor × equipment_factor × risk_factor`; clamp the combined Stats/Skill/Equipment factor to 0.75–1.50 and use risk multipliers Low 1.0, Medium 1.15, High 1.35. Permanent-loss probabilities for a farm mission are Low 0%, Medium 0.25%, High 1% per dispatch. Seed server outcomes and show an estimated minimum/maximum yield range. These are AI-selected prototype parameters; they are not proof of balance and require simulation/playtest.

Before dispatch, disclose yield range, duration, threat/risk, permanent-loss chance and exact carried-item custody. If a Companion is permanently lost during its farm mission while the owner Character is alive, carried items enter a durable Recovery Locker; if the owner Character dies first, apply the owner Character's applicable asset disposition instead. Losing a Companion in a Raid or other non-farm defeat is not the same as farm-mission permanent loss. Finalize the mission result once; reconnect/retry cannot duplicate yield or recovery units. If capacity is insufficient at collection, keep a non-destructive pending claim.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS23-01` — A Companion may have only one active mission and mission states follow the defined transition/state guard. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS23-02` — Dispatch preview shows duration, yield range, risk, permanent-loss probability and carried-item custody. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS23-03` — Farm-mission loss is distinct from Raid/other defeat; a lost Companion's carried items go to durable Recovery Locker unless owner-death disposition applies. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS23-04` — Mission result/loot/recovery is committed once; retries cannot duplicate rewards or custody transitions. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS23-05` — Inventory/trade/equipment changes respect mission locks; collection has explicit capacity/overflow behavior. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
