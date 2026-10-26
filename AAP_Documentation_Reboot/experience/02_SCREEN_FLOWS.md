# Screen Flows & UI Acceptance

## First vertical slice (Phase 1)

0. **Global shell:** visibly label the build as a private prototype using fixture data, show a single Development/Prototype build label, place Updates immediately beside Mail, and use the shared route-loading pattern. Mail remains an accessible phase-inactive empty state with no delivery/claim actions.
1. **Start/Identity fixture:** explain this is a private prototype, select a local test-Character fixture; do not create a real account or claim persistence.
2. **Province hub:** show location, prototype HP/Stamina/Mana, bag capacity, available dungeon and relevant risk alerts. Hunger and Infection may appear only as clearly labelled preview-only/inactive Phase 1 meters; they must not tick, kill, or imply offline simulation in the UI-only prototype.
3. **Run preflight:** show dungeon, suggested level/threat, entry Stamina, hard timeout, enemy-count range, no-potion/no-loadout-change warnings, escape/surrender consequences and known risks.
4. **Combat:** enemy identity/HP/Mana/status/intent, turn order, player resources/status, primary commands and an expandable combat log; show Run remaining time and defeated/total count.
5. **Loot selection:** pending rewards, item image/name/rank/weight/quantity, current carried kg, remaining capacity and why a quantity is unavailable.
6. **Return encounter (if rolled):** disclose the encounter and distinct reward consequences; check no more than once.
7. **Run result → Province:** state COMPLETED/ESCAPED/FAILED/EXPIRED, rewards committed/forfeited in design terms, demo-only result status, Stamina-cost preview and next action. Never imply that local fixture rewards or Stamina changes are server-persisted.

## Other core screen flows

- Character Sheet: Stat allocations, derived stats, level/EXP and current resources.
- Inventory: item location, binding, weight, stack quantity, usable/craftable/sellable state and locks.
- Crafting: recipe → materials → reserve/confirm → queue/progress → claim/overflow handling.
- Home/Fridge: storage capacity, resident eligibility, food stock, Hunger forecast, rent deadline and overflow choices.
- Market: listing/escrow state, price/fees/expiry, claim storage capacity, overflow and seller/buyer ownership result.
- Companion: mission risk/duration/yield estimate, item custody, progress and recovery/collection.
- Guild/Trade/Raid: identity/permissions, both parties' offer revisions, eligibility timers, loss cap and settlement result.

## Required interaction states

Every route with asynchronous data: loading, refreshing, empty, error and retry. Every protected action: permission denied / expired session state where authentication exists. Every long-running mutation: distinct waiting/progress state, duplicate prevention and a recovery route. Every irreversible action: preview and explicit confirmation. Prototype-only simulated states must never imply that a real server request was made or committed.

## Acceptance rule

For each screen, define: user goal, preconditions, data shown, primary/secondary actions, disabled reasons, loading/error/empty states, success result, cancellation semantics, desktop behavior, mobile behavior, keyboard/touch access and localization overflow behavior.
