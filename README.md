# Anime Apocalypse (AAP) — Project Workspace

## Current checkpoint — 2026-10-27

`P1-UI-001` is accepted for its bounded scaffold/shell scope, and `DOC-WF-001` is complete. The owner successfully pushed the initial source to [bestgmza123-oss/AAP](https://github.com/bestgmza123-oss/AAP). Remote `main` matches `ac893af3b772100477a9ddcb652bacde2987116c`. The base [AAP UI CI run #1](https://github.com/bestgmza123-oss/AAP/actions/runs/40372672282) completed `success` on that exact SHA: npm ci, lint, unit tests, typecheck, static scope audit and production build passed. The current automation branch now has local Playwright smoke tests for `/` and `/not-yet-implemented` (2/2 pass on the authorized Windows checkout) and a failure-artifact upload step in the CI workflow. These changes are now pushed in PR #1. [GitHub Actions run #7](https://github.com/bestgmza123-oss/AAP/actions/runs/40377930212) passed quality and Playwright browser jobs on the PR head SHA 4b646efa708ac4be39a59d0dc55b47f7e7ec665d. An intentional browser failure in temporary [run #9](https://github.com/bestgmza123-oss/AAP/actions/runs/40378477194) proved report/screenshots/traces are uploaded; the temporary branch was removed afterward. Main branch protection is configured/read back with both required status checks. PR #1 remains open/unmerged for owner review. The Windows checkout is at `C:\Users\ultra\Downloads\AAP_Project`; Remote Desktop Commander has inspected it successfully in this session. Follow `AAP_Documentation_Reboot/delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md` so routine tests, diffs and commit preparation are performed by the Agent/CI when available instead of repeatedly by the owner. Do not start `P1-UI-002` automatically.

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

`P1-UI-001` is accepted. Its browser composite showed the root shell and unknown-route placeholder; the address-bar limitation is documented in `evidence/browser-smoke-evidence.md`. Its previous hash-verified code checks were PASS and should not be repeated unless the source/configuration changes.

The bootstrap blocker is resolved. GitHub remote `main` is `ac893af3b772100477a9ddcb652bacde2987116c`; [AAP UI CI run #1](https://github.com/bestgmza123-oss/AAP/actions/runs/40372672282) returned `success` on the same SHA. Its real job passed npm ci, lint, unit tests, typecheck, static scope audit and production build. This is not Playwright/E2E evidence. Browser smoke with retained failure artifacts and branch protection/Required Status Checks have not yet been verified. The authorized Windows checkout is `C:\Users\ultra\Downloads\AAP_Project`, and the current automation operating guide is `AAP_Documentation_Reboot/delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md`.

The bounded documentation gate `DOC-WF-001` is complete and statically audited (`AAP_Documentation_Reboot/delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`, `evidence/DOC-WF-001_CHECKPOINT.md`). This does not close `P1-UI-001` or start `P1-UI-002`; the owner must explicitly request the next Task after acceptance.
