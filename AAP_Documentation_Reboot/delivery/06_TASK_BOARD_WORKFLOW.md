# Task Board Workflow — AAP

## Purpose

Keep project context and code together in one navigable project/repository workspace. Repository commits and CI are the routine implementation records when accessible; package archives are governed by [`12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md); owner-facing Trello output language is governed by [`11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`](11_TRELLO_OWNER_OUTPUT_LANGUAGE.md).
Use one visual board to show **what is planned, what is happening, what is blocked, and what has evidence of completion**. This board tracks work status; it does not own game rules. The canonical gameplay rules remain in their owner documents. Do not copy full rules onto cards.

## One board, six columns
1. **Backlog** — identified but not ready.
2. **Ready** — small task has a clear outcome, read list, scope, acceptance checks and verification plan.
3. **In Progress** — one active implementation task by default; a second task is allowed only when it is genuinely independent.
4. **Blocked** — name the exact dependency, missing permission or disputed rule; keep unrelated work moving.
5. **Review** — implementation/edit is finished but acceptance evidence has not yet been reviewed.
6. **Done** — all task-specific acceptance checks have actual inspected evidence and the relevant artifacts are linked.

Use labels for `DOC`, `UI`, `FRONTEND`, `BACKEND`, `DATABASE`, `TEST`, `SECURITY`, plus `Phase 0`…`Phase 6`; labels describe type/phase and are not extra columns. Milestones can group multiple cards. Avoid adding more status columns unless real usage proves they are necessary.

## Every card must include
- Task ID and a result-oriented title (e.g. `P1-UI-001 — Build the clickable Run-preflight UI prototype`).
- One-sentence outcome and phase.
- Read list with exact relative file paths.
- In-scope and explicit out-of-scope work.
- Canonical rule/acceptance IDs (link to their owner docs; do not duplicate their full text).
- Acceptance checks with observable expected results.
- Verification plan and expected evidence (build/test output, screenshots, test record, diff or manual checklist as appropriate).
- Dependency/blocker and next smallest task.
- For `Blocked`, a copyable owner action with working directory, ordered commands, expected results, requested output/return method, checkpoint and resume condition; “wait for network” alone is not sufficient.


## Repository, CI and source revision — routine path

- When the authorized AAP repository is accessible, the repository branch/commit/PR is the implementation record and GitHub Actions is the check record. Do not ask the owner to ferry source files, test transcripts or routine ZIPs between Agent and Windows when those results can be represented by a real PR, run and artifact.
- Every implementation card should link the repository, working branch, exact commit SHA, PR, CI run, and failure artifacts where present. If a link/result does not exist, state `NOT RUN` rather than inventing it. Keep the card's Thai summary short and make the next action directly actionable.
- CI must run from the same commit under review, with `npm ci` against the committed `AAP_UI_P1/package-lock.json`, then the actual `package.json` scripts `lint`, `test`, `typecheck`, `audit:scope`, and `build`. A Playwright smoke job is enabled only after its dependency/config/test are committed; failures upload report, screenshots and trace artifacts.
- Required status checks are a separately verified repository setting. First observe successful runs and exact check names; then, only with adequate permission, set branch protection/ruleset requirements and read back the setting. Never claim a required gate from workflow-file presence alone.
- Zip packaging is for milestones/releases, owner-requested offline handoffs, or a documented repository-access fallback—not for each routine edit. If no repository is authorized, create no substitute repo; keep this task `Blocked` and use one consolidated Owner Action. Do not start a dependent task automatically.

## AI update policy — use the integration, do not merely mention it

The agent must run a Trello preflight at the start of **every** tracked Task. In the active agent session, check whether Trello action tools are actually available and authorized; a Trello tab open in the browser is not enough. When the tool is available, call it directly without waiting for the owner to type `@Trello`.

1. Open/search board `AAP Development`.
2. Search the exact Task ID (first `P1-UI-001`) to prevent duplicate cards.
3. If the card exists, read its checklist/status/comments and reconcile them against the actual workspace and latest checkpoint. If the card does not exist, create it using `delivery/02_TASK_TEMPLATE.md`, with its Task ID in the title, scope, acceptance checklist, evidence, and current dependency/blocker.
4. At task start, move the card to `In Progress` only if work can proceed. If the workspace checkpoint contains an unresolved blocker that prevents the required next checks, keep/move it to `Blocked` and state the exact blocker. Do not mislabel blocked work as active or complete.
5. At meaningful checkpoints, change the checklist/blocker only when the state changes; avoid noisy updates for every tool call.
6. At handoff, move to `Review` only when implementation/evidence is ready for review. Move to `Done` only after acceptance evidence is inspected. Tests not run remain `NOT RUN`.

If the current AI environment has no Trello action tool, cannot access `AAP Development`, or lacks write permission, explicitly report `TRELLO SYNC: NOT SYNCED`, tell the owner which of those conditions was observed, and provide a copyable board update. Do not claim that a browser tab, plugin listing, or previous session is sufficient. This missing integration is not a reason to discard a local checkpoint or restart the task; continue independent in-scope work unless writing to Trello is itself a stated acceptance requirement.

## Resume after timeout or a new chat
Do not reply only `Continue` and hope the model remembers. The agent must first inspect the task card, current working-tree diff/status and latest checkpoint; identify the last verified completed acceptance check; then resume the next incomplete check without redoing completed work. Before a long/high-risk operation, save the current work and write a checkpoint. Never infer that a command or migration succeeded just because a prior response said it was running.

## Bounded blocker recovery — no silent stop

### Known Agent DNS blocker: do not retry without changed evidence

When the current Agent Environment has already recorded `EAI_AGAIN` for `registry.npmjs.org`, preserve `package-lock.json` and stop `npm ci`/`npm install` retries in that same environment unless a new targeted diagnostic demonstrates changed connectivity or configuration. If the owner reports successful npm access/install on Windows, this is an Agent `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`) condition—not a source-code failure and not proof that the overall ChatGPT service is down. Check an actually accessible/authorized GitHub Actions route; if unavailable, use one consolidated Owner Action against the owner's existing checkout and keep its known-good `node_modules` when the lockfile is unchanged. Ask for installation only if required binaries are absent or the lockfile/source dependency contract changed for an identified reason.

A blocked check must produce a usable next step, not an instruction to wait for a service to recover. Diagnose from actual output and classify the primary cause as `CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, or `PERMISSION_AUTH_BLOCKER`. Record exact errors and distinguish `PASS`, `FAIL`, `BLOCKED`, and `NOT RUN`.

1. **Agent environment first, with a hard stop on known DNS failure:** inspect the actual Project Root/working directory, runtime, package manager, package scripts and lockfile. Run the correct locked install once only if the environment is not already known to have a persistent DNS/network blocker. Fix in-scope code/configuration issues directly. If `EAI_AGAIN` is evidenced, do targeted diagnostics, classify `ENVIRONMENT_BLOCKED`/`ENVIRONMENT_NETWORK_BLOCKER`, then stop install retries in that same environment unless new evidence shows connectivity/settings changed. Never delete/regenerate a valid lockfile, switch registries/mirrors, bypass TLS or use unverified packages.
2. **GitHub-hosted fallback second when available:** verify that the intended repository, workflow/runner and permissions are actually accessible in this session. If they are, run the equivalent locked install and exact checks against the same revision. A listed integration is not proof that the repository or Actions is usable. Do not create repos, push code, change settings or add secrets without authorization. If inaccessible, record `GITHUB FALLBACK: UNAVAILABLE` plus the observed reason; do not say it was attempted.
3. **One consolidated Owner Action Task:** if the Agent path is blocked and the authorized GitHub fallback is unavailable or also blocked, update the existing card and send one complete Thai Owner Action Task. Include Task ID/status; passed/failed/not-run checks; blocker class and exact evidence; Project Root and working directory; numbered commands read from the actual `package.json`, lockfile and scripts; expected outputs/exit codes; exactly what logs/files to return and how; checkpoint/Owner Action paths; the first incomplete acceptance criterion; and what the agent will do next after receiving results. State safe exclusions (no secrets, no TLS bypass, no registry switch, no unauthorized push). Never invent a path or tell the owner only to wait for DNS/network recovery.
4. **Do not repeat completed owner work:** one request per distinct blocker per Task. Do not ask the owner to repeat a successful install or a command whose full output is available. If the owner has a successful install in the same checkout and the lockfile is unchanged, retain `node_modules` and run checks against the updated source; install again only if it is technically necessary and say why.
5. **Resume:** when output/ZIP arrives, reconcile the exact source/workspace identity and resume the same Task from its first incomplete criterion. If tested code differs, treat results as diagnostics until the current revision is checked. Keep the existing card `Blocked` until all acceptance evidence is inspected; never start the next Task automatically.

### Required content for every Blocked Trello card

The card must include the Thai Task status and ID, outcome, passed/failed/not-run checks, exact blocker class/error, known working directory, one actionable ordered command set with expected results, exact output/files and return method, evidence/checkpoint paths, and the precise resume condition/first incomplete criterion. Keep technical strings and commands copyable. If Trello tools/board/write permission are unavailable, set `TRELLO SYNC: NOT SYNCED` and provide a copyable Thai card update instead of claiming a sync.

**Noise control:** update the existing card at material state changes, not for every command. Do not create a second card for the same Task/blocker unless the owner requests it.

## Thai owner-facing output

When writing a Trello card summary, progress comment, blocker, requested owner action, evidence caption or review handoff, write the owner-facing explanation in Thai. Preserve Task IDs, list names, paths, commands, errors, test IDs and commit IDs exactly when they must remain copyable. Use the template in [`11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`](11_TRELLO_OWNER_OUTPUT_LANGUAGE.md). If Trello cannot actually be written, return a Thai copyable update and set `TRELLO SYNC: NOT SYNCED`; do not pretend a sync occurred.

## Delivery package integrity

Use repository branch/commit/PR plus CI run/artifact links as the routine handoff when the existing AAP repository is accessible and authorized. The canonical docs subtree remains source-code-free; the implementation directory is its sibling under the same Project Root. Do not produce a ZIP for each routine task. Use one combined docs+code archive for milestone/release, explicit owner request, or a documented temporary repository-access fallback; if produced, confirm it reflects the same commit/checkpoint and validate manifest, links and archive integrity. See [`12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md).

## Status truth
- `In Progress` means active work, not successful completion.
- `Blocked` must identify a specific blocker and owner/action to clear it.
- `Review` means work exists but evidence/acceptance has not yet been accepted.
- `Done` requires the task's acceptance checks plus inspectable evidence.
- A project milestone is complete only when all required cards and gates for that milestone are done; do not use a green board as proof that code is safe or production-ready.

## Connection boundary
Trello MCP is optional tooling. Connecting it grants the AI the permissions approved by the owner, but it does not by itself watch code changes or run work in the background. A coding agent must be configured to use the integration and must update the board at the checkpoints above. Git/repository history remains the source for code changes; the AAP docs remain the source for game rules; Trello remains the source for work status only.

## Owner Action path preflight (mandatory)
Before giving runnable steps, derive ZIP, Project Root, working directory, and evidence/output paths from the latest observed owner output or a real workspace inspection. Never leave illustrative values such as `C:\path\to\...` or `parent-folder-containing-...` in a command block presented as ready to run. If a path is unknown, send a discovery command first and wait for that output before constructing the next command. Verify path arithmetic from the stated working directory (for example, from `AAP_Project\AAP_UI_P1`, project evidence is `..\evidence`, not `..\..\evidence`). If an owner-facing step fails because the instructions used a placeholder or wrong relative path, own the instruction defect, correct the same Owner Action and update the existing Thai Trello comment with the actual observed path, the corrected full command, expected success signal and what output to return. Do not ask for the same failed action again without fixing the instructions.

## Correcting failed Owner Action steps (mandatory)

If a command supplied by the agent fails because the command used an example path, wrong working directory, incorrect archive layout or wrong relative path, classify it as an instruction/workflow defect first. Use the owner's output to identify the real root. Update the existing Owner Action and the existing card/comment; do not create a duplicate card or ask the owner to rerun the same failed action unchanged. Explain in Thai: what the output proves, why the previous command failed, the corrected full command, the expected success output, what to send back if it still fails, and the exact resume criterion. See [`13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`](13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md).

For a known Agent DNS blocker, the required path is: inspect/fix any independent in-scope code defect → verify a real authorized GitHub Actions path where accessible → one consolidated Owner Action on the owner's existing working checkout. Do not retry installation in the blocked Agent environment without new connectivity evidence. Do not re-run owner checks periodically without source/config/environment change.

## DOC-WF-001 acceptance gate

The bounded permanent-rule update is documented in [`13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`](13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md) and its audit checkpoint `../../evidence/DOC-WF-001_CHECKPOINT.md`. This gate must be completed before any `P1-UI-002` work. It is completed in this handoff; the active `P1-UI-001` still has its own acceptance gate, and no dependent Task may begin automatically.
