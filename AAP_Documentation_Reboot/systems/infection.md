# SYS-05 — Infection

**Domain:** Survival  
**New roadmap placement:** Phase 2  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §5.5; DEC-026/040/041; AI-DEC-227/238.

## Goal

Infection rises only from an infectious enemy/skill Action that lands and causes positive HP damage after armour, Guard and Shield. Check at most once per eligible Action, not per visual hit or animation packet. Maximum Infection causes death. Only explicitly tagged specialist treatment reduces Infection; ordinary healing, bandages and the hospital do not. Prototype treatments: Antiviral Patch −10/250 Gold; Standard Serum −25/1,000 Gold; Purification Injector −50/3,500 Gold, to activate with authored content in Phase 3.

## Rules and boundaries

- **Owns:** Infection chances/amounts by content, maximum, treatment flag and treatment catalog.
- **Depends on:** Combat resolution, death, items, NPC clinic, server RNG, UI alerts.
- **Cross-system contract:** No Infection from a miss or from a Shield that absorbs all damage. All probability and amount values are versioned data.

## UI contract

Clear Infection meter, risk warning, treatment descriptions and exact effects.

## Scope boundary

Phase 2 private tests; clinic/content availability belongs to Phase 3.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS05-01` — An eligible infectious Action is evaluated at most once and only after a landed hit causes positive HP damage after mitigation. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS05-02` — Misses and Shields that absorb all damage do not add Infection. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS05-03` — Only an explicitly tagged specialist treatment reduces Infection; standard healing and Hospital do not. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS05-04` — Infection treatment consumption and result are atomic/idempotent, and the max threshold invokes the common death flow. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
