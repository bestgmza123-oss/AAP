# SYS-13 — Items, Weight & Inventory

**Domain:** Inventory  
**New roadmap placement:** Visible prototype Phase 1; authoritative Phase 2  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §13; DEC-035/073; AI-DEC-206/225/247.

## Goal

Carrying capacity is weight-based, not slot-count based. Store physical weight as integer grams. Starting total carrying capacity is 20 kg with the bag weight included; worn/equipped gear is excluded from carried weight. **Phase 1 uses display/test fixtures only** to prove the inventory and loot UI. The real account-scoped, idempotent starter entitlement activates in Phase 2: starter bag (20 kg total capacity), Ration ×2, Bandage ×2, Grain ×4, Herb ×2 and Cloth Scrap ×2, all bound/non-marketable. No starting weapon, Gold, Diamond, Gacha Ticket, Companion, Robot or rare marketable asset. Character death/recreation must never issue the entitlement again.

## Rules and boundaries

- **Owns:** Item identity/stacking, weight, bag capacity, location/locks, starter entitlement and partial stack movement.
- **Depends on:** Loot, crafting, market escrow, mail, homes, vehicles, Companion custody, death and trade.
- **Cross-system contract:** A bag swap that would exceed capacity is rejected without auto-dropping/deleting items. Starter entitlement cannot be reissued by Character recreation.
- **Phase boundary:** Phase 2 covers carried inventory, Run-loot custody, exact weight, protected movement and the Account-scoped starter grant. Starting Room/home storage access and container capacity are owned by SYS-20 in Phase 3; Phase 2 must not implement a room storage route or physical Starting Room container.

## UI contract

Loot UI shows total/remaining kg and quantity selection; errors say exactly how much over capacity.

## Scope boundary

Prototype Phase 1; exact-gram and ownership transactions Phase 2.

## Item location and stack rules

A physical item/quantity must be in one authoritative location/state: carried inventory, home/room storage, Market escrow, direct-trade lock, in-transit delivery, Companion mission custody, Guild storage/loan, Mail claim or an explicit recovery/overflow queue. An item in a locked/escrowed/in-transit state cannot be sold, equipped, salvaged, sent to another job or counted twice in another capacity. Store weight as exact integer grams. Partial-stack movement conserves source quantity = retained + transferred; capacity is checked atomically at commit.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS13-01` — Inventory weight uses integer grams; bag weight plus contents count toward capacity while worn gear is excluded. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS13-02` — A bag swap that would exceed new capacity is rejected without auto-drop or deletion. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS13-03` — Every item quantity has one authoritative location/lock and cannot be used/transferred while escrowed, in transit or mission-locked. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS13-04` — Loot selection validates weight and quantity before atomic claim; duplicate retries cannot duplicate items. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS13-05` — Phase 1 starter contents are fixture display only; real Account grant occurs once in Phase 2 and never repeats after death/recreation. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
