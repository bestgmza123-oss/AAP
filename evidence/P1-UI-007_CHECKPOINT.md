# P1-UI-007 Checkpoint — Loot, capacity and optional return encounter

Date: 2026-10-27 (Asia/Bangkok)
Task: `P1-UI-007 — Loot selection, capacity and optional return encounter`
Status: **IMPLEMENTED LOCALLY — Windows gates and Playwright passed; exact-head PR CI / merge still pending**

## Source identity

- Project root: `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`
- Implementation package: `AAP_UI_P1/`
- Implementation branch: `feat/p1-ui-007-loot-capacity`
- Base `main` SHA: `96422785399948bb2ded69868edb30567e7608ef`
- Trello card: https://trello.com/c/Ko40aq9q/12-p1-ui-007-loot-selection-capacity-optional-return-encounter
- Canonical scope: `AAP_Documentation_Reboot/delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`, P1-UI-007; `delivery/04_REQUIREMENTS_TRACEABILITY.md`, UI-P1-10/11; `systems/dungeon-run-lifecycle.md` (SYS-09); `systems/items-weight-inventory.md` (SYS-13); SYS-29.
- Related ESC-/RUN- legacy crosswalk entries are preserved test-design inputs, not evidence of server behavior.

## Bounded implementation

- Added `/run/loot` and a Combat-complete navigation link to the Loot & Capacity demo.
- Capacity model stores item weights as integer grams. The initial carried total is 8,500 g, the total capacity is 20,000 g including the bag, and worn equipment is explicitly excluded.
- Main loot uses deterministic quantity stacks. Every increase computes the exact projected total; equality at 20,000 g is allowed, while a selection that would exceed capacity is disabled and shows the exact gram shortfall. Quantities cannot exceed fixture availability or fall below zero.
- Kept four display buckets distinct: original/carried-in, chosen main loot pending, return encounter loot pending, and selected demo outcome.
- The optional return-encounter decision is explicitly a deterministic fixture selector with only `none` and `one` branches. No random encounter roll occurs, and the demo cannot perform a third check.
- Escape during the one return encounter preserves chosen main loot and forfeits the return encounter reward. Completing that fixture encounter leads to a separate return-loot selection which obeys the same carrying capacity.
- Added model-level, component-level, and browser tests including the complete Combat → Loot path; desktop capture at 1440 px and mobile at 390 px confirm the UI fits without horizontal overflow.

## Local verification — Windows workspace

Executed from the merged-base checkout plus the P1-UI-007 working branch, reusing installed dependencies.

| Check | Result | Evidence |
|---|---|---|
| `npm.cmd run typecheck` | PASS, exit 0 | TypeScript check |
| `npm.cmd test -- --reporter=dot` | PASS, exit 0 | Vitest: 38/38 tests |
| `npm.cmd run lint` | PASS, exit 0 | Four existing reduced-motion CSS `!important` warnings only |
| `npm.cmd run audit:scope` | PASS, exit 0 | 21 source files; no Supabase references/imports or direct client-network call patterns |
| `npm.cmd run build` | PASS, exit 0 | Vite 8.3.5; 37 modules transformed |
| `npm.cmd run test:e2e` | PASS, exit 0 | Playwright: 18/18 tests |
| `python.exe evidence/doc_workflow_static_audit.py` | PASS, exit 0 | 70 Markdown files, 1,308 links, zero missing targets/policy markers |
| `git diff --check` | PASS, exit 0 | No whitespace errors |

The four lint warnings are the existing reduced-motion CSS `!important` warnings; the command exits successfully. These checks cover local UI/fixture behavior only and are not authoritative inventory, reward, server Run, encounter RNG or balance tests.

## Browser evidence

- `evidence/p1-ui-007-loot-desktop.png`: 1440×1656 px; SHA-256 `43442A1392FBA493F67CDB4DD01018FF403D8F8E5E819AB9525DC67A056B9AB1`.
- `evidence/p1-ui-007-loot-escape-result-desktop.png`: 1440×1538 px; SHA-256 `8C01F1A5848F23FB9DB06617EA0288C8B42BCA26099C97243C87FD1499466188`.
- `evidence/p1-ui-007-loot-mobile.png`: 390×2316 px; SHA-256 `AC977ED08B1052E3AE4A18016073B8CE31FB640A401260AD56579E01AE5ECC94`.
- E2E coverage: exact capacity and 500 g overflow, completed Combat navigation, zero encounter branch, one return-encounter escape and preservation of main loot, separate return loot selection, mobile 390 px overflow/keyboard check.

## Hard boundary

No actual inventory mutation, item claim/drop, server Run, server encounter roll, currency/item debit, authoritative reward, persistence, API/backend/Supabase/Auth, Character death, timer simulation or P1-UI-008 work was added. All fixture values and choices are local demo data.

## Acceptance gate / next step

The local implementation and gates pass. P1-UI-007 is not yet accepted until its exact PR-head required checks pass, the implementation PR is merged, and post-merge `main` CI passes. Do not begin P1-UI-008 before explicit owner authorization.
