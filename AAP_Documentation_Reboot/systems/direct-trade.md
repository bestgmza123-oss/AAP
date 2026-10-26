# SYS-18 — Direct Trade

**Domain:** Social Economy  
**New roadmap placement:** Phase 5  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §18; DEC-078; AI-DEC-226.

## Goal

Direct trade is two-sided and explicitly confirmed by both participants. Editing an offer after either confirmation resets confirmations. Ownership changes must be atomic; no one-sided gifting. Locks are released safely on expiry/cancellation and no partial transfer is allowed.

## Rules and boundaries

- **Owns:** Offer state, both confirmations, item/currency locks, cancellation/expiry and atomic settlement.
- **Depends on:** Inventory, currency ledger, Character death, Guild loans and Market.
- **Cross-system contract:** No gifts/one-way transfers at launch baseline. A timeout must not duplicate or strand ownership.

## UI contract

Display both sides of the offer and exact before/after assets; each party must confirm the same revision.

## Scope boundary

Phase 5 after Account, inventory and ledger foundations.

## Trade session rules

Direct trade is unavailable before Phase 5 and requires an approved Trade Station flow and anti-abuse checks. Both participants must be at eligible station proximity and in a state where trade is allowed. Each side must offer at least one eligible item or permitted Gold value; empty-side exchange and one-way gifts are rejected. Diamond and Gacha Ticket are never tradable. Awakening Shard may appear only in the approved Skill Trade Station exchange for eligible Skill Orb/Skill trades; it is not ordinary currency.

Every offer has a version. Any edit invalidates both parties' previous confirmations, updates the exact before/after diff, and recomputes item locks/capacity. Both parties must confirm the same final version. Offer expiry is 60 seconds unless a versioned content rule changes it. Settlement atomically transfers all approved items/Gold and ledger entries; failure/timeout/cancel releases locks exactly once and cannot create partial transfer. Reject same-Account self-trade, DEAD participants, ineligible/bound/locked items and insufficient capacity. Use stable idempotency keys and audit the terminal result.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS18-01` — A direct trade requires a valid two-sided offer and explicit confirmation by both participants. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS18-02` — Changing either offer after confirmation resets both confirmations and locks/preview reflect the same revision. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS18-03` — Diamond/Gacha Ticket and one-sided gifts are rejected; Awakening Shard is limited to allowed Skill trade. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS18-04` — Commit/expiry/cancel are atomic and idempotent; timeout cannot create a partial transfer or strand locks. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
