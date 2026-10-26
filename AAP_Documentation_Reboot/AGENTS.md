# AGENTS.md — AAP Document-First Working Rules

## Mission

Work from this package to plan and build Anime Apocalypse (AAP). This **ZIP is a documentation-only bootstrap baseline**, not a runtime application; implementation tasks may create or use the code workspace within their explicit scope. Each task's scope controls what can be done: DOC-001 itself is documentation-only and must not implement code or touch Supabase. A separate owner-authorized implementation task may create code or database work within its explicit scope; never infer permission to mutate a live database, deploy or spend money from a general project goal.

## Client support caveat

Do not assume every AI client automatically discovers or obeys `AGENTS.md`. If using a chat/upload workflow, explicitly attach or provide the paths for `README.md`, this file, the named task brief and only the relevant owner documents/contracts. Tool-specific repository/path instructions should be added only when the chosen client actually supports them.

## Read order for every task

1. `README.md`
2. This file
3. `product/04_SYSTEMS_MAP.md` for affected systems
4. `rules/01_GLOBAL_INVARIANTS.md` and applicable contracts in `rules/02_CROSS_SYSTEM_CONTRACTS.md`
5. The owning system document(s) only
6. The relevant UX, balance or roadmap document
7. `decisions/01_DECISION_REGISTER.md` only to trace a decision's origin

Do not read every system file for every task. Read future-system contracts only when they affect the current task.

## Authority and truth

- A newer explicit owner instruction overrides a conflicting older design statement; record the change in `decisions/02_RECONCILIATION_LOG.md` and update the owning rule and its dependent contracts.
- Owner-confirmed legacy decisions stay labelled owner-confirmed only for what they explicitly cover. `AI-DEC-201…263` are AI-selected design defaults under the earlier delegation, not retroactive owner confirmations and not implementation proof.
- This new package's active rule lives in the file that owns the topic. Do not use old SoT history as a parallel active spec.
- Feature design, phase placement, runtime evidence, balance evidence and public-release readiness are separate dimensions. Never collapse them into one `Done` label.

## Scope control

Every task must state: outcome, in-scope systems, files to read, rules/contracts to preserve, out-of-scope work, acceptance conditions and evidence expected. A task may read cross-system contracts without implementing those systems. Never add an adjacent feature merely because its data is visible.

## Project workspace and single-package handoff

