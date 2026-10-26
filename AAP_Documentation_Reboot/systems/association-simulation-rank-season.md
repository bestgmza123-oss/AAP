# SYS-25 — Association, Simulation/Tower, Rank & Season

**Domain:** Progression / Social  
**New roadmap placement:** Phase 4  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§16.3, 23; DEC-081/085/100/122; AI-DEC-207/223/230/255/259.

## Goal

Tower and Association Simulation are the same system. Simulation has an isolated 30-minute session timer, uses simulated combat state, and restores the real Character’s pre-entry HP and Hunger once on exit only if that same Character is still alive. It does not rewind world/UTC/rent/events; Stamina follows live elapsed-time rules, Infection follows elapsed world time, and Mana is Province-only outside Combat/Run/Simulation. At simulated HP 0, only the attempt fails; the parent session can continue within its original timer and prior cleared progress remains. Season cutoff uses UTC; DEAD Characters at the cutoff are ineligible.

## Rules and boundaries

- **Owns:** Association services, Simulation session/floors, Rank snapshots, season lifecycle and reward grants.
- **Depends on:** Stats, Combat, Hunger, time, Mail, Guild and skill-fragment rotation.
- **Cross-system contract:** Simulation restore and live-world event races must be deterministic; do not silently add free timer resets or re-roll previous rewards. Note the snapshot restore is an intentional exception and a potential balance exploit to verify in playtest, not an unresolved implementation fact.

## UI contract

Separate real vs simulated resources and timers visually; show session time and failed attempt state.

## Scope boundary

Phase 4.

## Season, Mail and Simulation boundaries

Player Rank resets monthly; item Rank and enemy Rank do not. Season cutoff is 23:59:59.000 UTC on the final configured day; due events at/before the cutoff reconcile before the immutable Rank snapshot. A Character DEAD in that snapshot is ineligible. Eligible rewards go through Account-owned Mail and are idempotent; a later Character death does not revoke a validly granted reward. Reward content/amount is versioned data.

Simulation has a hard 30-minute session timer. Simulated HP reaching zero fails only the current attempt; no current-floor reward/EXP/token or floor advancement is granted, the parent session may continue inside its original time, and prior cleared progress remains. It never causes real Character death or grants a free timer/resource reset. On exit, restore only the pre-entry live HP/Hunger snapshot once if the same Character is still alive after time reconciliation; never restore Stamina, Mana, Infection, cooldowns or world clocks.

## Season Voucher tiers

The initial deterministic Season Voucher amount by final eligible Rank is: Rank 1 = 10; Ranks 2–3 = 7; Ranks 4–10 = 5; Ranks 11–25 = 3; Ranks 26–50 = 2; eligible Rank 51+ = 1. Mail grants an Account-owned message containing a Character-bound Voucher; redeem it through the deterministic Season Exchange, never a random draw. No Diamond or uncapped power-item reward is implied. Any Skill Orb reward must come from an explicit versioned deterministic pool. The tier table is an AI-selected baseline and has not been runtime/balance tested.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS25-01` — Tower and Association Simulation are one system; Simulation session is capped at 30 minutes and failed HP-zero attempts do not advance the floor or grant current-floor rewards. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS25-02` — Entry/exit/reconnect restores the pre-entry live HP/Hunger snapshot at most once and only if the same Character is still alive after due events reconcile. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS25-03` — Simulation never rewinds UTC/world/rent/mission clocks and never restores Stamina/Mana/Infection/cooldowns. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS25-04` — Season Rank snapshot uses the UTC cutoff; DEAD at cutoff is ineligible and previously valid Account Mail rewards are not revoked by later death. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS25-05` — Voucher tiers are deterministic/versioned and Mail grants/claims cannot be duplicated. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
