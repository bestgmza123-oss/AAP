# Anime Apocalypse (AAP) — Project Workspace

## Latest checkpoint — P1-UI-006 accepted — 2026-10-27

`P1-UI-006 — Escape / Surrender confirmations` is accepted and merged. PR #10 was squash-merged to `main` at `77066a810de7ad52fe92aba842213524d1e54255`; exact PR-head CI run #36 and post-merge `main` CI run #37 passed. The merged implementation was re-verified locally on Windows: typecheck PASS, Vitest 30/30, lint PASS with four existing reduced-motion CSS `!important` warnings, scope audit PASS (18 source files), production build PASS (35 modules), Playwright 14/14, documentation static audit PASS, and `git diff --check` PASS. See `evidence/P1-UI-006_CHECKPOINT.md` and the Escape desktop/mobile screenshots. The active task boundary is accepted through P1-UI-006; do not begin P1-UI-007 until explicit owner authorization.

## Historical checkpoint through P1-UI-005 — 2026-10-27

`P1-UI-001` is accepted, `DOC-WF-001` is complete, and P1-UI-002 is accepted/merged. PR #2 code was reviewed at `6f839f188de72c2ccd2cb4b04175fae128512137`, merged at `07f6eec932f6e129708061f5dc2489588153811e`; both required checks passed on the exact PR HEAD in [Actions run #18](https://github.com/bestgmza123-oss/AAP/actions/runs/40472376133). PR #3 merged the documentation checkpoint at `39f50737c97b10db67aa0a293894c69586170e55`; its exact source-SHA checks passed in [Actions run #20](https://github.com/bestgmza123-oss/AAP/actions/runs/40473586474).

`P1-UI-003 — Province and resource preview` is accepted and PR #4 has been squash-merged into `main` at `aae3f18dffa78b6261d00553acfc7544df823b54`. Implementation commit `614a9dff49e99fe944c9994df02b893e3262fccc` was reviewed; final PR head `787e3f86ec9b63d8186baf488ad1bf7cbf5e32ce` passed both required checks in [Actions run #23](https://github.com/bestgmza123-oss/AAP/actions/runs/40483970704). Post-merge `main` CI also passed both jobs on the merge SHA in [Actions run #24](https://github.com/bestgmza123-oss/AAP/actions/runs/40484189586). Province hierarchy/current location/Safe Zone, unavailable destination fixtures, and static resource/carry-weight preview are implemented; Hunger says `100 = Fed · 0 = Death`, and Hunger/Infection remain visibly preview-only and inactive in Phase 1. See `evidence/P1-UI-003_CHECKPOINT.md` for its exact evidence. P1-UI-004 — Run preflight screen is accepted and complete. PR #6 was squash-merged into `main` at `806ed7b03d82ca45b54b00cbbfd76189c4364799`; its final PR head passed both required jobs in [Actions run #28](https://github.com/bestgmza123-oss/AAP/actions/runs/40492840465), and post-merge `main` passed both jobs on the merge SHA in [run #29](https://github.com/bestgmza123-oss/AAP/actions/runs/40493124464). See `evidence/P1-UI-004_CHECKPOINT.md` for its local and remote acceptance evidence. P1-UI-005 is accepted and complete. PR #8 was squash-merged into `main` at `d52413d422cac1ba416d6f109d5a99f290cf6d44`; exact PR head `531f78bffcf93e8f56dcfc3fa4bd10cdc7a12456` passed both required jobs in [Actions run #32](https://github.com/bestgmza123-oss/AAP/actions/runs/40502541879), and post-merge `main` passed both jobs in [run #33](https://github.com/bestgmza123-oss/AAP/actions/runs/40502782746). Local P1-UI-005 checks currently pass: typecheck, Vitest 21/21, lint (four existing reduced-motion CSS `!important` warnings), scope audit (16 source files), production build (34 modules), Playwright 9/9, static documentation audit (70 Markdown files/1,305 local links/0 missing targets), and `git diff --check`. See `evidence/P1-UI-005_CHECKPOINT.md` and its desktop/mobile screenshots. PR #8 exact-head and post-merge CI both passed as recorded above. Stop before P1-UI-006.

The active Workspace remains `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`. The original checkout `C:\Users\ultra\Downloads\AAP_Project`, backup `C:\Users\ultra\Downloads\AAP_Project_prebootstrap_backup_20261027`, bootstrap ZIP and seven unrelated pre-existing untracked files are preserved. P1-UI-001 through P1-UI-006 are accepted. The current implementation bound includes the deterministic in-memory Combat UI fixture and local-only Escape/Surrender confirmations; it excludes authoritative combat/RNG, a real Run/timer, actual currency/item debit, death/Infection simulation, persistence, backend/API/Supabase/Auth, Loot or Result. Stop before P1-UI-007 and wait for explicit owner direction. Follow `AAP_Documentation_Reboot/delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md` for repository/CI-first execution.

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


## Historical acceptance and workflow evidence — P1-UI-001/002

`P1-UI-001` is accepted and `DOC-WF-001` is complete. The bootstrap blocker is resolved; Playwright browser smoke, failure-artifact behavior and required main-branch checks were verified in the completed Workflow Automation task. See `AAP_Documentation_Reboot/delivery/14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md` for that historical evidence.

`P1-UI-002` is accepted and [PR #2](https://github.com/bestgmza123-oss/AAP/pull/2) was squash-merged on 2026-10-27. Reviewed source HEAD: `6f839f188de72c2ccd2cb4b04175fae128512137`; merge commit: `07f6eec932f6e129708061f5dc2489588153811e`. Both required jobs passed on the exact source HEAD in [Actions run #18](https://github.com/bestgmza123-oss/AAP/actions/runs/40472376133). Read `AAP_Documentation_Reboot/delivery/16_P1_UI_002_START_NAVIGATION.md` for the task contract and acceptance record. The Workspace is `C:\Users\ultra\Desktop\AAP_Workspace\AAP_Project`; original project and backup remain preserved, with seven unrelated untracked files unstaged. P1-UI-003 and P1-UI-004 were subsequently accepted/merged; P1-UI-005 was authorized, implemented and accepted in PR #8. The current accepted bound and stop condition are recorded in `AAP_Documentation_Reboot/delivery/03_NEXT_TASK.md` and `evidence/P1-UI-005_CHECKPOINT.md`.

`DOC-WF-001` remains complete and statically audited (`AAP_Documentation_Reboot/delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`, `evidence/DOC-WF-001_CHECKPOINT.md`). The currently authorized bound is P1-UI-005: deterministic, in-memory Combat UI fixtures only. Do not add authoritative combat/RNG, real Run or timer, death/Infection simulation, persistence, backend/API/Supabase/Auth, Escape/Surrender, Loot or Result. P1-UI-005 is accepted; exact PR-head and post-merge CI passed as recorded in the current checkpoint. Stop before P1-UI-006.