- Before work, identify the actual repository/workspace, current Task/Checkpoint and available source files. Classify the input as `DOCS-ONLY`, `IMPLEMENTATION-ONLY`, or `COMBINED` based on what is actually present.
- A `DOCS-ONLY` starter package is expected to contain no app source. Creating a new implementation folder/workspace in that situation is normal and is not evidence that the documentation was deleted. Follow [`delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md).
- Keep `AAP_Documentation_Reboot/` documentation-only: never place implementation source code inside it. An authorized implementation directory such as `AAP_UI_P1/` must be a sibling under the same Project Root. Keep both folders in one coherent project/repository and do not routinely split them into separate ZIP deliverables. If the platform supplies separate input folders, integrate them into a coherent project root when practical.
- Use the available repository/workspace and branches when possible. Do not create extra copies or workspaces unless the environment genuinely requires them. Ordinary workspace creation/reorganization is permitted; avoid broad destructive cleanup outside the current Task scope and inspect relevant Git status/diffs where available before destructive changes.
- **Repository/commit is the routine source of truth when an authorized repository is actually accessible.** Continue in the existing repository, create a bounded task branch, commit the scoped change, open/update its PR, and tie review plus every CI result to the exact same commit SHA. Do not create or claim a repository if no AAP repository is visible to the connected GitHub identity.
- If a direct repository URL resolves to an existing but empty repo, record `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER` and issue one bootstrap Owner Action from the canonical local project; do not ask to reconnect an already accessible repo. If the URL is genuinely inaccessible or permission-denied, record `REPOSITORY_ACCESS_BLOCKED` (`PERMISSION_AUTH_BLOCKER` when authorization/install/selection is missing). Never create a substitute repository.
- ZIP is **not** the routine handoff for every task. Prefer repository branch/commit/PR and CI artifacts. Create one combined docs+implementation ZIP for milestone/release, explicit owner request, or a documented temporary repository-integration blocker where a file handoff is genuinely needed. Never split routine handoffs into docs and code ZIPs.
- Before a milestone/release ZIP, ensure docs and code represent the same commit/checkpoint, update `PACKAGE_MANIFEST.md` and checksums, check links/archive integrity, and report what was and was not tested. Do not claim runtime success without executed evidence.

## Repository-first CI and source-revision invariants

The standard GitHub connected app may be read-only. Verify effective write permission/action support before promising commits or PRs; if no authorized write-enabled surface is available, leave write-dependent acceptance criteria blocked. See [OpenAI GitHub connection guidance](https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt).

- At task start, inspect GitHub identity, bounded repository list/search and actual repository permissions. **If the owner or current docs/Trello provide a canonical repository URL, call `get_repo` on that exact URL before interpreting an empty list/search.** A list returning zero does not prove repository absence. Distinguish an inaccessible/nonexistent repo, an existing empty repo (`size=0` / Contents API says empty), and a populated repo that is omitted from list/search. Stop after bounded checks; do not search indefinitely or create a guessed repository.
- For the current implementation workspace `AAP_UI_P1/`, CI must use the actual scripts in `package.json`: `npm run lint`, `npm test`, `npm run typecheck`, `npm run audit:scope`, and `npm run build`. Use `actions/setup-node` with a Node version compatible with the declared `engines`, npm cache keyed by `AAP_UI_P1/package-lock.json`, and `npm ci`. Do not modify the lockfile by hand.
- Once Playwright is committed as a dev dependency and reflected in `package-lock.json` in an authorized, working repository environment, add Browser smoke for `/` (fixture-only boundary banner and `P1-UI-001` shell) and `/not-yet-implemented` (placeholder and return-to-shell link). On failure, retain the Playwright report, screenshots and traces as GitHub Actions artifacts. Browser smoke must remain local-fixture-only; no gameplay/backend/API/database/Supabase work is implied.
- Required status checks may be configured only when the permission is actually available and the intended check names have completed in a real workflow run. Verify the repository's protection/ruleset state after changing it; never report protection or CI as active based on a YAML file alone.
- Before review or handoff, confirm that the PR head SHA, CI run SHA, reviewed diff and evidence all refer to the same source revision. A new commit invalidates the previous revision's acceptance unless the checks are explicitly tied to that new SHA.

## Decision policy

- If the required behavior is already specified, implement/document it rather than asking again.
- Within an explicitly delegated design area, choose the smallest coherent default, record rationale and provenance, and apply it consistently.
- Do not silently invent or change permanent-death consequences, ownership/loss, paid systems, irreversible deletion, or remove a named feature. If no current decision covers such a critical consequence, isolate only that affected slice; continue independent work.
- Cosmetic values and reversible prototype tuning may be selected by AI as versioned defaults. Do not call them balanced without playtest evidence.
- Do not use “remove all OPEN/TBD text” as a substitute for semantic review. Unknowns must have a disposition and a reason; no silent guesses.

## Single ownership of rules

Each rule has one canonical owner: Hunger mechanics in `SYS-04`, death disposition in `SYS-02`, Run lifecycle in `SYS-09`, combat resolution in `SYS-07`, inventory weight in `SYS-13`, elapsed time in `SYS-30`, and so on. Other files link to that owner instead of repeating formulas or changing behavior. The balance registry owns tunable numbers; systems describe what the numbers mean.

## UI-Driven acceptance

A feature is not complete just because its backend/API concept is described. Its screen flow, responsive layout, core interaction states, error/recovery path and localized strings must meet `experience/` requirements. English is the starting UI language; all user-visible content must be localization-ready.

## Honest status

Use `Not Started`, `In Progress`, `Blocked`, `Ready for Review`, `Accepted`, or `Deferred by Phase`. A decision being designed is not a test passing. Never claim code, data, build, browser testing, backup recovery or publication exists unless observed and in scope.

Before claiming completion, review the in-scope IDs in `delivery/04_REQUIREMENTS_TRACEABILITY.md`; never mark a criterion PASS without an executed check and inspectable evidence.

## Bounded agent execution

- One user invocation should execute **one bounded task only**. Do not automatically start the next Task Brief after reaching `Ready for Review`, `Accepted`, or a natural stopping point. The owner may say `Continue` to start the next bounded task.
- A task may contain internal edit/test/repair loops, but it must stop when its acceptance criteria are met, when a required decision/permission is missing, or when the agent is approaching a context/time limit. Before stopping, write a durable checkpoint.
- Do not optimize for maximum autonomous runtime. The goal is a verified increment with a recoverable state, not continuous execution until timeout.
- Never create a new summary/spec/prompt file merely because a response became long or a task resumed. Update the canonical task/checkpoint or owner document in place unless the task explicitly requires a new artifact.

## Blocker recovery and mandatory Owner Action (never stop silently)

### Persistent Agent DNS/network blocker rule

If an Agent Environment has already produced `EAI_AGAIN` for `registry.npmjs.org` and the owner has separately reported `npm ping` plus installation succeeding on Windows, classify this Agent-side condition as `ENVIRONMENT_BLOCKED` (subtype `ENVIRONMENT_NETWORK_BLOCKER`), separate from `CODE_CONFIGURATION_FAILURE`. **Do not retry `npm ci` or `npm install` in that same Agent Environment** unless fresh evidence shows that DNS/network settings or connectivity changed. Never generalize a registry lookup failure into a claim that the whole ChatGPT service is unavailable. Record the exact diagnostic and preserve the lockfile. Verify a real, authorized GitHub repository/Actions path when it is accessible; if not, state `GITHUB FALLBACK: UNAVAILABLE` with the observed reason and issue one consolidated Windows Owner Action against the owner's existing successful checkout. Reinstall on the owner machine only if the exact checkout is missing required tools or the lockfile changed for a stated technical reason. Do not ask for periodic repeat tests without a source/config/environment change.

A blocker is not a handoff by itself. The agent must first inspect the current package, identify safe alternatives, and leave the owner with one next action that can be performed immediately. Never tell the owner to wait for DNS/network recovery without checking other available paths and providing an executable fallback.



### Owner Action path preflight (mandatory)
Before giving runnable steps, derive ZIP, Project Root, working directory, and evidence/output paths from the latest observed owner output or a real workspace inspection. Never leave illustrative values such as `C:\path\to\...` or `parent-folder-containing-...` in a command block presented as ready to run. If a path is unknown, send a discovery command first and wait for that output before constructing the next command. Verify path arithmetic from the stated working directory (for example, from `AAP_Project\AAP_UI_P1`, project evidence is `..\evidence`, not `..\..\evidence`). If an owner-facing step fails because the instructions used a placeholder or wrong relative path, own the instruction defect, correct the same Owner Action and update the existing Thai Trello comment with the actual observed path, the corrected full command, expected success signal and what output to return. Do not ask for the same failed action again without fixing the instructions.

### Classify from evidence

Use one primary class and cite the exact command/output:

- `CODE_CONFIGURATION_FAILURE` — source, test, package script, dependency version, or configuration is invalid (for example Biome schema diagnostics or duplicate DOM between tests). Fix in-scope defects before asking the owner to act.
- `ENVIRONMENT_NETWORK_BLOCKER` — registry/DNS/proxy/network/runtime access fails (for example `EAI_AGAIN`), with diagnostics supporting that classification.
- `TOOL_UNAVAILABLE` — the required runner/browser/GitHub/Trello integration does not exist or cannot be invoked in this session.
- `PERMISSION_AUTH_BLOCKER` — the tool or target exists but access is denied or authorization is missing. Do not ask for tokens or secrets in chat.

Do not label a code/configuration error as a network blocker merely because installation also failed. Distinguish checks that actually ran from those that are `NOT RUN`.

### Bounded recovery ladder

1. **Inspect and act in the Agent environment only while the path is viable.** Inspect the actual Project Root, working directory, package manager, package scripts, runtime versions and lockfile. For npm, use `npm ci` once only when the Agent Environment has no known persistent DNS/network blocker and a valid `package-lock.json` exists; otherwise follow the package's actual setup instructions. Capture complete output and exit code. Do not delete/regenerate a valid lockfile, switch registries/mirrors, turn off TLS checks, or fetch unverified packages. If the failure is code/configuration-related, fix it and rerun affected checks when tools are available. For network/DNS failures, run a small targeted diagnostic set. Once `EAI_AGAIN` is established in the current Agent Environment, stop install retries there unless fresh evidence proves connectivity/settings changed; do not repeat the same `npm ci`/`npm install` command just to see whether it works.
2. **Check the GitHub-hosted path if truly available.** Search for the actual repository and verify that the current session has access and permission to run its Actions/workflow or another authorized hosted environment. If it is accessible, run the equivalent locked install and exact checks against the same source revision. A listed GitHub plugin, a repository search with no result, or an assumed workflow is not a completed fallback. Do not create a repository, push code, alter settings or add secrets without permission. If unavailable, record `GITHUB FALLBACK: UNAVAILABLE` and the observed reason.
3. **Send one consolidated Owner Action Task.** If Agent checks remain blocked and an authorized GitHub fallback cannot be run, do not stop at a status update: update the existing Task/Trello card and provide one actionable Owner Action set in the package. It must name the known Project Root and working directory (or explain how to find them), ordered exact commands derived from the actual files, expected success signals, what output/files to return, the return channel (reply with the output or attach the named files), prohibited unsafe workarounds, and the exact acceptance criterion where the agent will resume. Do not invent paths.
4. **Avoid duplicate work and repeat requests.** One Owner Action set per distinct blocker per Task. Do not ask for commands whose complete output is already present. In particular, do not ask an owner to reinstall dependencies again in an environment where successful installation is evidenced unless a technical reason exists (for example, a changed lockfile or missing `node_modules` in the exact checkout being verified). Request new output only for a materially different/targeted diagnostic.
5. **Resume the same Task.** When the owner returns output or a ZIP, inspect source revision/workspace identity, current code and latest checkpoint; continue from the first incomplete acceptance criterion. Treat results from a different source revision as diagnostics, not proof of the current code. Do not restart the project or start a dependent Task. Keep unverified criteria `NOT RUN`/`BLOCKED`; never mark `Done` from an attempted install or a successful build alone.

### Mandatory owner-action content

Every actionable blocker handoff must state: Task ID and Thai status; checks passed/failed/not run; blocker class and exact evidence; known Project Root and working directory; one numbered command sequence with expected result after each command; exact outputs/files to return and how to send them; relevant checkpoint and Owner Action paths; first incomplete criterion; and the condition that allows the agent to resume the current Task. Do not leave the owner with “wait and try again later” as the only instruction.

For npm, preserve a valid `package-lock.json` and use `npm ci` for reproducible installs where applicable. If a successful install already exists in the exact checkout and the lockfile is unchanged, retain the installed dependencies and run the needed checks without reinstalling. Do not request credentials, `.env` contents, tokens, passwords or secrets.

## Task Board and resumability

The owner-facing Trello reports must follow [`delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`](delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md): summaries, blockers, evidence captions and handoffs in Thai; canonical Task IDs, board-list names and exact technical output remain unchanged.

Repository-first dashboard rule: when the repository/PR/Actions are accessible, put repository URL, branch, commit SHA, PR and actual CI run/artifact links on the Task card. Keep Trello as the status/decision dashboard, not a competing source tree or a manual transcript relay. If the supplied repo exists but is empty, create/update one `Blocked` card with `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER` and the single bootstrap action in `evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`. If genuinely inaccessible, use `REPOSITORY_ACCESS_BLOCKED`. Do not invent a PR/run link; leave CI as `NOT RUN` until a real workflow result exists.


- **Mandatory task-start preflight:** before editing any tracked task, inspect the tools/apps actually available in the current agent session. If the Trello integration is available, call it directly without waiting for the owner to type `@Trello`; read the `AAP Development` board, search the exact Task ID, and synchronize the card with the observed workspace/checkpoint state.
- If the Task ID card does not exist, search the board once more to prevent duplicates, then create the card from `delivery/02_TASK_TEMPLATE.md` (short title, outcome, scope boundaries, acceptance checklist, evidence required, blocker/dependency). Use `Ready` only when prerequisites are satisfied; otherwise use the correct state such as `Blocked`. Never assume an empty board means no work exists in the workspace.
- Update the card at task start, meaningful state changes, blockers, and review handoff. For a blocker, set `Blocked` and include the exact error, what is verified, the owner/environment action needed, and the next safe action. Use `Review` only when implementation work has an evidence package ready for review; use `Done` only after acceptance evidence is inspected.
- A Trello browser tab being open, or a plugin being listed/installed elsewhere, does **not** prove the Trello action tool is available in this agent session. Verify by invoking the connected integration, not by guessing.
- If the active session has no Trello action tool, cannot access the named board, or lacks write permission, say so at the start and again in the handoff; set the external sync result to `NOT SYNCED`, record a durable checkpoint, and provide a copyable board update. Do not ask the owner to repeat `@Trello` every task as a substitute for diagnosing the missing connection. Continue independent in-scope work unless the board action itself is an explicit task dependency.
- A timeout is not a task state. Resume by inspecting actual files/diffs and acceptance checks, then continue the first incomplete item. Do not rely on hidden model analysis from the interrupted run as durable state; files, diffs, test outputs and checkpoints are the continuity source.


## Phase/Bound and legacy-test control

- `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md` is the single execution index for Task IDs, dependencies, evidence requirements and stop conditions. Do not infer a larger scope from the overall game goal.
- `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md` preserves legacy §10 test specifications as migration inputs. Its source text and old status labels are not active rules or current test results. For an in-scope row, compare it with the current owner, then link the exact current `AC-SYS`/`UI-P1` criterion or record a reasoned disposition before claiming the criterion complete.
- Every Phase 2–6 must pass its `*-GATE-000` source/semantic/test-plan preflight before implementation. Phase placement is re-mapped to the current Roadmap, not copied from historical labels.
- All Task handoffs must include actual verification evidence; a source inventory or test plan is not a test run. Keep all `NOT RUN` states explicit until executed.
- The current Phase 1 first Task (`P1-UI-001`) is only frontend scaffold/shell. It does not include the full UI slice; continue only when the owner starts the next bounded Task.

## Required completion report

At the end of each task report: (1) documents changed, (2) scope completed, (3) rules/decisions used, (4) checks actually performed and results, (5) unresolved conflicts or risks, (6) what task is next. Keep the report short and link directly to the changed documents.

## DOC-WF-001 — bounded documentation gate

`delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md` is the bounded documentation/workflow task for permanent Blocker handling. Its acceptance checklist and `../evidence/DOC-WF-001_CHECKPOINT.md` are completed/audited in this handoff. Completing this documentation gate does not mark `P1-UI-001` done and does not authorize automatic `P1-UI-002` start. First finish all acceptance checks for the existing UI Task; then stop and await an explicit owner instruction before any next implementation Task.

When owner output shows that a prior step failed because an instruction used a placeholder, incorrect ZIP target or wrong relative path, treat that as an instruction defect. Read the output, fix the same Owner Action, and update the existing Thai Trello comment with the known-good path/commands. Do not repeat the failed command unchanged.


## Owner-PC execution and low-friction verification

- When Remote Desktop Commander is available and the authorized Windows device is online, inspect and work in the actual Project Root instead of asking the owner to copy files, run routine commands, or relay full logs manually. Verify git status, branch/HEAD and existing untracked files before any change; preserve unrelated files.
- Prefer this loop: scope -> bounded edit -> local relevant checks -> diff/security review -> one coherent Task commit -> task branch/PR -> GitHub Actions verification -> checkpoint/Trello update. Do not commit after every command or small edit; batch changes that belong to the same accepted Task.
- Reuse installed dependencies when the exact checkout is healthy and package-lock.json is unchanged. Run npm ci when dependencies are missing/broken, the checkout is fresh, or the lockfile changed; respect the known Agent EAI_AGAIN blocker unless new diagnostics prove conditions changed.
- Avoid unnecessary test repeats. Re-run tests affected by source/config changes, then every acceptance gate needed for the candidate revision. Do not carry PASS from an older SHA to a newer revision. The PR head SHA, workflow SHA, reviewed diff and checkpoint must match.
- For browser UI, automate Playwright route/interaction checks and collect report, screenshots and traces as workflow artifacts when configured. Do not ask the owner to manually re-test every deterministic flow that an automated test can exercise; reserve manual review for visual/product judgement, genuinely external interactions, permission prompts and owner-only decisions.
- A successful Actions run is evidence only for the steps actually executed. CI does not imply browser coverage, artifacts or branch protection unless those were executed/read back. Required checks are configured only after actual stable check names exist and the repository settings are verified.
- If the tool/device cannot perform an action or a safety check blocks it, report the exact blocker and stop that path; never obfuscate commands or bypass permission/security gates. Give one consolidated Owner Action only for the steps that truly require the owner.
- Trello is the Thai status/decision board. Store source in Git, logs/reports in their real workspace or Actions artifacts, and put links plus PASS/FAIL/BLOCKED/NOT RUN on the card. Avoid asking the owner to paste content the connected tools can inspect directly.
- Do not claim the agent continues unattended after the active session ends. Use file checkpoints and Git history as durable resume state.
- Canonical operating guide: delivery/15_OWNER_PC_AUTOMATION_WORKFLOW_TH.md. Baseline main SHA ac893af3b772100477a9ddcb652bacde2987116c passed CI run #1. PR #1 latest verified code SHA is 4b646efa708ac4be39a59d0dc55b47f7e7ec665d; CI run #7 passed quality and Playwright browser jobs. Intentional temporary failure run #9 proved artifact upload; the disposable branch was deleted. Main protection is enabled with required checks AAP UI quality gates and Playwright browser smoke. PR #1 remains open/unmerged for owner review; do not start P1-UI-002.
