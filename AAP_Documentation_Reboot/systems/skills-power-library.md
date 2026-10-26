# SYS-16 — Skills & Power Library

**Domain:** Progression / Combat  
**New roadmap placement:** Sample skills Phase 1; full system Phase 4  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §16; DEC-064; AI-DEC-210/232; skill trade links: AI-DEC-226.

## Goal

Skills are Active or Passive and use explicit supported effect types. A Character has up to five skill slots: one at Level 1, then unlocks at Levels 10/20/30/40. Skill Orbs can be sold/traded before use; using duplicates converts them into Skill Fragments (Rank F=5 up through Mythic=200). Special skills are bought with fragments from a rotating Season shop. Awakening Shards are for player-to-player skill exchange only.

## Rules and boundaries

- **Owns:** Skill definitions/effects, slot unlocks, cooldown/Mana, Orbs, fragments, presets and library rotation.
- **Depends on:** Combat, inventory, progression, Season, market/trade and content validator.
- **Cross-system contract:** No unsupported effect types. No loadout changes during Combat/Run. Payment conversion and paid draw routes remain disabled at launch.

## UI contract

Show exact effect, target, cost, cooldown and unlocked/locked slot state.

## Scope boundary

Few supported sample skills Phase 1; library/progression Phase 4.

## Skill progression details

Slots unlock at Level 1, 10, 20, 30 and 40 (maximum five); unlocking a slot grants capacity only, not a Skill/Orb. Duplicate Skill Orbs convert to Skill Fragments by Rank: F=5, E=8, D=12, C=18, B=25, A=35, S=50, SS=70, SSS=100, SSS+=140, Mythic=200, Special=250. Special skills use a rotating Season shop and versioned deterministic content. Awakening Shards are sourced only from authored Boss/Event content and used only through the approved Skill Trade Station flow; Diamond-to-Shard conversion and ordinary gifting remain disabled at launch. Orbs/fragments/shards carried by a Character follow the per-currency death rules; market-escrowed Orbs follow market rules. Phase 1 skills are fixtures limited to effect types supported by the prototype engine.

## Awakening Shard reference values and trade restriction

For the approved Skill Trade Station only, the selected reference values are F=1, E=1, D=2, C=3, B=5, A=8, S=13, SS=21, SSS=34, SSS+=55 and Mythic=89 Awakening Shards. Special-rank skills are not eligible for this rank-value exchange unless a separate versioned review permits them. Shards are not a general-purpose currency and cannot be used as ordinary gifts or converted from Diamond. The Skill Trade Station exchange must satisfy the separate two-sided trade contract; these numeric values are design defaults pending implementation tests.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS16-01` — A Character has one slot at Level 1 and unlocks additional slots at 10/20/30/40 without granting skills automatically. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS16-02` — Phase 1 skills use only supported effect types; unsupported effects cannot publish or resolve. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS16-03` — Duplicate Orbs convert to the corrected Rank-specific Skill Fragment quantity table exactly once. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS16-04` — Special Skill shop rotation follows Season/version data, and no paid draw/conversion activates at launch. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS16-05` — Awakening Shards are restricted to the approved Skill Trade Station workflow and obey the currency's Character-death rule. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
