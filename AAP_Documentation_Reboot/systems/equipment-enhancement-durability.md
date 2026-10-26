# SYS-15 — Equipment, Enhancement & Durability

**Domain:** Equipment  
**New roadmap placement:** Small test set Phase 2; full progression Phase 4  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §15; DEC-080; AI-DEC-209/234/246/251.

## Goal

Full equipment slots: main/off-hand weapon, shirt, armor, pants, shoes, gloves, two rings (duplicates allowed) and bag. Items have unique identity/history, Rank, Quality, Affixes and durability. Broken equipment is inactive but not destroyed; bags never wear by default. Enhancement baseline: +1 to +10 normal tier and +11 to +20 with Red Seal; failure never destroys item, and Quality may drop at most once within each enhancement band.

## Rules and boundaries

- **Owns:** Equipment slot legality, handedness, stats, quality, affixes, durability, repair and enhancement costs/rates.
- **Depends on:** Stats, inventory, crafting, market, Skills, death disposition and content data.
- **Cross-system contract:** Phase 1 has no playable equipment catalogue or weapon grant. Do not add a weapon to make prototype combat appear more balanced. Enhancement numbers are experimental data.

## UI contract

Compare before/after stats, slot conflicts, durability and exact cost/risk before confirmation.

## Scope boundary

Small synthetic items Phase 2; full catalogue/repair/enhancement Phase 4.

## Enhancement detail

Enhancement success baseline: +1–3 = 90%; +4–6 = 80%; +7–8 = 70%; +9 = 60%; +10 = 55%. Above +10 requires one Red Seal per item; +11…+20 success rates are 50%, 45%, 40%, 35%, 30%, 25%, 20%, 15%, 10%, 5%, using one Ascendant Shard per attempt. Rank-specific materials are required at +1…+10 as specified by versioned balance data.

Quality is distinct from item Rank: Common 1.00×, Fine 1.05×, Superior 1.10×, Masterwork 1.15×, Perfect 1.20×. Each generated eligible item has at most two Affixes; no duplicate Affix ID or mutually-exclusive family can coexist, and values/stacking must stay within the versioned Affix pool/ceiling. Equipment compatibility is explicit versioned content: allowed slots, one-/two-handedness, off-hand role and dual-wield permission; two-handed main-hand items reserve both hand slots. One equipment instance cannot occupy multiple slots. Equip/swap validates locks and capacity atomically and never silently drops the replaced item. Effective equipment stat = round(base roll × Quality multiplier × (1 + 0.05 × enhancement level)). Gold attempt cost = ceil(rank base Gold × current Quality multiplier × enhancement level after attempt^1.4 / 100), minimum 1 Gold; rank base values F/E/D/C/B/A/S/SS/SSS/SSS+/Mythic = 100/150/225/350/525/800/1200/1800/2700/4000/6000. Special/quest-unique items cannot be enhanced unless a content flag allows it. A failed attempt can reduce Quality at most once in the +1–10 band and once in +11–20 band, never below Common; items are not destroyed. Costs use the Quality before the attempt. All probability/material/currency/RNG settlement is atomic and idempotent. These are selected defaults, not balance proof.

## Durability wear event rules

`wear_policy` is versioned per item template. By default, a weapon/secondary item actually used for a damaging Player Action loses 1 durability per Player Action; each eligible armor/clothing item loses 1 durability on an incoming Enemy Action that hits the Character. Multi-hit actions count as one wear event per relevant item, not per hit/animation packet. A skill that does not use the item does not wear it, and a missed attack does not wear defensive armor. Bags and capacity-granting items use `wear_policy=NEVER` by default so they cannot lose capacity mid-Run. At 0 durability an item is `BROKEN`: stats/effects become inactive; it may be repaired by an approved service but is never destroyed/deleted by breakage. Wear and lock updates are atomic/idempotent. This replaces ambiguous old numeric wear wording only within this scope; actual wear tests remain NOT RUN.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS15-01` — Slot compatibility, two-handed occupancy, off-hand eligibility and class eligibility come from validated versioned content. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS15-02` — One item instance cannot occupy two slots; illegal equip/swap fails atomically without item loss. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS15-03` — Durability wear occurs only on eligible actions; a broken item is inactive but not destroyed; bags never wear by default. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS15-04` — Enhancement rates/materials/cost are versioned, cost uses pre-attempt Quality, and a failed attempt never destroys the item. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS15-05` — Affix generation produces no more than two valid affixes, with no duplicate/exclusive family and bounded values. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
