# P1-UI-005 Checkpoint — Combat interaction demo

Date: 2026-10-27 (Asia/Bangkok)
Task: `P1-UI-005 — Combat interaction demo`
Status: **ACCEPTED — implementation PR merged; exact-head and post-merge CI passed**

## Source identity and acceptance

- Project Root: `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`
- Implementation workspace: `AAP_UI_P1/`
- Implementation branch: `feat/p1-ui-005-combat-demo`
- Base `main` SHA before implementation: `1647f061eab552e5fe89088494c4e4be33f3f6cf`
- Implementation commit / exact PR head: `531f78bffcf93e8f56dcfc3fa4bd10cdc7a12456`
- PR #8: https://github.com/bestgmza123-oss/AAP/pull/8 — squash-merged on 2026-10-27.
- Merge commit on `main`: `d52413d422cac1ba416d6f109d5a99f290cf6d44`.
- Exact PR-head Actions run #32: https://github.com/bestgmza123-oss/AAP/actions/runs/40502541879 — `AAP UI quality gates` and `Playwright browser smoke` both passed on `531f78bffcf93e8f56dcfc3fa4bd10cdc7a12456`.
- Post-merge `main` Actions run #33: https://github.com/bestgmza123-oss/AAP/actions/runs/40502782746 — both required jobs passed on merge SHA `d52413d422cac1ba416d6f109d5a99f290cf6d44`.
- Canonical contract: `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md` row P1-UI-005, UI-P1-06/07 in `delivery/04_REQUIREMENTS_TRACEABILITY.md`, Screen 3 in `experience/04_PHASE1_WIREFLOW.md`, and SYS-03/05/06/07/08/16/29.
- The original Downloads checkout, pre-bootstrap backup and bootstrap ZIP remain untouched. Seven unrelated pre-existing untracked files remained unstaged and were preserved.

## Bounded implementation

- Added `/run/combat` as a deterministic, in-memory Combat interaction demo. P1-UI-004's local confirmation remains local-only; its new link opens the UI demo but does not create a server Run or debit Stamina.
- One active Normal enemy is shown at a time. Species, Tier, Threat Rank, Level and Event Tag are separately labelled. Enemy HP is shown for every fixture; enemy Mana appears only when the fixture supplies it.
- Enemy intent name is displayed only for a fixture action authored as `telegraphed: true`. An untelegraphed fixture does not reveal an action name before resolution.
- Normal Attack has 0 Stamina cost. The sample Skill explicitly shows fixture name, target, direct-magic fixture effect, Mana cost and cooldown semantics. It has a cooldown of two valid player actions. Guard reduces the next eligible fixture enemy action by 50% after fixture mitigation.
- Invalid turn, cooldown and insufficient-Mana actions are rejected without advancing turn or consuming Mana/cooldown. Player HP/Mana and cooldown carry forward between fixture enemies within temporary page state. The combat log has bounded entries and unique ordered IDs.
- Four fixed Normal enemy fixtures can be played through deterministically. A collapsed local state-preview control exposes the disabled low-Mana Skill state and can restore the demo.
- Potential fixture damage that would cross HP zero pauses the demo before applying the hit; no Character death or Infection transition is simulated.
- Escape/Surrender remain disabled and labelled for a later task. No potion, equipment/loadout changes, Loot or Result flow is exposed.
- All combat figures are private UI fixture values, not approved balance or authoritative damage validation. No backend/API/Supabase/Auth, persistent resource change, server Run, RNG/initiative roll, real timer or world-time simulation was added.

## Local verification — Windows Workspace

Executed against the final source after the last CSS selector correction; existing dependencies were reused.

| Check | Result | Observed evidence |
|---|---|---|
| `npm.cmd run typecheck` | PASS, exit 0 | `tsc --noEmit` |
| `npm.cmd test -- --reporter=dot` | PASS, exit 0 | Vitest: 1 file, 21/21 tests |
| `npm.cmd run lint` | PASS, exit 0 | Biome checked 20 files; four existing reduced-motion CSS `!important` warnings only |
| `npm.cmd run audit:scope` | PASS, exit 0 | 16 source files; no Supabase references/imports or direct client-network call patterns |
| `npm.cmd run build` | PASS, exit 0 | Vite 8.3.5; 34 modules transformed |
| `npm.cmd run test:e2e` | PASS, exit 0 | Playwright: 9/9 tests, including desktop/mobile Combat, preflight-to-Combat UI navigation and keyboard focus/activation |
| `python.exe evidence/doc_workflow_static_audit.py` | PASS, exit 0 | 70 Markdown files; 0 non-Markdown in docs subtree; 1,305 local links; no missing targets or policy markers |
| `git diff --check` | PASS, exit 0 | No whitespace errors |

## Browser evidence

- `evidence/p1-ui-005-combat-desktop.png` — full-page Playwright screenshot; desktop viewport 1440x900, image dimensions 1440x2110 px; 633,732 bytes; SHA-256 `B4EA02F9C2EDB714FBBAC4DF3E097F4BC7505694D3C73ACFA509C23391A4E016`.
- `evidence/p1-ui-005-combat-mobile.png` — full-page Playwright screenshot; mobile viewport 390x844, image dimensions 390x3613 px; 545,735 bytes; SHA-256 `E72C681E59948FBFCE1A1C2DD2254A880CB853AB4EDBBB6F1628733DD2F82EEF`.
- Test definitions: `AAP_UI_P1/src/App.test.tsx` and `AAP_UI_P1/e2e/smoke.spec.ts`. The layout was visually inspected; mobile smoke asserts document width does not exceed 390 px.

These checks prove local UI behavior only. They do not count as authoritative CMB/ENM server test results, production balance validation, or proof of a persistent Run.

## Stop condition

P1-UI-005 is accepted and complete. P1-UI-006 (Escape/Surrender confirmations) is the next bounded task, but it must not start automatically; wait for explicit owner authorization.
