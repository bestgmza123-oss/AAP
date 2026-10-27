# P1-UI-002 — Start, fixture identity and global navigation

## Status

**IN PROGRESS — PR #2 OPEN; exact-head CI and review remain required.** P1-UI-002 was explicitly authorized by the owner on 2026-10-27. Branch: `task/p1-ui-002-start-navigation`; PR: https://github.com/bestgmza123-oss/AAP/pull/2. The last verified remote PR HEAD before the current review edits was `b75879f7f6975bc185ae3eaa25a921aa2be8ac56`; both required checks passed in [Workflow run #17](https://github.com/bestgmza123-oss/AAP/actions/runs/40388465821). The review Workspace is `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`. Local review refinements now derive every displayed version from `prototypeFixture.version` and change the unknown-route action to “Return to Start”. Windows Workspace checks after these refinements: lint PASS (four reduced-motion CSS warnings only), Vitest 5/5 PASS, typecheck PASS, scope audit PASS, production build PASS, Playwright 3/3 PASS, and `git diff --check` PASS. These are local results only and do not replace required remote CI. Run #17 predates the review refinements and does not cover later commits. Verify both required checks on the exact current PR HEAD before any merge. Preserve the seven unrelated untracked files; original Downloads checkout and backup stay untouched.

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
- Local code checks are green in the separate Desktop Workspace: lint PASS (four pre-existing reduced-motion `!important` warnings only), Vitest 5/5 PASS, typecheck PASS, scope audit PASS, build PASS and Playwright 3/3 PASS. `git diff --check` passes after normalizing line endings in the Workspace. The two review fixes are part of this task increment. PR #2 already exists; inspect the complete diff, commit only bounded tracked files, and push the existing task branch. Any new commit must pass both required checks on its exact PR HEAD. Acceptance remains IN PROGRESS until that remote verification and review decision are complete.
