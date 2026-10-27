# Anime Apocalypse (AAP) — Project Workspace

## Current checkpoint — 2026-10-27

`P1-UI-001` is accepted and `DOC-WF-001` is complete. Workflow Automation/PR #1 and P1-UI-002/PR #2 are both merged into `main`. P1-UI-002 was accepted after review; its source HEAD was `6f839f188de72c2ccd2cb4b04175fae128512137`, merged at `07f6eec932f6e129708061f5dc2489588153811e` on 2026-10-27. Both required checks passed on that exact PR HEAD in [Actions run #18](https://github.com/bestgmza123-oss/AAP/actions/runs/40472376133). Local Windows checks also passed: lint (four existing reduced-motion CSS `!important` warnings only), Vitest 5/5, typecheck, scope audit, production build, Playwright 3/3, `git diff --check`; documentation audit passed with 70 Markdown files and 1,299 local links. The active Workspace remains `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`. The original checkout `C:\Users\ultra\Downloads\AAP_Project`, the backup `C:\Users\ultra\Downloads\AAP_Project_prebootstrap_backup_20261027`, the bootstrap ZIP and seven unrelated untracked files are preserved. Do not extend into gameplay/backend work or start P1-UI-003 automatically; wait for explicit owner direction for the next bounded task. Follow `AAP_Documentation_Reboot/delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md` for repository/CI-first execution.

## Environment blocker policy

After `EAI_AGAIN` has been proven for npm registry access in an Agent Environment, do not retry installation in that same environment unless new diagnostics demonstrate changed connectivity/settings. Record `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`) separately from code/configuration failure; do not generalize this to a ChatGPT-wide outage. Check only a real, authorized GitHub Actions route; otherwise give the owner one complete Windows verification set. Keep previously successful dependencies when the lockfile is unchanged and return results to resume the same Task.

This project keeps the canonical design documents and the bounded UI implementation under one Project Root:

- `AAP_Documentation_Reboot/` — canonical documentation-only subtree. Never put implementation source code inside it.
- `AAP_UI_P1/` — sibling folder for the private React + TypeScript frontend prototype. `P1-UI-001` is scaffold/shell only.
- `evidence/` — baseline inventory, command outputs, task checkpoint and other evidence actually produced.

When the existing authorized AAP repository is accessible, the routine handoff is the branch/commit/PR plus CI run/artifact links; do not create a ZIP for every task. Use one combined docs+code ZIP for milestone/release, explicit owner request, or a documented temporary repository-access fallback. `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md` is the canonical policy.

## Start the UI workspace

Use Node.js 22.12+ and npm 10+ (the scaffold was created with Node.js 22.16.0 and npm 10.9.2). This handoff includes `AAP_UI_P1/package-lock.json`. If the matching checkout already has dependencies installed and the lockfile is unchanged, do not reinstall; run the verification commands below. For a fresh/clean checkout, from `AAP_UI_P1/` use the lockfile-respecting command:

```sh
npm ci --no-audit --no-fund
```

Keep `package-lock.json` committed/in the handoff. Do not regenerate or delete it as a routine workaround. Then start the shell with `npm run dev`.

Other checks available in `AAP_UI_P1/`:

```sh
npm run typecheck
npm run lint
npm test
npm run audit:scope
npm run build
```

If a check is blocked, classify the cause from the actual output and use the current Task's Thai checkpoint/Owner Action. During the initial repository bootstrap, see `evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`; after the first commit, prefer branch/PR/CI artifacts and do not request recurring ZIPs or transcripts. A successful build does not imply lint/tests/browser passed.

This is a **private, fixture-only prototype**. The shell has no game-server, API, Supabase, Auth, database, or persistent-state integration. Do not treat this as a playable or publicly releasable game.


## Owner Action usability rule
Owner commands must be ready to run against verified paths. Do not leave `C:\path\to\...` placeholders in a runnable PowerShell block. If a step fails due to a placeholder or incorrect relative path, correct the same Owner Action and the existing Thai Trello comment using the owner's observed path/output, explain the cause plainly, and show the corrected command plus expected result. See `AAP_Documentation_Reboot/AGENTS.md` and `AAP_Documentation_Reboot/delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`.


## Current source acceptance and workflow status (2026-10-27)

`P1-UI-001` is accepted and `DOC-WF-001` is complete. The bootstrap blocker is resolved; Playwright browser smoke, failure-artifact behavior and required main-branch checks were verified in the completed Workflow Automation task. See `AAP_Documentation_Reboot/delivery/14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md` for that historical evidence.

`P1-UI-002` is accepted and [PR #2](https://github.com/bestgmza123-oss/AAP/pull/2) was squash-merged on 2026-10-27. Reviewed source HEAD: `6f839f188de72c2ccd2cb4b04175fae128512137`; merge commit: `07f6eec932f6e129708061f5dc2489588153811e`. Both required jobs passed on the exact source HEAD in [Actions run #18](https://github.com/bestgmza123-oss/AAP/actions/runs/40472376133). Read `AAP_Documentation_Reboot/delivery/16_P1_UI_002_START_NAVIGATION.md` for the task contract and acceptance record. The Workspace is `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`; original project and backup remain preserved, with seven unrelated untracked files unstaged. P1-UI-003 has not been started.

`DOC-WF-001` remains complete and statically audited (`AAP_Documentation_Reboot/delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`, `evidence/DOC-WF-001_CHECKPOINT.md`). Do not extend P1-UI-002 into gameplay, backend/API/Supabase, real login or persistence, and do not start P1-UI-003 automatically.
