# Global Invariants

These rules constrain every subsystem. A domain-specific file may add detail but may not contradict them.

1. **One active Character per Account.** A DEAD Character remains a history record and can never become playable again.
2. **Only three death causes:** HP = 0, Hunger = 0, Infection reaches maximum. Any new cause requires an explicit product-scope decision.
3. **One owner per asset at a time.** An item/currency quantity cannot be simultaneously carried, stored, escrowed, in transit and claimable in another location. Partial stacks must conserve quantity exactly.
4. **No silent asset loss or transfer.** Every terminal disposition uses the current named policy; unknown ownership consequences are not guessed.
5. **The Run is bounded and persisted.** Enemy rolls are generated once and retained; rewards remain pending until the correct completion/loot transition. Retries cannot reroll enemies or grant items/EXP twice.
6. **Time is server/world time.** Offline events continue unless a recorded authorized Pause applies. Due events are reconciled chronologically before later commands; worker arrival order is not a gameplay rule.
7. **No retroactive resource gains for paused/forbidden intervals.** Stamina/Mana regeneration eligibility is owned by SYS-03 and SYS-30. Run time never earns regeneration later.
8. **Server-authoritative outcomes.** Client/UI never decides damage, turn order, RNG, loot, money, weight, cooldown, death, event order or ownership.
9. **Idempotency.** A retry of a completed mutation returns the same stored outcome and never repeats its effects. Timeouts are ambiguous until the prior result is reconciled.
10. **Balance numbers are versioned data.** Do not duplicate formulas/constants across system documents or embed them in UI descriptions. Fixture values are not final content or proof of balance.
11. **Draft cannot affect live play.** Only validated, published content versions may be read by active gameplay. Existing item instances are not silently rewritten by template edits.
12. **Phase defers build, not feature scope.** Later-phase features stay in the systems map but must remain unavailable until their release slice.
13. **UI is part of acceptance.** Every player-facing feature must be usable and understandable at the screen level, on desktop and mobile; backend-only completion is insufficient.
14. **English-first, localization-ready.** All UI text uses translation keys and stable content IDs. Logic must not depend on visible localized names or concatenated English fragments.
15. **Release truth is evidence-based.** A written decision is not implementation; source presence is not runtime proof; test definitions are not test passes; phase completion is not public-release permission.
16. **No unapproved commercial scope.** Paid draws, checkout, cash-out and prohibited conversions remain disabled at launch.
17. **Keep specifications and implementation in distinct sibling directories.** `AAP_Documentation_Reboot/` is the canonical documentation-only subtree and must not contain implementation source code. An explicitly authorized implementation Task may create/use `AAP_UI_P1/` (or another scoped implementation directory) as a sibling under the same Project Root. The routine handoff uses the existing authorized repository branch/commit/PR and actual CI artifacts; do not create a ZIP per routine Task. Use one combined ZIP containing the relevant docs, implementation, configuration, checkpoint and evidence only for a milestone/release, explicit owner request, or a documented repository-access fallback. This directory boundary does not authorize backend services, live data access or deployment beyond the active Task scope.
18. **No silent blocker handoff.** Every Blocked Task that needs owner action must offer one verified, actionable next step with the actual workspace/path, ordered commands, expected result, exact output to return and resume condition. A known Agent DNS blocker is not retried without new connectivity evidence; correct any agent-issued bad path/command in the same Owner Action and Thai Trello comment. A package/build pass never substitutes for unmet Acceptance Criteria. See `delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`.
