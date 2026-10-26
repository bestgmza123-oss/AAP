# Project Workspace and Repository-first Handoff Contract

## Persistent Environment Blocker rule

Do not retry `npm ci`/`npm install` in the same Agent Environment after `EAI_AGAIN` has been evidenced unless a new diagnostic proves DNS/network configuration or connectivity changed. Record this as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not `CODE_CONFIGURATION_FAILURE`, and do not claim that the whole ChatGPT service is down. Check real authorized GitHub Actions access; if unavailable, provide one consolidated Windows Owner Action for the existing checkout. Keep already-installed dependencies when `package-lock.json` is unchanged. The returned transcript and browser evidence resume this Task at its first incomplete acceptance criterion; do not start the next Task or ask for periodic duplicate tests.

**Status:** Canonical project-layout and delivery rule for implementation Tasks, beginning with `P1-UI-001`.

## 1. Decision

**Repository/commit/PR + CI is the routine handoff when the existing AAP repository is reachable and authorized.** ZIP is reserved for milestones/releases, explicit owner request, or a documented temporary repository-integration blocker. Do not create an alternate/guessed repository if the real one is not visible.

AAP should be handled as **one coherent project/repository** containing both the canonical documentation and implementation source in clearly named directories. When repository access works, branch/commit/PR plus CI run/artifacts are the routine handoff. ZIP packaging is for milestones/releases, explicit owner requests, or documented temporary access fallbacks—not every task.

The v0.2.2 bootstrap ZIP is intentionally documentation-only because no application code existed in that source baseline. This describes the starting input, not the required shape of later delivery. Creating an implementation workspace from a docs-only starter is normal and does not by itself indicate that documents were deleted.

## 2. Preferred project layout

Use an existing repository/project root if it is actually available. Otherwise create a coherent workspace in the available environment. Adapt directory names to the actual project rather than assuming a path exists.

```text
AAP_Project/
├── README.md                       # project entrypoint and quick start
├── AAP_Documentation_Reboot/       # canonical design/rules/task documents
├── AAP_UI_P1/                      # current Phase 1 React/TypeScript implementation
├── .github/workflows/              # CI workflows, when configured and in scope
├── evidence/                       # concise test/build evidence, if useful
└── DELIVERY_README_TH.md            # Thai handoff notes for this package
```

The layout is logical guidance, not a claim that these paths already exist. An existing application folder may have a different name. **`AAP_Documentation_Reboot/` is documentation-only and must never contain implementation source code.** `AAP_UI_P1/` (or another authorized implementation directory) is a sibling at the same Project Root level, not a child of the documentation folder. Keep docs and code in these separate directories, but **do not routinely split them into separate deliverable ZIPs**. This placement rule does not broaden the active Task's functional scope.

When a connected Git repository is available and authorized, work in that repository and its branches so docs and source history move together. If the current tool only supports file upload/download or repository access is blocked, do not claim GitHub access or changes; keep the blocker explicit and use one combined archive only if an offline handoff is actually needed.

## 3. Start-of-task handling

1. Read `README.md`, `AGENTS.md`, the current Task Brief and latest Checkpoint, then read only the owning rules relevant to this task.
2. Inspect the actual files and workspace. Classify the supplied input as `DOCS-ONLY`, `IMPLEMENTATION-ONLY`, or `COMBINED` based on its contents.
3. If the input is `DOCS-ONLY`, create or select an implementation directory and implement only the scope authorized by the current task. The documentation-only input is an expected bootstrap condition, not a broken app and not an instruction to produce a second independent deliverable.
4. If source code/workspace already exists, continue from that implementation and checkpoint; do not regenerate a parallel scaffold without a reason.
5. Use normal project organization and version-control practices. Workspace creation or restructuring within the project is permitted. Avoid broad destructive cleanup outside the task's scope, and inspect relevant `git status`/diff when available before destructive operations. Do not treat an ordinary new workspace or changed directory tree as proof of file deletion.

## 4. ZIP handoff (milestone/release or fallback only)

For routine changes in a reachable repository, deliver the branch, commit SHA, PR and CI run/artifact links instead of a new ZIP. If the repository is unavailable and an offline handoff is necessary, or the owner requests a milestone/release archive, produce **one combined archive** whose contents represent the same checkpoint. It must include:

