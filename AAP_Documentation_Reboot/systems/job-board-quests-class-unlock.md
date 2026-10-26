# SYS-26 — Job Board, Quests & Class Unlock

**Domain:** Progression / Narrative  
**New roadmap placement:** Story/mandatory tutorial Phase 3; Job Board/Class Phase 4  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§23–24; DEC-069/128; AI-DEC-211/223/239/252.

## Goal

Job Board contracts include exploration, delivery, craft-and-deliver, dungeon clear, ability test, story, service unlock, Guild and event kinds, with phase-gated availability. Baseline limit: hold up to three jobs plus one main-story task; daily refresh at 00:00 UTC. Class is a progression system in Phase 4, not duplicated under Stats: four starter archetypes (Vanguard, Striker, Arcanist, Scout) with versioned modifiers; changing Class is via a designated story/quest. Existing classless Characters follow the migration quest “Echoes of the Unawakened” before Class-gated behavior is activated.

## Rules and boundaries

- **Owns:** Quest taxonomy, eligibility, caps, refresh, claims, story progression and Class acquisition/change.
- **Depends on:** Tutorial, world locations, Stats, crafting, Run, Association/Season and Guild.
- **Cross-system contract:** No quest kind before its system phase. Do not apply a default Class silently or double-apply a migration reward.

## UI contract

Show prerequisites, progress, expiry/reset time, rewards and failure/claim states.

## Scope boundary

Core onboarding Phase 3; expanded Job Board and Class Phase 4.

## Job Board/Class details

Job Board refreshes at 00:00 UTC. A Character may hold up to three regular jobs plus one main-story task. Quest types include explore, deliver resources, craft-and-deliver, clear dungeon, ability test, story, unlock service, Guild and event; only activate a type when its source system is in scope.

Class starter modifiers: Vanguard +8% HP/+5% DEF/−5% Initiative; Striker +8% physical ATK/−5% Mana; Arcanist +8% magic ATK/+5% Mana/−5% physical ATK; Scout +8% Initiative/+2 percentage points CritChance/−6% HP. No class hard-locks normal gear or skills; changing Class requires the designated rare/story quest. Class and Trait bonuses share the combined 1.25× positive clamp.

## Board generation and contract lifecycle

At 00:00 UTC the server generates one versioned Board seed/pool shared by a Province and level band. No paid reroll/refresh. Normal Board contracts expire after seven days; Event/Guild contracts use an explicit content expiry and cannot extend silently. Before acceptance, show objective/proof condition, Province/map, expiry, abandon consequence and exact reward. Progress derives only from server-validated events. Claims are once-only/idempotent. Abandoning grants no reward and prevents the same contract being re-accepted until the next Board refresh. Accept/abandon is blocked during active Run/Combat; DEAD Characters cannot progress or claim. A contract kind must not appear until its required system is in the active phase.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS26-01` — Job Board holds up to three regular jobs plus one main-story task; refresh is 00:00 UTC. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS26-02` — Quest type is unavailable until its prerequisite system/phase is active. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS26-03` — Quest eligibility, progress, expiry and reward claims are idempotent and explain failure/disabled reasons. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS26-04` — Class acquisition/change follows the approved story quest; existing classless Characters have no hidden default and migration applies once. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
