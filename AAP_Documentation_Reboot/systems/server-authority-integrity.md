# SYS-33 — Server Authority & Integrity

**Domain:** Cross-Cutting Foundation  
**New roadmap placement:** Design from Phase 1; real enforcement Phase 2 onwards  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT ``31–32; DEC-053–063; AI-DEC-205/208/250; later user directions RECON-001/002 override contradictory UI-first assumptions.

## Goal

The server is authoritative for damage, initiative, random rolls, loot, currency, time, death, weight, cooldowns, state transitions, ownership and final transaction results. Mutations are validated server-side, atomic where needed, idempotent under retry, and auditable. Persist server-generated random outcomes and due-event order. Draft content cannot alter live play.

## Rules and boundaries

- **Owns:** Trust boundaries, command envelope, identity, transactions, idempotency, RNG, event replay, content publishing and audit.
- **Depends on:** All systems, especially death, inventory, Run, time, economy, social ownership and admin.
- **Cross-system contract:** Never treat a UI state or client ID as proof. A failed or timed-out response must be recoverable by querying the committed result; do not blindly repeat a non-idempotent operation.

## UI contract

Waiting UI prevents duplicate submission and exposes recovery; never claims success before server confirmation.

## Scope boundary

Cross-cutting from the first slice; production enforcement must pass Phase 2 tests.
## Phase 2 schema, identity and database security baseline

**Decision status: AI-SELECTED BASELINE for the documentation/design contract, selected conservatively under the owner's request to choose the best option.** This section is not proof that a Supabase project, schema, credentials, provider configuration, role grants or backups have been inspected. The actual owner-designated project `AAP` must not be linked, migrated or mutated by this document task. `RECON-018` remains the authority for the distinction between retained architecture direction and unverified live state.

### Phase 2 logical schema inventory

Use this minimum logical inventory to design the Phase 2 migrations. Physical names may be normalized only if each relationship, constraint, ownership boundary and test remains equivalent and the change is reviewed in the implementation PR. Do not build Phase 3+ feature tables merely because a generic location or ownership concept can represent them.

