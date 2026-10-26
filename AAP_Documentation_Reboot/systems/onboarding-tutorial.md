# SYS-28 — Onboarding & Tutorial

**Domain:** Player Experience  
**New roadmap placement:** Phase 3  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §26; DEC-099; RECON-005/006.

## Goal

The full public player flow is landing → email/password account access → Character creation → tutorial → Province. Tutorial must explain the high-risk survival model: HP/Hunger/Infection death, persistent HP, Run entry cost and timeout, carried weight, loot choice, safe return and storage/account money. Tutorial content must reflect systems actually available in that phase; teach Fridge use when Fridge ships, not earlier.

## Rules and boundaries

- **Owns:** Signup/tutorial steps, progression flags, safe-page logout policy and one-time grants.
- **Depends on:** Identity, Stats, inventory, Run, Hunger, world services and Localization.
- **Cross-system contract:** Unverified Account cannot create a Character or mutate gameplay. No false tutorial promises about future-phase systems.

## Q-08 — Safe logout baseline (AI-selected; runtime gate before Phase 3)

**Design status:** `AI-SELECTED BASELINE` under the owner's explicit delegation to resolve open design questions. This closes the design ambiguity; it does not constitute implementation or runtime evidence.

- Explicit logout is available only from a versioned destination marked `safeLogoutAllowed=true` and when no active Run/Combat/Travel state, escrow/settlement, or other state lock forbids leaving. The initial content baseline may mark the Province Safe Zone, Starter Room, and an eligible owned/rented home as safe logout destinations; all other locations default to false until explicitly authored and reviewed.
- A rejected logout attempt must explain the reason and must not teleport the Character, cancel a Run, clear a lock, or discard assets to make logout succeed.
- Successful logout persists the last authoritative location and UTC timestamp. Logout does **not** pause world time or grant immunity from Hunger, Infection, death, lease expiry, or other due events. Reconnect reconciles due events in canonical UTC/logical-time order before accepting another player command.
- A client/network disconnect outside a permitted logout state does not retroactively become a safe logout: retain the last authoritative state and let normal world-time and due-event rules apply. Do not silently relocate the Character or clear state locks.
- The Starter Room has no Fridge. Fridge feeding follows the normal eligible-home/residency rule only; being logged out is not itself a reason to bypass or invent Fridge behavior.

**Phase 3 runtime gate:** before persistence/Auth activation, test allowed and denied locations, active Run/Combat/Travel/settlement locks, reconnect catch-up, Hunger reaching zero, lease-expiry ordering, and eligible-home Fridge behavior, including boundary timestamps and retries. A failed or untested case blocks only the affected logout/persistence slice. This does not block the Phase 1 local-fixture prototype, which has no active logout mutation or live world clock.

## UI contract

Skippable or repeatable teaching should not bypass entitlement or state guards; key danger must be communicated before first exposure.

## Scope boundary

Phase 3 for real Auth/tutorial; prototype onboarding screens Phase 1.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS28-01` — Tutorial communicates the core Run/survival loop and irreversible danger before first exposure. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS28-02` — Tutorial actions cannot bypass Account/Character, entitlement or state guards and can resume/replay safely. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS28-03` — Tutorial only teaches features available in the current phase and does not promise inactive systems as already usable. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