- the complete, documentation-only `AAP_Documentation_Reboot/` tree, with intentional changes reflected in its manifest;
- the current implementation workspace as a sibling directory, including source code, required configuration, package manifests/lockfiles, tests and assets needed to continue;
- the current Task checkpoint, package manifest and relevant inspectable evidence (for example, command outputs, test results or screenshots that were actually produced);
- a top-level `DELIVERY_README_TH.md` stating what is included, which Task was handled, changed paths, actual commands/results, blockers, Trello sync truth and checks not run;
- a clear package filename/version that identifies the Task/checkpoint.

Suggested milestone filename: `AAP_MILESTONE_<TASK>_HANDOFF.zip`. Do not generate a new archive merely because a routine task produced another commit; the repository and its CI artifacts preserve the history. If the repository remains unavailable, mark the ZIP as a temporary fallback and keep the repository connection Owner Action open.

Do not include `node_modules`, caches, private `.env` values, access tokens, credentials or unrelated personal files. Include generated build output only when it is needed for the declared handoff or explicitly requested. Never put secrets in the evidence report.

A docs-only ZIP remains appropriate as the **initial bootstrap input** before source code has been created. After code exists, repository/commit/PR is the routine source of truth; a combined ZIP is created only for milestone/release, owner request, or a documented temporary repository-access fallback. Separate docs-only and code-only ZIPs are exceptions, not the normal workflow.

## 5. Packaging acceptance checklist

Before sharing the archive, verify:

- [ ] First decide whether this is a routine repository handoff (link branch/commit/PR/CI) or a milestone/release/explicit-owner ZIP. Routine tasks must not create an archive by default.
- [ ] If an archive is justified, it is one combined project package unless a documented platform limitation prevents it.
- [ ] Both the canonical documentation directory and current implementation directory are included.
- [ ] The implementation files correspond to the exact checkpoint/commit described in the delivery note.
- [ ] The package includes the relevant source/configuration/lockfiles/tests and latest checkpoint/evidence.
- [ ] `PACKAGE_MANIFEST.md` accurately lists the docs tree when documentation inventory/content changed.
- [ ] Relative Markdown links and archive integrity are checked after packaging.
- [ ] Delivery notes distinguish checks that passed, failed, were blocked, or were not run; no unobserved test/build/browser success is claimed.
- [ ] For repository delivery, PR head SHA, CI run SHA, reviewed source diff and evidence all identify the same source revision; a newer commit triggers new CI/review.
- [ ] Required checks are only marked configured after real runs expose their names, the setting is changed with permission, and the protection/ruleset is read back successfully.
- [ ] Owner-facing Trello status/progress/blocker/evidence/handoff is in Thai per [`11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`](11_TRELLO_OWNER_OUTPUT_LANGUAGE.md), while exact Task IDs, paths, commands and error strings remain copyable.

## 6. Repository-first CI, browser tests and branch gates

- A GitHub account identity or an empty list/search is not proof of repository absence. When a canonical URL is available, call `get_repo` directly and record existence, visibility, default branch, permission fields and whether contents/commits exist. If the repo exists but is empty, record `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER` and use the one-time bootstrap Owner Action in `../../evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`; if genuinely inaccessible, use `REPOSITORY_ACCESS_BLOCKED`. Never create a replacement repository.
- The intended CI must use `AAP_UI_P1/package-lock.json` with `npm ci`, Node compatible with `package.json` `engines`, and the actual package scripts `lint`, `test`, `typecheck`, `audit:scope`, and `build`. Include a Playwright smoke job for `/` and `/not-yet-implemented` after its package dependency, lockfile, config and tests are committed. On failure, upload Playwright report, screenshots and traces as workflow artifacts.
- Required status checks must be based on actual completed workflow runs, exact stable check names and available repository settings permission. Read the final branch-protection/ruleset value back before calling the gate active. Never bypass a failing or missing check.
- Treat Trello as the Thai project dashboard: update branch, SHA, PR, CI run, artifact links and one real next action. It is not a manual relay for every source file or successful command when CI artifacts already exist.

## 7. Related policy

Dependency/network blockers follow `AGENTS.md` and `07_P1_UI_PROTOTYPE_TASK.md`: Agent environment first, available authorized GitHub-hosted fallback second, then one consolidated Owner Action Task if needed. Do not skip acceptance just because external verification was attempted. Workspace and package structure do not change the one-user-invocation/one-bounded-Task policy; stop after the current Task and do not automatically begin the next one.

