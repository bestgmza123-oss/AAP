# P2-GATE-000 Checkpoint — consistency remediation, 2026-10-28

## Result

**PASS — documentation/semantic/test preflight only.** The gate is complete as a documentation and test-planning milestone. It is not evidence that gameplay, server, database, RLS, migrations or runtime tests passed.

## Inventory and mapping evidence

- Legacy source rows / unique IDs: 379 / 379.
- Phase 2-relevant rows after phase correction: 169; each has current AC references, explicit disposition and NOT RUN IN REBOOT status.
- V18-STOR-001/002 remain in the 379-row crosswalk but are assigned to P3-LIFE-005 under SYS-20 Phase 3; they are not included in the Phase 2 count.
- Current AC references missing from registry: 0; duplicate AC registry IDs: 0; 83 distinct AC IDs referenced by crosswalk rows; 160 current AC IDs in registry; duplicate source IDs: 0.
- Crosswalk SHA-256: ab784bb0c575275635de686e9d70b4395ce1611e4700b08a25050b66315bf0e7
- Preflight report SHA-256: 372f5bb60446826c31561c2a13dcf41264cd46dc7c7ff86792f090f3f9b460f9

Full machine-readable results: [P2-GATE-000 consistency validation](P2-GATE-000-CONSISTENCY-VALIDATION.json).

## Corrected contracts

1. **Schema/RLS:** SYS-33 now defines the logical Phase 2 schema inventory, relational constraints, anon/authenticated/service_role/migration privilege boundaries, direct-table RLS/grant expectations, trusted server authorization and append-only migration/rebuild requirements. AC-SYS33-06..09 are in the current traceability registry. This is an AI-selected design baseline, not inspected/deployed schema.
2. **Starting Room:** SYS-20 already specified fixed 10 kg storage and Phase 3. To honor RECON-005 and the current system owner, V18-STOR-001/002 moved from P2-CORE-011 to P3-LIFE-005. AC-SYS20-06/07 define conservative local-access and atomic capacity-rejection semantics for Phase 3. Phase 2 tests generic custody only using synthetic non-housing containers.
3. **Stale status:** the prior P1-UI-008 checkpoint note is annotated as historical; 03_NEXT_TASK.md reports the current gate result.

## What actually ran

- Original P2-GATE-000 baseline PR #16 is merged at fa802050734a49a86c2e0c060152cbca05b6317f; exact-head CI run #40574037881 and post-merge CI run #40574368873 passed both required jobs. This is pipeline evidence for the original preflight/doc change, not gameplay/database runtime proof.
- This follow-up performed static source/crosswalk review and documentation consistency repair.
- Final documentation link/policy audit passed: 71 Markdown files, 0 non-Markdown files inside the documentation subtree, 1,329 local Markdown links, 0 missing targets, required policy markers present, documentation-only boundary PASS. Crosswalk AC/reference validation also passed with 0 missing AC references.
- No application source code, gameplay/runtime test, RLS test, migration, API request, live Supabase operation or database mutation was executed by this task.
- P2-CORE-001 has not been started by this task. P2-CORE-002 requires P2-CORE-001 acceptance and a verified disposable local/CI target. Never infer the owner project AAP is empty or disposable.

## Scope and stop

The P2-GATE-000 documentation preflight is complete. This does not automatically authorize P2-CORE-001 or any implementation. Starting Room storage is Phase 3 and must not be implemented under P2-CORE-011.

## Files updated

- AAP_Documentation_Reboot/systems/server-authority-integrity.md
- AAP_Documentation_Reboot/systems/items-weight-inventory.md
- AAP_Documentation_Reboot/systems/housing-starter-room-rentals.md
- AAP_Documentation_Reboot/rules/02_CROSS_SYSTEM_CONTRACTS.md
- AAP_Documentation_Reboot/decisions/02_RECONCILIATION_LOG.md
- AAP_Documentation_Reboot/delivery/04_REQUIREMENTS_TRACEABILITY.md
- AAP_Documentation_Reboot/delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md
- AAP_Documentation_Reboot/delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md
- AAP_Documentation_Reboot/delivery/P2_GATE_000_SEMANTIC_TEST_PREFLIGHT.md
- AAP_Documentation_Reboot/delivery/03_NEXT_TASK.md
- evidence/P1-UI-008_CHECKPOINT.md
- evidence/P2-GATE-000_CHECKPOINT.md
