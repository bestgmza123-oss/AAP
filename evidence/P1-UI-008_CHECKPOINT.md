# P1-UI-008 Checkpoint — Run Result, accessibility, localization & vertical slice

Date: 2026-10-27 (Asia/Bangkok)
Task: `P1-UI-008 — Run Result, accessibility, localization & vertical-slice review`
Status: **ACCEPTED AND MERGED** — implementation PR #14 merged; exact-head CI and post-merge `main` CI passed.

## Source identity

- Implementation package: `AAP_UI_P1/`
- Implementation branch: `feat/p1-ui-008-result-a11y-localization`
- Base `main` SHA: `e881eea47dafc3aa1f2ac8d99a28499099267621`
- Trello: https://trello.com/c/VtCqHOkx/13-p1-ui-008-run-result-accessibility-localization-vertical-slice-review
- Implementation PR #14: https://github.com/bestgmza123-oss/AAP/pull/14
- Exact PR-head CI on `946b423084d0340199f269188c16376f36aecb9e`: run #40545951534 — both `AAP UI quality gates` and `Playwright browser smoke` passed: https://github.com/bestgmza123-oss/AAP/actions/runs/40545951534
- Squash merge: `d9477bbadbeb96e62150f417aa87661e570944e3`.
- Post-merge `main` CI on the merge SHA: run #40546208070 — both required jobs passed: https://github.com/bestgmza123-oss/AAP/actions/runs/40546208070.
- Canonical scope: `AAP_Documentation_Reboot/delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`, P1-UI-008; `delivery/04_REQUIREMENTS_TRACEABILITY.md`, UI-P1-12…16; `experience/01_VISUAL_DIRECTION.md`; `experience/03_LOCALIZATION.md`; `experience/04_PHASE1_WIREFLOW.md`; `rules/02_CROSS_SYSTEM_CONTRACTS.md` CC-08.
- Relevant legacy crosswalk design inputs: LOAD-001/002/005 and MAIL-UX-001. These remain UI-test design inputs only, not server-pass evidence.
- Detailed mapping: `evidence/P1-UI-008_ACCEPTANCE_MATRIX.md`.

## Bounded implementation

- Added `/run/result/:outcome` covering distinct COMPLETED, ESCAPED, FAILED/SURRENDER and EXPIRED outcomes with explicit consequences.
- Result shows original/carried-in, chosen-pending, received-demo and forfeited buckets separately. Completed selections remain pending preview; direct pre-clear Escape forfeits a deterministic main-loot fixture; Escape during a return encounter preserves selected main loot and forfeits the return-encounter reward. Surrender/expiry do not claim death, reward or entry-refund behavior. Result route and payload are local fixtures only.
- Result fixture normalizes only known fixture identifiers, clamps quantity values to allowed ranges, and falls back to a deterministic sample for malformed/missing deep-link state.
- Added reviewable loading, waiting, empty, simulated error/retry, blocked and disabled action states. Copy explicitly states no server request/command is pending; Cancel/recovery never rerolls or mutates a Run.
- Added keyboard-focus on route entry, visible focus styling, status/landmark semantics, reduced-motion styling and a pseudo-expanded copy mode to inspect longer text without changing fixture logic.
- Added an accessible inactive Mail empty state with disabled Claim/Delete actions and a link to Updates. Future feature routes remain explicit placeholders.
- Connected existing Combat Escape/Surrender and Loot terminal outcomes to Result. Full navigation from Start → Province → Preflight → Combat → Loot → Result is browser-tested.
- No API/backend/Supabase/Auth, persistence, actual inventory mutation, debit/refund, authoritative Run/timer, RNG, Character death or future-feature activation was added.

## Local verification — Windows workspace

Executed in the authorized Windows checkout using existing locked dependencies.

| Check | Result |
|---|---|
| `npm.cmd run typecheck` | PASS |
| `npm.cmd test -- --reporter=dot` | PASS — Vitest 51/51 |
| `npm.cmd run lint` | PASS — warnings are existing reduced-motion `!important` usage plus descending-specificity warnings in scoped CSS; no lint errors |
| `npm.cmd run audit:scope` | PASS — scanned 25 source files; no Supabase reference/import or direct client network call patterns |
| `npm.cmd run build` | PASS — Vite 8.3.5, 40 modules transformed |
| `npm.cmd run test:e2e` | PASS — Playwright 25/25 |
| `python.exe evidence/doc_workflow_static_audit.py` | PASS — 70 Markdown files, 1,311 links, zero missing targets/policy markers |
| `git diff --check` | PASS — no whitespace errors after docs and E2E changes |

The tests verify deterministic UI/fixture behavior only; this task does not certify server Run, item claim, reward, timeout or account data semantics.

## Browser evidence

- `evidence/p1-ui-008-result-completed-desktop.png`: 1440×1397 px; SHA-256 `8DA9F8AAF0FD0F68CCC4A57347B763500E412F2FAC3BC24E6DA1F14FC8510559`.
- `evidence/p1-ui-008-result-escaped-desktop.png`: 1440×1545 px; SHA-256 `694576104773BC9AA0CD1FEBFCA9BDA828C0733E8433C9460D9D1CF1F8B1D949`.
- `evidence/p1-ui-008-result-expired-desktop.png`: 1280×1423 px; SHA-256 `063AD4B94218A10501DC0816BCFC41EF3EB6EE83B69A065B9AD991B205B17935`.
- `evidence/p1-ui-008-result-expanded-mobile.png`: 390×2570 px; SHA-256 `A18C554519F04CA81B167ED1F318D5B0BA93CDBCE6B4C2E9FCA40CD498F4FFF9`.
- `evidence/p1-ui-008-mail-empty-desktop.png`: 1440×1086 px; SHA-256 `0714DBB76E2A25E6886650597652B759B408804E53147EBD77B1D85DECD8164E`.
- Playwright route matrix exercises all core routes at 1440×900 and 390×844, with no horizontal overflow. Full-click journey, back navigation, outcome copy, accessibility states, keyboard/focus and reduced motion are covered.

## Acceptance result / next step

P1-UI-008 is accepted: all 16 UI-P1 criteria have mapped implementation/test/evidence, local verification passed, the implementation PR exact-head checks passed, and post-merge `main` CI passed. No authoritative server or persistent gameplay behavior is implied. Historical note: P2-GATE-000 was the next task candidate when this checkpoint was written; it was subsequently authorized and completed. Current status is recorded in AAP_Documentation_Reboot/delivery/P2_GATE_000_SEMANTIC_TEST_PREFLIGHT.md and evidence/P2-GATE-000_CHECKPOINT.md.
