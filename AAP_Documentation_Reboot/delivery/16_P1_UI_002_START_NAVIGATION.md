# P1-UI-002 — Start, fixture identity and global navigation

## Status

**ACCEPTED — PR #2 SQUASH-MERGED.** P1-UI-002 was explicitly authorized by the owner on 2026-10-27 and merged after bounded code review. PR: https://github.com/bestgmza123-oss/AAP/pull/2. Reviewed PR source HEAD: `6f839f188de72c2ccd2cb4b04175fae128512137`; merge commit on `main`: `07f6eec932f6e129708061f5dc2489588153811e` (2026-10-27). Both required checks passed on the exact reviewed HEAD in [Workflow run #18](https://github.com/bestgmza123-oss/AAP/actions/runs/40472376133): `AAP UI quality gates` and `Playwright browser smoke`. Local Windows checks also passed: lint (four existing reduced-motion CSS `!important` warnings only), Vitest 5/5, typecheck, scope audit, production build, Playwright 3/3 and `git diff --check`. Documentation audit: 70 Markdown files, 0 non-Markdown files under docs subtree, 1,299 local Markdown links, 0 missing targets. The review refinements derive version labels from `prototypeFixture.version`, make unknown-route navigation say “Return to Start”, and update the tests. Preserve seven unrelated pre-existing untracked files; original Downloads checkout and backup remain untouched.

## Outcome

Build the Start entry screen and global navigation states on top of the accepted P1-UI-001 shell.

## In scope

- Start page with a clearly labeled local fixture identity that cannot be mistaken for a player account or authenticated session.
- Truthful package version label (`0.1.0`, private preview only).
- Start and Updates navigation; Updates presents an honest empty state rather than claiming to have published patch history.
- Mail is visibly disabled and provides an accessible reason; no mail route, delivery, account, or service is implied.
- Keyboard-accessible links, visible focus, and responsive desktop/mobile layout.
- Update tests and browser smoke coverage for the implemented states.

## Out of scope / stop boundary

- No Province, Run, combat, inventory, or other gameplay screens.
- No changes to game rules, game balance, source-of-truth rules, or gameplay fixtures.
- No real login, API/backend/Supabase, server persistence, patch service, or Mail delivery.
- Preserve the seven unrelated pre-existing untracked local files; do not stage or delete them.

## Acceptance criteria

1. Start is the default route and clearly identifies the local fixture.
2. Version label identifies the private UI package only; no release/published-feed claims.
3. Start/Updates navigation works by mouse and keyboard; current route is semantically indicated.
4. Mail is disabled and its reason is available to assistive technology.
5. Unknown routes remain explicit placeholders and can return to Start.
6. Lint, unit tests, typecheck, static scope audit, build and Playwright smoke pass on the same task revision.
7. Capture browser evidence for desktop and mobile, inspect `git diff`, and ensure no gameplay/backend scope leakage.
8. Commit and push only the task branch, open PR, and verify required CI checks against the exact PR HEAD SHA.

## Current implementation checkpoint

- Added Start page and Updates page, global navigation, local fixture identity `AAP-LOCAL-001`, version `0.1.0`, disabled Mail state and accessible explanatory text.
- Updated unit tests and Playwright smoke tests for the new task.
- Local verification on the current working revision: lint PASS (4 pre-existing reduced-motion `!important` warnings only), Vitest 5/5 PASS, typecheck PASS, scope audit PASS, build PASS, Playwright 3/3 PASS, `git diff --check` PASS.
- Playwright generated desktop and 390×844 mobile screenshots at `AAP_UI_P1/test-results/p1-ui-002-start-desktop.png` and `AAP_UI_P1/test-results/p1-ui-002-start-mobile.png` (ignored local evidence; not committed as generated test output).
- Static documentation audit PASS: 70 Markdown files, 0 non-Markdown files under docs subtree, 1,299 local Markdown links, 0 missing targets, required policy markers present.
- **Acceptance gate: PASS.** The final reviewed source HEAD is `6f839f188de72c2ccd2cb4b04175fae128512137`; [Actions run #18](https://github.com/bestgmza123-oss/AAP/actions/runs/40472376133) passed both required jobs on that exact SHA. PR #2 was squash-merged at `07f6eec932f6e129708061f5dc2489588153811e`. No new game/backend scope was introduced. Do not start P1-UI-003 automatically; await explicit owner direction.
