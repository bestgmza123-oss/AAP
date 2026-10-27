# P1-UI-004 Checkpoint — Run preflight screen

Date: 2026-10-27 (Asia/Bangkok)
Task: `P1-UI-004 — Run preflight screen`
Status: **READY FOR REVIEW — local acceptance PASS; implementation source passed both required Actions jobs**

## Source identity and preservation

- Project Root: `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`
- Implementation workspace: `AAP_UI_P1/`
- Base `main` SHA: `7398698608917c21ff76d721d59206dc3bc0caf7`
- Task branch: `feat/p1-ui-004-run-preflight`
- Parent: P1-UI-003 accepted/merged; task contract is row `P1-UI-004` in `AAP_Documentation_Reboot/delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`, UI requirement `UI-P1-05`, `experience/04_PHASE1_WIREFLOW.md` Screen 2, and SYS-09/10/13/29/30.
- Original Downloads checkout, pre-bootstrap backup and bootstrap ZIP remain untouched.
- Seven unrelated, pre-existing untracked files remain unstaged: `CHECKSUMS.sha256`, `PACKAGE_MANIFEST.json`, `PACKAGE_MANIFEST.md`, `evidence/OWNER_ACTION_TASK_TH.md`, `evidence/doc_workflow_static_audit.py`, `evidence/owner-recheck-analysis.md`, and `evidence/owner-windows-final-results-summary.md`.

## Bounded implementation

- Added `/run/preflight` and a navigable Province → Run Preflight route with page title, back/cancel navigation and a persistent fixture-only boundary.
- Readable disclosures: Province and Standard Run fixture identity, recommended level/threat, `4–7` Normal enemies, current static HP/Stamina/Mana/Hunger/Infection fixture values, no-potion/no-loadout-change restrictions, 30-minute hard timeout, expiry risk, optional maximum-one return-encounter notice, and Escape/Surrender consequences.
- The sole displayed entry-cost calculation follows `18 + 2 × ceil(dungeon level / 5)` from the Phase 1 baseline. Fixture scenarios display Level 1 = 20, Level 5 = 20, Level 6 = 22 and Level 50 = 38 Stamina. Unsupported levels are rejected by the calculation helper.
- The timer is disclosed only; no countdown runs. The enemy count is a range, not rolled/persisted. No real Stamina is reserved or debited. The `Begin Demo Run` control records local UI state only and stays on preflight; it does not create/enter a Run or open Combat. Cancel returns to Province without changing fixture values.
- An insufficient-Stamina preview disables confirmation with the exact current/required amounts. Internal verification controls preview missing-fixture and retryable-error states; retry restores the normal local preview. These are client-side display examples only, with no network request or gameplay mutation.
- Escape details intentionally do not invent a final Gold cost or danger multiplier because the preflight task does not authorize final balance values. Surrender is disclosed as available only during active Combat, not as a pre-entry action.
- English strings use stable translation keys; focused controls and state disclosure have keyboard-accessible text and visible focus styling. Responsive CSS covers desktop and narrow mobile.

## Local verification — Windows Workspace

Executed on the final local source before commit; commands ran in `AAP_UI_P1/` unless stated otherwise. Existing dependencies were reused; no install or lockfile change was needed.

| Check | Result | Observed evidence |
|---|---|---|
| `npm.cmd run typecheck` | PASS, exit 0 | `tsc --noEmit` |
| `npm.cmd test` | PASS, exit 0 | Vitest: 1 test file, 14/14 tests; includes Levels 1/5/6/50 and missing-fixture/error/retry states |
| `npm.cmd run lint` | PASS, exit 0 | Biome checked 18 files; four warnings remain in existing reduced-motion CSS `!important` declarations only |
| `npm.cmd run audit:scope` | PASS, exit 0 | 14 source files; no Supabase references/imports or direct client-network call patterns |
| `npm.cmd run build` | PASS, exit 0 | Vite 8.3.5; 32 modules transformed |
| `npm.cmd run test:e2e` | PASS, exit 0 | Playwright: 5/5 tests, including desktop/mobile preflight, Level cost scenarios, disabled states, local confirmation and cancel |
| `python.exe evidence/doc_workflow_static_audit.py` (Project Root) | PASS, exit 0 | 70 Markdown docs; 0 non-Markdown files in documentation subtree; 1,302 local links; no missing targets or required policy markers |
| `git diff --check` | PASS, exit 0 | No whitespace errors |

## Browser evidence

- `evidence/p1-ui-004-run-preflight-desktop.png` — Playwright full-page screenshot, 1440 px wide; captured at 1440×900 viewport.
- `evidence/p1-ui-004-run-preflight-mobile.png` — Playwright full-page screenshot, 390 px wide; captured at 390×844 viewport.
- Current screenshot file dimensions: desktop 1440×2465 px; mobile 390×3661 px.
- Test definitions: `AAP_UI_P1/src/App.test.tsx` and `AAP_UI_P1/e2e/smoke.spec.ts`.

The tests and screenshots prove only local UI fixture behavior. They do not validate server authority, game balance, Run persistence, RNG, real elapsed time, or resource debit.

## Remote verification and handoff

- Pull request: [#6 — P1-UI-004: Run preflight disclosure and local confirmation](https://github.com/bestgmza123-oss/AAP/pull/6), currently open on `main`.
- Implementation commit SHA: `07aa40595cf0311b508dc5e756933b9aa8e26d2d`.
- [GitHub Actions run #27](https://github.com/bestgmza123-oss/AAP/actions/runs/40491822726) passed on implementation SHA `07aa40595cf0311b508dc5e756933b9aa8e26d2d` (then-current PR head): `AAP UI quality gates` **PASS** and `Playwright browser smoke` **PASS**; browser diagnostics were correctly skipped on success. Any later PR commit, including documentation-only updates, must be checked on its own latest PR-head SHA before merge.
- Trello task: [P1-UI-004 — Run preflight screen](https://trello.com/c/1Yfn29lE/9-p1-ui-004-run-preflight-screen), currently In Progress.

## Stop condition

This task ends after preflight disclosure and local confirmation/cancel/error-state examples are accepted. Do not implement Combat/P1-UI-005, a real Run, Stamina debit, server enemy roll, live timer, backend/API/Supabase/Auth, or persistent state.