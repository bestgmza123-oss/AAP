# Cross-System Contracts

## CC-01 — Run / Combat / Loot

- SYS-09 owns Run lifecycle, entry cost, timer, enemy sequence, pending rewards and terminal result. SYS-07 owns turn resolution. SYS-10 owns Escape/Surrender eligibility and consequences. SYS-13 owns inventory capacity and item locations.
- Before Run confirmation, disclose cost, hard timeout, expected danger and reward/loss behavior. Deduct entry Stamina once when the Run is created; a failed/expired Run does not refund it.
- The 4–7 enemy roll occurs once on Run creation and is persisted. Main dungeon clear opens loot selection; check at most one return encounter.
- Loot cannot be claimed twice. A retry reads the same Run/loot result. Inventory capacity validation happens before commit; over-capacity must not silently discard items.

## CC-02 — Time / Hunger / Death

- SYS-30 owns world-time ordering and Pause semantics. SYS-04 owns Hunger/Fridge behavior. SYS-02 owns terminal death and per-asset death disposition.
- Reconcile all events due through the command's logical time in deterministic due-time/priority/sequence order before accepting the command. A delayed worker must not let later actions overtake an earlier due death.
- Current Hunger baseline: maximum 100, 1 point lost per 30 full server-elapsed minutes; 0 means death. Fridge feeding is eligible only in the current home, chooses highest recovery first, and must be ordered with Hunger-death resolution deterministically.
- Simulation's HP/Hunger snapshot restore is a deliberate exception owned by SYS-25: restore once only if the same Character remains alive after due events reconcile. Do not rewind UTC/world/rent/mission clocks. This rule requires adversarial playtesting in Phase 4.

## CC-03 — Death / Asset Custody / Economy

- SYS-02 owns death cause and terminal Character state; each asset owner (SYS-13/17/18/19/20/23/27) owns the specific disposition for its custody domain.
- Use one immutable per-asset/quantity terminal disposition with source, destination/sink, rule version, transaction ID and audit. Apply each exactly once.
- If a transaction committed before the logical death instant, preserve that committed result. If death is already terminal before a later mutation, reject the mutation. Named exceptions (market escrow, own-item delivery, leases) follow their specific current contract rather than a universal guessed rule.
- Account-owned balances and Character-carried money are distinct. Never credit dead-seller proceeds to a successor Character when the named rule routes them to a sink.

## CC-04 — Inventory / Escrow / Trade / Delivery

- SYS-13 owns weight and item-location rules; SYS-17 owns Market escrow/listing; SYS-18 owns two-sided trade; SYS-19 owns Bank/Delivery; SYS-23 owns Companion recovery.
- Every transfer has one source state, one destination state and a stable idempotency identity. Do not allow an item to be used while escrowed or in transit.
- Capacity limits apply at commit, not only when the UI first opens. Full storage must preserve items in the explicitly designated non-destructive pending state or reject the action; never silently delete.
- Market Claim Storage (100 kg) is for designated market-delivery claims, not a general-purpose player-deposit vault. Clear claims/overflow before allowing further intake as specified by the Market rules.

## CC-05 — Housing / Fridge / Lease / Death

- SYS-20 owns property, lease, rent and storage. SYS-04 owns Fridge feed behavior. SYS-30 owns logical time. SYS-02 owns Character-death disposition.
- Fridge auto-feed eligibility ends when the Character is no longer resident in that home. Lease expiry and Character death compare canonical logical event times, not worker arrival.
- If Character death is at or before lease expiry, death is the terminal branch: do not also charge the normal expiry fine or run living-owner relocation/overflow processing for the same tie. If expiry is earlier, resolve the living-owner expiry branch first.
- Rental overflow choice is time-limited and must display exact units/capacity; the selected baseline has a 48-hour decision window followed by the specified irreversible excess disposition. This consequence must be clearly communicated and tested.

## CC-06 — Companion / Robot / Guild Assets

- SYS-23 owns Companion mission custody/recovery. SYS-24 owns Robot energy/repair. SYS-27 owns Guild ownership, loans, storage and dissolution.
- Companion farm-mission permanent loss does not itself delete carried items; recover them through the durable Recovery Locker while the owner is alive. If the owner Character dies, apply the Character-death rule to the still-owned assets.
- Raid defeat is not the same as farm-mission loss. Robot exhaustion does not equal Robot destruction under the launch baseline. Guild-owned property cannot become a member windfall through dissolution.

## CC-07 — Content / Balance / UI

- SYS-32 owns content validation/publication. `balance/` owns parameter definitions. SYS-29 and `experience/` own presentation.
- A system document names the parameter it consumes; it does not copy another file's number as a second authority. UI reads stable IDs and localized display strings; it does not parse display labels to make gameplay decisions.
- A Draft, invalid version or unpublished content change cannot affect a live Run or existing issued item. Existing instances keep their captured version unless a reviewed migration is explicit.

## CC-08 — Command Retry / Waiting UI

- Long-running actions show a purpose-specific waiting state and prevent duplicate submissions where needed. A timeout/reconnect must query the authoritative result before retrying.
- A loading transition never mutates gameplay state. Error, retry and cancellation semantics must say whether the original action may already have committed.
- Never show “success” before the server returns or the durable result is reconciled.

## CC-09 — PvP / Property Event Separation

- Zombie Invasion (SYS-21) and player Home Raid (SYS-22) are separate event families with different eligibility, notices and loss rules. Neither may destroy the home under the current baseline.
- Do not enable Raid/competition before identity, membership/ownership, asset custody, rate/cooldown and recovery tests pass for the relevant phase.
