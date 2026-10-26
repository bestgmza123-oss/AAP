# Workflow Automation & GitHub CI Setup

## Task contract

- **Task ID:** Workflow Automation & GitHub CI Setup
- **Current status:** In Progress — initial repository bootstrap and base CI are verified; Playwright, failure artifacts, PR flow and Required Status Checks remain pending.
- **Purpose:** Make the existing AAP repository, commit history, pull requests, Windows checkout and GitHub Actions the routine workflow, reducing manual tests, copy/paste logs and unnecessary owner commits.
- **Source authority:** AAP root README, AAP_Documentation_Reboot/AGENTS.md, delivery/03_NEXT_TASK.md, delivery/06_TASK_BOARD_WORKFLOW.md, delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md, delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md, CHECKLIST_FOR_REVIEW.md, and AAP_UI_P1/package.json + package-lock.json.
- **Game-rule changes:** None authorized. Workflow/tooling only. Do not edit game systems, mechanics, balance, feature scope, or backend contracts.
- **Next-task control:** Do not start P1-UI-002 automatically.

## Current verified state — 2026-10-27

| Check | Result | Evidence |
|---|---|---|
| Canonical repository | PASS — public repository at the exact owner-provided URL | https://github.com/bestgmza123-oss/AAP |
| Owner's initial push | PASS — main points to ac893af3b772100477a9ddcb652bacde2987116c | [Commit](https://github.com/bestgmza123-oss/AAP/commit/ac893af3b772100477a9ddcb652bacde2987116c) |
| Git authentication | PASS — owner refreshed gh OAuth scope workflow; active account bestgmza123-oss; normal push succeeded | Owner-provided PowerShell output |
| Base GitHub Actions | PASS — AAP UI CI run #1 completed with conclusion success on the same SHA | [Run #1](https://github.com/bestgmza123-oss/AAP/actions/runs/40372672282) |
| Actual CI steps | PASS — checkout, Node/npm setup/cache, npm ci, lint, unit tests, typecheck, static scope audit, production build | [Job output](https://github.com/bestgmza123-oss/AAP/actions/runs/40372672282/job/121747257234) |
| Windows remote workspace | PASS — DESKTOP-6U02MEL online; repository at C:\Users\ultra\Downloads\AAP_Project; main tracks origin/main at the verified commit | Remote Desktop inspection, 2026-10-27 |
| Working-tree state at inspection | Known untracked local legacy/manifests/evidence files exist; do not auto-add or delete them without auditing scope | Remote git status output |
| Playwright package/config/routes | NOT RUN — needs a task branch and npm-generated package-lock update | No Playwright workflow run exists |
| Browser failure report/screenshots/traces as Actions artifacts | NOT VERIFIED — requires a real browser job/run | No artifact result claimed |
| PR-based task delivery | NOT RUN for this workflow enhancement | No PR exists for Playwright yet |
| Required Status Checks / branch rules | NOT VERIFIED — base CI passing does not imply protection has been enabled | Read branch protection/ruleset settings before claiming active |
| Trello sync | Updated with the verified push/CI state and the next bounded actions | [Task card](https://trello.com/c/FQsbZsmU/6-workflow-automation-github-ci-setup-%E0%B9%80%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A1-aap-repository) |
| P1-UI-002 / game rules | Not started / unchanged | Scope boundary for this task |

## What is in scope

1. Keep repository branch/commit/PR/Actions as the authoritative code and test handoff.
2. Use the authorized Windows checkout via Remote Desktop Commander for in-scope file edits, local commands, diff review and test execution when the device is online and the tool permits the action.
3. Avoid requiring the owner to rerun routine lint/test/build, copy entire command transcripts, or commit every small edit when the Agent can inspect the same workspace or CI evidence directly.
4. Create an isolated task branch for this follow-up; do not do routine new work directly on main.
5. Add Playwright as a real dev dependency using npm and update package.json/package-lock.json together. Never hand-edit the lockfile.
6. Test / (fixture-only boundary banner and P1-UI-001 shell) and /not-yet-implemented (placeholder and return-to-shell link).
7. Publish browser reports, screenshots and traces as GitHub Actions artifacts when tests fail, with explicit artifact paths and retention.
8. Verify every CI run against its source SHA. Configure/read back Required Status Checks only when actual stable check names and settings permission are confirmed.
9. Update this task's documents/checkpoint/Trello without editing any game rules or starting P1-UI-002.

## Out of scope

- Gameplay or product work for P1-UI-002 and later.
- API/backend/database/Supabase/auth/persistence, secrets, deployment or production release.
- Replacing the canonical repository, force pushing, bypassing failing checks or weakening security settings to make automation pass.
- Retrying npm installation in an Agent environment with known EAI_AGAIN evidence unless new diagnostics prove connectivity changed.
- Claims of browser testing, artifacts, branch protection, or required checks without observable results.

## Execution plan

1. Inspect the online Windows device, actual Project Root, git status, branch/HEAD and the matching Trello card. Preserve unrelated untracked local files.
2. Read the canonical workflow rules including delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md.
3. Create a branch based on the latest origin/main. Keep the work limited to the automation acceptance criteria above.
4. Add Playwright test dependency, scripts, config and the two route tests with npm in the authorized checkout or a verified GitHub-hosted environment. Use the actual package scripts and Node/npm engines from AAP_UI_P1/package.json.
5. Run relevant local checks. Reuse working dependencies while the lockfile is unchanged; if dependencies must be re-synced, use npm ci only where connectivity and environment support it.
6. Inspect git diff, git diff --check, status and the staged file set. Do not include secrets, .env, node_modules, dist, logs or unrelated pre-existing untracked files.
7. Commit a coherent, tested increment once, rather than committing each edit/test iteration. Push the task branch and open a PR when the authorized write surface supports those operations.
8. Inspect actual Actions results/artifacts; compare PR head SHA, reviewed diff, workflow SHA and evidence. Any new commit needs checks for that new SHA.
9. Configure required status checks only after real check names have completed successfully and repository permission is confirmed. Read back branch protection/ruleset settings.
10. Update the same Trello card with the actual branch/commit/PR/run/artifact URLs and the next decision or blocker.

## Acceptance criteria

- [x] Exact existing repository resolved: https://github.com/bestgmza123-oss/AAP.
- [x] Initial commit pushed; remote main SHA matches ac893af3b772100477a9ddcb652bacde2987116c.
- [x] Base CI workflow ran on that SHA and completed success. All existing package gates were green in the real Actions job.
- [x] Project status/checkpoint updated to reflect the observed remote push and CI result, without claiming browser test success.
- [x] A canonical owner-PC automation guide exists at delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md.
- [ ] Playwright dependency, lockfile, script, config and tests committed on a named task branch.
- [ ] Browser checks pass for both required routes on GitHub Actions.
- [ ] Failed browser runs retain report/screenshots/traces as artifacts; verify artifact paths against a real run.
- [ ] PR head, CI run, reviewed diff and checkpoint all identify the same source SHA.
- [ ] Required Status Checks and main branch rules are configured/read back if permission and stable check names are available; otherwise record NOT CONFIGURED/NOT VERIFIED and the actual limitation.
- [ ] Trello links the real branch/commit/PR/Actions/artifacts and offers one genuine next action.
- [x] No game rules changed and P1-UI-002 remains unstarted.

## Known owner/computer boundary

The Windows computer is reachable through Remote Desktop Commander in this session, and direct workspace reads are working. This does not mean every action is always permitted: authentication/MFA/UAC/permission prompts and safety-blocked commands may require owner input or may have to stop. Do not bypass such a block. First try direct read/verification and authorized CI paths; if an owner action is truly required, provide one consolidated PowerShell action set with the real Project Root, expected output and resume criterion. Never ask for tokens/passwords.

## Resume point

Resume this same task at the first incomplete acceptance item: Playwright + browser artifacts on a task branch, then PR-based verification and Required Status Checks read-back. The first baseline CI is complete; do not bootstrap the repository again, request recurring ZIPs, or start P1-UI-002.

## References checked 2026-10-27

- [GitHub CLI gh auth refresh](https://cli.github.com/manual/gh_auth_refresh)
- [Playwright CI](https://playwright.dev/docs/ci) and [Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [GitHub Actions artifacts](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts)
- [Managing protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Managing workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs)
