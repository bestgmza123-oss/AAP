# SYS-19 — Bank & Delivery

**Domain:** Economy / Transport  
**New roadmap placement:** Phase 4  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §19; AI-DEC-244/248/257.

## Goal

Bank is account-level money management, not item storage. Gold in the Account Bank survives Character death according to the asset baseline. Delivery is a paid Gold service with a versioned tariff/duration, quoted for 60 seconds, item locks and non-destructive claim handling. If a Character dies before arrival on an own-item delivery, the payload follows the explicit death sink rule and the destination reservation is released once; the charged fee is retained under the selected baseline.

## Rules and boundaries

- **Owns:** Account ledger, supported currency conversions, bank balances, delivery quotes/jobs and claim/expiry.
- **Depends on:** Death, housing, inventory, market, time, payment boundary and audit.
- **Cross-system contract:** No unsupported currency conversions or implicit refunds. Never treat Bank as inventory storage.

## UI contract

Show available balance, source account, fee, ETA, item custody and claim state.

## Scope boundary

Phase 4; ledger and death-order tests before activation.

## Delivery tariff and settlement

Own-item Delivery is distinct from buyer-requested Market home delivery. Own-item fee: `ceil(10 + 3×weight_kg + 8×distance_units)` Gold, with weight derived from exact grams and distance from the versioned route. Duration: `clamp(300 + 600×distance_units + 60×weight_kg, 300, 43200)` seconds (5 minutes to 12 hours). Quote and destination-capacity reservation expire after 60 seconds. Acceptance atomically charges Gold, locks eligible items and creates one immutable job. Items in transit cannot be re-used elsewhere. Arrival settles once; invalid/full destination uses the existing non-destructive claim/overflow path. If owner Character death occurs before arrival, payload is forfeited to the designated sink and the destination reservation is released once; the fee remains charged under the selected baseline.

Bank conversion is unavailable unless a versioned allow-listed rule names input/output/ratio/fee/limits/effective dates. Bank is not arbitrary item storage and transfers do not mint Gold.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS19-01` — Bank tracks Account-level currency and never acts as item storage or arbitrary conversion. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS19-02` — Each allowed conversion is versioned with explicit input/output/ratio/fee/limit/effective period. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS19-03` — Own-item delivery quotes and destination reservations expire after 60 seconds; acceptance atomically charges, locks eligible items and creates one job. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS19-04` — Delivery arrival/full-destination behavior follows non-destructive claims; own-item delivery fee/ETA is not confused with Market home delivery. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS19-05` — Owner Character death before own-item Delivery arrival follows the designated sink/fee/reservation rule exactly once. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
