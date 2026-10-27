# P1-UI-006 Checkpoint — Escape / Surrender confirmations

Date: 2026-10-27 (Asia/Bangkok)
Task: `P1-UI-006 — Escape / Surrender confirmations`
Status: **ACCEPTED — implementation PR merged; exact-head and post-merge CI passed**

## Source identity and acceptance

- Project root: `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`
- Implementation workspace: `AAP_UI_P1/`
- Implementation branch: `feat/p1-ui-006-escape-surrender`
- Base `main` before implementation: `01cab4d69fa282c691bc868afac558f7514967ec`
- Implementation commit / exact PR head: `178421df35520e41dd64eaa89798328738aa9501`
- PR #10: https://github.com/bestgmza123-oss/AAP/pull/10 — squash-merged on 2026-10-27.
- Merge commit on `main`: `77066a810de7ad52fe92aba842213524d1e54255`
- Exact PR-head Actions run #36: https://github.com/bestgmza123-oss/AAP/actions/runs/40517337698 — required quality gates and Playwright browser smoke passed on the exact PR head.
- Post-merge `main` Actions run #37: https://github.com/bestgmza123-oss/AAP/actions/runs/40518825694 — workflow conclusion success on the merge SHA above.
- Canonical scope: `AAP_Documentation_Reboot/delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`, row P1-UI-006; `delivery/04_REQUIREMENTS_TRACEABILITY.md`, UI-P1-08/09; SYS-09/10/13/29; and `systems/escape-surrender.md`.
- The original Downloads checkout, pre-bootstrap backup and bootstrap ZIP remain preserved. Seven unrelated untracked files in this workspace remain unstaged and uncommitted.

## Bounded implementation

- Escape and Surrender use separate confirmation dialogs with distinct consequence copy and separate local terminal-demo outcomes.
- Escape previews the configured fixture cost before confirmation using the contract formula `ceil((20 + 5×W) × Z)`. Demonstration values of 65 Gold (pre-clear) and 85 Gold (return encounter) are explicitly non-final fixture data, not approved balance values. Insufficient Gold disables confirmation; a Warp Stone option appears only when the fixture says one is carried.
- Escape before a main Run clear forfeits pending Run rewards, does not seize carried-in items, and returns to the current Province without an additional encounter. Escape from a return encounter retains already-selected main loot but forfeits that encounter's reward. Cost-weight handling follows the selected retained-loot branch.
- Surrender is available only while the local Combat demo remains active. Its confirmation states the local FAILED outcome, no Run reward/EXP/refund, no Character death and no HP refill.
- Cancel/back returns to the same Combat fixture state. Confirmation is guarded against repeated terminal outcomes; dialog keyboard focus, Escape-key cancellation, keyboard navigation, mobile layout and English labels are covered.
- All exit outcomes are local display/fixture transitions only. No server Run mutation, actual Gold/Warp Stone debit, refund, authoritative reward/asset disposition, Character death, server RNG/timer, API/backend/Supabase/Auth, persistence, Loot/Result flow or P1-UI-007 implementation was added.

## Local verification — Windows workspace

Executed from the merged source on `main` with existing dependencies reused.

| Check | Result | Evidence |
|---|---|---|
| `npm.cmd run typecheck` | PASS, exit 0 | TypeScript check |
| `npm.cmd test -- --reporter=dot` | PASS, exit 0 | Vitest: 30/30 tests |
| `npm.cmd run lint` | PASS, exit 0 | Four existing reduced-motion CSS `!important` warnings only |
| `npm.cmd run audit:scope` | PASS, exit 0 | 18 source files; no Supabase references/imports or direct client-network call patterns |
| `npm.cmd run build` | PASS, exit 0 | Vite 8.3.5; 35 modules transformed |
| `npm.cmd run test:e2e` | PASS, exit 0 | Playwright: 14/14 tests |
| `python.exe evidence/doc_workflow_static_audit.py` | PASS, exit 0 | Static documentation/link audit |
| `git diff --check` | PASS, exit 0 | No whitespace errors |

The four lint warnings are the existing reduced-motion CSS `!important` warnings; lint exits successfully. These checks establish local UI fixture behavior, not authoritative server/gameplay behavior or approved economy balance.

## Browser evidence

- Desktop Escape confirmation: `evidence/p1-ui-006-escape-desktop.png`; Playwright full-page capture, desktop viewport 1440×900 and image dimensions 1440×2110. SHA-256: `3E6C88454B04B088A022A46914F8ABF55151770DEBE7572D8136F32DA7F9D866`.
- Mobile Escape confirmation: `evidence/p1-ui-006-escape-mobile.png`; viewport 390×844. SHA-256: `775983D2FDBDDDAE690B404DAD296C933FE25899FBA706402075F1A8FC16B385`.
- Test definitions: `AAP_UI_P1/src/App.test.tsx`, `AAP_UI_P1/src/fixtures/escape-surrender.test.ts`, and `AAP_UI_P1/e2e/smoke.spec.ts`. Playwright checks include cost/consequence branches, insufficient Gold, conditional Warp Stone, Surrender consequences, mobile overflow and dialog focus handling.

## Stop condition

P1-UI-006 is accepted and complete. Do not begin P1-UI-007 (Loot, capacity and optional return encounter) until the owner explicitly authorizes that separate bounded task.