| Logical table / aggregate | Required keys and data | Non-negotiable integrity |
|---|---|---|
| `accounts` | Stable Account UUID, lifecycle/status, creation timestamp | Account survives Character death; no password, access token, verification token or other secret is stored here. |
| `account_identities` | Stable trusted provider subject, Account FK, identity kind, internal allowlist/revocation status and audit timestamps | Unique trusted subject; server-managed only. Phase 2 permits allowlisted internal test identity only. If the approved local Auth target does not provide the expected identity relation, stop and revise the contract rather than remove identity checks. |
| `characters` | Character UUID, Account FK, lifecycle state, created/dead logical timestamps | At most one ACTIVE Character per Account via a database-enforced partial unique constraint/index; DEAD is terminal; at most one immutable death record per Character. |
| `character_resources` | Character FK, HP, Stamina, Mana, Hunger, Infection and version/updated timestamp | One current authoritative resource row per Character; numeric caps come from SYS/rules/balance owners, not copied display values. Reject invalid negative values and updates for DEAD Characters. |
| `mutation_receipts` | Account/principal, operation key, idempotency key, canonical request digest, status, committed result snapshot and timestamps | Unique `(account_id, operation_key, idempotency_key)`; same key + same request returns the recorded result; same key + different request is rejected; receipt and mutation commit atomically. |
| `world_events` | Event ID, aggregate reference, `due_at_utc`, domain priority, stable sequence, status and processing timestamp | Event ID unique; order is `(due_at_utc, domain_priority, stable_sequence, event_id)`; concurrent workers cannot commit an event twice. |
| `asset_containers` | Container UUID, Account owner, Phase-2-supported container kind and the corresponding Character/Run FK | Each row has exactly one valid parent appropriate to its kind. Phase 2 kinds are limited to Character inventory, Run loot and explicit non-recoverable disposition/sink; no Starting Room, home, Market, Guild, Fridge, Mail or Companion container in Phase 2. |
| `item_definitions` | Immutable item-definition/version ID, authoritative grams-per-unit, stackability, binding/marketability and valid lifecycle/eligibility flags | Definitions are versioned and immutable for already-issued items; Phase 2 uses approved synthetic definitions only. Weight/stacking facts live in one canonical definition and are not re-supplied by clients. SYS-32 owns content validation/publication; no full future item catalogue is activated. |
| `item_stacks` | Stack UUID, one `container_id` FK, immutable item-definition/version FK, positive integer quantity, lock state and version | One container FK is the sole current location for each stack row. Split/transfer updates source and destination atomically; stackability and unit grams come from the versioned item definition, not a second client-supplied weight. |
| `asset_ledger_entries` | Immutable movement ID, mutation receipt, source/destination container, item-definition version, positive moved quantity and logical timestamp | Each committed movement has one auditable source and destination/sink; quantities conserve across source, destination and explicitly defined terminal disposition. No silent drop or inferred deletion. |
| `account_grant_receipts` | Account FK, grant key/version, mutation receipt and timestamp | Unique `(account_id, grant_key)`; starter grant and item creation commit once as a single mutation and cannot be repeated by Character recreation. |
| `currency_balances` and `currency_ledger_entries` | Exactly one owner kind (Account or Character), currency ID, current balance projection, immutable signed ledger delta, mutation receipt | Owner kind and owner FK agree; no negative spendable balance; balance projection and append-only ledger change in one transaction; the ledger can reconcile the balance. Account currency and Character-carried currency remain separate. |
| `runs` and `run_actions` | Run UUID, Character FK, lifecycle state, start/deadline/terminal timestamps, persisted enemy-count/content snapshot and private seed reference; action receipt/outcome | At most one active Run per Character; server-generated roll and deadline persist; client cannot supply authoritative roll/result; action idempotency links to `mutation_receipts`. Never expose a server seed or secret. |
| `character_death_records` and `asset_dispositions` | One terminal death record per Character; per-source-quantity disposition with rule/version, source, destination/sink and receipt | Death is terminal; all Character-bound assets have one named disposition; no successor transfer or duplicate death/asset disposition outside current SYS-02/SYS-33 rules. |
| `content_versions` and `admin_audit_events` | Immutable content version/release identity, publication state and append-only actor/action audit | SYS-32 owns content validation/publication semantics. Draft/unpublished content cannot influence live state; only server-verified internal admin authority can publish/test-reset. |

### Database roles, grants and RLS matrix

Authoritative tables are private server data, not a direct client data API. Prefer a non-exposed `private` schema for them. If implementation requires an exposed schema, it must pass the same grants/RLS checks below before use.

| Principal / database role | Phase 2 access | Required control |
|---|---|---|
| `anon` | No direct access to authoritative tables, views or mutation functions | Revoke schema USAGE and all table/schema/function privileges; no allow policy for authoritative rows. |
| `authenticated` | No direct `SELECT/INSERT/UPDATE/DELETE/TRUNCATE/REFERENCES/TRIGGER` on authoritative base tables; use authenticated, allowlisted server command routes only | Explicitly revoke default grants and verify both privileges and RLS. A valid provider session alone does not make a principal Phase-2-allowlisted. |
| `service_role` / server secret | Server-side only; has broad privilege and bypasses RLS | Never include in browser bundles, `VITE_*` variables, URLs, logs or client-visible responses. Every Edge Function command must derive the trusted Account/Character from the verified principal and validate ownership/state before using privileged access. RLS is not a substitute for those server checks because `service_role` bypasses it. |
| Migration / database owner role | DDL and migration work only in a disposable local/CI target; never an application role | Credentials are not shipped to the client or reused as ordinary runtime identity. Remote target access needs its own explicit authorization and identity verification. |
| Internal Admin capability | Application-domain authorization, not a client-supplied database role or mutable user metadata claim | Server verifies the allowlisted principal and specific capability for each operation; content publication and asset/currency mutation permissions stay separate. |

RLS and grant rules:

