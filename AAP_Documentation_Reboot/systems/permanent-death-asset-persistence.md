# SYS-02 — Permanent Death & Asset Persistence

**Domain:** Identity & Survival  
**New roadmap placement:** Phase 2  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§4.2–4.3; DEC-014/015/097; AI-DEC-205, 210, 257, 261.

## Goal

A Character becomes DEAD only from HP = 0, Hunger = 0, or Infection reaching its maximum. The death record remains for history; a dead Character cannot act again. The Account survives and can create a successor Character. Character-bound assets and progression follow the named death-disposition rules; Account-level Gold and paid Diamond survive according to the current legacy baseline.

## Rules and boundaries

- **Owns:** Death causes, terminal DEAD state, per-asset custody transition and audit.
- **Depends on:** Resources, inventory, market escrow, homes/rent, Companions, guild/loans, mail, delivery and world-time events.
- **Cross-system contract:** Do not invent new death causes. Do not infer an unnamed asset disposition. Reconcile due events first and apply each asset disposition exactly once. No resurrection by retry/restore.

## UI contract

Irreversible-action warning and death summary must explain confirmed losses before a risky action where relevant.

## Scope boundary

Phase 2 death/ledger/race tests; public/shared testing requires a separate operational gate.

## Asset disposition baseline

| Asset/currency class | On permanent Character death |
|---|---|
| Account-owned Gold / Bank balance | Survives at Account level |
| Gold carried by Character | Forfeited to the audited sink |
| Paid Diamond | Survives at Account level; no automatic refund from unrelated systems |
| Raid Token, Gacha Ticket, Awakening Shard, Skill Fragments, event/quest currency and other Character-bound currencies | Lost with the Character unless an explicit versioned per-currency exception exists |
| Level, EXP, Stats, Skills, Traits, bag/inventory, worn gear, vehicle, Companion and Robot | Character-bound loss/disposition; keep the historical death record |
| Home/rental and stored Character-owned assets, personal Guild position and Character-bound Season/collection assets | Follow the Character-death disposition rules; Guild-owned assets and donations remain Guild-owned |
| Guild-loaned personal property or owner-bound return claims | Still the Character's property until the exact versioned asset-type death rule is applied once; never convert it to Guild ownership or successor ownership |
| Items already in Market escrow | Continue through the named seller-death path; never also remain usable in the dead Character's inventory |
| Market proceeds or unsold escrow items when seller is dead at settlement | Route to `dead_seller_forfeiture_sink`; no successor Character credit |
| Unsold escrow returning to a living seller | Return to the valid owned location or a non-destructive pending claim if capacity is full |

Every physical quantity and currency amount needs one terminal disposition with rule version, source, destination/sink, transaction ID and audit reference. Reconcile events due at/before the logical death instant before commands and serialize concurrent actions; worker arrival order does not override logical time. A retry must return the committed result, not resurrect a Character or repeat a disposition.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS02-01` — Only HP=0, Hunger=0 or Infection at maximum can cause Character death. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS02-02` — Every asset/currency follows one explicit disposition row; unclassified types block only that disposition instead of receiving guessed treatment. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS02-03` — Account Bank Gold and paid Diamond survive; carried Gold and Character-bound currencies follow their distinct loss rules. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS02-04` — Market escrow/seller-death and Guild loan custody cannot duplicate or credit a successor Character. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS02-05` — Death, concurrent mutation and retry produce one immutable death record and one terminal asset disposition per source quantity. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
