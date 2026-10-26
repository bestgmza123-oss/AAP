# Bounded Task Brief Template

## Persistent Environment Blocker rule

Do not retry `npm ci`/`npm install` in the same Agent Environment after `EAI_AGAIN` has been evidenced unless a new diagnostic proves DNS/network configuration or connectivity changed. Record this as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not `CODE_CONFIGURATION_FAILURE`, and do not claim that the whole ChatGPT service is down. Check real authorized GitHub Actions access; if unavailable, provide one consolidated Windows Owner Action for the existing checkout. Keep already-installed dependencies when `package-lock.json` is unchanged. The returned transcript and browser evidence resume this Task at its first incomplete acceptance criterion; do not start the next Task or ask for periodic duplicate tests.

Use the canonical task row in [`09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`](09_PHASE_BOUNDARY_EXECUTION_MATRIX.md) as the source for ID, scope, dependencies and stop conditions. Do not create one file per task unless a task is complex enough to require a dedicated artifact; checkpoints should normally be recorded in the implementation workspace/task card.

## Identity and outcome
- **Task ID / Phase:**
- **Observable outcome:** one verifiable deliverable, not “improve/build everything”.
- **Bounded scope from matrix:**
- **Dependencies that are actually verified:**
- **Workspace and permitted resources:**
- **Input classification and workspace:** `DOCS-ONLY` / `IMPLEMENTATION-ONLY` / `COMBINED`; record the actual repository/workspace and relevant current changes. A docs-only starter may gain an authorized implementation folder as a sibling under the same Project Root; never put source code inside `AAP_Documentation_Reboot/`. Routine handoff uses the authorized repository branch/commit/PR and actual CI artifacts; verify the same source SHA across tests, review and handoff. Create one combined docs+implementation ZIP only for milestone/release, explicit owner request, or a documented repository-access fallback. Follow [`12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md).

## Read list and source authority
- `README.md`, `AGENTS.md`, `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`.
- Canonical owner files and cross-system contracts:
- Exact current `AC-SYS` / `UI-P1` IDs:
- Related rows from `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md`:
- Source conflicts/disposition references:
- State explicitly which old-source details are preserved, superseded, deferred, duplicate, or blocked. Do not treat legacy execution labels as current evidence.

## In scope / forbidden actions
- **In scope:**
- **Out of scope:**
- **Forbidden side effects:** live database mutation, deploy/publish, payment, destructive migration, irreversible asset change, secret/permission changes, or deletion/overwrite/movement of pre-existing user/project files unless the matrix/task explicitly authorizes the exact action and target.

## Verification contract
For each acceptance criterion, define:
- criterion ID and canonical owner anchor;
- method: automated test, type/build/lint check, database test, browser walkthrough, security check, or manual review;
- expected observable result;
- actual evidence artifact/output path;
- status: `NOT RUN`, `PASS`, `FAIL`, `BLOCKED`, or `NOT APPLICABLE` with reason.

PASS is permitted only after the check is run and its output/result inspected. Presence of a test file, green UI, spec paragraph or copied historical `PASS` is not execution evidence. Failed tests must be repaired or left visibly blocking the task; do not skip/disable them to reach green.

## Acceptance and stop condition
- [ ] Normal path verified.
- [ ] Boundary, error, retry, duplicate, permission, time and recovery cases verified where applicable.
- [ ] Relevant source tests mapped to exact current criteria or formally dispositioned with rationale.
- [ ] No rule duplication/contradiction introduced.
- [ ] Pre-existing documentation/user-file inventory is preserved; no unauthorized deletion or overwrite.
- [ ] Primary handoff includes all canonical docs plus implementation, or explicitly states why delivery is split.
- [ ] Owner-facing Trello output is Thai per `11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`.
- [ ] Downstream dependent tests identified; later-phase features remain disabled.
- [ ] Required evidence is inspectable and names the exact build/config/workspace.
- [ ] Any unresolved high-impact decision is isolated from unrelated work.
- **Stop when:** all scoped acceptance checks have evidence, or a safe blocker/permission/decision gate prevents progress. Update checkpoint and hand off; do not start the next Task automatically. A blocker is not complete handoff unless a single actionable Owner Action is supplied.
- **Blocker class (choose from evidence):** `CODE_CONFIGURATION_FAILURE` / `ENVIRONMENT_NETWORK_BLOCKER` / `TOOL_UNAVAILABLE` / `PERMISSION_AUTH_BLOCKER`.
- **Owner Action (required when owner must act):** known Project Root and working directory; ordered exact commands; expected output/exit code; files/output to return and return channel; checkpoint path; first incomplete acceptance criterion and resume condition.
- **Recovery paths checked:** Agent environment (command/output), GitHub-hosted path (run/result or `UNAVAILABLE` plus observed reason), owner-local fallback. Do not advise waiting for DNS without a usable action.

## Checkpoint / completion report
- Last verified criterion / first incomplete criterion:
- Changed files/diff status:
- Commands run and actual outcome:
- Browser/database/security evidence (only if actually performed):
- Blocker/residual risk and independent work that can continue:
- Environment recovery state (`NOT NEEDED` / `AGENT ENV BLOCKED` / `GITHUB FALLBACK TRIED AND BLOCKED` / `GITHUB FALLBACK UNAVAILABLE` / `OWNER ACTION SENT`):
- Owner Action Task sent already for this blocker? (yes/no; do not repeat without new evidence):
- Exact commands/results requested from owner, if any (one consolidated set; do not repeat already successful work):
- Owner output return channel: [reply/attach named files; exact filenames]
- Resume when: [same Task, first incomplete criterion; source identity check]
- Task status and next smallest Task ID:

## Owner Action path preflight (mandatory)
Before giving runnable steps, derive ZIP, Project Root, working directory, and evidence/output paths from the latest observed owner output or a real workspace inspection. Never leave illustrative values such as `C:\path\to\...` or `parent-folder-containing-...` in a command block presented as ready to run. If a path is unknown, send a discovery command first and wait for that output before constructing the next command. Verify path arithmetic from the stated working directory (for example, from `AAP_Project\AAP_UI_P1`, project evidence is `..\evidence`, not `..\..\evidence`). If an owner-facing step fails because the instructions used a placeholder or wrong relative path, own the instruction defect, correct the same Owner Action and update the existing Thai Trello comment with the actual observed path, the corrected full command, expected success signal and what output to return. Do not ask for the same failed action again without fixing the instructions.

## Owner Action delivery quality gate (DOC-WF-001)

Before issuing a runnable Owner Action, verify the archive name, Project Root, working directory and evidence path against actual owner output or the inspected workspace. A command block with `C:\path	o\...`, a guessed target folder or unverified relative path fails review. If the real path is not yet known, send one discovery command and wait for its result before generating the full command set. If an agent-provided action caused an error, update that same action and Trello comment rather than asking the owner to repeat it unchanged. Collect one consolidated output batch for the changed source revision; do not rerun completed checks in an unchanged source/environment without a reason.