## 8. Mandatory blocker and owner-action handoff

Do not stop a task on a blocker with only a status sentence. First classify the issue from actual evidence as `CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, or `PERMISSION_AUTH_BLOCKER`; fix in-scope code/configuration problems; inspect whether an authorized GitHub-hosted runner is genuinely accessible; and, when automated paths cannot proceed, give the owner exactly one consolidated actionable Owner Action Task. That request must state the real Project Root/working directory, ordered commands from the included package scripts/lockfile, expected signals/exit codes, exact output/files to return and where, related checkpoint paths, first incomplete acceptance criterion and how the agent resumes the same Task. Never make “wait for DNS to recover” the only next step.

The owner-facing Trello card must follow the same rules in Thai. It must expose Task ID/status, passed/failed/NOT RUN results, exact blocker evidence, commands and expected results, requested outputs, checkpoint/Owner Action paths, and resume condition. If Trello tools/board/write access are unavailable, declare `TRELLO SYNC: NOT SYNCED` and provide copyable Thai card text. Never claim a sync or a test without an observed successful action/output. Do not ask the owner to repeat installation or checks already known to have succeeded in the same checkout and unchanged lockfile; request a repeat only for a documented technical reason or changed source revision.

A package ZIP passing integrity checks does not mean the Task passed. A production build passing does not imply lint, tests, typecheck or browser acceptance passed. Report every required check separately as `PASS`, `FAIL`, `BLOCKED`, or `NOT RUN`; only the evidence actually produced for the exact source revision can satisfy the corresponding criterion.

## 9. External references and rationale

These sources support the repository/documentation organization used here; they do not dictate AAP's exact folder names or guarantee correctness of an individual ZIP:

- GitHub recommends a README for each repository so contributors can understand and navigate the project: [Best practices for repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories) and [About README files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes).
- GitHub's Git guide explains that cloning a repository brings its tracked files and history together and enables work on branches before sharing changes: [Git Clone](https://github.com/git-guides/git-clone).
- GitHub Actions artifacts can store/share produced files such as build logs, test outputs and compressed archives; they are workflow outputs, not a substitute for including required source/docs in the project package: [Workflow artifacts](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts).

Retrieved/checked: 2026-10-26.

## Owner Action path preflight (mandatory)
Before giving runnable steps, derive ZIP, Project Root, working directory, and evidence/output paths from the latest observed owner output or a real workspace inspection. Never leave illustrative values such as `C:\path\to\...` or `parent-folder-containing-...` in a command block presented as ready to run. If a path is unknown, send a discovery command first and wait for that output before constructing the next command. Verify path arithmetic from the stated working directory (for example, from `AAP_Project\AAP_UI_P1`, project evidence is `..\evidence`, not `..\..\evidence`). If an owner-facing step fails because the instructions used a placeholder or wrong relative path, own the instruction defect, correct the same Owner Action and update the existing Thai Trello comment with the actual observed path, the corrected full command, expected success signal and what output to return. Do not ask for the same failed action again without fixing the instructions.

## Owner Action usability and return contract (DOC-WF-001)

If a combined fallback/milestone ZIP is being produced, include the current Checkpoint. When owner action is needed, keep exactly one consolidated Owner Action in Thai as the canonical action file. Owner commands must be based on the observed Project Root/working directory or explicitly begin with a discovery step. Name the expected exit code/result, required transcript/screenshot files, exact return channel and first incomplete criterion. If the Agent Environment has a known DNS blocker and the owner's checkout installed dependencies successfully, do not retry installation in the Agent environment and do not reinstall on Windows if the tool binaries exist and `package-lock.json` is unchanged. Inspect a real authorized GitHub-hosted fallback only if available. A packaging/integrity PASS is not implementation acceptance; keep the same Task Blocked/Review until all criteria for the current source revision are proven.

## DOC-WF-001 — pre-P1-UI-002 workflow gate

The bounded documentation/workflow task is captured in [`13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md`](13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md) and complete in this handoff. Do not begin `P1-UI-002` until (1) this documentation gate is complete, (2) `P1-UI-001` has final-source acceptance evidence, and (3) the owner explicitly asks to proceed. Any failed agent-provided command due to an incorrect path must result in a corrected same-task Owner Action/Trello comment, not a request that the owner guess path values.
