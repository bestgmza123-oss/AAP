# SYS-11 — World, Provinces & Locations

**Domain:** World  
**New roadmap placement:** UI map Phase 1; persistent world Phase 3  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §3; RECON-005 (world names/placeholders are illustrative, not fully authored content).

## Goal

Place hierarchy is Country → Province → District. Province is a hub for services and local places; District is a dungeon selected for a Run; service locations include shops, Association, hospital and other facilities; homes belong to a location. Current working names Acheria, Lumen (capital safe zone) and Velra (starting Province) are placeholders, not final lore. Returning to Province is not returning home; seeing a place on a map does not mean the Character is there.

## Rules and boundaries

- **Owns:** Location hierarchy, service listings, map visibility, current location and travel eligibility.
- **Depends on:** Travel, homes, dungeons, services, map, Raid target selection.
- **Cross-system contract:** Capital safe zone has little/no freely harvestable resource due to population. Do not invent final map/story names from placeholders.

## UI contract

Map/list navigation must distinguish current Province, visible destinations, homes and dungeon entry.

## Scope boundary

Phase 1 prototype navigation; persistent location states in Phase 3.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS11-01` — The world hierarchy remains Country → Province → District/Dungeon; starter world names remain placeholders until approved content exists. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS11-02` — Province/Map UI clearly distinguishes current location, safe zone, available destination and locked/unavailable destination. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS11-03` — Persistent movement/location transitions do not teleport vehicles or bypass travel/parking rules. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS11-04` — No future route, location or lore is presented as final if it is only a fixture. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
