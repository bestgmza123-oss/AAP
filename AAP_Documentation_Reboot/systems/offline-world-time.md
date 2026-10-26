# SYS-30 — Offline World & Time

**Domain:** World Foundation  
**New roadmap placement:** Clock contract Phase 2; all timed systems as introduced  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §28; DEC-017/018/050; AI-DEC-208/240/259.

## Goal

Server/world elapsed time drives Hunger, eligible regeneration, crafting, transport, Companion missions, listing expiry, rent, Season, Raid/Invasion events and Run timeout. Player Combat never auto-advances offline. Due events must be reconciled chronologically before later commands; retries are idempotent. Owner Admin may pause authoritative game-time categories; Maintenance is separate. Unplanned downtime without an explicit Pause continues elapsed time and catch-up. Security/login/audit clocks are not paused.

## Rules and boundaries

- **Owns:** Time categories, pause/resume, due-event ordering, event identity, catch-up and incident compensation evidence.
- **Depends on:** Hunger/death, Runs, crafting, travel, housing, Simulation, market, Companion, Season, Raid and Account state.
- **Cross-system contract:** Do not use worker arrival order as the domain rule. Do not backfill feeding into the past or let loading transitions change game state. Public/shared play requires operations/support/incident readiness.

## UI contract

Show timers and consequences; Pause/maintenance/reconnect states must state what is paused and what continues.

## Scope boundary

Rules in Phase 2; extend per system; operational release gate before public/shared play.

## Clock categories and Pause

UTC is canonical for scheduled outcomes, listing/lease/Season/Job Board deadlines, cooldown/mission windows and audit instants. UI may show local time secondarily, but device timezone/DST never changes outcomes. Owner Admin alone may issue authoritative game-time Pause; each pause records actor, reason, pause/resume times and audit. At pause start, reconcile due events and finish atomic in-flight work at/before the canonical pause instant. Pausing one named game-time category must not implicitly pause unrelated categories; Security/Login/Audit clocks are not paused. Maintenance mode is independent. Unplanned downtime without a recorded Pause continues world time and triggers chronological idempotent catch-up. Compensation applies only to verified outage-caused abnormal loss with causal evidence, not ordinary rule outcomes.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS30-01` — UTC is canonical for deadlines/outcomes; local timezone/DST cannot change the result. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS30-02` — Due events reconcile by logical time, explicit domain priority and stable sequence before later commands. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS30-03` — Owner Admin Pause applies only to named game-time categories; Security/Login/Audit clocks and independent categories continue. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS30-04` — Unplanned downtime advances world time and catch-up is chronological/idempotent; Maintenance is not the same as Pause. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS30-05` — Outage compensation is limited to verified outage-caused abnormal loss with causal evidence and one-time handling. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
