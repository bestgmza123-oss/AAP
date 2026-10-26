# SYS-32 — Custom Admin & Content Data

**Domain:** Operations / Content  
**New roadmap placement:** Minimal internal data control Phase 2; expanded by system phase  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §30; DEC-056/063; AI-DEC-250; RECON-014.

## Goal

AAP requires a real custom Admin for content data; not merely the provider dashboard and not a disconnected mockup. Admin editing follows Draft → Validate → Publish. Only a validated immutable published version affects the live game. Record editor, time, before/after and version. Content edits are separate from permissions to change player currencies/assets. Template edits affect future instances by default; existing instances require reviewed migration.

## Rules and boundaries

- **Owns:** Content schema/catalogue, validation, versioning, publication, audit and diagnostics.
- **Depends on:** All content-driven systems, balance registry, pause/time control and safety operations.
- **Cross-system contract:** Do not expose privileged secrets; never let Draft affect live play. Full visual polish is not a Phase 1 blocker, but a real minimal internal tool and pause/recovery controls must exist before broad internal operation/public testing as scheduled.

## UI contract

Admin must show validation errors and publication state clearly; change history is inspectable.

## Scope boundary

Phase 2 minimal internal baseline; expanded as later content systems unlock.

## Admin/content operations baseline

Admin content catalogues include locations/routes/art, enemies and AI profiles, dungeons/counts/time limits, loot tables, items/weights/reference prices, Affixes/Quality, craft/salvage/repair/enhancement recipes, skills/effects, quests, Rank/Season, houses/facilities/leases, vehicles, Companions/Robots, markets/fees, events/Raid Tokens, balance parameters and localized texts. Add a content screen only as its gameplay phase approaches.

The Updates/publishing workflow keeps immutable published version history: current game version comes from one release source; the Updates view sits beside Mail; published entries include release time/status, summary, detail by category, bug fixes, balance changes, UI/UX, player-impacting backend/system changes and known issues. Patch history is never silently overwritten. Admin may see drafts separately. This is release/content governance, not permission to claim the game is released.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS32-01` — Content changes follow Draft → Validate → Publish; only the validated immutable published version affects live rules/content. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS32-02` — Audit includes editor, time, before/after, version and stable content ID; rollback means publishing a new version. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS32-03` — Content-edit authority is separated from permission to edit player currencies/assets or invoke Pause. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS32-04` — Updates shows published version history; drafts/internal notes never appear to players and released notes are not silently overwritten. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS32-05` — Custom Admin operates on real content/validation within its scoped phase; it is not just a mockup or provider dashboard. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
