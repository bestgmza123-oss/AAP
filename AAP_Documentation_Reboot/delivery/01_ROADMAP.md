# Reboot Roadmap — Phases 0–6

The legacy Phase A–E map is replaced for delivery planning. All features remain in product scope unless explicitly marked launch-excluded. Phase is build order, not a statement that the feature never exists. Every phase is closed only after its scoped acceptance checks pass with inspected evidence.

## Execution controls (apply to every phase)

The detailed bounded Task sequence and per-Task evidence/stop rules live in [`delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`](09_PHASE_BOUNDARY_EXECUTION_MATRIX.md). The legacy acceptance-test source inventory and current phase/Task assignment live in [`delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md`](10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md).

Before the first implementation Task of each Phase 2–6, run that Phase's `*-GATE-000` preflight. It must compare every relevant source test scenario against the active owner doc and link an exact current acceptance ID or explicitly disposition the source scenario. If an unknown critical rule affects only one feature, block that bounded feature—not unrelated work. A phase exit is `Accepted` only after scoped tests and manual gates have evidence; planned coverage is not runtime coverage.

## Phase 0 — Documentation Baseline

**Goal:** one coherent documentation authority and a traceable 33-system map.

**Exit:** required files exist; feature coverage map names all 33 SYS topics; every critical cross-system contract has one owner; recent instructions (English-first, UI-Driven, Hunger label, new phases, private Phase 1–2) are applied; no active rule depends on legacy prose; high-impact conflicts have a declared disposition; the next task brief is bounded.

## Phase 1 — UI-First Vertical Slice

**Goal:** prove the central player journey: Prepare → Province → Run preflight → turn-based combat → loot selection → optional single return encounter → Run result → Province.

**In scope:** screen flows and polished responsive layout; clear resource/status hierarchy; fixture identity and explicitly non-final content; one placeholder Province; a few Standard Run fixtures; normal enemies; sample supported skills; initial carry-weight selection; visible results for COMPLETED/ESCAPED/FAILED/EXPIRED; English localization keys from day one; one Development/Prototype build label, Updates adjacent to Mail, a truthful Mail-inactive state, shared route loading and page waiting/error/recovery states. Hunger/Infection may appear as preview-only meters but their real time/death mechanics are not active in this UI-only slice. Server/production persistence may be mocked only when the UI labels the prototype state honestly.

**Not in scope:** real public login/signup, final enemy/item catalogue, weapon/equipment progression, Market, travel, housing, Social/PvP, payment, claims and production readiness.

**Exit:** every core screen path can be walked end-to-end in prototype; no dead-end/false-success state; responsive and accessibility review; major states including loading/error/empty/disabled/waiting; a player can understand entry cost, timer, risks, weight and reward consequences. `UI-P1-01…UI-P1-16` and applicable prototype portions of `REL-001…004`, `LOAD-001…005`, `MAIL-UX-001` must be reviewed with evidence. A visual-only collection of unconnected pages does not pass.

## Phase 2 — Real Survival Core (Private/Internal)

**Goal:** implement the survival loop as a trustworthy private slice, using authoritative state and durable results.

**In scope:** allowlisted internal identity; Character/Stats/HP/Stamina/Mana/Hunger/Infection; death state and named asset rules; real Run/Combat/Escape/Surrender/Timeout/Loot state machine; exact-gram inventory, starter grant and starter items; basic food/HP craft only where supported; due-event clock, Pause/Resume controls, idempotency, audit, content fixtures and minimal internal content/Admin controls; canonical tests and controlled test/reset path.

**Constraints:** no public/shared users; no weapons/gear catalogue or future-phase features; phase fixtures remain non-final; do not weaken auth or ownership semantics to make a demo pass.

**Exit:** scoped state transitions and tests pass; retry/reconnect/two-command races are deterministic; no duplicate grants; resource/offline/death timing passes; inventory conservation passes; a buildable internal app and real test evidence exist; failure to restore/replay safely keeps the phase blocked.

## Phase 3 — Persistent Life (Earliest Public-Candidate Phase)

**Goal:** let the player manage an account and a continuing survival life rather than a single Run.

**In scope:** public Auth/signup/login after provider/security readiness; Tutorial; persistent Province/Travel foundations; NPC shop/hospital; housing and lease baseline; Fridge and stored food; time-aware notices; account return/reconnect; essential support/status/incident/recovery operations.

**Public rule:** Phase 3 is only the earliest public/shared-candidate point. Public exposure is forbidden until all applicable security, privacy, backup/restore, death/custody, Hunger/Fridge, downtime/support, accessibility and release gates pass.

**Exit:** player understands and can mitigate offline Hunger; lease/Fridge/death ordering is correct; identity and recovery paths are proven; all public gates have evidence.

## Phase 4 — Economy & Progression

**Goal:** expand sustainable progression and economic decisions.

**In scope:** full equipment catalog, quality/affixes/durability/repair/enhancement; Salvage and advanced timed crafting; Character Traits and Class; NPC services; fixed-price player Market; Bank and Delivery; vehicle/parking systems; Association/Simulation/Tower; Season/Rank rewards; Job Board and expanded quest/content roster.

**Exit:** ownership/capacity/fee/cancel/expiry flows are atomic; simulations prove formulas and major exploit boundaries; Market launch thresholds are based on measured evidence rather than assumptions.

## Phase 5 — Helpers & Social

**Goal:** support asynchronous cooperation and durable social ownership.

**In scope:** Companions and Recovery Locker; Robots/energy/repair; Guild membership/permissions/shared storage/loans/dissolution; direct two-sided trade; relevant social feeds and moderation foundations.

**Exit:** custody and membership transitions pass race/replay tests; failed/expired missions or trade cannot duplicate or silently delete assets; permission checks are enforced beyond UI.

## Phase 6 — Competition & Advanced Systems

**Goal:** activate higher-risk asynchronous competition after ownership, time and social foundations are proven.

**In scope:** Home Raid/Async PvP; Zombie Invasion; Guild Base and competition; Auction/scheduled safe sessions; Province chat full activation; advanced event systems.

**Exit:** eligibility, warnings, caps, cooldowns, moderation, custody and recovery gates pass; no public activation from UI-only implementation.

## Launch-excluded scope

Payment checkout, paid random draws, cash-out, Diamond→Shard conversion and paid Raid-token refills remain disabled across the roadmap until a new explicit owner-approved scope change and current legal/platform review.
