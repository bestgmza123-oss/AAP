# SYS-24 — Robots

**Domain:** Helpers  
**New roadmap placement:** Phase 5  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §22.2; DEC-113; AI-DEC-214.

## Goal

Robots are craftable helper/defence units with energy and material-based repair. Max energy 100; idle recovery baseline +1 per 10 minutes; dispatch cost Low/Medium/High = 20/40/70. Energy 0 prevents dispatch/defence until recovery or repair. Exhaustion does not destroy the Robot; permanent destruction is disabled in the launch baseline.

## Rules and boundaries

- **Owns:** Robot templates, energy, dispatch costs, idle recovery, repair recipe and owner/custody.
- **Depends on:** Crafting, inventory, home defence, Guild, time and Raid/Invasion.
- **Cross-system contract:** No permanent destruction or new paid repair mechanic without explicit approved scope change.

## UI contract

Show current energy, mission cost, recovery estimate and repair materials.

## Scope boundary

Phase 5.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS24-01` — Robot Energy caps at 100; selected idle regeneration and Low/Medium/High dispatch costs follow versioned data. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS24-02` — Energy 0 blocks dispatch/defence but does not destroy the Robot under launch baseline. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS24-03` — Robot repair uses material recipe, not medicine; roles are restricted to authored blueprint capabilities. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS24-04` — Robot and carried assets obey owner/death/Guild-loan custody rules; no duplicate location/ownership. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
