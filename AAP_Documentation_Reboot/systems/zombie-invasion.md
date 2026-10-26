# SYS-21 — Zombie Invasion of Homes

**Domain:** World Event  
**New roadmap placement:** Phase 6  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §20.7; DEC-121/126; AI-DEC-222.

## Goal

Zombie Invasion is a Province event distinct from player Raid. Current design default includes 24-hour advance notice, a 6-hour event duration, capped property-condition damage and repair. Numeric cadence, damage and repair values are versioned content, not proven balance.

## Rules and boundaries

- **Owns:** Event schedule, eligible locations, notices, defenders, property condition, damage caps and repair.
- **Depends on:** Housing, time, async defenders, Robot/Companion, inventory and server events.
- **Cross-system contract:** No home destruction. Do not conflate event damage with PvP loot or Raids.

## UI contract

Show advance notice, event start/end, threat and what property damage can/cannot happen.

## Scope boundary

Phase 6; event/security/recovery tests before activation.

## Event baseline

Current selected design: advance notice 24 hours, event duration 6 hours, event-specific schedule/cadence and capped property-condition damage with a repair path. Exact cadence, damage and repair amount remain versioned content inputs and are not measured balance. Event resolution must continue offline and be deterministic under Pause/downtime catch-up.

## Selected event parameters

A Province has no more than one Invasion in any rolling seven-day period. The server selects eligible properties deterministically from a server-seeded pool; encounters use only the affected Province's enemy pool. Give 24-hour advance notice and run the event for six hours. Before resolution, show affected Province, conditions, start/end, likely threat and defender choices. Invasion is independent from Home Raid shield eligibility.

One event may reduce building condition by at most 10 percentage points/fraction as defined by the versioned property model; it cannot destroy the home, delete stored items or loot storage. Baseline repair cost is `ceil(weekly_rent × actual_condition_fraction_lost × 2)`, minimum 50 Gold; payment may use approved material or Gold content. Correctly map owner/renter and tier to the property rent baseline. Guild/automated defence is phase-gated and cannot be enabled before member-rights/custody tests. Values are design defaults, not runtime-proven balance.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS21-01` — Invasion notice/duration/cadence follows versioned defaults and uses only the affected Province's enemy pool. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS21-02` — Eligible targets/defender options/risk window are disclosed before resolution. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS21-03` — Each event damages at most 10% condition and cannot destroy a home or loot stored items. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS21-04` — Repair amount uses the declared formula and a phase-appropriate Gold/material source. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
