# SYS-33 — Server Authority & Integrity

**Domain:** Cross-Cutting Foundation  
**New roadmap placement:** Design from Phase 1; real enforcement Phase 2 onwards  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§31–32; DEC-053–063; AI-DEC-205/208/250; later user directions RECON-001/002 override contradictory UI-first assumptions.

## Goal

The server is authoritative for damage, initiative, random rolls, loot, currency, time, death, weight, cooldowns, state transitions, ownership and final transaction results. Mutations are validated server-side, atomic where needed, idempotent under retry, and auditable. Persist server-generated random outcomes and due-event order. Draft content cannot alter live play.

## Rules and boundaries

- **Owns:** Trust boundaries, command envelope, identity, transactions, idempotency, RNG, event replay, content publishing and audit.
- **Depends on:** All systems, especially death, inventory, Run, time, economy, social ownership and admin.
- **Cross-system contract:** Never treat a UI state or client ID as proof. A failed or timed-out response must be recoverable by querying the committed result; do not blindly repeat a non-idempotent operation.

## UI contract

Waiting UI prevents duplicate submission and exposes recovery; never claims success before server confirmation.

## Scope boundary

Cross-cutting from the first slice; production enforcement must pass Phase 2 tests.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS33-01` — Server-side authority validates damage, initiative, RNG, loot, currency, weight, time, cooldown, death, ownership and transaction outcomes. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-02` — Every non-idempotent mutation has a stable idempotency identity and querying a timed-out result is safer than blind resubmission. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-03` — An item/quantity has one location/lock; concurrent operations preserve conservation and cannot duplicate or silently delete assets. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-04` — Due events and RNG outcomes are persisted and replay deterministically; retries after committed effects do not apply them again. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-05` — Draft/unpublished content never affects live gameplay; secrets and privileged credentials are never placed in player-facing UI. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
