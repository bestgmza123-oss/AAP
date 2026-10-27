# P1-UI-003 Checkpoint — Province and resource preview

Date: 2026-10-27 (Asia/Bangkok)
Task: `P1-UI-003 — Province and resource preview`
Status: **LOCAL ACCEPTANCE CRITERIA PASS; REMOTE PR/CI PENDING**

## Source identity and preservation

- Project Root: `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`
- Implementation workspace: `AAP_UI_P1/`
- Base `main` before this task: `39f50737c97b10db67aa0a293894c69586170e55`
- Task branch: `feat/p1-ui-003-province-resource-preview`
- Parent task: P1-UI-002 is accepted; see PRs #2/#3 and their prior exact-HEAD checks in the project README.
- Original Downloads checkout, pre-bootstrap backup and bootstrap ZIP are left untouched.
- Seven pre-existing untracked files remain unstaged: `CHECKSUMS.sha256`, `PACKAGE_MANIFEST.json`, `PACKAGE_MANIFEST.md`, `evidence/OWNER_ACTION_TASK_TH.md`, `evidence/doc_workflow_static_audit.py`, `evidence/owner-recheck-analysis.md`, and `evidence/owner-windows-final-results-summary.md`.

## Bounded implementation

- Added a Province hub with Country → Province → District/Dungeon hierarchy; distinguishes current Province/current location from the Lumen capital Safe Zone fixture.
- Listed a Standard Run fixture, but its detail/preflight action is disabled with a clear explanation. Other destination routes remain disabled and are described as unavailable.
- Added local-only HP, Stamina, Mana, Hunger and Infection meters, carry-weight preview, and deterministic fixture event labels.
- Hunger is labelled `100 = Fed · 0 = Death`; both Hunger and Infection display `PREVIEW ONLY · NOT ACTIVE IN PHASE 1`.
- The page explicitly states no elapsed-time decay, regeneration, Infection rolls, alerts or death transitions run. Values are static fixture data; no persistent world, actual travel, housing, Fridge, backend, login or state mutation has been added.
- English-first strings use stable keys in `AAP_UI_P1/src/i18n/en.ts`. Build and prototype banners remain visible.

## Local verification — Windows Workspace

Runtime observed: Node.js `v24.19.0`, npm `11.17.0`; existing locked dependencies were reused (no reinstall).

| Check | Result | Observed evidence |
|---|---|---|
| `npm.cmd run lint` | PASS, exit 0 | 16 files checked; 4 existing `!important` warnings in reduced-motion CSS only |
| `npm.cmd test` | PASS, exit 0 | Vitest: 1 file, 9/9 tests |
| `npm.cmd run typecheck` | PASS, exit 0 | `tsc --noEmit` |
| `npm.cmd run audit:scope` | PASS, exit 0 | 12 source files scanned; no Supabase import/reference or direct client-network call pattern |
| `npm.cmd run build` | PASS, exit 0 | Vite 8.3.5; 30 modules transformed |
| `npm.cmd run test:e2e` | PASS, exit 0 | Playwright: 4/4 tests; screenshots captured at 1440×900 and 390×844 viewport configurations |
| `git diff --check` | PASS, exit 0 | No whitespace errors |

## Browser evidence

- `evidence/p1-ui-003-province-desktop.png` — actual Playwright full-page screenshot captured on the local browser and visually inspected.
- `evidence/p1-ui-003-province-mobile.png` — actual Playwright full-page screenshot captured on the local browser and visually inspected.
- Test definitions: `AAP_UI_P1/e2e/smoke.spec.ts` and `AAP_UI_P1/src/App.test.tsx`.

The browser tests assert the route transition, hierarchy and Safe Zone status, Standard Run display/disabled state, prototype boundary, Hunger semantics, both preview-only statuses, and inactive-mechanics disclosure. They do not prove any authoritative gameplay behavior.

## Outstanding acceptance work

- Open a PR from `feat/p1-ui-003-province-resource-preview` and verify both required GitHub Actions jobs on the exact PR head SHA. No remote CI result has been claimed in this checkpoint yet.
- Record the final branch/commit/PR/Actions links below after they actually exist.

## Handoff fields

- Commit SHA: pending
- Pull request: pending
- Exact-head quality gate / Playwright Actions run: pending
- Trello task: https://trello.com/c/y0PIp8wB/8-p1-ui-003-province-and-resource-preview
- First incomplete criterion: exact source-SHA review and remote CI evidence.
- Stop condition: after P1-UI-003 acceptance. Do not start P1-UI-004 automatically.
