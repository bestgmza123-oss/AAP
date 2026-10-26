# SYS-31 — Random Rewards & Payments

**Domain:** Commercial Scope  
**New roadmap placement:** Disabled at launch; reopening requires new scope decision  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §29; AI-DEC-216; any reopening requires explicit new owner scope decision.

## Goal

Launch baseline disables checkout/payment processing, paid Gacha Tickets, paid draws, Diamond→Shard conversion, Diamond Raid Token refill and cash-out. Non-paid deterministic rewards and ordinary Gold vendors can exist. If paid randomized rewards are ever reconsidered, require an explicit scope change, current legal/platform/age/payment review, published per-item odds, auditable server RNG, refund/reversal policy and acceptance evidence.

## Rules and boundaries

- **Owns:** Launch exclusion flags, eligible deterministic reward channels and any future approved scope change.
- **Depends on:** Currency, item rewards, Mail, Gacha, Auction, platform/legal review.
- **Cross-system contract:** Do not invent paid prices, probabilities or cash-out flows. A placeholder is not permission to implement.

## UI contract

Disabled features must appear unavailable, not as broken or secretly working UI.

## Scope boundary

No launch phase. Future only after new explicit approval and review.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS31-01` — Checkout, paid draws/tickets, cash-out, Diamond-to-Shard and paid Raid Token refill remain disabled at launch. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS31-02` — Disabled commercial UI communicates unavailable status and exposes no hidden mutation path. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS31-03` — No probability/price/legal/compliance claims are invented for unapproved monetization. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS31-04` — Reopening requires an explicit scope decision plus current platform/legal/age/payment review and test evidence. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
