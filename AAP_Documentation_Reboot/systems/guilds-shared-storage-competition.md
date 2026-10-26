# SYS-27 — Guilds, Shared Storage & Competition

**Domain:** Social / Competition  
**New roadmap placement:** Guild core Phase 5; competition Phase 6  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §25; DEC-128; AI-DEC-224/235/236/243/253.

## Goal

One Character belongs to at most one Guild. Exactly one leader for an active Guild; roles are Leader, Officer, Quartermaster and Member with permission lists constrained by ownership/audit rules. Donated assets belong to the Guild; personal loans remain personal with durable loan records. Inactivity, leader death, election, dormancy and dissolution have separate state paths and protected archives. Guild assets are never silently distributed or destroyed.

## Rules and boundaries

- **Owns:** Membership/roles, permissions, shared storage, loans, leadership election, dormancy/dissolution, quests and competition records.
- **Depends on:** Account/Character death, trade, Companion/Robot, Raid, time, shared storage and ledgers.
- **Cross-system contract:** Pending settlements/loans/trades block unsafe dissolution. A successor needs the required quorum and strict majority; no eligible candidate/votes means DORMANT. No member windfall from Guild dissolution.

## UI contract

Show permissions before action, member eligibility, voting deadlines and asset disposition.

## Scope boundary

Core Guild Phase 5; competitive Guild systems Phase 6.

## Leadership, permissions, storage, dissolution, Guild Base, competition and chat

### Membership and roles

One Character belongs to at most one Guild; every active Guild has exactly one Leader. Roles are `Leader`, `Officer`, `Quartermaster`, `Member`. Configurable per-action permissions never override ownership, consent, audit, atomicity or one-item-one-location rules. Leader manages membership/roles/permissions, storage policy, Guild quests and lifecycle, but cannot transfer personal assets without an explicit loan/consent record. Officer may invite/manage members and start allowed Guild quests, but cannot change the Leader or Leader permissions and cannot auto-withdraw assets. Quartermaster handles storage entries/withdrawal requests only within permission and hard caps. Member can view/deposit; withdrawal requires explicit storage permission.

### Leader inactivity succession

If the Leader has no qualifying activity for 30 consecutive days, open a 72-hour succession window. Members active in the preceding 14 days may vote once for an eligible officer. A majority of valid votes cast selects an eligible Officer; a tie on this inactivity route uses longer Guild membership, then earlier Character creation time. If no eligible Officer or no valid vote exists, Guild becomes `DORMANT`; records/assets remain, no new donations/trades/competition enrollment/storage withdrawals start, while reads and member-owned loan returns remain available.

### Leader death election (separate state path)

Leader death immediately removes the dead Character's leadership/membership eligibility in the same committed death transaction and sets the Guild to `LEADER_VACANT`; Guild-owned/donated assets remain Guild property. Open a 72-hour election with frozen electorate/candidate snapshots. Electors are living members active during the preceding 14 days; each may vote once only while alive, but a valid ballot cast before an elector's death remains in the valid ballot count and frozen denominator. Eligible candidates at opening are living Officers active during the previous 14 days and not suspended or permission-blocked. For frozen eligible-elector count `N`, quorum is `floor(N/2)+1` valid ballots. For `V` valid cast ballots, a winner needs `floor(V/2)+1` votes. At tally, a candidate who is DEAD, suspended or permission-blocked is disqualified; votes for them stay in `V` but are not transferred. Recheck candidate life/permissions and promote atomically. No quorum, no eligible candidate, or no strict majority/tie means `DORMANT`; do not use the inactivity path's tenure/creation-time tie-break here.

### Storage and loans

