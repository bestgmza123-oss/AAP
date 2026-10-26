# SYS-29 — UX/UI & Visual Direction

**Domain:** Experience  
**New roadmap placement:** Every phase, start Phase 1  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §27; later owner instructions RECON-001/002; shared Loading/Updates requirements are intentionally retained as UX requirements, not as a reason to duplicate gameplay rules.

## Goal

AAP is UI-Driven: the screen is the play space, and UI quality is part of acceptance—not post-launch polish. Art direction: anime-comic apocalypse, dark/clean surfaces, angular panels, controlled hazard/neon accents, halftone texture and a consistent icon set. Prioritize readable text over decorative glow. Desktop may use composed floating panels; mobile uses more focused full-page views for Combat and Map. No status conveyed by color alone.

## Rules and boundaries

- **Owns:** Design tokens, reusable components, navigation, responsive layouts, accessible states and interaction flows.
- **Depends on:** Every player-facing system and localization.
- **Cross-system contract:** Do not call a feature complete just because API/backend works. No stacked modal maze; confirmation only for irreversible/risky actions, not every attack.

## UI contract

Every core flow must have a reviewed screen flow, interaction states, mobile layout and loading/error/empty handling.

## Scope boundary

Start in Phase 1 and revalidate for every phase.

## Navigation/loading baseline

The main navigation includes an Updates destination beside Mail. Updates shows the current build/release label and chronological, searchable/scrollable published patch notes; released notes are immutable, and internal drafts never appear in the player view. Display a development/preview label until the release gate actually passes. A shared Slash Loading transition applies to route changes; page-level skeleton/empty/error/retry states and separate waiting/progress states handle content loading and long operations. Loading transitions never mutate game state and must support recovery/reduced motion.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS29-01` — Core Phase 1 flow is navigable end-to-end and clearly identifies prototype/fixture state without false success. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS29-02` — Desktop and mobile have appropriate layouts; status is not conveyed by color alone and focus/touch/reduced-motion needs are addressed. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS29-03` — Every major state has applicable loading/refresh/empty/error/retry/permission-blocked/waiting/success handling. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS29-04` — Risky/irreversible actions preview cost and loss; routine attacks do not require redundant confirmations. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS29-05` — English keys exist from day one and expanded translations do not break layout/readability. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
