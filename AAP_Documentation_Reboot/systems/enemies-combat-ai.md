# SYS-08 — Enemies & Combat AI

**Domain:** Combat  
**New roadmap placement:** Phase 1 prototype; expand by phase  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §8; AI-DEC-237/249.

## Goal

Enemy data separates Species (Zombie/Human/Mutant), Tier (Normal/Elite/Boss), Threat Rank (F–SSS), Level and Event Tag. Elite and above may use skills. Enemy AI selects actions through explicit conditions/cooldowns; skills and special effects must use supported effect types.

## Rules and boundaries

- **Owns:** Enemy templates, stats, action patterns, skill eligibility, telegraph tags and versioned content.
- **Depends on:** Combat, Run encounter generation, loot, Infection and content authoring.
- **Cross-system contract:** No hidden mechanics: only actions tagged telegraphed show Enemy Intent. Phase 1 uses normal-enemy fixtures; do not silently add Boss/Elite mechanics or lore as final content.

## UI contract

Enemy profile, level/threat and dangerous intent must be readable before/at the relevant decision.

## Scope boundary

Fixtures Phase 1; authored broader enemy roster progressively.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS08-01` — Enemy Species, Tier, Threat Rank, Level and Event Tag remain independent fields. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS08-02` — Elite+ skills and enemy Mana are shown only when the authored content supports them. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS08-03` — Enemy Action patterns are server-seeded/versioned and cannot grant an undeclared extra turn. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS08-04` — Phase 1 uses only labelled normal-enemy fixtures; no hidden Elite/Boss mechanic is introduced. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