Guild storage contains physical items only; there is no shared Gold wallet in this baseline. Default per-member withdrawal cap is five withdrawal transactions and ten item units per rolling UTC 24 hours; a Leader may lower, never raise, these default caps. Stack quantity counts as item units. Bound/protected, quest-critical, market-escrowed, loaned, worn/equipped or otherwise non-transferable items cannot be deposited. Donations become irrevocable Guild property. A personal loan records owner, borrower, asset IDs, due/return state and consent; loaned property cannot be sold, donated or re-loaned. Every deposit/withdraw/loan/return needs atomic ledger, unique idempotency key and audit. Two-person approval is disabled in the launch baseline. On loan return, preserve personal ownership; if owner capacity is full, use an owner-bound non-destructive claim; if owner is DEAD, apply the previously captured Character-death disposition. Guild assets may not be distributed to members as a windfall.

### Dissolution and durable archive

Normal active-Guild dissolution requires Leader confirmation and a 72-hour notice. It cannot complete while a trade, loan return, Raid, competition result or claim settlement is pending; no new state-changing Guild operations are allowed during the notice/finalization boundary. Guild-owned/donated assets move to an immutable non-withdrawable archive with quantity/currency conservation, source/debit/credit reference and audit; never silently delete or distribute them. For a leader-death `DORMANT` Guild, dissolution is a separate member vote. A sponsor must be a living, unsuspended, permission-eligible Guild member active within the previous 14 days and included in a fresh frozen dissolution electorate; if there is no eligible sponsor or `N=0`, remain DORMANT indefinitely. Otherwise freeze the eligible living active-member electorate for 72 hours; a valid ballot requires `cast_at_utc < closes_at_utc`. Dissolution requires `ceil(2*N/3)` YES votes. If threshold passes, issue a separate 72-hour notice; if it fails, remain DORMANT. Pending loans/settlements still block finalization. Ballots validly cast while alive remain valid if the voter later dies; the frozen `N` does not change.

### Guild Base and competition

Guild Base is Phase 6, not the Guild-core Phase 5. A Guild Base below Medium-equivalent property tier is Raid-immune; Medium-equivalent and higher tiers are eligible only after all Raid/ownership/member rights tests pass. Property tier and eligibility must be disclosed before base creation. Guild Competition is Phase 6. Score objective control/defence plus participation with per-member contribution caps; do not pay raw Gold or Diamond as competition rewards. Tie-break in order: objective wins, eligible member participation, then earliest server-recorded result. Membership changes, leaving, death or dissolution cannot bypass pending result/settlement protection.

### Province chat and moderation

Chat is Phase 6, Province-only. No global chat, direct messages, voice, image/file attachments or clickable links in this baseline; reject URL-like text, embedded media and file payloads. Maximum 300 Unicode code points per message. Enforce server-side at most one message per Account every 3 seconds and ten messages per rolling 60 seconds; after three rate-limit violations within ten minutes, apply a 30-second posting cooldown. A local mute hides the selected Account's chat for that user. Reports store message ID, reporter, category, real timestamp and moderation state. Only authorized moderator/Owner Admin may review/act; documented warn/mute/suspend actions record actor, reason, scope, start/end and affected Account. Default message retention 30 days; reported cases 90 days unless current privacy/legal review requires a stricter/other period. Automated filters are a first-pass safety aid, not a guarantee. Keep chat disabled until rate-limit/report/moderation/access/audit/retention tests and external privacy review pass.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS27-01` — One Character belongs to at most one Guild; active Guild has one Leader and role permissions cannot override ownership/audit constraints. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS27-02` — Leader inactivity and leader-death use distinct election/dormancy paths with the specified time windows, frozen electorate/ballot and quorum/strict-majority rules. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS27-03` — Guild-owned/donated assets remain in an immutable non-withdrawable archive on dissolution; personal loans return/claim or follow their captured death disposition. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS27-04` — Pending trades/loans/Raid/competition/claims block unsafe dissolution; retries cannot duplicate transfers. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS27-05` — Province chat is phase-gated, rate-limited server-side and has moderation/reporting/retention controls. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS27-06` — Guild Competition rewards/score/tie-break follows the defined objectives and cannot mint or distribute raw Gold/Diamond contrary to scope. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
