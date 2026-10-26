# Anime Apocalypse (AAP) — Project Workspace

## Current checkpoint — 2026-10-26

The hash-verified Windows checks for `P1-UI-001` passed: node syntax check, Biome lint (exit 0 with four reduced-motion warnings), Vitest 4/4, typecheck, scope audit and production build. The owner then supplied Browser evidence showing the root shell and unknown-route placeholder; its address-bar limitation is recorded in `evidence/browser-smoke-evidence.md`. `P1-UI-001` is accepted for its bounded scaffold/shell scope, and `DOC-WF-001` is complete. The current active task is **Workflow Automation & GitHub CI Setup**. The owner supplied `https://github.com/bestgmza123-oss/AAP`; a direct GitHub API lookup confirms this public repository exists on `main` and the connected identity has `admin`/`push`, but the repository is empty (`size=0`, no contents/commit yet). The exported Project Root is not a Git checkout, so the only remaining bootstrap blocker is importing the current canonical docs+code once. Do not start `P1-UI-002` automatically.

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


## Current source acceptance and workflow status (2026-10-26)

`P1-UI-001` is accepted. The owner-provided Browser composite shows both required rendered states; the full pathname is not visible in browser chrome, which is documented in `evidence/browser-smoke-evidence.md`. The hash-verified code checks are PASS (lint exit 0 with four warnings, tests 4/4, typecheck, scope audit and build); do not repeat them without a source/configuration change.

The authenticated GitHub integration has write-capable repository metadata access for the owner-provided `bestgmza123-oss/AAP` (`admin=true`, `push=true`). Direct URL lookup succeeded; the repository is public, default branch `main`, but empty (`size=0`; Contents API says “This repository is empty”). The global repository listing and bounded searches omitted this repo, so those results must not override a directly supplied URL. The exported project root has no `.git`, and no branch/commit/PR/Actions run/required-check result exists yet. Current blocker: `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER`; follow the one-time bootstrap action in `evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`. A base workflow definition (`.github/workflows/ci.yml`) is prepared in this bootstrap bundle, but it has not been pushed or run in GitHub Actions yet. No npm install was retried in the Agent environment.

The bounded documentation gate `DOC-WF-001` is complete and statically audited (`AAP_Documentation_Reboot/delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`, `evidence/DOC-WF-001_CHECKPOINT.md`). This does not close `P1-UI-001` or start `P1-UI-002`; the owner must explicitly request the next Task after acceptance.
