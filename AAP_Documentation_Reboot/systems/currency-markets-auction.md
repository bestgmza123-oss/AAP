# SYS-17 — Currency, NPC Market, Player Market & Auction

**Domain:** Economy  
**New roadmap placement:** NPC economy Phase 3; fixed-price market Phase 4; Auction Phase 6  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§17, 29; DEC-064/078/112/125; AI-DEC-210/213/216/228/242/254/259; Mail ownership is governed by SYS-01.

## Goal

Currency classes remain distinct: Gold from play, Diamond paid currency, Gacha Ticket, Raid Token, Awakening Shard and Skill Fragments. Launch has no checkout, paid Gacha, cash-out, Diamond→Shard conversion or paid Raid-token refill. Fixed-price Market baseline: unlock after Level 5 and tutorial, 7-day listing, 5% fee only on successful sale, 20 active listing slots, up to 50 successful creations per Character per rolling UTC 24h window shared with Auction; collect at capital, with 100 kg claim storage for market-delivery claims and non-destructive overflow.

## Rules and boundaries

- **Owns:** Currency sources/sinks, vendor prices, Market listing lifecycle, escrow, fee, caps, claims and Auction settlement.
- **Depends on:** Inventory, death, Bank, Mail, delivery, trade, Season, guild and audit ledger.
- **Cross-system contract:** Market claim storage is not general-purpose player storage. Seller-death proceeds go to the specified sink, not successor Character. Auction is Phase 6, not early scope.

## UI contract

Show full price, fee, listing expiry, custody/location and consequences of unclaimed items before action.

## Scope boundary

NPC services Phase 3; fixed-price Market Phase 4; Auction Phase 6.

## Currency, Market and Auction details

Gold can be deposited/withdrawn between Character carry and Account Bank as ledger-backed transfers, not currency creation. Diamond, Gacha Ticket, Raid Token, Awakening Shard, Skill Fragments, escrowed/locked items and Character-bound currencies are not freely transferable or bank-convertible unless an explicit versioned allow-list says otherwise; launch-paid conversions remain disabled.

Fixed-price Market: browse/list from any Province after Level 5 and the market tutorial; item pickup occurs at the Capital. Listing lasts 7 days. Cancellation/expiry has no sale fee; successful sale charges 5% of final Gold price, rounded up with a minimum 1 Gold. Active cap is 20 listings, plus 50 successful creation events per Character per rolling UTC 24h shared with Auction; cancelled/expired creations still count toward the rolling creation limit. Escrow locks the item. Self-purchase and same-Account buyer/seller are rejected. Prices above 5× reference/median trigger a warning but are not auto-clamped.

If a Market purchase is not collected within 7 days, it enters Personal Claim Storage capped at 100 kg. Full storage routes items to a non-destructive overflow queue and blocks new intake/Market claims/Mail claims until space is made. Optional buyer-requested home delivery for a fixed-price Market purchase uses `50 + 25×rank_index + 10×distance_band` Gold; it is distinct from SYS-19 own-item delivery. Seller death does not stop escrowed sales, but proceeds/unsold item disposition follows the dead-seller sink rule.

Auction is a Phase 6 scheduled-session feature, not the fixed-price Market. A lot contains one eligible item or one all-or-nothing stack; items are escrowed on posting. Default daily session: join window 19:55:00–20:00:00 UTC, bidding begins at 20:00 UTC, base close 20:30 UTC; a bid committed during the final 15 seconds extends that lot by 15 seconds up to 20:35 UTC. Times are configurable versioned content, not client-local time. Only an explicitly joined living Character at a safe page and outside incompatible activity/locks may be protected; merely listing a lot does not grant seller protection. Freeze the lot manifest at join-open; no-lot sessions cancel without granting protection. A lot posted/assigned after the session join-open rolls to the next eligible session. Posting fee is 5 Gold, non-refundable. No reserve price or partial-stack bid. Later bids must exceed the high bid by at least `max(1, ceil(5% of current high bid))`; bid Gold is escrowed and the prior high bid refunded exactly once when superseded. Successful sale charges 5% (minimum 1 Gold); session close and per-lot settlement are atomic/idempotent. While any joined session is settling, joined participants' lethal transitions stay pending (world clocks keep their due times); after all lots settle, resolve those lethal events in deterministic order before the next normal command. A session that cannot settle must retain protection and remain settlement-pending; do not reopen bids or silently release protection.

## Economy accounting and Market viability gates

All Gold sources/sinks must write to the authoritative ledger. Proposed sources are completed Run rewards, deterministic NPC/quest/Season rewards and authored item-to-NPC sales if enabled. Proposed sinks are successful listing fees, crafting/enhancement, housing/rent/upkeep, repairs, travel/services and consumables. Player-to-player trade transfers existing Gold and never mints it. The expected Gold-sink share is a model target that ramps from 70% early game to 85% late game; it is not observed telemetry.

Initial editable NPC price anchors for deterministic access are Ration 80 Gold, Bandage 100 Gold, Antiviral Patch 250 Gold, Standard Serum 1,000 Gold, Purification Injector 3,500 Gold and Basic Fridge 800 Gold. These are selected content defaults, not a proven economic balance.

Do not label the Market/economy healthy unless the measured evidence supports all relevant gates: net Gold stock growth at most 20% per seven-day active cohort after transfers; median sold/reference price ratio 0.5–2.0 for anchored items; at least three independent sellers for commonly traded consumables/materials; median sale time no more than 48 hours for common items; suspicious self-trade/velocity flags reviewed; no essential survival item requires Diamond or a random draw; and common-item listed-to-sold conversion at least 20% over seven days. Minimum sample for price/time/liquidity claims is 100 weekly active market participants and 100 completed sales in a rolling 14-day window, at least 30 distinct sellers, and at least three independent sellers per common SKU. Until at least 20 valid sales from five independent sellers exist, use content/NPC anchors for reference prices; never use a single last sale as the reference. If sample sizes are insufficient, report **insufficient data**, not pass. These AI-selected go/no-go targets require measured telemetry and review; the paper model is not evidence of market viability.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS17-01` — Gold, Diamond, Gacha Ticket, Raid Token, Awakening Shard and Skill Fragments retain distinct ownership/transfer rules. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS17-02` — Fixed-price Market uses escrow, 7-day listing duration, 5% successful-sale fee, 20 active slots and shared rolling UTC creation cap of 50. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS17-03` — Market self-purchases/same-Account sales are rejected; retries cannot duplicate fee/item/proceeds. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS17-04` — Unclaimed market purchases use the 100 kg designated Claim Storage; overflow preserves items and blocks further intake as specified. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS17-05` — Seller-death proceeds and unsold escrow follow the named sink/custody path; no successor credit is allowed. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS17-06` — Auction follows scheduled UTC join/bid/settlement windows, frozen lot manifest, escrow, bid refund and participant safety rules. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
