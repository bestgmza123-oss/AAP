# SYS-07 — Turn-Based Combat

**Domain:** Combat  
**New roadmap placement:** Phase 1 prototype; Phase 2 authoritative  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§7.1–7.6; DEC-025/026/027/042; AI-DEC-201/233/237.

## Goal

One enemy at a time; the next enemy enters after defeat until the Run count is finished. Player commands: Normal Attack, Skill, Guard, Escape and Surrender. HP/Mana persist between enemies. No potions or equipment/skill loadout changes during a Run. Higher derived Initiative acts first; ties use one server-seeded roll. Invalid commands consume no turn, Mana or cooldown.

## Rules and boundaries

- **Owns:** Turn state, command validation, effect ordering, Guard, cooldowns, damage and combat log.
- **Depends on:** Stats, enemy AI, skills, resources, Infection, Escape, Surrender, Run lifecycle and server authority.
- **Cross-system contract:** Damage baseline: Dfinal = max(1, floor(Draw × K/(K + defence))), K=100 prototype; physical uses DEF, magic uses MRES. Order: Crit/Buff → mitigation → Guard → Shield. Guard reduces the next enemy Action by 50% after armour and before Shield, unless pierced. Cooldown 2 blocks the next two player Actions after casting.

## UI contract

Enemy intent, action outcome, turn order, timer, resources and recent events must be visible. Never require confirmation for each ordinary attack.

## Scope boundary

Visual flow demonstrated in Phase 1; all authoritative rules and replay/race cases in Phase 2.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS07-01` — Only valid commands in the current combat state advance a turn or consume Mana/cooldown. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS07-02` — Initiative tie uses exactly one persisted server-seeded roll; turn alternation and enemy intent follow versioned content. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS07-03` — Damage is resolved in the specified Crit/Buff → mitigation → Guard → Shield order with defined floors. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS07-04` — Guard applies to the next eligible enemy Action unless the move explicitly pierces Guard; cooldown counting matches the stated player-action semantics. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS07-05` — No potion or loadout change is possible during a Run; duplicate command submission cannot apply the same Action twice. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
