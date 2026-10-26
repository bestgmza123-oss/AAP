# SYS-06 — Stats, Derived Values, Traits & Class

**Domain:** Progression  
**New roadmap placement:** Stats Phase 1–2; Traits/Class Phase 4  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§6.1–6.3; DEC-037/038/039/124; AI-DEC-201/211/217/252.

## Goal

Core Stats: STR (physical attack), VIT (Max HP/DEF), AGI (initiative/crit chance, not crit power), INT (Max Mana/magic power/MRES). Baseline starts each Stat at 1, grants 16 points at creation and +3 per level; hard cap 250, soft diminishing-return threshold 100 where values above 100 count at half effect. Level cap 200, but early encounter content is limited to the relevant Phase. Traits use conditional additional rolls; one is guaranteed, then 30%/12%/5%/1% for traits 2–5, no duplicate, max five. Expected count is 1.338. Class is deferred to Phase 4.

## Rules and boundaries

- **Owns:** Stat allocation, derived formulas, EXP curve, milestones, Trait catalogue/stacking and Class modifiers.
- **Depends on:** Combat, equipment, skills, Character creation, progression rewards and balance registry.
- **Cross-system contract:** Formulas and ratios live in one balance source. Current formulas are design defaults, not proof of balance. Phase 1 has no weapon; WeaponPower = 0.

## UI contract

Character sheet must expose allocated/effective Stats and explain diminishing returns; UI never owns formulas.

## Scope boundary

Stat test fixtures in Phase 1; authoritative progression Phase 2; Traits and Class Phase 4.

## Stat formulas and progression baseline

Let `L` be Character level and `Eff(S) = min(S,100) + 0.5×max(0,S−100)`. The current delegated formulas are:

- `MaxHP = 100 + 12×Eff(VIT) + 3×L`
- `MaxMana = 30 + 10×Eff(INT) + 2×L`
- `PhysicalATK = WeaponPower + 10 + 2.3×Eff(STR) + 0.25×L`
- `MagicATK = SkillPower + 2×Eff(INT) + 0.25×L`
- `DEF = ArmorDEF + 5 + 1.8×Eff(VIT) + 0.15×Eff(AGI)`
- `MRES = GearMRES + 5 + 1.8×Eff(INT) + 0.2×Eff(VIT)`
- `Initiative = 10 + 0.7×Eff(AGI) + 0.1×L`
- `CritChance = min(25%, 3% + 0.08%×Eff(AGI) + configured bonuses)`; default critical multiplier is 1.5× unless versioned skill/gear data overrides it.
- Next-level EXP requirement: `ceil(99 + 60×L + 0.2×L²)`. The cited cumulative requirement for levels 1–50 is 86,456 and must be regression-checked from the formula, not hard-coded as a second authority.

Allocation uses integer points. If a Stat reaches its cap, the server/UI must let the player allocate remaining points to another eligible Stat rather than silently lose them. Respec is free before Level 10 in a safe location; from Level 10 onward it uses a Character-bound Respec Seal or a separately approved/versioned service. No respec during Run/Combat. The active encounter/content scope remains capped at the roadmap-defined level even though the progression formula supports Level 200.

Every-10-level milestone baseline: Level 10 grants 2 Rations + 2 Bandages; Level 20 grants one Respec Seal; Level 30 one bound Common crafting-material pack; Level 40 two standard healing items + one Ration; Level 50 a bound non-stat title; Levels 60–200 each 10 levels grant a versioned bound resource pack; Levels 100/150/200 also grant non-stat title/portrait-frame cosmetics. These are AI-selected design defaults and require validation before activation.

## Trait catalogue baseline (deferred activation)

Starting Trait is guaranteed; roll additional Traits conditionally: second 30%, third 12%, fourth 5%, fifth 1%, maximum five and no duplicate. Expected starting count under the conditional model is 1.338. Initial candidate catalogue: Stout (+6% MaxHP, −4% Initiative), Quick (+5% Initiative, −4% MaxHP), Focused (+6% MaxMana, −4% PhysicalATK), Brutal (+5% PhysicalATK, −5% MaxMana), Keen (+2 percentage points CritChance, −5% MaxHP), Disciplined (+5% Stamina recovery, −4% MagicATK), Scavenger (+5% common-material yield, −4% PhysicalATK), Fortified (+5% DEF, −4% Initiative). At most one offensive percentage bonus and one resource/defence bonus may stack; positive Class+Trait contribution is clamped to 1.25× baseline.

## Class baseline (deferred activation)

Four prototype classes: Vanguard (+8% HP, +5% DEF, −5% Initiative); Striker (+8% physical ATK, −5% Mana); Arcanist (+8% magic ATK, +5% Mana, −5% physical ATK); Scout (+8% Initiative, +2 percentage points CritChance, −6% HP). Classes do not hard-restrict ordinary weapons/skills. Selection is at Character creation when Class activates; changing Class uses the designated rare/story quest, not a paid sale. Existing classless Characters use the “Echoes of the Unawakened” migration quest; never assign a hidden default Class.

## EXP and milestone regression anchors

The level-up formula is `EXP_next(L) = ceil(99 + 60×L + 0.2×L²)`. Regression anchors calculated from this formula are `EXP_next(49)=3,520`, cumulative EXP from Level 1 to Level 50 = `86,456`, `EXP_next(199)=19,960`, and cumulative EXP from Level 1 to Level 200 = `1,743,121`. These values are check outputs, not a second formula source. Only Level 1–50 encounter/content fixtures are active in early phases; higher-level content must remain gated until authored and reviewed.

Every-ten-level milestone defaults are versioned content: Level 10 gives 2 Rations + 2 Bandages; Level 20 gives 1 Respec Seal; Level 30 gives one bound Common crafting-material pack; Level 40 gives 2 standard healing items + 1 Ration; Level 50 gives a bound non-stat title. Each 10-level milestone from 60–200 gives a versioned bound resource pack; Level 100/150/200 also gives a non-stat title/portrait-frame cosmetic. Grant only once per earned milestone. These AI-selected values are design defaults and not activation or balance evidence.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS06-01` — Starting Stats, 16 creation points, +3 per level, soft cap 100 and hard cap 250 are applied consistently using integer point allocation. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS06-02` — Derived HP/Mana/ATK/DEF/MRES/Initiative/Crit formulas use the defined Eff(S) diminishing return and versioned balance inputs. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS06-03` — EXP requirement and cumulative regression values are calculated from the formula rather than duplicated constants; content beyond the active phase is gated. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS06-04` — Respec follows the safe-location/level/Seal rules and is blocked in Combat/Run. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS06-05` — Traits use the conditional roll sequence, no duplicate traits and the combined positive Class/Trait cap; Class changes use the designated quest and no hidden default. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
