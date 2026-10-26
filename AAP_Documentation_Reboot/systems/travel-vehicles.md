# SYS-12 — Travel & Vehicles

**Domain:** World / Transport  
**New roadmap placement:** Phase 3  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§12.1–12.3; DEC-118/119; AI-DEC-218/219/231.

## Goal

Travel takes real server time, roughly 10–120 seconds in the baseline, continues offline, is not teleportation, and costs Stamina separately from ETA. Route data determines distance/difficulty and vehicle reduction. Vehicles reduce travel cost but do not add carry capacity. Parking is limited by location slots; if the destination has no suitable slot, a vehicle must be physically moved to an eligible place. Public parking baseline is 100 Gold/day.

## Rules and boundaries

- **Owns:** Routes, ETA, Stamina cost, vehicle benefits, parking slots/fees and relocation.
- **Depends on:** World, Stamina, homes, inventory/weight and offline time.
- **Cross-system contract:** Do not conflate ETA with Stamina cost. No destination teleport or vehicle storage without a valid slot. Numeric route/fee values are prototype.

## Selected route formulas

- `duration_seconds = clamp(15 + 15 × route_distance_units × route_difficulty × (1 − travel_reduction), 10, 120)`.
- `stamina_cost = clamp(ceil(1 + 2 × route_distance_units × route_difficulty × (1 − stamina_reduction)), 1, 18)`.
- Route distance is normalized content data (0.25–6), difficulty (0.8–1.4) and service/vehicle reduction (0–0.4) are versioned inputs. ETA and Stamina cost are separate values.
- Public parking baseline is 100 Gold per real 24 hours per vehicle, prepaid for at most seven days. Unpaid vehicles remain locked at their physical location; they are not teleported away. Parking slot capacities follow the home tier; vehicles do not add inventory capacity.

## UI contract

Show route duration, Stamina cost, vehicle reduction and parking outcome before confirmation.

## Scope boundary

Phase 3 after persistent location/home baseline.

## Vehicle custody and parking boundaries

Vehicle parking capacity is Starter Room 0, Small 0, Medium 1, Large 2 and Estate 3. Public parking costs 100 Gold per real 24 hours per vehicle, prepaid for at most seven days. If payment expires, the vehicle remains locked at its current physical location; it is not deleted or teleported. A vehicle can move only by traveling from its current location to a connected destination. A full/no-slot destination blocks relocation. No paid extra slots or real-money parking at launch. Vehicle does not add carry weight/capacity.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS12-01` — Travel ETA uses the versioned route formula and is separate from Stamina cost. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS12-02` — Stamina cost is shown and charged atomically once on accepted departure; failed departure has no charge. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS12-03` — Travel continues offline and the result can be claimed idempotently on return. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS12-04` — Vehicle capacity/benefit, parking slots and paid parking are respected; no-slot destination cannot auto-move a vehicle. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

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
