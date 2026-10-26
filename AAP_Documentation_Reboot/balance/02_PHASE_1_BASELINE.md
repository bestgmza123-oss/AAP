# Phase 1 Baseline Parameters (Prototype)

This file is the canonical home for Phase 1 prototype values. These numbers are carried forward from the old design baseline; they are **not verified balance**. Later-phase values belong to the owning system/content data and must remain inactive until that phase.

| Parameter | Baseline | Note |
|---|---:|---|
| Stat starting values | STR/VIT/AGI/INT = 1 each | AI-selected baseline; every value versioned |
| Stat points at creation | 16 | Allocate as whole points |
| Stat points per level | +3 | Level-up |
| Stat soft / hard cap | 100 / 250 | Above 100, effective excess counts at 0.5 |
| Max level | 200 | Phase 1 encounter content limited to levels 1–50 |
| Max HP | 100 + 12×Eff(VIT) + 3×Level | Weapon/equipment content absent in Phase 1 |
| Max Mana | 30 + 10×Eff(INT) + 2×Level | Versioned formula |
| Physical ATK | WeaponPower + 10 + 2.3×Eff(STR) + 0.25×Level | Phase 1 WeaponPower = 0 |
| Magic ATK | SkillPower + 2×Eff(INT) + 0.25×Level | SkillPower is content data |
| DEF | ArmorDEF + 5 + 1.8×Eff(VIT) + 0.15×Eff(AGI) | ArmorDEF=0 where no gear exists |
| MRES | GearMRES + 5 + 1.8×Eff(INT) + 0.2×Eff(VIT) | GearMRES=0 where no gear exists |
| Initiative | 10 + 0.7×Eff(AGI) + 0.1×Level | Used for opening turn |
| Crit chance | min(25%, 3% + 0.08%×Eff(AGI) + configured bonus) | Crit power baseline 1.5× |
| Damage mitigation | max(1, floor(Draw×100/(100+A))) | A=DEF or MRES; Guard/Shield follow system rules |
| EXP cumulative L1–50 | 86,456 | Paper baseline; validate from formula during balance work |
| Stamina cap (fixture preview only in Phase 1) | 240 | Real resource/regeneration activates in Phase 2 |
| Stamina regen (fixture preview only in Phase 1) | +1 / 4 full eligible minutes | Phase 2: offline eligible except dungeon Run; no retroactive Run time |
| Mana regen (fixture preview only in Phase 1) | 1% MaxMana / full minute | Phase 2: Province only outside live Combat/Run/Simulation |
| Hunger max (Phase 2 parameter; not active Phase 1) | 100 | 100 = fed; 0 = death |
| Hunger decay (Phase 2 parameter; not active Phase 1) | −1 / 30 full server-elapsed minutes | Phase 2: live/offline time; Fridge is separately phase-gated |
| Infection range (Phase 2 parameter; not active Phase 1) | 0–100 | Phase 2: maximum causes death; one eligible roll per Action |
| Standard Run enemies | 4–7 normal enemies | Rolled once and persisted at Run creation |
| Run Stamina cost | 18 + 2×ceil(dungeon_level/5) | Lv1–5 = 20; Lv6–10 = 22 |
| Run hard timeout | 30 minutes | Offline time counts; timeout gives no Run reward/refund and no death |
| Starter carry capacity | 20 kg total | Bag weight included; worn gear excluded |
| Starter items | Ration ×2; Bandage ×2; Grain ×4; Herb ×2; Cloth Scrap ×2 | Bound, non-marketable; no weapon/Gold/Diamond/Gacha/Companion/Robot |
| Guard reduction | 50% | Next enemy Action after armour, before Shield; piercing can bypass |
| Skill cooldown example | 2 player Actions | Blocks the next two player actions after cast |
| Traits | 1 guaranteed; extra conditional odds 30%/12%/5%/1% | Trait system later; expected count 1.338 |

## Inactive in Phase 1

Travel, homes/Fridge, Market, equipment catalogue, repair/enhancement, Trait/Class activation, Companion/Robot, Guild, Raid, Invasion, Auction, Simulation/Season, public player Auth, paid features. These values/content must not become active as a shortcut to passing Phase 1.

## Visual-demo-only fixture values (not canonical balance)

Any Escape UI calculation shown in the Phase 1 UI prototype may use an explicitly labelled example fixture for `Z` and carried/retained `W` so the user can inspect the formula `ceil((20 + 5×W) × Z)`. Such values must be stored under an unmistakably `fixture_*` key and labelled non-final in the UI. Do not treat the example multiplier/cost as an approved production balance value; the owning content/balance data must provide the real value before authoritative implementation.
