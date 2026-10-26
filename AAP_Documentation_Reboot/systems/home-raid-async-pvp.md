# SYS-22 — Home Raid & Async PvP

**Domain:** Competition  
**New roadmap placement:** Phase 6  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§21.1–21.3; DEC-105/110/123; AI-DEC-203/224.

## Goal

Raid target baseline is active Medium+ homes (including eligible rental homes), after Level 20+, required tutorial, a clearly announced 72-hour eligibility period, active lease with at least 72 hours remaining, and no global pause/critical maintenance. Starter Room and Small homes are immune. Loot cap is at most 10% of vault value and five items per attack; target protection lasts 48 hours and the same attacker cannot repeat for seven days. Homes are not destroyed; Companion/Robot/equipment carried by them is not loot.

## Rules and boundaries

- **Owns:** Eligibility countdown, raid target state, token use, loot cap, shields/cooldowns, defender resolution and audit.
- **Depends on:** Housing, Guild/Base, currency, assets, async AI, time and security.
- **Cross-system contract:** No raids before eligibility and release/security gates. Keep Invasion separate. All numbers remain AI-selected defaults pending tests.

## UI contract

Show eligibility, warning, possible loss cap, protection timer and defender outcomes before confirmation.

## Scope boundary

Phase 6 only.

## Raid-specific constraints

Eligibility: Character Level 20+, tutorial completed, primary home Medium or above, 72 hours of explicit post-warning active eligibility, at least 72 hours remaining on the lease, and no global pause/critical maintenance. Starter Room/Small are immune. A successful Raid can take no more than 10% of vault value and at most five items. The victim receives 48-hour protection; the same attacker cannot repeat against the same target for seven days. The home itself is never destroyed. These are AI-selected design defaults and must pass security, cooldown, asset-loss and concurrency tests before enablement.

## Property tier and Guild Base eligibility

Starter Room and Small Home are Raid-immune. A normal Home Raid target must be a primary Medium-or-higher property meeting the other requirements: attacker Level 20+, Raid tutorial complete, visible eligibility warning/countdown and 72 continuous hours of active Medium+ residence after notice, lease time remaining at least 72 hours, and no global Pause/critical Maintenance. Show eligibility and consequences before either side confirms. A rented Medium+ property may qualify when all conditions hold. A property is not destroyed by Raid; Companion/Robot/equipment they carry are not Raid loot. Guild Base eligibility is governed jointly with SYS-27: below Medium-equivalent tier is immune; Medium-equivalent or higher may qualify only after Guild ownership/member-rights gates pass.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS22-01` — Raid is distinct from Zombie Invasion and only targets eligible Medium+ primary homes under the explicit Level/tutorial/residence/shield requirements. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS22-02` — Per-Raid loot stays within 10% appraised value and at most five items; non-divisible over-cap items are not taken. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS22-03` — 48-hour target protection/repeat limits and 7-day same attacker-target cooldown are enforced from server UTC. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS22-04` — Home and stored property are not destroyed; Companion/Robot/carried gear are not Raid loot. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS22-05` — Raid is not enabled until ownership, eligibility, custody, cooldown and recovery checks pass. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
