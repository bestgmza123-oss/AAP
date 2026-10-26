# SYS-20 — Housing, Starter Room & Rentals

**Domain:** World / Property  
**New roadmap placement:** Phase 3  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§20.1–20.7; DEC-065/079/101/105/110; AI-DEC-203/212/219/221/256/260/261.

## Goal

The Starter Room is free and has 10 kg storage, no parking and no Fridge. Tiers: Small 40 kg, Medium 120 kg, Large 300 kg, Estate 600 kg; corresponding parking slots 0/1/2/3 after Starter Room. Weekly rents: Small 600G, Medium 1,500G, Large 3,000G, Estate 5,400G; purchase prices are 52× weekly rent. Lease is prepaid, no automatic renewal or grace period. Expiry/ejection/Fridge/overflow choices use the explicit time/death ordering.

## Rules and boundaries

- **Owns:** Property tier, ownership/lease, storage capacity, parking, rent/debt, expiry and overflow choice.
- **Depends on:** Hunger/Fridge, inventory, travel, Raid, Bank, death, account debt and mail.
- **Cross-system contract:** One primary home; no multi-house rental business or real-estate market without a new decision. Excess rental overflow has a 48-hour decision window then follows the specified irreversible disposition. Death at or before lease expiry wins the tie and prevents duplicate expiry fines.

## UI contract

Always show capacity, tier, parking, rent term, expiry, notices and exact overflow consequences.

## Scope boundary

Phase 3; full rental/death/time tests required before public/shared access.

## Property pricing and expiry detail

| Tier | Storage | Parking | 7-day rent | 30-day rent | 90-day rent | Purchase price | Owned-home upkeep / 7 days |
|---|---:|---:|---:|---:|---:|---:|---:|
| Starter Room | 10 kg | 0 | Free | — | — | — | — |
| Small | 40 kg | 0 | 600 Gold | 2,186 Gold | 5,400 Gold | 31,200 Gold | 150 Gold |
| Medium | 120 kg | 1 | 1,500 Gold | 5,465 Gold | 13,500 Gold | 78,000 Gold | 375 Gold |
| Large | 300 kg | 2 | 3,000 Gold | 10,929 Gold | 27,000 Gold | 156,000 Gold | 750 Gold |
| Estate | 600 kg | 3 | 5,400 Gold | 19,672 Gold | 48,600 Gold | 280,800 Gold | 1,350 Gold |

30-day rent uses 85% of prorated weekly rent; 90-day rent uses 70% of prorated weekly rent. Purchase price is 52× weekly rent and owned-home upkeep is 25% of weekly rent per 7 days. Basic Fridge costs 800 Gold and is obtained through ordinary play. Storage capacity is fixed; there is no in-place upgrade. These are editable content defaults, not market-observed economics.

Warnings occur at T−96h, −72h, −48h, −24h, −6h and −1h, plus expiry; post-expiry overflow notices occur at +24h/+42h during a 48-hour choice window. Expiry fines are one-time 10% of immutable weekly base rent (Small 60, Medium 150, Large 300, Estate 540 Gold) and create Account debt, no interest/compounding/automatic collection. Outstanding debt blocks a new rental. If death is at or before lease expiry, death wins the tie; do not also assess that term's expiry fine or run living-owner relocation/Fridge/overflow handling for the same branch.

## Lease-term events, expiry, Fridge and overflow state

Each lease term captures immutable `lease_id`, `lease_term_version`, `tier_snapshot`, `base_rent_7d_gold_snapshot` and rent-content version. Pre-expiry warnings are T−96h/−72h/−48h/−24h/−6h/−1h and at expiry; the post-expiry overflow window sends +24h/+42h warnings. Warning/idempotency keys include lease ID, term version and warning point, so stale events from a successfully renewed old term are no-ops. Manual renewal must atomically pay and replace the term strictly before current `expires_at_utc`; it increments the term version and supersedes old events. No auto-renew, auto-debit/retry or grace period.

For a living Character whose unpaid expiry branch wins: atomically mark the term EXPIRED, remove old-home residence eligibility, relocate to Starter Room and create a single immutable disposition for every ready-food unit still in the rental Fridge. Fridge food is discarded at the expiry logical instant; it does not enter the general overflow vault and must not be counted twice. The old-home Fridge cannot feed at or after expiry. If Character death's logical effect time is less than or equal to lease expiry, death is the terminal branch instead: apply Character-death asset rules and do not also charge that term's expiry fine, relocate, separately dispose Fridge stock or open the overflow window. If expiry is strictly earlier than death, execute the normal living-owner expiry branch first and later death only applies to assets still in custody.

Non-Fridge rental storage above Starter Room's 10 kg capacity enters a `rent_overflow_vault` with a 48-hour choice deadline from expiry; +24h/+42h notices do not extend it. Display exact item/stack quantity, weight and fit preview. Accept KEEP/DISCARD choices only while `server_now_utc < selection_deadline_utc`; at the deadline revalidate current Starter Room contents and capacity atomically. Retain only selected quantities that actually fit; if there is no valid selection, apply the deterministic fallback. Permanently delete each unretained excess unit in this specific rental-overflow vault, including protected/quest-labelled items while there; this is a narrow explicit exception, not permission to delete Market/Guild/Delivery escrow or unrelated storage. Log each source quantity and one terminal disposition: retained, deleted, or handled by Character-death disposition. Deletion has no recovery route; quest-critical items that may enter overflow need a normal reacquisition path or progression-state alternative.

Unpaid expiry assesses at most one `ceil(10% × captured 7-day base rent)` fine per `(lease_id, lease_term_version)`: current tier values are Small 60G, Medium 150G, Large 300G, Estate 540G. The fine creates immediately due Account-level rental debt, with no interest, compounding or automatic collection. Partial payment is allowed only from eligible Account Bank Gold via atomic ledger transaction; debt blocks new rental and persists through Character death/recreation. Previously valid debt is not erased if a later lease is terminated by death. Tests `V18-HOME-001…005` and linked Hunger/time ordering remain design definitions, NOT RUN.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS20-01` — Home tiers use fixed capacity and the listed rent/purchase/upkeep values; no in-place storage upgrades or multi-house rental business is inferred. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS20-02` — Rent is prepaid with no auto-renew, automatic debit/retry or grace period; a renewal must commit before expiry. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS20-03` — At expiry, death-versus-lease chronology is decided by logical UTC time; if death is at/before expiry, do not run the living-owner expiry branch as well. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS20-04` — Old-home Fridge eligibility ends at lease expiry; expiry and Character death cannot both disposition the same contents. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS20-05` — Rental overflow previews exact quantities/weight, provides the 48-hour choice window and finalizes retained/deleted/death-dispositioned units once. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