1. Enable and force RLS on every authoritative table in an exposed schema. Revoke default privileges from `anon` and `authenticated`; policies do not replace grants. For Phase 2 base tables, no direct user-role policy grants row access.
2. Do not expose convenience views over protected tables unless they use a reviewed `security_invoker` design (or remain in the private schema), have explicit narrow grants and are included in negative tests.
3. Revoke function execution from `PUBLIC`, `anon` and `authenticated` by default. Any required RPC/security-definer function needs a named reviewer, narrow execute grants, a fixed safe `search_path`, fully qualified relations and explicit actor/ownership checks. No general-purpose SQL executor.
4. The server command route must deny missing, expired, unallowlisted, forged or cross-Account identity even when the caller guesses another Account/Character UUID. Do not trust editable user metadata or client-supplied IDs as the actor.
5. Verify denials at both layers: direct table/API access is denied by grants/RLS; approved server routes are tested with Account A, Account B, malformed identity and an internal Admin/non-Admin matrix. Never claim RLS alone constrains a service-role request.

### Migration and isolated-target contract

- The proposed repository home for database project configuration and migrations is `supabase/` with ordered files under `supabase/migrations/`; this is a target layout recommendation, not a claim that the directory or CLI is already present.
- Pin the Supabase CLI version and record Docker/runtime, Node/package-manager and local stack versions before the first DB task. Build migration SQL and schema/security changes in version control; do not make untracked Dashboard-only schema changes.
- Migrations are append-only after use. Correct an applied migration with a new forward migration, not an edited history. Include schema changes, grants, RLS policies, constraints and indexes in the tracked migration chain. Prefer transactional migrations where supported and fail closed on unexpected pre-existing objects/schema drift.
- Before apply: identify the target as a disposable local/CI database, prove the reset path, and verify the migration directory/history. Never infer that the existing project named `AAP` is empty, disposable, backed up, or safe.
- Required local proof for P2-CORE-002: clean reset/rebuild from the tracked chain; inspect tables/columns/FKs/checks/unique indexes and migration ledger; repeat the clean rebuild and confirm identical schema/invariants; run the supported migration status/no-pending check; run `supabase test db`/pgTAP where supported; explicitly test grants, RLS, cross-Account denial, valid/invalid internal identity and server-route authorization. Use synthetic accounts only.
- No remote `supabase link`, `db push`, SQL Editor change, production migration, backup/restore claim or provider setup is authorized by this contract. A later task must separately verify project reference/organization, current schema/migration history, permissions/plan/cost, isolation and recovery path, and receive explicit target-scoped authorization.

Implementation references (tooling guidance, not proof of project state): [Supabase database migrations](https://supabase.com/docs/guides/local-development/database-migrations), [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase database testing](https://supabase.com/docs/guides/local-development/testing/overview), and [Supabase local development workflow](https://supabase.com/docs/guides/local-development/cli-workflows).


## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS33-01` — Server-side authority validates damage, initiative, RNG, loot, currency, weight, time, cooldown, death, ownership and transaction outcomes. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-02` — Every non-idempotent mutation has a stable idempotency identity and querying a timed-out result is safer than blind resubmission. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-03` — An item/quantity has one location/lock; concurrent operations preserve conservation and cannot duplicate or silently delete assets. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-04` — Due events and RNG outcomes are persisted and replay deterministically; retries after committed effects do not apply them again. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-05` — Draft/unpublished content never affects live gameplay; secrets and privileged credentials are never placed in player-facing UI. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS33-06` - The Phase 2 schema implements the logical table/aggregate inventory, ownership foreign keys, uniqueness, CHECK constraints and transaction boundaries in the Phase 2 schema contract; duplicated projections have an atomic reconciliation rule. **Status:** AI-selected design baseline; runtime/schema evidence not supplied.
- `AC-SYS33-07` - Authoritative tables in exposed schemas have RLS enabled/forced and explicit least-privilege grants; `anon` and `authenticated` cannot directly read or mutate Phase 2 base tables, and exposed views/functions cannot bypass the boundary. **Status:** AI-selected design baseline; grants/RLS tests not run.
- `AC-SYS33-08` - Server commands derive identity and Account/Character ownership from a verified allowlisted principal; forged/cross-Account IDs are denied. A `service_role` secret is server-only and its RLS bypass is compensated by server-side authorization. **Status:** design baseline; runtime/security evidence not supplied.
- `AC-SYS33-09` - Phase 2 database changes use append-only versioned migrations; clean rebuild and repeated migration-status checks reproduce the declared schema without unexplained drift, Dashboard-only changes or unauthorized remote mutation. **Status:** design baseline; migration evidence not supplied.

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
